import React from 'react'

import Categorie from './Categorie';


async function Categories({ searchParams }) {



  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Shop by Category
        </h2>
        <Categorie categorieName={'electronics'} searchParams={searchParams} />
        <Categorie categorieName={'mobiles'} searchParams={searchParams} />
        <Categorie categorieName={'laptops'} searchParams={searchParams} />
        <Categorie categorieName={'computers'} searchParams={searchParams} />
        <Categorie categorieName={'fashion'} searchParams={searchParams} />
        <Categorie categorieName={'men'} searchParams={searchParams} />
        <Categorie categorieName={'women'} searchParams={searchParams} />
        <Categorie categorieName={'kids'} searchParams={searchParams} />
        <Categorie categorieName={'shoes'} searchParams={searchParams} />
        <Categorie categorieName={'bags'} searchParams={searchParams} />
        <Categorie categorieName={'accessories'} searchParams={searchParams} />
        <Categorie categorieName={'home'} searchParams={searchParams} />
        <Categorie categorieName={'furniture'} searchParams={searchParams} />
        <Categorie categorieName={'kitchen'} searchParams={searchParams} />
        <Categorie categorieName={'appliances'} searchParams={searchParams} />
        <Categorie categorieName={'decor'} searchParams={searchParams} />
        <Categorie categorieName={'sports'} searchParams={searchParams} />
        <Categorie categorieName={'fitness'} searchParams={searchParams} />
        <Categorie categorieName={'outdoor'} searchParams={searchParams} />
        <Categorie categorieName={'books'} searchParams={searchParams} />
        <Categorie categorieName={'stationery'} searchParams={searchParams} />
        <Categorie categorieName={'toys'} searchParams={searchParams} />
        <Categorie categorieName={'games'} searchParams={searchParams} />
        <Categorie categorieName={'music'} searchParams={searchParams} />
        <Categorie categorieName={'beauty'} searchParams={searchParams} />
        <Categorie categorieName={'personal care'} searchParams={searchParams} />
        <Categorie categorieName={'health'} searchParams={searchParams} />
        <Categorie categorieName={'grocery'} searchParams={searchParams} />
        <Categorie categorieName={'beverages'} searchParams={searchParams} />
        <Categorie categorieName={'pet supplies'} searchParams={searchParams} />
        <Categorie categorieName={'automobile'} searchParams={searchParams} />
        <Categorie categorieName={'tools'} searchParams={searchParams} />
        <Categorie categorieName={'garden'} searchParams={searchParams} />
        <Categorie categorieName={'office'} searchParams={searchParams} />
        <Categorie categorieName={'baby'} searchParams={searchParams} />
        <Categorie categorieName={'jewelry'} searchParams={searchParams} />
        <Categorie categorieName={'watches'} searchParams={searchParams} />
        <Categorie categorieName={'other'} searchParams={searchParams} />

      </div>
    </section>
  )
}

export default Categories