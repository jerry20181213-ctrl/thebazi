import type { Metadata } from "next";
import Link from "next/link";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { getElementName, getElementField, getElementDescription, CYCLES } from "@/lib/element-locale";
import { SITE_CONFIG } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import { getLocaleInfo } from "@/lib/locale-utils";
import { getCanonicalUrl } from "@/lib/canonical-url";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "five-elements"),
    },
    title: isZh ? "五行（Wu Xing）— 木火土金水完整指南" : isJa ? "五行（Wu Xing）— 木・火・土・金・水 完全ガイド" : "Five Elements (Wu Xing) — The Ba Zi",
    description: isZh
      ? "學習五行——木、火、土、金、水——如何影響你的性格、事業、健康和命運。了解五行相生相剋之道。"
      : isJa
        ? "五行（木・火・土・金・水）があなたの性格、仕事、健康、運命にどのような影響を与えるかを学びましょう。五行の相生・相克の関係を解説。"
        : "Learn about the Five Elements — Wood, Fire, Earth, Metal, and Water — and how they shape your personality, career, health, and destiny in Ba Zi astrology.",
    openGraph: {
      title: isZh ? "五行（Wu Xing）— 八字命理基礎" : isJa ? "五行（Wu Xing）— 四柱推命の基礎" : "Five Elements (Wu Xing) — The Ba Zi",
      description: isZh ? "探索中國五行哲學及其對你生活的影響。" : isJa ? "中国の五行哲学とその人生への影響を探る。" : "Discover the five fundamental elements of Chinese metaphysics and their influence on your life.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Five Elements (Wu Xing)" }],
    },
  };
}

export default async function FiveElementsIndex({ params }: Props) {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: isZh ? "首頁" : "Home", href: "/" },
          { label: isZh ? "五行" : "Five Elements" },
        ])) }}
      />
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[
            { label: isZh ? "首頁" : "Home", href: "/" },
            { label: isZh ? "五行" : "Five Elements" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            {isZh ? "五行" : isJa ? "五行" : "Five Elements"} <span className="text-zinc-500">(Wu Xing)</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-3xl">
            {isZh
              ? "五行——木、火、土、金、水——是中國玄學的基礎。在你的八字命盤中，這些元素的獨特組合塑造了你的性格、優勢、挑戰和人生道路。"
              : isJa
                ? "五行（木・火・土・金・水）は中国形而上学の基本的な構成要素です。四柱推命では、あなたの命式に含まれるこれらの元素のユニークな組み合わせが、性格、強み、課題、人生の道筋を形作ります。"
                : "The Five Elements — Wood, Fire, Earth, Metal, and Water — are the fundamental building blocks of Chinese metaphysics. In Ba Zi (Four Pillars of Destiny), your birth chart contains a unique combination of these elements that shapes your personality, strengths, challenges, and life path."}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
            {isZh ? "五行" : isJa ? "五行" : "The Five Elements"}
          </h2>
          <p className="text-zinc-600 mb-8">
            {isZh ? "每個元素代表一種能量模式。點擊深入探索。" : isJa ? "各元素は異なるエネルギーパターンを表します。クリックして詳しく見る。" : "Each element represents a different energy pattern. Click to explore each one in depth."}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIVE_ELEMENTS.map((el) => {
              const name = getElementName(el.key, locale);
              const season = getElementField(el.key, "season", locale) || el.season;
              const direction = getElementField(el.key, "direction", locale) || el.direction;
              const color = getElementField(el.key, "color", locale) || el.color;
              const desc = getElementDescription(el.key, locale) || el.description;
              return (
                <Link
                  key={el.key}
                  href={`/five-elements/${el.key}`}
                  className="group block rounded-xl border border-zinc-200 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {el.key === "wood" && "🌳"}
                    {el.key === "fire" && "🔥"}
                    {el.key === "earth" && "⛰️"}
                    {el.key === "metal" && "⚔️"}
                    {el.key === "water" && "💧"}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-1">{name}</h3>
                  <p className="text-sm text-zinc-500 mb-3">{el.chinese}</p>
                  <p className="text-sm text-zinc-600 line-clamp-3">{desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">{season}</span>
                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">{direction}</span>
                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">{color}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            {isZh ? "相生相剋" : isJa ? "相生・相克" : "The Cycle of Creation and Control"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="font-semibold text-green-800 mb-2">🔄 {isZh ? "相生" : isJa ? "相生（そうせい）" : "Generating Cycle"}</h3>
              <p className="text-sm text-green-700">
                {isZh ? CYCLES.generating.zh : isJa ? CYCLES.generating.ja : CYCLES.generating.en}
              </p>
              <p className="text-xs text-green-600 mt-2">
                {isZh ? "這是創造和滋養的循環，每個元素支持下一個。" : isJa ? "創造と養育のサイクル。各元素が次の元素を支えます。" : "This is the creative, nurturing cycle. Each element supports the next."}
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="font-semibold text-red-800 mb-2">⚔️ {isZh ? "相剋" : isJa ? "相克（そうこく）" : "Controlling Cycle"}</h3>
              <p className="text-sm text-red-700">
                {isZh ? CYCLES.controlling.zh : isJa ? CYCLES.controlling.ja : CYCLES.controlling.en}
              </p>
              <p className="text-xs text-red-600 mt-2">
                {isZh ? "這是平衡的循環，每個元素控制另一個。" : isJa ? "バランスを取るサイクル。各元素が別の元素を抑制します。" : "This is the balancing cycle. Each element keeps another in check."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            {isZh ? "五行如何影響你的八字" : isJa ? "五行があなたの四柱推命に与える影響" : "How Elements Affect Your Ba Zi"}
          </h2>
          <div className="prose prose-zinc max-w-none">
            <p>
              {isZh
                ? "在你的八字命盤中，五行平衡揭示了你的天然優勢和潛在挑戰。四柱（年、月、日、時）各有一個天干和地支，每個都與五行之一相關聯。"
                : isJa
                  ? "四柱推命の命式では、五行のバランスが生まれつきの強みと課題を明らかにします。四柱（年・月・日・時）にはそれぞれ天干と地支があり、それぞれが五行のいずれかと関連しています。"
                  : "In your Ba Zi chart, the balance of the five elements reveals your natural strengths and potential challenges. Each of the four pillars (Year, Month, Day, Hour) contains a Heavenly Stem and an Earthly Branch, each associated with one of the five elements."}
            </p>
            <p>
              {isZh
                ? "<strong>日主</strong>（日柱的天干）就是<em>你</em>。它的五行代表你的核心性格。命盤中的其他五行顯示你周圍的能量——你的環境、事業、人際關係。"
                : isJa
                  ? "<strong>日主</strong>（日柱の天干）は<em>あなた自身</em>です。その五行はあなたの核となる性格を表します。命式内の他の五行は、周囲のエネルギー——環境、仕事、人間関係——を示します。"
                  : "<strong>The Day Master</strong> (the Heavenly Stem of your Day Pillar) is <em>you</em>. Its element represents your core personality. The other elements in your chart show the energies surrounding you — your environment, your career, your relationships."}
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              {isZh ? "了解更多" : isJa ? "さらに詳しく" : "Learn More"}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/learn/heavenly-stems" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                {isZh ? "天干" : "Heavenly Stems"}
              </Link>
              <Link href="/learn/earthly-branches" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                {isZh ? "地支" : "Earthly Branches"}
              </Link>
              <Link href="/bazi" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                {isZh ? "開始排盤" : "Calculate Your Chart"}
              </Link>
              <Link href="/blog/chinese-five-elements-guide" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                {isZh ? "五行完整指南" : "Full Five Elements Guide"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
