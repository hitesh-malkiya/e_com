
import { Button } from '@/app/components/Botton';
import Categorie from '@/app/components/Categorie';

import NotFound from '@/app/not-found';
import { getProductsSort } from '@/lib/Getproduct';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



async function Page({ searchParams, params }) {

  let notFound = false;
  const tamp = await searchParams
  const queryString = new URLSearchParams(tamp).toString();
  const { slug } = await params
  let productsData = [];


  try {
    const res = await getProductsSort(queryString, slug, 'id');
    if (typeof res.data == 'string') {
      notFound = true
    }
    productsData = res?.data?.products || [];
  } catch (err) {

    productsData = [];
  }




  if (notFound) {


    return (
      <NotFound />
    )
  }


  return (
    <div className=' mt-24'>


      {productsData.map((product) => {
        const mrp = Number(product.mrp) || 0
        const price = Number(product.price) || 0
        const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0
        return (
          <div
            key={product._id}
            className=" grid grid-cols-2  gap-6 p-4 rounded-lg  border-[var(--accent-color)] bg-[var(--sec-bg-color)] shadow-[var(--card-shadow)] hoverhadow-[var(--card-shadow-hover)] hover:-translate-y-0.5 transition duration-300"
          >

            {/* image div */}
            <div className=''>

              <Link href={`/product/${product._id}`} className="">
                {product.image ? (
                  <Image
                    quality={10}
                    src={product.image}
                    alt={product.name || 'Product Image'}
                    width={500}
                    height={500}
                    className=" h-[70vh]  object-contain rounded-md bg-[var(--sec-bg-color)] hover:scale-[1.03] overflow-hidden transition duration-300"
                  />
                ) : 'No Image'}
              </Link>

            </div>

            <div className=' flex flex-col gap-2   items-start'>
              {/* categery and admin */}
              <div className="flex items-center gap-4 text-xl text-[var(--text-color)]">
                <span className="truncate">{product.category}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="truncate">{product.brand}</span>
              </div>
              {/* product name */}

              <h3 className="  text-3xl font-medium text[var(--text-color)] line-clamp-2 hover:text-[var(--sec-accent-color)] transition-colors">
                {product.name}
              </h3>
              <p>
                {product.mainDes}
              </p>
              {/* mrp */}
              <div className="text-xl text-[var(--sec-accent-color)]">
                <span className="line-through">₹{mrp}</span>
              </div>

              {/* price and descount */}
              <div className="flex items-baseline gap-4 ">
                <span className=" text-2xl font-semibold text-[var(--text-color)]">₹{price}</span>
                <span className="text-xs font-semibold text-[var(-sec-accent-color)] bg-[var(--accent-color)] px-2 py-0.5 rounded">-{discountPercent}% OFF</span>
              </div>
              <div >
                <span className='text-xl text-[var(--sec-accent-color)] pt-20  bb-4'>Product details</span>
                {product.more.map((cur, ind) => {
                  return (
                    <div key={ind} className=' grid grid-cols-3 gap-6'>
                      <span className='w-[100%] '>{cur.label}</span>
                      <span> : </span>
                      <span>{cur.value}</span>
                    </div>
                  )
                })
                }
              </div>
              <div className="flex gap-8 mt-6 ">
                <AddToCartButton  productId={ product._id}/>
                <Buybtn productId={ product._id} />
              </div>


            </div>

          </div>
        )

      })
      }

      <Categorie categorieName={productsData[0].category} searchParams={searchParams} />

    </div>
  )
}
export default Page
