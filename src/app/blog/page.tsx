import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Ba Zi & Chinese Zodiac Blog — Insights & Guides",
  description: "Explore articles about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, compatibility, and more. Free guides to help you understand your destiny chart.",
  openGraph: {
    title: "Ba Zi & Chinese Zodiac Blog",
    description: "Free guides and insights about Chinese metaphysics, Ba Zi, and the zodiac.",
  },
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Ba Zi & Chinese Zodiac Blog
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Free guides, insights, and deep dives into Chinese metaphysics. Learn
            about Ba Zi, the Five Elements, zodiac compatibility, and more.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
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
                    {new Date(article.datePublished).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
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
