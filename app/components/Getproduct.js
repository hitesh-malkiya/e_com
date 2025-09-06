import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Getproduct(params) {
  

    const { productData, children } = params


    return (
        <div className="grid gap-8 grid-flow-col grid-cols-[1fr_1fr] overflow-auto scroll-smooth scrollbar-none">
            {productData.map((product) => (

                <div
                    key={product._id}
                    className="bg-white w-3xl rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <Link href={`/product/${product._id}`} className="text-gray-400 text-sm">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name || 'Product Image'}
                                    width={192}
                                    height={192}
                                    className="object-contain h-48 w-48"
                                />
                            ) : 'No Image'}
                        </Link>
                    </div>
                    <div className="p-4">
                        <span className="text-xs text-blue-600 font-medium">
                            {product.category}
                        </span>
                        <h3 className="font-semibold text-gray-800 mt-1 mb-2">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-800">
                                ${product.price}
                            </span>
                           
                            {children}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Getproduct