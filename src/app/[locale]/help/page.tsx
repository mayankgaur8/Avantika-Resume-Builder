"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, BookOpen, MessageCircle, Video } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function HelpPage() {
  const t = useTranslations("Help");
  const tc = useTranslations("Common");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
    { q: t("faq8Q"), a: t("faq8A") },
  ];

  const guides = [
    { icon: <BookOpen size={20} className="text-blue-500" />, bg: "bg-blue-50", title: t("guideTitle"), desc: tc("learnBasics"), href: "#" },
    { icon: <Video size={20} className="text-purple-500" />, bg: "bg-purple-50", title: t("videoTitle"), desc: tc("watchTutorials"), href: "#" },
    { icon: <MessageCircle size={20} className="text-green-500" />, bg: "bg-green-50", title: t("contactTitle"), desc: tc("chatSupport"), href: "/contact" },
  ];

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="bg-[#1a2332] py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-gray-400 mb-6">{t("subtitle")}</p>
          <div className="flex items-center bg-white rounded-xl px-4 gap-2">
            <Search size={16} className="text-gray-400" />
            <input className="flex-1 py-3 text-sm outline-none" placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {guides.map((g) => (
            <Link key={g.title} href={g.href} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${g.bg} rounded-xl flex items-center justify-center mb-3`}>{g.icon}</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">{g.title}</h3>
              <p className="text-xs text-gray-400">{g.desc}</p>
            </Link>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">{t("noResults", { search })}</p>
        ) : (
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50"><p className="pt-3">{faq.a}</p></div>}
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 bg-[#e0f7fa] border border-[#00bcd4]/20 rounded-2xl p-6 text-center">
          <h3 className="text-base font-bold text-gray-800 mb-1">{t("stillNeedHelp")}</h3>
          <p className="text-sm text-gray-500 mb-4">{t("supportAvailable")}</p>
          <Link href="/contact" className="inline-block bg-[#1a2332] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#243042] transition-colors">{t("contactSupport")}</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
