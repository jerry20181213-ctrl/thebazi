import { HEAVENLY_STEMS, HEAVENLY_STEMS_EN, STEM_WUXING } from "./constants";

export interface StemDetail {
  chinese: string;
  pinyin: string;
  element: string;
  yinYang: "Yang" | "Yin";
  direction: string;
  season: string;
  color: string;
  aspect: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  career: string;
  relationships: string;
  health: string;
  compatibleStems: string[];
  description: string;
  imageWords: string;
}

const STEMS_DATA: Record<string, StemDetail> = {
  "甲": {
    chinese: "甲",
    pinyin: "Jia",
    element: "Wood",
    yinYang: "Yang",
    direction: "East",
    season: "Spring",
    color: "Forest Green",
    aspect: "Left / Forward",
    personality: "Jia is the towering tree — ambitious, expansive, and noble. People with strong Jia energy are natural leaders with a grand vision. They think big, act boldly, and inspire others to follow. Like a great tree, they provide shelter and strength to those around them.",
    strengths: ["Natural leadership and vision", "Courage to pursue ambitious goals", "Generosity and protective nature", "Pioneering spirit and innovation"],
    weaknesses: ["Can be domineering or overbearing", "Impatient with details and delays", "Stubborn when challenged", "Tendency to take on too much"],
    career: "Jia people thrive in leadership and visionary roles. They excel as entrepreneurs, executives, architects, environmentalists, and in any position where they can shape the future. Their ability to see the big picture makes them natural CEOs and founders.",
    relationships: "In relationships, Jia is protective and generous. They take charge naturally and care for their loved ones with grand gestures. They need partners who respect their independence while providing emotional grounding. Best matches with Earth and Fire stems.",
    health: "Jia energy governs the liver and eyes. People with strong Jia Wood need regular exercise and stretching to keep energy flowing. They benefit from time in nature, especially forests. Avoid overconsumption of alcohol and fatty foods.",
    compatibleStems: ["戊", "己", "丙", "丁"],
    description: "Jia (甲) is the first Heavenly Stem, representing Yang Wood. It is the energy of the towering tree — the pioneer, the visionary, the natural leader. In Ba Zi, Jia Wood is one of the most powerful and auspicious day masters. People with Jia as their Day Master are born leaders who see the big picture and inspire others to action.",
    imageWords: "Towering tree, pillar of strength, vision, leadership, expansion, pioneer spirit",
  },
  "乙": {
    chinese: "乙",
    pinyin: "Yi",
    element: "Wood",
    yinYang: "Yin",
    direction: "East",
    season: "Spring",
    color: "Emerald / Soft Green",
    aspect: "Right / Behind",
    personality: "Yi is the flowering vine — graceful, adaptable, and persistent. Where Jia charges forward, Yi finds a way around obstacles. Yi people are diplomatic, creative, and remarkably determined. They achieve their goals through flexibility and quiet persistence rather than force.",
    strengths: ["Adaptability and flexibility", "Artistic creativity and refined taste", "Diplomatic and persuasive communication", "Quiet determination and persistence"],
    weaknesses: ["Can be indirect or manipulative", "Indecisive when under pressure", "Tendency to avoid confrontation", "May lack assertiveness"],
    career: "Yi people excel in roles requiring diplomacy and creativity. They thrive as designers, counselors, diplomats, writers, and in any field requiring finesse and adaptation. Their ability to read situations makes them excellent negotiators and strategists.",
    relationships: "In relationships, Yi is gentle and attentive. They adapt to their partner's needs but can lose themselves in the process. They need partners who appreciate their flexibility while providing stability. The vine needs a strong trellis to grow.",
    health: "Yi energy governs the liver and tendons. Like Jia, liver health is paramount. Yi people benefit from gentle exercise like tai chi, yoga, and stretching. They should avoid suppressed emotions, as this affects liver energy flow.",
    compatibleStems: ["丙", "丁", "壬", "癸"],
    description: "Yi (乙) is the second Heavenly Stem, representing Yin Wood. It is the energy of the flowering vine and delicate foliage — graceful, adaptable, and persistent. Unlike Jia's direct approach, Yi achieves through flexibility and quiet persistence. Yi Wood people are diplomats and artists who grow around obstacles rather than confronting them.",
    imageWords: "Flowering vine, graceful adaptation, quiet persistence, diplomacy, artistic refinement",
  },
  "丙": {
    chinese: "丙",
    pinyin: "Bing",
    element: "Fire",
    yinYang: "Yang",
    direction: "South",
    season: "Summer",
    color: "Vermilion Red",
    aspect: "Front / Outside",
    personality: "Bing is the blazing sun — warm, radiant, and generous. Bing people naturally attract others with their charisma and optimism. Like the sun, they give light and warmth without expecting anything in return. They are enthusiastic, expressive, and naturally inspiring.",
    strengths: ["Magnetic charisma and warmth", "Generosity and openness", "Natural optimism and positivity", "Ability to inspire and motivate others"],
    weaknesses: ["Can be overly impulsive", "Restless and easily bored", "May burn out from overgiving", "Tendency to be dramatic"],
    career: "Bing people are natural performers and leaders. They excel in entertainment, sales, politics, education, and any role where they can inspire others. Their warmth and enthusiasm make them exceptional speakers, trainers, and team motivators.",
    relationships: "In relationships, Bing is passionate and romantic. They bring warmth and excitement to their partnerships. They need partners who appreciate their social nature and can handle their intensity. Best matches with Wood and Earth stems.",
    health: "Bing energy governs the heart and blood circulation. People with strong Bing Fire need to manage their energy levels to avoid burnout. Cooling activities, meditation, and adequate rest are essential. Avoid overwork and emotional stress.",
    compatibleStems: ["甲", "乙", "戊", "己"],
    description: "Bing (丙) is the third Heavenly Stem, representing Yang Fire. It is the energy of the sun — warm, radiant, and life-giving. Bing is the most charismatic and generous of all the stems. In Ba Zi, Bing Fire as a Day Master indicates a person who naturally draws others to them with their warmth and optimism.",
    imageWords: "Blazing sun, radiant warmth, charisma, generosity, inspiration, leadership by example",
  },
  "丁": {
    chinese: "丁",
    pinyin: "Ding",
    element: "Fire",
    yinYang: "Yin",
    direction: "South",
    season: "Summer",
    color: "Crimson / Rose",
    aspect: "Back / Inside",
    personality: "Ding is the candle flame — gentle, focused, and illuminating. Unlike Bing's expansive brightness, Ding burns steadily and intimately. Ding people are refined, sensitive, and deeply perceptive. They bring warmth to those closest to them and see beauty in small details.",
    strengths: ["Refined sensitivity and perceptiveness", "Focus and concentration", "Devotion and loyalty to loved ones", "Artistic and aesthetic sensibilities"],
    weaknesses: ["Can be overly sensitive", "Tendency to worry and overthink", "May burn out from emotional giving", "Difficulty with confrontation"],
    career: "Ding people excel in roles requiring focus and refinement. They thrive as artists, researchers, counselors, designers, and in any field requiring attention to detail. Their ability to focus deeply makes them excellent in technical and creative specialties.",
    relationships: "In relationships, Ding is tender and devoted. They bring warmth and attention to their close relationships but need time to recharge. They need partners who appreciate their sensitivity and provide emotional security. Best matches with Wood and Earth stems.",
    health: "Ding energy governs the heart and blood vessels. Unlike Bing's robust fire, Ding's flame is more delicate. Emotional health directly affects physical wellbeing. They need a calm environment, adequate rest, and stress management.",
    compatibleStems: ["甲", "乙", "戊", "己"],
    description: "Ding (丁) is the fourth Heavenly Stem, representing Yin Fire. It is the energy of the candle flame — gentle, focused, and intimately warm. Where Bing is the sun that shines on everyone, Ding is the candle that warms those closest. Ding people are refined, sensitive, and deeply loyal.",
    imageWords: "Candle flame, gentle warmth, focused devotion, refined sensitivity, intimate illumination",
  },
  "戊": {
    chinese: "戊",
    pinyin: "Wu",
    element: "Earth",
    yinYang: "Yang",
    direction: "Center",
    season: "Late Summer",
    color: "Yellow / Ochre",
    aspect: "Middle / Core",
    personality: "Wu is the great mountain — solid, dependable, and unwavering. Wu people are the foundation of any team or family. They are trustworthy, patient, and remarkably consistent. Like a mountain, they cannot be easily moved — for better or worse. Their presence brings stability to any situation.",
    strengths: ["Unshakeable reliability and trustworthiness", "Patience and long-term perspective", "Calm under pressure", "Generous and protective nature"],
    weaknesses: ["Stubborn and resistant to change", "Can be overly conservative", "Slow to make decisions", "May be set in their ways"],
    career: "Wu people excel in roles requiring stability and responsibility. They thrive in real estate, agriculture, construction, government, and management. Their steady nature makes them excellent long-term planners, administrators, and leaders of traditional organizations.",
    relationships: "In relationships, Wu is steadfast and devoted. They express love through consistent care and practical support rather than grand gestures. They value long-term commitment and create stable homes. Best matches with Fire and Metal stems.",
    health: "Wu energy governs the spleen, stomach, and digestive system. Strong Earth energy supports good constitution but can lead to stagnation. Regular exercise, a varied diet, and staying mentally stimulated are important. Avoid overthinking and worry.",
    compatibleStems: ["丙", "丁", "庚", "辛"],
    description: "Wu (戊) is the fifth Heavenly Stem, representing Yang Earth. It is the energy of the great mountain — solid, dependable, and immovable. Wu Earth is the most stable and reliable of all the stems. In Ba Zi, Wu as a Day Master indicates a person who is trustworthy, patient, and the rock of their community.",
    imageWords: "Great mountain, solid foundation, unwavering stability, dependable strength, protective shelter",
  },
  "己": {
    chinese: "己",
    pinyin: "Ji",
    element: "Earth",
    yinYang: "Yin",
    direction: "Center",
    season: "Late Summer",
    color: "Brown / Tawny",
    aspect: "Inner / Receptive",
    personality: "Ji is the fertile soil — nurturing, receptive, and wise. Ji people create the conditions for growth in others, making them excellent teachers, healers, and supporters. They are adaptable yet centered, humble yet wise. Like good soil, they enrich everything that grows in them.",
    strengths: ["Nurturing and supportive nature", "Wisdom and receptivity to new ideas", "Adaptability within stability", "Patience and long-term cultivation"],
    weaknesses: ["Can be overly self-sacrificing", "Tendency to worry excessively", "May lack boundaries", "Difficulty saying no"],
    career: "Ji people excel in roles where they can nurture and develop others. They thrive in education, healthcare, counseling, hospitality, and human resources. Their ability to create optimal conditions for growth makes them exceptional managers, teachers, and caregivers.",
    relationships: "In relationships, Ji is deeply caring and devoted. They give generously and create warm, nurturing homes. They need partners who appreciate their giving nature while helping them maintain healthy boundaries. Best matches with Fire and Metal stems.",
    health: "Ji energy governs the spleen, pancreas, and digestive system. Ji people often absorb others' stress, so emotional boundaries are essential for their health. Regular meals, a balanced diet, and practices that ground them are beneficial.",
    compatibleStems: ["丙", "丁", "庚", "辛"],
    description: "Ji (己) is the sixth Heavenly Stem, representing Yin Earth. It is the energy of fertile soil — receptive, nurturing, and wise. Where Wu is the mountain that stands firm, Ji is the soil that receives seeds and nurtures growth. Ji people are the nurturers and enrichers of the world.",
    imageWords: "Fertile soil, nurturing wisdom, receptive growth, humble enrichment, supportive foundation",
  },
  "庚": {
    chinese: "庚",
    pinyin: "Geng",
    element: "Metal",
    yinYang: "Yang",
    direction: "West",
    season: "Autumn",
    color: "White / Silver",
    aspect: "Right / Forward",
    personality: "Geng is the raw ore — strong, determined, and unyielding. Geng people have an inner toughness that helps them cut through adversity with precision and force. They are direct, honest, and incredibly strong-willed. Like raw metal, they can withstand tremendous pressure.",
    strengths: ["Strong will and determination", "Direct and honest communication", "Ability to make tough decisions", "Resilience under pressure"],
    weaknesses: ["Can be blunt or harsh", "Rigid and unwilling to compromise", "Emotionally guarded", "May be overly critical"],
    career: "Geng people thrive in competitive and demanding environments. They excel in surgery, engineering, law enforcement, military, finance, and any field requiring tough decisions and precision. Their ability to cut through complexity makes them exceptional problem-solvers.",
    relationships: "In relationships, Geng is loyal and protective. They may struggle with emotional expression but are deeply devoted once committed. They need partners who appreciate their directness and respect their need for independence. Best matches with Earth and Water stems.",
    health: "Geng energy governs the lungs and large intestine. People with strong Geng Metal need to maintain respiratory health through exercise and clean air. They benefit from practices that help them soften and express emotions, like journaling or creative arts.",
    compatibleStems: ["戊", "己", "壬", "癸"],
    description: "Geng (庚) is the seventh Heavenly Stem, representing Yang Metal. It is the energy of raw ore — strong, unyielding, and full of potential. Geng Metal is the most determined and resilient of all the stems. In Ba Zi, Geng as a Day Master indicates a person of tremendous inner strength and fortitude.",
    imageWords: "Raw ore, unyielding strength, determination, precision cutting, resilience under pressure",
  },
  "辛": {
    chinese: "辛",
    pinyin: "Xin",
    element: "Metal",
    yinYang: "Yin",
    direction: "West",
    season: "Autumn",
    color: "Gold / Pearl",
    aspect: "Left / Behind",
    personality: "Xin is the polished jade — refined, elegant, and perceptive. Unlike Geng's raw strength, Xin is about refinement and beauty. Xin people have a keen eye for detail, a love of quality, and impeccable standards. They are the craftspeople, the perfectionists, the connoisseurs of the stem family.",
    strengths: ["Refined taste and high standards", "Attention to detail and precision", "Perceptiveness and intuition", "Elegance and poise"],
    weaknesses: ["Can be overly perfectionistic", "Critical of self and others", "May be distant or aloof", "Difficulty with messiness and chaos"],
    career: "Xin people excel in roles requiring precision and refinement. They thrive in luxury goods, jewelry, art curation, editing, quality control, and any field that rewards exacting standards. Their keen eye makes them exceptional critics, judges, and craftspeople.",
    relationships: "In relationships, Xin is discerning and devoted. They have high standards but once committed, they are elegant and attentive partners. They need partners who share their values and appreciate their refinement. Best matches with Earth and Water stems.",
    health: "Xin energy governs the lungs and skin. Like Geng, respiratory health is important, but Xin is more sensitive to environmental quality. They benefit from clean, harmonious living spaces, skincare routines, and practices that help them feel safe to be imperfect.",
    compatibleStems: ["戊", "己", "壬", "癸"],
    description: "Xin (辛) is the eighth Heavenly Stem, representing Yin Metal. It is the energy of polished jade — refined, elegant, and flawlessly beautiful. Where Geng is the raw ore, Xin is the finished masterpiece. Xin people are perfectionists with an eye for quality and beauty.",
    imageWords: "Polished jade, refined elegance, flawless standards, discerning taste, perfected craft",
  },
  "壬": {
    chinese: "壬",
    pinyin: "Ren",
    element: "Water",
    yinYang: "Yang",
    direction: "North",
    season: "Winter",
    color: "Deep Blue / Black",
    aspect: "Below / Hidden",
    personality: "Ren is the vast ocean — deep, powerful, and free-flowing. Ren people have tremendous inner resources and the wisdom to navigate any situation. They are strategic thinkers who operate on a grand scale. Like the ocean, they can be calm and reflective or powerfully decisive.",
    strengths: ["Deep wisdom and strategic thinking", "Emotional depth and intuition", "Adaptability to any situation", "Powerful inner resources"],
    weaknesses: ["Can be overly secretive", "May be emotionally overwhelming", "Difficulty with surface-level interactions", "Tendency to isolation"],
    career: "Ren people thrive in roles requiring depth and strategic vision. They excel in research, philosophy, psychology, international business, maritime careers, and any field dealing with large-scale systems. Their strategic minds make them exceptional planners and advisors.",
    relationships: "In relationships, Ren is deep and mysterious. They seek profound emotional connections and may struggle with casual relationships. They need partners who can navigate their emotional depth and respect their need for solitude. Best matches with Metal and Wood stems.",
    health: "Ren energy governs the kidneys, bladder, and adrenal system. People with strong Ren Water need to stay warm and hydrated. They benefit from warm foods, adequate rest, and practices like meditation that calm the nervous system.",
    compatibleStems: ["庚", "辛", "甲", "乙"],
    description: "Ren (壬) is the ninth Heavenly Stem, representing Yang Water. It is the energy of the vast ocean — deep, powerful, and all-encompassing. Ren Water is the most strategic and wise of all the stems. In Ba Zi, Ren as a Day Master indicates a person of tremendous depth and inner power.",
    imageWords: "Vast ocean, deep wisdom, strategic power, emotional depth, limitless potential",
  },
  "癸": {
    chinese: "癸",
    pinyin: "Gui",
    element: "Water",
    yinYang: "Yin",
    direction: "North",
    season: "Winter",
    color: "Indigo / Midnight",
    aspect: "Above / Surface",
    personality: "Gui is the gentle rain — intuitive, mysterious, and receptive. Gui people have a deep connection to the unseen, making them naturally psychic, creative, and spiritually attuned. Like rain that seeps into the earth, Gui energy penetrates beneath the surface, accessing hidden knowledge.",
    strengths: ["Exceptional intuition and psychic sensitivity", "Creativity and imagination", "Adaptability and flow", "Deep spiritual connection"],
    weaknesses: ["Can be overly sensitive", "May be indecisive or passive", "Tendency to escape into fantasy", "Difficulty with harsh realities"],
    career: "Gui people excel in roles requiring intuition and creativity. They thrive in the arts, spirituality, psychology, research, writing, and any field where deep insight is valued. Their ability to access hidden knowledge makes them exceptional in investigative and creative roles.",
    relationships: "In relationships, Gui is deeply intuitive and emotionally attuned. They sense their partner's needs and feelings effortlessly. They need partners who appreciate their sensitivity and provide gentle stability. Best matches with Metal and Wood stems.",
    health: "Gui energy governs the kidneys and reproductive system. The most sensitive of all stems, Gui people are deeply affected by their environment and emotions. Warmth, regular routines, grounding practices, and a peaceful home environment are essential for their health.",
    compatibleStems: ["庚", "辛", "甲", "乙"],
    description: "Gui (癸) is the tenth Heavenly Stem, representing Yin Water. It is the energy of gentle rain — invisible yet penetrating, soft yet powerful. Gui is the most intuitive and spiritually attuned of all the stems. In Ba Zi, Gui as a Day Master indicates a person of profound sensitivity and insight.",
    imageWords: "Gentle rain, mystical intuition, spiritual depth, receptive wisdom, hidden knowing",
  },
};

export function getStemDetail(slug: string): StemDetail | null {
  // slug can be chinese (甲) or pinyin lowercase (jia)
  const entry = Object.entries(STEMS_DATA).find(
    ([chinese, data]) => chinese === slug || data.pinyin.toLowerCase() === slug.toLowerCase()
  );
  return entry ? entry[1] : null;
}

export const ALL_STEMS = Object.values(STEMS_DATA);

export const STEM_SLUGS = HEAVENLY_STEMS_EN.map((en) => en.toLowerCase());
export const STEM_CHINESE = HEAVENLY_STEMS;
