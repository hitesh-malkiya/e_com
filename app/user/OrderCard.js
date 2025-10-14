"use client";
import React, { useMemo } from "react";
import { AddToCartButton } from "../components/AddToCartButton";
import { Buybtn } from "../components/Buybtn";

export default function OrderCard({ orderData, productData, trackingRaw }) {
  console.log({ orderData, productData, trackingRaw });



  /* Choose which example to show by default (replace with actual fetch result) */


  /* ----------------------- Utility & normalization logic ----------------------- */

  /** Steps for the progress bar in order */
  const STEPS = [
    { key: "PUD", label: "Picked Up" },
    { key: "PKD", label: "Shipped" },
    { key: "IT", label: "In Transit" },
    { key: "OFD", label: "Out for Delivery" },
    { key: "DLVD", label: "Delivered" },
  ];

  /** Normalize tracking raw payload into { activities: [], awb, courier, etd } */
  function normalizeTracking(raw) {

    if (!raw) return { activities: [], awb: null, courier: null, etd: null, error: null };

    // case when object has a numeric key like "993975537": { tracking_data: { ... } }
    const firstKey = Object.keys(raw)[0];
    let tracking_data = null;

    if (raw.tracking_data) {
      tracking_data = raw.tracking_data;


    } else if (raw[firstKey] && raw[firstKey].tracking_data) {
      tracking_data = raw[firstKey].tracking_data;
    }

    if (!tracking_data) {
      return { activities: [], awb: null, courier: null, etd: null, error: "No tracking data" };
    }

    const activities = Array.isArray(tracking_data.shipment_track_activities)
      ? // Normalize date and sort descending (latest first)
      tracking_data.shipment_track_activities
        .map((a) => ({ ...a, ts: a.date ? new Date(a.date).getTime() : 0 }))
        .sort((a, b) => b.ts - a.ts)
      : [];


    const awb = Array.isArray(tracking_data.shipment_track) && tracking_data.shipment_track[0]?.awb_code
      ? tracking_data.shipment_track[0].awb_code
      : null;

    const courier = Array.isArray(tracking_data.shipment_track) && tracking_data.shipment_track[0]?.courier_name
      ? tracking_data.shipment_track[0].courier_name
      : null;

    const etd = tracking_data.etd || null;
    const error = tracking_data.error || null;

    return { activities, awb, courier, etd, error };
  }

  /** Map a tracking step code/label to step index (0..4) */
  function mapStatusToStepIndex(statusOrLabel) {
    if (!statusOrLabel) return 0;
    const s = String(statusOrLabel).toUpperCase();

    if (["DLVD", "DELIVERED"].some((v) => s.includes(v))) return 4;
    if (["OFD", "OUT FOR DELIVERY"].some((v) => s.includes(v))) return 3;
    if (["IT", "IN TRANSIT"].some((v) => s.includes(v))) return 2;
    if (["PKD", "SHIPPED"].some((v) => s.includes(v))) return 1;
    if (["PUD", "PICKED", "PICKED UP", "PICKDONE"].some((v) => s.includes(v))) return 0;

    return 0;
  }

  /* ------------------------------ React component ------------------------------ */



  const { activities, awb, courier, etd, error } = useMemo(
    () => normalizeTracking(trackingRaw),
    []
  );

  // compute latest step index
  const latestActivity = activities.length ? activities[0] : null;
  const latestIndex = latestActivity ? mapStatusToStepIndex(latestActivity.status || latestActivity["sr-status-label"] || latestActivity.activity) : 0;
  console.log(productData);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Order #{orderData.id}
            </h1>
            <p className="text-sm text-gray-500">
              Placed {new Date(orderData.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div
                className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${orderData.paymentStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {orderData.orderStatus?.toUpperCase() || "PENDING"}
              </div>

            </div>
            <div className="text-sm text-gray-500">
              <div>Receipt: <span className="font-mono">{orderData.receipt}</span></div>
              <div>Shipment ID: <span className="font-mono">{orderData.shipment_id}</span></div>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full md:w-48 h-48 object-contain rounded-lg border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{productData.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{productData.mainDes}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div><span className="font-semibold">Brand: </span>{productData.brand}</div>
                  <div><span className="font-semibold">Category: </span>{productData.category}</div>
                  <div><span className="font-semibold">Price: </span>₹{productData.price}</div>
                  <div><span className="font-semibold">Qty: </span>{orderData.quantity}</div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                 
                    <AddToCartButton productId={productData._id} />
                    <Buybtn productId={productData._id} />
             

                </div>
              </div>
            </div>

            {/* Tracking header inside product card */}
            <div className="mt-6 border-t pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Courier</p>
                  <p className="font-semibold">{courier || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">AWB / Tracking</p>
                  <p className="font-mono text-sm">{awb || "Not available"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ETD</p>
                  <p className="font-semibold">{etd ? new Date(etd).toLocaleString() : "—"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right summary */}
          <aside className="bg-white rounded-2xl shadow p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-sm text-gray-500">Shipping Address</h3>
              <div className="mt-2 text-sm text-gray-700">
                <div className="font-medium">{orderData.shippingAddress.fullName}</div>
                <div>{orderData.shippingAddress.address}</div>
                <div>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postalCode}</div>
                <div>📞 {orderData.shippingAddress.phone}</div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm text-gray-500">Payment  Status: 
                <span className={` text-center text-gray-500 px-3 pb-1 rounded-full font-semibold text-sm ${orderData.paymentStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
                }`}>  {orderData.paymentStatus}</span></h3>

              <div className="mt-2 text-sm">
                <div><span className="font-semibold">Method:</span> {orderData.paymentMethod}</div>
                <div className="mt-2 font-bold text-gray-800">Paid: ₹{orderData.payAmount}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm text-gray-500">Summary</h3>
              <div className="mt-2 text-sm text-gray-700">
                <div>Items: {orderData.quantity}</div>
                <div>Subtotal: ₹{productData.price * orderData.quantity}</div>
                <div>Shipping: ₹0</div>
                <div className="font-semibold mt-2">Total: ₹{orderData.payAmount}</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Progress bar */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Order Progress</h3>
          <div className="flex items-center gap-4">
            {STEPS.map((step, i) => {
              const active = i <= latestIndex;
              return (
                <div key={step.key} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center w-full">
                      <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${active ? "bg-purple-600" : "bg-gray-300"}`}>
                        {i + 1}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-1 ${i < latestIndex ? "bg-purple-600" : "bg-gray-300"}`} />
                      )}
                    </div>
                    <div className={`mt-3 text-sm ${active ? "text-purple-700 font-semibold" : "text-gray-400"}`}>{step.label}</div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* Tracking timeline */}
          <div className="mt-6">
            <h4 className="text-sm text-gray-500 mb-3">Tracking History</h4>

            {activities.length === 0 ? (
              <div className="text-sm text-gray-500">
                {error ? (
                  <div>
                    <div>{error}</div>
                    <div className="mt-2">No timeline yet — try after some time or contact courier.</div>
                  </div>
                ) : (
                  <div>No activities yet. Please check back later.</div>
                )}
              </div>
            ) : (
              <ul className="space-y-4">
                {activities.map((a, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-3 h-3 mt-2 rounded-full bg-purple-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{a.activity || a["sr-status-label"] || a.status}</div>
                        <div className="text-xs text-gray-400">{a.status}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {a.date ? new Date(a.date).toLocaleString() : "—"} • {a.location || "—"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
