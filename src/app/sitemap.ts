import type { MetadataRoute } from "next";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { getAllPillarKeys } from "@/lib/day-pillar-content";
import { getAllPairs, ANIMALS } from "@/lib/zodiac-compatibility";
import { ALL_BIRTH_YEARS } from "@/lib/birth-year-content";
import { STEM_SLUGS } from "@/lib/heavenly-stems-content";
import { BRANCH_SLUGS } from "@/lib/earthly-branches-content";
import { getArticleSlugs, getArticleBySlug } from "@/lib/blog-content";
import { getZhArticleSlugs } from "@/lib/blog-content-zh";
import { getJaArticleSlugs } from "@/lib/blog-content-ja";

const LOCALES = ["", "zh-TW", "ja"] as const;

// ── Base dates representing when each content group went live ──
const LAUNCH_V1 = new Date("2026-03-01");         // Initial site launch (home, bazi, zodiac, etc.)
const LAUNCH_V2 = new Date("2026-04-15");          // Day pillars, stems, branches, birth-year, elements
const LAUNCH_V3 = new Date("2026-05-01");          // Horoscopes, compatibility, FAQ
const LAUNCH_BLOG = new Date("2026-05-15");        // Blog section went live
const LAUNCH_2026_HORSE = new Date("2026-04-20");  // 2026-Year-of-Horse page

function localize(path: string): string[] {
  return LOCALES.map((l) => (l ? `https://thebazi.com/${l}${path}` : `https://thebazi.com${path}`));
}

/** Cache of slug → datePublished for blog articles across all locales, built once at build time. */
const BLOG_DATE_CACHE = new Map<string, Date>();
function getBlogDate(slug: string): Date {
  if (!BLOG_DATE_CACHE.has(slug)) {
    const article = getArticleBySlug(slug);
    if (article?.datePublished) {
      BLOG_DATE_CACHE.set(slug, new Date(article.datePublished));
    } else {
      BLOG_DATE_CACHE.set(slug, LAUNCH_BLOG);
    }
  }
  return BLOG_DATE_CACHE.get(slug)!;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    ...localize("").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "weekly" as const, priority: 1 })),
    ...localize("/bazi").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...localize("/zodiac").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...localize("/five-elements").map((url) => ({ url, lastModified: LAUNCH_V2, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...localize("/learn/heavenly-stems").map((url) => ({ url, lastModified: LAUNCH_V2, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...localize("/learn/earthly-branches").map((url) => ({ url, lastModified: LAUNCH_V2, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...localize("/learn/glossary").map((url) => ({ url, lastModified: LAUNCH_V2, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...localize("/privacy").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "monthly" as const, priority: 0.3 })),
    ...localize("/terms").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "monthly" as const, priority: 0.3 })),
    ...localize("/affiliate-disclosure").map((url) => ({ url, lastModified: LAUNCH_V1, changeFrequency: "monthly" as const, priority: 0.2 })),
    ...localize("/2026-year-of-the-horse").map((url) => ({ url, lastModified: LAUNCH_2026_HORSE, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];

  const zodiacPages = CHINESE_ZODIAC_SIGNS.flatMap((sign) =>
    localize(`/zodiac/${sign.key}`).map((url) => ({
      url,
      lastModified: LAUNCH_V1,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const elementPages = FIVE_ELEMENTS.flatMap((el) =>
    localize(`/five-elements/${el.key}`).map((url) => ({
      url,
      lastModified: LAUNCH_V2,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const dayPillarPages = getAllPillarKeys().flatMap((key) =>
    localize(`/learn/day-pillars/${key}`).map((url) => ({
      url,
      lastModified: LAUNCH_V2,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Zodiac Compatibility
  const compatibilityMainPages = localize("/zodiac/compatibility").map((url) => ({
    url,
    lastModified: LAUNCH_V3,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const compatibilityPairs = getAllPairs().flatMap((pair) =>
    localize(`/zodiac/compatibility/${pair.pairKey}`).map((url) => ({
      url,
      lastModified: LAUNCH_V3,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  const perSignCompatibility = ANIMALS.flatMap((sign) =>
    localize(`/zodiac/${sign}/compatibility`).map((url) => ({
      url,
      lastModified: LAUNCH_V3,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  // 2026 Horoscopes
  const horoscope2026MainPages = localize("/zodiac/2026").map((url) => ({
    url,
    lastModified: LAUNCH_V3,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const horoscope2026Pages = ANIMALS.flatMap((sign) =>
    localize(`/zodiac/2026/${sign}`).map((url) => ({
      url,
      lastModified: LAUNCH_V3,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Birth Year Guide
  const birthYearMainPages = localize("/birth-year").map((url) => ({
    url,
    lastModified: LAUNCH_V2,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const birthYearPages = ALL_BIRTH_YEARS.flatMap((y) =>
    localize(`/birth-year/${y.year}`).map((url) => ({
      url,
      lastModified: LAUNCH_V2,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  // Heavenly Stems detail pages
  const heavenlyStemPages = STEM_SLUGS.flatMap((slug) =>
    localize(`/learn/heavenly-stems/${slug}`).map((url) => ({
      url,
      lastModified: LAUNCH_V2,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Earthly Branches detail pages
  const earthlyBranchPages = BRANCH_SLUGS.flatMap((slug) =>
    localize(`/learn/earthly-branches/${slug}`).map((url) => ({
      url,
      lastModified: LAUNCH_V2,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticPages,
    ...zodiacPages,
    ...elementPages,
    ...dayPillarPages,
    ...compatibilityMainPages,
    ...compatibilityPairs,
    ...perSignCompatibility,
    ...horoscope2026MainPages,
    ...horoscope2026Pages,
    ...birthYearMainPages,
    ...birthYearPages,
    ...heavenlyStemPages,
    ...earthlyBranchPages,

    // Blog list page
    ...localize("/blog").map((url) => ({ url, lastModified: LAUNCH_BLOG, changeFrequency: "weekly" as const, priority: 0.7 })),

    // Blog articles — each uses its real datePublished
    ...getArticleSlugs().flatMap((slug) => {
      const zhSlugs = getZhArticleSlugs();
      const jaSlugs = getJaArticleSlugs();
      const locales: Array<"en" | "zh-TW" | "ja"> = ["en"];
      if (zhSlugs.includes(slug)) locales.push("zh-TW");
      if (jaSlugs.includes(slug)) locales.push("ja");
      const postDate = getBlogDate(slug);
      return locales.map((locale) => {
        const prefix = locale === "en" ? "" : `/${locale}`;
        return {
          url: `https://thebazi.com${prefix}/blog/${slug}` as const,
          lastModified: postDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      });
    }),

    // FAQ
    ...localize("/learn/faq").map((url) => ({ url, lastModified: LAUNCH_V3, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
