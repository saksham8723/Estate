import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, DollarSign, Bed, Bath, Square, Filter, Grid, List, Heart, Eye } from 'lucide-react'
import { projectsData } from '../assets/assets'
import PropertyCard from '../Components/PropertyCard'
import MortgageCalculator from '../Components/MortgageCalculator'

function SearchResults() {
  const [properties, setProperties] = useState(projectsData)
  const [filteredProperties, setFilteredProperties] = useState(projectsData)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: ''
  })

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    filterProperties()
  }, [filters, searchTerm])

  const filterProperties = () => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLocation = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())
      const matchesPrice = !filters.priceRange || checkPriceRange(property.price, filters.priceRange)
      
      return matchesSearch && matchesLocation && matchesPrice
    })
    
    setFilteredProperties(filtered)
  }

  const checkPriceRange = (price, range) => {
    const numericPrice = parseInt(price.replace(/[$,]/g, ''))
    switch(range) {
      case '0-200000':
        return numericPrice <= 200000
      case '200000-500000':
        return numericPrice >= 200000 && numericPrice <= 500000
      case '500000-1000000':
        return numericPrice >= 500000 && numericPrice <= 1000000
      case '1000000+':
        return numericPrice >= 1000000
      default:
        return true
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: ''
    })
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Search Properties
          </motion.h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by property name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Clear all
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Locations</option>
                  <option value="california">California</option>
                  <option value="san francisco">San Francisco</option>
                  <option value="chicago">Chicago</option>
                  <option value="los angeles">Los Angeles</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Prices</option>
                  <option value="0-200000">$0 - $200,000</option>
                  <option value="200000-500000">$200,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>

              {/* Mortgage Calculator Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {showCalculator ? 'Hide' : 'Show'} Mortgage Calculator
                </button>
              </div>

              {showCalculator && (
                <div className="mt-6">
                  <MortgageCalculator />
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredProperties.length} of {properties.length} properties
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <PropertyCard property={property} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
