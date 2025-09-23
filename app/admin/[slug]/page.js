


import { getServerSession } from "next-auth"
import Header from './Header'
import FormPage from './FormPage'


import { redirect } from 'next/navigation';
import Loading from "./loading"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Adminregister from "./Adminregister"


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



if (session.user.admin.userName !== slug) {

  
  return (
    <div className="min-h-screen bg-gradient-to-br mt-24 bg-[var(--sec-bg-color)] py-8 px-4">
      <div className="">
        <Adminregister/>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br mt-24 bg-[var(--sec-bg-color)] py-8 px-4">
      <div className="">
        {/* Header */}
        <Header userName={session?.user?.name} />

        {/* Debug Admin Data */}
   
        {/* Add Product Form */}
        <FormPage slug={slug} />
        {/* Products List */}
      
      </div>
    </div>
  )
}

