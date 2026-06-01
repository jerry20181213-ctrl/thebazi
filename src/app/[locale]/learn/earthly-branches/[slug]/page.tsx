import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBranchDetail, BRANCH_SLUGS, ALL_BRANCHES } from "@/lib/earthly-branches-content";
import { EARTHLY_BRANCHES_EN } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRANCH_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchDetail(slug);
  if (!branch) return { title: "Not Found" };
  return {
    title: `${branch.pinyin} (${branch.chinese}) — ${branch.zodiacAnimal} Earthly Branch Meaning & Personality`,
    description: `Complete guide to ${branch.pinyin} (${branch.chinese}), the ${branch.zodiacAnimal} Earthly Branch. Element: ${branch.element}. Season: ${branch.season}. Direction: ${branch.direction}. Learn personality, career, love, and more.`,
    openGraph: {
      title: `${branch.pinyin} (${branch.chinese}) Earthly Branch — Meaning & Personality`,
      description: `${branch.imageWords}. Discover the ${branch.zodiacAnimal} branch's traits, hidden stems, and life path.`,
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

export default async function BranchDetailPage({ params }: Props) {
  const { slug } = await params;
  const branch = getBranchDetail(slug);
  if (!branch) notFound();

  const ec = ELEMENT_COLORS[branch.element] || ELEMENT_COLORS.Wood;
  const branchIndex = EARTHLY_BRANCHES_EN.findIndex((e) => e.toLowerCase() === branch.pinyin.toLowerCase());
  const prevBranch = branchIndex > 0 ? ALL_BRANCHES[branchIndex - 1] : null;
  const nextBranch = branchIndex < ALL_BRANCHES.length - 1 ? ALL_BRANCHES[branchIndex + 1] : null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn/glossary" },
    { label: "Earthly Branches", href: "/learn/earthly-branches" },
    { label: `${branch.pinyin} (${branch.chinese})` },
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
        <Link href="/learn/earthly-branches" className="text-xs text-zinc-400 hover:text-zinc-600">
          ← All Earthly Branches
        </Link>
        <div className="flex gap-3 text-xs">
          {prevBranch && (
            <Link href={`/learn/earthly-branches/${prevBranch.pinyin.toLowerCase()}`} className="text-zinc-400 hover:text-zinc-600">
              ← {prevBranch.pinyin}
            </Link>
          )}
          {nextBranch && (
            <Link href={`/learn/earthly-branches/${nextBranch.pinyin.toLowerCase()}`} className="text-zinc-400 hover:text-zinc-600">
              {nextBranch.pinyin} →
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className={`rounded-xl border ${ec.border} ${ec.bg} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl font-bold text-zinc-800 w-14 text-center shrink-0">{branch.chinese}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">{branch.pinyin}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ec.text} bg-white`}>
                {branch.element}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500">
                {branch.zodiacAnimal}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              {branch.chinese} · Earthly Branch {branchIndex + 1} of 12 · Time: {branch.time} · Month: {branch.month} · Direction: {branch.direction}
            </p>
            <p className="text-xs italic text-zinc-400 mt-1">{branch.imageWords}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-700 leading-relaxed">{branch.description}</p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center">
          <span className="block text-xs text-zinc-400">Season</span>
          <span className="block text-sm font-medium text-zinc-800 mt-0.5">{branch.season}</span>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center">
          <span className="block text-xs text-zinc-400">Direction</span>
          <span className="block text-sm font-medium text-zinc-800 mt-0.5">{branch.direction}</span>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center">
          <span className="block text-xs text-zinc-400">Time</span>
          <span className="block text-sm font-medium text-zinc-800 mt-0.5">{branch.time}</span>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center">
          <span className="block text-xs text-zinc-400">Hidden Stems</span>
          <span className="block text-sm font-medium text-zinc-800 mt-0.5">{branch.hiddenStems.join(", ")}</span>
        </div>
      </div>

      {/* Personality */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 mb-2">🧬 Personality</h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-3">{branch.personality}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold text-green-600 mb-2">Strengths</h3>
            <ul className="space-y-1">
              {branch.strengths.map((s, i) => (
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
              {branch.weaknesses.map((w, i) => (
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
          <p className="text-xs text-zinc-600 leading-relaxed">{branch.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">❤️ Relationships</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{branch.relationships}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">🏃 Health</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{branch.health}</p>
        </div>
      </div>

      {/* Compatible branches */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 mb-4">
        <h3 className="text-xs font-semibold text-zinc-700 mb-2">Compatible Earthly Branches</h3>
        <p className="text-xs text-zinc-500 mb-2">
          {branch.pinyin} forms harmonious combinations with these branches:
        </p>
        <div className="flex flex-wrap gap-2">
          {branch.compatibleBranches.map((cb) => {
            const compatBranch = ALL_BRANCHES.find((b) => b.chinese === cb);
            return compatBranch ? (
              <Link
                key={cb}
                href={`/learn/earthly-branches/${compatBranch.pinyin.toLowerCase()}`}
                className="rounded-lg bg-white border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 hover:border-zinc-400 transition-colors"
              >
                {cb} ({compatBranch.pinyin} · {compatBranch.zodiacAnimal})
              </Link>
            ) : null;
          })}
        </div>
      </div>

      {/* Links to zodiac and related */}
      <div className="border-t border-zinc-200 pt-6 mt-6">
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <Link href={`/zodiac/${branch.zodiacKey}`} className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">{branch.zodiacAnimal} Zodiac</span>
            <span className="block text-zinc-400 mt-0.5">Learn about the {branch.zodiacAnimal} personality</span>
          </Link>
          <Link href="/learn/heavenly-stems" className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">Heavenly Stems</span>
            <span className="block text-zinc-400 mt-0.5">Learn the 10 Heavenly Stems of Ba Zi</span>
          </Link>
          <Link href={`/zodiac/${branch.zodiacKey}/compatibility`} className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">{branch.zodiacAnimal} Compatibility</span>
            <span className="block text-zinc-400 mt-0.5">See love, career & friendship matches</span>
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
