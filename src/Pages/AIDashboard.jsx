import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Search, 
  Calculator, 
  MessageCircle, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Home,
  Users,
  DollarSign
} from 'lucide-react'
import AIRecommendations from '../Components/AIRecommendations'
import AISearch from '../Components/AISearch'
import AIPropertyValuation from '../Components/AIPropertyValuation'
import AIChatAssistant from '../Components/AIChatAssistant'

const AIDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [userPreferences] = useState({
    budget: '$500,000',
    location: 'Downtown',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house'
  })

  const aiFeatures = [
    {
      id: 'recommendations',
      title: 'AI Recommendations',
      description: 'Get personalized property suggestions based on your preferences and behavior',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'search',
      title: 'Natural Language Search',
      description: 'Search properties using everyday language instead of complex filters',
      icon: Search,
      color: 'green'
    },
    {
      id: 'valuation',
      title: 'AI Property Valuation',
      description: 'Get instant property value estimates with market insights',
      icon: Calculator,
      color: 'purple'
    },
    {
      id: 'chat',
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your real estate questions',
      icon: MessageCircle,
      color: 'orange'
    }
  ]

  const aiStats = [
    {
      title: 'Properties Analyzed',
      value: '2,847',
      change: '+12%',
      icon: Home,
      color: 'blue'
    },
    {
      title: 'AI Recommendations',
      value: '156',
      change: '+8%',
      icon: Brain,
      color: 'green'
    },
    {
      title: 'Valuations Generated',
      value: '892',
      change: '+15%',
      icon: Calculator,
      color: 'purple'
    },
    {
      title: 'Chat Conversations',
      value: '1,234',
      change: '+23%',
      icon: MessageCircle,
      color: 'orange'
    }
  ]

  const colorMap = {
    blue: { bgLight: 'bg-blue-100', bgDark: 'dark:bg-blue-900/20', text: 'text-blue-600' },
    green: { bgLight: 'bg-green-100', bgDark: 'dark:bg-green-900/20', text: 'text-green-600' },
    purple: { bgLight: 'bg-purple-100', bgDark: 'dark:bg-purple-900/20', text: 'text-purple-600' },
    orange: { bgLight: 'bg-orange-100', bgDark: 'dark:bg-orange-900/20', text: 'text-orange-600' }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return <AIRecommendations userPreferences={userPreferences} />
      case 'search':
        return <AISearch />
      case 'valuation':
        return <AIPropertyValuation />
      default:
        return (
          <div className="space-y-8">
            {/* AI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${colorMap[stat.color].bgLight} ${colorMap[stat.color].bgDark}`}>
                      <stat.icon className={`${colorMap[stat.color].text}`} size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveTab(feature.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${colorMap[feature.color].bgLight} ${colorMap[feature.color].bgDark}`}>
                      <feature.icon className={`${colorMap[feature.color].text}`} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Try it now →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="text-blue-600 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Market Insights
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Market Trend</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Properties in your area are appreciating at 5.2% annually
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Best Time to Buy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current market conditions favor buyers in the next 3 months
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="text-purple-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Investment Potential</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      High ROI potential in the downtown district
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 mr-4">
              <Brain className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI-Powered Real Estate Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Experience the future of real estate with our AI-powered tools
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
              { id: 'search', label: 'Smart Search', icon: Search },
              { id: 'valuation', label: 'Property Valuation', icon: Calculator }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {renderTabContent()}
        </div>
      </div>

      {/* AI Chat Assistant - Always available */}
      <AIChatAssistant />
    </div>
  )
}

export default AIDashboard
