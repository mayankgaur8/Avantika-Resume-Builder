"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const mockJobs = [
  { id: "1", title: "Senior Fullstack Developer", company: "Google", location: "Bengaluru, India", type: "Full-time", posted: "2 days ago", salary: "₹40–60 LPA", description: "Join our team to build scalable web applications using React and Node.js. 5+ years experience required.", tags: ["React", "Node.js", "TypeScript"] },
  { id: "2", title: "Java Backend Engineer", company: "Amazon", location: "Hyderabad, India", type: "Full-time", posted: "1 day ago", salary: "₹35–55 LPA", description: "Design and develop high-performance backend services using Java and Spring Boot.", tags: ["Java", "Spring Boot", "AWS"] },
  { id: "3", title: "React Developer", company: "Flipkart", location: "Remote", type: "Full-time", posted: "3 days ago", salary: "₹25–40 LPA", description: "Build modern web interfaces using React, Redux and GraphQL.", tags: ["React", "Redux", "GraphQL"] },
  { id: "4", title: "DevOps Engineer", company: "Infosys", location: "Pune, India", type: "Full-time", posted: "5 days ago", salary: "₹20–35 LPA", description: "Manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS.", tags: ["Kubernetes", "AWS", "CI/CD"] },
  { id: "5", title: "Solutions Architect", company: "TCS", location: "Bengaluru, India", type: "Full-time", posted: "1 week ago", salary: "₹50–80 LPA", description: "Lead architecture design for enterprise-scale SOA and microservices systems.", tags: ["Architecture", "SOA", "Java"] },
];

export default function JobsPage() {
  const t = useTranslations("Jobs");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const filtered = mockJobs.filter(
    (j) => j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()) || j.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-[#1a2332] py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">{t("heroTitle")}</h1>
          <p className="text-gray-400 text-sm mb-6">{t("heroDesc")}</p>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-2">
              <Search size={16} className="text-gray-400" />
              <input className="flex-1 py-3 text-sm outline-none" placeholder={t("searchPlaceholder")} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="flex items-center bg-white rounded-xl px-4 gap-2">
              <MapPin size={16} className="text-gray-400" />
              <input className="py-3 text-sm outline-none w-32" placeholder={t("locationPlaceholder")} value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <button className="bg-[#00bcd4] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#00acc1] transition-colors">{t("searchBtn")}</button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-sm text-gray-500 mb-5">
          {filtered.length === 1 ? t("resultsCount", { count: filtered.length }) : t("resultsCountPlural", { count: filtered.length })}
        </p>
        <div className="space-y-4">
          {filtered.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">{job.title}</h2>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-800">{job.salary}</p>
                  <button className="mt-2 bg-[#1a2332] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#243042] transition-colors">{t("applyNow")}</button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{job.description}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {job.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
