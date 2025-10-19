import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, X, Minimize2, Maximize2, MessageCircle } from 'lucide-react'
import ContactAgent from './ContactAgent'

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showContactAgent, setShowContactAgent] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI real estate assistant. I can help you with property searches, mortgage calculations, market insights, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // AI response generator
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = {
      'mortgage': "I can help you calculate mortgage payments! For a $500,000 home with 20% down payment and 3.5% interest rate over 30 years, your monthly payment would be approximately $1,796. Would you like me to calculate for different scenarios?",
      'market': "Based on current market data, property values in your area have increased by 5.2% over the last year. The average time on market is 45 days, and there's a 3.2 month supply of inventory, indicating a seller's market.",
      'investment': "For investment properties, I recommend focusing on areas with strong rental demand. Look for properties with cap rates above 5% and positive cash flow potential. Consider factors like job growth, school ratings, and infrastructure development.",
      'search': "I can help you find properties! What's your budget range, preferred location, and must-have features? I'll search our database and provide personalized recommendations.",
      'agent': "I'd be happy to connect you with one of our real estate agents! They can provide personalized assistance with property viewings, negotiations, and expert advice. Would you like me to open the contact form?",
      'default': "I understand you're asking about real estate. I can help with property searches, mortgage calculations, market analysis, investment advice, and more. Could you please be more specific about what you'd like to know?"
    }

    let response = responses.default
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('mortgage') || lowerMessage.includes('payment') || lowerMessage.includes('loan')) {
      response = responses.mortgage
    } else if (lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('price')) {
      response = responses.market
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('roi') || lowerMessage.includes('rental')) {
      response = responses.investment
    } else if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('property')) {
      response = responses.search
    } else if (lowerMessage.includes('agent') || lowerMessage.includes('contact') || lowerMessage.includes('human')) {
      response = responses.agent
    }

    setIsTyping(false)
    return response
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    const aiResponse = await generateAIResponse(inputValue)
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, botMessage])

    // If user asked about contacting an agent, show contact form
    if (inputValue.toLowerCase().includes('agent') || inputValue.toLowerCase().includes('contact') || inputValue.toLowerCase().includes('human')) {
      setTimeout(() => {
        setShowContactAgent(true)
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "Calculate mortgage payments",
    "Market trends in my area",
    "Investment property advice",
    "Find properties in my budget",
    "Contact a real estate agent"
  ]

  const handleQuickAction = (action) => {
    if (action === "Contact a real estate agent") {
      setShowContactAgent(true)
    } else {
      setInputValue(action)
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-[9999]"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Bot size={20} />
          <span className="hidden sm:inline text-sm font-medium">AI Assistant</span>
          <Maximize2 size={16} />
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 right-4 w-[90vw] sm:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Bot className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <Minimize2 size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {message.type === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <Bot size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Agent Button */}
            <div className="px-4 pb-2">
              <button
                onClick={() => setShowContactAgent(true)}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle size={16} />
                <span>Contact Real Estate Agent</span>
              </button>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about properties, mortgages, market trends..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-[9999]"
        >
          <Bot size={24} />
        </motion.button>
      )}

      {/* Contact Agent Modal */}
      <ContactAgent 
        isOpen={showContactAgent} 
        onClose={() => setShowContactAgent(false)} 
      />
    </div>
  )
}

export default AIChatAssistant
