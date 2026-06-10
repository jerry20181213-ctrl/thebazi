import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { get2026Horoscope, YEAR_2026_INFO } from "@/lib/zodiac-2026-horoscope";
import { get2026HoroscopeZh } from "@/lib/zodiac-2026-horoscope-zh";
import { get2026HoroscopeJa } from "@/lib/zodiac-2026-horoscope-ja";
import { getAnimalName, t } from "@/lib/zodiac-locale";
import { getLocaleInfo } from "@/lib/locale-utils";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return CHINESE_ZODIAC_SIGNS.map((s) => ({ slug: s.key }));
}

/** Merge English horoscope with locale-specific overrides. */
function localizedHoroscope(sign: string, locale: string) {
  const en = get2026Horoscope(sign);
  if (!en) return null;
  if (locale === "en") return en;
  const overrides = locale === "zh-TW" ? get2026HoroscopeZh(sign) : locale === "ja" ? get2026HoroscopeJa(sign) : null;
  return overrides ? { ...en, ...overrides } : en;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const hor = localizedHoroscope(slug, locale);
  if (!sign || !hor) return { title: "Not Found" };
  const name = getAnimalName(slug, locale);
  if (isZh) {
    return {
      title: `${name}（${sign.animal}）2026年運勢 — 丙午火馬年運勢預測`,
      description: `${name}（${sign.animal}）2026年十二生肖運勢：${hor.overall.substring(0, 120)}`,
      openGraph: {
        title: `${name} 2026年年度運勢`,
        description: `丙午火馬年對${name}（${sign.animal}）意味著什麼？事業、愛情、健康和財運完整預測。`,
      },
    };
  }
  if (isJa) {
    return {
      title: `${name}（${sign.animal}）2026年運勢 — 丙午火馬年の予測`,
      description: `${name}（${sign.animal}）2026年の十二生肖占い：${hor.overall.substring(0, 120)}`,
      openGraph: {
        title: `${name} 2026年年間運勢`,
        description: `丙午火馬年が${name}（${sign.animal}）にもたらすもの。仕事運・恋愛運・健康運・金運を徹底予測。`,
      },
    };
  }
  return {
    title: `${sign.animal} 2026 Horoscope — Fire Horse Year Forecast`,
    description: `${sign.animal} 2026 Chinese zodiac horoscope: ${hor.overall.substring(0, 120)}`,
    openGraph: {
      title: `${sign.animal} 2026 Yearly Horoscope`,
      description: `What does the Fire Horse year 2026 hold for ${sign.animal}? Career, love, health, and finance predictions.`,
    },
  };
}

export default async function Horoscope2026DetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const hor = localizedHoroscope(slug, locale);
  if (!sign || !hor) notFound();
  const name = getAnimalName(slug, locale);

  const allSigns = CHINESE_ZODIAC_SIGNS.filter((s) => s.key !== slug);

  const breadcrumbItems = [
    { label: t("Home", locale), href: "/" },
    { label: t("Zodiac", locale), href: "/zodiac" },
    { label: t("2026 Horoscopes", locale), href: "/zodiac/2026" },
    { label: name },
  ];

  const ctaTitle = isZh ? "獲取您的個人化2026年命盤解讀" : isJa ? "あなた専用の2026年鑑定を受ける" : "Get Your Personalized 2026 Reading";
  const ctaDesc = isZh ? "您的八字命盤結合出生資訊與2026年流年能量，獲得真正個人化的運勢預測。" : isJa ? "あなたの八字命式に2026年のエネルギーを掛け合わせた完全個人向け予測。" : "Your Ba Zi chart combines your birth details with 2026 energies for a truly personalized forecast.";
  const ctaBtn = isZh ? "開始排盤" : isJa ? "命式を計算する" : "Calculate Your Ba Zi";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 mb-8">
        <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-red-600 mb-2">
          {isZh ? "2026丙午火馬年" : isJa ? "2026年 丙午火馬の年" : "2026 Fire Horse Year"}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          {isZh ? `${name} 2026年運勢` : isJa ? `${name} 2026年運勢` : `${sign.animal} 2026 Horoscope`}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          {YEAR_2026_INFO.chinese} · {isZh ? "丙午火馬年" : isJa ? "丙午火馬の年" : "Year of the Fire Horse"}
        </p>
      </div>

      {/* Overall summary card */}
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-red-50 to-white p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3">🔮 {t("Overall Outlook", locale)}</h2>
        <p className="text-sm text-zinc-700 leading-relaxed">{hor.overall}</p>
      </div>

      {/* Detail grid */}
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">💼 {t("Career", locale)}</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{hor.career}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">❤️ {t("Love & Relationships", locale)}</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{hor.love}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-900 mb-2">💰 {t("Finance", locale)}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{hor.finance}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-900 mb-2">🏃 {t("Health", locale)}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{hor.health}</p>
          </div>
        </div>
      </div>

      {/* Lucky info */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-semibold text-amber-800 mb-3">🍀 {t("Lucky Items", locale)} {name}{isZh ? "" : isJa ? "" : ` for ${sign.animal}`} 2026</h2>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-xs text-amber-600 mb-1">{t("Lucky Elements", locale)}</p>
            <p className="text-amber-800 font-medium">{hor.luckyElements.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-amber-600 mb-1">{t("Lucky Colors", locale)}</p>
            <p className="text-amber-800 font-medium">{hor.luckyColors.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-amber-600 mb-1">{t("Lucky Numbers", locale)}</p>
            <p className="text-amber-800 font-medium">{hor.luckyNumbers.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Key months + advice */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold text-zinc-900 mb-2">📅 {t("Key Months", locale)}</h2>
          <p className="text-sm text-zinc-600">{hor.keyMonths}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="font-semibold text-green-800 mb-2">💡 {t("Advice for 2026", locale)}</h2>
          <p className="text-sm text-green-700">{hor.advice}</p>
        </div>
      </div>

      {/* Other signs */}
      <div className="mt-10 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-500 mb-3">{t("Other Signs in 2026", locale)}</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {allSigns.slice(0, 6).map((s) => (
            <Link
              key={s.key}
              href={`/zodiac/2026/${s.key}`}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:border-zinc-300 transition-colors text-center"
            >
              {getAnimalName(s.key, locale)}
            </Link>
          ))}
        </div>
        <Link
          href="/zodiac/2026"
          className="mt-3 block text-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          {t("View All 2026 Horoscopes", locale)} →
        </Link>
      </div>

      {/* Related blog articles */}
      <RelatedArticles keyword={slug} locale={locale} limit={3} />

      {/* CTA */}
      <div className="mt-8 rounded-xl bg-zinc-900 p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">{ctaTitle}</h3>
        <p className="text-sm text-zinc-300 mb-4">{ctaDesc}</p>
        <Link
          href="/bazi"
          className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          {ctaBtn}
        </Link>
      </div>
    </div>
  );
}
