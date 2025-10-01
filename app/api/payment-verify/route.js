import crypto from "crypto";

export async function POST(req) {
  try {
    // Validate input
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Missing required payment fields" }),
        { status: 400 }
      );
    }

    // Use a constant-time comparison to prevent timing attacks
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
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

    if (isValid) {
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
