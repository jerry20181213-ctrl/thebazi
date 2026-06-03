import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Optimize for static export performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "index, follow",
        },
      ],
    },
    {
      source: "/m/:code",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "noindex",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
