"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiMenuAlt3, HiX } from "react-icons/hi";

function NavbarUi({ session = false, logoSrc = '/image/profile-default.png', admin = false, user = '' }) {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <section className="">
      <nav className='grid md:grid-cols-[1fr_1fr] sm:grid-cols-[1fr_0.3fr] grid-cols-[1fr_0.5fr] items-center justify-start md:gap-8 gap-2 fixed top-0 left-0 pl-2 md:pr-8 right-0 bg-[var(--bg-color)] pr-3 text-[var(--text-color)] z-[100]'>
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
        <div className='md:flex justify-items-center justify-between items-center text-[var(--bg-color)]  hidden '>
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
        <div className='md:hidden text-[var(--main-color)] text-2xl p-2 flex justify-items-center justify-around items-center'
          aria-label="Toggle menu">


          
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
          <button
            onClick={toggleMenu}

            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
        <div className={`fixed top-0 left-0 right-0 bg-[var(--bg-color)] shadow-lg transition-all duration-300 ease-in-out md:hidden z-50 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}>

          <div className='flex flex-col space-y-2 p-4 text-[var(--main-color)]'>

            <button
              onClick={toggleMenu}
              className='md:hidden text-[var(--main-color)] text-2xl p-2'
              aria-label="Toggle menu"
            >
              <HiX />

            </button>
            <NavLink params='/' onClick={toggleMenu}>home</NavLink>
            <NavLink params='/about' onClick={toggleMenu}>about</NavLink>
            <NavLink params='/product' onClick={toggleMenu}>product</NavLink>
            <NavLink params='/contact' onClick={toggleMenu}>contact</NavLink>
          </div>
        </div>
      </nav>
    </section>
  )
}
export default NavbarUi




function NavLink({ params, children , onClick }) {
  return (
    <Link
      href={params}
    onClick={onClick}
      className="text-xl text-[var(--text-color)] hover:text-[var(--sec-accent-color)] transition duration-300 font-medium"
    >
      {children}
    </Link>
  )
}