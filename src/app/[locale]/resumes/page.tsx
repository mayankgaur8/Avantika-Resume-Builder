"use client";

import { Link } from "@/i18n/navigation";
import { Edit, Download, Trash2, Plus, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockResumes } from "@/lib/mockData";
import { calculateStrength } from "@/lib/resumeStrength";
import ResumeThumbnail from "@/components/ResumeThumbnail";

export default function ResumesPage() {
  const t = useTranslations("Resumes");
  const tc = useTranslations("Common");

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <Link href="/resumes/new" className="flex items-center gap-2 bg-[#1a2332] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#243042] transition-colors">
            <Plus size={16} /> {t("createNew")}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResumes.map((resume) => {
            const { score } = calculateStrength(resume);
            const scoreColor = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-[#00bcd4]" : "bg-orange-500";
            return (
              <div key={resume.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                  <ResumeThumbnail resume={resume} />
                </div>
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-sm font-bold text-gray-800 leading-snug">{resume.name}</h2>
                  <span className={`${scoreColor} text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2 shrink-0`}>{score}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{t("updated", { date: resume.updatedAt })}</p>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/resumes/${resume.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    <Edit size={13} /> {tc("edit")}
                  </Link>
                  <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"><Copy size={13} /></button>
                  <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"><Download size={13} /></button>
                  <button className="flex items-center justify-center gap-1.5 border border-red-100 rounded-lg py-2 px-3 text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
          <Link href="/resumes/new" className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-gray-400 hover:border-[#00bcd4] hover:text-[#00bcd4] transition-colors min-h-[300px]">
            <Plus size={32} className="mb-2" />
            <span className="text-sm font-semibold">{t("createNewCard")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
