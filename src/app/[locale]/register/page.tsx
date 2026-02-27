"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { register, isLoggedIn } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const router = useRouter();

  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError(t("passwordMismatch")); return; }
    if (password.length < 6)  { setError(t("passwordTooShort")); return; }
    setLoading(true);
    setTimeout(() => {
      register(name, email, password);
      router.replace("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8fffe] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Avantika" className="h-16 w-16 rounded-full object-cover shadow-lg mb-3" />
          <h1 className="text-2xl font-extrabold text-[#1a2332]">avantika</h1>
          <p className="text-gray-500 text-sm mt-1">{t("subtitle")}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t("title")}</h2>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{t("fullName")}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                suppressHydrationWarning
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{t("email")}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                suppressHydrationWarning
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{t("password")}</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  suppressHydrationWarning
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{t("confirmPassword")}</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={t("confirmPlaceholder")}
                suppressHydrationWarning
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2332] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#243042] transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "..." : t("signUp")}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-[#00bcd4] font-semibold hover:underline">{t("signIn")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
