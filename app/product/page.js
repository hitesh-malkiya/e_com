import React from 'react'

import Categories from '../components/Categories'
async function Page({ searchParams }) {
  const queryString = await searchParams


  
  return (
    <main className=' mt-24'>
<Categories searchParams={queryString} />
      </main>
  )
}
export default Page
