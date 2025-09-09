'use client'
import React, { useRef } from 'react'

function page() {

const orderFormData =useRef(null)
const handelOrderForm =(e)=>{
   e.preventDefault()
   console.log(e);
   console.log(orderFormData);
   
   
}

    return(
        <form ref={orderFormData} onClick={(e)=>handelOrderForm(e)}className="space-y-8">
          {/* Customer Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[var(--sec-accent-color)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              Customer Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
            
      
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all `}
                  placeholder="Enter your first name"
                />
              
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
            
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all }`}
                  placeholder="Enter your last name"
                />
                 <p className="text-red-500 text-sm mt-1"></p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all `}
                  placeholder="Enter your email"
                />
               
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
               
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all `}
                  placeholder="Enter your phone number"
              
                />
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              Shipping Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all `}
                  placeholder="Enter your street address"
                />
             
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                  
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all`}
                    placeholder="Enter city"
                  />
               
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                   
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all`}
                    placeholder="Enter state"
                  />
                 
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                   
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec-accent-color)] transition-all `}
                    placeholder="Enter ZIP code"
                  />
                  
                </div>
              </div>
              
           
            </div>
          </div>

          {/* Order Summary */}
          {/* <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[var(--sec-accent-color)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              Order Summary
            </h2>
            
            {formData.products.length > 0 ? (
              <div className="space-y-4">
                {formData.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[var(--sec-bg-color)] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-color)]">{product.name}</h3>
                        <p className="text-sm text-[var(--text-color)]/70">Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--text-color)]">₹{product.price * product.quantity}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-[var(--text-color)]">
                    <span>Total Amount:</span>
                    <span>₹{formData.totalAmount}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--text-color)]/70">No items in cart</p>
                <Button link="product" data="Continue Shopping" variant="primary" className="mt-4" />
              </div>
            )}
          </div> */}

          {/* Payment & Shipping Options */}
          {/* <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
              Payment & Shipping
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-3">
                  Payment Method
                </label>
                {/* <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-[var(--sec-bg-color)] transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>💳 Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-[var(--sec-bg-color)] transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>📱 UPI Payment</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-[var(--sec-bg-color)] transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>💰 Cash on Delivery</span>
                  </label>
                </div> 
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-3">
                  Shipping Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-[var(--sec-bg-color)] transition-all">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">Standard Delivery</span>
                      <p className="text-sm text-[var(--text-color)]/70">5-7 business days - Free</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-[var(--sec-bg-color)] transition-all">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">Express Delivery</span>
                      <p className="text-sm text-[var(--text-color)]/70">2-3 business days - ₹99</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
</form>

        
     
  )
}

export default page