import type { MetadataRoute } from "next";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: "https://thebazi.com", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: "https://thebazi.com/bazi", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://thebazi.com/zodiac", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const zodiacPages = CHINESE_ZODIAC_SIGNS.map((sign) => ({
    url: `https://thebazi.com/zodiac/${sign.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...zodiacPages];
}
