import connectDB from "@/lib/mongoose";
import Admin from "@/modules/admin";
import Order from "@/modules/order";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        if (!body.userName) {
            return NextResponse.json({ success: false, error: "Admin userName is required" }, { status: 200 });
        }

        const admin = await Admin.findOne({ userName: body.userName });
        if (!admin) {
            return NextResponse.json({ success: false, error: "Admin not found" }, { status: 200 });
        }

        const order = await Order.findOne({ id: body.orderId });
        if (!order) {
            return NextResponse.json({ success: false, error: "Order not found" }, { status: 200 });
        }

        // Get or refresh Shiprocket token
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

        let lastName;
        let firstName;
        console.log("heiuweuyvtt", order);

        if (order.user) {
            const full = order.user.trim();
            const parts = full.split(/\s+/);
            lastName = parts.pop();
            firstName = parts.join(' ');
        }
        // Corrected order object
        const orderBody = {
            order_id: order.id || "order_" + Date.now(),
            order_date: new Date().toISOString(),
            pickup_location: "home",

            billing_customer_name: firstName || "unoun ",
            billing_last_name: lastName || "unoun",
            billing_address: order.shippingAddress?.address || "12, Gokultham, 80 Fut Road",
            billing_address_2: body.landmark || "Null",
            billing_city: order.shippingAddress?.city,
            billing_pincode: order.shippingAddress?.postalCode ,
            billing_state: order.shippingAddress?.state,

            billing_country: "India",
            billing_email: order.email || "hiteshmalkiya@gmail.com",
            billing_phone: order.phone || "7046613120",

            shipping_is_billing: true,

            order_items: [
                {
                    name: "Cloth Item",
                    sku: "sku123",
                    units: order.quantity || 1,
                    selling_price: order.payAmount || 0,
                },
            ],

            payment_method: "Prepaid",
            sub_total: order.payAmount || 0,

            length: 10,
            breadth: 10,
            height: 10,
            weight: 0.5,
        };



        const orderRes = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            orderBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        order.shipment_id = orderRes.data.order_id;
        order.shipmenOorder_id = orderRes.data.shipment_id;
        await order.save(); // Save updated order

        return NextResponse.json({ success: true, order: orderRes.data }, { status: 200 });

    } catch (error) {
        console.log("Error creating Shiprocket order:", error.response?.data || error.message, error);
        return NextResponse.json({ success: false, error: error.response?.data || error.message }, { status: 200 });
    }
}
