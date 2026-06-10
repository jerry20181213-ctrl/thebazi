import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getArticlesByTag } from "@/lib/blog-tags";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string; tag: string }>;
}

export function generateStaticParams() {
  const locales = ["en", "zh-TW", "ja"];
  const params: Array<{ locale: string; tag: string }> = [];
  for (const loc of locales) {
    for (const tag of getAllTags(loc)) {
      params.push({ locale: loc, tag: encodeURIComponent(tag) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { isZh, isJa } = getLocaleInfo(locale);

  return {
    title: isZh
      ? `「${decodedTag}」相關文章 — 八字命理部落格`
      : isJa
        ? `「${decodedTag}」の記事 — 四柱推命ブログ`
        : `Articles tagged "${decodedTag}" — Ba Zi Blog`,
    description: isZh
      ? `瀏覽所有標籤為「${decodedTag}」的八字命理文章。`
      : isJa
        ? `「${decodedTag}」タグが付いた四柱推命の記事一覧。`
        : `Browse all articles tagged with "${decodedTag}" about Ba Zi, Chinese zodiac, and Five Elements.`,
    robots: { index: true, follow: true },
  };
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { isZh, isJa } = getLocaleInfo(locale);

  const articles = getArticlesByTag(decodedTag, locale);
  if (articles.length === 0) notFound();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-zinc-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-4">
            <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
              ← {isZh ? "返回部落格" : "Back to Blog"}
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isZh ? `標籤：${decodedTag}` : isJa ? `タグ：${decodedTag}` : `Tag: ${decodedTag}`}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {isZh
              ? `共 ${articles.length} 篇文章`
              : isJa
                ? `全${articles.length}件の記事`
                : `${articles.length} article${articles.length > 1 ? "s" : ""}`}
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-xs text-zinc-300">·</span>
                  <span className="text-xs text-zinc-400">
                    {new Date(article.datePublished).toLocaleDateString(
                      isZh ? "zh-TW" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
