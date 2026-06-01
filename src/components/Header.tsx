"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const lang = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/bazi", label: t("bazi") },
    { href: "/zodiac", label: t("zodiac") },
    { href: "/five-elements", label: t("fiveElements") },
    { href: "/blog", label: t("blog") },
    { href: "/learn/glossary", label: t("glossary") },
  ];

  const otherLocale = locale === "en" ? "zh-TW" : "en";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="text-zinc-900">The</span>
          <span className="rounded-lg bg-zinc-900 px-2 py-0.5 text-white">Ba Zi</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="relative ml-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-md border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-100"
              aria-label="Switch language"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {locale === "en" ? "EN" : "中文"}
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-36 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
                  <Link
                    href={pathname}
                    locale="en"
                    className={cn(
                      "block px-3 py-2 text-xs transition-colors hover:bg-zinc-50",
                      locale === "en" ? "font-semibold text-zinc-900" : "text-zinc-600"
                    )}
                    onClick={() => setLangOpen(false)}
                  >
                    🇬🇧 English
                  </Link>
                  <Link
                    href={pathname}
                    locale="zh-TW"
                    className={cn(
                      "block px-3 py-2 text-xs transition-colors hover:bg-zinc-50",
                      locale === "zh-TW" ? "font-semibold text-zinc-900" : "text-zinc-600"
                    )}
                    onClick={() => setLangOpen(false)}
                  >
                    🇹🇼 繁體中文
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>

        <button
          className="sm:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t("toggleMenu")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-zinc-100 pt-3">
              <Link
                href={pathname}
                locale="en"
                className={cn(
                  "rounded-md border px-3 py-1.5 text-xs transition-colors",
                  locale === "en" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600"
                )}
                onClick={() => setMobileOpen(false)}
              >
                🇬🇧 EN
              </Link>
              <Link
                href={pathname}
                locale="zh-TW"
                className={cn(
                  "rounded-md border px-3 py-1.5 text-xs transition-colors",
                  locale === "zh-TW" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600"
                )}
                onClick={() => setMobileOpen(false)}
              >
                🇹🇼 中文
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
