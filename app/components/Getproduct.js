import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Getproduct(params) {


    const { productData = [], children } = params
console.log(children);


    return (

        <div className="grid gap-8 grid-flow-col overflow-auto pt-9 pb-8 scroll-smooth scrollbar-none">
            {productData.map((product) => {
                const mrp = Number(product.mrp) || 0
                const price = Number(product.price) || 0
                const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0

                return (
                    <div
                        key={product._id}
                        className="flex flex-col gap-3 w-[20vw] p-4 rounded-lg  border-[var(--accent-color)] bg-[var(--bg-color)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5 transition duration-300"
                    >
                        {/* image div */}
                        <div className="">
                            <Link href={`/product/${product._id}`} className="">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name || 'Product Image'}
                                        width={500}
                                        height={500}
                                        className="h-48 w-full object-contain rounded-md bg-[var(--sec-bg-color)] hover:scale-[1.03] overflow-hidden transition duration-300"
                                    />
                                ) : 'No Image'}
                            </Link>
                        </div>
                        {/* categery and admin */}
                        <div className="flex items-center gap-2 text-xs text-[var(--text-color)]">
                            <span className="truncate">{product.category}</span>
                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                            <span className="truncate">{product.admin}</span>
                        </div>
                        {/* product name */}
                        <Link href={`/product/${product._id}`}>
                        <h3 className=" text-xl font-medium text[var(--text-color)] line-clamp-2 hover:text-[var(--sec-accent-color)] transition-colors">
                            {product.name}
                        </h3>
                        </Link>
                        {/* mrp */}
                        <div className="text-xs text-gray-400">
                            <span className="line-through">₹{mrp}</span>
                        </div>

                        {/* price and descount */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-semibold text-[var(--text-color)]">₹{price}</span>
                            <span className="text-xs font-semibold text-[var(-sec-accent-color)] bg-[var(--accent-color)] px-2 py-0.5 rounded">{discountPercent}% OFF</span>
                        </div>
                        <div className="mt-auto">
                            {React.cloneElement(children, { 
                                productId: product._id, 
                            })}
                        </div>




                    </div>
                )
            })
            }


        </div>
    )
}

export default Getproduct