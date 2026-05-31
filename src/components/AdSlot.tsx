"use client";

import { useEffect, useRef } from "react";

type AdFormat = "banner" | "rectangle" | "skyscraper";

const AD_SIZES: Record<AdFormat, { width: number; height: number }> = {
  banner: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  skyscraper: { width: 160, height: 600 },
};

interface AdSlotProps {
  format?: AdFormat;
  className?: string;
  slotId?: string;
}

export default function AdSlot({ format = "rectangle", className = "", slotId }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const size = AD_SIZES[format];

  return (
    <div
      ref={adRef}
      id={slotId}
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
