"use client";

import { useState, useEffect, useMemo } from "react";
import type { BaZiResult } from "@/lib/bazi-engine";
import { generatePremiumReading, type PremiumReading } from "@/lib/premium-reading";
import PayPalButton from "./PayPalButton";

interface Props {
  baZiResult?: BaZiResult;
  className?: string;
}

export default function PremiumReport({ baZiResult, className = "" }: Props) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const [purchasedTier, setPurchasedTier] = useState<string | null>(null);

  // fingerprint: unique enough per chart to persist unlock state across page refreshes
  const chartFingerprint = useMemo(() => {
    if (!baZiResult) return "";
    return `bazi_premium_${baZiResult.dayMaster}_${baZiResult.zodiacAnimal}`;
  }, [baZiResult]);

  // Restore unlocked state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && chartFingerprint) {
      try {
        const stored = localStorage.getItem(chartFingerprint);
        if (stored === "true") {
          setUnlocked(true);
          setShowContent(true);
        }
      } catch { /* localStorage may be blocked */ }
    }
  }, [chartFingerprint]);

  const reading = useMemo(() => {
    if (!baZiResult) return null;
    return generatePremiumReading(baZiResult);
  }, [baZiResult]);

  function handlePaymentSuccess(tier: string) {
    setUnlocked(true);
    setShowContent(false);
    setJustPaid(true);
    setPurchasedTier(tier);
    setSelectedTier(null);
    setPaymentError("");

    // Persist to localStorage
    if (chartFingerprint) {
      try {
        localStorage.setItem(chartFingerprint, "true");
      } catch { /* ignore */ }
    }
  }

  function handlePaymentError(err: string) {
    setPaymentError(err);
  }

  // --- No BaZi result: show compact teaser (used elsewhere on the site) ---
  if (!baZiResult) {
    return (
      <div className={`rounded-xl border border-amber-200 bg-amber-50 p-6 text-center ${className}`}>
        <span className="inline-block rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-800 uppercase tracking-wide">
          Premium
        </span>
        <h3 className="mt-3 text-xl font-bold tracking-tight">Unlock Your Premium Ba Zi Report</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
          Get an in-depth, AI-powered analysis of your career, love life, and fortune.
        </p>
        <p className="mt-4 text-xs text-zinc-400">
          Calculate your Ba Zi chart first to unlock your premium reading.
        </p>
      </div>
    );
  }

  // --- Just paid: success confirmation ---
  if (justPaid && reading) {
    return (
      <div className={`rounded-xl border border-amber-200 bg-white ${className}`}>
        <div className="rounded-t-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-bold">Payment Successful!</h3>
          <p className="mt-1 text-sm text-white/80">
            {purchasedTier} — Thank you for your purchase
          </p>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-zinc-600">
            Your premium Ba Zi report is now unlocked. You can view it anytime — your purchase is saved to this browser.
          </p>
          <button
            onClick={() => { setJustPaid(false); setShowContent(true); }}
            className="mt-4 inline-block rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            View Your Premium Report →
          </button>
        </div>
      </div>
    );
  }

  // --- Unlocked: show premium content ---
  if (showContent && reading) {
    return (
      <div className={`rounded-xl border border-amber-200 bg-white ${className}`}>
        <div className="rounded-t-xl bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-center text-white">
          <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide">
            Premium
          </span>
          <h3 className="mt-2 text-xl font-bold">Your Premium Ba Zi Report</h3>
          <p className="mt-1 text-sm text-white/80">
            {baZiResult.dayMasterElement} Day Master · {baZiResult.zodiacAnimal}
            {purchasedTier && <span className="ml-2 inline-block rounded bg-white/10 px-2 py-0.5 text-[10px]">{purchasedTier}</span>}
          </p>
        </div>

        <div className="divide-y divide-zinc-100">
          <Section title="Core Element Deep Dive" content={reading.elementDeepDive} />
          <Section title="Pillar-by-Pillar Breakdown" content={reading.pillarBreakdown} />
          <Section title="Pillar Interactions" content={reading.pillarInteractions} />
          <Section title="Career & Wealth" content={reading.careerWealth} />
          <Section title="Love & Relationships" content={reading.loveRelationships} />
          <Section title="Health & Wellbeing" content={reading.health} />
          <Section title="2026 Yearly Forecast" content={reading.yearlyForecast} />
          <Section title="Elemental Balance" content={reading.elementalBalance} />
          <Section title="Feng Shui & Daily Practices" content={reading.fengShui} />
          <Section title="Hidden Palaces" content={reading.palaceInsights} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-50"
          >
            Save / Print
          </button>
          <span className="text-xs text-zinc-400">
            Report based on your Ba Zi chart · For entertainment purposes only
          </span>
        </div>
      </div>
    );
  }

  // --- Locked: show pricing tiers ---
  const TIERS = [
    {
      name: "Career",
      price: "$9.99",
      features: ["Deep career analysis", "Lucky directions & industries", "Best timing for job changes", "Wealth potential insights"],
    },
    {
      name: "Love & Relationships",
      price: "$9.99",
      features: ["Relationship compatibility", "Emotional patterns", "Ideal partner profile", "Relationship timing"],
    },
    {
      name: "Complete Bundle",
      price: "$14.99",
      popular: true,
      features: ["Career + Love reports", "2026 Yearly forecast", "Elemental balance guide", "Personalized feng shui tips"],
    },
  ];

  return (
    <div className={`rounded-xl border border-amber-200 bg-amber-50 p-6 text-center ${className}`}>
      <span className="inline-block rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-800 uppercase tracking-wide">
        Premium
      </span>
      <h3 className="mt-3 text-xl font-bold tracking-tight">Unlock Your Premium Ba Zi Report</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
        Get an in-depth, AI-powered analysis of your career, love life, and fortune.
        Written by our expert system with classical Ba Zi methodology.
      </p>

      {!selectedTier ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`relative rounded-lg border bg-white p-4 text-left transition-all hover:shadow-md cursor-pointer ${
                  tier.popular ? "border-amber-300 ring-1 ring-amber-300" : "border-zinc-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Best Value
                  </span>
                )}
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{tier.name}</p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">{tier.price}</p>
                <p className="text-xs text-zinc-400">one-time</p>
                <ul className="mt-3 space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-zinc-600">
                      <span className="mt-0.5 text-amber-500">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Secure payment via PayPal. Instant access after purchase.
          </p>
        </>
      ) : (
        <div className="mt-6 mx-auto max-w-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700">
              Complete purchase: <span className="text-amber-700 font-semibold">{selectedTier}</span>
            </p>
            <button
              onClick={() => { setSelectedTier(null); setPaymentError(""); }}
              className="text-xs text-zinc-400 hover:text-zinc-600"
            >
              Cancel
            </button>
          </div>
          <PayPalButton
            tier={selectedTier}
            onSuccess={() => handlePaymentSuccess(selectedTier)}
            onError={handlePaymentError}
          />
          {paymentError && (
            <p className="mt-2 text-xs text-red-500">{paymentError}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(title === "Core Element Deep Dive"); // first section open by default

  return (
    <div className="px-5 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
        <span className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  );
}
