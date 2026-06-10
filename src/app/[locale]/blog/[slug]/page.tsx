import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  getArticleBySlug,
  getArticleSlugs,
  getAllArticles,
} from "@/lib/blog-content";
import { getZhArticleBySlug, getZhArticleSlugs, getZhArticles } from "@/lib/blog-content-zh";
import { getJaArticleBySlug, getJaArticleSlugs, getJaArticles } from "@/lib/blog-content-ja";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, articleSchema, jsonLdScript } from "@/lib/json-ld";
import AdSlot from "@/components/AdSlot";
import SocialShare from "@/components/SocialShare";
import { getLocaleInfo } from "@/lib/locale-utils";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

/** Split HTML content into sections with AdSlots inserted at ~40% and ~70% word depth. */
function renderContentWithAds(content: string): ReactNode[] {
  const nodes: ReactNode[] = [];

  // Split on heading tags (h2, h3) to keep content blocks cohesive
  const sections = content.split(/(?=<h[23]\b)/gi);

  const plainText = content.replace(/<[^>]*>/g, "");
  const totalWords = plainText.split(/\s+/).filter(Boolean).length;
  const adThresholds = [
    Math.floor(totalWords * 0.4),
    Math.floor(totalWords * 0.7),
  ];

  let cumulativeWords = 0;
  let adIndex = 0;

  sections.forEach((section, i) => {
    const sectionWords = section
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter(Boolean).length;

    nodes.push(
      <div key={`s-${i}`} dangerouslySetInnerHTML={{ __html: section }} />
    );

    cumulativeWords += sectionWords;

    // Insert ads after this section if thresholds are crossed
    while (adIndex < adThresholds.length && cumulativeWords >= adThresholds[adIndex]) {
      nodes.push(
        <div key={`ad-${adIndex}`} className="my-8">
          <AdSlot format="horizontal" />
        </div>
      );
      adIndex++;
    }
  });

  return nodes;
}

export async function generateStaticParams() {
  const enSlugs = getArticleSlugs().map((slug) => ({
    locale: "en",
    slug,
  }));
  const zhSlugs = getZhArticleSlugs().map((slug) => ({
    locale: "zh-TW",
    slug,
  }));
  const jaSlugs = getJaArticleSlugs().map((slug) => ({
    locale: "ja",
    slug,
  }));
  return [...enSlugs, ...zhSlugs, ...jaSlugs];
}

export async function generateMetadata({ params }: Props): Promise<any> {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const article = isZh ? (getZhArticleBySlug(slug) || getArticleBySlug(slug)) : isJa ? (getJaArticleBySlug(slug) || getArticleBySlug(slug)) : getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.datePublished,
      article: {
        publishedTime: article.datePublished,
        modifiedTime: article.datePublished,
        authors: ["https://thebazi.com"],
        section: article.category,
      },
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const article = isZh ? (getZhArticleBySlug(slug) || getArticleBySlug(slug)) : isJa ? (getJaArticleBySlug(slug) || getArticleBySlug(slug)) : getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbItems = [
    { label: isZh ? "首頁" : "Home", href: "/" },
    { label: isZh ? "部落格" : "Blog", href: "/blog" },
    { label: article.title },
  ];

  // Enhanced related articles — prefer same category, then tag-matched
  const allArticles = isZh ? getZhArticles() : getAllArticles();
  const currentTags = article.tags || [];

  const sameCategory = allArticles.filter(
    (a) => a.slug !== slug && a.category === article.category
  );
  const tagMatched = allArticles.filter(
    (a) =>
      a.slug !== slug &&
      a.category !== article.category &&
      a.tags?.some((tag) => currentTags.includes(tag))
  );
  const relatedArticles = [
    ...sameCategory.slice(0, 2),
    ...tagMatched
      .filter((t) => !sameCategory.slice(0, 2).find((c) => c.slug === t.slug))
      .slice(0, 2),
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbSchema(
              breadcrumbItems.map((b) => ({
                label: b.label,
                href: b.href || "",
              }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            articleSchema({
              headline: article.title,
              description: article.description,
              datePublished: article.datePublished,
              dateModified: article.datePublished,
              image: "https://thebazi.com/og-image.png",
              wordCount: article.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length,
            })
          ),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            {article.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        <article className="prose prose-zinc prose-sm prose-headings:font-semibold prose-headings:text-zinc-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900 prose-ul:list-disc prose-li:text-sm max-w-none leading-relaxed">
          {renderContentWithAds(article.content)}
        </article>

        {/* Social sharing */}
        <div className="mt-12 border-t border-zinc-200 pt-8">
          <SocialShare
            url={`https://thebazi.com${isZh ? `/zh-TW` : ""}/blog/${slug}`}
            title={article.title}
          />
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-12 border-t border-zinc-200 pt-8">
            <h2 className="mb-4 text-lg font-semibold">
              {isZh ? "相關文章" : "Related Articles"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.slug}
                  href={`/blog/${ra.slug}`}
                  className="group rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300"
                >
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">
                    {ra.category}
                  </span>
                  <h3 className="mt-1 text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-2">
                    {ra.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                    {ra.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <AdSlot format="banner" />
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            ← {isZh ? "返回部落格" : "Back to Blog"}
          </Link>
        </div>
      </div>
    </div>
  );
}
