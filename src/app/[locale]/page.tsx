import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  const baseUrl = "https://thebazi.com";

  return {
    title: isZh ? "The Ba Zi — 免費八字四柱命理解讀" : "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    description: isZh
      ? "免費AI八字排盤，了解你的四柱命理、天干地支、五行平衡。計算生肖、獲取個人化運勢分析。"
      : "Discover your destiny with a free AI-powered Ba Zi (Four Pillars of Destiny) reading. Calculate your Chinese zodiac, five elements, and get personalized fortune insights.",
    alternates: {
      canonical: isZh ? `${baseUrl}/zh-TW` : baseUrl,
    },
    openGraph: {
      title: isZh ? "The Ba Zi — 免費八字四柱命理解讀" : "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
      description: isZh ? "免費AI八字排盤，了解你的命理格局。" : "Discover your destiny with a free AI-powered Ba Zi reading.",
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
