import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projectsData } from '../assets/assets'
import PropertyCard from './PropertyCard'
import ContactAgent from './ContactAgent'
import { MessageCircle } from 'lucide-react'

function Projects() {
  const [properties, setProperties] = useState([])
  const [showContactAgent, setShowContactAgent] = useState(false)

  useEffect(() => {
    // Load properties from localStorage (managed by admin)
    const storedProperties = localStorage.getItem('properties')
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties))
    } else {
      // Fallback to default properties if none exist
      setProperties(projectsData)
    }
  }, [])

  return (
    <section id="Projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the most desirable locations
          </p>
          
          {/* Contact Agent Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setShowContactAgent(true)}
            className="mt-6 inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <MessageCircle className="mr-2" size={20} />
            Contact Real Estate Agent
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <motion.div
              key={property.id || property.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/search"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Properties
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Contact Agent Modal */}
      <ContactAgent 
        isOpen={showContactAgent} 
        onClose={() => setShowContactAgent(false)} 
      />
    </section>
  )
}

export default Projects
