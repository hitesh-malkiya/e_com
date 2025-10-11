import crypto from "crypto";
import { NextResponse } from "next/server";
import Admin from "@/modules/admin";
import Order from "@/modules/order";
import connectDB from "@/lib/mongoose";


export async function POST(req) {
try {
await connectDB();


const { razorpay_order_id, razorpay_payment_id, razorpay_signature, admin,orderId } = await req.json();

// Validate input
if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !admin || !orderId) {
  return NextResponse.json({ status: "fail", message: "Missing required fields" }, { status: 400 });
}

// Check admin
const adminData = await Admin.findOne({ userName: admin });
if (!adminData) {
  return NextResponse.json({ status: "fail", message: "Admin not found" }, { status: 404 });
}

// Verify signature
const secret = process.env.RAZORPAY_KEY_SECRET;
const body = `${razorpay_order_id}|${razorpay_payment_id}`;
const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

if (expectedSignature !== razorpay_signature) {
  return NextResponse.json({ status: "fail", message: "Payment verification failed ❌" }, { status: 400 });
}

// Update order
const order = await Order.findOne({ id: orderId });
if (!order) {
  return NextResponse.json({ status: "fail", message: "Order not found" }, { status: 404 });
}

order.paymentStatus = "success";
order.orderStatus = "Shipping";
await order.save();

return NextResponse.json({
  status: "success",
  message: "Payment verified and order updated ✅",
  order,
}, { status: 200 });


} catch (err) {
return NextResponse.json({ status: "error", message: err.message || "Server error" }, { status: 500 });
}
}
