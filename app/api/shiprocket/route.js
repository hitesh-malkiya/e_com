import connectDB from "@/lib/mongoose";
import Order from "@/modules/order";
import Admin from "@/modules/admin";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { type, shipment_id , order_id , shipmenOorder_id } = await req.json();
    console.log({ type, shipment_id, order_id , shipmenOorder_id });

    // Validate input
    if (!type || (!shipment_id && !order_id )) {
      return NextResponse.json({ error: "Type and ID required" }, { status: 400 });
    }

    await connectDB();

    // Find order by shipment_id or order_id
    const order = await Order.findOne(
      shipment_id ? { shipment_id } : {id: order_id }
    );

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // Find admin
    const admin = await Admin.findOne({ userName: order.admin });
    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });


    // Get Shiprocket token
    let token = admin.shiprocketApiToken;
    if (!token) {
      const loginRes = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: admin.shiprocketEmail,
          password: admin.shiprocketPassword
        }
      );
   
      token = loginRes.data.token;

      admin.shiprocketApiToken = token;
      await admin.save();
    }


  let r;
let url = "";

if (type === "invoice") {
  r = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
    { ids: [shipment_id] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  url = r.data.invoice_url

} else if (type === "manifest") {
  r = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/manifests/generate",
    { orders: [order_id]}, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(r.data);
  
  url = r.data.manifest_url

} else if (type === "label") {



  r = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/courier/generate/label",
    { shipment_id: [shipment_id] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
   console.log(r.data);
  url = r.data.label_url
  
}


return NextResponse.json({ url });


  } catch (err) {
    console.error("Shiprocket route error:", err.response?.data || err.message);
    return NextResponse.json({ error: err.response?.data || err.message }, { status: 500 });
  }
}
