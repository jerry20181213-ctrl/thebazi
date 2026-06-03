/**
 * GA4 Event tracking helpers.
 *
 * gtag is loaded by GoogleAnalytics.tsx (next/script) in the root layout.
 * These helpers are safe to call regardless — they no-op when gtag is
 * unavailable (dev, ad-blocker, consent not given).
 */

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Push a GA4 event via the global gtag function.
 * Safe to call from any client component; no-ops if gtag is not loaded.
 */
export function gtagEvent(action: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  try {
    const gtag = (window as unknown as Record<string, unknown>).gtag;
    if (typeof gtag === "function") {
      gtag("event", action, params);
    }
  } catch {
    // Silently ignore — gtag may be blocked by ad-blockers
  }
}

// ─── Named event helpers ───────────────────────────────────────────

/** Fired when a Ba Zi calculation is completed on the result page. */
export function eventBaziCalculated(data: {
  animal: string;
  dayMaster: string;
  element: string;
  gender: string;
}) {
  gtagEvent("bazi_calculated", {
    animal: data.animal,
    day_master: data.dayMaster,
    element: data.element,
    gender: data.gender,
  });
}

/** Fired when a user clicks any share button. */
export function eventBaziShared(data: {
  platform: "twitter" | "facebook" | "whatsapp" | "line" | "wechat" | "copy_link";
  has_saved_code: boolean;
}) {
  gtagEvent("bazi_shared", {
    platform: data.platform,
    has_saved_code: data.has_saved_code,
  });
}

/** Fired when a zodiac compatibility check is completed. */
export function eventCompatibilityChecked(data: {
  animal1: string;
  animal2: string;
  rating: number;
}) {
  gtagEvent("compatibility_checked", {
    animal_1: data.animal1,
    animal_2: data.animal2,
    rating: data.rating,
  });
}

/** Fired when a newsletter signup succeeds. */
export function eventNewsletterSignup(data: {
  source: string;
  locale: string;
}) {
  gtagEvent("newsletter_signup", {
    source: data.source,
    locale: data.locale,
  });
}

/** Fired when a reading is saved and a share link is generated. */
export function eventReadingSaved() {
  gtagEvent("reading_saved");
}

/** Fired when a shared reading ( /m/[code] ) is viewed. */
export function eventReadingViewedShared(data: {
  animal: string;
  locale: string;
}) {
  gtagEvent("reading_viewed_shared", {
    animal: data.animal,
    locale: data.locale,
  });
}
