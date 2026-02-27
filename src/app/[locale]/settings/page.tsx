"use client";

import { useState, useRef, useEffect } from "react";
import { User, Bell, Lock, CreditCard, Trash2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockUser } from "@/lib/mockData";
import Footer from "@/components/Footer";

type Tab = "profile" | "notifications" | "security" | "billing";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("avatarPhoto");
    if (saved) setPhotoPreview(saved);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem("avatarPhoto", dataUrl);
      setPhotoPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { key: "profile" as Tab, label: t("tabProfile"), icon: <User size={16} /> },
    { key: "notifications" as Tab, label: t("tabNotifications"), icon: <Bell size={16} /> },
    { key: "security" as Tab, label: t("tabSecurity"), icon: <Lock size={16} /> },
    { key: "billing" as Tab, label: t("tabBilling"), icon: <CreditCard size={16} /> },
  ];

  const notifications = [
    { key: "jobRec", label: t("notifJobRec"), desc: t("notifJobRecDesc") },
    { key: "profileAlert", label: t("notifProfileAlert"), desc: t("notifProfileAlertDesc") },
    { key: "weekly", label: t("notifWeekly"), desc: t("notifWeeklyDesc") },
    { key: "productUpdates", label: t("notifProductUpdates"), desc: t("notifProductUpdatesDesc") },
    { key: "promo", label: t("notifPromo"), desc: t("notifPromoDesc") },
  ];

  const input = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]";
  const lbl = "block text-xs font-semibold text-gray-500 mb-1";

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-8 flex-1 w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("title")}</h1>
        <div className="flex gap-6">
          <nav className="w-48 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-2">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-[#e0f7fa] text-[#00bcd4] border-r-2 border-[#00bcd4]" : "text-gray-600 hover:bg-gray-50"}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </nav>
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {activeTab === "profile" && (
                <div className="space-y-5">
                  <h2 className="text-base font-bold text-gray-800">{t("profileInfo")}</h2>
                  <div className="flex items-center gap-4">
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    {photoPreview ? (
                      <img src={photoPreview} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#1a2332] text-white text-xl font-bold flex items-center justify-center">{mockUser.avatar}</div>
                    )}
                    <button onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-[#00bcd4] hover:underline">{t("changePhoto")}</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>{t("firstName")}</label><input className={input} defaultValue="Mayank" suppressHydrationWarning /></div>
                    <div><label className={lbl}>{t("lastName")}</label><input className={input} defaultValue="Gaur" suppressHydrationWarning /></div>
                    <div className="col-span-2"><label className={lbl}>{t("emailAddress")}</label><input className={input} type="email" defaultValue={mockUser.email} suppressHydrationWarning /></div>
                    <div className="col-span-2"><label className={lbl}>{t("phoneNumber")}</label><input className={input} defaultValue="+91 9425491136" suppressHydrationWarning /></div>
                    <div className="col-span-2"><label className={lbl}>{t("location")}</label><input className={input} defaultValue="Bengaluru, India" suppressHydrationWarning /></div>
                  </div>
                </div>
              )}
              {activeTab === "notifications" && (
                <div className="space-y-5">
                  <h2 className="text-base font-bold text-gray-800">{t("notificationPrefs")}</h2>
                  {notifications.map((n) => (
                    <div key={n.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div><p className="text-sm font-semibold text-gray-800">{n.label}</p><p className="text-xs text-gray-400 mt-0.5">{n.desc}</p></div>
                      <div className="w-10 h-6 bg-[#00bcd4] rounded-full flex items-center justify-end px-1 cursor-pointer shrink-0"><div className="w-4 h-4 bg-white rounded-full shadow" /></div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "security" && (
                <div className="space-y-5">
                  <h2 className="text-base font-bold text-gray-800">{t("securityTitle")}</h2>
                  <div><label className={lbl}>{t("currentPassword")}</label><input className={input} type="password" placeholder="••••••••" suppressHydrationWarning /></div>
                  <div><label className={lbl}>{t("newPassword")}</label><input className={input} type="password" placeholder="••••••••" suppressHydrationWarning /></div>
                  <div><label className={lbl}>{t("confirmPassword")}</label><input className={input} type="password" placeholder="••••••••" suppressHydrationWarning /></div>
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">{t("dangerZone")}</h3>
                    <button className="flex items-center gap-2 text-red-500 border border-red-200 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-red-50 transition-colors">
                      <Trash2 size={15} /> {t("deleteAccount")}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "billing" && (
                <div className="space-y-5">
                  <h2 className="text-base font-bold text-gray-800">{t("billingTitle")}</h2>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t("currentPlan", { plan: mockUser.plan })}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{mockUser.plan === "free" ? t("upgradePlan") : t("activeSubscription")}</p>
                    </div>
                    <a href="/pricing" className="bg-[#1a2332] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#243042] transition-colors">
                      {mockUser.plan === "free" ? t("upgrade") : t("manage")}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-3">{t("paymentMethods")}</h3>
                    <p className="text-sm text-gray-400">{t("noPaymentMethods")}</p>
                    <button className="mt-3 flex items-center gap-2 text-[#00bcd4] text-sm font-semibold hover:underline">
                      <CreditCard size={14} /> {t("addPaymentMethod")}
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                <button onClick={handleSave} className="flex items-center gap-2 bg-[#1a2332] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#243042] transition-colors">
                  <Save size={15} /> {saved ? t("saved") : t("saveChanges")}
                </button>
                {saved && <span className="text-sm text-green-500 font-medium">{t("savedSuccess")}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
