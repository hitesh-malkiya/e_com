import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { name, email, contact, reference_id, ifsc, account_number } = await req.json();
        console.log({ name, email, contact, reference_id, ifsc, account_number });

        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");
        console.log({ key_id, key_secret, auth });

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
        console.log("ahkehhoeoiewjeiw", { contactResponse: contactResponse.data });

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
        console.log({ fundAccountPayload });

        const fundAccountResponse = await axios.post(
            "https://api.razorpay.com/v1/fund_accounts",
            fundAccountPayload,
            { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }
        );
        console.log({ fundAccountResponse: fundAccountResponse.data });

        return NextResponse.json({
            message: "Test Mode Contact and Fund Account created successfully",
            fund_account: fundAccountResponse.data
        }, { status: 200 });

    } catch (err) {
        console.error("Razorpay Fund Account Error:", err.response?.data || err.message);
        return NextResponse.json({ error: err.response?.data || err.message }, { status: 400 });
    }
}
