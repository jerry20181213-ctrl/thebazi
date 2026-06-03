import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { organizationSchema, websiteSchema, jsonLdScript } from "@/lib/json-ld";
import { routing } from "@/i18n/routing";
import { getLocaleInfo } from "@/lib/locale-utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isZh, isJa, localePath, ogLocale } = getLocaleInfo(locale);
  const baseUrl = "https://thebazi.com";

  const altTitle = isZh
    ? "The Ba Zi — 八字四柱命理"
    : isJa
      ? "The Ba Zi — 四柱推命"
      : "The Ba Zi — Four Pillars of Destiny";

  return {
    alternates: {
      languages: {
        en: baseUrl,
        "zh-TW": `${baseUrl}/zh-TW`,
        "zh-CN": `${baseUrl}/zh-TW`,
        ja: `${baseUrl}/ja`,
        "ja-JP": `${baseUrl}/ja`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      locale: ogLocale,
      siteName: "The Ba Zi",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: altTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    other: {
      "last-modified": "2026-06-03",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/i18n/dictionaries/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteSchema()) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
      <Analytics />
    </NextIntlClientProvider>
  );
}
