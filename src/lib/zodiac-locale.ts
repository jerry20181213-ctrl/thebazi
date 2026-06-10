/**
 * Locale-aware helpers for Chinese zodiac content.
 *
 * Provides localized animal names, section headers, and horoscope content
 * so zh-TW and ja pages show properly translated text instead of English.
 */

/** Localized animal names. */
export const ANIMAL_NAMES: Record<string, { en: string; zh: string; ja: string }> = {
  rat:    { en: "Rat",    zh: "鼠",   ja: "子（ねずみ）" },
  ox:     { en: "Ox",     zh: "牛",   ja: "丑（うし）" },
  tiger:  { en: "Tiger",  zh: "虎",   ja: "寅（とら）" },
  rabbit: { en: "Rabbit", zh: "兔",   ja: "卯（うさぎ）" },
  dragon: { en: "Dragon", zh: "龍",   ja: "辰（たつ）" },
  snake:  { en: "Snake",  zh: "蛇",   ja: "巳（へび）" },
  horse:  { en: "Horse",  zh: "馬",   ja: "午（うま）" },
  goat:   { en: "Goat",   zh: "羊",   ja: "未（ひつじ）" },
  monkey: { en: "Monkey", zh: "猴",   ja: "申（さる）" },
  rooster:{ en: "Rooster",zh: "雞",   ja: "酉（とり）" },
  dog:    { en: "Dog",    zh: "狗",   ja: "戌（いぬ）" },
  pig:    { en: "Pig",    zh: "豬",   ja: "亥（いのしし）" },
};

/** Get the animal name in the appropriate language. */
export function getAnimalName(key: string, locale: string): string {
  const entry = ANIMAL_NAMES[key];
  if (!entry) return key;
  if (locale === "zh-TW") return entry.zh;
  if (locale === "ja") return entry.ja;
  return entry.en;
}

/** Section headers used on horoscope / detail pages. */
export function t(key: string, locale: string): string {
  const ZH: Record<string, string> = {
    "Overall Outlook": "整體運勢",
    "Career": "事業運",
    "Love & Relationships": "感情運",
    "Finance": "財運",
    "Health": "健康運",
    "Lucky Items": "幸運物品",
    "Lucky Elements": "幸運五行",
    "Lucky Colors": "幸運顏色",
    "Lucky Numbers": "幸運號碼",
    "Key Months": "關鍵月份",
    "Advice for 2026": "2026年建議",
    "About the Fire Horse Year": "關於丙午火馬年",
    "Year Animal": "年支生肖",
    "Element": "五行",
    "Energy": "能量",
    "Other Signs in 2026": "其他生肖2026年運勢",
    "View All 2026 Horoscopes": "查看所有2026年運勢",
    "Get Your Personalized 2026 Reading": "獲取您的個人化2026年命盤解讀",
    "Your Ba Zi chart combines your birth details with 2026 energies": "您的八字命盤結合出生資訊與2026年流年能量",
    "Calculate Your Ba Zi": "開始排盤",
    "Passionate, Fast, Bold": "熱情、快速、大膽",
    "2026 Chinese Zodiac Horoscope": "2026年十二生肖運勢",
    "Fire Horse Year": "丙午火馬年",
  };
  const JA: Record<string, string> = {
    "Overall Outlook": "総合運",
    "Career": "仕事運",
    "Love & Relationships": "恋愛運",
    "Finance": "金運",
    "Health": "健康運",
    "Lucky Items": "ラッキーアイテム",
    "Lucky Elements": "ラッキーエレメント",
    "Lucky Colors": "ラッキーカラー",
    "Lucky Numbers": "ラッキーナンバー",
    "Key Months": "重要月",
    "Advice for 2026": "2026年のアドバイス",
    "About the Fire Horse Year": "丙午火馬の年について",
    "Year Animal": "年支の生肖",
    "Element": "五行",
    "Energy": "エネルギー",
    "Other Signs in 2026": "他の生肖の2026年運勢",
    "View All 2026 Horoscopes": "すべての2026年運勢を見る",
    "Get Your Personalized 2026 Reading": "あなた専用の2026年鑑定を受ける",
    "Your Ba Zi chart combines your birth details with 2026 energies": "あなたの八字命式に2026年のエネルギーを掛け合わせた完全個人向け予測",
    "Calculate Your Ba Zi": "命式を計算する",
    "Passionate, Fast, Bold": "情熱的、迅速的、大胆",
    "2026 Chinese Zodiac Horoscope": "2026年 十二生肖占い",
    "Fire Horse Year": "丙午火馬の年",
  };

  if (locale === "zh-TW") return ZH[key] ?? key;
  if (locale === "ja") return JA[key] ?? key;
  return key;
}
