"use client";

import { useState, useEffect, useCallback } from "react";
import { eventNewsletterSignup } from "@/lib/gtag-events";

interface Props {
  locale?: string;
  delay?: number; // seconds before showing
  source?: string;
}

export default function NewsletterPopup({ locale = "en", delay = 10, source = "bazi_result" }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => {
      // Check if user already subscribed (localStorage flag)
      const alreadySubscribed = localStorage.getItem("newsletter_subscribed");
      if (!alreadySubscribed) {
        setVisible(true);
      }
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, dismissed]);

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
        setTimeout(() => { setVisible(false); }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [email, source, locale]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    // Don't show again this session
    sessionStorage.setItem("newsletter_dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="flex items-start gap-4">
          <button
            onClick={handleDismiss}
            className="shrink-0 mt-1 text-zinc-300 hover:text-zinc-500 transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {status === "success" ? (
            <div className="flex-1 text-center py-2">
              <p className="text-sm font-medium text-green-600">
                {isZh ? "✅ 訂閱成功！感謝您！" : isJa ? "✅ 登録完了！ありがとうございます！" : "✅ Subscribed! Thank you!"}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {isZh ? "我們會把月度運勢發送到您的郵箱。" : isJa ? "毎月の運勢をメールでお届けします。" : "We'll send your monthly horoscope to your inbox."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-700 mb-1">
                  {isZh ? "📬 不想忘記你的命盤？" : isJa ? "📬 あなたの命式をお忘れなく！" : "📬 Don't forget your reading!"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isZh ? "輸入你的郵箱" : isJa ? "メールアドレス" : "Enter your email"}
                    required
                    className="min-w-0 flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs focus:border-zinc-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                  >
                    {status === "sending" ? (isZh ? "發送中..." : isJa ? "送信中..." : "Sending...") : (isZh ? "免費訂閱" : isJa ? "無料登録" : "Subscribe Free")}
                  </button>
                </div>
                {status === "error" && (
                  <p className="mt-1 text-xs text-red-400">
                    {isZh ? "訂閱失敗，請稍後再試。" : isJa ? "登録に失敗しました。後でもう一度お試しください。" : "Failed to subscribe. Please try again."}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
