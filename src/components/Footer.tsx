"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const site = useTranslations("site");

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">{site("name")}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t("description")}
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">{t("explore")}</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><Link href="/bazi" className="hover:text-zinc-900 transition-colors">{nav("bazi")}</Link></li>
              <li><Link href="/zodiac" className="hover:text-zinc-900 transition-colors">{nav("zodiac")}</Link></li>
              <li><Link href="/five-elements" className="hover:text-zinc-900 transition-colors">{nav("fiveElements")}</Link></li>
              <li><Link href="/blog" className="hover:text-zinc-900 transition-colors">{nav("blog")}</Link></li>
              <li><Link href="/learn/glossary" className="hover:text-zinc-900 transition-colors">{nav("glossary")}</Link></li>
              <li><Link href="/learn/faq" className="hover:text-zinc-900 transition-colors">{nav("faq")}</Link></li>
              <li><Link href="/2026-year-of-the-horse" className="hover:text-zinc-900 transition-colors">{t("yearOfHorse")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">{t("legal")}</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><Link href="/privacy" className="hover:text-zinc-900 transition-colors">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-900 transition-colors">{t("terms")}</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-zinc-900 transition-colors">{t("affiliate")}</Link></li>
              <li>{t("disclaimer")}</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">{t("supportUs")}</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="https://ko-fi.com/thebazi" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">{t("buyCoffee")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} {site("name")}. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
