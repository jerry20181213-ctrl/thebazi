import type { Metadata } from "next";
import Link from "next/link";
import { getAllPillarKeys, getPillarByKey } from "@/lib/day-pillar-content";
import { ELEMENT_EMOJIS } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "60 Day Pillars (60 日柱) — Complete Ba Zi Reference",
  description: "Explore all 60 Day Pillars (六十甲子) of the Ba Zi system. Find your birth day pillar and discover its personality, strengths, career path, and relationship insights.",
  openGraph: {
    title: "60 Day Pillars — Complete Ba Zi Reference",
    description: "Your complete guide to all 60 Day Pillar combinations in Chinese metaphysics.",
  },
};

export default function DayPillarsIndexPage() {
  const keys = getAllPillarKeys();
  const pillars = keys.map(getPillarByKey);

  // Group by stem element for display
  const groups = [
    { element: "Wood", emoji: "🌳", pillars: pillars.filter(p => p.stem.element === "Wood") },
    { element: "Fire", emoji: "🔥", pillars: pillars.filter(p => p.stem.element === "Fire") },
    { element: "Earth", emoji: "⛰️", pillars: pillars.filter(p => p.stem.element === "Earth") },
    { element: "Metal", emoji: "⚔️", pillars: pillars.filter(p => p.stem.element === "Metal") },
    { element: "Water", emoji: "💧", pillars: pillars.filter(p => p.stem.element === "Water") },
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn/glossary" },
          { label: "Day Pillars" },
        ])) }}
      />
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn/glossary" },
            { label: "Day Pillars" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            The 60 Day Pillars <span className="text-zinc-500">(六十甲子)</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed">
            In Ba Zi, your Day Pillar — the combination of the Heavenly Stem and Earthly Branch
            of your birth day — is considered <strong>you</strong>. Each of the 60 possible combinations
            creates a unique personality profile with distinct strengths, challenges, and life tendencies.
            Find your Day Pillar below to discover what your birth day says about you.
          </p>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.element} className="py-8 even:bg-zinc-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-1">
              {group.emoji} {group.element} Day Masters
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              {group.pillars.length} pillars with {group.element.toLowerCase()} as the Day Master
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.pillars.map((p) => (
                <Link
                  key={p.key}
                  href={`/learn/day-pillars/${p.key}`}
                  className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl font-bold text-zinc-800 w-10 text-center shrink-0" aria-hidden="true">
                      {p.chinese}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-zinc-900">{p.stem.pinyin} {p.branch.pinyin}</span>
                        <span className="text-xs text-zinc-400">{p.branch.animal}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {p.stem.element} · {p.stem.yinYang} · {p.branch.element} {p.branch.yinYang}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-zinc-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">How to Find Your Day Pillar</h2>
          <div className="prose prose-zinc prose-sm max-w-none">
            <ol>
              <li>Go to our <Link href="/bazi" className="text-red-600 hover:underline">Ba Zi Calculator</Link> and enter your birth date</li>
              <li>Your Ba Zi chart will show all Four Pillars — the <strong>Day Pillar</strong> is the third column</li>
              <li>The Heavenly Stem of your Day Pillar is your <strong>Day Master</strong> — your core self</li>
              <li>Click the pillar combination above to learn what it reveals about your personality and destiny</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
