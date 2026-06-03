import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPillarByKey, getAllPillarKeys, getAdjacentPillars } from "@/lib/day-pillar-content";
import { ELEMENT_EMOJIS } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, faqSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPillarKeys().map((key) => ({ slug: key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarByKey(slug);
  if (!pillar) return { title: "Day Pillar Not Found" };

  return {
    title: `${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin}) Day Pillar — ${pillar.stem.pinyin} ${pillar.stem.element} Personality & Destiny — The Ba Zi`,
    description: `${pillar.chinese} Day Pillar: ${pillar.stem.pinyin} ${pillar.stem.element} (${pillar.stem.yinYang}) on ${pillar.branch.pinyin} ${pillar.branch.animal} (${pillar.branch.element}). Discover personality, strengths, career, and relationship insights.`,
    openGraph: {
      title: `${pillar.chinese} — Day Pillar Personality & Destiny`,
      description: `Complete analysis of the ${pillar.chinese} Day Pillar in Ba Zi astrology.`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Day Pillar Guide" }],
    },
  };
}

function elementColor(el: string): string {
  const colors: Record<string, string> = {
    Wood: "text-green-600 bg-green-50 border-green-200",
    Fire: "text-red-600 bg-red-50 border-red-200",
    Earth: "text-yellow-700 bg-yellow-50 border-yellow-200",
    Metal: "text-zinc-600 bg-zinc-50 border-zinc-200",
    Water: "text-blue-600 bg-blue-50 border-blue-200",
  };
  return colors[el] ?? "text-zinc-600 bg-zinc-50 border-zinc-200";
}

export default async function DayPillarPage({ params }: Props) {
  const { slug } = await params;

  let pillar;
  try {
    pillar = getPillarByKey(slug);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentPillars(slug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn/glossary" },
    { label: "Day Pillars", href: "/learn/day-pillars" },
    { label: `${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin})` },
  ];

  const InteractionCycle = ({ stemEl, branchEl }: { stemEl: string; branchEl: string }) => {
    const gen: Record<string, string> = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
    const ctrl: Record<string, string> = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

    let text = "";
    if (gen[stemEl] === branchEl) text = `${stemEl} → ${branchEl}: Stem produces Branch (nourishing)`;
    else if (gen[branchEl] === stemEl) text = `${branchEl} → ${stemEl}: Branch produces Stem (supportive)`;
    else if (ctrl[stemEl] === branchEl) text = `${stemEl} ⊣ ${branchEl}: Stem controls Branch (balancing)`;
    else if (ctrl[branchEl] === stemEl) text = `${branchEl} ⊣ ${stemEl}: Branch controls Stem (tempering)`;
    else text = `${stemEl} = ${branchEl}: Same element (amplified)`;

    return <span className="text-sm text-zinc-500">{text}</span>;
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema([
          {
            question: `What does the ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin}) Day Pillar mean in Ba Zi?`,
            answer: `The ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin}) is one of the 60 day pillars in Chinese Ba Zi astrology. It combines ${pillar.stem.yinYang} ${pillar.stem.element} (${pillar.stem.pinyin}) on the Heavenly Stem with ${pillar.branch.yinYang} ${pillar.branch.element} (${pillar.branch.pinyin}) on the Earthly Branch, represented by the ${pillar.branch.animal}. People with this Day Pillar have ${pillar.stem.pinyin} as their Day Master, which defines their core personality and life path.`
          },
          {
            question: `What element is ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin})?`,
            answer: `The ${pillar.chinese} Day Pillar has ${pillar.stem.element} (${pillar.stem.yinYang}) on the Heavenly Stem and ${pillar.branch.element} (${pillar.branch.yinYang}) on the Earthly Branch. The interaction between these two elements — ${pillar.stem.element} and ${pillar.branch.element} — shapes the personality and destiny of people with this Day Pillar.`
          },
          {
            question: `What careers suit people with ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin}) Day Pillar?`,
            answer: `${pillar.career} This aligns with the ${pillar.stem.element} element and the ${pillar.branch.animal} qualities, which naturally incline towards roles that benefit from ${pillar.strength.toLowerCase()}.`
          },
          {
            question: `What are the strengths and weaknesses of ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin})?`,
            answer: `People with the ${pillar.chinese} Day Pillar have key strengths including ${pillar.strength}. Their challenges include ${pillar.weakness}. Understanding these traits helps individuals leverage their natural talents while working on areas that need balance.`
          },
          {
            question: `How does ${pillar.chinese} (${pillar.stem.pinyin} ${pillar.branch.pinyin}) interact with the 2026 Fire Horse year?`,
            answer: `For ${pillar.chinese} Day Pillar individuals, the 2026 Bing Wu (Fire Horse) year brings specific influences based on how Fire and Horse energies interact with the ${pillar.stem.element} Stem and ${pillar.branch.element} Branch of this pillar. Those with compatible elements may find 2026 brings career opportunities or romantic developments, while those with conflicting elements should exercise caution in major decisions. Consulting a full Ba Zi chart reading provides personalized insights.`
          },
        ])) }}
      />
      <div className="max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-0">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* Navigation between pillars */}
      <div className="border-b border-zinc-200 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div>
            {prev ? (
              <Link href={`/learn/day-pillars/${prev.key}`} className="text-zinc-500 hover:text-zinc-900 transition-colors">
                ← {prev.chinese} {prev.stem.pinyin} {prev.branch.pinyin}
              </Link>
            ) : (
              <span className="text-zinc-300">—</span>
            )}
          </div>
          <Link href="/learn/day-pillars" className="text-zinc-500 hover:text-zinc-900 transition-colors">
            All 60 Pillars
          </Link>
          <div>
            {next ? (
              <Link href={`/learn/day-pillars/${next.key}`} className="text-zinc-500 hover:text-zinc-900 transition-colors">
                {next.chinese} {next.stem.pinyin} {next.branch.pinyin} →
              </Link>
            ) : (
              <span className="text-zinc-300">—</span>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="text-6xl font-bold text-zinc-800 shrink-0" aria-hidden="true">
              {pillar.chinese}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-1">
                {pillar.stem.pinyin} {pillar.branch.pinyin}
              </h1>
              <p className="text-lg text-zinc-500 mb-3">
                {pillar.stem.element} {ELEMENT_EMOJIS[pillar.stem.element]} · {pillar.stem.yinYang} {pillar.stem.pinyin}
                {" on "}
                {pillar.branch.element} {ELEMENT_EMOJIS[pillar.branch.element]} · {pillar.branch.yinYang} {pillar.branch.pinyin} ({pillar.branch.animal})
              </p>
              <InteractionCycle stemEl={pillar.stem.element} branchEl={pillar.branch.element} />
            </div>
          </div>
        </div>
      </section>

      {/* Pillar info cards */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Element badges */}
          <div className="flex flex-wrap gap-2">
            {[pillar.stem, pillar.branch].map((item) => (
              <span key={item.char} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${elementColor(item.element)}`}>
                {item.char} {item.pinyin} · {item.yinYang} {item.element}
              </span>
            ))}
          </div>

          {/* Personality */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Personality & Character</h2>
            <p className="text-sm text-zinc-700 leading-relaxed">{pillar.personality}</p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-800 mb-2">Strengths</h3>
              <p className="text-sm text-green-700">{pillar.strength}</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="font-semibold text-red-800 mb-2">Weaknesses</h3>
              <p className="text-sm text-red-700">{pillar.weakness}</p>
            </div>
          </div>

          {/* Career & Relationships */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="font-semibold text-zinc-900 mb-2">💼 Career & Vocation</h3>
              <p className="text-sm text-zinc-600">{pillar.career}</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="font-semibold text-zinc-900 mb-2">❤️ Relationships</h3>
              <p className="text-sm text-zinc-600">{pillar.relationships}</p>
            </div>
          </div>

          {/* Lucky elements & colors */}
          {pillar.luckyElements.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="font-semibold text-zinc-900 mb-3">🍀 Lucky Elements & Colors</h3>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Lucky Elements</p>
                  <div className="flex gap-2">
                    {pillar.luckyElements.map((el) => (
                      <span key={el} className="text-sm text-zinc-700">
                        {ELEMENT_EMOJIS[el]} {el}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Lucky Colors</p>
                  <div className="flex gap-2">
                    {pillar.luckyColors.map((color) => (
                      <span key={color} className="text-sm text-zinc-700">{color}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Find your pillar CTA */}
          <div className="rounded-xl bg-zinc-900 text-white p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Not Your Pillar?</h3>
            <p className="text-sm text-zinc-300 mb-4">
              Find your own Day Pillar by entering your birth date in our Ba Zi Calculator.
            </p>
            <Link
              href="/bazi"
              className="inline-block rounded-lg bg-white text-zinc-900 px-6 py-2.5 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Calculate Your Ba Zi
            </Link>
          </div>

          {/* 60 Pillars grid */}
          <details className="mt-8 rounded-xl border border-zinc-200 bg-white">
            <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 rounded-xl transition-colors select-none">
              📋 All 60 Day Pillars
            </summary>
            <div className="border-t border-zinc-100 p-4">
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1.5">
                {getAllPillarKeys().map((key) => {
                  const p = getPillarByKey(key);
                  const isCurrent = key === slug;
                  return (
                    <Link
                      key={key}
                      href={`/learn/day-pillars/${key}`}
                      className={`rounded-lg px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                        isCurrent
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                      }`}
                      title={`${p.chinese} (${p.stem.pinyin} ${p.branch.pinyin})`}
                    >
                      <span className={isCurrent ? "" : "text-zinc-500"}>{p.chinese}</span>
                      <span className="block text-[10px] text-zinc-400 font-normal">
                        {p.stem.pinyin} {p.branch.pinyin}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
