
import Categories from '@/app/components/Categories';

import NotFound from '@/app/not-found';
import { getProductsSort } from '@/lib/Getproduct';

import React from 'react';
import ProductDetailClient from './ProductDetailClient';

export default async function Page({ searchParams = {}, params = {} }) {

  const { slug } = params || {};
  let productsData = [];
  let notFound = false;
const tamp = await searchParams 
const queryString = new URLSearchParams(tamp).toString();
  try {
    const res = await getProductsSort(queryString, slug, 'id');
    if (typeof res.data === 'string') notFound = true;
    productsData = res?.data?.products || [];
  } catch (err) {
    productsData = [];
  }

  if (notFound || productsData.length === 0) {
    return <NotFound/>;
  }

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 space-y-10">
      {productsData.map((product) => (
        <ProductDetailClient key={product._id} product={product} />
      ))}

      {/* Related category / suggestions — reused component */}
      <Categories
        categorieName={productsData[0]?.category}
        searchParams={searchParams}
      />
    </div>
  );
}
