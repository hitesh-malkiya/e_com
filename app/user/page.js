import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Loading from "../product/loading";
import Header from "./Header";
import ProductsList from "./ProductsList";
import OrderData from "./OrderData";





export default async function Page({ searchParams, params }) {
  const queryString = await searchParams


  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }






  if (!session?.user?.userName) {
    redirect('/log-in');
    return (
      <Loading />
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br mt-46 from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header userName={session?.user?.name} isAdmin={session?.user?.isAdmin} />
        <main>
          <ProductsList queryStringURL={queryString} userName={session?.user?.userName} />
          <OrderData userName={session?.user?.userName} />
        </main>
      </div>
    </div>
  )
}

