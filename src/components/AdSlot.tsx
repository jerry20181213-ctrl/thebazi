"use client";

import { useEffect } from "react";

/**
 * Google AdSense ad slot.
 *
 * Renders the EXACT code format Google provides — no extra styles, no format
 * overrides, no fixed dimensions.  The responsive auto ad fills the container
 * width and chooses its own height.
 *
 * Policy note: AdSense requires the <ins> element be rendered unmodified.
 * We keep fixed sizes only for the outer wrapper (breathing room during load)
 * and let the Google script drive the inner element entirely.
 */
type AdFormat = "banner" | "rectangle" | "skyscraper" | "horizontal";

interface AdSlotProps {
  format?: AdFormat;
  className?: string;
  /** Google AdSense ad unit ID. Defaults to the site-wide slot. */
  slotId?: string;
}

/** Approximate min-heights so the page doesn't jump when an ad fills. */
const MIN_HEIGHTS: Record<AdFormat, number> = {
  banner: 90,
  rectangle: 250,
  skyscraper: 600,
  horizontal: 280,
};

export default function AdSlot({ format = "rectangle", className = "", slotId }: AdSlotProps) {
  const resolvedSlotId = slotId || "5416238549";
  const minH = MIN_HEIGHTS[format];

  useEffect(() => {
    try {
      // Google's official pattern — works whether the script has loaded or not
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // Silently ignore
    }
  }, [resolvedSlotId]);

  return (
    <div className={`mx-auto flex items-start justify-center ${className}`} style={{ minHeight: minH }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8064533860037208"
        data-ad-slot={resolvedSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
