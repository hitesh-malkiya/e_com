import { getUser, } from '@/lib/getUserOrder';

import React from 'react'

import OrdercardPage from './OrdercardPage';

 async function OrderData({userName}) {

 let orders = [];
  try {
    const res = await getUser(userName) ;
    orders = res?.data?.user?.oder
  

  } catch (err) {
    orders = [];
  }



  if(orders.length === 0) {     
    return (
      <div className='mt-24 text-center'>
        <h2 className='text-2xl'>No Orders Found</h2>
      </div>
    )
  }


  return (
  
    <div>
      
      {orders.map((cur) => (
        <OrdercardPage key={cur} id={cur} />
      ))}
    </div>
  )
}

export default OrderData
