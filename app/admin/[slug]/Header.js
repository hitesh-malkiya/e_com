'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Header({userName}) {



  return (
    <header className=" mb-12">
    
   <div className=' flex justify-around items-center text-center'>
      <h1 className="text-2xl text-[var(--text-color)] font-[600] ">
      Welcome, to admin dasbord {userName || 'gust'}
      </h1>
      
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className=" bg-[var(--sec-accent-color)]  hover:bg-[var(--accent-color)] text-[var(--bg-color)] font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
      >
       
        Logout
      </button>
      </div>
  </header>
  )
}

export default Header