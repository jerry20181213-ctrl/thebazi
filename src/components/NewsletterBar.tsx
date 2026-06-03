"use client";

import { useState, useCallback } from "react";
import { eventNewsletterSignup } from "@/lib/gtag-events";

interface Props {
  locale?: string;
  source?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  compact?: boolean;
}

export default function NewsletterBar({
  locale = "en",
  source = "homepage",
  title,
  description,
  placeholder,
  buttonText,
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, locale }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.setItem("newsletter_subscribed", "true");
        eventNewsletterSignup({ source, locale });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [email, source, locale]);

  const defaultTitle = isZh ? "📬 免費領取《2026 丙午年運勢完整指南》" : isJa ? "📬 無料「2026年運勢ガイド」を受け取る" : "📬 Get Your Free 2026 Horoscope Guide";
  const defaultDesc = isZh
    ? "訂閱我們的 Newsletter，獲取專屬運勢提醒、命理知識和獨家 PDF 指南。"
    : isJa
      ? "毎月の運勢情報、四柱推命のヒント、無料2026年ガイドPDFをお届けします。"
      : "Subscribe for monthly horoscope updates, Ba Zi tips, and your free 2026 guide PDF.";
  const defaultPlaceholder = isZh ? "你的郵箱" : isJa ? "your@email.com" : "your@email.com";
  const defaultButton = isZh ? "免費領取" : isJa ? "無料で受け取る" : "Get Free Guide";

  if (status === "success") {
    return (
      <div className={`rounded-xl border border-green-200 bg-green-50 ${compact ? "p-4" : "p-6"} text-center`}>
        <p className="text-sm font-medium text-green-700">
          {isZh ? "✅ 訂閱成功！指南已發送至您的郵箱。" : isJa ? "✅ 登録完了！ガイドをメールでお送りしました。" : "✅ You're subscribed! Check your inbox for the guide."}
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white ${compact ? "p-4" : "p-6"}`}>
      <div className={`${compact ? "" : "text-center"}`}>
        <h3 className="text-sm font-semibold text-zinc-900">{title || defaultTitle}</h3>
        <p className={`mt-1 text-xs text-zinc-500 ${compact ? "" : "max-w-md mx-auto"}`}>
          {description || defaultDesc}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={`mt-3 flex gap-2 ${compact ? "" : "max-w-md mx-auto"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          required
          className="min-w-0 flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:border-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {status === "sending" ? (isZh ? "發送中..." : isJa ? "送信中..." : "Sending...") : (buttonText || defaultButton)}
        </button>
      </form>
      {status === "error" && (
        <p className={`mt-1 text-xs text-red-400 ${compact ? "" : "text-center"}`}>
          {isZh ? "訂閱失敗，請稍後再試。" : isJa ? "エラーが発生しました。後でもう一度お試しください。" : "Something went wrong. Please try again."}
        </p>
      )}
    </div>
  );
}
