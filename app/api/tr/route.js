import connectDB from "@/lib/mongoose";

import Razorpay from "razorpay";
import Order from "@/modules/order";
import Admin from "@/modules/admin";

import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req) {
  try {
    await connectDB();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, admin } = await req.json();
  
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Payment verification data missing" }, { status: 400 });
    }


    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;



    const DBadmin = await Admin.findOne({ userName: admin });
    if (!DBadmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    // const platformFundAccountId = process.env.PLATFORM_FUND_ACCOUNT_ID;
    const vendorFundAccountId = DBadmin.fundAccountId;

  

    // Fetch order from DB
    const order = await Order.findOne({ id: razorpay_order_id });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const totalAmount = order.amount; // already in paise
    const vendorAmount = Math.floor(totalAmount * 0.98);


    const instance = new Razorpay({ key_id, key_secret });
    const a = Buffer.from(`${key_id}:${key_secret}`).toString("base64");




    async function activateFundAccount(fundAccountId) {
      try {
        const response = await axios.patch(
          `https://api.razorpay.com/v1/fund_accounts/${fundAccountId}`,
          { active: true },
          {
            headers: {
              Authorization: `Basic ${a}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (err) {
        console.error("Error activating fund account:", err.response?.data || err.message);
      }
    }

    // Usage:
    await activateFundAccount(vendorFundAccountId);
    // await activateFundAccount(platformFundAccountId);


    const response = await axios.get("https://api.razorpay.com/v1/fund_accounts", {
      headers: { Authorization: `Basic ${a}` },
    });



    const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");
    // let platAccountNumber;
    let vendorAccountNumber;
    try {
      const response = await axios.get(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json"
          },
        }
      );
     
      const fundAccounts = response.data.items;

      // Vendor fund account
      const vendorAccount = fundAccounts.find(acc => acc.id === vendorFundAccountId);
      // const platAccount = fundAccounts.find(acc => acc.id === platformFundAccountId);
      vendorAccountNumber = vendorAccount.bank_account.account_number;
      // platAccountNumber = platAccount.bank_account.account_number;


      // console.log("Platform Account Number:", platAccountNumber);
    } catch (err) {
   
    }
    // Verify paymenlt status
    const payment = await instance.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      return NextResponse.json({ error: "Payment not captured yet" }, { status: 200 });
    }









    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });





const res = await razorpay.transfers.create({
  account: vendorFundAccountId,
  amount: vendorAmount,
  currency: "INR",
  notes: {
    order_id: razorpay_order_id
  },
  linked_account_notes: [],
  on_hold: 0,
  on_hold_until: null,
  reference_id: razorpay_payment_id
});
  







   

  return NextResponse.json({ success: true }, { status: 200 });

} catch (err) {
 


  return NextResponse.json(
    { error: err }
  );
}
}

