


import { getServerSession } from "next-auth"
import Header from '../../user/Header'
import FormPage from './FormPage'
import ProductsList from './ProductsList'

import { redirect } from 'next/navigation';
import Loading from "./loading"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function page({ searchParams, params }) {
  const queryString = await searchParams



  const tamp = await params;
  const { slug } = tamp

  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }

  if (session?.user?.userName !== slug) {
    // Server Component: perform redirect using Next.js not client-side JS

    redirect('/log-in');

    return (
  
     <Loading />

    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br mt-46 from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header userName={session?.user?.name} />

        {/* Add Product Form */}
        <FormPage slug={slug} />
        {/* Products List */}
        <ProductsList queryStringURL={queryString} />
      </div>
    </div>
  )
}

