"use client";

import { useState } from "react";
import { Check, Crown, Zap, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PLANS, Plan } from "@/lib/plans";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const planIcons = {
  free: <Star size={22} className="text-gray-500" />,
  pro: <Zap size={22} className="text-[#00bcd4]" />,
  premium: <Crown size={22} className="text-[#7c3aed]" />,
};

const planGradients = {
  free: "border-gray-200",
  pro: "border-[#00bcd4] ring-2 ring-[#00bcd4]/20",
  premium: "border-[#7c3aed] ring-2 ring-[#7c3aed]/20",
};

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [yearly, setYearly] = useState(false);

  const featureRows = [
    [t("featureResumes"), "1", "5", "Unlimited"],
    [t("featureCoverLetters"), "1", "5", "Unlimited"],
    [t("featureTemplates"), "2 Free", "10 Pro", "All (14+)"],
    [t("featurePdf"), "✓", "✓", "✓"],
    [t("featureWord"), "✗", "✓", "✓"],
    [t("featureAI"), "✗", "✓", "✓"],
    [t("featureATS"), "✗", "✓", "✓"],
    [t("featureJobTracker"), "✗", "✓", "✓"],
    [t("featureLinkedIn"), "✗", "✗", "✓"],
    [t("featureReview"), "✗", "✗", "✓"],
    [t("featureSupport"), "✗", "✓", "✓"],
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{t("title")}</h1>
          <p className="text-gray-500 text-base">{t("subtitle")}</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={cn("text-sm font-semibold", !yearly ? "text-gray-900" : "text-gray-400")}>{t("monthly")}</span>
            <button onClick={() => setYearly((y) => !y)} className={cn("w-12 h-6 rounded-full transition-colors relative", yearly ? "bg-[#7c3aed]" : "bg-gray-300")}>
              <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform", yearly ? "translate-x-7" : "translate-x-1")} />
            </button>
            <span className={cn("text-sm font-semibold", yearly ? "text-gray-900" : "text-gray-400")}>
              {t("yearly")} <span className="ml-1.5 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{t("save33")}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan: Plan) => {
            const perMonth = yearly && plan.yearlyPrice > 0 ? Math.round(plan.yearlyPrice / 12) : plan.price;
            return (
              <div key={plan.id} className={cn("bg-white rounded-2xl border p-6 flex flex-col relative", planGradients[plan.id])}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#00bcd4] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{plan.badge}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">{planIcons[plan.id]}<h2 className="text-lg font-bold text-gray-900">{plan.name}</h2></div>
                <div className="mb-4">
                  {plan.price === 0 ? (
                    <div className="text-3xl font-bold text-gray-900">{t("free")}</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-gray-900">₹{perMonth.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 mb-1">{t("perMonth")}</span>
                    </div>
                  )}
                  {yearly && plan.yearlyPrice > 0 && <p className="text-xs text-gray-400 mt-1">{t("billedYearly", { price: plan.yearlyPrice.toLocaleString() })}</p>}
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700"><Check size={15} className="text-green-500 shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                {plan.price === 0 ? (
                  <Link href="/dashboard" className="block text-center border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold text-sm hover:border-gray-400 transition-colors">{t("currentPlan")}</Link>
                ) : (
                  <Link href={`/checkout?plan=${plan.id}&billing=${yearly ? "yearly" : "monthly"}`} className={cn("block text-center py-2.5 rounded-xl font-semibold text-sm text-white transition-colors", plan.id === "pro" ? "bg-[#00bcd4] hover:bg-[#00acc1]" : "bg-[#7c3aed] hover:bg-[#6d28d9]")}>
                    {t("getPlan", { name: plan.name })}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold text-gray-900">{t("featureComparison")}</h3></div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-gray-500 font-semibold">{t("feature")}</th>
                {PLANS.map((p) => <th key={p.id} className="text-center px-4 py-3 font-bold text-gray-700">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {featureRows.map(([feature, free, pro, premium]) => (
                <tr key={feature} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700 font-medium">{feature}</td>
                  {[free, pro, premium].map((val, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {val === "✓" ? <span className="text-green-500 font-bold">✓</span> : val === "✗" ? <span className="text-gray-300 font-bold">✗</span> : <span className="text-gray-700 text-xs font-medium">{val}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
