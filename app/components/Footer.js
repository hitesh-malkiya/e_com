import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">My App</h3>
          <p className="text-gray-300">
            Your trusted destination for quality products and exceptional service.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Size Guide</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white text-2xl">📘</a>
            <a href="#" className="text-gray-300 hover:text-white text-2xl">📷</a>
            <a href="#" className="text-gray-300 hover:text-white text-2xl">🐦</a>
            <a href="#" className="text-gray-300 hover:text-white text-2xl">💼</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 My App. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer