import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBirthYearContent, ALL_BIRTH_YEARS } from "@/lib/birth-year-content";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, faqSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_BIRTH_YEARS.map((y) => ({ slug: String(y.year) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const year = parseInt(slug, 10);
  if (isNaN(year)) return { title: "Not Found" };
  const info = getBirthYearContent(year);
  if (!info) return { title: "Not Found" };

  return {
    title: `${year} Chinese Zodiac: ${info.animal} · ${info.element} ${info.stemBranch} (${info.stemBranchEn})`,
    description: `Born in ${year}? Your Chinese zodiac sign is ${info.animal} with ${info.element} element (${info.stemBranch}). Discover your personality, career, love, and health profile.`,
    openGraph: {
      title: `${year} Birth Year Guide — ${info.animal} · ${info.stemBranchEn}`,
      description: `What ${year} reveals about you: ${info.content.summary.substring(0, 120)}`,
    },
  };
}

const ELEMENT_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  Wood: { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700" },
  Fire: { bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-700" },
  Earth: { bg: "bg-amber-50", text: "text-amber-700", badge: "bg-amber-100 text-amber-700" },
  Metal: { bg: "bg-zinc-50", text: "text-zinc-700", badge: "bg-zinc-100 text-zinc-700" },
  Water: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
};

export default async function BirthYearDetailPage({ params }: Props) {
  const { slug } = await params;
  const year = parseInt(slug, 10);
  if (isNaN(year)) notFound();
  const info = getBirthYearContent(year);
  if (!info) notFound();

  const { content } = info;
  const ec = ELEMENT_COLORS[info.element] || ELEMENT_COLORS.Wood;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === info.animalKey);

  // Find other years with the same stem-branch combination
  const sameCombinationYears = ALL_BIRTH_YEARS.filter(
    (y) => y.stemBranch === info.stemBranch && y.year !== year
  );

  // Adjacent years for navigation
  const prevYear = ALL_BIRTH_YEARS.find((y) => y.year === year - 1);
  const nextYear = ALL_BIRTH_YEARS.find((y) => y.year === year + 1);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Birth Year Guide", href: "/birth-year" },
    { label: `${year}: ${info.animal}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema([
          {
            question: `What is my Chinese zodiac sign if I was born in ${year}?`,
            answer: `If you were born in ${year}, your Chinese zodiac sign is ${info.animal}. The ${info.animal} is associated with the ${info.element} element and the ${info.stemBranch} (${info.stemBranchEn}) stem-branch combination. In the 12-year Chinese zodiac cycle, ${year} is a ${info.animal} year.`
          },
          {
            question: `What element is associated with ${year} in Chinese astrology?`,
            answer: `The year ${year} is associated with the ${info.element} element. In Ba Zi (Four Pillars of Destiny), ${year} has the Heavenly Stem ${info.stem} (${info.stemEn}, ${info.element}) and the Earthly Branch ${info.branch} (${info.branchEn}, ${info.animal}). The ${info.element} element influences the personality traits, career tendencies, and compatibility of people born this year.`
          },
          {
            question: `What are the personality traits of ${info.animal} born in ${year}?`,
            answer: `People born in the Year of the ${info.animal} (${year}) are known for ${info.content.personality.slice(0, 3).join(", ")}. Their ${info.element} element ${year === new Date().getFullYear() ? "this year" : "in " + year} adds specific qualities to their character, making them ${info.yinYang === "Yang" ? "outgoing and expressive" : "reflective and intuitive"} in nature.`
          },
          {
            question: `Which zodiac signs are compatible with ${info.animal}?`,
            answer: `${info.animal} are most compatible with ${info.content.compatibleAnimals.join(", ")}. They may face challenges with ${info.content.incompatibleAnimals.join(", ")}. In Chinese zodiac compatibility, animals that are 4 years apart in the 12-year cycle are considered ideal matches, forming what is known as a "secret friend" relationship.`
          },
          {
            question: `What does ${info.stemBranch} (${info.stemBranchEn}) mean in Ba Zi?`,
            answer: `${info.stemBranch} is one of the 60 stem-branch combinations in the Chinese sexagenary cycle. ${info.stem} (${info.stemEn}) is the Heavenly Stem representing ${info.element} ${info.yinYang} energy, and ${info.branch} (${info.branchEn} - ${info.animal}) is the Earthly Branch. Together, they form the cosmic energy of ${year}, influencing the personality, fortune, and life path of those born in this year.`
          },
        ])) }}
      />
      <Breadcrumb items={breadcrumbItems} />
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/birth-year" className="text-xs text-zinc-400 hover:text-zinc-600">
          ← All Birth Years
        </Link>
        <div className="flex gap-2 text-xs">
          {prevYear ? (
            <Link href={`/birth-year/${prevYear.year}`} className="text-zinc-400 hover:text-zinc-600">
              ← {prevYear.year}
            </Link>
          ) : <span />}
          {nextYear ? (
            <Link href={`/birth-year/${nextYear.year}`} className="text-zinc-400 hover:text-zinc-600">
              {nextYear.year} →
            </Link>
          ) : <span />}
        </div>
      </div>

      {/* Header */}
      <div className={`rounded-xl border ${ec.bg} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl shrink-0">{sign?.animal.substring(0, 1) || info.animal}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">{year}: {info.animal}</h1>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ec.badge}`}>
                {info.element}
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              {info.stemBranch} ({info.stemBranchEn}) · {info.yinYang} · {info.element} Element
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              Heavenly Stem: {info.stem} ({info.stemEn}) · Earthly Branch: {info.branch} ({info.branchEn})
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-700 leading-relaxed">{content.summary}</p>
      </div>

      {/* Personality */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">🧬 Personality Traits</h2>
        <ul className="space-y-2">
          {content.personality.map((trait, i) => (
            <li key={i} className="text-sm text-zinc-600 flex items-start gap-2">
              <span className="text-zinc-300 mt-0.5">•</span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Career, Love, Health */}
      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">💼 Career</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{content.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">❤️ Love</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{content.love}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1">🏃 Health</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{content.health}</p>
        </div>
      </div>

      {/* Lucky info */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold text-amber-800 mb-2">🍀 Lucky Items</h3>
            <div className="space-y-1 text-xs">
              <p><span className="text-amber-600">Colors:</span> <span className="text-amber-800 font-medium">{content.luckyColors.join(", ")}</span></p>
              <p><span className="text-amber-600">Numbers:</span> <span className="text-amber-800 font-medium">{content.luckyNumbers.join(", ")}</span></p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-amber-800 mb-2">🤝 Compatibility</h3>
            <div className="space-y-1 text-xs">
              <p><span className="text-amber-600">Best matches:</span> <span className="text-amber-800 font-medium">{content.compatibleAnimals.join(", ")}</span></p>
              <p><span className="text-amber-600">Challenging:</span> <span className="text-amber-800 font-medium">{content.incompatibleAnimals.join(", ")}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Same combination years */}
      {sameCombinationYears.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 mb-4">
          <h3 className="text-xs font-semibold text-zinc-700 mb-2">Same Energy: Other {info.stemBranch} ({info.stemBranchEn}) Years</h3>
          <p className="text-xs text-zinc-500 mb-2">
            The {info.stemBranch} (Wood {info.animal}) combination appears once every 60 years.
            People born in these years share the same cosmic energy:
          </p>
          <div className="flex flex-wrap gap-2">
            {sameCombinationYears.map((y) => (
              <Link
                key={y.year}
                href={`/birth-year/${y.year}`}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600 hover:border-zinc-400 transition-colors"
              >
                {y.year}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Famous people */}
      {content.famous.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 mb-4">
          <h3 className="text-xs font-semibold text-zinc-900 mb-2">⭐ Famous People Born in {info.stemBranchEn} Years</h3>
          <div className="flex flex-wrap gap-2">
            {content.famous.map((name, i) => (
              <span key={i} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related links */}
      <div className="border-t border-zinc-200 pt-6 mt-6">
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          {sign && (
            <Link href={`/zodiac/${sign.key}`} className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
              <span className="font-medium text-zinc-800">{info.animal} Zodiac</span>
              <span className="block text-zinc-400 mt-0.5">Learn all about the {info.animal} personality</span>
            </Link>
          )}
          {sign && (
            <Link href={`/zodiac/${sign.key}/compatibility`} className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
              <span className="font-medium text-zinc-800">{info.animal} Compatibility</span>
              <span className="block text-zinc-400 mt-0.5">See how {info.animal} pairs with other signs</span>
            </Link>
          )}
          <Link href={`/zodiac/2026/${info.animalKey}`} className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">{info.animal} 2026 Horoscope</span>
            <span className="block text-zinc-400 mt-0.5">What the Fire Horse year holds for {info.animal}</span>
          </Link>
          <Link href="/bazi" className="rounded-lg border border-zinc-200 p-3 text-zinc-600 hover:border-zinc-400 transition-colors">
            <span className="font-medium text-zinc-800">Your Ba Zi Chart</span>
            <span className="block text-zinc-400 mt-0.5">Get a personalized Four Pillars reading</span>
          </Link>
        </div>
      </div>

      {/* Birth year index */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h3 className="text-sm font-semibold text-zinc-700 mb-3">📅 Birth Year Index (1900–2030)</h3>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {ALL_BIRTH_YEARS.filter(y => y.year <= 2030).map((y) => (
            <Link
              key={y.year}
              href={`/birth-year/${y.year}`}
              className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                y.year === year
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {y.year}
            </Link>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs">
          <Link
            href={`/birth-year/${year - 1}`}
            className="text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            ← Previous Year
          </Link>
          <Link href="/birth-year" className="text-zinc-500 hover:text-zinc-700 transition-colors">
            All Birth Years
          </Link>
          <Link
            href={`/birth-year/${year + 1}`}
            className="text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            Next Year →
          </Link>
        </div>
      </div>
    </div>
  );
}
