
'use client'

import React, { useRef, useState } from 'react'
import axios from 'axios'
function FormPage({ slug }) {


  const formData = useRef(null);
  const [btnactiv, setBtnactiv] = useState(false)





  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnactiv(true)
    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.current.name.value);
      data.append('price', formData.current.price.value);
      data.append('category', formData.current.category.value);
      data.append('image', formData.current.image.files[0]);
      data.append('userName', slug)
      data.append('admin', slug)
      const response = await axios.post('/api/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      })
      console.log(response);

      formData.current.reset();
      setBtnactiv(false)
      // Refresh the product list after adding
      alert('product apend ucseefuly dont whary')
    } catch (error) {
      alert(error.response.data.message)
      setBtnactiv(false)
    }
  }



  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Product
      </h2>

      <form ref={formData} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder='Enter product name'
              name='name'
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder='Enter price'
              name='price'
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              name='image'
              accept="image/*"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name='category'
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">select category</option>
              <option value="electronics">electronics</option>
              <option value="mobiles">mobiles</option>
              <option value="laptops">laptops</option>
              <option value="computers">computers</option>
              <option value="fashion">fashion</option>
              <option value="men">men</option>
              <option value="women">women</option>
              <option value="kids">kids</option>
              <option value="shoes">shoes</option>
              <option value="bags">bags</option>
              <option value="accessories">accessories</option>
              <option value="home">home</option>
              <option value="furniture">furniture</option>
              <option value="kitchen">kitchen</option>
              <option value="appliances">appliances</option>
              <option value="decor">decor</option>
              <option value="sports">sports</option>
              <option value="fitness">fitness</option>
              <option value="outdoor">outdoor</option>
              <option value="books">books</option>
              <option value="stationery">stationery</option>
              <option value="toys">toys</option>
              <option value="games">games</option>
              <option value="music">music</option>
              <option value="beauty">beauty</option>
              <option value="personal care">personal care</option>
              <option value="health">health</option>
              <option value="grocery">grocery</option>
              <option value="beverages">beverages</option>
              <option value="pet supplies">pet supplies</option>
              <option value="automobile">automobile</option>
              <option value="tools">tools</option>
              <option value="garden">garden</option>
              <option value="office">office</option>
              <option value="baby">baby</option>
              <option value="jewelry">jewelry</option>
              <option value="watches">watches</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type='submit'
            disabled={btnactiv}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center"
          >
            {btnactiv ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>

  )
}

export default FormPage