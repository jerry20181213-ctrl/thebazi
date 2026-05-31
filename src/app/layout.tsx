import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import { organizationSchema, websiteSchema, jsonLdScript } from "@/lib/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    template: "%s | The Ba Zi",
  },
  description: "Discover your destiny with a free AI-powered Ba Zi (Four Pillars of Destiny) reading. Calculate your Chinese zodiac, five elements, and get personalized fortune insights.",
  keywords: ["Ba Zi", "Four Pillars of Destiny", "Chinese zodiac", "fortune telling", "八字", "Chinese astrology", "five elements", "feng shui"],
  openGraph: {
    title: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    description: "Discover your destiny with a free AI-powered Ba Zi reading.",
    type: "website",
  },
  alternates: {
    canonical: "https://thebazi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900">
        <GoogleAnalytics />
        <GoogleAdSense />
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
      </body>
    </html>
  );
}
