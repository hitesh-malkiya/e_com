import { getProductsSort } from '@/lib/Getproduct';
import React from 'react'
import Getproduct from './Getproduct';
import { AddToCartButton } from './AddToCartButton';
import { Buybtn } from './Buybtn';

async function Categorie({categorieName , searchParams}) {

console.log(categorieName);

  const tamp = await searchParams
    const queryString = new URLSearchParams(tamp).toString();

  
    let productsData = [];
    try {

      const res = await getProductsSort(queryString,categorieName, 'category');
      console.log(res.data);
      
      productsData = res?.data?.products || [];

      
    } catch (err) {

      productsData = [];
    }

if (productsData.message === "error") {
  productsData = [];
}
if (productsData.length === 0) {
  return null; 
}


  return (
    <div>
          <h3 className="py-[1lh] w-full text-2xl text-center after:content-[''] after:block after:w-[80px] after:h-[5px] after:mx-auto after:mt-[10px] after:rounded-[10px] after:bg-[var(--sec-accent-color)]">{categorieName}</h3>
          <Getproduct productData={productsData}>
            <AddToCartButton />
            <Buybtn/>
          </Getproduct>
        </div>
  )
}

export default Categorie