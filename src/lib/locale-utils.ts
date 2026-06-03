/** Locale info extracted from the locale string for page-level use. */
export function getLocaleInfo(locale: string) {
  const isEn = locale === "en" || (!locale || locale === "default");
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  /** URL prefix: "" for en, "/zh-TW" or "/ja" for others */
  const localePath = isEn ? "" : `/${locale}`;

  /** OpenGraph locale format */
  const ogLocale = isZh ? "zh_TW" : isJa ? "ja_JP" : "en_US";

  return { isEn, isZh, isJa, localePath, ogLocale };
}

/** Locale display names for language switcher */
export const LOCALE_LABELS: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  "zh-TW": { label: "繁體中文", flag: "🇹🇼" },
  ja: { label: "日本語", flag: "🇯🇵" },
};
