import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, planId, billing } = await req.json();

    // amount in INR — convert to paise (1 INR = 100 paise)
    const amountPaise = Math.round(amount * 1.18) * 100; // include 18% GST

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
