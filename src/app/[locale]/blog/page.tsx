import Link from "next/link";
import { getAllArticles } from "@/lib/blog-content";
import { getZhArticles } from "@/lib/blog-content-zh";
import { getJaArticles } from "@/lib/blog-content-ja";
import NewsletterBar from "@/components/NewsletterBar";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<any> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "八字與生肖部落格 — 命理指南與見解" : isJa ? "四柱推命 & 十二生肖 ブログ — 運勢ガイド" : "Ba Zi & Chinese Zodiac Blog — Insights & Guides",
    description: isZh
      ? "探索關於八字、生肖、五行、配對等文章。免費指南助你了解自己的命盤。"
      : isJa
        ? "四柱推命（八字）、十二生肖、五行、相性などの記事を探す。無料ガイドで自分の命式を理解しましょう。"
        : "Explore articles about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, compatibility, and more.",
    openGraph: {
      title: isZh ? "八字與生肖部落格" : isJa ? "四柱推命 & 十二生肖 ブログ" : "Ba Zi & Chinese Zodiac Blog",
      description: isZh
        ? "中國玄學、八字和生肖的免費指南與見解"
        : isJa
          ? "中国形而上学、四柱推命、十二生肖の無料ガイド"
          : "Free guides and insights about Chinese metaphysics, Ba Zi, and the zodiac.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ba Zi Blog" }],
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const articles = isZh ? getZhArticles() : isJa ? getJaArticles() : getAllArticles();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {isZh ? "八字與生肖部落格" : "Ba Zi & Chinese Zodiac Blog"}
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            {isZh
              ? "免費的命理指南、見解和深度探討。學習八字、五行、生肖配對等知識。"
              : "Free guides, insights, and deep dives into Chinese metaphysics. Learn about Ba Zi, the Five Elements, zodiac compatibility, and more."}
          </p>
          <p className="mt-4 text-sm text-zinc-500 leading-relaxed max-w-2xl">
            {isZh
              ? "無論你是初學者還是經驗豐富的命理愛好者，我們的文章都能幫助你更深入地了解八字四柱命理。從天干地支基礎到2026年運勢預測，我們涵蓋了所有你需要知道的內容。"
              : "Whether you're a complete beginner or an experienced practitioner, our articles help you understand the Four Pillars of Destiny more deeply. From the basics of Heavenly Stems and Earthly Branches to 2026 horoscope predictions, we cover everything you need to know about this ancient Chinese wisdom."}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          {articles.length === 0 && isZh && (
            <p className="text-center text-sm text-zinc-400 py-10">
              繁體中文文章陸續上線中，敬請期待！
            </p>
          )}
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-xs text-zinc-300">·</span>
                  <span className="text-xs text-zinc-400">
                    {new Date(article.datePublished).toLocaleDateString(
                      isZh ? "zh-TW" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-12">
        <div className="mx-auto max-w-md px-4">
          <NewsletterBar source="blog" />
        </div>
      </section>
    </div>
  );
}
