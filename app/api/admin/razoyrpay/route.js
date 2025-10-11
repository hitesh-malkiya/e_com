import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { name, email, contact, reference_id, ifsc, account_number } = await req.json();
        console.log({ name, email, contact, reference_id, ifsc, account_number });

        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");


        // Step 1: Create Contact
        const contactPayload = {
            name,
            email,
            contact,
            type: "vendor",
            reference_id,
        
            
        
        };
        const contactResponse = await axios.post(
            "https://api.razorpay.com/v1/contacts",
            contactPayload,
            { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }
        );
        const contact_id = contactResponse.data.id;

        // Step 2: Create Fund Account (Test Mode)
        const fundAccountPayload = {
            account_type: "bank_account",
            contact_id,       // top-level
            bank_account: {   // directly here
                name,
                ifsc,
                account_number

            }
        };

        const fundAccountResponse = await axios.post(
            "https://api.razorpay.com/v1/fund_accounts",
            fundAccountPayload,
            { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }
        );

        return NextResponse.json({
            message: "Test Mode Contact and Fund Account created successfully",
            fund_account: fundAccountResponse.data
        }, { status: 200 });

    } catch (err) {
        
        return NextResponse.json({ error: err.response?.data || err.message , message:"account not created somthing wrong"}, { status: 400 });
    }
}
