"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { calculateBaZi } from "@/lib/bazi-engine";
import { generateTemplateReading } from "@/lib/ai";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import BaziChart from "@/components/BaziChart";
import ReportView from "@/components/ReportView";
import DonateButton from "@/components/DonateButton";
import BookAffiliates from "@/components/BookAffiliates";
import AdSlot from "@/components/AdSlot";
import SocialShare from "@/components/SocialShare";
import NewsletterPopup from "@/components/NewsletterPopup";
import { eventBaziCalculated, eventBaziShared, eventReadingSaved } from "@/lib/gtag-events";

export default function BaziResultClient() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const [saveError, setSaveError] = useState(false);

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

  // GA4: fire bazi_calculated once when the result is ready
  useEffect(() => {
    if (result) {
      eventBaziCalculated({
        animal: result.zodiacAnimal,
        dayMaster: result.dayPillar.stem,
        element: result.dayMasterElement,
        gender: searchParams.get("gender") || "male",
      });
    }
  }, [result, searchParams]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://thebazi.com/bazi";

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError(false);
    try {
      const body = {
        year: parseInt(searchParams.get("year") || "1990"),
        month: parseInt(searchParams.get("month") || "1"),
        day: parseInt(searchParams.get("day") || "1"),
        hour: parseInt(searchParams.get("hour") || "12"),
        minute: parseInt(searchParams.get("minute") || "0"),
        gender: (searchParams.get("gender") || "male") as "male" | "female",
        createdAt: new Date().toISOString(),
      };
      const res = await fetch("/api/reading/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setSavedCode(data.code);
      eventReadingSaved();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }, [searchParams]);

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

      {/* Save & Share */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="mb-3 text-center text-xs font-medium text-zinc-500">Save &amp; Share Your Reading</p>

        {!savedCode ? (
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-zinc-900 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "🔗 Save & Get Share Link"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-sm">
              <span className="text-zinc-500">thebazi.com/m/</span>
              <span className="font-mono font-bold text-zinc-900">{savedCode}</span>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`https://thebazi.com/m/${savedCode}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    eventBaziShared({ platform: "copy_link", has_saved_code: true });
                  } catch { /* ignore */ }
                }}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just got my Ba Zi reading! Check yours at")}&url=${encodeURIComponent(`https://thebazi.com/m/${savedCode}`)}`, "_blank");
                  eventBaziShared({ platform: "twitter", has_saved_code: true });
                }}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
              >
                Share on X
              </button>
              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://thebazi.com/m/${savedCode}`)}`, "_blank");
                  eventBaziShared({ platform: "facebook", has_saved_code: true });
                }}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 transition-colors hover:bg-zinc-50"
              >
                Share on FB
              </button>
            </div>
          </div>
        )}

        {saveError && (
          <p className="mt-2 text-center text-xs text-red-400">
            Could not save. Please try again.
          </p>
        )}
      </div>

      {/* Related Content + Share */}
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

      <div className="mt-4 border-t border-zinc-100 pt-4">
        <SocialShare url={savedCode ? `https://thebazi.com/m/${savedCode}` : shareUrl} title="I just got my Ba Zi reading!" />
      </div>

      {/* Ad placement */}
      <AdSlot format="banner" />

      {/* Donation section */}
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Enjoyed your reading? 🎉
        </p>
        <p className="mt-1 text-xs text-zinc-400 max-w-md mx-auto">
          This free Ba Zi tool is supported by readers like you.
          If you found it valuable, consider buying us a coffee!
        </p>
        <div className="mt-4">
          <DonateButton />
        </div>
      </div>

      {/* Premium report — coming soon */}
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
        <span className="inline-block rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Coming Soon
        </span>
        <h3 className="mt-3 text-lg font-bold text-zinc-700">Premium Ba Zi Report</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-zinc-500">
          An in-depth, AI-powered analysis of your career, love life, and fortune is in development.
          Stay tuned!
        </p>
      </div>

      <BookAffiliates />

      <NewsletterPopup source="bazi_result" />
    </div>
  );
}
