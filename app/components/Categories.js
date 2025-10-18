
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "@/redux/categorySlice";


import React from 'react'
import { SortSpan } from './SortSpan'
import { getProducts } from '@/lib/Getproduct';
import Categorie from './Categorie';
import Getproduct from './Getproduct';
import { AddToCartButton } from './AddToCartButton';
import { Buybtn } from './Buybtn';
import Noproduct from './Noproduct';


 function Categories({ searchParams }) {

  const dispatch = useDispatch();
  const { productsByCategory } = useSelector((state) => state.categories);

  const categorieName = [

    "T-Shirts",
    "Formal Shirts",

  ];

  const tamp =  searchParams
  const queryString = new URLSearchParams(tamp).toString();

  useEffect(() => {
    categorieName.forEach((name) => {
      if (!productsByCategory[name]) {
        dispatch(fetchCategoryProducts({ categorieName: name, queryString }));
      }
    });
  }, []);



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
       
            {
              categorieName.map((name) => (
                <Categorie
                  key={name}
                  categorieName={name}
                  productData={productsByCategory[name] || []}
                />
              ))
            }

      </div>
    </section>
  )
}

export default Categories




