import { notFound } from "next/navigation";
import Link from "next/link";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { getElementName, getElementField, getElementDescription } from "@/lib/element-locale";
import { getLocaleInfo } from "@/lib/locale-utils";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return FIVE_ELEMENTS.map((el) => ({ slug: el.key }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const el = FIVE_ELEMENTS.find((e) => e.key === slug);
  if (!el) return { title: "Not Found" };
  const name = getElementName(el.key, locale);

  if (isZh) {
    return {
      title: `${name}（${el.chinese}）— 八字五行指南`,
      description: `了解五行之${name}在八字命理中的含義：性格特質、職業方向、養生建議和平衡${name}能量的方法。`,
    };
  }
  if (isJa) {
    return {
      title: `${name}（${el.chinese}）— 四柱推命 五行ガイド`,
      description: `${name}（${el.chinese}）の五行における意味を解説：性格、適職、健康法、そして${name}エネルギーを整える方法。`,
    };
  }
  return {
    title: `${el.name} Element (${el.chinese}) — Ba Zi Five Elements Guide`,
    description: `Learn about the ${el.name} element in Ba Zi (Four Pillars of Destiny): personality traits, career paths, health tips, lucky colors, and how to balance ${el.name} energy in your life.`,
  };
}

export default async function ElementPage({ params }: Props) {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const el = FIVE_ELEMENTS.find((e) => e.key === slug);
  if (!el) notFound();

  const name = getElementName(el.key, locale);
  const season = getElementField(el.key, "season", locale) || el.season;
  const direction = getElementField(el.key, "direction", locale) || el.direction;
  const color = getElementField(el.key, "color", locale) || el.color;
  const personality = getElementField(el.key, "personality", locale) || el.personality;
  const desc = getElementDescription(el.key, locale) || el.description;

  const emoji: Record<string, string> = { wood: "🌳", fire: "🔥", earth: "⛰️", metal: "⚔️", water: "💧" };

  const breadcrumbItems = [
    { label: isZh ? "首頁" : "Home", href: "/" },
    { label: isZh ? "五行" : "Five Elements", href: "/five-elements" },
    { label: `${name} (${el.chinese})` },
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <section className="bg-gradient-to-b from-zinc-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          <Link href="/five-elements" className="text-sm text-zinc-500 hover:text-zinc-700 mb-4 inline-block">
            ← All Five Elements
          </Link>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl" aria-hidden="true">{emoji[el.key]}</span>
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-1">{el.name} Element</h1>
              <p className="text-xl text-zinc-500">{el.chinese}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-zinc-900 mb-3">Key Attributes</h2>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Season", el.season],
                    ["Direction", el.direction],
                    ["Color", el.color],
                    ["Shape", el.shape],
                    ["Planet", el.planet],
                    ["Climate", el.climate],
                    ["Number", String(el.number)],
                    ["Emotion", el.emotion],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-500 font-medium w-32">{label}</td>
                      <td className="py-2 text-zinc-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-zinc-900 mb-3">Personality & Character</h2>
              <p className="text-sm text-zinc-500 mb-2"><strong>Personality:</strong> {el.personality}</p>
              <p className="text-sm text-zinc-500 mb-2"><strong>Strength:</strong> {el.strength}</p>
              <p className="text-sm text-zinc-500 mb-4"><strong>Weakness:</strong> {el.weakness}</p>
              <h3 className="text-sm font-semibold text-zinc-700 mb-2">Best Career Paths</h3>
              <p className="text-sm text-zinc-500">{el.career}</p>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none mb-10">
            <h2>About the {el.name} Element</h2>
            <p>{el.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-800 mb-2">Nurtured By</h3>
              <p className="text-sm text-green-700">
                {el.compatibleElements[0]} → {el.name}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {el.compatibleElements[0]} energy strengthens and nourishes {el.name}.
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="font-semibold text-blue-800 mb-2">Nurtures</h3>
              <p className="text-sm text-blue-700">
                {el.name} → {el.compatibleElements[1]}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {el.name} energy flows into and supports {el.compatibleElements[1]}.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Daily Tips for {el.name} Energy</h2>
            <ul className="space-y-2">
              {el.dailyTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-zinc-700">
                  <span className="text-zinc-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-zinc-900 text-white p-6">
            <h2 className="text-xl font-semibold mb-2">Health & {el.name} Element</h2>
            <p className="text-zinc-300 text-sm mb-3">
              In Chinese medicine, each element governs specific organs and body parts.
            </p>
            <p className="text-zinc-100"><strong>Governs:</strong> {el.health}</p>
            <p className="text-sm text-zinc-300 mt-2">
              Keeping your {el.name} energy balanced supports these areas of your body. Imbalance may
              manifest as issues in these organs.
            </p>
          </div>
        </div>

        {/* Related blog articles */}
        <RelatedArticles keyword={el.key} locale={locale} limit={3} />

        {/* Learn More Section */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Learn More</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/five-elements" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">All Elements</Link>
            <Link href="/learn/heavenly-stems" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">Heavenly Stems</Link>
            <Link href="/learn/earthly-branches" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">Earthly Branches</Link>
            <Link href="/bazi" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">Calculate Your Chart</Link>
            <Link href="/blog/chinese-five-elements-guide" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">Five Elements Blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
