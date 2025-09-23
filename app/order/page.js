'use client'
import { getProductsSort } from '@/lib/Getproduct'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'

function page({ searchParams }) {

  const orderFormData = useRef(null)
  const [orderId, setOrderId] = useState(null)
  const [payAmount, setPayAmount] = useState(0)
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { data: session } = useSession()

  const dataGet = async (id) => {
    try {
      const tamp = await searchParams
      const queryString = new URLSearchParams(tamp).toString();
      console.log(queryString);

      const res = await getProductsSort(queryString, id, 'id');

      const price = res?.data?.products?.[0]?.price;
      const adminData = res?.data?.products?.[0]?.admin;
      setAdmin(adminData);
      console.log(price , adminData);
      
      return price;
    } catch (err) {

      return 0;
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const run = async () => {
        const productId = localStorage.getItem('productId');
        setOrderId(productId);
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
  }, [orderId]);

  console.log(payAmount);

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
      const quantity =  1
      const fullName = orderFormData.current.fullName.value
      const address = orderFormData.current.address.value || ""
      const city = orderFormData.current.city.value
      const state = orderFormData.current.state.value
      const postalCode = orderFormData.current.postalCode.value
      const phone = orderFormData.current.phone.value


    
      const amount = Math.max(1, Math.round((Number(payAmount) || 0) * quantity)); // in rupees, min ₹1
      const response = await axios.post('/api/payment', {
        admin,
        user,
        orderId,
        quantity,
        userName,
        email,
        payAmount: amount,
        fullName,
        address,
        city,
        state,
        postalCode,
        phone,
      }
      )
      console.log("reeeeee" , response);
      
      orderFormData.current.reset();


      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Razorpay SDK failed to load");
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      console.log(response);

      const { data } = response
      const opstion = {
        key,
        order_id: data.id,
        theme: { color: "#111111" },
        amount: amount,
        currency: "INR",
        name: userName,
        description: "Test Transaction",
        image: "https://example.com/your_logo",
     
       
        // checkout_config_id: process.env.NEXT_PUBLIC_RAZORPAY_CHECKOUT_CONFIG_ID || "YourConfigIDHere",
        prefill: {
          name: fullName, //your customer's name
          email: email,
          contact: phone //Provide the customer's phone number for better conversion rates 
        },
        // handler: function (response) {
        //   console.log('Payment successful:', response);
        //   // Handle successful payment
        //   window.location.href = '/user';
        // },
        // modal: {
        //   ondismiss: function () {
        //     console.log('Payment modal closed');
        //   }
        // }
      }
      console.log(opstion);

      var rzp1 = new Razorpay(opstion);
      rzp1.open();
console.log(rzp1);


    } catch (err) {
      console.log(err);
      setError(err?.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }


  }

  return (
    <form ref={orderFormData} onSubmit={(e) => handelOrderForm(e)} method="POST" action="/api/payment" className="space-y-8">



      <div className="bg-white rounded-xl p-6 shadow-lg mt-24 ">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input data={"Full Name"} type={'text'} names={'fullName'} />
          <Input data={"Phone"} type={'tel'} names={'phone'} />
  

          <Input data={'City'} type={'text'} names={'city'} />
          <Input data={'State'} type={'text'} names={'state'} />
          <Input data={'Pin Code'} type={'number'} names={'postalCode'} />
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              name="address"
              placeholder="Your Address"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200 "
              required
              rows={3}
            />
          </div>

        </div>


        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}


        <div className="flex items-center gap-10 mt-6 mb-5">
          <div className="text-lg font-semibold text-[var(--text-color)]">Payable Amount: ₹{payAmount || 0}</div>
          <button
            type="submit"
            disabled={isLoading || !session}
            className="px-6 py-3 bg-[var(--sec-accent-color)]  hover:bg-[var(--accent-color)] text-[var(--bg-color)] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>



  )
}

export default page


export function Input({ data, type, names }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{data}</label>
      <input name={names} type={type} placeholder={`Your ${data}`} className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200 " required />
    </div>
  )
}