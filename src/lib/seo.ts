/**
 * SEO helper utilities for localized metadata across the site.
 */

/** Construct canonical URL for any page given locale and path */
export function localeCanonical(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `https://thebazi.com${prefix}${path}`;
}

/** Construct hreflang alternates for a given path */
export function hreflangAlternates(path: string): Record<string, string> {
  return {
    en: `https://thebazi.com${path}`,
    "zh-TW": `https://thebazi.com/zh-TW${path}`,
    "x-default": `https://thebazi.com${path}`,
  };
}

/** Get localized OG image URL */
export function ogImageUrl(locale: string): string {
  return locale === "en" ? "/og-image.png" : "/og-image.png";
}

/** Default OG image metadata object */
export function defaultOgImage(locale: string, title: string) {
  return {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}
