
import connectDB from "@/lib/mongoose";
import Order from "@/modules/order";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";




export async function POST(req) {

    
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        
        })
        await connectDB()
        const a = await req.json();
        const {admin,  user, orderId, quantity, userName, email, payAmount, fullName, address, city, state, postalCode, phone } = a;
    


        const receiptNo = `${Date.now()}`;


        let oder = {
            amount: Math.round(payAmount * 100),
            currency: "INR",

        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: 'Razorpay keys missing' }, { status: 500 });
          }
        const x = await razorpay.orders.create(oder)
        let { id, amount, status } = x

        const order = await Order.create({
            admin,
            user,
            id,
            status:"shipped",
            productID:orderId,
            receipt:receiptNo,
            quantity,
            userName,
            email,
            payAmount,
            amount,
            shippingAddress: {
                fullName,
                address,
                city,
                state,
                postalCode,
                phone
            },
            
            paymentMethod:'cod',
            paymentStatus:status
        });



        return new NextResponse(JSON.stringify( x))
    } catch (err) {
        return NextResponse.json({ error: err?.message || "Servereeeeeeee error", err });
    }
}






export async function PUT(req) {
    try {
      await connectDB(); // wait for DB connection
  
      const { id } = await req.json();
      if (!id) {
        return NextResponse.json({ error: "Order ID is required" }, { status: 200 });
      }
      const order = await Order.findOne({ id });
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 200 });
      }
  
      order.paymentStatus = "success";
      order.orderStatus = "Shipping";
  
      await order.save(); // save the order
  
      return NextResponse.json(order, { status: 200 });
    } catch (err) {
      
      return NextResponse.json(err, { status: 200 });
    }
}



 

export async function GET(req) {
  try {
    await connectDB();

    // Extract query params from request URL
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    if (!admin) {
      return NextResponse.json(
        { error: "Order admin is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ admin });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("GET /api/payment error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }

}