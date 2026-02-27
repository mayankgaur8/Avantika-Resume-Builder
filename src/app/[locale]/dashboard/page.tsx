"use client";

import { Link } from "@/i18n/navigation";
import { Briefcase, FileText, Users, Edit, Download, Plus, Bookmark, ListChecks, BarChart2, Search, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockResumes, mockUser, recommendedJobs } from "@/lib/mockData";
import { calculateStrength } from "@/lib/resumeStrength";
import ResumeStrengthCard from "@/components/ResumeStrengthCard";
import ResumeThumbnail from "@/components/ResumeThumbnail";
import Footer from "@/components/Footer";

function strengthColor(s: number) {
  if (s >= 80) return "bg-green-500";
  if (s >= 60) return "bg-[#00bcd4]";
  return "bg-orange-400";
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const tc = useTranslations("Common");
  const resume = mockResumes[0];
  const { score, sections } = calculateStrength(resume);

  const exploreTools = [
    { icon: <ListChecks size={28} className="text-orange-500" />, bg: "bg-orange-50", title: t("toolImproveTitle"), desc: t("toolImproveDesc"), cta: t("toolImproveCta"), href: "/resumes/1/edit" },
    { icon: <FileText size={28} className="text-blue-500" />, bg: "bg-blue-50", title: t("toolCoverTitle"), desc: t("toolCoverDesc"), cta: t("toolCoverCta"), href: "/cover-letters" },
    { icon: <BarChart2 size={28} className="text-[#00bcd4]" />, bg: "bg-cyan-50", title: t("toolAnalyticsTitle"), desc: t("toolAnalyticsDesc"), cta: t("toolAnalyticsCta"), href: "/profile" },
    { icon: <Search size={28} className="text-green-500" />, bg: "bg-green-50", title: t("toolJobsTitle"), desc: t("toolJobsDesc"), cta: t("toolJobsCta"), href: "/jobs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-[280px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800 truncate">{resume.name}</h2>
                <Link href="/resumes" className="text-sm font-semibold text-[#00bcd4] hover:underline ml-2 whitespace-nowrap">
                  {tc("viewAll")}
                </Link>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                <ResumeThumbnail resume={resume} />
              </div>
              <div className="flex gap-3 mb-4">
                <Link href={`/resumes/${resume.id}/edit`} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Edit size={15} /> {tc("edit")}
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download size={15} /> {tc("download")}
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">{t("resumeStrengthLabel")}</span>
                <div className="flex items-center gap-2">
                  <span className="bg-[#00bcd4] text-white text-xs font-bold px-2 py-0.5 rounded-full">{score}</span>
                  <Link href={`/resumes/${resume.id}/edit`} className="text-[#00bcd4] text-xs font-semibold hover:underline">{tc("improve")}</Link>
                </div>
              </div>
            </div>
            <Link href="/resumes/new" className="mt-4 flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 text-sm font-semibold text-gray-500 hover:border-[#00bcd4] hover:text-[#00bcd4] transition-colors">
              <Plus size={16} /> {t("createNewResume")}
            </Link>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-10">
            <section>
              <h1 className="text-2xl font-bold text-gray-900 mb-5">{t("title")}</h1>
              <div className="space-y-4">
                <ResumeStrengthCard score={score} sections={sections} resumeId={resume.id} />

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0"><Briefcase size={24} className="text-orange-500" /></div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900">{t("searchForJob")}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{t("searchJobDesc")}</p>
                  </div>
                  <Link href="/jobs" className="border-2 border-[#1a2332] text-[#1a2332] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a2332] hover:text-white transition-colors whitespace-nowrap">{t("searchJobBtn")}</Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0"><Users size={24} className="text-blue-500" /></div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900">{t("boldProfileTitle")}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{t("boldProfileVisits", { count: mockUser.profileVisitors })}</p>
                  </div>
                  <Link href="/profile" className="border-2 border-[#1a2332] text-[#1a2332] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a2332] hover:text-white transition-colors whitespace-nowrap">{t("boldProfileBtn")}</Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0"><FileText size={24} className="text-purple-500" /></div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900">{t("coverLettersTitle")}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{t("coverLetterName", { name: mockUser.coverLetters[0].name })}</p>
                  </div>
                  <Link href="/cover-letters" className="border-2 border-[#1a2332] text-[#1a2332] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a2332] hover:text-white transition-colors whitespace-nowrap">{t("coverLettersBtn")}</Link>
                </div>
              </div>
            </section>

            {/* Recommended Jobs */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{t("recommendedJobsTitle")}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{t("recommendedJobsDesc")}</p>
                </div>
                <Link href="/jobs" className="text-sm font-semibold text-[#00bcd4] hover:underline flex items-center gap-1 whitespace-nowrap">
                  {tc("seeMore")} <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">{job.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{job.company}</p>
                        <p className="text-xs text-gray-400">{job.location}</p>
                        <p className="text-xs text-gray-400 mt-1">Posted {job.posted}</p>
                      </div>
                      <button className="shrink-0 text-gray-300 hover:text-[#00bcd4]"><Bookmark size={16} /></button>
                    </div>
                  </div>
                ))}
                <Link href="/jobs" className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center text-[#00bcd4] font-semibold text-sm hover:shadow-md transition-shadow">
                  {t("seeMoreJobs")}
                </Link>
              </div>
            </section>

            {/* Recent Resumes Table */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{t("myResumesTitle")}</h2>
                <Link href="/resumes/new" className="border-2 border-[#1a2332] text-[#1a2332] px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1a2332] hover:text-white transition-colors">
                  {t("createANewResume")}
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {[t("tableColName"), t("tableColModified"), t("tableColCreated"), t("tableColStrength"), t("tableColBoldProfile"), t("tableColActions")].map((h) => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockResumes.map((r) => (
                      <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-bold text-gray-800">{r.name.slice(0, 10)}...</td>
                        <td className="px-5 py-4 text-gray-500">{r.updatedAt}</td>
                        <td className="px-5 py-4 text-gray-500">{r.createdAt}</td>
                        <td className="px-5 py-4">
                          <span className={`${strengthColor(r.strength)} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{r.strength}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end px-0.5 cursor-pointer shrink-0">
                              <div className="w-4 h-4 bg-white rounded-full shadow" />
                            </div>
                            <span className="text-xs text-gray-500 leading-tight">{t("boldProfileToggle")}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <button className="text-[#00bcd4] font-semibold text-xs hover:underline">✓ {tc("check")}</button>
                            <Link href={`/resumes/${r.id}/edit`} className="text-[#00bcd4] font-semibold text-xs hover:underline">✏ {tc("edit")}</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Explore Tools */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t("exploreToolsTitle")}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {exploreTools.map((tool) => (
                  <div key={tool.title} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-3`}>{tool.icon}</div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{tool.desc}</p>
                    <Link href={tool.href} className="text-sm font-semibold text-[#00bcd4] hover:underline">{tool.cta}</Link>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
