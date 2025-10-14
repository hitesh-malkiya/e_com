'use client'
import { getProductsSort } from '@/lib/Getproduct'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation';
import Loading from '../loading'



function Page({ searchParams }) {
  const router = useRouter();
  const orderFormData = useRef(null)
  const [orderId, setOrderId] = useState(null)
  const [payAmount, setPayAmount] = useState(0)
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const cities = [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
    "Anand",
    "Nadiad",
    "Morbi",
    "Surendranagar",
    "Bharuch",
    "Valsad",
    "Palanpur",
    "Vapi",
    "Navsari",
    "Porbandar",
    "Godhra",
    "Mehsana",
    "Amreli",
    "Patan",
    "Botad",
    "Veraval",
    "Gondal",
    "Bhuj",
    "Dwarka",
    "Gandhidham",
    "Kalol",
    "Mahesana",   // Mehsana spelled again for safety
    "Jetpur Navagadh",
    "Deesa",
    "Mahuva",
    "Modasa"
  ];
  const [stock, setStock] = useState(0);
  const [qty, setQty] = useState(1);
  useEffect(() => {

    if (stock !== 0) {
      if (qty > stock) setQty(product.stock);

      if (qty < 1) setQty(1);
    }


  }, [qty, stock]);


  const states = ["Gujarat"];

  const { data: session } = useSession()

  const dataGet = useCallback(async (id) => {
    try {
      const tamp = await searchParams
      const queryString = new URLSearchParams(tamp).toString();
      console.log(queryString, id, 'id');

      const res = await getProductsSort(queryString, id, 'id');

      const price = res?.data?.products?.[0]?.price;
      const adminData = res?.data?.products?.[0]?.admin;
      setStock(res?.data?.products?.[0]?.stock || 0);

      setAdmin(adminData);
      return price;
    } catch (err) {
      return 0;
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const run = async () => {
        const productId = localStorage.getItem('productId');
        setOrderId(productId || 0);
      };
      run();
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      const fetchAmount = async () => {
        const amount = await dataGet(orderId);


        setPayAmount(amount);
      };
      fetchAmount();
    }
  }, [orderId, dataGet]);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") return resolve(false);
      if (document.getElementById("razorpay-sdk")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  };



  const handelOrderForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = session?.user?.name
      const userName = session?.user?.userName
      const email = session?.user?.email

      const fullName = orderFormData.current.fullName.value
      const address = orderFormData.current.address.value || ""
      const city = orderFormData.current.city.value
      const state = orderFormData.current.state.value
      const postalCode = orderFormData.current.postalCode.value
      const phone = orderFormData.current.phone.value


      const amount = Math.max(1, Math.round((Number(payAmount) || 0) * qty)); // in rupees, min ₹1
      const response = await axios.post('/api/payment', {
        admin,
        user,
        orderId,
        quantity: qty,
        userName,
        email,
        payAmount: amount,
        fullName,
        address,
        city,
        state,
        postalCode,
        phone,

      });




      const orderPost = await axios.post('/api/orderPost', {
        userName: admin,
        orderId: response.data.order.id,
        landmark: orderFormData.current.landmark.value || ""
      });

console.log(orderPost.data);



      if (!orderPost.data.success) {
        alert(" address not saved ")
        return;
      }


      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Razorpay SDK failed to load");



      const { data } = response
      const userOrder = await axios.put('/api/user', {
        userName: session?.user?.userName,
        id: data.order.id
      })
      const userOrderData = await userOrder.data;






      const opstion = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.order.id,
        theme: { color: "#111111" },
        amount: amount,
        currency: "INR",
        name: userName,
        description: "Test Transaction",
        image: "https://example.com/your_logo",


        // checkout_config_id: process.env.NEXT_PUBLIC_RAZORPAY_CHECKOUT_CONFIG_ID || "YourConfigIDHere",
        prefill: {
          name: fullName,
          email: email,
          phone: phone
        },
        handler: async function (response) {




          response.admin = admin;
          response.orderId = data.order.id;
          // Step 3: Verify payment

          const verifyRes = await fetch(`api/payment-verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          });
          const verifyData = await verifyRes.json();
          alert(verifyData.message);



          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await response;
          const res = await fetch("/api/tr", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature, admin })
          });
          const result = await res.json();


          if (typeof window !== 'undefined') {
            localStorage.removeItem('productId');
            router.push('/user');
          }

        },
        modal: {
          ondismiss: function () {
            // Payment modal closed
          }
        }
      };




      var rzp1 = new Razorpay(opstion);
      rzp1.open();




    } catch (err) {
      setError(err?.message || 'Payment failed. Please try again.')
    } finally {

      setIsLoading(false)
    }
  }

  if (orderId === null) {
    return <Loading />
  }

  if (orderId == 0) {
    router.push('/user');
    return null;
  }

  return (
    <form
      ref={orderFormData}
      onSubmit={(e) => handelOrderForm(e)}
      method="POST"
      action="/api/payment"
      className="max-w-4xl mx-auto mt-20 px-4"
    >
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 text-sm font-medium">
            <span className="flex items-center text-[var(--accent-color)]">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--accent-color)] text-white mr-2">1</span>
              Shipping
            </span>
            <span className="text-gray-400">───</span>
            <span className="flex items-center text-gray-400">
              <span className="w-6 h-6 flex items-center justify-center rounded-full border mr-2">2</span>
              Payment
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Shipping Information
          </h2>
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            Please provide accurate details so we can deliver your order smoothly.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input data={"Full Name"} type="text" names={"fullName"} />
          <Input data={"Phone"} type="tel" names={"phone"} />


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <select
              name="city"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] 
               focus:border-transparent transition duration-200"
              required
            >
              <option value="">Select your city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <select
              name="state"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] 
               focus:border-transparent transition duration-200"
              required
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <Input data={"Pin Code"} type="number" names={"postalCode"} />
          <Input data={"Landmark (opstinal)"} type="text" names={"landmark"} />
          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              placeholder="House No, Street, Landmark, Area"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] 
                     focus:border-transparent transition duration-200 
                     placeholder-gray-400 resize-none"
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Payment Summary */}
        <div className="mt-12 bg-gray-50 rounded-xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-semibold text-gray-900">
            Total Payable:{" "}
            <span className="text-2xl font-bold text-[var(--accent-color)]">
              ₹{qty == 0 ? payAmount || 0 : payAmount * qty}
            </span>
          </div>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-lg"
              aria-label="Decrease quantity"
              type='button'
            >
              −
            </button>
            <div className="px-4 py-2 font-medium min-w-[3rem] text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
              className="px-3 py-2 text-lg"
              aria-label="Increase quantity"
              type='button'
            >
              +
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading || !session}
            className="w-full md:w-auto px-10 py-4 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-[var(--sec-accent-color)] to-[var(--accent-color)] 
                   shadow-lg hover:scale-105 hover:shadow-xl 
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </form>


  )
}

export default Page

export function Input({ data, type, names }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {data}
      </label>
      <input
        name={names}
        type={type}
        placeholder={`Your ${data}`}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] 
                   focus:border-transparent transition duration-200 
                   placeholder-gray-400"
        required
      />
    </div>
  )
}