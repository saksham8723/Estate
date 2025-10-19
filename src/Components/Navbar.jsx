import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, User, LogOut, Search, Heart, Crown, Settings } from 'lucide-react'
import { assets } from "../assets/assets"
import { useAuth } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/search' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={isScrolled ? (isDark ? assets.logo_dark : assets.logo) : assets.logo} alt="Estate Logo" className="h-8 w-auto" />
          <span className={`hidden sm:inline text-xl font-bold transition-colors duration-300 ${
            isScrolled 
              ? 'text-gray-900 dark:text-white' 
              : 'text-white'
          }`}>
            Estate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`transition-colors duration-200 ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                  : 'text-white hover:text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/search')}
            className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
            }`}
          >
            <Search size={20} />
          </motion.button>

          {/* Favorites */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
            }`}
          >
            <Heart size={20} />
          </motion.button>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Admin Badge */}
              {isAdmin() && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-1 bg-purple-600/20 backdrop-blur-sm px-3 py-1 rounded-full text-purple-200 border border-purple-400/30"
                >
                  <Crown size={14} />
                  <span className="text-xs font-medium">Admin</span>
                </motion.div>
              )}
              
              <Link
                to={isAdmin() ? "/admin" : "/dashboard"}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                <span className="hidden lg:block">{user.name}</span>
              </Link>
              
              {/* Admin Settings */}
              {isAdmin() && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/admin')}
                  className="p-2 rounded-full bg-purple-500/20 backdrop-blur-sm text-purple-200 hover:bg-purple-500/30 transition-colors"
                  title="Admin Dashboard"
                >
                  <Settings size={20} />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-red-500/20 text-red-600 hover:bg-red-500/30' 
                    : 'bg-red-500/20 backdrop-blur-sm text-white hover:bg-red-500/30'
                }`}
              >
                <LogOut size={20} />
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className={`transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400' 
              : 'bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40'
          }`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-lg"
        >
          <div className="container mx-auto py-4 px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-400">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              {user ? (
                <div className="space-y-3">
                  {/* Admin Badge Mobile */}
                  {isAdmin() && (
                    <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-2 rounded-lg border border-purple-400/30">
                      <Crown size={16} className="text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Admin Account</span>
                    </div>
                  )}
                  
                  <Link
                    to={isAdmin() ? "/admin" : "/dashboard"}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 py-3 text-gray-900 dark:text-white"
                  >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span>{user.name}</span>
                  </Link>
                  
                  {/* Admin Dashboard Link Mobile */}
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 py-3 text-purple-600 hover:text-purple-700"
                    >
                      <Settings size={20} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 py-3 text-red-600 w-full"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
