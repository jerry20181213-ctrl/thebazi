import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { organizationSchema, websiteSchema, jsonLdScript } from "@/lib/json-ld";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  const baseUrl = "https://thebazi.com";
  const localePath = isZh ? "/zh-TW" : "";

  return {
    alternates: {
      languages: {
        en: baseUrl,
        "zh-TW": `${baseUrl}/zh-TW`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      locale: isZh ? "zh_TW" : "en_US",
      siteName: "The Ba Zi",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isZh ? "The Ba Zi — 八字四柱命理" : "The Ba Zi — Four Pillars of Destiny",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    other: {
      "og:locale:alternate": isZh ? "en_US" : "zh_TW",
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
