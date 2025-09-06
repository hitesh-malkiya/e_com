import React from 'react'
import Product from '../components/Product'
async function Page({ searchParams }) {
  const queryString = await searchParams


  
  return (
    <div>
      <Product queryStringURL={queryString} />
      </div>
  )
}
export default Page
