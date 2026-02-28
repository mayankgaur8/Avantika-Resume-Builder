import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
    } else {
      return NextResponse.json({ verified: false, error: "Signature mismatch" }, { status: 400 });
    }
  } catch (err) {
    console.error("Razorpay verification failed:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
