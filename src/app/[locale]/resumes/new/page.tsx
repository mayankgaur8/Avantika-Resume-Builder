"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeft, Lock, Crown, Zap, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { TEMPLATES } from "@/lib/plans";
import { mockUser } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const planOrder = { free: 0, pro: 1, premium: 2 };

function isLocked(templatePlan: string, userPlan: string): boolean {
  return planOrder[templatePlan as keyof typeof planOrder] > planOrder[userPlan as keyof typeof planOrder];
}

function TemplateCard({ template, locked, selected, onSelect, upgradeLabel }: {
  template: (typeof TEMPLATES)[0]; locked: boolean; selected: boolean; onSelect: () => void; upgradeLabel: string;
}) {
  const planBadge = { free: null, pro: <span className="flex items-center gap-0.5 text-[#00838f]"><Zap size={8} /> Pro</span>, premium: <span className="flex items-center gap-0.5 text-[#7c3aed]"><Crown size={8} /> Premium</span> }[template.plan];
  return (
    <button onClick={locked ? () => {} : onSelect} className={cn("relative rounded-xl border-2 overflow-hidden text-left transition-all", selected && !locked ? "border-[#00bcd4] shadow-md" : "border-gray-200 hover:border-gray-300", locked ? "cursor-not-allowed opacity-70" : "cursor-pointer")}>
      <div className="w-full h-20 flex items-end p-2" style={{ backgroundColor: template.preview }}>
        <div className="space-y-0.5 w-full"><div className="h-1 bg-white/40 rounded w-3/4" /><div className="h-0.5 bg-white/30 rounded w-1/2" /><div className="h-0.5 bg-white/30 rounded w-2/3" /></div>
      </div>
      <div className="p-2 bg-white">
        <p className="text-xs font-bold text-gray-800">{template.name}</p>
        {planBadge && <p className="text-[9px] font-semibold mt-0.5 flex items-center gap-0.5">{planBadge}</p>}
      </div>
      {locked && (
        <div className="absolute inset-0 bg-gray-900/40 flex flex-col items-center justify-center gap-1">
          <Lock size={18} className="text-white" />
          <Link href="/pricing" onClick={(e) => e.stopPropagation()} className="text-[10px] text-white font-bold bg-[#7c3aed] px-2 py-0.5 rounded-full hover:bg-[#6d28d9]">{upgradeLabel}</Link>
        </div>
      )}
      {selected && !locked && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>
      )}
    </button>
  );
}

export default function NewResumePage() {
  const t = useTranslations("ResumeNew");
  const tc = useTranslations("Common");
  const router = useRouter();
  const [selected, setSelected] = useState("minimal");
  const [name, setName] = useState("");
  const userPlan = mockUser.plan;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/resumes" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ChevronLeft size={16} /> {t("backToResumes")}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("title")}</h1>
        <p className="text-gray-500 text-sm mb-8">{t("backToResumes")}</p>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t("resumeNameLabel")}</label>
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("resumeNamePlaceholder")} />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-700">{t("chooseTemplate")}</p>
            <Link href="/pricing" className="text-xs text-[#7c3aed] font-semibold hover:underline flex items-center gap-1"><Crown size={12} /> {t("unlockAll")}</Link>
          </div>

          <div className="mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t("freeTemplates")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TEMPLATES.filter((t) => t.plan === "free").map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} locked={isLocked(tmpl.plan, userPlan)} selected={selected === tmpl.id} onSelect={() => setSelected(tmpl.id)} upgradeLabel={tc("upgradeNow")} />
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("proTemplates")}</p>
              <span className="flex items-center gap-0.5 bg-cyan-100 text-[#00838f] text-xs font-bold px-2 py-0.5 rounded-full"><Zap size={10} /> Pro</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TEMPLATES.filter((t) => t.plan === "pro").map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} locked={isLocked(tmpl.plan, userPlan)} selected={selected === tmpl.id} onSelect={() => setSelected(tmpl.id)} upgradeLabel={tc("upgradeNow")} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("premiumTemplates")}</p>
              <span className="flex items-center gap-0.5 bg-purple-100 text-[#7c3aed] text-xs font-bold px-2 py-0.5 rounded-full"><Crown size={10} /> Premium</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TEMPLATES.filter((t) => t.plan === "premium").map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} locked={isLocked(tmpl.plan, userPlan)} selected={selected === tmpl.id} onSelect={() => setSelected(tmpl.id)} upgradeLabel={tc("upgradeNow")} />
              ))}
            </div>
          </div>
        </div>

        {userPlan === "free" && (
          <div className="mb-6 bg-gradient-to-r from-[#7c3aed]/10 to-[#00bcd4]/10 border border-[#7c3aed]/20 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-gray-800">{t("upgradeBannerTitle")}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("upgradeBannerDesc")}</p>
            </div>
            <Link href="/pricing" className="flex items-center gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#00bcd4] text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
              <Crown size={14} /> {tc("upgradeNow")}
            </Link>
          </div>
        )}

        <button onClick={() => router.push("/resumes/1/edit")} disabled={!name.trim()}
          className="w-full bg-[#1a2332] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#243042] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {t("createBtn", { template: TEMPLATES.find((tmpl) => tmpl.id === selected)?.name || "Minimal" })}
        </button>
      </div>
    </div>
  );
}
