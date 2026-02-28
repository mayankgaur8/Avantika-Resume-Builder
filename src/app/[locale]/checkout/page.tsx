"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, Crown, Zap, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PLANS } from "@/lib/plans";
import { getStoredUser } from "@/lib/auth";

// Load Razorpay checkout script dynamically
function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as Window & { Razorpay?: unknown }).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutForm() {
  const t = useTranslations("Checkout");
  const searchParams = useSearchParams();
  const planId = (searchParams.get("plan") as "pro" | "premium") || "pro";
  const billing = searchParams.get("billing") || "monthly";
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];
  const basePrice = billing === "yearly" ? plan.yearlyPrice : plan.price;
  const gst = Math.round(basePrice * 0.18);
  const totalPrice = basePrice + gst;

  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  // Pre-fill from auth
  useEffect(() => {
    const user = getStoredUser();
    if (user) { setName(user.name); setEmail(user.email); }
  }, []);

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) { setError("Failed to load payment gateway. Please try again."); setLoading(false); return; }

    // 1. Create order on server
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: basePrice, planId, billing }),
    });
    const data = await res.json();
    if (!res.ok || !data.orderId) { setError("Could not initiate payment. Please try again."); setLoading(false); return; }

    // 2. Open Razorpay modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Avantika Resume Builder",
      description: `${plan.name} Plan — ${billing === "yearly" ? "Yearly" : "Monthly"}`,
      image: "/logo.png",
      order_id: data.orderId,
      prefill: { name, email },
      theme: { color: plan.id === "premium" ? "#7c3aed" : "#00bcd4" },
      handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
        // 3. Verify signature on server
        const vRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const vData = await vRes.json();
        if (vData.verified) {
          setPaymentId(response.razorpay_payment_id);
          setSuccess(true);
        } else {
          setError("Payment verification failed. Please contact support.");
        }
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", () => {
      setError("Payment failed. Please try a different payment method.");
      setLoading(false);
    });
    rzp.open();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("successTitle")}</h2>
          <p className="text-gray-500 mb-2">{t("successMsg", { plan: plan.name })}</p>
          {paymentId && <p className="text-xs text-gray-400 mb-6 font-mono bg-gray-50 px-3 py-1.5 rounded-lg">Payment ID: {paymentId}</p>}
          <Link href="/dashboard" className="block w-full bg-[#1a2332] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#243042] transition-colors">
            {t("goToDashboard")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: form */}
          <form onSubmit={handlePay} className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="text-base font-bold text-gray-800">{t("accountInfo")}</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t("fullName")}</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
                  placeholder="Mayank Gaur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t("emailAddress")}</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Razorpay payment section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">{t("paymentMethod")}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Visa", "Mastercard", "UPI", "Netbanking", "Wallets"].map((m) => (
                  <span key={m} className="text-xs border border-gray-200 rounded-md px-2.5 py-1 text-gray-500 font-medium">{m}</span>
                ))}
              </div>
              <div className="bg-gradient-to-br from-[#072654] to-[#3395FF] rounded-xl p-4 flex items-center gap-3">
                <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-7 h-7 rounded" onError={(e) => (e.currentTarget.style.display = "none")} />
                <div>
                  <p className="text-white font-bold text-sm">Secured by Razorpay</p>
                  <p className="text-blue-200 text-xs">Card · UPI · Netbanking · Wallets</p>
                </div>
                <ShieldCheck size={20} className="text-blue-200 ml-auto" />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock size={13} /> {t("securePayment")}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2 ${plan.id === "premium" ? "bg-[#7c3aed] hover:bg-[#6d28d9]" : "bg-[#00bcd4] hover:bg-[#00acc1]"}`}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
              ) : (
                `Pay ₹${totalPrice.toLocaleString()} with Razorpay`
              )}
            </button>
          </form>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-base font-bold text-gray-800 mb-4">{t("orderSummary")}</h2>
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.id === "premium" ? "bg-purple-100" : "bg-cyan-100"}`}>
                  {plan.id === "premium" ? <Crown size={20} className="text-[#7c3aed]" /> : <Zap size={20} className="text-[#00bcd4]" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{plan.name}</p>
                  <p className="text-xs text-gray-400">{billing === "yearly" ? t("yearlyBilling") : t("monthlyBilling")}</p>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("planLabel")}</span>
                  <span className="font-medium">₹{basePrice.toLocaleString()}</span>
                </div>
                {billing === "yearly" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Savings</span>
                    <span className="font-medium text-green-600">Save 33%</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("gst")} (18%)</span>
                  <span className="font-medium">₹{gst.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-4">
                <span>{t("total")}</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="mt-4 space-y-1.5">
                {plan.features.slice(0, 5).map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle2 size={13} className="text-green-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">{t("cancelAnytime")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-16 flex items-center justify-center text-gray-400">Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
