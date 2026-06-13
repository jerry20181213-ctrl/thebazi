import type { Metadata } from "next";
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
      canonical: getCanonicalUrl(locale, "learn", "glossary"),
    },
    title: isZh ? "八字詞彙表 — 關鍵術語與概念" : isJa ? "四柱推命 用語集 — 重要用語と概念" : "Ba Zi Glossary — Key Terms & Concepts",
    description: isZh
      ? "八字（四柱命理）術語完整詞彙表。了解天干、地支、五行、日主等概念。"
      : isJa
        ? "四柱推命（八字）の重要用語を網羅。天干・地支・五行・日主などの概念をわかりやすく解説。"
        : "Comprehensive glossary of Ba Zi (Four Pillars of Destiny) terms. Understand Heavenly Stems, Earthly Branches, Five Elements, Day Master, and more.",
    openGraph: {
      title: isZh ? "八字詞彙表 — 關鍵術語" : isJa ? "四柱推命 用語集" : "Ba Zi Glossary — Key Terms & Concepts",
      description: isZh ? "八字術語完整參考。" : isJa ? "四柱推命の用語を完全解説。" : "Your complete reference to Ba Zi terminology.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ba Zi Glossary" }],
    },
  };
}

const TERMS = [
  {
    term: "Ba Zi (八字)",
    definition: "Literally 'Eight Characters.' Also known as Four Pillars of Destiny. An ancient Chinese metaphysical system that maps a person's birth date and time into four pillars — Year, Month, Day, Hour — each with a Heavenly Stem and Earthly Branch.",
  },
  {
    term: "Four Pillars (四柱)",
    definition: "The four columns of a Ba Zi chart: Year Pillar (ancestors/early life), Month Pillar (parents/career), Day Pillar (self/spouse — the most important), and Hour Pillar (children/late life).",
  },
  {
    term: "Day Master (日主 / 日元)",
    definition: "The Heavenly Stem of the Day Pillar. This is considered 'you' in the Ba Zi chart. The Day Master's element reveals your core personality, strengths, and challenges.",
  },
  {
    term: "Heavenly Stems (天干 / Tiān Gān)",
    definition: "Ten celestial energies — Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui — each associated with a Yin or Yang aspect of one of the Five Elements. They represent the visible, outward energy in each pillar.",
  },
  {
    term: "Earthly Branches (地支 / Dì Zhī)",
    definition: "Twelve earthly energies tied to the Chinese zodiac — Zi (Rat), Chou (Ox), Yin (Tiger), Mao (Rabbit), Chen (Dragon), Si (Snake), Wu (Horse), Wei (Goat), Shen (Monkey), You (Rooster), Xu (Dog), Hai (Pig). They represent hidden, instinctual energy.",
  },
  {
    term: "Five Elements (五行 / Wǔ Xíng)",
    definition: "Wood, Fire, Earth, Metal, and Water — the five fundamental energies that interact in cycles of creation and destruction. The balance of these elements in your chart determines your natural tendencies.",
  },
  {
    term: "Generating Cycle (相生)",
    definition: "The creative cycle of the Five Elements: Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal collects Water, Water nourishes Wood. Each element supports the next.",
  },
  {
    term: "Controlling Cycle (相克)",
    definition: "The balancing cycle of the Five Elements: Wood breaks Earth, Earth absorbs Water, Water extinguishes Fire, Fire melts Metal, Metal cuts Wood. Each element keeps another in check.",
  },
  {
    term: "Yin and Yang (阴阳)",
    definition: "The fundamental duality in Chinese philosophy. In Ba Zi, each Heavenly Stem is either Yin (receptive, inward, soft) or Yang (active, outward, strong). Balance between Yin and Yang is ideal.",
  },
  {
    term: "Nobleman (贵人 / Guì Rén)",
    definition: "A beneficial star or spirit in the Ba Zi chart that indicates help from others, protection, and good fortune in difficult times. The presence of a Nobleman star suggests you will receive timely assistance when needed.",
  },
  {
    term: "Ten Gods (十神 / Shí Shén)",
    definition: "Ten relationship archetypes derived from the interaction between the Day Master and the other stems in the chart. They describe your relationships with wealth, power, resources, peers, and output.",
  },
  {
    term: "Hidden Stems (藏干 / Cáng Gān)",
    definition: "Heavenly Stems hidden inside Earthly Branches. Each Earthly Branch contains 1-3 hidden stems that reveal subconscious talents and traits not visible on the surface.",
  },
  {
    term: "Na Yin (纳音)",
    definition: "The 'sound' or musical quality of each pillar, derived from the combination of its Stem and Branch. Na Yin reveals the deeper, more subtle quality of each pillar's energy.",
  },
  {
    term: "Tai Yuan (胎元)",
    definition: "The 'Embryo Origin' — a supplementary pillar in Ba Zi that represents the prenatal influence. It reveals the energy you received from your mother during conception and early pregnancy.",
  },
  {
    term: "Ming Gong (命宫)",
    definition: "The 'Life Palace' — a supplementary palace that represents your life path, destiny, and overall fortune direction. It's calculated from your birth month and hour.",
  },
  {
    term: "Shen Gong (身宫)",
    definition: "The 'Body Palace' — a supplementary palace that represents your physical health, vitality, and personal presence. It's the counterpart to Ming Gong.",
  },
  {
    term: "Lucky Elements (用神 / Yòng Shén)",
    definition: "The element(s) that are most beneficial for you based on your Ba Zi chart. These are the elements that balance your chart's strengths and weaknesses. Your lucky colors, directions, and numbers are derived from these elements.",
  },
  {
    term: "Favorable Directions (吉利方向)",
    definition: "Directions that are energetically supportive for you based on your Ba Zi chart. Living, working, or traveling in these directions can bring better opportunities and harmony.",
  },
  {
    term: "Kong Wang (空亡)",
    definition: "'Emptiness' or 'Void' — a condition in Ba Zi where a Stem-Branch combination falls into an empty space. It suggests areas of life that may feel empty, delayed, or require more effort to fulfill.",
  },
  {
    term: "Great Luck Cycles (大运 / Dà Yùn)",
    definition: "Ten-year periods in a person's life, each governed by a specific pair of Stem and Branch. These cycles show the rising and falling fortunes throughout life. The first cycle begins in childhood.",
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn/glossary" },
          { label: "Glossary" },
        ])) }}
      />
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn/glossary" },
            { label: "Glossary" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Ba Zi Glossary
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed">
            A comprehensive reference of Ba Zi (Four Pillars of Destiny) terms and concepts.
            Click through to deepen your understanding of Chinese metaphysics.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4">
            {TERMS.map((item) => (
              <div key={item.term} className="rounded-xl border border-zinc-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">{item.term}</h2>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
