"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateBaZi } from "@/lib/bazi-engine";
import { generateTemplateReading } from "@/lib/ai";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import BaziChart from "@/components/BaziChart";
import ReportView from "@/components/ReportView";
import DonateButton from "@/components/DonateButton";
import BookAffiliates from "@/components/BookAffiliates";
import PremiumReport from "@/components/PremiumReport";
import AdSlot from "@/components/AdSlot";

export default function BaziResultClient() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const { result, reading } = useMemo(() => {
    const year = parseInt(searchParams.get("year") || "1990");
    const month = parseInt(searchParams.get("month") || "1");
    const day = parseInt(searchParams.get("day") || "1");
    const hour = parseInt(searchParams.get("hour") || "12");
    const minute = parseInt(searchParams.get("minute") || "0");
    const gender = (searchParams.get("gender") || "male") as "male" | "female";

    if (!year || !month || !day) {
      return { result: null, reading: "Please provide valid birth details." };
    }

    const result = calculateBaZi({ year, month, day, hour, minute, gender });
    const reading = generateTemplateReading(result);
    return { result, reading };
  }, [searchParams]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://thebazi.com/bazi";

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }

  if (!result) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Invalid birth details. Please go back and try again.
      </div>
    );
  }

  const animalSign = CHINESE_ZODIAC_SIGNS.find(
    (s) => s.animal.toLowerCase() === result.zodiacAnimal.toLowerCase()
  );

  return (
    <div className="space-y-8">
      <BaziChart result={result} />
      <ReportView result={result} initialReading={reading} />

      {/* Share */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="mb-3 text-center text-xs font-medium text-zinc-500">Share Your Reading</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just got my Ba Zi reading! Check yours at")}&url=${encodeURIComponent(shareUrl)}`, "_blank")}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Share on X
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Share on Facebook
          </button>
          <button
            onClick={copyShareLink}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Related Content */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold">Learn More About Your Chart</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/zodiac/${result.zodiacAnimal.toLowerCase()}`}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            About {result.zodiacAnimal}
          </Link>
          <Link
            href="/five-elements"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            Five Elements Guide
          </Link>
          <Link
            href="/learn/heavenly-stems"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            Heavenly Stems
          </Link>
          <Link
            href="/learn/earthly-branches"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            Earthly Branches
          </Link>
          {animalSign && (
            <Link
              href={`/zodiac/${animalSign.key}/compatibility`}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
            >
              {result.zodiacAnimal} Compatibility
            </Link>
          )}
          <Link
            href="/zodiac/2026"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            2026 Horoscope
          </Link>
          <Link
            href="/birth-year"
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
          >
            Birth Year Guide
          </Link>
        </div>
      </div>

      {/* Ad placement */}
      <AdSlot format="banner" />

      <div className="border-t border-zinc-200 pt-8 text-center">
        <p className="text-sm text-zinc-500 mb-3">
          Enjoyed your reading? Support this free tool!
        </p>
        <DonateButton />
      </div>

      <PremiumReport baZiResult={result} />
      <BookAffiliates />
    </div>
  );
}
