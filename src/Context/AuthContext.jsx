import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Single admin email - only this email can be admin
  const ADMIN_EMAIL = 'admin@estate.com'

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user is admin
      const isAdmin = email === ADMIN_EMAIL
      
      // Mock user data
      const userData = {
        id: 1,
        name: isAdmin ? 'Admin User' : 'John Doe',
        email: email,
        avatar: '/profile_img_1.png',
        role: isAdmin ? 'admin' : 'user'
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      toast.success(`Login successful! Welcome ${isAdmin ? 'Admin' : 'User'}!`)
      return true
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return false
    }
  }

  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user is trying to sign up as admin
      const isAdmin = email === ADMIN_EMAIL
      
      // Only allow admin signup if it's the designated admin email
      if (isAdmin) {
        toast.success('Admin account created successfully!')
      } else {
        toast.success('Account created successfully!')
      }
      
      // Mock user data
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: '/profile_img_1.png',
        role: isAdmin ? 'admin' : 'user'
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    } catch (error) {
      toast.error('Signup failed. Please try again.')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully!')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    toast.success('Profile updated successfully!')
  }

  const isAdmin = () => {
    return user && user.role === 'admin'
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAdmin,
    ADMIN_EMAIL
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
