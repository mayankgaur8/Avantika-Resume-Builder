"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, CreditCard, Crown, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PLANS } from "@/lib/plans";

function CheckoutForm() {
  const t = useTranslations("Checkout");
  const searchParams = useSearchParams();
  const planId = (searchParams.get("plan") as "pro" | "premium") || "pro";
  const billing = searchParams.get("billing") || "monthly";
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];
  const price = billing === "yearly" ? plan.yearlyPrice : plan.price;
  const perMonth = billing === "yearly" ? Math.round(plan.yearlyPrice / 12) : plan.price;
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "", upi: "" });
  const [method, setMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1800); };
  const input = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]";
  const lbl = "block text-xs font-semibold text-gray-500 mb-1";

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={36} className="text-green-500" /></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("successTitle")}</h2>
          <p className="text-gray-500 mb-6">{t("successMsg", { plan: plan.name })}</p>
          <Link href="/dashboard" className="block w-full bg-[#1a2332] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#243042] transition-colors">{t("goToDashboard")}</Link>
        </div>
      </div>
    );
  }

  const banks = ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Bank of Baroda"];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="text-base font-bold text-gray-800">{t("accountInfo")}</h2>
              <div><label className={lbl}>{t("fullName")}</label><input className={input} placeholder="Mayank Gaur" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><label className={lbl}>{t("emailAddress")}</label><input className={input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="text-base font-bold text-gray-800">{t("paymentMethod")}</h2>
              <div className="flex gap-2">
                {(["card", "upi", "netbanking"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setMethod(m)} className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${method === m ? "border-[#00bcd4] bg-[#e0f7fa] text-[#00838f]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {m === "card" ? t("card") : m === "upi" ? t("upi") : t("netbanking")}
                  </button>
                ))}
              </div>
              {method === "card" && (
                <div className="space-y-3">
                  <div><label className={lbl}>{t("cardNumber")}</label><div className="relative"><input className={`${input} pr-10`} placeholder="4242 4242 4242 4242" maxLength={19} value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim() })} required /><CreditCard size={16} className="absolute right-3 top-3 text-gray-400" /></div></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={lbl}>{t("expiry")}</label><input className={input} placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} required /></div>
                    <div><label className={lbl}>{t("cvv")}</label><input className={input} placeholder="123" maxLength={4} type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} required /></div>
                  </div>
                </div>
              )}
              {method === "upi" && <div><label className={lbl}>UPI ID</label><input className={input} placeholder={t("upiPlaceholder")} value={form.upi} onChange={(e) => setForm({ ...form, upi: e.target.value })} required /><p className="text-xs text-gray-400 mt-1.5">{t("upiHint")}</p></div>}
              {method === "netbanking" && <div><label className={lbl}>{t("selectBank")}</label><select className={input}>{banks.map((b) => <option key={b}>{b}</option>)}</select></div>}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400"><Lock size={13} /> {t("securePayment")}</div>
            <button type="submit" disabled={loading} className="w-full bg-[#1a2332] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#243042] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("processing")}</> : t("payBtn", { amount: billing === "yearly" ? price.toLocaleString() : price, period: billing === "yearly" ? t("perYear") : t("perMonth") })}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-base font-bold text-gray-800 mb-4">{t("orderSummary")}</h2>
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.id === "premium" ? "bg-purple-100" : "bg-cyan-100"}`}>
                  {plan.id === "premium" ? <Crown size={20} className="text-[#7c3aed]" /> : <Zap size={20} className="text-[#00bcd4]" />}
                </div>
                <div><p className="text-sm font-bold text-gray-800">{plan.name}</p><p className="text-xs text-gray-400">{billing === "yearly" ? t("yearlyBilling") : t("monthlyBilling")}</p></div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm"><span className="text-gray-500">{t("planLabel")}</span><span className="font-medium">₹{perMonth}/mo</span></div>
                {billing === "yearly" && <div className="flex justify-between text-sm"><span className="text-gray-500">{t("billedYearly")}</span><span className="font-medium text-green-600">Save 33%</span></div>}
                <div className="flex justify-between text-sm"><span className="text-gray-500">{t("gst")}</span><span className="font-medium">₹{Math.round(price * 0.18).toLocaleString()}</span></div>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-4"><span>{t("total")}</span><span>₹{Math.round(price * 1.18).toLocaleString()}</span></div>
              <div className="mt-4 space-y-1.5">{plan.features.slice(0, 5).map((f) => <div key={f} className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle2 size={13} className="text-green-500 shrink-0" /> {f}</div>)}</div>
              <p className="text-xs text-gray-400 mt-4 text-center">{t("cancelAnytime")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<div className="min-h-screen pt-16 flex items-center justify-center text-gray-400">Loading...</div>}><CheckoutForm /></Suspense>;
}
