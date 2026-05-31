export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Ba Zi",
    url: "https://thebazi.com",
    description: "Free AI-powered Ba Zi (Four Pillars of Destiny) readings and Chinese astrology resources.",
    sameAs: ["https://ko-fi.com/thebazi"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Ba Zi",
    url: "https://thebazi.com",
    description: "Discover your destiny with free Ba Zi readings and Chinese zodiac insights.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://thebazi.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        item: `https://thebazi.com${item.href}`,
      })),
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleSchema(article: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || "The Ba Zi",
      url: "https://thebazi.com",
    },
    ...(article.image ? { image: article.image } : {}),
  };
}

// Helper to render JSON-LD script tag as string
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data, null, 2);
}
