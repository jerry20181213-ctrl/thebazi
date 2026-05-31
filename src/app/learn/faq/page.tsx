import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { faqSchema, breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Ba Zi FAQ — Frequently Asked Questions About Four Pillars of Destiny",
  description: "Find answers to common questions about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, and how to interpret your destiny chart.",
  openGraph: {
    title: "Ba Zi FAQ — Frequently Asked Questions",
    description: "Answers to common questions about Ba Zi and Chinese astrology.",
  },
};

const FAQ_ITEMS = [
  {
    question: "What is Ba Zi (Four Pillars of Destiny)?",
    answer: "Ba Zi (八字), meaning 'Eight Characters,' is an ancient Chinese metaphysical system that analyzes a person's life blueprint based on their birth date and time. It uses four pillars — Year, Month, Day, Hour — each with a Heavenly Stem and Earthly Branch, to reveal personality traits, strengths, challenges, and life patterns.",
  },
  {
    question: "How accurate is Ba Zi?",
    answer: "Ba Zi is a complex system with thousands of years of refinement. When calculated correctly with accurate birth information, it provides remarkably insightful personality profiles. However, Ba Zi should be viewed as a tool for self-reflection and personal growth rather than absolute fortune-telling. The quality of interpretation matters greatly — the same chart can yield different insights depending on the practitioner's skill.",
  },
  {
    question: "What do I need to calculate my Ba Zi chart?",
    answer: "You need your birth date (year, month, day), birth time (hour and minute), and birth location. The birth time is especially important because the Hour Pillar changes every two hours. If you don't know your birth time, it's still possible to generate a partial chart using our Ba Zi calculator.",
  },
  {
    question: "Do I need to know my birth time?",
    answer: "While knowing your birth time gives the most accurate results, you can still get a meaningful reading without it. Without a birth time, the Hour Pillar cannot be determined, but the Year, Month, and Day Pillars — which contain most of the personality information — can still be calculated. Try our free Ba Zi calculator to see your chart.",
  },
  {
    question: "What is a Day Master?",
    answer: "The Day Master (日主) is the Heavenly Stem of your Day Pillar — the most important element in your Ba Zi chart. It represents your core self, fundamental personality, and innate nature. There are 10 possible Day Masters, one for each Heavenly Stem: Jia (Yang Wood), Yi (Yin Wood), Bing (Yang Fire), Ding (Yin Fire), Wu (Yang Earth), Ji (Yin Earth), Geng (Yang Metal), Xin (Yin Metal), Ren (Yang Water), and Gui (Yin Water). Learn more about your Day Master.",
  },
  {
    question: "What are the Five Elements in Ba Zi?",
    answer: "The Five Elements (五行 / Wu Xing) are Wood, Fire, Earth, Metal, and Water. They interact in two cycles: the Generating Cycle (Wood → Fire → Earth → Metal → Water → Wood) and the Controlling Cycle (Wood → Earth → Water → Fire → Metal → Wood). The balance of these elements in your Ba Zi chart determines your personality tendencies and life patterns.",
  },
  {
    question: "How do I find my Chinese zodiac animal?",
    answer: "Your Chinese zodiac animal is determined by your birth year's Earthly Branch. You can look up your birth year in our Birth Year Guide to find your animal sign. The 12 animals are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Note that Chinese New Year varies each year, so if you were born in January or February, your animal may differ from the standard Western year assignment.",
  },
  {
    question: "What is Chinese zodiac compatibility based on?",
    answer: "Chinese zodiac compatibility is based on the relationships between the 12 Earthly Branches (animals). The Six Harmonies (六合) represent the strongest matches (e.g., Rat & Ox, Tiger & Pig). There are also Triplet Harmony groups and conflicting relationships (相冲). For a complete analysis, factors like the Five Elements and Day Pillars are also considered.",
  },
  {
    question: "Does my Ba Zi chart change over time?",
    answer: "Your birth chart itself remains fixed — it's the blueprint you were born with. However, your Great Luck Cycles (大运) change every 10 years, bringing different elemental influences into your life. Additionally, each year's energy (annual Ba Zi) interacts with your birth chart, creating favorable or challenging periods. This is why your fortunes may shift from year to year.",
  },
  {
    question: "What are Great Luck Cycles?",
    answer: "Great Luck Cycles (大运 / Da Yun) are 10-year periods in your life, each governed by a specific Heavenly Stem and Earthly Branch. These cycles show the rising and falling fortunes throughout your life. The first cycle begins in childhood, and each subsequent decade brings a different energetic theme that activates different aspects of your birth chart.",
  },
  {
    question: "What is the difference between Ba Zi and Zi Wei Dou Shu?",
    answer: "Ba Zi (Four Pillars of Destiny) and Zi Wei Dou Shu (Purple Star Astrology) are two different Chinese metaphysical systems. Ba Zi is based on your birth date and time, using Heavenly Stems and Earthly Branches across four pillars. Zi Wei Dou Shu is based on the position of stars at your birth, using a more complex chart with 12 palaces. Many practitioners use both systems for complementary insights.",
  },
  {
    question: "Is Ba Zi religious?",
    answer: "No, Ba Zi is not a religion. It's a system of Chinese metaphysics and natural philosophy based on observations of nature, the Five Elements, and Yin-Yang theory. People of all religious backgrounds can use Ba Zi as a tool for self-understanding and personal development.",
  },
  {
    question: "When does the Chinese New Year start?",
    answer: "Chinese New Year follows the lunisolar calendar and falls between January 21 and February 20 each year. For example, 2026 Chinese New Year is on February 17, 2026 (starting the Year of the Horse). When looking up your Chinese zodiac sign, make sure to check whether your birthday falls before or after Chinese New Year in your birth year.",
  },
  {
    question: "Can Ba Zi predict my future?",
    answer: "Ba Zi reveals your innate tendencies, strengths, and challenges — think of it as a life blueprint rather than a fortune-telling system. It can indicate favorable periods for certain activities (career moves, relationships, investments) based on how annual energies interact with your birth chart. However, free will and personal choices always play the deciding role in your life outcomes.",
  },
  {
    question: "How do I start learning Ba Zi?",
    answer: "Start by calculating your own Ba Zi chart to see your Four Pillars firsthand. Then explore your Day Master, the Heavenly Stems, and the Earthly Branches. Understanding the Five Elements is essential — learn the Generating and Controlling cycles. Our glossary of Ba Zi terms is a helpful reference as you encounter new concepts.",
  },
];

export default function FaqPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn/glossary" },
    { label: "FAQ" },
  ];

  // Group FAQ items into thematic sections
  const sections = [
    {
      title: "Ba Zi Basics",
      items: FAQ_ITEMS.slice(0, 5),
    },
    {
      title: "Elements & Zodiac",
      items: FAQ_ITEMS.slice(5, 10),
    },
    {
      title: "Advanced Topics",
      items: FAQ_ITEMS.slice(10),
    },
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
          __html: jsonLdScript(breadcrumbSchema(breadcrumbItems.map((b) => ({ label: b.label, href: b.href || "" })))),
        }}
      />

      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Ba Zi FAQ
          </h1>
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

      {/* Still have questions */}
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
