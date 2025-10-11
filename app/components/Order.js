"use client";
import React from "react";

const Order = ({ orders }) => {

  // 🔹 Helper function to download Shiprocket docs

  const handleDownload = async (type, shipmentId, orderId, shipmenOorder_id) => {
    try {
      // Prepare request body
      const body = { type };
      body.order_id = orderId,
      body.shipment_id = shipmentId;
      body.shipmenOorder_id = shipmenOorder_id;
      // Call backend API
      const res = await fetch("/api/shiprocket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });


 let data;
    try {
      data = await res.json();
    } catch (err) {
      console.log("Invalid JSON from server:", err);
      alert("Server returned invalid response");
      return;
    }

    if (data.url) {
      window.open(data.url, "_blank"); // opens PDF in new tab
    } else {
      console.log("No URL returned:", data);
      alert("Failed to generate document: No URL returned");
    }
  } catch (error) { 
    console.log("Download error:", error);
    alert("An error oc  curred while downloading the document");
    
  }

  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Order ID</th>
              <th className="border px-3 py-2">Receipt</th>
              <th className="border px-3 py-2">User</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Payment</th>
              <th className="border px-3 py-2">Order Status</th>
              <th className="border px-3 py-2">Shipping Address</th>
              <th className="border px-3 py-2">Created</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-3 py-2">{order.id}</td>
                <td className="border px-3 py-2">{order.receipt}</td>
                <td className="border px-3 py-2">{order.userName}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">₹{order.amount / 100}</td>
                <td className="border px-3 py-2">
                  {order.paymentStatus} ({order.paymentMethod})
                </td>
                <td className="border px-3 py-2">{order.orderStatus}</td>
                <td className="border px-3 py-2">
                  {order.shippingAddress
                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`
                    : "N/A"}
                </td>
                <td className="border px-3 py-2">
                  03/10/2025
                </td>
                <td className="border px-3 py-2">
                  {/* <button
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs mr-1"
                    onClick={() =>
                      handleDownload("label", order.shipment_id , order.id , order.shipmenOorder_id)
                    }
                  >
                    Label
                  </button>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded text-xs mr-1"
                    onClick={() =>
                      handleDownload("manifest", order.shipment_id, order.id  ,order.shipmenOorder_id)
                    }
                  >
                    Manifest
                  </button> */}
                  <button
                    className="px-2 py-1 bg-purple-500 text-white rounded text-xs"
                    onClick={() =>
                      handleDownload("invoice", order.shipment_id, order.id , order.shipmenOorder_id)
                    }
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
