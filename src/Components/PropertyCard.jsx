import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react'

function PropertyCard({ property, viewMode = 'grid' }) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 md:h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'}`}
              >
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin size={16} className="mr-1" />
                  {property.location}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Bed size={16} className="mr-2" />
                    <span className="text-sm">3 Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Bath size={16} className="mr-2" />
                    <span className="text-sm">2 Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Square size={16} className="mr-2" />
                    <span className="text-sm">1,200 sqft</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">
                  {property.price}
                </div>
                <Link
                  to={`/property/${property.id || 0}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Eye size={16} />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'}`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.price}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bed size={14} className="mr-1" />
            <span className="text-xs">3 Beds</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bath size={14} className="mr-1" />
            <span className="text-xs">2 Baths</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Square size={14} className="mr-1" />
            <span className="text-xs">1,200 sqft</span>
          </div>
        </div>
        
        <Link
          to={`/property/${property.id || 0}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard

