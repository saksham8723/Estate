import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import PropertyDetails from './Pages/PropertyDetails'
import SearchResults from './Pages/SearchResults'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Dashboard from './Pages/Dashboard'
import AIDashboard from './Pages/AIDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import AIChatAssistant from './Components/AIChatAssistant'

function App() {
 
  return (
    <div className='w-full overflow-hidden min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20'>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-dashboard" element={<AIDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      
      {/* AI Chat Assistant - Available on all pages */}
      <AIChatAssistant />
    </div>
  )
}

export default App
