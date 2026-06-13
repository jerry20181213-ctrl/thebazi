import type { Metadata } from "next";
import Link from "next/link";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import { getCanonicalUrl } from "@/lib/canonical-url";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "zodiac"),
    },
    title: isZh ? "十二生肖 — 性格、運勢與配對完整指南" : "Chinese Zodiac Signs — Personality, Fortune & Compatibility",
    description: isZh
      ? "探索十二生肖的性格特質、五行元素和運勢。了解你的生肖配對、2026年運程預測和完整命理分析。"
      : "Explore the 12 Chinese zodiac animals and discover the personality traits, elements, and fortunes of your sign. Complete guide with compatibility, 2026 horoscopes, and birth year lookup.",
    openGraph: {
      title: isZh ? "十二生肖完整指南" : "Chinese Zodiac Signs — Complete Guide",
      description: isZh ? "十二生肖的性格、運勢和配對完整指南。" : "Your complete guide to the 12 Chinese zodiac animals — personality, fortune, and compatibility.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Chinese Zodiac Signs Guide" }],
    },
  };
}

const ELEMENT_ORDER: Record<string, string> = {
  Rat: "Water",
  Ox: "Earth",
  Tiger: "Wood",
  Rabbit: "Wood",
  Dragon: "Earth",
  Snake: "Fire",
  Horse: "Fire",
  Goat: "Earth",
  Monkey: "Metal",
  Rooster: "Metal",
  Dog: "Earth",
  Pig: "Water",
};

export default function ZodiacPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Zodiac" },
        ])) }}
      />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Zodiac" },
      ]} />

      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Chinese Zodiac Signs
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-500 leading-relaxed">
          The Chinese zodiac (生肖) is a 12-year cycle where each year is represented by an animal.
          Unlike Western astrology which follows the stars, the Chinese zodiac is based on the
          lunar calendar and deeply tied to the Earthly Branches (地支) used in Ba Zi.
          Your zodiac sign reveals core aspects of your personality, element, and compatibility with others.
        </p>
      </div>

      {/* All 12 Signs */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold tracking-tight">The 12 Animals</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {CHINESE_ZODIAC_SIGNS.map((sign) => (
            <Link key={sign.key} href={`/zodiac/${sign.key}`}>
              <Card className="h-full transition-colors hover:border-zinc-300">
                <CardHeader>
                  <CardTitle className="text-lg">{sign.animal}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <p className="text-zinc-400">
                      Element: <span className="font-medium text-zinc-600">{ELEMENT_ORDER[sign.animal] || "—"}</span>
                    </p>
                    <p className="text-zinc-400">
                      Years: {sign.years.slice(0, 4).join(", ")}
                    </p>
                    <p className="text-zinc-400 mt-2 leading-relaxed">
                      {sign.years[0]} ({sign.years[0] - 12}–{sign.years[0]}) · Element: {ELEMENT_ORDER[sign.animal]} · Learn about {sign.animal} personality, career, love, and 2026 horoscope.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-lg font-bold tracking-tight mb-4">Explore More</h2>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <Link href="/zodiac/compatibility" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            Zodiac Compatibility
          </Link>
          <Link href="/zodiac/2026" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            2026 Horoscope Predictions
          </Link>
          <Link href="/birth-year" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            Birth Year Lookup
          </Link>
          <Link href="/learn/heavenly-stems" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            Heavenly Stems Guide
          </Link>
          <Link href="/learn/earthly-branches" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            Earthly Branches
          </Link>
          <Link href="/2026-year-of-the-horse" className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center text-zinc-600 hover:border-zinc-300 transition-colors">
            2026 Year of the Horse
          </Link>
        </div>
      </section>
    </div>
  );
}
