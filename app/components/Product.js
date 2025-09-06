


import React from 'react'
import ProdectList from './ProdectList';
import { getProducts } from '@/lib/Getproduct';


async function Product({ queryStringURL }) {
  // Convert object -> query string
  const queryString = new URLSearchParams(queryStringURL).toString();
  console.log(queryString);
  

  // Fetch products on the server
  let products = [];
  try {
    const res = await getProducts(queryString);
    products = res?.data?.products || [];

    console.log(res);
    
  } catch (err) {
    console.log('Product: fetch error', err);
    products = [];
  }


  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ProdectList productData={products} />
      </div>
    </section>
  )
}

export default Product




