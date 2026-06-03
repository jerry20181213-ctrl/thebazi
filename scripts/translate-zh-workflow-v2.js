export const meta = {
  name: 'translate-blog-zh-tw-v2',
  description: 'Translate remaining English blog articles to zh-TW in batches',
  phases: [
    { title: 'Translate', detail: 'Parallel translation of articles to zh-TW' },
    { title: 'Assemble', detail: 'Write the complete zh-TW blog-content file' },
  ],
};

var SOURCE_FILE = '/Users/jerry/thebazi/src/lib/blog-content.ts';
var OUTPUT_FILE = '/Users/jerry/thebazi/src/lib/blog-content-zh.ts';

// All remaining slugs that need zh-TW translation (59 total)
var ALL_SLUGS = [
  "what-is-bazi-four-pillars-of-destiny",
  "chinese-zodiac-2027-year-of-the-goat",
  "how-to-find-your-ba-zi-day-master",
  "chinese-zodiac-compatibility-guide",
  "chinese-five-elements-guide",
  "bazi-calculator-guide-how-to-read-your-chart",
  "chinese-zodiac-2026-year-of-the-horse",
  "bazi-vs-western-astrology-key-differences",
  "what-is-my-chinese-zodiac-sign",
  "chinese-zodiac-by-birth-year",
  "chinese-new-year-2026-year-of-the-horse",
  "bazi-free-reading-online",
  "bazi-missing-elements-balance",
  "chinese-horoscope-2026-fire-horse",
  "heavenly-stems-bazi-guide",
  "earthly-branches-chinese-zodiac",
  "lucky-colors-2026-chinese-zodiac",
  "chinese-zodiac-elements-personality",
  "chinese-gender-predictor-calendar",
  "feng-shui-bagua-map-guide",
  "feng-shui-wealth-corner-activation",
  "chinese-zodiac-2028-year-of-the-monkey",
  "chinese-zodiac-by-birth-month",
  "feng-shui-bedroom-layout-rules",
  "bazi-ten-gods-guide",
  "bazi-five-elements-health",
  "feng-shui-2026-2027-lucky-directions",
  "bazi-career-guidance-day-master",
  "bazi-da-yun-10-year-luck-cycles",
  "kitchen-feng-shui-arrangement-guide",
  "jia-zi-2026-horoscope",
  "yi-chou-2026-horoscope",
  "bing-yin-2026-horoscope",
  "ding-mao-2026-horoscope",
  "wu-chen-2026-horoscope",
  "ji-si-2026-horoscope",
  "geng-wu-2026-horoscope",
  "xin-wei-2026-horoscope",
  "ren-shen-2026-horoscope",
  "gui-you-2026-horoscope",
  "rat-2027-horoscope",
  "ox-2027-horoscope",
  "tiger-2027-horoscope",
  "rabbit-2027-horoscope",
  "dragon-2027-horoscope",
  "snake-2027-horoscope",
  "horse-2027-horoscope",
  "goat-2027-horoscope",
  "monkey-2027-horoscope",
  "rooster-2027-horoscope",
  "dog-2027-horoscope",
  "pig-2027-horoscope",
  "bazi-marriage-relationship-compatibility",
  "bazi-baby-naming-guide",
  "learn-bazi-part-1-foundations",
  "learn-bazi-part-2-four-pillars",
  "learn-bazi-part-3-stems-branches",
  "learn-bazi-part-4-five-elements",
  "learn-bazi-part-5-reading"
];

var CATEGORY_MAP = {
  'Ba Zi Basics': '八字基礎',
  'Chinese Zodiac': '生肖運程',
  'Five Elements': '五行養生',
  'Feng Shui': '風水',
  'Day Master Horoscopes': '日主運勢',
  '2027 Horoscopes': '2027年運勢',
  'Learn Ba Zi': '八字教學',
  'Monthly Horoscopes': '每月運勢',
  'Relationships': '感情配對',
  'Baby Naming': '嬰兒取名',
};

function zhCategory(en) {
  return CATEGORY_MAP[en] || en;
}

phase('Translate');

var BATCH_SIZE = 5;
var translatedArticles = [];

