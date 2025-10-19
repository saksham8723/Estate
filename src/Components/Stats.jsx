import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [counts, setCounts] = useState({
    properties: 0,
    clients: 0,
    cities: 0,
    years: 0
  })

  const stats = [
    { label: 'Properties Sold', value: 500, suffix: '+' },
    { label: 'Happy Clients', value: 1000, suffix: '+' },
    { label: 'Cities Covered', value: 50, suffix: '+' },
    { label: 'Years Experience', value: 15, suffix: '+' }
  ]

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounts({
          properties: Math.floor(500 * progress),
          clients: Math.floor(1000 * progress),
          cities: Math.floor(50 * progress),
          years: Math.floor(15 * progress)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-20 bg-blue-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {index === 0 && counts.properties}
                {index === 1 && counts.clients}
                {index === 2 && counts.cities}
                {index === 3 && counts.years}
                {stat.suffix}
              </motion.div>
              <p className="text-blue-100 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

