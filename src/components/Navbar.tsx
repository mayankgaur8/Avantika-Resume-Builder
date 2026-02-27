"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Bell, ChevronDown, Settings, HelpCircle, MessageCircle, LogOut, Crown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { mockUser } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import { getStoredUser, logout } from "@/lib/auth";

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [authName, setAuthName]     = useState<string | null>(null);
  const [authEmail, setAuthEmail]   = useState<string | null>(null);
  const [authAvatar, setAuthAvatar] = useState<string | null>(null);
  const [avatarPhoto, setAvatarPhoto] = useState<string | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) { setAuthName(user.name); setAuthEmail(user.email); setAuthAvatar(user.avatar); }
    const photo = localStorage.getItem("avatarPhoto");
    if (photo) setAvatarPhoto(photo);
  }, []);

  const displayName   = authName   ?? mockUser.name;
  const displayEmail  = authEmail  ?? mockUser.email;
  const displayAvatar = authAvatar ?? mockUser.avatar;

  const navLinks = [
    { label: t("dashboard"), href: "/dashboard" },
    { label: t("jobs"), href: "/jobs" },
    { label: t("resumes"), href: "/resumes" },
    { label: t("coverLetter"), href: "/cover-letters" },
    { label: t("boldProfile"), href: "/profile" },
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = () => {
    logout();
    router.replace("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center mr-10 shrink-0">
          <img src="/logo.png" alt="Avantika Resume Builder" className="h-11 w-11 rounded-full object-cover" />
          <span className="ml-2 text-lg font-bold text-gray-900 hidden sm:block">avantika</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-5 text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "text-[#00bcd4] border-[#00bcd4]"
                    : "text-gray-500 border-transparent hover:text-gray-800"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          {mockUser.plan === "free" && (
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#00bcd4] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <Crown size={12} /> {t("upgrade")}
            </Link>
          )}

          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              {avatarPhoto ? (
                <img src={avatarPhoto} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1a2332] text-white text-xs font-bold flex items-center justify-center">
                  {displayAvatar}
                </div>
              )}
              <span className="text-sm font-medium">{displayName}</span>
              <ChevronDown size={14} className={cn("transition-transform", dropdownOpen && "rotate-180")} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800">{displayName}</p>
                  <p className="text-xs text-gray-400">{displayEmail}</p>
                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium capitalize">
                    {t("currentPlan", { plan: mockUser.plan })}
                  </span>
                </div>
                <Link href="/pricing" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#7c3aed] font-semibold hover:bg-purple-50 transition-colors">
                  <Crown size={15} /> {t("upgradePlan")}
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={15} /> {t("settings")}
                </Link>
                <Link href="/help" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <HelpCircle size={15} /> {t("help")}
                </Link>
                <Link href="/contact" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <MessageCircle size={15} /> {t("contact")}
                </Link>
                <div className="border-t border-gray-100 mt-1">
                  <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={15} /> {t("signOut")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
