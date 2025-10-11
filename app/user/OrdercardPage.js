
import { getOrder, getProduct, trackOrder } from '@/lib/getUserOrder';
import React from 'react'
import OrderCard from './OrderCard';

 async function OrdercardPage({id}) {




let odata
let tdata
let pdata



    try{
const ores = await getOrder(id) ;
odata =ores.data.data
 let tid = ores.data.data.shipment_id

 
let tres = await trackOrder(tid)
tdata = tres.data


let pres = await getProduct(ores.data.data.productID)
pdata = pres.data


    }catch(err){

    }
  return (
    <div>
     <OrderCard orderData={odata} productData={pdata} trackingRaw={tdata} />
    </div>
  )
}

export default OrdercardPage
