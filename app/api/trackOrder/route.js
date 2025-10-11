import connectDB from "@/lib/mongoose";
import Admin from "@/modules/admin";
import Order from "@/modules/order";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {


        // Get query parameters from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: "id not found" }, { status: 200 });
        }
        await connectDB();

        let admin;
        let order = await Order.findOne({ shipment_id: id });


        admin = await Admin.findOne({ userName: order.admin });
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 200 });
        }
        let token = admin.shiprocketApiToken;
        if (!token) {
            const loginRes = await axios.post(
                "https://apiv2.shiprocket.in/v1/external/auth/login",
                {
                    email: admin.shiprocketEmail,
                    password: admin.shiprocketPassword, // Use test credentials if KYC not done
                }
            );
            token = loginRes.data.token;
            admin.shiprocketApiToken = token;
            await admin.save();
        }

        const res = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`

            }
        })


        let data = res.data


        return NextResponse.json({ message: "Order tracked", data, }, { status: 200 });


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: " no hale bhai" })
    }
}