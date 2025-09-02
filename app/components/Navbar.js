import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <section className="w-full">
      <nav className='grid grid-cols-[0.8fr_1fr] items-center justify-start fixed top-0 left-0 right-0 bg-white shadow-lg z-50'>
        <div className="pl-3">
          <Image
            className='w-32 h-auto'
            src='/image/logo.png'
            width={50}
            height={30}
            alt='logo'
          />

        </div>
        <div className='flex justify-items-center justify-between items-center space-x-10  px-16 py-4 '>
          <Link href='/' className=' text-2xl  text-gray-700 hover:text-blue-600 transition duration-300 font-medium'>home</Link>
          <Link href='/about' className=' text-2xl text-gray-700 hover:text-blue-600 transition duration-300 font-medium'>about</Link>
          <Link href='/product' className=' text-2xl text-gray-700 hover:text-blue-600 transition duration-300 font-medium '>product</Link>
          <Link href='/contact' className=' text-2xl text-gray-700 hover:text-blue-600 transition duration-300 font-medium '>Contact</Link>

          <Link href='/support' className=' text-2xl text-gray-700 hover:text-blue-600 transition duration-300 font-medium'>Support</Link>
          <Link href='/log-in' className=' text-2xl text-gray-700 hover:text-blue-600 transition duration-300 font-medium'>Support</Link>
        </div>
      </nav>
    </section>
  )
}

export default Navbar 