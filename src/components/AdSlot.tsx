"use client";

import { useEffect, useRef } from "react";

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
  const adRef = useRef<HTMLDivElement>(null);
  const size = AD_SIZES[format];

  // Push ad request when slotId is provided and adsbygoogle is loaded
  useEffect(() => {
    if (!slotId) return;
    try {
      const win = window as any;
      if (win.adsbygoogle) {
        win.adsbygoogle.push({});
      }
    } catch {
      // Silently ignore
    }
  }, [slotId]);

  // Real AdSense ad
  if (slotId) {
    return (
      <div className={`mx-auto flex items-center justify-center ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: size.width, height: size.height }}
          data-ad-client="ca-pub-8064533860037208"
          data-ad-slot={slotId}
          data-ad-format={format === "rectangle" || format === "horizontal" ? "rectangle" : "horizontal"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder (no slotId)
  return (
    <div
      ref={adRef}
      className={`mx-auto flex items-center justify-center bg-zinc-50 border border-dashed border-zinc-200 text-xs text-zinc-400 ${className}`}
      style={{ width: size.width, height: size.height, maxWidth: "100%" }}
    >
      <span className="text-center px-2">
        Ad Space
        <br />
        <span className="text-[10px]">(Google AdSense)</span>
      </span>
    </div>
  );
}
