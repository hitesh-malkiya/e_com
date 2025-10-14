

import React from 'react'
import { SortSpan } from './SortSpan'
import { getProducts } from '@/lib/Getproduct';
import Categorie from './Categorie';
import Getproduct from './Getproduct';
import { AddToCartButton } from './AddToCartButton';
import { Buybtn } from './Buybtn';


async function Categories({ searchParams }) {

  const categorieName = [

    "T-Shirts",
    "Formal Shirts",
    "Casual Shirts",
    "Jeans",
    "Casual pants",
    "Formal pants",
    "Track Pants",
    "Cargos ",
    "Jackets",
    "Blazers",
    "Kurtis",
    "Chaniya Choli",
    "Party Dresses",
    "Dresses",
    "Tops",
    "Night Dresses",
    "Sweaters",
    "Jeans",
  ];

  const tamp = await searchParams
  const queryString = new URLSearchParams(tamp).toString();
  let products = [];
  try {
    const res = await getProducts(queryString);
 
    
    if (res.message === "error") {
      products = [];
    }
    products = res?.data?.products || [];
  } catch (err) {
    products = [];
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          products
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-8 text-center text-xl text-[var(--text-color)] pb-8 ">
          <SortSpan dataName={'all'} />
          {
            categorieName.map((item, index) => (
              <SortSpan key={index} dataName={item} />
            ))
          }



        </div>
      </div>
      <div>
        {queryString ? <>
      {  products.length === 0 ? <div className='text-center text-2xl py-16'>No products found</div>: <> 
 
  
          <h3 className="py-[1lh] w-full text-2xl text-center after:content-[''] after:block after:w-[80px] after:h-[5px] after:mx-auto after:mt-[10px] after:rounded-[10px] after:bg-[var(--sec-accent-color)]">{products[0].category}</h3>
          <Getproduct productData={products}  >
            <AddToCartButton />
            <Buybtn />
          </Getproduct>
          </>
}
        </> : (
          <>
            {
              categorieName.map((item, index) => (
                <Categorie key={index} categorieName={item} searchParams={searchParams} />
              ))
            }

          </>
        )}
      </div>
    </section>
  )
}

export default Categories





