"use client";

import { useState } from "react";
import { Copy, Share2, Check, MapPin, Briefcase, RefreshCw, BarChart2, EyeOff, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockUser, mockResumes } from "@/lib/mockData";

const BG_PHOTOS = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80",
];

const TEMPLATES = [
  { id: 0, name: "Professional", accent: "#e05e4b", preview: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=200&q=60" },
  { id: 1, name: "Minimal",      accent: "#1a2332", preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&q=60" },
  { id: 2, name: "Bold",         accent: "#7c3aed", preview: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=200&q=60" },
  { id: 3, name: "Elegant",      accent: "#00bcd4", preview: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&q=60" },
];

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const resume = mockResumes[0];

  const [copied, setCopied]               = useState(false);
  const [bgPhoto, setBgPhoto]             = useState(0);
  const [template, setTemplate]           = useState(0);
  const [darkMode, setDarkMode]           = useState(false);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [showBgPicker, setShowBgPicker]   = useState(false);
  const [updated, setUpdated]             = useState(false);
  const [published, setPublished]         = useState(true);

  const profileUrl = `https://bold.pro/my/${resume.contact.fullName.toLowerCase().replace(" ", "-")}-231209021552`;

  // Derive completion from actual resume data
  const hasContact  = !!(resume.contact.fullName && resume.contact.email && resume.contact.phone);
  const hasSummary  = resume.summary.trim().length >= 50;
  const hasEducation  = resume.education.length > 0;
  const hasExperience = resume.experience.length > 0;
  const hasSkills   = resume.skills.length > 0;
  const hasOverview = hasContact && hasSummary && hasExperience;

  const coreSections = [
    { key: "contactInfo", label: t("sectionContactInfo"),  done: hasContact,   href: "/resumes/1/edit" },
    { key: "summary",     label: t("sectionSummary"),      done: hasSummary,   href: "/resumes/1/edit" },
    { key: "education",   label: t("sectionEducation"),    done: hasEducation, href: "/resumes/1/edit" },
    { key: "workHistory", label: t("sectionWorkHistory"),  done: hasExperience,href: "/resumes/1/edit" },
    { key: "skills",      label: t("sectionSkills"),       done: hasSkills,    href: "/resumes/1/edit" },
    { key: "overview",    label: t("sectionOverview"),     done: hasOverview,  href: "/resumes/1/edit" },
  ];
  const recommendedSections = [
    { key: "photo",           label: t("sectionProfilePhoto"),    done: false, href: "/settings" },
    { key: "cert",            label: t("sectionCertification"),   done: false, href: "/resumes/1/edit" },
    { key: "accomplishments", label: t("sectionAccomplishments"), done: false, href: "/resumes/1/edit" },
    { key: "availability",    label: t("sectionWorkAvailability"),done: false, href: "/settings" },
    { key: "timeline",        label: t("sectionTimeline"),        done: false, href: "/resumes/1/edit" },
  ];
  const additionalSections = [
    { key: "affiliations", label: t("sectionAffiliations"),  done: false, href: "/resumes/1/edit" },
    { key: "preference",   label: t("sectionWorkPreference"),done: false, href: "/settings" },
    { key: "quote",        label: t("sectionQuote"),         done: false, href: "/resumes/1/edit" },
    { key: "software",     label: t("sectionSoftware"),      done: false, href: "/resumes/1/edit" },
    { key: "languages",    label: t("sectionLanguages"),     done: false, href: "/resumes/1/edit" },
    { key: "interests",    label: t("sectionInterests"),     done: false, href: "/resumes/1/edit" },
    { key: "references",   label: t("sectionReferences"),    done: false, href: "/resumes/1/edit" },
  ];

  const coreDone  = coreSections.filter((s) => s.done).length;
  const recDone   = recommendedSections.filter((s) => s.done).length;
  const addDone   = additionalSections.filter((s) => s.done).length;
  const totalScore = coreDone * 10 + recDone * 5 + addDone * 3;
  const strengthLabel = totalScore >= 70 ? t("strengthFantastic") : totalScore >= 50 ? t("strengthGood") : t("strengthFair");
  const strengthPct   = Math.min(100, totalScore);

  const handleCopy = () => {
    navigator.clipboard?.writeText(profileUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleUpdate = () => { setUpdated(true); setTimeout(() => setUpdated(false), 2500); };
  const handleUnpublish = () => { if (confirm(t("unpublishConfirm"))) setPublished((p) => !p); };

  const yearsExp = new Date().getFullYear() - 2010;
  const accent = TEMPLATES[template].accent;

  // Dark mode colours for the preview card
  const cardBg   = darkMode ? "#1a2332" : "#ffffff";
  const cardText = darkMode ? "#f1f5f9" : "#111827";
  const cardSub  = darkMode ? "#94a3b8" : "#6b7280";
  const cardSection = darkMode ? "#0f172a" : "#f9fafb";

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-24">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("title")}</h1>
        <div className="flex items-center gap-2">
          <a href={profileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-xs">{profileUrl}</a>
          <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"><Share2 size={14} /></button>
          {!published && <span className="ml-2 text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">Unpublished</span>}
        </div>
      </div>

      <div className="flex max-w-none">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-72 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-10rem)] py-6 px-5 space-y-5 overflow-y-auto">

          {/* Profile Status */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">{t("profileStatus")}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("totalVisitors")}</span>
                <a href="#" className="text-blue-600 font-semibold hover:underline">{mockUser.profileVisitors} {t("visitors")}</a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("topLocation")}</span>
                <a href="#" className="text-blue-600 font-semibold hover:underline">IN</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Profile Actions */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">{t("profileActions")}</p>
            <div className="space-y-1">
              {[
                { icon: <FileText size={15} />, label: t("convertToResume"), onClick: () => {} },
                { icon: <RefreshCw size={15} />, label: t("syncWithResume"), onClick: () => {} },
                { icon: <BarChart2 size={15} />, label: t("viewAnalytics"), onClick: () => {} },
                { icon: <Share2 size={15} />, label: t("shareProfile"), onClick: handleCopy },
                { icon: <EyeOff size={15} />, label: t("unpublishProfile"), onClick: handleUnpublish, danger: true },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    (action as { danger?: boolean }).danger
                      ? "text-red-500 hover:bg-red-50"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* My Profile */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">{t("myProfile")}</p>
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">{t("profileStrength")}</p>
              <p className="text-base font-bold text-gray-800 mb-2">{strengthLabel}</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: `${strengthPct}%` }} />
              </div>
            </div>
            <SectionGroup label={t("core")}        count={coreDone} total={coreSections.length}        sections={coreSections} />
            <div className="my-3" />
            <SectionGroup label={t("recommended")} count={recDone}  total={recommendedSections.length} sections={recommendedSections} />
            <div className="my-3" />
            <SectionGroup label={t("additional")}  count={addDone}  total={additionalSections.length}  sections={additionalSections} />
          </div>
        </aside>

        {/* ── PROFILE PREVIEW ── */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden transition-colors duration-300" style={{ backgroundColor: cardBg }}>
            {/* Background photo */}
            <div className="relative h-52 overflow-hidden">
              <img src={BG_PHOTOS[bgPhoto]} alt="bg" className="w-full h-full object-cover" />
              <div className="absolute left-8 -bottom-10">
                <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg" style={{ backgroundColor: accent }}>
                  {mockUser.avatar}
                </div>
              </div>
            </div>

            {/* Name row */}
            <div className="pt-14 px-8 pb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-wide uppercase" style={{ color: cardText }}>{resume.contact.fullName}</h2>
                <div className="flex items-center gap-4 mt-1.5 text-sm" style={{ color: cardSub }}>
                  <span className="flex items-center gap-1"><Briefcase size={13} /> {resume.contact.title}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {resume.contact.location?.split(",")[0]}</span>
                </div>
              </div>
              <button className="text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors" style={{ backgroundColor: accent }}>
                {t("contactMe")}
              </button>
            </div>

            <div className="px-8 pb-8 space-y-8">
              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold tracking-widest mb-3 flex items-center gap-2" style={{ color: cardSub }}>
                  <span>👤</span> {t("sectionSummaryLabel")}
                </h3>
                <div className="rounded-xl p-5" style={{ backgroundColor: cardSection }}>
                  <p className="text-sm leading-relaxed" style={{ color: cardText }}>{resume.summary}</p>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xs font-bold tracking-widest mb-3 flex items-center gap-2" style={{ color: cardSub }}>
                  <span>📋</span> {t("sectionOverviewLabel")}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: yearsExp, lbl: t("yearsExperience") },
                    { val: 4,        lbl: t("yearsEducation") },
                    { val: 1,        lbl: t("certifications") },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="rounded-xl p-4 relative overflow-hidden" style={{ backgroundColor: cardSection }}>
                      <span className="absolute right-3 top-2 text-5xl font-black opacity-10" style={{ color: accent }}>{val}</span>
                      <span className="text-4xl font-black relative z-10" style={{ color: accent }}>{val}</span>
                      <p className="text-xs font-bold mt-2 leading-tight" style={{ color: cardSub }}>{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: cardSub }}>{t("topSkills")}</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((s) => (
                    <span key={s.id} className="text-xs px-3 py-1.5 rounded-full font-semibold border" style={{ borderColor: accent, color: accent }}>{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── BOTTOM TOOLBAR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a2332] text-white z-40">
        {/* Design panel (slides up) */}
        {showDesignPanel && (
          <div className="border-t border-gray-700 px-8 py-5 bg-[#0f1d2e]">
            <div className="flex gap-10">
              {/* Mode toggle */}
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">{t("modeLabel")}</p>
                <div className="space-y-2">
                  {[false, true].map((isDark) => (
                    <label key={String(isDark)} onClick={() => setDarkMode(isDark)} className="flex items-center gap-2 cursor-pointer">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${darkMode === isDark ? "border-[#00bcd4] bg-[#00bcd4]" : "border-gray-500"}`}>
                        {darkMode === isDark && <span className="w-2 h-2 rounded-full bg-white block" />}
                      </span>
                      <span className={`text-sm font-medium ${darkMode === isDark ? "text-white" : "text-gray-400"}`}>
                        {isDark ? t("modeDark") : t("modeLight")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Template cards */}
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">{t("designTemplates")}</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setTemplate(tmpl.id)}
                      className={`relative shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all ${template === tmpl.id ? "border-[#00bcd4] shadow-[0_0_0_2px_rgba(0,188,212,0.4)]" : "border-gray-600 hover:border-gray-400"}`}
                    >
                      <img src={tmpl.preview} alt={tmpl.name} className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                        <span className="text-white text-[10px] font-bold">{tmpl.name}</span>
                      </div>
                      {template === tmpl.id && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Background photo picker inside panel */}
                  <div className="shrink-0">
                    <p className="text-[10px] text-gray-400 font-bold mb-1.5">{t("bgPhotoLabel")}</p>
                    <div className="flex gap-2">
                      {BG_PHOTOS.map((url, i) => (
                        <button key={i} onClick={() => setBgPhoto(i)} className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${bgPhoto === i ? "border-[#00bcd4]" : "border-transparent hover:border-gray-400"}`}>
                          <img src={url} alt="bg" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar row */}
        <div className="flex items-center gap-4 px-8 py-3">
          <button
            onClick={() => { setShowDesignPanel((v) => !v); setShowBgPicker(false); }}
            className="flex items-center gap-2 text-sm font-bold hover:text-[#00bcd4] transition-colors"
          >
            <span className="text-gray-400 text-xs tracking-widest">{t("designLabel")}</span>
            <span className="text-white">{TEMPLATES[template].name} · {darkMode ? t("modeDark") : t("modeLight")} {showDesignPanel ? "▴" : "▾"}</span>
          </button>

          <div className="w-px h-6 bg-gray-600" />

          <button
            onClick={() => setShowBgPicker((v) => !v)}
            className="flex items-center gap-2 text-sm font-bold hover:text-[#00bcd4] transition-colors"
          >
            <span className="text-gray-400 text-xs tracking-widest">{t("bgPhotoLabel")}</span>
            <img src={BG_PHOTOS[bgPhoto]} alt="bg" className="w-8 h-5 object-cover rounded" />
            <span>{showBgPicker ? "▴" : "▾"}</span>
          </button>

          {/* Inline bg picker (when panel is closed) */}
          {showBgPicker && !showDesignPanel && (
            <div className="absolute bottom-14 left-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex gap-2 z-50">
              {BG_PHOTOS.map((url, i) => (
                <button key={i} onClick={() => { setBgPhoto(i); setShowBgPicker(false); }} className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${bgPhoto === i ? "border-[#00bcd4]" : "border-transparent"}`}>
                  <img src={url} alt="bg option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="flex-1" />

          <button className="bg-white text-gray-800 font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors">
            {t("previewBtn")}
          </button>
          <button
            onClick={handleUpdate}
            className={`font-bold px-6 py-2 rounded-full text-sm transition-colors ${updated ? "bg-green-500 text-white" : "bg-[#f5a623] hover:bg-[#e09510] text-white"}`}
          >
            {updated ? "✓ Updated!" : t("updateBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionGroup({ label, count, total, sections }: {
  label: string; count: number; total: number;
  sections: { key: string; label: string; done: boolean; href: string }[]
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-700">{label}</span>
        <span className="text-xs text-gray-400 font-semibold">{count}/{total}</span>
      </div>
      <div className="space-y-0.5">
        {sections.map((s) => (
          <a key={s.key} href={s.href} className="w-full flex items-center gap-2 py-1 text-left group">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${s.done ? "bg-[#1a2332] border-[#1a2332]" : "border-gray-300 group-hover:border-[#00bcd4]"}`}>
              {s.done && <Check size={11} className="text-white" />}
            </span>
            <span className={`text-sm transition-colors ${s.done ? "text-blue-600 group-hover:underline" : "text-gray-400 group-hover:text-[#00bcd4]"}`}>
              {s.label}
            </span>
            {!s.done && <span className="ml-auto text-[10px] text-gray-300 group-hover:text-[#00bcd4] font-bold">+ Add</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
