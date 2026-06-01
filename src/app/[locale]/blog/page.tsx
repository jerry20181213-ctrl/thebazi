import Link from "next/link";
import { getAllArticles } from "@/lib/blog-content";
import { getZhArticles } from "@/lib/blog-content-zh";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<any> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "八字與生肖部落格 — 命理指南與見解" : "Ba Zi & Chinese Zodiac Blog — Insights & Guides",
    description: isZh
      ? "探索關於八字、生肖、五行、配對等文章。免費指南助你了解自己的命盤。"
      : "Explore articles about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, compatibility, and more.",
    openGraph: {
      title: isZh ? "八字與生肖部落格" : "Ba Zi & Chinese Zodiac Blog",
      description: isZh
        ? "中國玄學、八字和生肖的免費指南與見解"
        : "Free guides and insights about Chinese metaphysics, Ba Zi, and the zodiac.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ba Zi Blog" }],
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  const articles = isZh ? getZhArticles() : getAllArticles();

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
    </div>
  );
}
