import type { Metadata } from "next";
import CompatibilityCalculatorClient from "./client";
import Breadcrumb from "@/components/Breadcrumb";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "八字生肖配對計算器 — 你們合不合？" : isJa ? "四柱推命 相性診断 — 二人の相性は？" : "Ba Zi Compatibility Calculator — Are You a Match?",
    description: isZh
      ? "輸入你和TA的出生信息，免費看生肖配對、五行分析和緣分評分。傳統命理智慧幫你看透你們的關係。"
      : isJa
        ? "二人の生年月日を入力して、十二生肖の相性・五行の調和・関係性スコアを無料でチェック。"
        : "Enter two birth dates to check your Chinese zodiac compatibility, five-element harmony, and relationship score. Discover what the stars say about your connection.",
  };
}

export default function CompatibilityCalculatorPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Compatibility Calculator" },
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ba Zi Compatibility Calculator
          </h1>
          <p className="mt-3 text-sm text-zinc-500 max-w-xl mx-auto">
            Enter two birth dates to see your Chinese zodiac compatibility,
            five-element harmony, and overall relationship score.
          </p>
        </div>
        <CompatibilityCalculatorClient />
      </div>
    </div>
  );
}
