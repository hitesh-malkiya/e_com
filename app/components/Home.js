import Image from 'next/image'
import React from 'react'
import { Button } from './Botton'

export const Home = () => {



  return (
    <section className="relative bg-[var(--sec-bg-color)] pl-15 pr-5 mt-24 pt-6">
      <div className="container mx-auto px-4">
        <div className='grid grid-cols-1 md:grid-cols-[1fr_0.7fr] items-center gap-12 justify-center'>
          {/* Left Content */}
          <div className="  text-center md:text-left">
            {/* Discount Badge */}
            <div className="inline-block">
              <span className="bg-[var(--sec-accent-color)] text-white px-4 py-2 rounded-full text-sm font-semibold">
                FLAT 40% DISCOUNT
              </span>
            </div>
            <p className="text-base tracking-[5px] leading-[5]  text-gray-600">
              Shop with latest fashion
            </p>
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-color)] leading-tight">
              GUJJU COLLECTION
            </h1>
            <p className=" text-base tracking-[3px] leading-[1.5] text-[var(--text-color)] max-w-xl mx-auto md:mx-0">
              Discover the latest trends and exclusive deals on fashion, electronics, and more. Shop now and enjoy unbeatable prices!
            </p>

            {/* CTA Button */}
            <div className=" pt-8">
              <Button link={'product'} data={'Shop Now'} variant="primary" size="large" />
            </div>
          </div>

          {/* Right Image */}
          <div className='relative '>
            <Image

              width={10000}
              height={10000}
              className=' object-fill rounded-lg bg-transparent w-[70%]'
              src='/image/hero.png'
              alt='Gujju Collection'
              priority={false}
            />
          </div>
        </div>
      </div>




      {/* Trust Features Section */}
      <section className="py-16 bg-[var(--sec-bg-color)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Money Back Guarantee */}
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="w-16 h-16 bg-[var(--accent-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">Money Back Guarantee</h3>
              <p className="text-sm text-[var(--text-color)]/70">30-day return policy</p>
            </div>

            {/* Secure Payment */}
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="w-16 h-16 bg-[var(--sec-accent-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">Secure Payment</h3>
              <p className="text-sm text-[var(--text-color)]/70">SSL encrypted checkout</p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="w-16 h-16 bg-[var(--accent-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">24/7 Support</h3>
              <p className="text-sm text-[var(--text-color)]/70">Always here to help</p>
            </div>

            {/* Free Shipping */}
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="w-16 h-16 bg-[var(--sec-accent-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">Free Shipping</h3>
              <p className="text-sm text-[var(--text-color)]/70">On orders over ₹999</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
