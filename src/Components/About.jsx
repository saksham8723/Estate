import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Award, Clock } from 'lucide-react'

function About() {
  const features = [
    "Professional real estate expertise",
    "Personalized property recommendations",
    "Secure and transparent transactions",
    "24/7 customer support",
    "Competitive market pricing",
    "Legal and financial guidance"
  ]

  return (
    <section id="About" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              We are a leading real estate company dedicated to helping you find your perfect home. 
              With years of experience and a commitment to excellence, we provide exceptional service 
              and the best properties in prime locations.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Our team of expert agents works tirelessly to understand your needs and preferences, 
              ensuring you find a property that matches your lifestyle and budget perfectly.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Properties Sold</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="/project_img_1.jpg"
                alt="About Us"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-blue-600 rounded-lg -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
