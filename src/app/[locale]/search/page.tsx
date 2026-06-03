import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles } from "@/lib/blog-content";
import { getZhArticles } from "@/lib/blog-content-zh";
import SearchClient from "./client";

import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "搜尋 — The Ba Zi" : isJa ? "検索 — The Ba Zi" : "Search — The Ba Zi",
    description: isZh ? "搜尋八字、生肖、五行相關文章。" : isJa ? "四柱推命、十二生肖、五行に関する記事を検索。" : "Search Ba Zi, Chinese zodiac, and five elements articles.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q } = await searchParams;
  const { isZh, isJa } = getLocaleInfo(locale);
  const articles = isZh ? getZhArticles() : getAllArticles();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {isZh ? "搜尋" : isJa ? "検索" : "Search"}
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        {isZh ? `關鍵字：${q || ""}` : isJa ? `検索結果：${q || ""}` : `Search results for: ${q || ""}`}
      </p>
      <Suspense fallback={<div className="text-sm text-zinc-400">{isZh ? "搜尋中..." : "Searching..."}</div>}>
        <SearchClient articles={articles} query={q || ""} isZh={isZh} />
      </Suspense>
    </div>
  );
}
