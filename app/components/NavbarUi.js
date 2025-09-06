"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function NavbarUi({ session, logoSrc }) {







  return (
    <section className="">
      <nav className='grid grid-cols-[1fr_1fr] items-center justify-start fixed top-0 left-0 pl-2 pr-8 right-0 bg-[var(--text-color)] text-[var(--accent-color)] z-100'>
        <div className="pl-3">
          <Image
            className='w-32 h-auto'
            src='/image/logo.png'
            width={50}
            height={30}
            alt='logo'
          />

        </div>
        <div className='flex justify-items-center justify-between items-center  '>
          <NavLink params='/'>home</NavLink>
          <NavLink params='/about'>about</NavLink>
          <NavLink params='/product'>product</NavLink>
          <NavLink params='/contact'>contact</NavLink>

          {session ? (
            <NavLink params={`/admin/${session?.user?.userName}`}>
              <Image
                className='w-8 h-8 rounded-full object-cover'
                src={logoSrc}
                width={32}
                height={32}
                alt='profile'
              />
            </NavLink>
          ) : (
            <NavLink params='/log-in'>log in</NavLink>
          )}




        </div>
      </nav>
    </section>
  )
}

export default NavbarUi

function NavLink({ params, children }) {
  return (
    <Link href={params} className=' text-xl  text-gray-700 hover:text-blue-600 transition duration-300 font-medium'>{children}</Link>
  )
}

