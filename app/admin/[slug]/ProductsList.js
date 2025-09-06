

import Getproduct from '@/app/components/Getproduct';
import { getProducts } from '@/lib/Getproduct'
import Link from 'next/link'
async function ProductsList({queryStringURL}) {

    const queryString = new URLSearchParams(queryStringURL).toString();
   

    let products = [];
    try {
      const res = await getProducts(queryString);
      products = res?.data?.products || [];
    } catch (err) {
      console.log('Product: fetch error', err);
      products = [];
    }

   

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Product Inventory
            </h2>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                </div>
            ) : (
                <Getproduct productData={products}>
                    <div className="flex space-x-2">
                        <Button params={'edit'} />
                        <Button params={"delet"} />
                    </div>
                </Getproduct>
            )}
        </div>
    )
}

export default ProductsList


export const Button = ({ params }) => {
    return (


        <button className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white  px-3 py-1 rounded-md text-sm font-medium transition duration-200 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <Link href={`admin/${params}`}> {params} Data</Link>
        </button>






    )
}