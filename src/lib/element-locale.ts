/**
 * Locale-aware helpers for Five Elements content.
 */

/** Element name translations. */
export const ELEMENT_NAMES: Record<string, { zh: string; ja: string }> = {
  wood:  { zh: "木", ja: "木" },
  fire:  { zh: "火", ja: "火" },
  earth: { zh: "土", ja: "土" },
  metal: { zh: "金", ja: "金" },
  water: { zh: "水", ja: "水" },
};

/** Element season translations. */
export const ELEMENT_SEASONS: Record<string, { zh: string; ja: string }> = {
  wood:  { zh: "春季", ja: "春" },
  fire:  { zh: "夏季", ja: "夏" },
  earth: { zh: "季夏／過渡期", ja: "晩夏／変わり目" },
  metal: { zh: "秋季", ja: "秋" },
  water: { zh: "冬季", ja: "冬" },
};

/** Element direction translations. */
export const ELEMENT_DIRECTIONS: Record<string, { zh: string; ja: string }> = {
  wood:  { zh: "東", ja: "東" },
  fire:  { zh: "南", ja: "南" },
  earth: { zh: "中央", ja: "中央" },
  metal: { zh: "西", ja: "西" },
  water: { zh: "北", ja: "北" },
};

/** Element color translations. */
export const ELEMENT_COLORS: Record<string, { zh: string; ja: string }> = {
  wood:  { zh: "綠色", ja: "緑" },
  fire:  { zh: "紅色", ja: "赤" },
  earth: { zh: "黃色／棕色", ja: "黄／茶" },
  metal: { zh: "白色／金色", ja: "白／金" },
  water: { zh: "藍色／黑色", ja: "青／黒" },
};

/** Element personality translations. */
export const ELEMENT_PERSONALITIES: Record<string, { zh: string; ja: string }> = {
  wood:  { zh: "富有創造力、開闊、慷慨、理想主義", ja: "創造的、拡大的、寛大、理想主義的" },
  fire:  { zh: "熱情、魅力、活力、善於表達", ja: "情熱的、カリスマ的、活力的、表現豊か" },
  earth: { zh: "穩定、滋養、務實、可靠", ja: "安定、養育的、実用的、信頼できる" },
  metal: { zh: "自律、精準、堅定、有條理", ja: "規律正しい、正確、決断力がある、構造的" },
  water: { zh: "適應、直覺、反思、智慧", ja: "適応力がある、直感的、内省的、賢明" },
};

