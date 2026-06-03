import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa, ogLocale } = getLocaleInfo(locale);
  const baseUrl = "https://thebazi.com";

  return {
    title: isZh
      ? "The Ba Zi — 免費八字四柱命理解讀"
      : isJa
        ? "The Ba Zi — 無料四柱推命鑑定 | 運勢診断"
        : "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    description: isZh
      ? "免費AI八字排盤，了解你的四柱命理、天干地支、五行平衡。計算生肖、獲取個人化運勢分析。"
      : isJa
        ? "生年月日を入力するだけで、AIが四柱推命（八字）を無料診断。天干地支・五行のバランスを分析し、あなただけの運勢レポートをお届けします。"
        : "Discover your destiny with a free AI-powered Ba Zi (Four Pillars of Destiny) reading. Calculate your Chinese zodiac, five elements, and get personalized fortune insights.",
    alternates: {
      canonical: isZh ? `${baseUrl}/zh-TW` : isJa ? `${baseUrl}/ja` : baseUrl,
      languages: {
        en: baseUrl,
        "zh-TW": `${baseUrl}/zh-TW`,
        "zh-CN": `${baseUrl}/zh-TW`,
        ja: `${baseUrl}/ja`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      title: isZh
        ? "The Ba Zi — 免費八字四柱命理解讀"
        : isJa
          ? "The Ba Zi — 無料四柱推命鑑定"
          : "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
      description: isZh
        ? "免費AI八字排盤，了解你的命理格局。"
        : isJa
          ? "AIがあなたの四柱推命を無料診断。"
          : "Discover your destiny with a free AI-powered Ba Zi reading.",
      locale: ogLocale,
      siteName: "The Ba Zi",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isZh ? "The Ba Zi — 八字四柱命理" : isJa ? "The Ba Zi — 四柱推命" : "The Ba Zi — Four Pillars of Destiny",
        },
      ],
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
