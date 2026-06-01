import { getAllArticles } from "@/lib/blog-content";

export const dynamic = "force-static";

export async function GET() {
  const articles = getAllArticles();
  const siteUrl = "https://thebazi.com";
  const now = new Date().toUTCString();

  const items = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.description}]]></description>
      <link>${siteUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>
      <category>${article.category}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Ba Zi — Blog</title>
    <description>Free guides and insights about Ba Zi (Four Pillars of Destiny), Chinese zodiac, Five Elements, and Chinese astrology.</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
