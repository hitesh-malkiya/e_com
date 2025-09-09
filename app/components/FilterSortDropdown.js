'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function FilterSortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State for dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // State for current values
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name')
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [search, setSearch] = useState(searchParams.get('search') || '')

  // Available categories (you can fetch these from an API or define them statically)
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Beauty',
    'Automotive',
    'Other'
  ]

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'category', label: 'Category' },
    { value: 'createdAt', label: 'Date Added' }
  ]

  // Update URL when filters change
  const updateURL = (newParams) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Clear existing filter params
    params.delete('sortBy')
    params.delete('sortOrder')
    params.delete('category')
    params.delete('minPrice')
    params.delete('maxPrice')
    params.delete('search')
    params.delete('page') // Reset to first page when filtering

    // Add new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value)
      }
    })

    router.push(`/product?${params.toString()}`)
  }

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
    updateURL({
      sortBy: newSortBy,
      sortOrder: newSortOrder,
      category,
      minPrice,
      maxPrice,
      search
    })
    setIsSortOpen(false)
  }

  const handleFilterChange = () => {
    updateURL({
      sortBy,
      sortOrder,
      category,
      minPrice,
      maxPrice,
      search
    })
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSearch('')
    setSortBy('name')
    setSortOrder('asc')
    updateURL({
      sortBy: 'name',
      sortOrder: 'asc'
    })
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 min-w-64">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleFilterChange()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleFilterChange}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex gap-4 items-center">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <span>Sort by {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <svg className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <div key={option.value} className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={() => handleSortChange(option.value, 'asc')}
                      className={`w-full text-left text-sm ${sortBy === option.value && sortOrder === 'asc' ? 'text-blue-600 font-medium' : ''}`}
                    >
                      {option.label} (A-Z)
                    </button>
                    <button
                      onClick={() => handleSortChange(option.value, 'desc')}
                      className={`w-full text-left text-sm ${sortBy === option.value && sortOrder === 'desc' ? 'text-blue-600 font-medium' : ''}`}
                    >
                      {option.label} (Z-A)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <span>Filters</span>
            <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                    <input
                      type="number"
                      placeholder="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleFilterChange}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(isSortOpen || isFilterOpen) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setIsSortOpen(false)
            setIsFilterOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default FilterSortDropdown
