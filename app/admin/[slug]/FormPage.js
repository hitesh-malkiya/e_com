
'use client'

import React, { useRef, useState } from 'react'
import axios from 'axios'
function FormPage({ slug }) {


  const formData = useRef(null);
  // form select care se
  const [btnactiv, setBtnactiv] = useState(false)
  // form submit time btn desabal mate
  const [detailInputs, setDetailInputs] = useState([
    { id: 1, label: '', value: '' },

  ])

  const addDetailInput = () => {
    const newId = Math.max(...detailInputs.map(input => input.id)) + 1;
    if (newId <= 20) {
      setDetailInputs([...detailInputs, { id: newId, label: '', value: '' }]);
    } else {
      alert('no mere detael')
    }
  }

  const removeDetailInput = (id) => {
    if (detailInputs.length > 1) {
      setDetailInputs(detailInputs.filter(input => input.id !== id));
    }
  }

  const updateDetailInput = (id, field, value) => {
    setDetailInputs(detailInputs.map(input =>
      input.id === id ? { ...input, [field]: value } : input
    ));
  }





  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnactiv(true)

    // Use the state data instead of querying DOM
    const pairs = detailInputs
      .filter(input => input.label.trim() || input.value.trim())
      .map(input => ({ label: input.label.trim(), value: input.value.trim() }));

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.current.name.value);
      data.append('price', formData.current.price.value);
      data.append('mrp', formData.current.mrp.value)
      data.append('category', formData.current.category.value);
      data.append('image', formData.current.image.files[0]);
      data.append('stock', formData.current.stock.value)
      data.append('userName', slug)
      data.append('admin', slug)
      data.append('more', JSON.stringify(pairs));
      data.append('mainDes', formData.current.mainDes.value)
      data.append('brand', formData.current.brand.value)
      const response = await axios.post('/api/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      })


      // formData.current.reset();
      setBtnactiv(false)
      // Refresh the product list after adding
      alert('product apend ucseefuly dont whary')
    } catch (error) {
      alert(error.response.data.message)
      setBtnactiv(false)
    }
  }



  return (
    <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 mb-12">
      <h2 className="text-2xl font-semibold text-[var(--text-color)] font-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-[var(----sec-accent-color)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Product
      </h2>

      <form ref={formData} onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* product name  */}
          <Inputs type={"text"} data={'product name'} names={"name"} />

          <Inputs type={"text"} data={'brand Name'} names={"brand"} />

          <Inputs type={"text"} data={' main description'} names={"mainDes"} />

          <Inputs type={"number"} data={'Price'} names={'price'} />

          {/* MRP */}
          <Inputs data={'MRP'} type={'number'} names={'mrp'} />

          <Inputs data={'stock'} type={'number'} names={'stock'} />
        
          {/* Product Image */}

          <Inputs data={' Product Image'} type={'file'} names={"image"}/>
         
          {/* Category */}


          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Category
            </label>
            <select
              name='category'
              required
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg  focus:border-transparent transition duration-200"
            >
              <option value="">select category</option>
              <option value="mobiles">mobiles</option>
              <option value="laptops">laptops</option>
              <option value="computers">computers</option>
              <option value="men">men</option>
              <option value="women">women</option>
              <option value="kids">kids</option>
              <option value="bags">bags</option>
              <option value="accessories">accessories</option>
              <option value="books">books</option>
              <option value="toys">toys</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>


        {/* More Details */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
            More Details
          </label>
          <div className="space-y-3">
            {detailInputs.map((input, index) => (
              <div key={input.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <input
                  placeholder={index === 0 ? 'Label (e.g., Material)' : 'Label'}
                  value={input.label}
                  onChange={(e) => updateDetailInput(input.id, 'label', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg  focus:border-transparent transition duration-200"
                />
                <input
                  placeholder={index === 0 ? 'Value (e.g., Cotton)' : 'Value'}
                  value={input.value}
                  onChange={(e) => updateDetailInput(input.id, 'value', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg  focus:border-transparent transition duration-200"
                />
                {detailInputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetailInput(input.id)}
                    className="px-4 py-3 w-[40%] bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)]  text-[var(--bg-color)] rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          
          </div>
        </div>
        <div className="flex items-center gap-10">
        <button
              type="button"
              onClick={addDetailInput}
              className=" px-4 py-3 bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)]  text-[var(--bg-color)] rounded-lg transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add More Details
            </button>
          <button
            type='submit'
            disabled={btnactiv}
            className="bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)]  text-[var(--bg-color)] font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center"
          >
            {btnactiv ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--bg-color)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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



export function Inputs({ type, names, data }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-color)]  mb-2">
        {data}
      </label>
      <input

        type={type}
        placeholder={`Enter ${data} `}
        name={names}
        required
        className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200  "
      />
    </div>
  )
}


