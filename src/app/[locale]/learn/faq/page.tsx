import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "@/i18n/routing";
import { faqSchema, breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "八字FAQ — 四柱命理常見問題解答" : "Ba Zi FAQ — Frequently Asked Questions About Four Pillars of Destiny",
    description: isZh
      ? "關於八字（四柱命理）、生肖、五行和命盤解讀的常見問題解答。"
      : "Find answers to common questions about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, and how to interpret your destiny chart.",
    openGraph: {
      title: isZh ? "八字FAQ — 常見問題" : "Ba Zi FAQ — Frequently Asked Questions",
      description: isZh ? "關於八字和中國占星術的常見問題解答。" : "Answers to common questions about Ba Zi and Chinese astrology.",
    },
  };
}

const FAQ_ITEMS = [
  {
    question: "What is Ba Zi (Four Pillars of Destiny)?",
    answer:
      "Ba Zi (八字), meaning 'Eight Characters,' is an ancient Chinese metaphysical system that analyzes a person's life blueprint based on their birth date and time. It uses four pillars — Year, Month, Day, Hour — each with a Heavenly Stem and Earthly Branch, to reveal personality traits, strengths, challenges, and life patterns.",
  },
  {
    question: "How accurate is Ba Zi?",
    answer:
      "Ba Zi is a complex system with thousands of years of refinement. When calculated correctly with accurate birth information, it provides remarkably insightful personality profiles. However, Ba Zi should be viewed as a tool for self-reflection and personal growth rather than absolute fortune-telling. The quality of interpretation matters greatly — the same chart can yield different insights depending on the practitioner's skill.",
  },
  {
    question: "What do I need to calculate my Ba Zi chart?",
    answer:
      'You need your birth date (year, month, day), birth time (hour and minute), and birth location. The birth time is especially important because the Hour Pillar changes every two hours. If you don\'t know your birth time, it\'s still possible to generate a partial chart using our <a href="/bazi">Ba Zi calculator</a>.',
  },
  {
    question: "Do I need to know my birth time?",
    answer:
      'While knowing your birth time gives the most accurate results, you can still get a meaningful reading without it. Without a birth time, the Hour Pillar cannot be determined, but the Year, Month, and Day Pillars — which contain most of the personality information — can still be calculated. Try our <a href="/bazi">free Ba Zi calculator</a> to see your chart.',
  },
  {
    question: "What is a Day Master?",
    answer:
      'The Day Master (日主) is the Heavenly Stem of your Day Pillar — the most important element in your Ba Zi chart. It represents your core self, fundamental personality, and innate nature. There are 10 possible Day Masters, one for each Heavenly Stem: Jia (Yang Wood), Yi (Yin Wood), Bing (Yang Fire), Ding (Yin Fire), Wu (Yang Earth), Ji (Yin Earth), Geng (Yang Metal), Xin (Yin Metal), Ren (Yang Water), and Gui (Yin Water). <a href="/learn/day-pillars">Learn more about your Day Master</a>.',
  },
  {
    question: "What are the Five Elements in Ba Zi?",
    answer:
      'The Five Elements (五行 / Wu Xing) are Wood, Fire, Earth, Metal, and Water. They interact in two cycles: the Generating Cycle (Wood → Fire → Earth → Metal → Water → Wood) and the Controlling Cycle (Wood → Earth → Water → Fire → Metal → Wood). The balance of these elements in your Ba Zi chart determines your personality tendencies. Explore the <a href="/five-elements">Five Elements in detail</a>.',
  },
  {
    question: "How do I find my Chinese zodiac animal?",
    answer:
      'Your Chinese zodiac animal sign is determined by your birth year. Use our <a href="/birth-year">Birth Year Guide</a> to find your animal. The 12 animals are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Note that Chinese New Year varies each year.',
  },
  {
    question: "What is Chinese zodiac compatibility based on?",
    answer:
      'Chinese zodiac compatibility is based on the relationships between the 12 Earthly Branches (animals). The Six Harmonies (六合) represent the strongest matches (e.g., Rat & Ox, Tiger & Pig). Check the <a href="/zodiac/compatibility">Zodiac Compatibility Chart</a> to see how your sign matches with others.',
  },
  {
    question: "Does my Ba Zi chart change over time?",
    answer:
      "Your birth chart itself remains fixed — it's the blueprint you were born with. However, your Great Luck Cycles (大运) change every 10 years, bringing different elemental influences into your life. Additionally, each year's energy (annual Ba Zi) interacts with your birth chart, creating favorable or challenging periods.",
  },
  {
    question: "What are Great Luck Cycles?",
    answer:
      "Great Luck Cycles (大运 / Da Yun) are 10-year periods in your life, each governed by a specific Heavenly Stem and Earthly Branch. These cycles show the rising and falling fortunes throughout your life. The first cycle begins in childhood, and each subsequent decade brings a different energetic theme.",
  },
  {
    question: "What is the difference between Ba Zi and Zi Wei Dou Shu?",
    answer:
      "Ba Zi and Zi Wei Dou Shu (Purple Star Astrology) are two different Chinese metaphysical systems. Ba Zi uses Heavenly Stems and Earthly Branches across four pillars. Zi Wei Dou Shu uses a more complex chart with 12 palaces based on star positions at birth. Many practitioners use both for complementary insights.",
  },
  {
    question: "Is Ba Zi religious?",
    answer:
      "No, Ba Zi is not a religion. It's a system of Chinese metaphysics and natural philosophy based on observations of nature, the Five Elements, and Yin-Yang theory. People of all religious backgrounds can use Ba Zi as a tool for self-understanding and personal development.",
  },
  {
    question: "When does Chinese New Year 2026 start?",
    answer:
      'Chinese New Year 2026 is on February 17, 2026, starting the <a href="/2026-year-of-the-horse">Year of the Fire Horse</a>. Chinese New Year follows the lunisolar calendar and falls between January 21 and February 20 each year.',
  },
  {
    question: "Can Ba Zi predict my future?",
    answer:
      "Ba Zi reveals your innate tendencies, strengths, and challenges — think of it as a life blueprint rather than a fortune-telling system. It can indicate favorable periods for certain activities based on how annual energies interact with your birth chart. However, free will and personal choices always play the deciding role.",
  },
  {
    question: "How do I start learning Ba Zi?",
    answer:
      'Start by <a href="/bazi">calculating your own Ba Zi chart</a> to see your Four Pillars firsthand. Then explore <a href="/learn/heavenly-stems">Heavenly Stems</a> and <a href="/learn/earthly-branches">Earthly Branches</a>. Our <a href="/learn/glossary">glossary of Ba Zi terms</a> is a helpful reference as you learn.',
  },
  {
    question: "What are Yin and Yang in Ba Zi?",
    answer:
      "In Ba Zi, Yin and Yang represent complementary forces. Each of the 10 Heavenly Stems has a Yin or Yang polarity (e.g., Jia is Yang Wood, Yi is Yin Wood). Yang Stems tend to be outward and assertive, while Yin Stems are inward and intuitive.",
  },
  {
    question: "What are Hidden Stems (藏干)?",
    answer:
      "Hidden Stems (藏干 / Zang Gan) are the Heavenly Stems hidden within each Earthly Branch. Every Earthly Branch contains 1-3 hidden Stems, representing deeper influences not immediately visible on the surface of your chart. These hidden energies often reveal underlying talents and subconscious patterns.",
  },
  {
    question: "How does Feng Shui relate to Ba Zi?",
    answer:
      "Feng Shui and Ba Zi are complementary branches of Chinese metaphysics. While Ba Zi analyzes your personal destiny based on birth time, Feng Shui harmonizes your living environment. Your Ba Zi chart can guide which Feng Shui enhancements are most beneficial based on your element balance.",
  },
  {
    question: "What is the 2026 zodiac forecast for my sign?",
    answer:
      'The Year of the Fire Horse (2026) brings dynamic energy for all zodiac signs. Some signs will experience great opportunities while others should exercise caution. Read the <a href="/zodiac/2026">2026 Chinese Zodiac Forecast</a> for your sign\'s predictions and guidance.',
  },
  {
    question: "Can Ba Zi guide my career choices?",
    answer:
      'Yes! Your Day Master and the Ten Gods (十神) reveal your natural career inclinations. Strong Fire elements often excel in leadership, while Metal suits analytical fields. Learn more in our <a href="/blog/bazi-career-guidance-day-master">Ba Zi career guidance guide</a>.',
  },
];

