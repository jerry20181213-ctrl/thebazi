import type { Metadata } from "next";
import { EARTHLY_BRANCHES, EARTHLY_BRANCHES_EN, BRANCH_WUXING } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "地支（Di Zhi）— 八字完整指南" : "Earthly Branches (Di Zhi) — Ba Zi Guide",
    description: isZh
      ? "十二地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）完整指南。了解每個地支的生肖對應、五行屬性和性格特質。"
      : "Complete guide to the 12 Earthly Branches (地支) in Ba Zi astrology. Learn the meaning, animal association, element, and personality of each branch.",
    openGraph: {
      title: isZh ? "地支（Di Zhi）— 八字指南" : "Earthly Branches (Di Zhi) — Ba Zi Guide",
      description: isZh ? "了解十二地支及其與生肖和八字的關聯。" : "Discover the 12 Earthly Branches and their connection to the Chinese zodiac and Ba Zi.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Earthly Branches Guide" }],
    },
  };
}

const BRANCH_INFO: Record<string, [string, string, string]> = {
  "子": ["Rat 🐀", "Midnight / North", "Ambition, intelligence, adaptability. The Zi branch carries the energy of deep winter — still, potent, and full of hidden potential."],
  "丑": ["Ox 🐂", "1 AM / NNE", "Steadfastness, diligence, strength. The Chou branch represents the last days of winter — cold but already preparing for spring."],
  "寅": ["Tiger 🐅", "3 AM / ENE", "Courage, initiative, authority. The Yin branch is the energy of dawn — explosive, exciting, and full of possibilities."],
  "卯": ["Rabbit 🐇", "5 AM / East", "Grace, diplomacy, sensitivity. The Mao branch is spring equinox — perfectly balanced, gentle, and harmonious."],
  "辰": ["Dragon 🐉", "7 AM / ESE", "Power, transformation, charisma. The Chen branch is late spring — full of growth, vitality, and dramatic change."],
  "巳": ["Snake 🐍", "9 AM / SSE", "Wisdom, mystery, elegance. The Si branch is early summer — the energy is rising, intense, and full of hidden knowledge."],
  "午": ["Horse 🐎", "Noon / South", "Freedom, passion, adventure. The Wu branch is summer solstice — the peak of Yang energy, hot, bright, and unrestrained."],
  "未": ["Goat 🐐", "1 PM / SSW", "Creativity, calm, nurturing. The Wei branch is late summer — abundant, gentle, and reflective."],
  "申": ["Monkey 🐒", "3 PM / WSW", "Innovation, playfulness, intelligence. The Shen branch is early autumn — the energy begins to contract, sharpening the mind."],
  "酉": ["Rooster 🐓", "5 PM / West", "Precision, discipline, honesty. The You branch is autumn equinox — balanced but leaning inward, the time of harvest and judgment."],
  "戌": ["Dog 🐕", "7 PM / WNW", "Loyalty, justice, vigilance. The Xu branch is late autumn — the energy is sinking, preparing for the stillness of winter."],
  "亥": ["Pig 🐖", "9 PM / NNW", "Generosity, contentment, intuition. The Hai branch is early winter — the energy is deep, receptive, and rich with inner wisdom."],
};

export default function EarthlyBranchesPage() {
  const branches = EARTHLY_BRANCHES.map((branch, i) => ({
    chinese: branch,
    pinyin: EARTHLY_BRANCHES_EN[i],
    element: BRANCH_WUXING[branch],
    animal: BRANCH_INFO[branch]?.[0] || "",
    time: BRANCH_INFO[branch]?.[1] || "",
    description: BRANCH_INFO[branch]?.[2] || "",
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
                { label: "Earthly Branches" },
              ])),
            }}
          />
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn/glossary" },
            { label: "Earthly Branches" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Earthly Branches <span className="text-zinc-500">(Dì Zhī / 地支)</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed">
            The Twelve Earthly Branches represent the earthly, or hidden, energy in each pillar of your
            Ba Zi chart. Unlike the Heavenly Stems which show your outward expression, the Branches
            reveal the deeper, more instinctual layers of your personality. Each Branch is also associated
            with a Chinese zodiac animal.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4">
            {branches.map((br) => (
              <div key={br.chinese} className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-zinc-800 w-12 text-center" aria-hidden="true">
                    {br.chinese}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h2 className="text-lg font-semibold text-zinc-900">{br.pinyin}</h2>
                      <span className="text-sm text-zinc-500">{br.animal}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">Element: {br.element} · Time: {br.time}</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{br.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">The Hidden Stems</h2>
          <p className="text-zinc-600 mb-6">
            Each Earthly Branch contains one or more hidden Heavenly Stems inside it. This is why
            the Branches are considered the "womb" of the Stems — they carry energies beneath the surface.
            In a Ba Zi reading, these hidden stems reveal talents and traits that are not immediately obvious.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { branch: "子 (Zi)", hides: "癸" },
              { branch: "丑 (Chou)", hides: "己, 癸, 辛" },
              { branch: "寅 (Yin)", hides: "甲, 丙, 戊" },
              { branch: "卯 (Mao)", hides: "乙" },
              { branch: "辰 (Chen)", hides: "戊, 乙, 癸" },
              { branch: "巳 (Si)", hides: "丙, 庚, 戊" },
              { branch: "午 (Wu)", hides: "丁, 己" },
              { branch: "未 (Wei)", hides: "己, 丁, 乙" },
              { branch: "申 (Shen)", hides: "庚, 壬, 戊" },
              { branch: "酉 (You)", hides: "辛" },
              { branch: "戌 (Xu)", hides: "戊, 辛, 丁" },
              { branch: "亥 (Hai)", hides: "壬, 甲" },
            ].map((item) => (
              <div key={item.branch} className="rounded-lg border border-zinc-200 bg-white p-3 text-center text-sm">
                <span className="font-medium text-zinc-900">{item.branch}</span>
                <span className="text-zinc-400"> → </span>
                <span className="text-zinc-600">{item.hides}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
