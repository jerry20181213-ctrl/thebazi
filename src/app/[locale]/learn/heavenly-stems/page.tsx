import type { Metadata } from "next";
import { HEAVENLY_STEMS, HEAVENLY_STEMS_EN, STEM_WUXING } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "天干（Tian Gan）— 八字完整指南" : isJa ? "天干（Tian Gan）— 四柱推命 完全ガイド" : "Heavenly Stems (Tian Gan) — Ba Zi Guide",
    description: isZh
      ? "十天干（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）完整指南。了解每個天干的五行屬性、性格特質及其在八字中的含義。"
      : isJa
        ? "10の天干（甲・乙・丙・丁・戊・己・庚・辛・壬・癸）を完全解説。各天干の五行属性、性格特性、四柱推命における意味を学びましょう。"
        : "Complete guide to the 10 Heavenly Stems (天干) in Ba Zi astrology. Learn the meaning, element association, and personality of each stem in Chinese metaphysics.",
    openGraph: {
      title: isZh ? "天干（Tian Gan）— 八字指南" : isJa ? "天干（Tian Gan）— 四柱推命ガイド" : "Heavenly Stems (Tian Gan) — Ba Zi Guide",
      description: isZh ? "了解十天干——塑造你八字命盤的天干能量。" : isJa ? "10の天干 — あなたの命式を形作る天干のエネルギー。" : "Learn the 10 Heavenly Stems — the celestial energies that shape your Ba Zi chart.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Heavenly Stems Guide" }],
    },
  };
}

const STEM_PERSONALITIES: Record<string, string[]> = {
  "甲": ["Jia (Yang Wood)", "The towering tree. A natural leader, ambitious, expansive, and noble. Jia people are born pioneers — they see the big picture and charge ahead with confidence."],
  "乙": ["Yi (Yin Wood)", "The flowering vine. Graceful, adaptable, and persistent. Yi people grow around obstacles rather than through them, achieving their goals with quiet determination."],
  "丙": ["Bing (Yang Fire)", "The blazing sun. Warm, radiant, and generous. Bing people light up every room and naturally attract others with their charisma and optimism."],
  "丁": ["Ding (Yin Fire)", "The candle flame. Gentle, focused, and illuminating. Ding people bring warmth to those closest to them, burning steadily rather than fiercely."],
  "戊": ["Wu (Yang Earth)", "The great mountain. Solid, dependable, and trustworthy. Wu people are the foundation of any team — steady, unshakeable, and always reliable."],
  "己": ["Ji (Yin Earth)", "The fertile soil. Nurturing, receptive, and wise. Ji people create the conditions for growth in others, making them excellent teachers and healers."],
  "庚": ["Geng (Yang Metal)", "The raw ore. Strong, determined, and unyielding. Geng people have an inner toughness that helps them cut through adversity with precision."],
  "辛": ["Xin (Yin Metal)", "The polished jade. Refined, elegant, and perceptive. Xin people have a keen eye for detail and beauty, excelling in craftsmanship and analysis."],
  "壬": ["Ren (Yang Water)", "The vast ocean. Deep, powerful, and free-flowing. Ren people have tremendous inner resources and the wisdom to navigate any situation."],
  "癸": ["Gui (Yin Water)", "The gentle rain. Intuitive, mysterious, and receptive. Gui people have a deep connection to the unseen, making them naturally psychic and creative."],
};

export default function HeavenlyStemsPage() {
  const stems = HEAVENLY_STEMS.map((stem, i) => ({
    chinese: stem,
    pinyin: HEAVENLY_STEMS_EN[i],
    element: STEM_WUXING[stem],
    personality: STEM_PERSONALITIES[stem] || [stem, ""],
  }));

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLdScript(breadcrumbSchema([
                { label: "Home", href: "/" },
                { label: "Learn", href: "/learn/glossary" },
                { label: "Heavenly Stems" },
              ])),
            }}
          />
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn/glossary" },
            { label: "Heavenly Stems" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Heavenly Stems <span className="text-zinc-500">(Tiān Gān / 天干)</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed">
            The Ten Heavenly Stems are the celestial energy of the Chinese calendar. In Ba Zi,
            each pillar contains a Heavenly Stem that represents the active, visible energy of
            that dimension of your life. Your Day Master — the stem of your Day Pillar — is
            considered <em>you</em> in your Ba Zi chart.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4">
            {stems.map((stem) => (
              <div key={stem.chinese} className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-zinc-800 w-12 text-center" aria-hidden="true">
                    {stem.chinese}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-zinc-900">{stem.pinyin}</h2>
                    <p className="text-sm text-zinc-500 mb-2">Element: {stem.element}</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{stem.personality[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Yin and Yang in the Stems</h2>
          <p className="text-zinc-600 mb-6">
            The ten Heavenly Stems are divided into five Yang and five Yin pairs, one for each element:
          </p>
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { element: "Wood", yang: "甲 (Jia)", yin: "乙 (Yi)" },
              { element: "Fire", yang: "丙 (Bing)", yin: "丁 (Ding)" },
              { element: "Earth", yang: "戊 (Wu)", yin: "己 (Ji)" },
              { element: "Metal", yang: "庚 (Geng)", yin: "辛 (Xin)" },
              { element: "Water", yang: "壬 (Ren)", yin: "癸 (Gui)" },
            ].map((pair) => (
              <div key={pair.element} className="rounded-lg border border-zinc-200 bg-white p-4 text-center">
                <div className="text-sm font-semibold text-zinc-900 mb-1">{pair.element}</div>
                <div className="text-xs text-zinc-500">Yang: {pair.yang}</div>
                <div className="text-xs text-zinc-500">Yin: {pair.yin}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
