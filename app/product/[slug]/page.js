'use client'

import { getProductsSort } from '@/lib/Getproduct';

import React, { useEffect, useState } from 'react';
import ProductDetailClient from './ProductDetailClient';
import Categorie from '@/app/components/Categorie';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '@/app/not-found';
import { fetchCategoryProducts } from '@/redux/categorySlice';
import Loading from '../loading';



export default function Page({ searchParams, params }) {
  let [notFound, setNotfound] = useState(true)
  let [productData, setProductData] = useState([])
  let [queryString, setQueryString] = useState('')

  const { productsByCategory } = useSelector((state) => state.categories);
const dispatch = useDispatch()
  const dataGetf = async () => {
    try {

      const tamp = await searchParams
      const q = new URLSearchParams(tamp).toString()
      setQueryString(q)

      const { slug } = await params || {};
      const res = await getProductsSort(q, slug, 'id');

      setNotfound(false)
  


      setProductData(res?.data?.products || [])

      
      

const categorieName = await  res.data.products[0]?.category;

      if (!productsByCategory[categorieName]) {
        console.log(productsByCategory[categorieName]);
        
        dispatch(fetchCategoryProducts({ categorieName: categorieName , queryString }));
      }
    } catch (err) {
      setProductData([])
    }

  }
  useEffect(() => {
    dataGetf();
  }, []);





  if (notFound) {
    console.log(notFound);

    return (
   <Loading/>
    )
  }

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 space-y-10">
      {productData.map((product) => (
        <ProductDetailClient key={product._id} product={product} />
      ))}

      {/* Related category / suggestions — reused component */}
      <Categorie
        categorieName={productData[0]?.category}
        productData={productsByCategory[productData[0]?.category]}
      />
    </div>
  );
}