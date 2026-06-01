import type { Metadata } from "next";
import Link from "next/link";
import { ANIMALS, ANIMAL_NAMES, getPairCompatibility, getSixHarmonies, getTriadGroups, getClashes, getRelationshipEmoji, getRelationshipLabel, ratingToStars } from "@/lib/zodiac-compatibility";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "生肖配對 — 十二生肖愛情、事業與友誼配對" : "Chinese Zodiac Compatibility — Love & Friendship Matches",
    description: isZh
      ? "查看十二生肖之間的配對關係，找到你的最佳愛情配對、事業夥伴和朋友。了解六合、三合和六沖的古老智慧。"
      : "Discover the compatibility between all 12 Chinese zodiac signs. Find your best love matches, friendship matches, and understand the ancient principles of Six Harmony, Triad Harmony, and Six Clash.",
    openGraph: {
      title: isZh ? "生肖配對圖表" : "Chinese Zodiac Compatibility Chart",
      description: isZh ? "十二生肖愛情和友誼配對完整指南。" : "Complete guide to Chinese zodiac love and friendship compatibility.",
    },
  };
}

const ELEMENT_COLORS: Record<string, string> = {
  rat: "bg-blue-50 text-blue-700", ox: "bg-amber-50 text-amber-700",
  tiger: "bg-green-50 text-green-700", rabbit: "bg-green-50 text-green-700",
  dragon: "bg-amber-50 text-amber-700", snake: "bg-red-50 text-red-700",
  horse: "bg-red-50 text-red-700", goat: "bg-amber-50 text-amber-700",
  monkey: "bg-zinc-50 text-zinc-700", rooster: "bg-zinc-50 text-zinc-700",
  dog: "bg-amber-50 text-amber-700", pig: "bg-blue-50 text-blue-700",
};

export default function CompatibilityPage() {
  const harmonies = getSixHarmonies();
  const triads = getTriadGroups();
  const clashes = getClashes();

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Zodiac", href: "/zodiac" },
          { label: "Compatibility" },
        ])) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Zodiac", href: "/zodiac" },
            { label: "Compatibility" },
          ]} />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Chinese Zodiac Compatibility
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 max-w-2xl mx-auto">
            The Chinese zodiac has a sophisticated system for understanding relationships.
            Based on the interaction of the 12 animals, some signs naturally harmonize while
            others clash. Discover which signs are your best matches in love, friendship, and career.
          </p>
        </div>
      </section>

      {/* Full Compatibility Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-4">Compatibility Chart</h2>
          <p className="text-sm text-zinc-500 mb-6">★ = Poor &nbsp;&nbsp; ★★★ = Neutral &nbsp;&nbsp; ★★★★★ = Best Match</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium text-zinc-500 text-xs"></th>
                  {ANIMALS.map((a) => (
                    <th key={a} className="p-2 text-center font-medium">
                      <span className={`inline-block rounded-md px-2 py-1 text-xs ${ELEMENT_COLORS[a]}`}>
                        {ANIMAL_NAMES[a]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ANIMALS.map((row, i) => (
                  <tr key={row}>
                    <td className={`p-2 font-medium text-xs whitespace-nowrap ${ELEMENT_COLORS[row]}`}>
                      {ANIMAL_NAMES[row]}
                    </td>
                    {ANIMALS.map((col, j) => {
                      if (i === j) {
                        return <td key={col} className="p-2 text-center text-zinc-200 text-xs bg-zinc-50 rounded-full">—</td>;
                      }
                      const pair = getPairCompatibility(row, col);
                      return (
                        <td key={col} className={`p-2 text-center ${pair.rating >= 4 ? "bg-green-50" : pair.rating <= 2 ? "bg-red-50" : "bg-amber-50"}`}>
                          <Link
                            href={`/zodiac/compatibility/${pair.pairKey}`}
                            className="block text-xs hover:opacity-70 transition-opacity"
                          >
                            <span className="text-lg block">{getRelationshipEmoji(pair.relationship)}</span>
                            <span className="text-xs">{ratingToStars(pair.rating)}</span>
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Six Harmonies */}
      <section className="bg-zinc-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-2">💖 Six Harmony (六合) — Best Matches</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Six Harmony pairs are considered the most compatible matches in the Chinese zodiac.
            These pairs naturally complement each other and create balanced, harmonious relationships.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {harmonies.map((pair) => (
              <Link
                key={pair.pairKey}
                href={`/zodiac/compatibility/${pair.pairKey}`}
                className="rounded-xl border border-green-200 bg-white p-4 transition-colors hover:border-green-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRelationshipEmoji(pair.relationship)}</span>
                  <div>
                    <span className="font-semibold text-zinc-900">
                      {ANIMAL_NAMES[pair.signs[0]]} + {ANIMAL_NAMES[pair.signs[1]]}
                    </span>
                    <div className="text-xs text-amber-600">{ratingToStars(pair.rating)}</div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{pair.love}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Triad Harmonies */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-2">💚 Triad Harmony (三合) — Strong Matches</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Signs within the same Triad group share complementary energies and make excellent
            friends, partners, and collaborators.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {triads.map((triad) => (
              <div key={triad.group.join("-")} className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="font-semibold text-zinc-900 mb-3">
                  {triad.group.map((s) => ANIMAL_NAMES[s]).join(" · ")}
                </h3>
                <div className="space-y-3">
                  {triad.pairs.map((pair) => (
                    <Link
                      key={pair.pairKey}
                      href={`/zodiac/compatibility/${pair.pairKey}`}
                      className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm transition-colors hover:bg-green-50"
                    >
                      <span>{getRelationshipEmoji(pair.relationship)}</span>
                      <span className="font-medium text-zinc-700">
                        {ANIMAL_NAMES[pair.signs[0]]} + {ANIMAL_NAMES[pair.signs[1]]}
                      </span>
                      <span className="text-xs text-zinc-400 ml-auto">{ratingToStars(pair.rating)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Clashes */}
      <section className="bg-zinc-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-2">💔 Six Clash (六冲) — Challenging Matches</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Six Clash pairs face the most challenges. These relationships require significant effort,
            patience, and understanding. But with work, they can also lead to tremendous growth.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clashes.map((pair) => (
              <Link
                key={pair.pairKey}
                href={`/zodiac/compatibility/${pair.pairKey}`}
                className="rounded-xl border border-red-200 bg-white p-4 transition-colors hover:border-red-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRelationshipEmoji(pair.relationship)}</span>
                  <div>
                    <span className="font-semibold text-zinc-900">
                      {ANIMAL_NAMES[pair.signs[0]]} + {ANIMAL_NAMES[pair.signs[1]]}
                    </span>
                    <div className="text-xs text-amber-600">{ratingToStars(pair.rating)}</div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{pair.challenges}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Per-sign links */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-4">Explore by Sign</h2>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4">
            {ANIMALS.map((sign) => (
              <Link
                key={sign}
                href={`/zodiac/${sign}/compatibility`}
                className="rounded-xl border border-zinc-200 bg-white p-4 text-center transition-colors hover:border-zinc-300"
              >
                <span className="font-medium text-zinc-900">{ANIMAL_NAMES[sign]} Compatibility</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-8 text-center">
        <p className="text-xs text-zinc-400 max-w-xl mx-auto">
          Chinese zodiac compatibility is based on traditional principles of the Five Elements
          and the interaction cycles. These interpretations are for entertainment and personal
          reflection purposes.
        </p>
      </section>
    </div>
  );
}
