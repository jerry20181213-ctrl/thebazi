"use client";

import { useState, useMemo, useEffect } from "react";
import { calculateBaZi } from "@/lib/bazi-engine";
import { CHINESE_ZODIAC_SIGNS, STEM_WUXING } from "@/lib/constants";
import { getPairCompatibility, ANIMAL_NAMES, ratingToStars } from "@/lib/zodiac-compatibility";
import Link from "next/link";
import { eventCompatibilityChecked } from "@/lib/gtag-events";

interface FormData {
  year1: string; month1: string; day1: string;
  gender1: "male" | "female";
  year2: string; month2: string; day2: string;
  gender2: "male" | "female";
}

interface PersonInfo {
  animal: string;
  animalKey: string;
  dayMaster: string;
  element: string;
}

function getPersonInfo(year: number, month: number, day: number, gender: "male" | "female"): PersonInfo | null {
  try {
    const result = calculateBaZi({ year, month, day, hour: 12, minute: 0, gender });
    const animalKey = CHINESE_ZODIAC_SIGNS.find(
      (s) => s.animal.toLowerCase() === result.zodiacAnimal.toLowerCase()
    )?.key || result.zodiacAnimal.toLowerCase();
    return {
      animal: result.zodiacAnimal,
      animalKey,
      dayMaster: result.dayPillar.stem,
      element: result.dayMasterElement,
    };
  } catch {
    return null;
  }
}

export default function CompatibilityCalculatorClient() {
  const [form, setForm] = useState<FormData>({
    year1: "", month1: "", day1: "",
    gender1: "male",
    year2: "", month2: "", day2: "",
    gender2: "female",
  });
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    const y1 = parseInt(form.year1), m1 = parseInt(form.month1), d1 = parseInt(form.day1);
    const y2 = parseInt(form.year2), m2 = parseInt(form.month2), d2 = parseInt(form.day2);
    if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return null;

    const p1 = getPersonInfo(y1, m1, d1, form.gender1);
    const p2 = getPersonInfo(y2, m2, d2, form.gender2);
    if (!p1 || !p2) return null;

    const pair = getPairCompatibility(p1.animalKey, p2.animalKey);

    return { p1, p2, pair };
  }, [form, submitted]);

  // GA4: fire compatibility_checked when a result is rendered
  useEffect(() => {
    if (result) {
      eventCompatibilityChecked({
        animal1: result.p1.animalKey,
        animal2: result.p2.animalKey,
        rating: result.pair.rating,
      });
    }
  }, [result]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ year1: "", month1: "", day1: "", gender1: "male", year2: "", month2: "", day2: "", gender2: "female" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Person 1 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">Person 1</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Birth Year</label>
              <input
                type="number"
                placeholder="1990"
                value={form.year1}
                onChange={(e) => setForm({ ...form, year1: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Month (1-12)</label>
              <input
                type="number"
                placeholder="6"
                min={1}
                max={12}
                value={form.month1}
                onChange={(e) => setForm({ ...form, month1: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Day (1-31)</label>
              <input
                type="number"
                placeholder="15"
                min={1}
                max={31}
                value={form.day1}
                onChange={(e) => setForm({ ...form, day1: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs text-zinc-500 mb-1">Gender</label>
            <select
              value={form.gender1}
              onChange={(e) => setForm({ ...form, gender1: e.target.value as "male" | "female" })}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Person 2 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">Person 2</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Birth Year</label>
              <input
                type="number"
                placeholder="1992"
                value={form.year2}
                onChange={(e) => setForm({ ...form, year2: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Month (1-12)</label>
              <input
                type="number"
                placeholder="8"
                min={1}
                max={12}
                value={form.month2}
                onChange={(e) => setForm({ ...form, month2: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Day (1-31)</label>
              <input
                type="number"
                placeholder="20"
                min={1}
                max={31}
                value={form.day2}
                onChange={(e) => setForm({ ...form, day2: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs text-zinc-500 mb-1">Gender</label>
            <select
              value={form.gender2}
              onChange={(e) => setForm({ ...form, gender2: e.target.value as "male" | "female" })}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Check Compatibility
          </button>
        </div>
      </form>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Compatibility Score</p>
            <p className="text-4xl font-bold text-zinc-900">{ratingToStars(result.pair.rating)}</p>
            <p className="mt-2 text-sm font-medium text-zinc-600">
              {result.pair.rating >= 4 ? "💖 Excellent Match!" :
               result.pair.rating >= 3 ? "💚 Good Match" :
               result.pair.rating >= 2 ? "💛 Neutral" : "💔 Challenging"}
            </p>
            <p className="mt-1 text-xs text-zinc-400">{result.pair.love}</p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="text-xs text-zinc-400 uppercase tracking-wide">Person 1</h3>
              <p className="mt-2 text-base font-semibold text-zinc-900">{result.p1.animal}</p>
              <div className="mt-2 space-y-1 text-sm text-zinc-500">
                <p>Day Master: <span className="font-medium text-zinc-700">{result.p1.dayMaster}</span></p>
                <p>Element: <span className="font-medium text-zinc-700">{result.p1.element}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="text-xs text-zinc-400 uppercase tracking-wide">Person 2</h3>
              <p className="mt-2 text-base font-semibold text-zinc-900">{result.p2.animal}</p>
              <div className="mt-2 space-y-1 text-sm text-zinc-500">
                <p>Day Master: <span className="font-medium text-zinc-700">{result.p2.dayMaster}</span></p>
                <p>Element: <span className="font-medium text-zinc-700">{result.p2.element}</span></p>
              </div>
            </div>
          </div>

          {/* Relationship detail */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold">Relationship Insights</h3>
            <div className="space-y-2 text-sm text-zinc-600">
              <p><span className="font-medium text-zinc-700">Love Match:</span> {result.pair.love}</p>
              <p><span className="font-medium text-zinc-700">Friendship:</span> {result.pair.friendship}</p>
              <p><span className="font-medium text-zinc-700">Career:</span> {result.pair.career}</p>
              {result.pair.challenges && (
                <p><span className="font-medium text-zinc-700">Challenges:</span> {result.pair.challenges}</p>
              )}
            </div>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/zodiac/compatibility/${result.pair.pairKey}`}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Detailed Compatibility Guide →
            </Link>
            <button
              onClick={reset}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Check Another Pair
            </button>
          </div>
        </div>
      )}

      {result === null && submitted && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm text-red-600">Please enter valid birth dates for both people.</p>
        </div>
      )}
    </div>
  );
}
