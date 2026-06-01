import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { get2026Horoscope, YEAR_2026_INFO } from "@/lib/zodiac-2026-horoscope";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CHINESE_ZODIAC_SIGNS.map((s) => ({ slug: s.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const hor = get2026Horoscope(slug);
  if (!sign || !hor) return { title: "Not Found" };
  return {
    title: `${sign.animal} 2026 Horoscope — Fire Horse Year Forecast`,
    description: `${sign.animal} 2026 Chinese zodiac horoscope: ${hor.overall.substring(0, 120)}`,
    openGraph: {
      title: `${sign.animal} 2026 Yearly Horoscope`,
      description: `What does the Fire Horse year 2026 hold for ${sign.animal}? Career, love, health, and finance predictions.`,
    },
  };
}

export default async function Horoscope2026DetailPage({ params }: Props) {
  const { slug } = await params;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const hor = get2026Horoscope(slug);
  if (!sign || !hor) notFound();

  const allSigns = CHINESE_ZODIAC_SIGNS.filter((s) => s.key !== slug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Zodiac", href: "/zodiac" },
    { label: "2026 Horoscopes", href: "/zodiac/2026" },
    { label: sign.animal },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 mb-8">
        <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-red-600 mb-2">
          2026 Fire Horse Year
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{sign.animal} 2026 Horoscope</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {YEAR_2026_INFO.chinese} · Year of the Fire Horse
        </p>
      </div>

      {/* Overall summary card */}
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-red-50 to-white p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3">🔮 Overall 2026 Outlook</h2>
        <p className="text-sm text-zinc-700 leading-relaxed">{hor.overall}</p>
      </div>

      {/* Detail grid */}
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">💼 Career</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{hor.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">❤️ Love & Relationships</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{hor.love}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-900 mb-2">💰 Finance</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{hor.finance}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-900 mb-2">🏃 Health</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{hor.health}</p>
          </div>
        </div>
      </div>

      {/* Lucky info */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-semibold text-amber-800 mb-3">🍀 Lucky Items for {sign.animal} in 2026</h2>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-xs text-amber-600 mb-1">Lucky Elements</p>
            <p className="text-amber-800 font-medium">{hor.luckyElements.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-amber-600 mb-1">Lucky Colors</p>
            <p className="text-amber-800 font-medium">{hor.luckyColors.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-amber-600 mb-1">Lucky Numbers</p>
            <p className="text-amber-800 font-medium">{hor.luckyNumbers.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Key months + advice */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">📅 Key Months</h2>
          <p className="text-sm text-zinc-600">{hor.keyMonths}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="font-semibold text-green-800 mb-2">💡 Advice for 2026</h2>
          <p className="text-sm text-green-700">{hor.advice}</p>
        </div>
      </div>

      {/* Other signs */}
      <div className="mt-10 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-500 mb-3">Other Signs in 2026</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {allSigns.slice(0, 6).map((s) => (
            <Link
              key={s.key}
              href={`/zodiac/2026/${s.key}`}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:border-zinc-300 transition-colors text-center"
            >
              {s.animal}
            </Link>
          ))}
        </div>
        <Link
          href="/zodiac/2026"
          className="mt-3 block text-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          View All 2026 Horoscopes →
        </Link>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-xl bg-zinc-900 p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Get Your Personalized 2026 Reading</h3>
        <p className="text-sm text-zinc-300 mb-4">
          Your Ba Zi chart combines your birth details with 2026 energies for a truly personalized forecast.
        </p>
        <Link
          href="/bazi"
          className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          Calculate Your Ba Zi
        </Link>
      </div>
    </div>
  );
}