/** Element descriptions in zh-TW and JA. */
export const ELEMENT_DESCRIPTIONS: Record<string, { zh: string; ja: string }> = {
  wood: {
    zh: "木是春季和新開始的元素。就像樹木向陽生長，木的能量關乎成長、擴張和向前推進。木能量強的人是天生的遠見者——他們能看到大局，並激勵他人成長。木需要平衡：過多會導致僵化和急躁，過少則會缺乏方向感。",
    ja: "木は春と新たな始まりの元素です。太陽に向かって伸びる木々のように、木のエネルギーは成長、拡大、前進に関わっています。木のエネルギーが強い人は生まれつきのビジョナリーで、全体像を見据え、周囲を成長へと導きます。バランスが重要で、過剰だと頑固で短気になり、不足すると方向性を失います。",
  },
  fire: {
    zh: "火是夏季、熱情和轉變的元素。它代表溫暖、光明和生命本身的火花。火型人是天生的領導者，能點亮他們進入的每一個房間。他們在興奮中茁壯成長，並由內心驅動。但如同真實的火焰，火需要燃料和控制——太強則吞噬一切，太弱則熄滅。",
    ja: "火は夏、情熱、変容の元素です。暖かさ、照明、生命の火花そのものを表します。火の人は生まれつきのリーダーで、入る部屋を明るく照らします。興奮に満ち、心によって動かされます。しかし本物の炎と同様、燃料と制御が必要です。強すぎると全てを消費し、弱すぎると消え去ります。",
  },
  earth: {
    zh: "土是穩定、滋養和中心的元素。就像大地支撐所有生命，土的能量為其他一切提供基礎。土型人是他們社區的基石——可靠、滋養、總是在需要時出現。他們以可持續性和長期安全為思考重心。土的能量是回歸自我。",
    ja: "土は安定、栄養、中心の元素です。大地がすべての生命を支えるように、土のエネルギーは他の全ての基盤を提供します。土の人はコミュニティの岩のような存在で、信頼でき、養育的で、必要なときに必ずそこにいます。持続可能性と長期的な安定を重視します。土のエネルギーは自分自身に帰ることを意味します。",
  },
  metal: {
    zh: "金是秋季、結構和精煉的元素。就像礦石被鍛造成鋼，金的能量關乎紀律、精準和內在力量。金型人天生具有正義感和秩序感。他們為自己和他人設定高標準，並有決心去達成。金能量掌管邊界——無論是身體上的還是情感上的。",
    ja: "金は秋、構造、洗練の元素です。鉱石が鋼に鍛え上げられるように、金のエネルギーは規律、正確さ、内面的な強さに関わっています。金の人は生まれつき正義感と秩序感を持っています。自分にも他人にも高い基準を設定し、それを達成する決意があります。金のエネルギーは物理的・感情的な境界を司ります。",
  },
  water: {
    zh: "水是冬季、智慧和流動的元素。水是最柔軟的物質，但隨著時間可以在岩石上刻出痕跡。水型人具有深沉的直覺和情商。他們適應任何情況，繞過障礙而非正面對抗。水的能量代表深邃的潛意識和內在智慧的源泉。",
    ja: "水は冬、知恵、流れの元素です。水は最も柔らかい物質ですが、長い時間をかけて岩をも削ります。水の人は深い直感力と感情的知性を持っています。どんな状況にも適応し、障害に正面から立ち向かうのではなく、迂回して流れていきます。水のエネルギーは深い無意識と内的知恵の源泉を表します。",
  },
};

/** Map full locale code to the short key used in our lookup objects. */
function localeKey(locale: string): string {
  if (locale === "zh-TW") return "zh";
  if (locale === "ja") return "ja";
  return "en";
}

/** Get localized element name. */
export function getElementName(key: string, locale: string): string {
  const lk = localeKey(locale);
  if (lk === "zh" || lk === "ja") return ELEMENT_NAMES[key]?.[lk as "zh" | "ja"] || key;
  const names: Record<string, string> = { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" };
  return names[key] || key;
}

/** Get localized field (season, direction, color, personality). */
export function getElementField(key: string, field: "season" | "direction" | "color" | "personality", locale: string): string {
  const lk = localeKey(locale);
  if (lk === "en") return "";
  const MAPS: Record<string, Record<string, { zh: string; ja: string }>> = {
    season: ELEMENT_SEASONS,
    direction: ELEMENT_DIRECTIONS,
    color: ELEMENT_COLORS,
    personality: ELEMENT_PERSONALITIES,
  };
  return MAPS[field]?.[key]?.[lk as "zh" | "ja"] || "";
}

/** Get localized element description. */
export function getElementDescription(key: string, locale: string): string | null {
  const lk = localeKey(locale);
  if (lk === "en") return null;
  return ELEMENT_DESCRIPTIONS[key]?.[lk as "zh" | "ja"] || null;
}

/** Element cycle descriptions. */
export const CYCLES = {
  generating: {
    zh: "木生火 → 火生土（灰燼）→ 土生金 → 金生水 → 水生木",
    ja: "木は火を生み → 火は土（灰）を生み → 土は金を生み → 金は水を生み → 水は木を生む",
    en: "Wood feeds Fire → Fire creates Earth (ash) → Earth bears Metal → Metal collects Water → Water nourishes Wood",
  },
  controlling: {
    zh: "木剋土 → 土剋水 → 水剋火 → 火剋金 → 金剋木",
    ja: "木は土を剋し → 土は水を剋し → 水は火を剋し → 火は金を剋し → 金は木を剋す",
    en: "Wood breaks Earth → Earth absorbs Water → Water extinguishes Fire → Fire melts Metal → Metal cuts Wood",
  },
};
