'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export default function Error() {
  return (
   <div className=' mt-14 min-h-11'>
    
    
     <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className=" bg-[var(--sec-accent-color)]  hover:bg-[var(--accent-color)] text-[var(--bg-color)] font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            </button></div>
   
  )
}
