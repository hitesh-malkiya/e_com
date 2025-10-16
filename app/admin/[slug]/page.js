
import { getServerSession } from "next-auth";
import Header from './Header';
import FormPage from './FormPage';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Adminregister from "../Adminregister";
import { getorder } from "@/lib/orderGet";

import Link from "next/link";
import Order from "./components/Order";
import Loading from "./loading";
import { redirect } from "next/navigation";

export default async function Page({ searchParams, params }) {
  // Get slug from params
  const { slug } = await params;

  // Get session
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    session = null;
  }
  const abrand = await session.user.admin.brand
  // Check if user is authenticated
  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br mt-24 bg-[var(--sec-bg-color)] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
              Access Denied
            </h2>
            <p className="text-[var(--text-color)] mb-6">
              You need to be logged in to access this page.
            </p>
            <Link
              href="/log-in"
              className="bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)] text-[var(--bg-color)] font-semibold py-3 px-8 rounded-lg transition duration-200 inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (
    !session.user.admin ||
    !session.user.admin.isAdmin ||
    session.user.admin.userNammain== slug
  ) {
      redirect("/admin");
    return (
  
     <Loading/>
    );
  }

  // Fetch orders for the admin
  let orders = [];
  try {
    const res = await getorder(session.user.admin.userName);

    
    if(res.message === "error") {
        orders = [];
    } else {
          orders = res.data;
          console.log(orders);
          
    }
  } catch (err) {
    orders = [];
  }

  return (
    <main className="min-h-screen bg-gradient-to-br mt-24 bg-[var(--sec-bg-color)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header userName={session?.user?.name} />
        <section>
        <FormPage slug={slug} abrand={abrand}/>
        <Order orders={orders} />
        </section>
      </div>
    </main>
  );
}
