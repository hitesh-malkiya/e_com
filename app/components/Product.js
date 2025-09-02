'use client';
import React, { useEffect, useState } from 'react'
import ProdectList from './ProdectList';
import { getProducts } from '@/lib/Getproduct';

function Product() {


  const [productData, setProductData] = useState([]);


  let response = async (queryString) => {
    let res = await getProducts(queryString);

    setProductData(res.data.products);
  }

  
  useEffect(() => {
    const queryString = window.location.search;
    response(queryString)
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ProdectList productData={productData} />
      </div>
    </section>
  )
}

export default Product