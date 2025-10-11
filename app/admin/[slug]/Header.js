'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Header({userName}) {



  return (
    <div className=" mb-12">
    
   <div className=' flex justify-around items-center text-center'>
      <span className="text-2xl text-[var(--text-color)] font-[600] ">
      Welcome, to admin dasbord {userName || 'gust'}
      </span>
      
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className=" bg-[var(--sec-accent-color)]  hover:bg-[var(--accent-color)] text-[var(--bg-color)] font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
      >
       
        Logout
      </button>
      </div>
  </div>
  )
}

export default Header