"use client";

import { useState } from "react";
import { Copy, Share2, Check, MapPin, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockUser, mockResumes } from "@/lib/mockData";

const BG_PHOTOS = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80",
];

const DESIGNS = ["Professional - Light Mode", "Modern - Dark Mode", "Minimal - Clean"];

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const resume = mockResumes[0];
  const [copied, setCopied] = useState(false);
  const [bgPhoto, setBgPhoto] = useState(0);
  const [design, setDesign] = useState(0);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showDesignPicker, setShowDesignPicker] = useState(false);
  const [updated, setUpdated] = useState(false);

  const profileUrl = `https://bold.pro/my/${resume.contact.fullName.toLowerCase().replace(" ", "-")}-231209021552`;

  // Derive completion from actual resume data
  const hasContact = !!(resume.contact.fullName && resume.contact.email && resume.contact.phone);
  const hasSummary = resume.summary.trim().length >= 50;
  const hasEducation = resume.education.length > 0;
  const hasExperience = resume.experience.length > 0;
  const hasSkills = resume.skills.length > 0;
  const hasOverview = hasContact && hasSummary && hasExperience; // overview auto-completes from other data

  const coreSections = [
    { key: "contactInfo", label: t("sectionContactInfo"), done: hasContact, href: "/resumes/1/edit" },
    { key: "summary", label: t("sectionSummary"), done: hasSummary, href: "/resumes/1/edit" },
    { key: "education", label: t("sectionEducation"), done: hasEducation, href: "/resumes/1/edit" },
    { key: "workHistory", label: t("sectionWorkHistory"), done: hasExperience, href: "/resumes/1/edit" },
    { key: "skills", label: t("sectionSkills"), done: hasSkills, href: "/resumes/1/edit" },
    { key: "overview", label: t("sectionOverview"), done: hasOverview, href: "/resumes/1/edit" },
  ];
  const recommendedSections = [
    { key: "photo", label: t("sectionProfilePhoto"), done: false, href: "/settings" },
    { key: "cert", label: t("sectionCertification"), done: false, href: "/resumes/1/edit" },
    { key: "accomplishments", label: t("sectionAccomplishments"), done: false, href: "/resumes/1/edit" },
    { key: "availability", label: t("sectionWorkAvailability"), done: false, href: "/settings" },
    { key: "timeline", label: t("sectionTimeline"), done: false, href: "/resumes/1/edit" },
  ];
  const additionalSections = [
    { key: "affiliations", label: t("sectionAffiliations"), done: false, href: "/resumes/1/edit" },
    { key: "preference", label: t("sectionWorkPreference"), done: false, href: "/settings" },
    { key: "quote", label: t("sectionQuote"), done: false, href: "/resumes/1/edit" },
    { key: "software", label: t("sectionSoftware"), done: false, href: "/resumes/1/edit" },
    { key: "languages", label: t("sectionLanguages"), done: false, href: "/resumes/1/edit" },
    { key: "interests", label: t("sectionInterests"), done: false, href: "/resumes/1/edit" },
    { key: "references", label: t("sectionReferences"), done: false, href: "/resumes/1/edit" },
  ];

  const coreDone = coreSections.filter((s) => s.done).length;
  const recDone = recommendedSections.filter((s) => s.done).length;
  const addDone = additionalSections.filter((s) => s.done).length;
  const totalScore = coreDone * 10 + recDone * 5 + addDone * 3;
  const strengthLabel = totalScore >= 70 ? t("strengthFantastic") : totalScore >= 50 ? t("strengthGood") : t("strengthFair");
  const strengthPct = Math.min(100, totalScore);

  const handleCopy = () => {
    navigator.clipboard?.writeText(profileUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  const yearsExp = new Date().getFullYear() - 2010;
  const yearsEdu = 4;

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-24">
      {/* Page title */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("title")}</h1>
        <div className="flex items-center gap-2">
          <a href={profileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-xs">{profileUrl}</a>
          <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 transition-colors"><Share2 size={14} /></button>
        </div>
      </div>

      <div className="flex gap-0 max-w-none">
        {/* LEFT SIDEBAR */}
        <aside className="w-72 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-10rem)] py-6 px-5 space-y-6">

          {/* Profile Status */}
          <div>
            <p className="text-xs font-bold text-gray-500 tracking-widest mb-3">{t("profileStatus")}</p>
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

          {/* My Profile */}
          <div>
            <p className="text-xs font-bold text-gray-500 tracking-widest mb-3">{t("myProfile")}</p>

            {/* Profile Strength */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">{t("profileStrength")}</p>
              <p className="text-base font-bold text-gray-800 mb-2">{strengthLabel}</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: `${strengthPct}%` }} />
              </div>
            </div>

            {/* Core */}
            <SectionGroup label={t("core")} count={coreDone} total={coreSections.length} sections={coreSections} />
            <div className="my-3" />
            {/* Recommended */}
            <SectionGroup label={t("recommended")} count={recDone} total={recommendedSections.length} sections={recommendedSections} />
            <div className="my-3" />
            {/* Additional */}
            <SectionGroup label={t("additional")} count={addDone} total={additionalSections.length} sections={additionalSections} />
          </div>
        </aside>

        {/* PROFILE PREVIEW */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Background photo */}
            <div className="relative h-52 bg-gray-300 overflow-hidden">
              <img
                src={BG_PHOTOS[bgPhoto]}
                alt="profile background"
                className="w-full h-full object-cover"
              />
              {/* Avatar */}
              <div className="absolute left-8 -bottom-10">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-[#1a2332] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {mockUser.avatar}
                </div>
              </div>
            </div>

            {/* Name / title row */}
            <div className="pt-14 px-8 pb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide uppercase">{resume.contact.fullName}</h2>
                <div className="flex items-center gap-4 mt-1.5 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Briefcase size={13} /> {resume.contact.title}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {resume.contact.location?.split(",")[0]}</span>
                </div>
              </div>
              <button className="bg-[#e05e4b] hover:bg-[#c94e3b] text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
                {t("contactMe")}
              </button>
            </div>

            <div className="px-8 pb-8 space-y-8">
              {/* Summary */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><span className="text-gray-500" style={{ fontSize: 10 }}>👤</span></div>
                  <h3 className="text-sm font-bold text-gray-500 tracking-widest">{t("sectionSummaryLabel")}</h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
                </div>
              </div>

              {/* Overview stats */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><span className="text-gray-500" style={{ fontSize: 10 }}>📋</span></div>
                  <h3 className="text-sm font-bold text-gray-500 tracking-widest">{t("sectionOverviewLabel")}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <StatCard value={yearsExp} label={t("yearsExperience")} />
                  <StatCard value={yearsEdu} label={t("yearsEducation")} />
                  <StatCard value={1} label={t("certifications")} />
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-bold text-gray-500 tracking-widest uppercase">{t("topSkills")}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((s) => (
                    <span key={s.id} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-semibold">{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* BOTTOM TOOLBAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a2332] text-white flex items-center gap-4 px-8 py-3 z-40">
        {/* Design */}
        <div className="relative">
          <button onClick={() => { setShowDesignPicker((v) => !v); setShowBgPicker(false); }} className="flex items-center gap-2 text-sm font-bold">
            <span className="text-gray-400 text-xs tracking-widest">{t("designLabel")}</span>
            <span className="text-white">{DESIGNS[design]} ▾</span>
          </button>
          {showDesignPicker && (
            <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[220px] z-50">
              {DESIGNS.map((d, i) => (
                <button key={d} onClick={() => { setDesign(i); setShowDesignPicker(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${design === i ? "font-bold text-[#00bcd4]" : "text-gray-700"}`}>{d}</button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-600" />

        {/* Background Photo */}
        <div className="relative">
          <button onClick={() => { setShowBgPicker((v) => !v); setShowDesignPicker(false); }} className="flex items-center gap-2 text-sm font-bold">
            <span className="text-gray-400 text-xs tracking-widest">{t("bgPhotoLabel")}</span>
            <img src={BG_PHOTOS[bgPhoto]} alt="bg" className="w-8 h-5 object-cover rounded" />
            <span>▾</span>
          </button>
          {showBgPicker && (
            <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex gap-2 z-50">
              {BG_PHOTOS.map((url, i) => (
                <button key={i} onClick={() => { setBgPhoto(i); setShowBgPicker(false); }} className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${bgPhoto === i ? "border-[#00bcd4]" : "border-transparent"}`}>
                  <img src={url} alt="bg option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1" />

        <button className="bg-white text-gray-800 font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors">
          {t("previewBtn")}
        </button>
        <button onClick={handleUpdate} className={`font-bold px-6 py-2 rounded-full text-sm transition-colors ${updated ? "bg-green-500 text-white" : "bg-[#f5a623] hover:bg-[#e09510] text-white"}`}>
          {updated ? "✓ Updated!" : t("updateBtn")}
        </button>
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
      <div className="space-y-1">
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

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
      <div className="absolute right-3 top-3 opacity-10 text-blue-300">
        <span className="text-6xl font-black leading-none">{value}</span>
      </div>
      <span className="text-4xl font-black text-blue-500 relative z-10">{value}</span>
      <p className="text-xs font-bold text-gray-500 mt-2 leading-tight">{label}</p>
    </div>
  );
}
