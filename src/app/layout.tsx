import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
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
  metadataBase: new URL("https://thebazi.com"),
  title: {
    default: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    template: "%s | The Ba Zi",
  },
  description:
    "Discover your destiny with a free AI-powered Ba Zi (Four Pillars of Destiny) reading. Calculate your Chinese zodiac, five elements, and get personalized fortune insights.",
  keywords: [
    "Ba Zi",
    "Four Pillars of Destiny",
    "Chinese zodiac",
    "fortune telling",
    "八字",
    "Chinese astrology",
    "five elements",
    "feng shui",
  ],
  openGraph: {
    title: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    description:
      "Discover your destiny with a free AI-powered Ba Zi reading.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Ba Zi — Four Pillars of Destiny",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    description: "Discover your destiny with a free AI-powered Ba Zi reading.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900">
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://ko-fi.com" />
        <GoogleAnalytics />
        <GoogleAdSense />
        {children}
      </body>
    </html>
  );
}
