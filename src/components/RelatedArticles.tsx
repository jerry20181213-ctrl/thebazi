import Link from "next/link";
import { getAllArticles } from "@/lib/blog-content";
import { getZhArticles } from "@/lib/blog-content-zh";
import { getJaArticles } from "@/lib/blog-content-ja";
import type { BlogArticle } from "@/lib/blog-content";

interface Props {
  /** Keyword to match against article tags (case-insensitive). */
  keyword: string;
  locale: string;
  /** Slug to exclude from results (e.g. current page). */
  excludeSlug?: string;
  /** Max articles to show (default 3). */
  limit?: number;
  /** Optional override for the section heading. */
  title?: string;
}

/** Returns locale-appropriate articles list. */
function getArticlesForLocale(locale: string): BlogArticle[] {
  if (locale === "zh-TW") return getZhArticles();
  if (locale === "ja") return getJaArticles();
  return getAllArticles();
}

/**
 * Reusable related-articles module for content pages.
 * Finds blog articles whose tags include `keyword`, and renders
 * a linked grid.
 */
export default function RelatedArticles({ keyword, locale, excludeSlug, limit = 3, title }: Props) {
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  const articles = getArticlesForLocale(locale)
    .filter((a) => {
      if (excludeSlug && a.slug === excludeSlug) return false;
      return a.tags?.some(
        (t) => t.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .slice(0, limit);

  if (articles.length === 0) return null;

  const heading = title || (isZh ? "相關文章" : isJa ? "関連記事" : "Related Articles");

  return (
    <div className="mt-10 border-t border-zinc-200 pt-8">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300"
          >
            <span className="text-xs text-zinc-400 uppercase tracking-wide">
              {article.category}
            </span>
            <h3 className="mt-1 text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
              {article.description}
            </p>
            <span className="mt-2 inline-block text-xs text-zinc-400">
              {new Date(article.datePublished).toLocaleDateString(
                isZh ? "zh-TW" : isJa ? "ja-JP" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
