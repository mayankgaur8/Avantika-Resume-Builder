"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { isLoggedIn } from "@/lib/auth";
import Navbar from "./Navbar";

const PUBLIC_PATHS = ["/login", "/register"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!isPublic && !isLoggedIn()) {
      router.replace("/login");
    }
  }, [pathname, isPublic, router]);

  return (
    <>
      {!isPublic && <Navbar />}
      {children}
    </>
  );
}
