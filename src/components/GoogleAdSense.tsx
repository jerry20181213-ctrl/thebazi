"use client";

import Script from "next/script";

export default function GoogleAdSense() {
  return (
    <Script
      id="adsense-auto-ads"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8064533860037208"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
