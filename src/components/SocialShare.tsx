"use client";

import { useState } from "react";
import { eventBaziShared } from "@/lib/gtag-events";

interface Props {
  url: string;
  title?: string;
  compact?: boolean;
}

const PLATFORMS = [
  {
    key: "twitter",
    label: "X",
    emoji: "𝕏",
    href: (u: string, t: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    emoji: "f",
    href: (u: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    emoji: "📱",
    href: (u: string, t: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
  {
    key: "line",
    label: "LINE",
    emoji: "💬",
    href: (u: string, t: string) =>
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    key: "wechat",
    label: "WeChat",
    emoji: "💚",
    href: () => "", // handled separately
  },
];

export default function SocialShare({ url, title = "", compact = false }: Props) {
  const [copiedWechat, setCopiedWechat] = useState(false);

  const shareText = title
    ? `${title} — Check it out!`
    : "I just got my Ba Zi reading! Check yours at";

  const hasSavedCode = url.includes("/m/");

  return (
    <div className={`flex ${compact ? "flex-wrap justify-center gap-1.5" : "flex-col gap-2"}`}>
      <p className="text-xs font-medium text-zinc-500 text-center">
        {compact ? "" : "Share"}
      </p>
      <div className={`flex ${compact ? "flex-wrap justify-center gap-1.5" : "gap-2 justify-center"}`}>
        {PLATFORMS.map((p) =>
          p.key === "wechat" ? (
            <button
              key={p.key}
              onClick={() => {
                const fullText = `${shareText}\n${url}`;
                navigator.clipboard.writeText(fullText);
                setCopiedWechat(true);
                setTimeout(() => setCopiedWechat(false), 2000);
                eventBaziShared({ platform: "wechat", has_saved_code: hasSavedCode });
              }}
              className={`inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 ${
                compact ? "px-2 py-1" : "px-3 py-1.5"
              }`}
              title="Copy to share on WeChat"
            >
              <span>{p.emoji}</span>
              {!compact && <span>{copiedWechat ? "Copied!" : "WeChat"}</span>}
            </button>
          ) : (
            <button
              key={p.key}
              onClick={() => {
                window.open(p.href(url, shareText), "_blank", "noopener,noreferrer");
                eventBaziShared({ platform: p.key as "twitter" | "facebook" | "whatsapp" | "line", has_saved_code: hasSavedCode });
              }}
              className={`inline-flex items-center gap-1 rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 ${
                compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"
              }`}
            >
              <span>{p.emoji}</span>
              {!compact && <span>{p.label}</span>}
            </button>
          )
        )}
      </div>
    </div>
  );
}
