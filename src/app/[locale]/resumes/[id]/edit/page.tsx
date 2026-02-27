"use client";

import { useState, use } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  Plus,
  Trash2,
} from "lucide-react";
import { mockResumes } from "@/lib/mockData";
import { Resume, WorkExperience, Education, Skill } from "@/types/resume";
import { calculateStrength } from "@/lib/resumeStrength";
import ResumePreview from "@/components/ResumePreview";

type Section = "contact" | "summary" | "experience" | "education" | "skills";

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function ResumeEditPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = use(params);
  const t = useTranslations("ResumeBuilder");
  const found = mockResumes.find((r) => r.id === id) || mockResumes[0];
  const [resume, setResume] = useState<Resume>({ ...found });
  const [activeSection, setActiveSection] = useState<Section>("contact");

  const { score, sections: strengthSections } = calculateStrength(resume);

  const sections: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "contact", label: t("sectionContact"), icon: <User size={16} /> },
    { key: "summary", label: t("sectionSummary"), icon: <FileText size={16} /> },
    { key: "experience", label: t("sectionExperience"), icon: <Briefcase size={16} /> },
    { key: "education", label: t("sectionEducation"), icon: <GraduationCap size={16} /> },
    { key: "skills", label: t("sectionSkills"), icon: <Zap size={16} /> },
  ];

  const update = (key: keyof Resume, value: unknown) =>
    setResume((r) => ({ ...r, [key]: value }));

  const addExp = () => {
    const exp: WorkExperience = { id: uid(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" };
    update("experience", [...resume.experience, exp]);
  };
  const updateExp = (id: string, field: keyof WorkExperience, val: unknown) =>
    update("experience", resume.experience.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  const removeExp = (id: string) =>
    update("experience", resume.experience.filter((e) => e.id !== id));

  const addEdu = () => {
    const edu: Education = { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "" };
    update("education", [...resume.education, edu]);
  };
  const updateEdu = (id: string, field: keyof Education, val: unknown) =>
    update("education", resume.education.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  const removeEdu = (id: string) =>
    update("education", resume.education.filter((e) => e.id !== id));

  const addSkill = () => {
    const skill: Skill = { id: uid(), name: "", level: 3 };
    update("skills", [...resume.skills, skill]);
  };
  const updateSkill = (id: string, field: keyof Skill, val: unknown) =>
    update("skills", resume.skills.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  const removeSkill = (id: string) =>
    update("skills", resume.skills.filter((s) => s.id !== id));

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent";
  const lbl = "block text-xs font-semibold text-gray-500 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft size={16} /> {t("backToDashboard")}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-800">{resume.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {t("strength")} <span className="font-bold text-[#00bcd4]">{score}/100</span>
          </span>
          <button className="bg-[#1a2332] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#243042] transition-colors">
            {t("saveDownload")}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Section nav */}
        <nav className="w-52 shrink-0 bg-white border-r border-gray-200 py-4">
          {sections.map((s) => {
            const sec = strengthSections.find((x) => x.key === s.key);
            const done = sec?.complete;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === s.key
                    ? "bg-[#e0f7fa] text-[#00bcd4] border-r-2 border-[#00bcd4]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{s.icon}</span>
                <span className="flex-1 text-left">{s.label}</span>
                <span className={`w-2 h-2 rounded-full ${done ? "bg-green-400" : "bg-red-400"}`} />
              </button>
            );
          })}
        </nav>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-xl mx-auto space-y-5">

            {/* CONTACT */}
            {activeSection === "contact" && (
              <>
                <h2 className="text-lg font-bold text-gray-800">{t("contactTitle")}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(
                    [
                      ["fullName", t("fieldFullName")],
                      ["title", t("fieldTitle")],
                      ["email", t("fieldEmail")],
                      ["phone", t("fieldPhone")],
                      ["location", t("fieldLocation")],
                      ["website", t("fieldWebsite")],
                    ] as [keyof Resume["contact"], string][]
                  ).map(([field, fieldLabel]) => (
                    <div key={field} className={field === "location" || field === "website" ? "col-span-2" : ""}>
                      <label className={lbl}>{fieldLabel}</label>
                      <input
                        className={inp}
                        value={resume.contact[field] || ""}
                        onChange={(e) => update("contact", { ...resume.contact, [field]: e.target.value })}
                        placeholder={fieldLabel}
                        suppressHydrationWarning
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SUMMARY */}
            {activeSection === "summary" && (
              <>
                <h2 className="text-lg font-bold text-gray-800">{t("summaryTitle")}</h2>
                <p className="text-xs text-gray-400">{t("summaryHint")}</p>
                <textarea
                  className={`${inp} h-40 resize-none`}
                  value={resume.summary}
                  onChange={(e) => update("summary", e.target.value)}
                  placeholder="An experienced professional with..."
                />
                <p className="text-xs text-gray-400">
                  {resume.summary.length} {t("characters")}
                  {resume.summary.length < 50 && (
                    <span className="text-red-500 ml-1">{t("summaryMinChars")}</span>
                  )}
                </p>
              </>
            )}

            {/* EXPERIENCE */}
            {activeSection === "experience" && (
              <>
                <h2 className="text-lg font-bold text-gray-800">{t("experienceTitle")}</h2>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {exp.position || t("newPosition")}
                      </span>
                      <button onClick={() => removeExp(exp.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={lbl}>{t("fieldPosition")}</label>
                        <input className={inp} value={exp.position} onChange={(e) => updateExp(exp.id, "position", e.target.value)} placeholder="Senior Developer" />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldCompany")}</label>
                        <input className={inp} value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} placeholder="Acme Corp" />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldStartDate")}</label>
                        <input className={inp} type="month" value={exp.startDate} onChange={(e) => updateExp(exp.id, "startDate", e.target.value)} />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldEndDate")}</label>
                        <input className={inp} type="month" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExp(exp.id, "endDate", e.target.value)} />
                        <label className="flex items-center gap-1 mt-1 text-xs text-gray-500 cursor-pointer">
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExp(exp.id, "current", e.target.checked)} />
                          {t("currentlyWorking")}
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>{t("fieldDescription")}</label>
                      <textarea
                        className={`${inp} h-24 resize-none`}
                        value={exp.description}
                        onChange={(e) => updateExp(exp.id, "description", e.target.value)}
                        placeholder={t("descPlaceholder")}
                      />
                    </div>
                  </div>
                ))}
                <button onClick={addExp} className="flex items-center gap-2 text-[#00bcd4] text-sm font-semibold hover:underline">
                  <Plus size={16} /> {t("addExperience")}
                </button>
              </>
            )}

            {/* EDUCATION */}
            {activeSection === "education" && (
              <>
                <h2 className="text-lg font-bold text-gray-800">{t("educationTitle")}</h2>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        {edu.institution || t("newInstitution")}
                      </span>
                      <button onClick={() => removeEdu(edu.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className={lbl}>{t("fieldInstitution")}</label>
                        <input className={inp} value={edu.institution} onChange={(e) => updateEdu(edu.id, "institution", e.target.value)} placeholder="University of..." />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldDegree")}</label>
                        <input className={inp} value={edu.degree} onChange={(e) => updateEdu(edu.id, "degree", e.target.value)} placeholder="Bachelor of..." />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldField")}</label>
                        <input className={inp} value={edu.field} onChange={(e) => updateEdu(edu.id, "field", e.target.value)} placeholder="Computer Science" />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldStartDate")}</label>
                        <input className={inp} type="month" value={edu.startDate} onChange={(e) => updateEdu(edu.id, "startDate", e.target.value)} />
                      </div>
                      <div>
                        <label className={lbl}>{t("fieldEndDate")}</label>
                        <input className={inp} type="month" value={edu.endDate} onChange={(e) => updateEdu(edu.id, "endDate", e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addEdu} className="flex items-center gap-2 text-[#00bcd4] text-sm font-semibold hover:underline">
                  <Plus size={16} /> {t("addEducation")}
                </button>
              </>
            )}

            {/* SKILLS */}
            {activeSection === "skills" && (
              <>
                <h2 className="text-lg font-bold text-gray-800">{t("skillsTitle")}</h2>
                <div className="space-y-2">
                  {resume.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
                      <input
                        className="flex-1 text-sm border-none outline-none focus:ring-0 bg-transparent"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        placeholder={t("skillPlaceholder")}
                      />
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => updateSkill(skill.id, "level", lvl)}
                            className={`w-4 h-4 rounded-full border transition-colors ${
                              lvl <= skill.level ? "bg-[#1a2332] border-[#1a2332]" : "border-gray-300 hover:border-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                      <button onClick={() => removeSkill(skill.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addSkill} className="flex items-center gap-2 text-[#00bcd4] text-sm font-semibold hover:underline">
                  <Plus size={16} /> {t("addSkill")}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-[420px] shrink-0 bg-gray-200 overflow-y-auto p-4">
          <p className="text-xs text-center text-gray-400 mb-3 font-medium uppercase tracking-widest">
            {t("livePreview")}
          </p>
          <div className="shadow-xl">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
