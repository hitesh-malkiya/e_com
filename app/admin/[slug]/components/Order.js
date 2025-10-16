
import React from "react";
import OrdercardPage from "./OrdercardPage";

const Order = ({ orders }) => {

  


  if (orders.length === 0) {
    return (
      <div className="p-6 mt-24">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      {
        orders.map((cur) =>  <OrdercardPage key={cur.id} id={cur.id} />    )
        }
    </div>
            
  );
};

export default Order;






