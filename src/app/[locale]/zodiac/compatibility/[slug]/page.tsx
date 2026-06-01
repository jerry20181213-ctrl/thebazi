import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ANIMALS, ANIMAL_NAMES, getPairCompatibility, getAllPairs, getRelationshipEmoji, getRelationshipLabel, ratingToStars } from "@/lib/zodiac-compatibility";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPairs().map((p) => ({ slug: p.pairKey }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-");
  if (parts.length !== 2 || !ANIMALS.includes(parts[0]) || !ANIMALS.includes(parts[1])) {
    return { title: "Compatibility Not Found" };
  }
  const pair = getPairCompatibility(parts[0], parts[1]);
  return {
    title: `${ANIMAL_NAMES[parts[0]]} and ${ANIMAL_NAMES[parts[1]]} — Chinese Zodiac Compatibility`,
    description: `${ANIMAL_NAMES[parts[0]]} and ${ANIMAL_NAMES[parts[1]]} zodiac compatibility: ${pair.love.substring(0, 100)}`,
  };
}

export default async function PairCompatibilityPage({ params }: Props) {
  const { slug } = await params;
  const parts = slug.split("-");
  if (parts.length !== 2 || !ANIMALS.includes(parts[0]) || !ANIMALS.includes(parts[1])) notFound();

  const pair = getPairCompatibility(parts[0], parts[1]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Zodiac", href: "/zodiac" },
    { label: "Compatibility", href: "/zodiac/compatibility" },
    { label: `${ANIMAL_NAMES[pair.signs[0]]} + ${ANIMAL_NAMES[pair.signs[1]]}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 mb-8 text-center">
        <div className="text-4xl mb-2">{getRelationshipEmoji(pair.relationship)}</div>
        <h1 className="text-3xl font-bold tracking-tight">
          {ANIMAL_NAMES[pair.signs[0]]} + {ANIMAL_NAMES[pair.signs[1]]}
        </h1>
        <div className="mt-2 flex items-center justify-center gap-3 text-sm">
          <span className="text-amber-500">{ratingToStars(pair.rating)}</span>
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs text-zinc-600">
            {getRelationshipLabel(pair.relationship)}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">💕 Love & Romance</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{pair.love}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">💼 Career & Business</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{pair.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">🤝 Friendship</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{pair.friendship}</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800 mb-2">⚠️ Challenges</h2>
          <p className="text-sm text-red-700 leading-relaxed">{pair.challenges}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="font-semibold text-green-800 mb-2">💡 Advice</h2>
          <p className="text-sm text-green-700 leading-relaxed">{pair.advice}</p>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/zodiac/${pair.signs[0]}/compatibility`}
            className="rounded-xl border border-zinc-200 p-4 text-center text-sm text-zinc-600 hover:border-zinc-300 transition-colors"
          >
            {ANIMAL_NAMES[pair.signs[0]]} with All Signs
          </Link>
          <Link
            href={`/zodiac/${pair.signs[1]}/compatibility`}
            className="rounded-xl border border-zinc-200 p-4 text-center text-sm text-zinc-600 hover:border-zinc-300 transition-colors"
          >
            {ANIMAL_NAMES[pair.signs[1]]} with All Signs
          </Link>
        </div>
      </div>
    </div>
  );
}
