import type { Metadata } from "next";
import BaziForm from "@/components/BaziForm";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "免費八字排盤計算器" : "Free Ba Zi Calculator",
    description: isZh
      ? "輸入出生日期和時間，免費AI八字排盤，計算你的四柱命盤，了解天干地支與五行平衡。"
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
    </div>
  );
}
