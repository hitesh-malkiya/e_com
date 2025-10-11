import { getUser, getUserOrder } from '@/lib/getUserOrder';
import axios from 'axios'
import React from 'react'
import OrderCard from './OrderCard';
import OrdercardPage from './OrdercardPage';

 async function OrderData({userName}) {

 let orders = [];
  try {
    const res = await getUser(userName) ;
    orders = res?.data?.user?.oder
  

  } catch (err) {
  
    orders = [];
  }


  return (
  
    <div>
      <h1>hel haleyulo</h1>
      {orders.map((cur) => (
        <OrdercardPage key={cur} id={cur} />
      ))}
    </div>
  )
}

export default OrderData
