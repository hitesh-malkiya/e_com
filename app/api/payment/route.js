
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



        return new NextResponse(JSON.stringify(order , x))
    } catch (err) {
        return NextResponse.json({ error: err?.message || "Servereeeeeeee error", err });
    }
}