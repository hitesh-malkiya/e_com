
import { getOrder, getProduct, trackOrder } from '@/lib/getUserOrder';
import React from 'react'
import OrderCard from './OrderCard';
import Loading from '../loading';

async function OrdercardPage({ id }) {




  let odata
  let tdata
  let pdata



  try {
    const ores = await getOrder(id);
    odata = ores.data.data
    let tid = ores.data.data.shipment_id
    // console.log(odata);


    let tres = await trackOrder(tid)
    tdata = tres.data

    // console.log(tdata);

    let pres = await getProduct(ores.data.data.productID)


    pdata = await pres
    console.log(pdata);


  } catch (err) {

  }



  return (
    <div>
      <OrderCard orderData={odata} productData={pdata} trackingRaw={tdata} />
    </div>
  )
}

export default OrdercardPage
