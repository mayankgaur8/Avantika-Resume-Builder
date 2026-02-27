"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, MessageCircle, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactItems = [
    { icon: <Mail size={20} className="text-[#00bcd4]" />, bg: "bg-cyan-50", title: t("emailUs"), detail: t("emailDetail"), sub: t("emailSub") },
    { icon: <Phone size={20} className="text-green-500" />, bg: "bg-green-50", title: t("callUs"), detail: t("callDetail"), sub: t("callSub") },
    { icon: <MapPin size={20} className="text-orange-500" />, bg: "bg-orange-50", title: t("office"), detail: t("officeDetail"), sub: t("officeSub") },
    { icon: <Clock size={20} className="text-purple-500" />, bg: "bg-purple-50", title: t("hours"), detail: t("hoursDetail"), sub: t("hoursSub") },
  ];

  const topics = [t("topicBilling"), t("topicResume"), t("topicTemplate"), t("topicAccount"), t("topicFeature"), t("topicOther")];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const input = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]";
  const lbl = "block text-xs font-semibold text-gray-500 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-5xl mx-auto px-6 py-10 flex-1 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {contactItems.map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>{item.icon}</div>
                <div>
                  <p className="text-xs font-bold text-gray-500">{item.title}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.detail}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-green-500" /></div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{t("successTitle")}</h2>
                  <p className="text-gray-500 text-sm mb-6">{t("successMsg", { name: form.name, email: form.email })}</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="text-sm font-semibold text-[#00bcd4] hover:underline">{t("sendAnother")}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-base font-bold text-gray-800 mb-4">{t("formTitle")}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>{t("yourName")}</label><input className={input} placeholder={t("namePlaceholder")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                    <div><label className={lbl}>{t("emailAddress")}</label><input className={input} type="email" placeholder={t("emailPlaceholder")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                  </div>
                  <div>
                    <label className={lbl}>{t("subject")}</label>
                    <select className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required>
                      <option value="">{t("selectTopic")}</option>
                      {topics.map((topic) => <option key={topic}>{topic}</option>)}
                    </select>
                  </div>
                  <div><label className={lbl}>{t("message")}</label><textarea className={`${input} h-32 resize-none`} placeholder={t("messagePlaceholder")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></div>
                  <button type="submit" disabled={loading} className="w-full bg-[#1a2332] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#243042] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("sending")}</> : <><MessageCircle size={15} /> {t("sendMessage")}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
