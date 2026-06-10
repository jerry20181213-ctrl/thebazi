/**
 * Collect all unique tags across blog articles for a locale, and find articles by tag.
 */

import { getAllArticles } from "./blog-content";
import { getZhArticles } from "./blog-content-zh";
import { getJaArticles } from "./blog-content-ja";

/** Get all unique tag strings used by articles in a given locale. */
export function getAllTags(locale: string): string[] {
  const articles =
    locale === "zh-TW" ? getZhArticles()
    : locale === "ja" ? getJaArticles()
    : getAllArticles();

  const tagSet = new Set<string>();
  for (const a of articles) {
    for (const tag of a.tags) tagSet.add(tag);
  }
  return [...tagSet].sort();
}

/** Find every article that has the given tag. */
export function getArticlesByTag(tag: string, locale: string) {
  const articles =
    locale === "zh-TW" ? getZhArticles()
    : locale === "ja" ? getJaArticles()
    : getAllArticles();

  return articles.filter((a) => a.tags?.includes(tag));
}