export default function FaqPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn/glossary" },
    { label: "FAQ" },
  ];

  const sections = [
    { title: "Ba Zi Basics", items: FAQ_ITEMS.slice(0, 5) },
    { title: "Elements & Zodiac", items: FAQ_ITEMS.slice(5, 10) },
    { title: "Advanced Topics", items: FAQ_ITEMS.slice(10) },
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(faqSchema(FAQ_ITEMS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbSchema(
              breadcrumbItems.map((b) => ({ label: b.label, href: b.href || "" }))
            )
          ),
        }}
      />

      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl font-bold tracking-tight mb-4">Ba Zi FAQ</h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Find answers to the most common questions about Ba Zi, Chinese
            zodiac, Five Elements, and how to understand your destiny chart.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-zinc-200 bg-white overflow-hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
                      <span>{item.question}</span>
                      <svg
                        className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="border-t border-zinc-100 px-5 py-4">
                      <p
                        className="text-sm text-zinc-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: item.answer.replace(
                            /<a\s+href/g,
                            '<a class="text-red-600 hover:underline" href'
                          ),
                        }}
                      />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            Still Have Questions?
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Explore our guides or calculate your Ba Zi chart to learn more.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/bazi"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
            >
              Calculate Your Ba Zi
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:border-zinc-300 transition-colors"
            >
              Read Our Blog
            </Link>
            <Link
              href="/learn/glossary"
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:border-zinc-300 transition-colors"
            >
              Browse Glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
