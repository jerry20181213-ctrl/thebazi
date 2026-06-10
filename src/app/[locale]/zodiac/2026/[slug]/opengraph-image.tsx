import { ImageResponse } from "next/og";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { get2026Horoscope } from "@/lib/zodiac-2026-horoscope";
import { get2026HoroscopeZh } from "@/lib/zodiac-2026-horoscope-zh";
import { get2026HoroscopeJa } from "@/lib/zodiac-2026-horoscope-ja";
import { getAnimalName } from "@/lib/zodiac-locale";
import { OG_SIZE, ogFonts, OgTemplate, getFontRegular, getFontBold } from "@/lib/og-utils";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "2026 Zodiac Horoscope";

export function generateStaticParams() {
  return CHINESE_ZODIAC_SIGNS.flatMap((s) => [
    { locale: "en", slug: s.key },
    { locale: "zh-TW", slug: s.key },
    { locale: "ja", slug: s.key },
  ]);
}

function localizedHoroscope(sign: string, locale: string) {
  const en = get2026Horoscope(sign);
  if (!en || locale === "en") return en;
  const overrides = locale === "zh-TW" ? get2026HoroscopeZh(sign) : get2026HoroscopeJa(sign);
  return overrides ? { ...en, ...overrides } : en;
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isZh = locale === "zh-TW";
  const isJa = locale === "ja";

  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const hor = localizedHoroscope(slug, locale);
  if (!sign || !hor) {
    return new ImageResponse(<div style={{ fontSize: 48, color: "white", background: "#18181b", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Not Found</div>, OG_SIZE);
  }

  const [regular, bold] = await Promise.all([getFontRegular(), getFontBold()]);
  const name = getAnimalName(slug, locale);

  const title = isZh ? `${name} 2026年運勢` : isJa ? `${name} 2026年運勢` : `${sign.animal} 2026 Horoscope`;
  const badge = isZh ? "2026 十二生肖運勢" : isJa ? "2026年 十二生肖占い" : "2026 Chinese Zodiac";

  return new ImageResponse(
    OgTemplate({ title, description: hor.overall.substring(0, 150), badge }),
    { ...OG_SIZE, fonts: ogFonts(regular, bold) },
  );
}
