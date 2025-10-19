// AI Service Layer for Real Estate Application
// This service can integrate with various AI APIs for enhanced functionality
import { assets } from '../assets/assets'

class AIService {
  constructor() {
    // Configuration for different AI providers
    this.config = {
      openai: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        baseURL: 'https://api.openai.com/v1',
        model: 'gpt-4'
      },
      googleAI: {
        apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta'
      },
      // Add other AI providers as needed
    }
  }

  // Property Recommendation using AI
  async getPropertyRecommendations(userPreferences, recentViews, favorites) {
    try {
      const prompt = this.buildRecommendationPrompt(userPreferences, recentViews, favorites)
      
      if (this.config.openai.apiKey) {
        return await this.callOpenAI(prompt, 'recommendation')
      } else {
        // Fallback to mock data
        return this.getMockRecommendations()
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      return this.getMockRecommendations()
    }
  }

  // Natural Language Property Search
  async searchPropertiesByQuery(query, filters = {}) {
    try {
      const prompt = this.buildSearchPrompt(query, filters)
      
      if (this.config.openai.apiKey) {
        return await this.callOpenAI(prompt, 'search')
      } else {
        // Fallback to mock search
        return this.getMockSearchResults(query)
      }
    } catch (error) {
      console.error('Error in AI search:', error)
      return this.getMockSearchResults(query)
    }
  }

  // Property Valuation using AI
  async getPropertyValuation(propertyData) {
    try {
      const prompt = this.buildValuationPrompt(propertyData)
      
      if (this.config.openai.apiKey) {
        return await this.callOpenAI(prompt, 'valuation')
      } else {
        // Fallback to mock valuation
        return this.getMockValuation(propertyData)
      }
    } catch (error) {
      console.error('Error getting AI valuation:', error)
      return this.getMockValuation(propertyData)
    }
  }

  // Market Analysis using AI
  async getMarketAnalysis(location, propertyType) {
    try {
      const prompt = this.buildMarketAnalysisPrompt(location, propertyType)
      
      if (this.config.openai.apiKey) {
        return await this.callOpenAI(prompt, 'market_analysis')
      } else {
        // Fallback to mock analysis
        return this.getMockMarketAnalysis(location)
      }
    } catch (error) {
      console.error('Error getting market analysis:', error)
      return this.getMockMarketAnalysis(location)
    }
  }

  // Chat Assistant using AI
  async getChatResponse(message, conversationHistory = []) {
    try {
      const prompt = this.buildChatPrompt(message, conversationHistory)
      
      if (this.config.openai.apiKey) {
        return await this.callOpenAI(prompt, 'chat')
      } else {
        // Fallback to mock responses
        return this.getMockChatResponse(message)
      }
    } catch (error) {
      console.error('Error getting chat response:', error)
      return this.getMockChatResponse(message)
    }
  }

  // OpenAI API Integration
  async callOpenAI(prompt, taskType) {
    const response = await fetch(`${this.config.openai.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.openai.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.openai.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(taskType)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return this.parseAIResponse(data.choices[0].message.content, taskType)
  }

  // Google AI Integration (Alternative)
  async callGoogleAI(prompt, taskType) {
    const response = await fetch(`${this.config.googleAI.baseURL}/models/gemini-pro:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.googleAI.apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: this.getSystemPrompt(taskType) + '\n\n' + prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    return this.parseAIResponse(data.candidates[0].content.parts[0].text, taskType)
  }

  // System prompts for different tasks
  getSystemPrompt(taskType) {
    const prompts = {
      recommendation: `You are an AI real estate assistant. Provide property recommendations based on user preferences. Return JSON with properties array containing id, title, price, location, image, aiScore, and matchReason.`,
      search: `You are an AI real estate search assistant. Parse natural language queries and return relevant properties. Return JSON with properties array and search insights.`,
      valuation: `You are an AI property valuation expert. Analyze property data and provide accurate valuations with market insights. Return JSON with estimated value, range, confidence, and market insights.`,
      market_analysis: `You are an AI real estate market analyst. Provide detailed market analysis for specific locations and property types. Return JSON with market trends, insights, and recommendations.`,
      chat: `You are a helpful AI real estate assistant. Provide accurate, helpful responses about properties, mortgages, market trends, and real estate advice. Be conversational and informative.`
    }
    return prompts[taskType] || prompts.chat
  }

  // Build prompts for different tasks
  buildRecommendationPrompt(userPreferences, recentViews, favorites) {
    return `
    User Preferences: ${JSON.stringify(userPreferences)}
    Recent Views: ${JSON.stringify(recentViews)}
    Favorites: ${JSON.stringify(favorites)}
    
    Based on this information, recommend 3-5 properties that would be a good match for this user.
    Consider their preferences, viewing history, and market trends.
    `
  }

  buildSearchPrompt(query, filters) {
    return `
    Search Query: "${query}"
    Additional Filters: ${JSON.stringify(filters)}
    
    Parse this natural language query and find relevant properties.
    Extract key criteria like price range, bedrooms, bathrooms, location, and features.
    `
  }

  buildValuationPrompt(propertyData) {
    return `
    Property Data: ${JSON.stringify(propertyData)}
    
    Provide a comprehensive property valuation including:
    - Estimated market value
    - Value range (min/max)
    - Confidence level
    - Price per square foot
    - Market insights and trends
    `
  }

  buildMarketAnalysisPrompt(location, propertyType) {
    return `
    Location: ${location}
    Property Type: ${propertyType}
    
    Provide detailed market analysis including:
    - Current market trends
    - Price appreciation rates
    - Days on market
    - Supply and demand
    - Investment opportunities
    `
  }

  buildChatPrompt(message, conversationHistory) {
    return `
    Conversation History: ${JSON.stringify(conversationHistory)}
    Current Message: "${message}"
    
    Provide a helpful response about real estate topics.
    `
  }

  // Parse AI responses based on task type
  parseAIResponse(response, taskType) {
    try {
      // Try to parse as JSON first
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      // Fallback for chat responses
      if (taskType === 'chat') {
        return { response: response.trim() }
      }
      
      // Default parsing
      return { data: response.trim() }
    } catch (error) {
      console.error('Error parsing AI response:', error)
      return { error: 'Failed to parse AI response', raw: response }
    }
  }

  // Mock data fallbacks
  getMockRecommendations() {
    return {
      properties: [
        {
          id: 1,
          title: "Modern Downtown Apartment",
          price: "$450,000",
          location: "Downtown District",
          image: assets.project_img_1,
          aiScore: 0.95,
          matchReason: "Matches your budget and preferred location"
        },
        {
          id: 2,
          title: "Family Home with Garden",
          price: "$650,000",
          location: "Suburban Area",
          image: assets.project_img_2,
          aiScore: 0.88,
          matchReason: "Similar to properties you've viewed recently"
        }
      ],
      insights: {
        marketTrend: "Properties in your preferred area are appreciating 5.2% annually",
        bestTimeToBuy: "Current market conditions favor buyers in the next 3 months"
      }
    }
  }

  getMockSearchResults(query) {
    return {
      properties: [
        {
          id: 1,
          title: "Search Result Property",
          price: "$400,000",
          location: "Search Area",
          image: assets.project_img_1,
          matchScore: 0.85
        }
      ],
      queryUnderstanding: `Found properties matching "${query}"`,
      suggestions: "Try adding more specific criteria for better results"
    }
  }

  getMockValuation(propertyData) {
    const baseValue = 250000
    const sqft = parseInt(propertyData.squareFootage) || 1500
    const estimated = Math.round(baseValue * (sqft / 1500))
    
    return {
      estimated: estimated,
      range: Math.round(estimated * 0.1),
      confidence: 85,
      pricePerSqft: Math.round(estimated / sqft),
      marketInsights: {
        trend: "Market is appreciating at 4.8% annually",
        comparableSales: "3 similar properties sold recently"
      }
    }
  }

  getMockMarketAnalysis(location) {
    return {
      marketTrend: "Strong buyer demand in this area",
      appreciationRate: "5.2% annually",
      daysOnMarket: "Average 45 days",
      supplyDemand: "Low inventory, high demand",
      recommendations: "Good time to buy, prices expected to rise"
    }
  }

  getMockChatResponse(message) {
    const responses = {
      'mortgage': "I can help you with mortgage calculations! For a $500,000 home with 20% down payment and 3.5% interest rate over 30 years, your monthly payment would be approximately $1,796.",
      'market': "Based on current market data, property values in your area have increased by 5.2% over the last year.",
      'investment': "For investment properties, I recommend focusing on areas with strong rental demand and cap rates above 5%.",
      'default': "I understand you're asking about real estate. I can help with property searches, mortgage calculations, market analysis, and more. Could you please be more specific?"
    }

    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('mortgage')) return responses.mortgage
    if (lowerMessage.includes('market')) return responses.market
    if (lowerMessage.includes('investment')) return responses.investment
    return responses.default
  }
}

// Export singleton instance
export default new AIService()
