export const meta = {
  name: 'translate-blog-zh-tw',
  description: 'Translate untranslated English blog articles to zh-TW',
  phases: [
    { title: 'Scan', detail: 'Read English blog content and identify untranslated articles' },
    { title: 'Translate', detail: 'Parallel translation of articles to zh-TW' },
    { title: 'Assemble', detail: 'Write the complete zh-TW blog-content file' },
  ],
};

const OUTPUT_FILE = '/Users/jerry/thebazi/src/lib/blog-content-zh.ts';
const SOURCE_FILE = '/Users/jerry/thebazi/src/lib/blog-content.ts';

phase('Scan');

// Read the existing zh-TW file to know which slugs are already done
const zhContent = await agent('Read the file at ' + OUTPUT_FILE + ' and list ALL slugs present in it. Return the result as a JSON array of slug strings.', {
  schema: {
    type: 'object',
    properties: {
      existingSlugs: { type: 'array', items: { type: 'string' } },
    },
    required: ['existingSlugs'],
  },
});
const existingSlugs = new Set(zhContent.existingSlugs);
log('Found ' + existingSlugs.size + ' existing zh-TW articles: ' + [...existingSlugs].join(', '));

// Read SOURCE_FILE and identify untranslated articles
const articlesToTranslate = await agent('Read the file at ' + SOURCE_FILE + ' — this is a TypeScript file with an array of BLOG_ARTICLES containing BlogArticle objects. Each has: slug, title, description, datePublished, category, tags, content, and optionally imageWords. Find ALL articles whose slug is NOT in this set: ' + JSON.stringify([...existingSlugs]) + '. For each untranslated article, extract ALL fields completely — especially the FULL content field. Return them as a JSON array of objects. IMPORTANT: include every single untranslated article, do not miss any.', {
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
});

const articles = articlesToTranslate.articles;
log('Found ' + articles.length + ' untranslated articles to translate');

phase('Translate');

// Category name mapping for zh-TW
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

// Translate in batches
var BATCH_SIZE = 5;
var translatedArticles = [];

for (var i = 0; i < articles.length; i += BATCH_SIZE) {
  var batch = articles.slice(i, i + BATCH_SIZE);
  log('Translating batch ' + (Math.floor(i / BATCH_SIZE) + 1) + '/' + Math.ceil(articles.length / BATCH_SIZE) + ' (' + batch.length + ' articles)');

  var agents = batch.map(function(article) {
    return function() {
      var sourceSlug = article.slug;
      var sourceTitle = article.title;
      var sourceDesc = article.description;
      var sourceCat = article.category;
      var sourceDate = article.datePublished;
      var sourceTags = JSON.stringify(article.tags);
      var sourceImageWords = article.imageWords || '';
      var sourceContent = article.content;

      return agent(
        'You are an expert Chinese (Traditional, zh-TW) translator specializing in Chinese metaphysics. Translate the following Ba Zi article to zh-TW.\n\n' +
        'RULES:\n' +
        '1. Keep ALL HTML tags (<h2>, <strong>, <ul>, <li>, <a href=...>, etc.) INTACT — only translate the text between them\n' +
        '2. DO NOT change any URLs or href values\n' +
        '3. Use "八字" for "Ba Zi", use Traditional Chinese characters\n' +
        '4. Output ONLY the translated fields as JSON — no commentary, no markdown\n' +
        '5. Translate title, description, tags (each tag naturally), and imageWords too\n' +
        '6. For the category, output the English category name exactly as-is (it will be mapped later)\n' +
        '7. The content translation must be complete — do not truncate or summarize\n\n' +
        'SOURCE:\n' +
        'Slug: ' + sourceSlug + '\n' +
        'Title: ' + sourceTitle + '\n' +
        'Description: ' + sourceDesc + '\n' +
        'Tags: ' + sourceTags + '\n' +
        'ImageWords: ' + sourceImageWords + '\n' +
        'Content:\n' + sourceContent,
        {
          label: 'zh:' + sourceSlug,
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
        result.category = zhCategory(sourceCat);
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
  log('Batch complete — ' + translatedArticles.length + '/' + articles.length + ' articles translated');
}

phase('Assemble');

// Generate the complete TS file
var entries = [];
for (var j = 0; j < translatedArticles.length; j++) {
  var a = translatedArticles[j];
  var safeTitle = a.title.replace(/"/g, '\\"');
  var safeDesc = a.description.replace(/"/g, '\\"');
  var safeImageWords = (a.imageWords || '').replace(/"/g, '\\"');
  var safeTags = JSON.stringify(a.tags);

  entries.push('  {\n' +
    '    slug: "' + a.slug + '",\n' +
    '    title: "' + safeTitle + '",\n' +
    '    description: "' + safeDesc + '",\n' +
    '    datePublished: "' + a.datePublished + '",\n' +
    '    category: "' + a.category + '",\n' +
    '    tags: ' + safeTags + ',\n' +
    '    imageWords: "' + safeImageWords + '",\n' +
    '    content: `' + a.content + '`,\n' +
    '  }');
}
var articleEntriesStr = entries.join(',\n');

var fileContent = 'import type { BlogArticle } from "./blog-content";\n' +
  '\n' +
  'const ZH_BLOG_ARTICLES: BlogArticle[] = [\n' +
  articleEntriesStr + '\n' +
  '];\n' +
  '\n' +
  'export function getZhArticles(): BlogArticle[] {\n' +
  '  return ZH_BLOG_ARTICLES;\n' +
  '}\n' +
  '\n' +
  'export function getZhArticleBySlug(slug: string): BlogArticle | undefined {\n' +
  '  return ZH_BLOG_ARTICLES.find((a) => a.slug === slug);\n' +
  '}\n' +
  '\n' +
  'export function getZhArticleSlugs(): string[] {\n' +
  '  return ZH_BLOG_ARTICLES.map((a) => a.slug);\n' +
  '}\n';

// First backup existing file
await agent('Run this command: cp ' + OUTPUT_FILE + ' ' + OUTPUT_FILE + '.bak', {
  label: 'backup-existing',
  phase: 'Assemble',
});

// Write the new file
await agent(
  'Write the following content to ' + OUTPUT_FILE + ' using the Write tool. OVERWRITE the entire file.\n\n' +
  fileContent,
  {
    label: 'write-file',
    phase: 'Assemble',
  }
);

log('Done! Wrote ' + translatedArticles.length + ' zh-TW articles to ' + OUTPUT_FILE);
return { totalTranslated: translatedArticles.length, slugs: translatedArticles.map(function(a) { return a.slug; }) };
