import type { Metadata } from "next";
import Link from "next/link";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { get2026Horoscope, YEAR_2026_INFO } from "@/lib/zodiac-2026-horoscope";
import { getAnimalName, t } from "@/lib/zodiac-locale";
import { getLocaleInfo } from "@/lib/locale-utils";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

const ZH_YEAR_DESC = "火馬是六十甲子中最強大且能量最強烈的組合，每60年僅出現一次（上一次是1966年）。丙午火馬年帶來充滿熱情的能量、快速變化和轉型機遇，影響生活各領域。";
const JA_YEAR_DESC = "火馬（ひのえうま）は六十干支の中で最も強力な組み合わせで、60年に一度しか巡ってきません（前回は1966年）。情熱的なエネルギー、急速な変化、変革の機会をもたらす年です。";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);
  return {
    title: isZh ? "2026丙午馬年運勢 — 十二生肖完整預測" : isJa ? "2026年 十二生肖占い — 完全予測" : "2026 Fire Horse Year Horoscope — Chinese Zodiac Forecasts",
    description: isZh
      ? "2026年是丙午火馬年，查看十二生肖在事業、財運、感情和健康方面的完整運勢預測。"
      : isJa
        ? "2026年は丙午火馬の年。全12生肖の事業運・金運・恋愛運・健康運を詳細に予測します。"
        : "Comprehensive 2026 Chinese zodiac horoscopes for all 12 signs. Discover what the Fire Horse year brings for your career, love, health, and finances in 2026.",
    openGraph: {
      title: isZh ? "2026馬年運勢 — 十二生肖預測" : isJa ? "2026年 十二生肖占い" : "2026 Fire Horse Year Horoscope — Complete Zodiac Forecast",
      description: isZh ? "2026火馬年為你帶來什麼？" : isJa ? "2026年丙午火馬の年があなたにもたらすもの。" : "What does the Fire Horse year 2026 hold for you?",
    },
  };
}

const ELEMENT_BG: Record<string, string> = {
  rat: "bg-blue-50", ox: "bg-amber-50", tiger: "bg-green-50",
  rabbit: "bg-green-50", dragon: "bg-amber-50", snake: "bg-red-50",
  horse: "bg-red-50", goat: "bg-amber-50", monkey: "bg-zinc-50",
  rooster: "bg-zinc-50", dog: "bg-amber-50", pig: "bg-blue-50",
};

export default async function Horoscope2026Page({ params }: Props) {
  const { locale } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: t("Home", locale), href: "/" },
          { label: t("Zodiac", locale), href: "/zodiac" },
          { label: t("2026 Horoscopes", locale) },
        ])) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Breadcrumb items={[
            { label: t("Home", locale), href: "/" },
            { label: t("Zodiac", locale), href: "/zodiac" },
            { label: t("2026 Horoscopes", locale) },
          ]} />
          <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-medium text-red-600 mb-4">
            {isZh ? "2026 丙午火馬年" : isJa ? "2026 丙午火馬の年" : "2026 Fire Horse Year"}
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("2026 Chinese Zodiac Horoscope", locale)}
          </h1>
          <p className="mt-3 text-sm text-zinc-500 max-w-2xl mx-auto">
            {YEAR_2026_INFO.chinese} — {isZh ? ZH_YEAR_DESC : isJa ? JA_YEAR_DESC : YEAR_2026_INFO.description}
          </p>
        </div>
      </section>

      {/* Quick intro to the year */}
      <section className="pb-6">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">🔥 {t("About the Fire Horse Year", locale)}</h2>
            <p className="text-sm text-red-700 leading-relaxed mb-3">
              {isZh ? ZH_YEAR_DESC : isJa ? JA_YEAR_DESC : YEAR_2026_INFO.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">🐴</span>
                <span className="font-medium text-zinc-700">{t("Year Animal", locale)}</span>
                <span className="block text-xs text-zinc-500">{isZh ? "馬" : isJa ? "馬（うま）" : "Horse"}</span>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">🔥</span>
                <span className="font-medium text-zinc-700">{t("Element", locale)}</span>
                <span className="block text-xs text-zinc-500">{isZh ? "火" : isJa ? "火" : "Fire"}</span>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center">
                <span className="block text-lg mb-1">⚡</span>
                <span className="font-medium text-zinc-700">{t("Energy", locale)}</span>
                <span className="block text-xs text-zinc-500">{t("Passionate, Fast, Bold", locale)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign grid */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-6">{isZh ? "選擇您的生肖" : isJa ? "あなたの生肖を選ぶ" : "Choose Your Sign"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHINESE_ZODIAC_SIGNS.map((sign) => {
              const hor = get2026Horoscope(sign.key);
              const name = getAnimalName(sign.key, locale);
              return (
                <Link
                  key={sign.key}
                  href={`/zodiac/2026/${sign.key}`}
                  className={`rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:shadow-sm ${ELEMENT_BG[sign.key]}`}
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                    {hor?.overall.substring(0, 120)}...
                  </p>
                  <span className="mt-3 inline-block text-xs font-medium text-red-500">
                    {isZh ? "查看2026年運勢 →" : isJa ? "2026年運勢を読む →" : "Read 2026 Forecast →"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-8 text-center">
        <p className="text-xs text-zinc-400 max-w-xl mx-auto">
          {isZh
            ? "這些運勢預測基於傳統中國生肖學說和五行理論，僅供娛樂和個人參考。"
            : isJa
              ? "これらの運勢予測は伝統的な中国十二生肖の原理と五行思想に基づいています。娯楽および自己反省の目的でお楽しみください。"
              : "These horoscopes are based on traditional Chinese zodiac principles and the Five Elements. They are for entertainment and personal reflection purposes."}
        </p>
      </section>
    </div>
  );
}
