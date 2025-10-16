import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Getproduct(params) {


  const { productData = [], children } = params



  return (

    <div className="pt-9 pb-8 overflow-x-auto scrollbar-none scroll-smooth">
      <div className="grid grid-flow-col  auto-cols-[minmax(240px,20vw)] gap-8 px-4 md:grid-rows-1">
        {productData.map((product) => {
          const mrp = Number(product.mrp) || 0;
          const price = Number(product.price) || 0;
          const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

          return (
            <div
              key={product._id}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--bg-color)] border border-[var(--accent-color)] 
                         shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] 
                         hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              {/* Product Image */}
              <Link href={`/product/${product._id}`} className="block group relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name || "Product Image"}
                    width={400}
                    height={400}
                    className="h-56 w-full object-contain bg-[var(--sec-bg-color)] rounded-lg 
                               transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
                    No Image
                  </div>
                )}
                {/* Discount Badge */}
                {discountPercent > 0 && (
                  <span className="absolute top-3 right-3 bg-[var(--accent-color)] text-black text-xs px-2 py-1 rounded-lg shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
              </Link>

              {/* Category & Admin */}
              <div className="flex items-center gap-2 text-[18px] text-gray-500">
                <h4 className="truncate">{product.category}</h4>
                <span className="h-1 w-1 rounded-full bg-[var(--accent-color)]" />
               <Link href={product.abrand} > <h4 className="truncate hover:text-[var(--sec-accent-color)] ">{product.abrand}</h4></Link>
              </div>

              {/* Product Name */}
              <Link href={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold text-[var(--text-color)] line-clamp-2 
                               hover:text-[var(--sec-accent-color)] transition-colors duration-200">
                  {product.name}
                </h3>
              </Link>

              {/* Product Description */}
              <p className="text-sm text-gray-500 line-clamp-2">{product.mainDes}</p>




              <div className="text-start mt-4 space-y-2 flex gap-2 items-center">
                {mrp > 0 && (
                  <span className="text-sm text-gray-400 line-through">{mrp}</span>
                )}
                <span className="text-xl md:text-2xl font-bold">{price}</span>
                {discountPercent > 0 && (
                  <span className=" bg-[var(--accent-color)] text-black text-xs px-2 py-1 rounded-lg shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              {/* Buttons or Children */}
              <div className="mt-auto flex gap-3 items-center">
                {React.Children.map(children, (child) =>
                  React.isValidElement(child)
                    ? React.cloneElement(
                      child,
                      child.props?.productId !== undefined
                        ? {}
                        : { productId: product._id }
                    )
                    : child
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Getproduct