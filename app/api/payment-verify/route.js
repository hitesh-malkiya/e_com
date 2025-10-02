import { decrypt } from "@/lib/crypto";
import Admin from "@/modules/admin";
import crypto from "crypto";

export async function POST(req) {
  try {


    // Validate input
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, admin } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !admin) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Missing required payment fields or admin userName" }),
        { status: 400 }
      );
    }

    // Find admin by userName
    const cred = await Admin.findOne({ userName: admin });
    if (!cred) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Admin not found" }),
        { status: 404 }
      );
    }

  

    // Use a constant-time comparison to prevent timing attacks
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const secret =decrypt(cred.razorpaySecret)

      if(!secret) {
        return new Response(
          JSON.stringify({ status: "fail", message: "Server misconfiguration: missing Razorpay secret" }),
          { status: 500 }
        );
      }

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

      // Use timingSafeEqual for better security
      const isValid =
        razorpay_signature &&
        expectedSignature &&
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature, "utf8"),
          Buffer.from(razorpay_signature, "utf8")
        );

      if(isValid) {
        return new Response(
          JSON.stringify({ status: "success", message: "Payment Verified ✅" }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ status: "fail", message: "Payment Verification Failed ❌" }),
          { status: 400 }
        );
      }
    } catch (err) {
      return new Response(
        JSON.stringify({ status: "error", message: err?.message || "Server error" }),
        { status: 500 }
      );
    }
  }
