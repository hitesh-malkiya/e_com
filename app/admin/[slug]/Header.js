'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Header({userName}) {



  return (
    <div className="flex justify-between items-center mb-12">
    <div className="text-center flex-1">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 text-lg">Manage your products and inventory</p>
    </div>
    
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">
      Welcome, {userName || 'Admin'}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </div>
  )
}

export default Header