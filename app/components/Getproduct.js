import React from 'react'

function Getproduct(params) {
  

    const { productData, children } = params


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productData.map((product) => (

                <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                            {product.image ? 'Image' : 'No Image'}
                        </span>
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