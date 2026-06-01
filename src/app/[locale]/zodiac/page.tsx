import type { Metadata } from "next";
import Link from "next/link";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "十二生肖 — 性格、運勢與配對" : "Chinese Zodiac Signs",
    description: isZh
      ? "探索十二生肖的性格特質、五行元素和運勢。了解你的生肖配對和2026年運程預測。"
      : "Explore the 12 Chinese zodiac animals and discover the personality traits, elements, and fortunes of your sign.",
  };
}

export default function ZodiacPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Zodiac" },
        ])) }}
      />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Zodiac" },
      ]} />
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Chinese Zodiac Signs
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Each year is ruled by one of 12 animals. Click your sign to learn more.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {CHINESE_ZODIAC_SIGNS.map((sign) => (
          <Link key={sign.key} href={`/zodiac/${sign.key}`}>
            <Card className="h-full transition-colors hover:border-zinc-300">
              <CardHeader>
                <CardTitle className="text-lg">{sign.animal}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-400">
                  Years: {sign.years.slice(0, 3).join(", ")}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
