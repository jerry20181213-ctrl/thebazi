"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blog-content";

interface Props {
  articles: BlogArticle[];
  query: string;
  isZh: boolean;
}

export default function SearchClient({ articles, query, isZh }: Props) {
  const router = useRouter();
  const [input, setInput] = useState(query);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [input, router]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter((article) => {
      const searchText = [
        article.title,
        article.description,
        article.category,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();
      return searchText.includes(q);
    });
  }, [articles, query]);

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isZh ? "搜尋文章..." : "Search articles..."}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            {isZh ? "搜尋" : "Search"}
          </button>
        </div>
      </form>

      {/* Results */}
      {!query.trim() && (
        <p className="text-sm text-zinc-400">
          {isZh ? "請輸入關鍵字搜尋關於八字、生肖、五行的文章" : "Enter a keyword to search Ba Zi, zodiac, and five elements articles"}
        </p>
      )}

      {query.trim() && results.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-zinc-500">
            {isZh ? `沒有找到「${query}」的相關結果` : `No results for "${query}"`}
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            {isZh ? "請嘗試其他關鍵字" : "Try a different search term"}
          </p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className="mb-4 text-xs text-zinc-400">
            {results.length} {isZh ? "個結果" : `result${results.length !== 1 ? "s" : ""}`}
          </p>
          <div className="grid gap-4">
            {results.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-1">
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
                <p className="mt-1 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
