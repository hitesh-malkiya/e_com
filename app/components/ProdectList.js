import React from 'react'
import Getproduct from './Getproduct';


function prodectList({ productData }) {

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Featured Products
      </h2>

      <Getproduct productData={productData}  >
        <button className=" bg-amber-50 text-black  px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
            Add to Cart
      
        </button></Getproduct>
    </>
  )
}

export default prodectList;