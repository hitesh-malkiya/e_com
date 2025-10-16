'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Header({userName , isAdmin}) {



  return (
    <header className="flex justify-around items-center mb-12">
    
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">
      Welcome, {userName || 'gust'}
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
    <div className='flex items-center space-x-4'>
      <h1 className="text-2xl font-bold text-gray-800">
        <Link href={isAdmin ? `/admin/${userName}` : '/admin'} >{isAdmin ? ` Dashboard`: 'Register Your Brand'} </Link> </h1>
    </div>
  </header>
  )
}

export default Header