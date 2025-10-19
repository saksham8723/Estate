import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react'

function MortgageCalculator({ propertyPrice = 250000 }) {
  const [formData, setFormData] = useState({
    homePrice: propertyPrice,
    downPayment: propertyPrice * 0.2,
    loanTerm: 30,
    interestRate: 4.5
  })

  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    calculateMortgage()
  }, [formData])

  const calculateMortgage = () => {
    const principal = formData.homePrice - formData.downPayment
    const monthlyRate = formData.interestRate / 100 / 12
    const numberOfPayments = formData.loanTerm * 12

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments)
    } else {
      const monthlyPaymentAmount = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(monthlyPaymentAmount)
    }

    const totalPaymentAmount = monthlyPayment * numberOfPayments
    setTotalPayment(totalPaymentAmount)
    setTotalInterest(totalPaymentAmount - principal)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const downPaymentPercentage = (formData.downPayment / formData.homePrice) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mortgage Calculator
        </h3>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Home Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              name="homePrice"
              value={formData.homePrice}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter home price"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Down Payment ({downPaymentPercentage.toFixed(1)}%)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter down payment"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Term (Years)
            </label>
            <select
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate (%)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                step="0.1"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter interest rate"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white">Monthly Payment</h4>
        <div className="text-2xl font-bold text-blue-600">
          {formatCurrency(monthlyPayment)}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Principal & Interest:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(monthlyPayment)}
            </div>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Property Tax (est.):</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(formData.homePrice * 0.012 / 12)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Loan Amount:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(formData.homePrice - formData.downPayment)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(totalInterest)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Payment:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        * This is an estimate. Actual payments may vary based on taxes, insurance, and other factors.
      </div>
    </div>
  )
}

export default MortgageCalculator

