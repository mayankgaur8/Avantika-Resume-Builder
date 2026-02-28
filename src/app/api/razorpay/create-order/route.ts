import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, planId, billing } = await req.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
    }

    // Amount in paise (1 INR = 100 paise), include 18% GST
    const amountPaise = Math.round(amount * 1.18) * 100;

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `rcpt_${planId}_${billing}_${Date.now()}`,
        notes: { planId, billing },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Razorpay error:", JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error?.description || "Failed to create order" },
        { status: response.status }
      );
    }

    return NextResponse.json({ orderId: data.id, amount: data.amount });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
