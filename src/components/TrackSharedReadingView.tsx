"use client";

import { useEffect } from "react";
import { eventReadingViewedShared } from "@/lib/gtag-events";

interface Props {
  animal: string;
  locale: string;
}

/**
 * Fires reading_viewed_shared GA4 event on mount.
 * Renders nothing — purely for analytics.
 */
export default function TrackSharedReadingView({ animal, locale }: Props) {
  useEffect(() => {
    eventReadingViewedShared({ animal, locale });
  }, [animal, locale]);

  return null;
}
