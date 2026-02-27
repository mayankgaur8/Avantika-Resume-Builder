"use client";

import { useState } from "react";
import { Plus, Edit2, Download, Trash2, X, FileText, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockUser } from "@/lib/mockData";

type CoverLetter = { id: string; name: string; jobTitle: string; company: string; content: string };

function generateContent(name: string, jobTitle: string, company: string, experience: string): string {
  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${company}. ${experience}

I am particularly drawn to ${company} because of its reputation for innovation and excellence. I am confident that my background and passion make me an excellent fit for your team.

I would welcome the opportunity to discuss how my experience aligns with your needs. Thank you for your time and consideration.

Sincerely,
${name}`;
}

const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]";
const lbl = "block text-xs font-semibold text-gray-500 mb-1";

export default function CoverLettersPage() {
  const t = useTranslations("CoverLetters");
  const tc = useTranslations("Common");

  const [letters, setLetters] = useState<CoverLetter[]>(
    mockUser.coverLetters.map((cl) => ({
      ...cl,
      jobTitle: "Software Engineer",
      company: "Tech Corp",
      content: generateContent("Mayank Gaur", "Software Engineer", "Tech Corp", "With over 14 years of experience in full-stack development, I have consistently delivered high-quality software solutions."),
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "preview">("form");
  const [form, setForm] = useState({ name: "", jobTitle: "", company: "", yourName: "Mayank Gaur", experience: "" });
  const [generatedContent, setGeneratedContent] = useState("");
  const [editingContent, setEditingContent] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: "", jobTitle: "", company: "", yourName: "Mayank Gaur", experience: "" });
    setGeneratedContent("");
    setStep("form");
    setEditingContent(false);
    setShowModal(true);
  };

  const openEdit = (cl: CoverLetter) => {
    setEditingId(cl.id);
    setForm({ name: cl.name, jobTitle: cl.jobTitle, company: cl.company, yourName: cl.name.split("_")[0] || "Mayank Gaur", experience: "" });
    setGeneratedContent(cl.content);
    setStep("preview");
    setEditingContent(false);
    setShowModal(true);
  };

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneratedContent(generateContent(form.yourName, form.jobTitle, form.company, form.experience || `With extensive professional experience, I bring strong expertise relevant to the ${form.jobTitle} role.`));
    setStep("preview");
  };

  const handleSave = () => {
    if (editingId) {
      setLetters((prev) => prev.map((cl) => cl.id === editingId ? { ...cl, name: form.name || cl.name, jobTitle: form.jobTitle || cl.jobTitle, company: form.company || cl.company, content: generatedContent } : cl));
    } else {
      const newLetter: CoverLetter = {
        id: `cl${Date.now()}`,
        name: form.name || `${form.yourName.replace(" ", "_")}_${form.company}_Letter`,
        jobTitle: form.jobTitle,
        company: form.company,
        content: generatedContent,
      };
      setLetters((prev) => [...prev, newLetter]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(t("deleteConfirm"))) setLetters((prev) => prev.filter((cl) => cl.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <button onClick={openCreate} className="flex items-center gap-2 bg-[#1a2332] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#243042] transition-colors">
            <Plus size={16} /> {t("createNew")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((cl) => (
            <div key={cl.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="h-40 bg-gray-50 rounded-xl border border-gray-200 mb-4 p-4 text-xs text-gray-400 overflow-hidden leading-relaxed">
                <p className="font-semibold text-gray-600 mb-2">{cl.name}</p>
                <p className="whitespace-pre-line line-clamp-6">{cl.content}</p>
              </div>
              <h2 className="text-sm font-bold text-gray-800 mb-1">{cl.name}</h2>
              <p className="text-xs text-gray-400 mb-3">{cl.jobTitle} · {cl.company}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(cl)} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  <Edit2 size={13} /> {tc("edit")}
                </button>
                <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  <Download size={13} />
                </button>
                <button onClick={() => handleDelete(cl.id)} className="flex items-center justify-center gap-1.5 border border-red-100 rounded-lg py-2 px-3 text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          <button onClick={openCreate} className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-gray-400 hover:border-[#00bcd4] hover:text-[#00bcd4] transition-colors min-h-[250px]">
            <Plus size={32} className="mb-2" />
            <span className="text-sm font-semibold">{t("createCoverLetter")}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {step === "preview" && !editingId && (
                  <button onClick={() => setStep("form")} className="text-gray-400 hover:text-gray-600">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="w-8 h-8 bg-[#e0f7fa] rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-[#00bcd4]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{t("modalTitle")}</h2>
                  <p className="text-xs text-gray-400">{t("modalSubtitle")}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Step 1: Form */}
              {step === "form" && (
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={lbl}>{t("fieldLetterName")}</label>
                      <input className={inp} placeholder={t("fieldLetterNamePlaceholder")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className={lbl}>{t("fieldYourName")} *</label>
                      <input className={inp} placeholder={t("fieldYourNamePlaceholder")} value={form.yourName} onChange={(e) => setForm({ ...form, yourName: e.target.value })} required />
                    </div>
                    <div>
                      <label className={lbl}>{t("fieldJobTitle")} *</label>
                      <input className={inp} placeholder={t("fieldJobTitlePlaceholder")} value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} required />
                    </div>
                    <div className="col-span-2">
                      <label className={lbl}>{t("fieldCompany")} *</label>
                      <input className={inp} placeholder={t("fieldCompanyPlaceholder")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                    </div>
                    <div className="col-span-2">
                      <label className={lbl}>{t("fieldExperience")}</label>
                      <textarea className={`${inp} h-28 resize-none`} placeholder={t("fieldExperiencePlaceholder")} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                      {t("cancelBtn")}
                    </button>
                    <button type="submit" className="flex-1 bg-[#1a2332] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#243042] transition-colors">
                      {t("generateBtn")}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Preview & Edit */}
              {step === "preview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-700">{t("editContent")}</h3>
                    <button onClick={() => setEditingContent((v) => !v)} className="text-xs text-[#00bcd4] font-semibold hover:underline flex items-center gap-1">
                      <Edit2 size={12} /> {editingContent ? tc("save") : tc("edit")}
                    </button>
                  </div>

                  {editingContent ? (
                    <textarea
                      className={`${inp} h-72 resize-none font-mono text-xs leading-relaxed`}
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 whitespace-pre-line leading-relaxed h-72 overflow-y-auto font-serif">
                      {generatedContent}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                      {t("cancelBtn")}
                    </button>
                    <button onClick={handleSave} className="flex-1 bg-[#1a2332] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#243042] transition-colors">
                      {t("saveBtn")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
