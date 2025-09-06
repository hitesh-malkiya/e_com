import { getProductsSort } from '@/lib/Getproduct';
import React from 'react'
import Getproduct from './Getproduct';

async function Categorie({categorieName , searchParams}) {



    const tamp = await searchParams
    const queryString = new URLSearchParams(tamp).toString();
  
    console.log(queryString);
  console.log(categorieName);
  
    let productsData = [];
    try {
      const res = await getProductsSort(queryString, categorieName , 'category');
      productsData = res?.data?.products || [];
    } catch (err) {
      console.log('Product: fetch error', err);
      productsData = [];
    }



  return (


    <div>
          <h3 className=' w-full'>{categorieName}</h3>
          <Getproduct productData={productsData}>
            <button className=" bg-amber-50 text-black  px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
              Add to Cart

            </button>
          </Getproduct>
        </div>
  )
}

export default Categorie