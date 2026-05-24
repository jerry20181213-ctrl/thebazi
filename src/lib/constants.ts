export const CHINESE_ZODIAC_SIGNS = [
  { key: "rat", animal: "Rat", pinyin: "Rat", years: [2020, 2008, 1996, 1984, 1972, 1960] },
  { key: "ox", animal: "Ox", pinyin: "Ox", years: [2021, 2009, 1997, 1985, 1973, 1961] },
  { key: "tiger", animal: "Tiger", pinyin: "Tiger", years: [2022, 2010, 1998, 1986, 1974, 1962] },
  { key: "rabbit", animal: "Rabbit", pinyin: "Rabbit", years: [2023, 2011, 1999, 1987, 1975, 1963] },
  { key: "dragon", animal: "Dragon", pinyin: "Dragon", years: [2024, 2012, 2000, 1988, 1976, 1964] },
  { key: "snake", animal: "Snake", pinyin: "Snake", years: [2025, 2013, 2001, 1989, 1977, 1965] },
  { key: "horse", animal: "Horse", pinyin: "Horse", years: [2026, 2014, 2002, 1990, 1978, 1966] },
  { key: "goat", animal: "Goat", pinyin: "Goat", years: [2027, 2015, 2003, 1991, 1979, 1967] },
  { key: "monkey", animal: "Monkey", pinyin: "Monkey", years: [2028, 2016, 2004, 1992, 1980, 1968] },
  { key: "rooster", animal: "Rooster", pinyin: "Rooster", years: [2029, 2017, 2005, 1993, 1981, 1969] },
  { key: "dog", animal: "Dog", pinyin: "Dog", years: [2030, 2018, 2006, 1994, 1982, 1970] },
  { key: "pig", animal: "Pig", pinyin: "Pig", years: [2031, 2019, 2007, 1995, 1983, 1971] },
] as const;

export const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
export const HEAVENLY_STEMS_EN = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"];

export const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
export const EARTHLY_BRANCHES_EN = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"];

export const WUXING = {
  wood: "Wood",
  fire: "Fire",
  earth: "Earth",
  metal: "Metal",
  water: "Water",
} as const;

export const STEM_WUXING: Record<string, string> = {
  甲: "Wood", 乙: "Wood",
  丙: "Fire", 丁: "Fire",
  戊: "Earth", 己: "Earth",
  庚: "Metal", 辛: "Metal",
  壬: "Water", 癸: "Water",
};

export const BRANCH_WUXING: Record<string, string> = {
  子: "Water", 丑: "Earth",
  寅: "Wood", 卯: "Wood",
  辰: "Earth", 巳: "Fire",
  午: "Fire", 未: "Earth",
  申: "Metal", 酉: "Metal",
  戌: "Earth", 亥: "Water",
};

export const WUXING_COLORS: Record<string, string> = {
  Wood: "#4CAF50",
  Fire: "#F44336",
  Earth: "#FF9800",
  Metal: "#9E9E9E",
  Water: "#2196F3",
};

export const ELEMENT_EMOJIS: Record<string, string> = {
  Wood: "🌳",
  Fire: "🔥",
  Earth: "⛰️",
  Metal: "⚔️",
  Water: "💧",
};

export const SITE_CONFIG = {
  name: "The Ba Zi",
  tagline: "Discover Your Destiny Through Ancient Chinese Wisdom",
  description: "Free Ba Zi (Four Pillars of Destiny) calculator and AI-powered fortune reading. Explore your Chinese zodiac, five elements, and life path.",
  url: "https://thebazi.com",
  ogImage: "/og-image.png",
} as const;
