

import React from 'react'
import { SortSpan } from './SortSpan'
import { getProducts } from '@/lib/Getproduct';

import Categorie from './Categorie';
import Getproduct from './Getproduct';
import { AddToCartButton } from './AddToCartButton';
import { Buybtn } from './Buybtn';


async function Categories({ searchParams }) {

  const tamp = await searchParams
  const queryString = new URLSearchParams(tamp).toString();

  let products = [];
  try {
    const res = await getProducts(queryString);
    products = res?.data?.products || [];



  } catch (err) {
    console.error('Error fetching products:', err);
    products = [];
  }

  


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
         products
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-8 text-center text-2xl text-[var(--text-color)] pb-8 ">
          <SortSpan dataName={'all'} />
         
         <SortSpan dataName={'men'} />
         <SortSpan dataName={'women'} /> 
         <SortSpan dataName={'kids'} />
         

        </div>
      </div>
      <div>
        {queryString ? <>
          <h3 className="py-[1lh] w-full text-2xl text-center after:content-[''] after:block after:w-[80px] after:h-[5px] after:mx-auto after:mt-[10px] after:rounded-[10px] after:bg-[var(--sec-accent-color)]">{products[0].category}</h3>
        <Getproduct productData ={products}  >
        <AddToCartButton />
        <Buybtn/>
        </Getproduct>
        </> : (
          <>
            <Categorie categorieName={'men'} searchParams={searchParams} />
            <Categorie categorieName={'women'} searchParams={searchParams} />
            <Categorie categorieName={'kids'} searchParams={searchParams} />
          </>
        )}
      </div>
    </section>
  )
}

export default Categories



 

