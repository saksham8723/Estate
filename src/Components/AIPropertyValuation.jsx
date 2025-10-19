import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, MapPin, Home, DollarSign, BarChart3 } from 'lucide-react'

const AIPropertyValuation = () => {
  const [formData, setFormData] = useState({
    propertyType: 'single-family',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    location: '',
    lotSize: '',
    condition: 'good'
  })
  const [valuation, setValuation] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [marketInsights, setMarketInsights] = useState({})

  const propertyTypes = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condo/Apartment' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'multi-family', label: 'Multi-Family' }
  ]

  const conditions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateValuation = async () => {
    setIsCalculating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock AI valuation algorithm
    const basePrice = 250 // Base price per sq ft
    const sqft = parseInt(formData.squareFootage) || 0
    const beds = parseInt(formData.bedrooms) || 0
    const baths = parseInt(formData.bathrooms) || 0
    const year = parseInt(formData.yearBuilt) || 2020
    
    let pricePerSqft = basePrice
    
    // Adjustments based on property type
    switch (formData.propertyType) {
      case 'condo':
        pricePerSqft *= 0.9
        break
      case 'townhouse':
        pricePerSqft *= 0.95
        break
      case 'multi-family':
        pricePerSqft *= 1.1
        break
    }

    // Adjustments based on condition
    switch (formData.condition) {
      case 'excellent':
        pricePerSqft *= 1.15
        break
      case 'fair':
        pricePerSqft *= 0.9
        break
      case 'poor':
        pricePerSqft *= 0.75
        break
    }

    // Age adjustment
    const age = 2024 - year
    if (age > 0) {
      pricePerSqft *= Math.max(0.7, 1 - (age * 0.005))
    }

    // Bedroom/bathroom adjustments
    pricePerSqft += (beds - 3) * 10
    pricePerSqft += (baths - 2) * 15

    const estimatedValue = Math.round(sqft * pricePerSqft)
    const range = Math.round(estimatedValue * 0.1) // ±10% range

    setValuation({
      estimated: estimatedValue,
      range: range,
      min: estimatedValue - range,
      max: estimatedValue + range,
      pricePerSqft: Math.round(pricePerSqft),
      confidence: 85 + Math.random() * 10
    })

    setMarketInsights({
      marketTrend: "Properties in this area are appreciating at 4.8% annually",
      comparableSales: "3 similar properties sold in the last 3 months",
      daysOnMarket: "Average time on market: 42 days",
      pricePerSqft: `Average price per sq ft: $${Math.round(pricePerSqft * 0.95)} - $${Math.round(pricePerSqft * 1.05)}`
    })

    setIsCalculating(false)
  }

  const isFormValid = () => {
    return formData.squareFootage && formData.bedrooms && formData.bathrooms && formData.location
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="text-blue-600 mr-2" size={24} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI Property Valuation
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Property Details
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Square Footage
                </label>
                <input
                  type="number"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  placeholder="e.g., 2010"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location/Address
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter address or neighborhood"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {conditions.map(condition => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateValuation}
              disabled={!isFormValid() || isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Calculator size={20} />
                  <span>Calculate Value</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Results */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            AI Valuation Results
          </h4>

          {isCalculating && (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          )}

          {valuation && !isCalculating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Main Valuation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                <div className="text-center">
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Estimated Value
                  </h5>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${valuation.estimated.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Range: ${valuation.min.toLocaleString()} - ${valuation.max.toLocaleString()}
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Confidence: {Math.round(valuation.confidence)}%
                  </div>
                </div>
              </div>

              {/* Price per sq ft */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price per sq ft
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${valuation.pricePerSqft}
                  </span>
                </div>
              </div>

              {/* Market Insights */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <BarChart3 size={16} className="mr-2" />
                  Market Insights
                </h5>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <TrendingUp size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{marketInsights.marketTrend}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Home size={16} className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{marketInsights.comparableSales}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{marketInsights.daysOnMarket}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <DollarSign size={16} className="text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{marketInsights.pricePerSqft}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!valuation && !isCalculating && (
            <div className="text-center py-12">
              <Calculator className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                Enter property details to get an AI-powered valuation estimate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPropertyValuation
