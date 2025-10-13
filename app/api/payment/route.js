import connectDB from "@/lib/mongoose";
import Order from "@/modules/order";

import Razorpay from "razorpay";
import { NextResponse } from "next/server";


// ------------------ CREATE ORDER ------------------
export async function POST(req) {
  try {
    await connectDB();
    const {
      admin,
      user,
      orderId,
      quantity,
      userName,
      email,
      payAmount,
      fullName,
      address,
      city,
      state,
      postalCode,
      phone,

    } = await req.json();

    if (!admin || !user || !orderId || !payAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const receiptNo = `${Date.now()}`;
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: "Razorpay keys missing" }, { status: 200 });
    }


    let total_amount = payAmount * 100;
    const razorpay = new Razorpay({ key_id, key_secret });

    // Create Razorpay order
    const orderPayload = {
      amount: Math.round(total_amount), // paise
      currency: "INR",
      receipt: receiptNo
    };


    const razorpayOrder = await razorpay.orders.create(orderPayload);






    // Save order in DB
    const order = await Order.create({
      admin,
      user,
      id: razorpayOrder.id,
      status: "pending",
      productID: orderId,
      receipt: receiptNo,
      quantity,
      userName,
      email,
      payAmount,
      amount: razorpayOrder.amount,
      shippingAddress: {
        fullName,
        address,
        city,
        state,
        postalCode,
        phone
      },

      paymentMethod: "online",
      paymentStatus: "created"
    });

    return NextResponse.json({
      success: true,
      message: "Order created",
      order,
      razorpayKey: key_id,
      razorpayOrder
    });

  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}



export async function GET(params) {
  try {
    const { searchParams } = new URL(params.url)
    const id = searchParams.get("id")


    if (!id) {
      return NextResponse.json({ message: "error" })
    }
    await connectDB()
    const order = await Order.findOne({ id })
    const data = order
    if (!data) {
      return NextResponse.json({ message: "error" })
    }
    if (data.length === 0) {
      return NextResponse.json({ message: "error" })
    }
    return NextResponse.json({ data })
  } catch (err) {

    return NextResponse.json({ message: "error" })

  }
}









