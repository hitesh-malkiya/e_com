import React from "react";
import Getproduct from "./Getproduct";
import { AddToCartButton } from "./AddToCartButton";
import { Buybtn } from "./Buybtn";


export default function Categorie({ categorieName, productData }) {
  if (!productData || productData.length === 0) {
    return null;
  }
console.log(categorieName , productData);

  return (
    <div>
      <h3 className="text-2xl text-center mb-4">{categorieName}</h3>
      <Getproduct productData={productData}>
        <AddToCartButton />
        <Buybtn />
      </Getproduct>
    </div>
  );
}
