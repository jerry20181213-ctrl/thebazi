import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { ANIMAL_NAMES, getCompatibilitiesForSign, getRelationshipEmoji, getRelationshipLabel, ratingToStars } from "@/lib/zodiac-compatibility";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import { getCanonicalUrl } from "@/lib/canonical-url";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return CHINESE_ZODIAC_SIGNS.map((s) => ({ slug: s.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  if (!sign) return { title: "Not Found" };
  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "zodiac", slug, "compatibility"),
    },
    title: `${sign.animal} Zodiac Compatibility — Love, Career & Friendship Matches`,
    description: `See how the ${sign.animal} matches with all 11 other Chinese zodiac signs. Find the ${sign.animal}'s best love matches, career partners, and friends.`,
  };
}

function ratingBg(rating: number): string {
  if (rating >= 5) return "bg-green-50 border-green-200";
  if (rating >= 4) return "bg-green-50/50 border-green-200";
  if (rating <= 2) return "bg-red-50 border-red-200";
  return "bg-amber-50/50 border-amber-200";
}

function ratingBadge(rating: number): string {
  if (rating >= 5) return "bg-green-500";
  if (rating >= 4) return "bg-green-400";
  if (rating <= 2) return "bg-red-400";
  return "bg-amber-400";
}

export default async function SignCompatibilityPage({ params }: Props) {
  const { slug } = await params;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  if (!sign) notFound();

  const compatibilities = getCompatibilitiesForSign(slug);
  compatibilities.sort((a, b) => b.rating - a.rating);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Zodiac", href: "/zodiac" },
    { label: `${ANIMAL_NAMES[slug]}`, href: `/zodiac/${slug}` },
    { label: "Compatibility" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{ANIMAL_NAMES[slug]} Zodiac Compatibility</h1>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
          See how {ANIMAL_NAMES[slug]} pairs with each of the other 11 zodiac signs in love, career, and friendship.
          Discover your best matches and which relationships may need extra work.
        </p>
      </div>

      <div className="space-y-3">
        {compatibilities.map((pair) => {
          const otherSign = pair.signs[0] === slug ? pair.signs[1] : pair.signs[0];
          return (
            <Link
              key={pair.pairKey}
              href={`/zodiac/compatibility/${pair.pairKey}`}
              className={`block rounded-xl border p-4 transition-colors hover:shadow-sm ${ratingBg(pair.rating)}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl shrink-0">{getRelationshipEmoji(pair.relationship)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900">{ANIMAL_NAMES[otherSign]}</span>
                    <span className="text-xs text-zinc-400">{getRelationshipLabel(pair.relationship)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`h-1.5 rounded-full ${ratingBadge(pair.rating)}`} style={{ width: `${(pair.rating / 5) * 60}px` }} />
                    <span className="text-xs text-amber-600">{ratingToStars(pair.rating)}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{pair.love}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 text-center">
        <Link href="/zodiac/compatibility" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
          View Full Compatibility Chart →
        </Link>
      </div>
    </div>
  );
}
