"use client";

import { useEffect } from "react";

type AdFormat = "banner" | "rectangle" | "skyscraper" | "horizontal";

interface AdSlotProps {
  format?: AdFormat;
  className?: string;
  /** Google AdSense ad unit ID (e.g. "1234567890"). When provided, renders a real AdSense ad instead of placeholder. */
  slotId?: string;
}

const AD_SIZES: Record<AdFormat, { width: number; height: number }> = {
  banner: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  skyscraper: { width: 160, height: 600 },
  horizontal: { width: 336, height: 280 },
};

export default function AdSlot({ format = "rectangle", className = "", slotId }: AdSlotProps) {
  const size = AD_SIZES[format];

  // Use global default slot ID if none provided
  const resolvedSlotId = slotId || "5416238549";

  // Push ad request when adsbygoogle is loaded
  useEffect(() => {
    try {
      const win = window as any;
      if (win.adsbygoogle) {
        win.adsbygoogle.push({});
      }
    } catch {
      // Silently ignore
    }
  }, [resolvedSlotId]);

  return (
    <div className={`mx-auto flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: size.width, height: size.height }}
        data-ad-client="ca-pub-8064533860037208"
        data-ad-slot={resolvedSlotId}
        data-ad-format={format === "rectangle" || format === "horizontal" ? "rectangle" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
