"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg overflow-hidden text-xs font-bold">
      <button
        onClick={() => switchTo("en")}
        title="English"
        className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-[#1a2332] text-white"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        🇺🇸 EN
      </button>
      <div className="w-px h-5 bg-gray-200" />
      <button
        onClick={() => switchTo("de")}
        title="Deutsch"
        className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
          locale === "de"
            ? "bg-[#1a2332] text-white"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        🇩🇪 DE
      </button>
    </div>
  );
}
