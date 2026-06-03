"use client";

import { useMemo } from "react";
import { getDailyQuote } from "@/data/daily-quotes";

interface Props {
  locale?: string;
}

export default function DailyQuote({ locale = "en" }: Props) {
  const quote = useMemo(() => getDailyQuote(), []);
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        {isJa ? (
          <>
            <blockquote className="text-lg text-zinc-600 leading-relaxed italic">
              &ldquo;{quote.en}&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-zinc-400">
              {quote.author || ""}
              {quote.zh && ` · ${quote.zh}`}
            </p>
          </>
        ) : isZh ? (
          <>
            <blockquote className="text-xl font-medium text-zinc-700 leading-relaxed">
              &ldquo;{quote.zh}&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-zinc-400">
              {quote.author || ""} · {quote.en}
            </p>
          </>
        ) : (
          <>
            <blockquote className="text-lg text-zinc-600 leading-relaxed italic">
              &ldquo;{quote.en}&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-zinc-400">
              {quote.author || ""}
              {quote.zh && ` · ${quote.zh}`}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
