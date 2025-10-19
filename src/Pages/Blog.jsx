import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Homebuyers",
      excerpt: "Buying your first home can be overwhelming. Here are essential tips to make the process smoother...",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Buying Guide",
      image: "/project_img_1.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Future of Real Estate: 2024 Trends",
      excerpt: "Discover the latest trends shaping the real estate market this year and what to expect...",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Market Trends",
      image: "/project_img_2.jpg",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Investment Properties: Where to Start",
      excerpt: "Thinking about real estate investment? Learn the basics and strategies for success...",
      author: "Emily Davis",
      date: "March 10, 2024",
      category: "Investment",
      image: "/project_img_3.jpg",
      readTime: "6 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Estate Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest real estate trends, tips, and insights from our experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
