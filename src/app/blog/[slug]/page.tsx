import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs, getAllArticles } from "@/lib/blog-content";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, articleSchema, jsonLdScript } from "@/lib/json-ld";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.datePublished,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: article.title },
  ];

  // Related articles (same category, excluding current)
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(breadcrumbSchema(breadcrumbItems.map((b) => ({ label: b.label, href: b.href || "" })))),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(articleSchema({
            headline: article.title,
            description: article.description,
            datePublished: article.datePublished,
          })),
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
              {new Date(article.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article
          className="prose prose-zinc prose-sm prose-headings:font-semibold prose-headings:text-zinc-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900 prose-ul:list-disc prose-li:text-sm max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 border-t border-zinc-200 pt-8">
            <h2 className="mb-4 text-lg font-semibold">Related Articles</h2>
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

        {/* Ad placement */}
        <div className="mt-8">
          <AdSlot format="banner" />
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
