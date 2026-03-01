import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Footer from "@/components/Footer";
import { FileText, Zap, Target, Users, ShieldCheck, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Avantika Resume Builder",
  description: "Learn about Avantika Resume Builder — AI-powered resume and interview prep tools built to help you land your dream job.",
};

const stats = [
  { value: "10,000+", label: "Resumes Created" },
  { value: "95%", label: "User Satisfaction" },
  { value: "3", label: "Subscription Plans" },
  { value: "24hrs", label: "Support Response" },
];

const values = [
  {
    icon: <Zap size={22} className="text-[#00bcd4]" />,
    bg: "bg-cyan-50",
    title: "AI-Powered Tools",
    desc: "We leverage the latest AI to give every user intelligent resume suggestions, ATS optimization, and interview coaching — regardless of their plan.",
  },
  {
    icon: <Target size={22} className="text-purple-500" />,
    bg: "bg-purple-50",
    title: "Career-Focused Design",
    desc: "Every feature is built with one goal: helping you get hired. From resume templates to job tracking, everything is purpose-built for job seekers.",
  },
  {
    icon: <ShieldCheck size={22} className="text-green-500" />,
    bg: "bg-green-50",
    title: "Privacy & Security",
    desc: "Your data belongs to you. We use industry-standard encryption, never sell your data, and comply with applicable Indian data protection laws.",
  },
  {
    icon: <Users size={22} className="text-orange-500" />,
    bg: "bg-orange-50",
    title: "Built for India",
    desc: "Designed with Indian job seekers in mind — INR pricing, local job market awareness, and support in your time zone.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-[#00bcd4] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Star size={13} /> Our Story
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Building Careers,<br className="hidden sm:block" /> One Resume at a Time
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Avantika Resume Builder is an AI-powered SaaS platform that helps job seekers create
            professional resumes, craft compelling cover letters, and prepare for interviews — all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            <Link href="/resumes/new" className="bg-[#1a2332] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#243042] transition-colors">
              Build Your Resume
            </Link>
            <Link href="/pricing" className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors">
              View Plans
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-[#1a2332] rounded-2xl p-8 mb-10 text-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#00bcd4]/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <FileText size={20} className="text-[#00bcd4]" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">Our Mission</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We believe everyone deserves a fair shot at their dream job — regardless of their background or resources.
                Our mission is to democratize professional resume creation using AI, making expert-quality career tools
                accessible and affordable for every job seeker in India and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
                <div className={`w-10 h-10 ${v.bg} rounded-xl flex items-center justify-center shrink-0`}>{v.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team / Founder */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Who Built This</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00bcd4] to-[#1a2332] flex items-center justify-center text-white text-2xl font-bold shrink-0">
              MG
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Mayank Gaur</h3>
              <p className="text-sm text-[#00bcd4] font-medium mb-3">Founder & Developer, Avantika Resume Builder</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Avantika Resume Builder was built by Mayank Gaur with a simple vision: make it easy for anyone
                to present their best professional self. Combining modern web technology with AI, the platform
                helps thousands of users create standout resumes and land interviews faster.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <a href="mailto:support@avantika-resume-builder.com" className="text-xs text-[#00bcd4] underline">
                  support@avantika-resume-builder.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-gray-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to build your career?</h2>
          <p className="text-gray-500 text-sm mb-6">Join thousands of job seekers using Avantika to land their next opportunity.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="bg-[#00bcd4] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00acc1] transition-colors">
              Get Started Free
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
