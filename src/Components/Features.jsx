import React from 'react'
import { motion } from 'framer-motion'
import { Home, Shield, Users, Award, Clock, MapPin } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: Home,
      title: "Premium Properties",
      description: "Access to exclusive, high-quality properties in prime locations"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe and secure property transactions with full legal support"
    },
    {
      icon: Users,
      title: "Expert Agents",
      description: "Professional real estate agents with years of experience"
    },
    {
      icon: Award,
      title: "Best Deals",
      description: "Competitive pricing and the best deals in the market"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in the most desirable neighborhoods and areas"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide exceptional service and the best properties to help you find your dream home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

