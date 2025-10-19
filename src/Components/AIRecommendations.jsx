import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Target, Clock } from 'lucide-react'
import PropertyCard from './PropertyCard'
import { assets } from '../assets/assets'

const AIRecommendations = ({ userPreferences, recentViews, favorites }) => {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [aiInsights, setAiInsights] = useState({})

  // Mock AI recommendation algorithm
  const generateAIRecommendations = () => {
    const mockProperties = [
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
      },
      {
        id: 3,
        title: "Investment Property",
        price: "$320,000",
        location: "University District",
        image: assets.project_img_3,
        aiScore: 0.82,
        matchReason: "High rental yield potential based on your portfolio"
      }
    ]

    // Simulate AI processing
    setTimeout(() => {
      setRecommendations(mockProperties)
      setAiInsights({
        marketTrend: "Properties in your preferred area are appreciating 5.2% annually",
        bestTimeToBuy: "Current market conditions favor buyers in the next 3 months",
        investmentPotential: "High ROI potential in the downtown district"
      })
      setIsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    generateAIRecommendations()
  }, [userPreferences])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Sparkles className="text-blue-600 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI-Powered Recommendations
          </h3>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="text-blue-600 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI-Powered Recommendations
          </h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Updated 2 minutes ago
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg"
        >
          <TrendingUp className="text-blue-600 mb-2" size={20} />
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Market Trend</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{aiInsights.marketTrend}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg"
        >
          <Clock className="text-green-600 mb-2" size={20} />
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Best Time to Buy</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{aiInsights.bestTimeToBuy}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg"
        >
          <Target className="text-purple-600 mb-2" size={20} />
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Investment Potential</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{aiInsights.investmentPotential}</p>
        </motion.div>
      </div>

      {/* Recommended Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {Math.round(property.aiScore * 100)}% Match
            </div>
            <PropertyCard property={property} />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {property.matchReason}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AIRecommendations
