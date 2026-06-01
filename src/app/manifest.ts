import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Ba Zi — Free Chinese Four Pillars of Destiny Reading",
    short_name: "The Ba Zi",
    description: "Free AI-powered Ba Zi (Four Pillars of Destiny) readings and Chinese astrology resources.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
