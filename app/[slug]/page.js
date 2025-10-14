
import { getProductsSort } from '@/lib/Getproduct';
import React from 'react'
import Getproduct from '../components/Getproduct';
import NotFound from '../not-found';
import { AddToCartButton } from '../components/AddToCartButton';
import { Buybtn } from '../components/Buybtn';


async function Page({ searchParams, params }) {




  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }




  const tamp = await searchParams
  const slugtamp = await params;
  const { slug } = slugtamp
  const queryString = new URLSearchParams(tamp).toString();
  let productsData = [];

  try {
    const res = await getProductsSort(queryString, slug, 'admin');
    productsData = res?.data?.products || [];
  } catch (err) {

    productsData = [];
  }

  if (productsData.length == 0) {
    return (
      <NotFound />
    )
  }


  return (
    <div className='mt-24'>

      <Getproduct productData={productsData}>
        <AddToCartButton />
        <Buybtn />
      </Getproduct>
    </div>
  )
}

export default Page