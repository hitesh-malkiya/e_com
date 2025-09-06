
import { getProductsSort } from '@/lib/Getproduct';
import React from 'react'
import Getproduct from '../components/Getproduct';
import NotFound from '../not-found';


async function page({searchParams, params }) {
    const tamp= await searchParams
    const slugtamp= await params;
    const { slug } = slugtamp
    const queryString = new URLSearchParams(tamp).toString();
    let productsData = [];
    try {
      const res = await getProductsSort(queryString, slug , 'admin' );
      productsData = res?.data?.products || [];
    } catch (err) {
      console.log('Product: fetch error', err);
      productsData = [];
    }
    
if(productsData.length == 0){
    return(
<NotFound/>
    )
}


  return (
    <div>
         
          <Getproduct productData={productsData}>
            <button className=" bg-amber-50 text-black  px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </Getproduct>
        </div>
  )
}

export default page