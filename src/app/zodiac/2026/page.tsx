import type { Metadata } from "next";
import Link from "next/link";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { get2026Horoscope, YEAR_2026_INFO } from "@/lib/zodiac-2026-horoscope";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "2026 Fire Horse Year Horoscope — Chinese Zodiac Forecasts",
  description: "Comprehensive 2026 Chinese zodiac horoscopes for all 12 signs. Discover what the Fire Horse year brings for your career, love, health, and finances in 2026.",
  openGraph: {
    title: "2026 Fire Horse Year Horoscope — Complete Zodiac Forecast",
    description: "What does the Fire Horse year 2026 hold for you? Detailed horoscopes for all 12 zodiac signs.",
  },
};

const ELEMENT_BG: Record<string, string> = {
  rat: "bg-blue-50", ox: "bg-amber-50", tiger: "bg-green-50",
  rabbit: "bg-green-50", dragon: "bg-amber-50", snake: "bg-red-50",
  horse: "bg-red-50", goat: "bg-amber-50", monkey: "bg-zinc-50",
  rooster: "bg-zinc-50", dog: "bg-amber-50", pig: "bg-blue-50",
};

export default function Horoscope2026Page() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Zodiac", href: "/zodiac" },
          { label: "2026 Horoscopes" },
        ])) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Zodiac", href: "/zodiac" },
            { label: "2026 Horoscopes" },
          ]} />
          <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-medium text-red-600 mb-4">
            2026 Fire Horse Year
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            2026 Chinese Zodiac Horoscope
          </h1>
          <p className="mt-3 text-sm text-zinc-500 max-w-2xl mx-auto">
            {YEAR_2026_INFO.chinese} — {YEAR_2026_INFO.description}
          </p>
        </div>
      </section>

      {/* Quick intro to the year */}
      <section className="pb-6">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">🔥 About the Fire Horse Year</h2>
            <p className="text-sm text-red-700 leading-relaxed mb-3">
              The Fire Horse is the most powerful and intense combination in the 60-year Chinese zodiac cycle.
              Occurring only once every 60 years (last: 1966), a Fire Horse year brings passionate energy,
              rapid change, and transformative opportunities across all areas of life.
            </p>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">🐴</span>
                <span className="font-medium text-zinc-700">Year Animal</span>
                <span className="block text-xs text-zinc-500">Horse</span>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">🔥</span>
                <span className="font-medium text-zinc-700">Element</span>
                <span className="block text-xs text-zinc-500">Fire</span>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">⚡</span>
                <span className="font-medium text-zinc-700">Energy</span>
                <span className="block text-xs text-zinc-500">Passionate, Fast, Bold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign grid */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-6">Choose Your Sign</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHINESE_ZODIAC_SIGNS.map((sign) => {
              const hor = get2026Horoscope(sign.key);
              return (
                <Link
                  key={sign.key}
                  href={`/zodiac/2026/${sign.key}`}
                  className={`rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:shadow-sm ${ELEMENT_BG[sign.key]}`}
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{sign.animal}</h3>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                    {hor?.overall.substring(0, 120)}...
                  </p>
                  <span className="mt-3 inline-block text-xs font-medium text-red-500">
                    Read 2026 Forecast →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-8 text-center">
        <p className="text-xs text-zinc-400 max-w-xl mx-auto">
          These horoscopes are based on traditional Chinese zodiac principles and the Five Elements.
          They are for entertainment and personal reflection purposes.
        </p>
      </section>
    </div>
  );
}
