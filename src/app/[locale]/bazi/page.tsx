import type { Metadata } from "next";
import Link from "next/link";
import BaziForm from "@/components/BaziForm";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "免費八字排盤計算器" : isJa ? "無料四柱推命計算機" : "Free Ba Zi Calculator",
    description: isZh
      ? "輸入出生日期和時間，免費AI八字排盤，計算你的四柱命盤，了解天干地支與五行平衡。"
      : isJa
        ? "生年月日と出生時間を入力して、無料で四柱推命を計算。天干地支と五行のバランスをAIが診断します。"
        : "Calculate your Four Pillars of Destiny chart. Enter your birth date and time for a free AI-powered Ba Zi reading.",
  };
}

export default function BaziPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ba Zi Calculator
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Enter your birth details below to unlock your destiny chart.
          Select your Chinese time period (时辰) for the most accurate reading.
          Your data is processed locally and never stored.
        </p>
      </div>
      <BaziForm />
      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold">What You&apos;ll Receive</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-500">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-zinc-300">✦</span>
            <span>Your complete Ba Zi chart with all Four Pillars (四柱)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-zinc-300">✦</span>
            <span>Analysis of your Day Master element and its influence</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-zinc-300">✦</span>
            <span>Personalized AI reading covering career, relationships, and growth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-zinc-300">✦</span>
            <span>Your lucky colors, directions, and numbers</span>
          </li>
        </ul>
      </div>

      {/* Compatibility entry */}
      <div className="mt-10 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-center">
        <p className="text-sm font-medium text-zinc-700">
          💕 Want to see if you and your partner are a match?
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Enter both your birth dates for a free Ba Zi compatibility analysis.
        </p>
        <Link
          href="/compatibility-calculator"
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Check Compatibility →
        </Link>
      </div>
    </div>
  );
}
