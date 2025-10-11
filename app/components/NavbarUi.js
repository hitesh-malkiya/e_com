"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function NavbarUi({ session = false, logoSrc = '/image/profile-default.png', admin = false, user = '' }) {
  return (
    <section className="">
      <nav className='grid grid-cols-[1fr_1fr] items-center justify-start gap-8 fixed top-0 left-0 pl-2 pr-8 right-0 bg-[var(--bg-color)] text-[var(--text-color)] z-[100]'>
        <div className="pl-3 flex justify-items-center justify-between items-center ">
          <Image
            className='w-32 h-auto'
            src='/image/logo.png'
            width={50}
            height={30}
            alt='logo'
          />
          <input
            type="text"
            placeholder="Search your product"
            name="search"
            className="ml-6 px-4 py-2 rounded-lg border w-full border-[var(--sec-bg-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] bg-[var(--sec-bg-color)] text-[var(--text-color)] transition duration-200 shadow-sm"
          />
        </div>
        <div className='flex justify-items-center justify-between items-center text-[var(--bg-color)] '>
          <NavLink params='/'>home</NavLink>
          <NavLink params='/about'>about</NavLink>
          <NavLink params='/product'>product</NavLink>
          <NavLink params='/contact'>contact</NavLink>

          {session ? (
            <NavLink params={admin ? `/admin/${user}` : '/user'}>
              <Image
                className='w-8 h-8 rounded-full object-cover'
                src={logoSrc}
                width={32}
                height={32}
                alt={user ? `${user} profile` : 'profile'}
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
    <Link
      href={params}
      className="text-xl text-[var(--text-color)] hover:text-[var(--sec-accent-color)] transition duration-300 font-medium"
    >
      {children}
    </Link>
  )
}