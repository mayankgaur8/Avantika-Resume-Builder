import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, planId, billing } = await req.json();

    // Initialize inside handler so build doesn't fail when env vars are absent
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // amount in INR — convert to paise (1 INR = 100 paise), GST added client-side
    const amountPaise = Math.round(amount * 1.18) * 100;

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${planId}_${billing}_${Date.now()}`,
      notes: { planId, billing },
    });

    return NextResponse.json({ orderId: order.id, amount: amountPaise });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
