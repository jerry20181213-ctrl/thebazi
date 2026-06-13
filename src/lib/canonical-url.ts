/** Construct a canonical URL given the current locale and path segments.
 *  Each segment is URL-encoded so spaces and special characters are handled correctly
 *  in the rendered <link rel="canonical"> tag. */

const BASE_URL = "https://thebazi.com";

export function getCanonicalUrl(locale: string, ...segments: (string | undefined)[]): string {
  // localePath is "" for en, "/zh-TW" for zh-TW, "/ja" for ja
  const localePath = locale === "en" ? "" : `/${locale}`;
  const path = segments
    .filter((s): s is string => Boolean(s))
    .map((s) => encodeURIComponent(s))
    .join("/");
  return `${BASE_URL}${localePath}${path ? "/" + path : ""}`;
}
