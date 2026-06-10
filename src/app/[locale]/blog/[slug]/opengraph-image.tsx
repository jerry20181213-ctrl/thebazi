import { ImageResponse } from "next/og";
import { getArticleBySlug, getArticleSlugs } from "@/lib/blog-content";
import { getZhArticleBySlug, getZhArticleSlugs } from "@/lib/blog-content-zh";
import { getJaArticleBySlug, getJaArticleSlugs } from "@/lib/blog-content-ja";
import { OG_SIZE, ogFonts, OgTemplate, getFontRegular, getFontBold } from "@/lib/og-utils";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Blog article";

export async function generateStaticParams() {
  const en = getArticleSlugs().map((slug) => ({ locale: "en", slug }));
  const zh = getZhArticleSlugs().map((slug) => ({ locale: "zh-TW", slug }));
  const ja = getJaArticleSlugs().map((slug) => ({ locale: "ja", slug }));
  return [...en, ...zh, ...ja];
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  const article = isZh
    ? getZhArticleBySlug(slug) || getArticleBySlug(slug)
    : isJa
      ? getJaArticleBySlug(slug) || getArticleBySlug(slug)
      : getArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(<div style={{ fontSize: 48, color: "white", background: "#18181b", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Not Found</div>, OG_SIZE);
  }

  const [regular, bold] = await Promise.all([getFontRegular(), getFontBold()]);

  // Truncate long titles for OG display
  const title = article.title.length > 80 ? article.title.slice(0, 77) + "..." : article.title;
  const badge = `${article.category} · ${article.datePublished.slice(0, 4)}`;

  return new ImageResponse(
    OgTemplate({ title, description: article.description, badge }),
    { ...OG_SIZE, fonts: ogFonts(regular, bold) },
  );
}
