import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStemDetail, STEM_SLUGS, ALL_STEMS } from "@/lib/heavenly-stems-content";
import { HEAVENLY_STEMS_EN } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import { getCanonicalUrl } from "@/lib/canonical-url";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return STEM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const stem = getStemDetail(slug);
  if (!stem) return { title: "Not Found" };
  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "learn", "heavenly-stems", slug),
    },
    title: `${stem.pinyin} (${stem.chinese}) — ${stem.element} Heavenly Stem Personality & Meaning`,
    description: `Complete guide to ${stem.pinyin} (${stem.chinese}), the ${stem.yinYang} ${stem.element} Heavenly Stem. Learn about ${stem.pinyin} personality, career, relationships, health, and more.`,
    openGraph: {
      title: `${stem.pinyin} (${stem.chinese}) Heavenly Stem — Meaning & Personality`,
      description: `${stem.imageWords}. Discover the ${stem.yinYang} ${stem.element} stem's traits and life path.`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Heavenly Stem Guide" }],
    },
  };
}

const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Wood: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Fire: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Earth: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Metal: { bg: "bg-zinc-50", text: "text-zinc-700", border: "border-zinc-200" },
  Water: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

export default async function StemDetailPage({ params }: Props) {
  const { slug } = await params;
  const stem = getStemDetail(slug);
  if (!stem) notFound();

  const ec = ELEMENT_COLORS[stem.element] || ELEMENT_COLORS.Wood;
  const stemIndex = HEAVENLY_STEMS_EN.findIndex((e) => e.toLowerCase() === stem.pinyin.toLowerCase());
  const prevStem = stemIndex > 0 ? ALL_STEMS[stemIndex - 1] : null;
  const nextStem = stemIndex < ALL_STEMS.length - 1 ? ALL_STEMS[stemIndex + 1] : null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn/glossary" },
    { label: "Heavenly Stems", href: "/learn/heavenly-stems" },
    { label: `${stem.pinyin} (${stem.chinese})` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/learn/heavenly-stems" className="text-xs text-zinc-400 hover:text-zinc-600">
          ← All Heavenly Stems
        </Link>
        <div className="flex gap-3 text-xs">
          {prevStem && (
            <Link href={`/learn/heavenly-stems/${prevStem.pinyin.toLowerCase()}`} className="text-zinc-400 hover:text-zinc-600">
              ← {prevStem.pinyin}
            </Link>
          )}
          {nextStem && (
            <Link href={`/learn/heavenly-stems/${nextStem.pinyin.toLowerCase()}`} className="text-zinc-400 hover:text-zinc-600">
              {nextStem.pinyin} →
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className={`rounded-xl border ${ec.border} ${ec.bg} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl font-bold text-zinc-800 w-14 text-center shrink-0">{stem.chinese}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">{stem.pinyin}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ec.text} bg-white`}>
                {stem.element}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500">
                {stem.yinYang}
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              {stem.chinese} · Heavenly Stem {stemIndex + 1} of 10 · Direction: {stem.direction} · Season: {stem.season}
            </p>
            <p className="text-sm italic text-zinc-400 mt-1">{stem.imageWords}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-700 leading-relaxed">{stem.description}</p>
      </div>

      {/* Personality */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 mb-2">🧬 Personality</h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-3">{stem.personality}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold text-green-600 mb-2">Strengths</h3>
            <ul className="space-y-1">
              {stem.strengths.map((s, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-1.5">
                  <span className="text-green-400 shrink-0">✦</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-red-400 mb-2">Weaknesses</h3>
            <ul className="space-y-1">
              {stem.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-1.5">
                  <span className="text-red-300 shrink-0">✦</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Career, Relationships, Health */}
      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">💼 Career</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{stem.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">❤️ Relationships</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{stem.relationships}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">🏃 Health</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{stem.health}</p>
        </div>
      </div>

      {/* Compatible stems */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 mb-4">
        <h3 className="text-xs font-semibold text-zinc-700 mb-2">Compatible Heavenly Stems</h3>
        <p className="text-xs text-zinc-500 mb-2">
          {stem.pinyin} pairs well with these stems (harmonic element relationships):
        </p>
        <div className="flex flex-wrap gap-2">
          {stem.compatibleStems.map((cs) => {
            const compatStem = ALL_STEMS.find((s) => s.chinese === cs);
            return compatStem ? (
              <Link
                key={cs}
                href={`/learn/heavenly-stems/${compatStem.pinyin.toLowerCase()}`}
                className="rounded-lg bg-white border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 hover:border-zinc-400 transition-colors"
              >
                {cs} ({compatStem.pinyin})
              </Link>
            ) : null;
          })}
        </div>
      </div>

      {/* Related links */}
      <div className="border-t border-zinc-200 pt-6 mt-6">
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <Link href="/learn/earthly-branches" className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">Earthly Branches</span>
            <span className="block text-zinc-400 mt-0.5">Learn the 12 Earthly Branches of Ba Zi</span>
          </Link>
          <Link href="/bazi" className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">Your Ba Zi Chart</span>
            <span className="block text-zinc-400 mt-0.5">Calculate your Four Pillars of Destiny</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
