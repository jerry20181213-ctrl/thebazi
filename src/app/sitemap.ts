import type { MetadataRoute } from "next";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { getAllPillarKeys } from "@/lib/day-pillar-content";
import { getAllPairs, ANIMALS } from "@/lib/zodiac-compatibility";
import { ALL_BIRTH_YEARS } from "@/lib/birth-year-content";
import { STEM_SLUGS } from "@/lib/heavenly-stems-content";
import { BRANCH_SLUGS } from "@/lib/earthly-branches-content";
import { getArticleSlugs } from "@/lib/blog-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: "https://thebazi.com", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: "https://thebazi.com/bazi", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://thebazi.com/zodiac", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "https://thebazi.com/five-elements", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "https://thebazi.com/learn/heavenly-stems", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "https://thebazi.com/learn/earthly-branches", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "https://thebazi.com/learn/glossary", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://thebazi.com/privacy", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "https://thebazi.com/terms", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "https://thebazi.com/affiliate-disclosure", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
    { url: "https://thebazi.com/2026-year-of-the-horse", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const zodiacPages = CHINESE_ZODIAC_SIGNS.map((sign) => ({
    url: `https://thebazi.com/zodiac/${sign.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const elementPages = FIVE_ELEMENTS.map((el) => ({
    url: `https://thebazi.com/five-elements/${el.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const dayPillarPages = getAllPillarKeys().map((key) => ({
    url: `https://thebazi.com/learn/day-pillars/${key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Zodiac Compatibility
  const compatibilityMain = {
    url: "https://thebazi.com/zodiac/compatibility",
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const compatibilityPairs = getAllPairs().map((pair) => ({
    url: `https://thebazi.com/zodiac/compatibility/${pair.pairKey}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const perSignCompatibility = ANIMALS.map((sign) => ({
    url: `https://thebazi.com/zodiac/${sign}/compatibility`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // 2026 Horoscopes
  const horoscope2026Main = {
    url: "https://thebazi.com/zodiac/2026",
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  const horoscope2026Pages = ANIMALS.map((sign) => ({
    url: `https://thebazi.com/zodiac/2026/${sign}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Birth Year Guide
  const birthYearMain = {
    url: "https://thebazi.com/birth-year",
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const birthYearPages = ALL_BIRTH_YEARS.map((y) => ({
    url: `https://thebazi.com/birth-year/${y.year}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Heavenly Stems detail pages
  const heavenlyStemPages = STEM_SLUGS.map((slug) => ({
    url: `https://thebazi.com/learn/heavenly-stems/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Earthly Branches detail pages
  const earthlyBranchPages = BRANCH_SLUGS.map((slug) => ({
    url: `https://thebazi.com/learn/earthly-branches/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...zodiacPages,
    ...elementPages,
    ...dayPillarPages,
    compatibilityMain,
    ...compatibilityPairs,
    ...perSignCompatibility,
    horoscope2026Main,
    ...horoscope2026Pages,
    birthYearMain,
    ...birthYearPages,
    ...heavenlyStemPages,
    ...earthlyBranchPages,

    // Blog
    { url: "https://thebazi.com/blog", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    ...getArticleSlugs().map((slug) => ({
      url: `https://thebazi.com/blog/${slug}` as const,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // FAQ
    { url: "https://thebazi.com/learn/faq", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];
}
