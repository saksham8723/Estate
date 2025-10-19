import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonialsData } from '../assets/assets'

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1))
  }

  return (
    <section id="Testimonials" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 md:p-12"
              >
                <div className="text-center">
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                    "{testimonialsData[currentIndex].text}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonialsData[currentIndex].image}
                      alt={testimonialsData[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonialsData[currentIndex].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonialsData[currentIndex].title}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