for (var i = 0; i < ALL_SLUGS.length; i += BATCH_SIZE) {
  var batch = ALL_SLUGS.slice(i, i + BATCH_SIZE);
  log('Translating batch ' + (Math.floor(i / BATCH_SIZE) + 1) + '/' + Math.ceil(ALL_SLUGS.length / BATCH_SIZE) + ' — ' + batch.join(', '));

  var agents = batch.map(function(slug) {
    return function() {
      return agent(
        'Read the file at ' + SOURCE_FILE + ' and find the article with slug: "' + slug + '". Extract its FULL content and metadata (title, description, datePublished, category, tags, content, imageWords).\n\n' +
        'Then translate the ENTIRE article to Traditional Chinese (zh-TW).\n\n' +
        'RULES:\n' +
        '1. Keep ALL HTML tags (<h2>, <strong>, <ul>, <li>, <a href=...>, etc.) INTACT — only translate text between them\n' +
        '2. DO NOT change any internal URLs (/bazi, /zodiac, /five-elements, etc.)\n' +
        '3. DO NOT change href values in <a> tags — keep paths identical\n' +
        '4. Use "八字" for "Ba Zi", use Traditional Chinese characters (not Simplified)\n' +
        '5. Keep the tag/identifier "zh-TW" references as-is\n' +
        '6. Output ONLY the fields below — no commentary, no markdown wrapping\n' +
        '7. Translate title, description, tags (each tag naturally), imageWords too\n' +
        '8. For the category field, return the English category name (it will be mapped) — e.g. "Ba Zi Basics", "Chinese Zodiac"\n' +
        '9. The content translation must be COMPLETE — do not truncate or summarize. Include every paragraph.\n' +
        '10. Keep the same datePublished value.\n' +
        '11. Slug stays the same: "' + slug + '"',
        {
          label: 'zh:' + slug,
          phase: 'Translate',
          schema: {
            type: 'object',
            properties: {
              slug: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              datePublished: { type: 'string' },
              category: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
              content: { type: 'string' },
              imageWords: { type: 'string' },
            },
            required: ['slug', 'title', 'description', 'datePublished', 'category', 'tags', 'content'],
          },
        }
      ).then(function(result) {
        result.category = zhCategory(result.category);
        return result;
      });
    };
  });

  var results = await parallel(agents);
  for (var r = 0; r < results.length; r++) {
    if (results[r]) {
      translatedArticles.push(results[r]);
    }
  }
  log('Batch ' + (Math.floor(i / BATCH_SIZE) + 1) + ' complete — ' + translatedArticles.length + '/' + ALL_SLUGS.length + ' articles translated');
}

phase('Assemble');

// Build the TS file content — append to existing base articles
// First, read the existing zh-TW file to keep the 5 original articles
var existingContent = await agent(
  'Read the file at ' + OUTPUT_FILE + ' and extract ALL article objects (slug, title, description, datePublished, category, tags, content, imageWords). Return them as a JSON array. These are the EXISTING zh-TW articles that must be preserved.',
  {
    label: 'read-existing',
    phase: 'Assemble',
    schema: {
      type: 'object',
      properties: {
        articles: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              slug: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              datePublished: { type: 'string' },
              category: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
              content: { type: 'string' },
              imageWords: { type: 'string' },
            },
            required: ['slug', 'title', 'description', 'datePublished', 'category', 'tags', 'content'],
          },
        },
      },
      required: ['articles'],
    },
  }
);

var allArticles = existingContent.articles.concat(translatedArticles);
log('Total articles for output: ' + allArticles.length + ' (' + existingContent.articles.length + ' existing + ' + translatedArticles.length + ' new)');

// Remove duplicates by slug
var seen = {};
var deduped = [];
for (var k = 0; k < allArticles.length; k++) {
  var art = allArticles[k];
  if (!seen[art.slug]) {
    seen[art.slug] = true;
    deduped.push(art);
  }
}
log('After dedup: ' + deduped.length + ' articles');

// Build file content using string concatenation (no template literals to avoid escaping issues)
var lines = [];
lines.push('import type { BlogArticle } from "./blog-content";');
lines.push('');
lines.push('const ZH_BLOG_ARTICLES: BlogArticle[] = [');

for (var j = 0; j < deduped.length; j++) {
  var a = deduped[j];
  var safeTitle = a.title.replace(/"/g, '\\"');
  var safeDesc = a.description.replace(/"/g, '\\"');
  var safeImageWords = (a.imageWords || '').replace(/"/g, '\\"');
  var safeTags = JSON.stringify(a.tags);

  lines.push('  {');
  lines.push('    slug: "' + a.slug + '",');
  lines.push('    title: "' + safeTitle + '",');
  lines.push('    description: "' + safeDesc + '",');
  lines.push('    datePublished: "' + a.datePublished + '",');
  lines.push('    category: "' + a.category + '",');
  lines.push('    tags: ' + safeTags + ',');
  lines.push('    imageWords: "' + safeImageWords + '",');
  lines.push('    content: `' + a.content + '`,');
  lines.push('  },');
}

lines.push('];');
lines.push('');
lines.push('export function getZhArticles(): BlogArticle[] {');
lines.push('  return ZH_BLOG_ARTICLES;');
lines.push('}');
lines.push('');
lines.push('export function getZhArticleBySlug(slug: string): BlogArticle | undefined {');
lines.push('  return ZH_BLOG_ARTICLES.find((a) => a.slug === slug);');
lines.push('}');
lines.push('');
lines.push('export function getZhArticleSlugs(): string[] {');
lines.push('  return ZH_BLOG_ARTICLES.map((a) => a.slug);');
lines.push('}');

var fileContent = lines.join('\n');

await agent(
  'Write the following content to ' + OUTPUT_FILE + ' using the Write tool, overwriting the ENTIRE file:\n\n' +
  fileContent,
  {
    label: 'write-final-file',
    phase: 'Assemble',
  }
);

log('Done! Wrote ' + deduped.length + ' zh-TW articles to ' + OUTPUT_FILE);
return { total: deduped.length, newTranslations: translatedArticles.length, slugs: translatedArticles.map(function(a) { return a.slug; }) };
