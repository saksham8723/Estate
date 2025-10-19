import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Search, MapPin, DollarSign, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import headerImg from '../assets/header_img.png'

function Header() {
  return (
    <div 
      className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative'
      style={{backgroundImage: `url(${headerImg})`}}
      id='Header'
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <Navbar/>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 md:px-20 lg:px-32 pt-24 sm:pt-28 relative z-10">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-snug md:leading-tight break-words [text-wrap:balance]"
          >
            Find Your Dream
            <span className="text-blue-400 block">Home Today</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed break-words"
          >
            Discover the perfect property that matches your lifestyle. From cozy apartments to luxury estates, we have everything you need.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 focus:outline-none focus:border-blue-400">
                  <option value="">Location</option>
                  <option value="california">California</option>
                  <option value="san-francisco">San Francisco</option>
                  <option value="chicago">Chicago</option>
                  <option value="los-angeles">Los Angeles</option>
                </select>
              </div>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 focus:outline-none focus:border-blue-400">
                  <option value="">Price Range</option>
                  <option value="0-200000">$0 - $200,000</option>
                  <option value="200000-500000">$200,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
              
              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Search</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Header