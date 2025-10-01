import React from "react";

const Order = async (params) => {
  const { orders } = await params;
  console.log(orders);
  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-3 py-2">{order._id}</td>
                <td className="border px-3 py-2">{order.receipt}</td>
                <td className="border px-3 py-2">{order.userName}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">₹{order.amount}</td>
                <td className="border px-3 py-2">
                  {order.paymentStatus} ({order.paymentMethod})
                </td>
                <td className="border px-3 py-2">{order.orderStatus}</td>
                <td className="border px-3 py-2">
                  {order.shippingAddress
                    ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zip}`
                    : "N/A"}
                </td>
                <td className="border px-3 py-2">
                  {new Date(order.createdAt).toLocaleString()}
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
