import type { Metadata } from "next";
import Link from "next/link";
import { ALL_BIRTH_YEARS, BIRTH_YEAR_START, BIRTH_YEAR_END } from "@/lib/birth-year-content";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "出生年份指南 — 查詢你的生肖、五行與天干地支" : "Chinese Zodiac Birth Year Guide — What Your Birth Year Reveals",
    description: isZh
      ? "查詢1900年至2031年的任何出生年份，了解你的生肖、五行元素、天干地支及其揭示的性格和命運信息。"
      : "Look up any birth year from 1900 to 2031 to discover your Chinese zodiac sign, element, heavenly stem, earthly branch, and what they reveal about your personality and destiny.",
    openGraph: {
      title: isZh ? "出生年份指南 — 查詢你的生肖" : "Chinese Zodiac Birth Year Guide — Find Your Sign & Element",
      description: isZh ? "完整的出生年份參考，查詢你的生肖和八字天干地支。" : "Complete birth year reference for Chinese zodiac. Search any year to discover your animal sign, element, and Ba Zi stem-branch combination.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Chinese Zodiac Birth Year Guide" }],
    },
  };
}

const ANIMAL_EMOJI: Record<string, string> = {
  rat: "🐀", ox: "🐂", tiger: "🐅", rabbit: "🐇",
  dragon: "🐉", snake: "🐍", horse: "🐴", goat: "🐐",
  monkey: "🐒", rooster: "🐓", dog: "🐕", pig: "🐖",
};

export default function BirthYearIndexPage() {
  // Group by decade for display
  const decades: { label: string; years: typeof ALL_BIRTH_YEARS }[] = [];
  for (let d = Math.floor(BIRTH_YEAR_START / 10) * 10; d <= BIRTH_YEAR_END; d += 10) {
    const end = Math.min(d + 9, BIRTH_YEAR_END);
    const years = ALL_BIRTH_YEARS.filter((y) => y.year >= d && y.year <= end);
    if (years.length > 0) {
      decades.push({ label: `${d}s`, years });
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Birth Year Guide" },
        ])) }}
      />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Birth Year Guide" },
      ]} />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Chinese Zodiac Birth Year Guide
        </h1>
        <p className="mt-3 text-sm text-zinc-500 max-w-2xl mx-auto">
          Discover your Chinese zodiac sign, elemental personality, and heavenly stem-earthly branch
          combination. Each year carries a unique cosmic energy that shapes the character of those born within it.
        </p>
      </div>

      {/* Quick lookup table */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden mb-10">
        <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200">
          <h2 className="text-sm font-semibold text-zinc-700">Quick Birth Year Lookup</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Click any year to see your sign, element, and complete profile</p>
        </div>
        <div className="divide-y divide-zinc-100">
          {decades.map((decade) => (
            <div key={decade.label} className="px-5 py-3">
              <h3 className="text-xs font-semibold text-zinc-400 mb-2">{decade.label}</h3>
              <div className="flex flex-wrap gap-2">
                {decade.years.map((y) => (
                  <Link
                    key={y.year}
                    href={`/birth-year/${y.year}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1 text-xs hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-zinc-800 font-medium">{y.year}</span>
                    <span className="text-zinc-400">·</span>
                    <span>{ANIMAL_EMOJI[y.animalKey] || ""}</span>
                    <span className="text-zinc-500">{y.animal}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-400">{y.stemBranch}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="grid gap-6 sm:grid-cols-3 mb-10">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="text-lg mb-2">🔢</div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">1. Find Your Year</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Look up your birth year in the table above. Each year belongs to one of the 60 stem-branch combinations in the Chinese sexagenary cycle.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="text-lg mb-2">🀄</div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">2. Your Stem-Branch</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Each year pairs a Heavenly Stem (天干) with an Earthly Branch (地支). This combination defines the elemental energy of your birth year.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="text-lg mb-2">🧬</div>
          <h3 className="text-sm font-semibold text-zinc-900 mb-1">3. Your Element</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            The Heavenly Stem determines your birth year element — Wood, Fire, Earth, Metal, or Water — which reveals your core personality traits.
          </p>
        </div>
      </div>

      {/* Animal element reference */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-sm font-semibold text-zinc-700 mb-4">The 12 Zodiac Animals & Their Elements</h2>
        <p className="text-xs text-zinc-500 mb-4">
          Each zodiac animal cycles through all five elements over a 60-year cycle. The same animal
          can have different elemental expressions — for example, a Wood Rat is different from a Fire Rat.
        </p>
        <div className="grid gap-2 sm:grid-cols-4 text-xs">
          {[
            { animal: "Rat", years: [2020, 2008, 1996, 1984, 1972, 1960] },
            { animal: "Ox", years: [2021, 2009, 1997, 1985, 1973, 1961] },
            { animal: "Tiger", years: [2022, 2010, 1998, 1986, 1974, 1962] },
            { animal: "Rabbit", years: [2023, 2011, 1999, 1987, 1975, 1963] },
            { animal: "Dragon", years: [2024, 2012, 2000, 1988, 1976, 1964] },
            { animal: "Snake", years: [2025, 2013, 2001, 1989, 1977, 1965] },
            { animal: "Horse", years: [2026, 2014, 2002, 1990, 1978, 1966] },
            { animal: "Goat", years: [2027, 2015, 2003, 1991, 1979, 1967] },
            { animal: "Monkey", years: [2028, 2016, 2004, 1992, 1980, 1968] },
            { animal: "Rooster", years: [2029, 2017, 2005, 1993, 1981, 1969] },
            { animal: "Dog", years: [2030, 2018, 2006, 1994, 1982, 1970] },
            { animal: "Pig", years: [2031, 2019, 2007, 1995, 1983, 1971] },
          ].map((row) => (
            <div key={row.animal} className="rounded-lg bg-white border border-zinc-200 p-2.5">
              <span className="font-medium text-zinc-800">{row.animal}</span>
              <div className="text-zinc-400 mt-0.5">{row.years.join(", ")}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-4">
          Click any year above to see the specific elemental combination and complete personality profile for that birth year.
        </p>
      </div>
    </div>
  );
}
