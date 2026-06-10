import { ImageResponse } from "next/og";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { getElementName, getElementDescription } from "@/lib/element-locale";
import { OG_SIZE, ogFonts, OgTemplate, getFontRegular, getFontBold } from "@/lib/og-utils";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Five Elements";

export function generateStaticParams() {
  return FIVE_ELEMENTS.flatMap((el) => [
    { locale: "en", slug: el.key },
    { locale: "zh-TW", slug: el.key },
    { locale: "ja", slug: el.key },
  ]);
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  const el = FIVE_ELEMENTS.find((e) => e.key === slug);
  if (!el) {
    return new ImageResponse(<div style={{ fontSize: 48, color: "white", background: "#18181b", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Not Found</div>, OG_SIZE);
  }

  const [regular, bold] = await Promise.all([getFontRegular(), getFontBold()]);
  const name = getElementName(el.key, locale);
  const desc = getElementDescription(el.key, locale) || el.description;

  const title = isZh ? `${name}（${el.chinese}）— 五行解析` : isJa ? `${name}（${el.chinese}）— 五行解説` : `${el.name} Element (${el.chinese}) — Wu Xing Guide`;
  const badge = isZh ? "五行" : isJa ? "五行" : "Five Elements";

  return new ImageResponse(
    OgTemplate({ title, description: desc.substring(0, 150), badge }),
    { ...OG_SIZE, fonts: ogFonts(regular, bold) },
  );
}
