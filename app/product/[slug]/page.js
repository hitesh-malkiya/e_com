
import Getproduct from '@/app/components/Getproduct';
import NotFound from '@/app/not-found';
import {  getProductsSort } from '@/lib/Getproduct';
import React from 'react'



async function Page({ searchParams, params }) {

  let notFound= false;


const tamp= await searchParams
  const queryString =  new URLSearchParams(tamp).toString();
  const { slug } = await params

  let productsData = [];
  try {
    console.log(slug);
    
    const res = await getProductsSort(queryString,slug ,'id');
   
    
if(typeof res.data == 'string'){
  console.log('iffff log');
  
  notFound= true
} 
    productsData = res?.data?.products || [];
  } catch (err) {
    console.log('Product: fetch error', err);
    productsData = [];
  }

  if(notFound){

    
    return(
     <NotFound/>
    )
  }
  
  return (
    <div>
      <Getproduct productData={productsData} >
        <button className=" bg-amber-50 text-black  px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </Getproduct>

    </div>
  )
}
export default Page
