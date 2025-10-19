import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Filter, Sparkles, Home, DollarSign, Users, Clock } from 'lucide-react'
import PropertyCard from './PropertyCard'
import { assets } from '../assets/assets'

const AISearch = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [aiInsights, setAiInsights] = useState({})
  const [searchHistory, setSearchHistory] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const popularSearches = [
    "Homes under $500k in downtown",
    "3 bedroom houses with garage",
    "Investment properties near university",
    "New construction homes",
    "Homes with swimming pool",
    "Properties with mountain view"
  ]

  const aiSuggestions = [
    "Show me family homes in good school districts",
    "Find investment properties with high rental yield",
    "Homes with modern kitchens and open floor plans",
    "Properties close to public transportation",
    "Houses with large backyards for families"
  ]

  // AI query parser
  const parseQuery = (query) => {
    const lowerQuery = query.toLowerCase()
    const parsed = {
      priceRange: null,
      bedrooms: null,
      bathrooms: null,
      location: null,
      features: [],
      propertyType: null
    }

    // Extract price range
    const priceMatch = lowerQuery.match(/(?:under|less than|up to|max|maximum)\s*\$?(\d+)(?:k|000)?/i)
    if (priceMatch) {
      parsed.priceRange = parseInt(priceMatch[1]) * 1000
    }

    // Extract bedrooms
    const bedMatch = lowerQuery.match(/(\d+)\s*(?:bed|bedroom|br)/i)
    if (bedMatch) {
      parsed.bedrooms = parseInt(bedMatch[1])
    }

    // Extract bathrooms
    const bathMatch = lowerQuery.match(/(\d+)\s*(?:bath|bathroom|ba)/i)
    if (bathMatch) {
      parsed.bathrooms = parseInt(bathMatch[1])
    }

    // Extract location
    const locationKeywords = ['downtown', 'suburb', 'university', 'school', 'park', 'lake', 'mountain']
    locationKeywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        parsed.location = keyword
      }
    })

    // Extract features
    const features = ['garage', 'pool', 'garden', 'modern', 'new', 'investment', 'family']
    features.forEach(feature => {
      if (lowerQuery.includes(feature)) {
        parsed.features.push(feature)
      }
    })

    // Extract property type
    if (lowerQuery.includes('house') || lowerQuery.includes('home')) {
      parsed.propertyType = 'house'
    } else if (lowerQuery.includes('apartment') || lowerQuery.includes('condo')) {
      parsed.propertyType = 'apartment'
    }

    return parsed
  }

  const performAISearch = async (searchQuery) => {
    setIsSearching(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const parsedQuery = parseQuery(searchQuery)
    
    // Mock search results based on parsed query
    const mockResults = [
      {
        id: 1,
        title: "Modern Family Home",
        price: "$450,000",
        location: "Downtown District",
        image: assets.project_img_1,
        matchScore: 0.95,
        features: ["3 beds", "2 baths", "Garage", "Modern kitchen"]
      },
      {
        id: 2,
        title: "Investment Property",
        price: "$320,000",
        location: "University Area",
        image: assets.project_img_2,
        matchScore: 0.88,
        features: ["2 beds", "1 bath", "High rental yield"]
      },
      {
        id: 3,
        title: "Luxury Apartment",
        price: "$280,000",
        location: "Downtown Core",
        image: assets.project_img_3,
        matchScore: 0.82,
        features: ["1 bed", "1 bath", "City view", "Modern amenities"]
      },
      {
        id: 4,
        title: "Suburban Family House",
        price: "$580,000",
        location: "Suburban Area",
        image: assets.project_img_4,
        matchScore: 0.78,
        features: ["4 beds", "3 baths", "Large backyard", "Good schools"]
      }
    ]

    // Filter results based on parsed query
    let filteredResults = mockResults

    if (parsedQuery.priceRange) {
      filteredResults = filteredResults.filter(property => 
        parseInt(property.price.replace(/[$,]/g, '')) <= parsedQuery.priceRange
      )
    }

    if (parsedQuery.bedrooms) {
      filteredResults = filteredResults.filter(property => 
        property.features.some(feature => feature.includes(`${parsedQuery.bedrooms} beds`))
      )
    }

    setSearchResults(filteredResults)
    setAiInsights({
      queryUnderstanding: `I found ${filteredResults.length} properties matching your criteria`,
      suggestions: "Try adding more specific features like 'with garage' or 'near schools' for better results",
      marketInsight: "Properties in this range are selling 15% faster than last year"
    })

    // Add to search history
    setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)])
    setIsSearching(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performAISearch(query)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    performAISearch(suggestion)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Sparkles className="text-blue-600 mr-2" size={24} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI-Powered Property Search
        </h3>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your dream home in natural language..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search size={16} />
            )}
          </button>
        </div>
      </form>

      {/* AI Insights */}
      {aiInsights.queryUnderstanding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg mb-6"
        >
          <div className="flex items-start space-x-3">
            <Sparkles className="text-blue-600 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                AI Understanding
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {aiInsights.queryUnderstanding}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {aiInsights.suggestions}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {isSearching && (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {searchResults.length > 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Search Results ({searchResults.length})
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Sorted by AI relevance
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {Math.round(property.matchScore * 100)}% Match
                </div>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search Suggestions */}
      {!searchResults.length && !isSearching && (
        <div className="space-y-6">
          {/* Popular Searches */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Search className="mr-2" size={20} />
              Popular Searches
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {popularSearches.map((search, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestionClick(search)}
                  className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{search}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Sparkles className="mr-2" size={20} />
              AI-Powered Suggestions
            </h4>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 rounded-lg transition-all"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{suggestion}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    AI understands natural language queries
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Recent Searches
              </h4>
              <div className="space-y-2">
                {searchHistory.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AISearch
