import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail, Calendar } from 'lucide-react'
import { projectsData } from '../assets/assets'
import MortgageCalculator from '../Components/MortgageCalculator'

function PropertyDetails() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Mock property data - in real app, fetch by ID
  const property = projectsData[parseInt(id) || 0] || projectsData[0]
  
  const images = [
    property.image,
    property.image,
    property.image,
    property.image
  ]

  const features = [
    'Central Air Conditioning',
    'Hardwood Floors',
    'Modern Kitchen',
    'Walk-in Closet',
    'Balcony',
    'Parking Garage',
    'Gym Access',
    'Swimming Pool'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/search" className="hover:text-blue-600">Properties</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{property.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="relative">
                <img 
                  src={images[selectedImage]} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700'}`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/80 text-gray-700"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${property.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="mr-1" />
                    {property.location}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="text-3xl font-bold text-blue-600">{property.price}</div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Bed size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Bath size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Square size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">1,200</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This stunning property offers modern amenities and a prime location. Featuring an open-concept layout, 
                  high-end finishes, and plenty of natural light. The kitchen is equipped with stainless steel appliances 
                  and granite countertops. The master bedroom includes a walk-in closet and en-suite bathroom. 
                  Perfect for families or professionals looking for comfort and style.
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Agent</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </div>

            {/* Agent Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Listed by</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/profile_img_1.png" 
                  alt="Agent" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Real Estate Agent</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone size={16} className="mr-2" />
                  (555) 123-4567
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail size={16} className="mr-2" />
                  sarah@estate.com
                </div>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mortgage Calculator</h3>
              <MortgageCalculator propertyPrice={parseInt(property.price.replace(/[$,]/g, ''))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
