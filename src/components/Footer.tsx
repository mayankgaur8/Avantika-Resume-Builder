"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
    { label: t("terms"), href: "/terms" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("doNotSell"), href: "/privacy#do-not-sell" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Avantika Resume Builder" className="h-8 w-8 rounded-full object-cover" />
          <p className="text-xs text-gray-400">{t("copyright", { year })}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {["f", "𝕏", "in", "M"].map((icon) => (
            <button key={icon} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
