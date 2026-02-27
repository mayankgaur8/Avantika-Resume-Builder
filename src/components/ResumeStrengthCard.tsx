"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { ResumeSection } from "@/types/resume";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  score: number;
  sections: ResumeSection[];
  resumeId: string;
}

function CircleScore({ score }: { score: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#43a047" : score >= 50 ? "#00bcd4" : "#e53935";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <span className="absolute text-lg font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

export default function ResumeStrengthCard({ score, sections, resumeId }: Props) {
  const t = useTranslations("ResumeStrength");
  const errorCount = sections.filter((s) => !s.complete).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-5">
            <CircleScore score={score} />
            <div>
              <p className="text-sm text-gray-500 font-medium">{t("label")}</p>
              <p className="text-xs text-gray-400">
                {errorCount === 0 ? t("lookingGreat") : errorCount === 1
                  ? t("sectionsNeedAttention", { count: errorCount })
                  : t("sectionsNeedAttentionPlural", { count: errorCount })}
              </p>
            </div>
          </div>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.key} className="flex items-center gap-2">
                {section.complete ? (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                ) : (
                  <XCircle size={18} className="text-red-500 shrink-0" />
                )}
                <span className={`text-sm font-medium ${section.complete ? "text-gray-600" : "text-[#e53935]"}`}>
                  {t(section.key as "contact" | "summary" | "experience" | "education" | "skills")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-center border-l border-gray-100 pl-6 min-w-[200px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t("fixResume")}</h3>
          {errorCount > 0 ? (
            <p className="text-sm text-gray-500 mb-4">
              {errorCount === 1 ? t("errorsFound", { count: errorCount }) : t("errorsFoundPlural", { count: errorCount })}
              <br />{t("useCheckTool")}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">{t("lookingGoodMsg")}</p>
          )}
          <Link href={`/resumes/${resumeId}/edit`} className="bg-[#1a2332] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#243042] transition-colors">
            {t("improveResume")}
          </Link>
        </div>
      </div>
    </div>
  );
}
