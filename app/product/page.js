import React from 'react'

import Categories from '../components/Categories'
async function Page({ searchParams }) {
  const queryString = await searchParams


  
  return (
    <div className=' mt-24'>
<Categories searchParams={queryString} />
      </div>
  )
}
export default Page
