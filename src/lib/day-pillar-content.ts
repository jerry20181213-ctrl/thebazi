import { STEM_WUXING, BRANCH_WUXING } from "./constants";

// ─── Type ───────────────────────────────────────────────────────────

export interface DayPillar {
  key: string;
  chinese: string;
  stem: { char: string; pinyin: string; element: string; yinYang: string };
  branch: { char: string; pinyin: string; animal: string; element: string; yinYang: string };
  personality: string;
  strength: string;
  weakness: string;
  career: string;
  relationships: string;
  luckyElements: string[];
  luckyColors: string[];
}

// ─── Raw data ────────────────────────────────────────────────────────

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const STEM_PINYIN: Record<string, string> = { 甲: "Jia", 乙: "Yi", 丙: "Bing", 丁: "Ding", 戊: "Wu", 己: "Ji", 庚: "Geng", 辛: "Xin", 壬: "Ren", 癸: "Gui" };
const STEM_YY: Record<string, string> = { 甲: "Yang", 乙: "Yin", 丙: "Yang", 丁: "Yin", 戊: "Yang", 己: "Yin", 庚: "Yang", 辛: "Yin", 壬: "Yang", 癸: "Yin" };

const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const BRANCH_PINYIN: Record<string, string> = { 子: "Zi", 丑: "Chou", 寅: "Yin", 卯: "Mao", 辰: "Chen", 巳: "Si", 午: "Wu", 未: "Wei", 申: "Shen", 酉: "You", 戌: "Xu", 亥: "Hai" };
const BRANCH_ANIMAL: Record<string, string> = { 子: "Rat", 丑: "Ox", 寅: "Tiger", 卯: "Rabbit", 辰: "Dragon", 巳: "Snake", 午: "Horse", 未: "Goat", 申: "Monkey", 酉: "Rooster", 戌: "Dog", 亥: "Pig" };
const BRANCH_YY: Record<string, string> = { 子: "Yang", 丑: "Yin", 寅: "Yang", 卯: "Yin", 辰: "Yang", 巳: "Yin", 午: "Yang", 未: "Yin", 申: "Yang", 酉: "Yin", 戌: "Yang", 亥: "Yin" };

// ─── Pillar sequence ─────────────────────────────────────────────────

function makePillar(index: number) {
  const stem = STEMS[index % 10];
  const branch = BRANCHES[index % 12];
  const sp = STEM_PINYIN[stem];
  const bp = BRANCH_PINYIN[branch];
  return {
    key: `${sp.toLowerCase()}-${bp.toLowerCase()}`,
    chinese: stem + branch,
    stem: { char: stem, pinyin: sp, element: STEM_WUXING[stem], yinYang: STEM_YY[stem] },
    branch: { char: branch, pinyin: bp, animal: BRANCH_ANIMAL[branch], element: BRANCH_WUXING[branch], yinYang: BRANCH_YY[branch] },
  };
}

function getInteraction(stemEl: string, branchEl: string): string {
  const gen: Record<string, string> = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
  const ctrl: Record<string, string> = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
  if (gen[stemEl] === branchEl) return `${stemEl} produces ${branchEl} — the stem's energy flows naturally into the branch, creating a harmonious and creative personality.`;
  if (gen[branchEl] === stemEl) return `${branchEl} produces ${stemEl} — the branch supports and nourishes the stem, giving these individuals a strong foundation of support.`;
  if (ctrl[stemEl] === branchEl) return `${stemEl} controls ${branchEl} — the stem masters the branch energy, creating a person of strong will who can overcome obstacles.`;
  if (ctrl[branchEl] === stemEl) return `${branchEl} controls ${stemEl} — the branch tempers the stem, building resilience and character through challenge.`;
  return `${stemEl} and ${branchEl} share the same element — a doubling of energy that amplifies both strengths and challenges.`;
}

function generatePersonality(p: ReturnType<typeof makePillar>): string {
  const interaction = getInteraction(p.stem.element, p.branch.element);
  return `The ${p.chinese} (${p.stem.pinyin} ${p.stem.element} + ${p.branch.pinyin} ${p.branch.animal}) pillar combines ${p.stem.yinYang.toLowerCase()} ${p.stem.element} with ${p.branch.yinYang.toLowerCase()} ${p.branch.element}. ${interaction} These individuals are naturally ${p.stem.yinYang === "Yang" ? "outgoing and expressive" : "reflective and receptive"}, with the ${p.branch.animal.toLowerCase()}'s ${getAnimalTrait(p.branch.animal)} shaping how their core energy expresses itself.`;
}

function getAnimalTrait(animal: string): string {
  const traits: Record<string, string> = {
    Rat: "quick wit and adaptability",
    Ox: "patience and determination",
    Tiger: "courage and boldness",
    Rabbit: "grace and diplomacy",
    Dragon: "charisma and vision",
    Snake: "wisdom and depth",
    Horse: "passion and drive",
    Goat: "gentleness and creativity",
    Monkey: "intelligence and innovation",
    Rooster: "precision and discipline",
    Dog: "loyalty and integrity",
    Pig: "generosity and intuition",
  };
  return traits[animal] || "unique nature";
}

// ─── Hand-written content (33 pillars) ───────────────────────────────

const CONTENT: Record<string, { personality: string; strength: string; weakness: string; career: string; relationships: string; luckyElements: string[]; luckyColors: string[] }> = {
  "jia-zi": {
    personality: "The Jia Zi person is like a great tree growing beside a river — deeply rooted and endlessly nourished. Water feeds Wood, so these individuals have a natural flow of vitality and creativity. They are visionaries who combine the pioneering spirit of Yang Wood with the depth and adaptability of Rat energy. Intelligent, ambitious, and charming, they naturally attract opportunities and people who can help them grow.",
    strength: "Exceptional creativity and vision. Natural leadership with the wisdom to listen. Adaptable yet principled.",
    weakness: "Can be overly idealistic. May become restless when growth stalls. Tendency to take on too much.",
    career: "Entrepreneurship, creative direction, writing, teaching, environmental fields.",
    relationships: "Generous and devoted partners who inspire growth in others. Need a partner who respects their independence while providing emotional stability.",
    luckyElements: ["Water", "Metal"], luckyColors: ["Black", "Blue", "White", "Gold"],
  },
  "yi-chou": {
    personality: "Yi Chou is the flowering vine growing in rich, fertile soil. The Yin Wood of Yi wraps around obstacles with grace, while Chou Earth provides stability and patience. These individuals are quietly determined — they achieve their goals through persistence rather than force. They have a practical, grounded nature combined with artistic sensitivity, making them both reliable and creative.",
    strength: "Patient and persistent. Excellent attention to detail. Grounded creativity. Strong sense of responsibility.",
    weakness: "Can be stubborn when pushed. Tendency to worry. May sacrifice their own needs for others.",
    career: "Education, counseling, arts and crafts, real estate, agriculture.",
    relationships: "Loyal and nurturing partners who show love through practical acts. Need appreciation and emotional security.",
    luckyElements: ["Fire", "Metal"], luckyColors: ["Red", "Purple", "White", "Gold"],
  },
  "bing-yin": {
    personality: "Bing Yin is a blazing fire fueled by a forest — powerful, expansive, and impossible to ignore. Yang Fire meets Yang Wood in a combination that radiates charisma and leadership. These people are born catalysts who ignite change wherever they go. The Tiger's courage combined with the Sun's warmth makes them natural pioneers who inspire others to follow.",
    strength: "Magnetic charisma and natural leadership. Boundless energy and enthusiasm. Fearless in pursuit of goals.",
    weakness: "Can be impulsive and overbearing. Risk of burnout from pushing too hard. May overwhelm sensitive types.",
    career: "Executive leadership, public speaking, sales, entertainment, politics.",
    relationships: "Passionate and generous partners who sweep others off their feet. Need a partner who can match their energy.",
    luckyElements: ["Earth", "Metal"], luckyColors: ["Yellow", "Brown", "White", "Gold"],
  },
  "ding-mao": {
    personality: "Ding Mao is a candle flame sheltered by a flowering tree — gentle, refined, and deeply romantic. Yin Fire draws subtle energy from Yin Wood, creating a person of quiet warmth and artistic sensibility. Like the Rabbit, they are diplomatic and graceful, preferring harmony over conflict. Their light shines most brightly in intimate settings rather than on grand stages.",
    strength: "Artistic talent and refined taste. Excellent diplomat and mediator. Deep emotional intelligence.",
    weakness: "Can be overly sensitive to criticism. Avoids confrontation to a fault. May burn out from emotional labor.",
    career: "Art and design, counseling, diplomacy, luxury goods, interior design, writing.",
    relationships: "Devoted and attentive partners who create beautiful homes. Need gentle communication and emotional safety.",
    luckyElements: ["Earth", "Water"], luckyColors: ["Yellow", "Brown", "Black", "Blue"],
  },
  "wu-chen": {
    personality: "Wu Chen is a mountain meeting a dragon — double Earth, immense stability, and hidden power. This is one of the most solid and reliable pillars in the cycle. These individuals are the bedrock of any organization or family. The Dragon adds charisma and vision to the Mountain's steadiness, creating a leader who is both dependable and inspiring.",
    strength: "Unshakeable reliability and integrity. Natural authority. Great organizational ability. Visionary yet practical.",
    weakness: "Can be rigid and resistant to change. May take on too much responsibility. Stubborn.",
    career: "Construction, engineering, banking, government, military, project management.",
    relationships: "Protective and loyal partners who provide unwavering support. Need a partner who respects their need for stability.",
    luckyElements: ["Metal", "Water"], luckyColors: ["White", "Gold", "Black", "Blue"],
  },
  "ji-si": {
    personality: "Ji Si is fertile soil warmed by a hidden flame — nurturing on the surface, passionate beneath. Yin Earth is receptive and nourishing, while the Snake of Si brings wisdom, mystery, and strategic depth. These people appear calm and composed but possess a fiery inner world. They are natural strategists who combine practical wisdom with intuitive insight.",
    strength: "Strategic thinking and deep intuition. Nurturing nature combined with shrewd judgment. Excellent planner.",
    weakness: "Can be overly secretive. Tendency to overthink. May struggle with direct confrontation.",
    career: "Research, analysis, strategy consulting, psychology, healing arts, finance.",
    relationships: "Loyal and perceptive partners who understand unspoken needs. Need trust and intellectual stimulation.",
    luckyElements: ["Metal", "Wood"], luckyColors: ["White", "Gold", "Green", "Brown"],
  },
  "geng-wu": {
    personality: "Geng Wu is raw metal being forged in fire — intense, powerful, and constantly being refined. Yang Metal gives strength and determination, while the Horse of Wu adds passion, speed, and a love of freedom. These individuals are warriors at heart — they face challenges head-on and emerge stronger. They have a sharp mind, a quick tongue, and an unstoppable drive.",
    strength: "Tremendous courage and determination. Sharp analytical mind. Natural leader in crisis. Highly disciplined.",
    weakness: "Can be argumentative and blunt. Impatient with slower paces. May struggle with compromise.",
    career: "Military, law, surgery, engineering, competitive sports, entrepreneurship.",
    relationships: "Direct and passionate partners who value honesty above comfort. Need a partner who can handle their intensity.",
    luckyElements: ["Water", "Earth"], luckyColors: ["Black", "Blue", "Yellow", "Brown"],
  },
  "xin-wei": {
    personality: "Xin Wei is polished jade resting on soft earth — refined, elegant, and deeply connected to beauty. Yin Metal gives these people a keen eye for quality and detail, while the Goat of Wei adds artistic sensitivity and a gentle nature. They appreciate the finer things in life and have a natural talent for crafts, arts, and anything requiring precision and taste.",
    strength: "Refined aesthetic sense. Meticulous attention to detail. Natural grace and diplomacy. Creative talent.",
    weakness: "Can be overly perfectionistic. May be too modest. May avoid necessary conflicts.",
    career: "Jewelry design, art curation, cosmetics, fashion, editing, culinary arts.",
    relationships: "Romantic and attentive partners who express love through thoughtful gestures. Need appreciation and harmony.",
    luckyElements: ["Water", "Wood"], luckyColors: ["Black", "Blue", "Green", "Brown"],
  },
  "ren-shen": {
    personality: "Ren Shen is the ocean flowing over metal — deep, powerful, and endlessly resourceful. Yang Water gives these individuals tremendous depth and wisdom, while the Monkey of Shen adds intelligence, wit, and adaptability. They are brilliant strategists who can navigate any situation with cleverness and charm. Their minds are always active, always calculating, always exploring.",
    strength: "Exceptional intelligence and adaptability. Strategic brilliance. Charismatic and persuasive. Quick thinker.",
    weakness: "Can be manipulative if unchecked. May lack follow-through. Restless and easily bored.",
    career: "Technology, finance, trading, diplomacy, consulting, science, research.",
    relationships: "Engaging and intellectually stimulating partners. Need a partner who can keep up mentally and give them freedom.",
    luckyElements: ["Wood", "Fire"], luckyColors: ["Green", "Brown", "Red", "Purple"],
  },
  "gui-you": {
    personality: "Gui You is gentle rain falling on polished metal — refined, perceptive, and quietly powerful. Yin Water gives deep intuition and emotional sensitivity, while the Rooster of You adds precision, discipline, and a keen eye for detail. These individuals have a unique blend of spiritual depth and practical organization. They see the world with unusual clarity and express themselves with elegance.",
    strength: "Keen intuition and perception. Excellent organizational skills. Refined communication. Natural healer.",
    weakness: "Can be overly critical of self and others. May be too reserved. Tendency to worry about details.",
    career: "Writing, editing, research, accounting, medicine, spiritual counseling.",
    relationships: "Thoughtful and devoted partners who communicate with care. Need patience and emotional understanding.",
    luckyElements: ["Wood", "Fire"], luckyColors: ["Green", "Brown", "Red", "Purple"],
  },
  "jia-xu": {
    personality: "Jia Xu is a great tree planted on solid ground — noble, loyal, and deeply principled. Yang Wood reaches for the sky while the Dog of Xu keeps it anchored in duty and loyalty. These individuals have a strong moral compass and a protective nature. They stand up for what is right and will defend their loved ones with unwavering courage.",
    strength: "Unshakeable integrity and loyalty. Protective of loved ones. Strong sense of justice. Reliable and honest.",
    weakness: "Can be rigid in their principles. May be too trusting or too suspicious. Difficulty adapting to change.",
    career: "Law, justice, military, social work, non-profit leadership, teaching.",
    relationships: "Faithful and protective partners who take commitment seriously. Need loyalty and shared values.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "yi-hai": {
    personality: "Yi Hai is a flowering vine by a deep well — intuitive, creative, and richly imaginative. Yin Wood drinks deeply from Yin Water, creating a person of remarkable emotional depth and artistic vision. The Pig of Hai adds generosity, sensuality, and a love of life's pleasures. These individuals feel everything deeply and express their rich inner world through creative pursuits.",
    strength: "Deep creativity and imagination. Emotional intelligence and empathy. Generous and warm-hearted.",
    weakness: "Can be overly indulgent. May be too trusting. Tendency to escape into fantasy when stressed.",
    career: "Art, music, writing, counseling, philanthropy, spiritual guidance, entertainment.",
    relationships: "Deeply loving and generous partners who give their whole heart. Need emotional security and appreciation.",
    luckyElements: ["Fire", "Earth"], luckyColors: ["Red", "Purple", "Yellow", "Brown"],
  },
  "bing-zi": {
    personality: "Bing Zi is a blazing sun reflected in deep waters — charismatic, intelligent, and dynamically balanced. Yang Fire meets Yang Water in a creative tension that generates tremendous energy. These people have the warmth and radiance of the Sun combined with the strategic intelligence of the Rat. They shine in social settings and have a natural talent for turning ideas into reality.",
    strength: "Charismatic and socially brilliant. Strategic mind with creative flair. Natural networker. Adaptable.",
    weakness: "Can experience mood swings between confidence and doubt. May spread energy too thin.",
    career: "Media, public relations, sales, entrepreneurship, politics, marketing.",
    relationships: "Warm and engaging partners who light up a room. Need a partner who understands their need for both socializing and quiet.",
    luckyElements: ["Wood", "Metal"], luckyColors: ["Green", "Brown", "White", "Gold"],
  },
  "ding-chou": {
    personality: "Ding Chou is a candle flame in an earthen lantern — gentle light providing steady warmth. Yin Fire meets Yin Earth in a combination that is both nurturing and persistent. These individuals may not be the loudest in the room, but their steady presence and quiet dedication make them invaluable. Like the Ox, they work tirelessly behind the scenes, bringing warmth and stability to everything they touch.",
    strength: "Patient dedication and reliability. Warmth that puts others at ease. Strong work ethic. Trustworthy.",
    weakness: "May be taken for granted. Tendency to suppress their own needs. Can be overly cautious.",
    career: "Teaching, nursing, counseling, social work, craftsmanship, culinary arts.",
    relationships: "Steadfast and nurturing partners who express love through devoted service. Need recognition and appreciation.",
    luckyElements: ["Wood", "Metal"], luckyColors: ["Green", "Brown", "White", "Gold"],
  },
  "wu-yin": {
    personality: "Wu Yin is a mountain covered in ancient forest — solid, majestic, and teeming with life. Yang Earth provides stability and reliability, while the Tiger of Yin adds courage, charisma, and a pioneering spirit. These individuals have the rare combination of being both grounded and adventurous. They build empires and lead expeditions, inspiring others with their vision while providing practical leadership.",
    strength: "Visionary leadership with practical execution. Courageous yet grounded. Inspires trust and loyalty.",
    weakness: "Can be domineering. May take unnecessary risks. Difficulty delegating.",
    career: "Executive leadership, real estate development, construction, military command, politics.",
    relationships: "Protective and generous partners who take charge. Need a partner who respects their authority but isn't intimidated.",
    luckyElements: ["Fire", "Metal"], luckyColors: ["Red", "Purple", "White", "Gold"],
  },
  "ji-mao": {
    personality: "Ji Mao is fertile garden soil beneath a blooming hedge — nurturing, graceful, and quietly productive. Yin Earth gives these people a deeply nurturing nature, while the Rabbit of Mao adds diplomacy, elegance, and a love of beauty. They create harmony wherever they go and have a natural talent for bringing out the best in others.",
    strength: "Natural diplomat and peacemaker. Nurturing and supportive. Excellent taste and refinement. Patient.",
    weakness: "Can avoid necessary conflicts. May be too self-sacrificing. Tendency to worry about others' opinions.",
    career: "Counseling, interior design, HR, diplomacy, education, wellness.",
    relationships: "Gentle and devoted partners who create peaceful, beautiful homes. Need harmony and emotional safety.",
    luckyElements: ["Fire", "Metal"], luckyColors: ["Red", "Purple", "White", "Gold"],
  },
  "geng-chen": {
    personality: "Geng Chen is a metal sword emerging from the earth — powerful, majestic, and destined for greatness. Yang Metal combines with the Dragon of Chen to create one of the most potent and commanding pillars in the cycle. These individuals are natural leaders with tremendous willpower and charisma. They have the vision of the Dragon and the cutting precision of Metal, making them formidable in any endeavor.",
    strength: "Commanding presence and natural authority. Tremendous willpower. Visionary yet practical. Highly capable.",
    weakness: "Can be domineering and prideful. May struggle with subtlety. Tendency to overwhelm others.",
    career: "CEO, military leadership, law, surgery, engineering, finance.",
    relationships: "Commanding and protective partners who expect loyalty. Need a partner who is their equal, not a follower.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "xin-si": {
    personality: "Xin Si is refined metal heated by a hidden flame — elegant, perceptive, and subtly powerful. Yin Metal gives these people an eye for perfection, while the Snake of Si adds wisdom, mystery, and strategic depth. They combine analytical precision with intuitive insight, making them exceptional at uncovering hidden truths. Graceful and composed, they often know more than they reveal.",
    strength: "Keen analytical mind with deep intuition. Strategic thinker. Refined and elegant. Mysterious charm.",
    weakness: "Can be secretive and guarded. May hold grudges. Tendency to over-analyze.",
    career: "Research, forensics, intelligence, finance, law, luxury goods.",
    relationships: "Intriguing and sophisticated partners. Need intellectual stimulation and emotional depth.",
    luckyElements: ["Wood", "Water"], luckyColors: ["Green", "Brown", "Black", "Blue"],
  },
  "ren-wu": {
    personality: "Ren Wu is the ocean meeting a blazing sun — vast, passionate, and dynamically powerful. Yang Water meets Yang Fire in a pillar of creative tension and immense energy. These individuals have the depth of the ocean and the passion of the Horse. They are driven, charismatic, and deeply emotional. Their lives are marked by grand visions, bold moves, and intense experiences.",
    strength: "Boundless energy and passion. Visionary thinking. Natural charisma. Deep emotional capacity.",
    weakness: "Can be emotionally volatile. May act impulsively. Difficulty with moderation.",
    career: "Entrepreneurship, performing arts, exploration, sports, politics, media.",
    relationships: "Intensely passionate and romantic partners. Need a partner who can handle their emotional depth and independence.",
    luckyElements: ["Wood", "Earth"], luckyColors: ["Green", "Brown", "Yellow", "Brown"],
  },
  "gui-wei": {
    personality: "Gui Wei is gentle rain nourishing a peaceful garden — intuitive, creative, and deeply harmonious. Yin Water gives emotional depth and spiritual sensitivity, while the Goat of Wei adds artistic talent and a gentle disposition. These individuals are natural healers and creators who bring beauty and calm to their surroundings.",
    strength: "Artistic creativity and emotional depth. Natural healing ability. Gentle and compassionate. Intuitive.",
    weakness: "Can be overly emotional. May be too passive. Tendency to absorb others' negative energy.",
    career: "Art, music, healing arts, counseling, social work, spiritual guidance.",
    relationships: "Deeply loving and sensitive partners who nurture their loved ones. Need emotional security and gentle communication.",
    luckyElements: ["Fire", "Wood"], luckyColors: ["Red", "Purple", "Green", "Brown"],
  },
  "jia-shen": {
    personality: "Jia Shen is a mighty tree being carved by metal tools — strong, intelligent, and shaped by challenges. Yang Wood provides natural leadership and growth, while the Monkey of Shen adds wit, innovation, and strategic brilliance. Metal cutting Wood means these individuals are forged through adversity, emerging sharper and stronger. They are brilliant problem-solvers who thrive on intellectual challenges.",
    strength: "Brilliant problem-solving ability. Natural leadership tempered by wisdom. Highly adaptable and clever.",
    weakness: "Can be argumentative. May overthink simple situations. Tendency to challenge authority.",
    career: "Technology, engineering, consulting, science, entrepreneurship, law.",
    relationships: "Intellectually stimulating partners who keep life exciting. Need a partner who enjoys lively debate.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "yi-you": {
    personality: "Yi You is a flowering vine trained against a metal trellis — graceful, disciplined, and beautifully structured. Yin Wood brings flexibility and artistic sensitivity, while the Rooster of You adds precision, diligence, and a keen eye for detail. Metal carving Wood creates a person who is both creative and meticulous. They have a gift for bringing artistic visions to life with technical perfection.",
    strength: "Artistic talent combined with technical precision. Disciplined creativity. Excellent communication.",
    weakness: "Can be overly critical. May be too perfectionistic. Tendency to be rigid in methods.",
    career: "Graphic design, editing, fashion, architecture, music, craftsmanship.",
    relationships: "Devoted partners who express love through thoughtful acts and words. Need appreciation and respect.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "bing-xu": {
    personality: "Bing Xu is a warm hearth fire in a loyal home — passionate, protective, and deeply trustworthy. Yang Fire gives warmth and charisma, while the Dog of Xu adds loyalty, vigilance, and a strong moral compass. These individuals are the protectors and providers who stand watch over their community. They are fiercely loyal to those they love and will fight tirelessly for what they believe in.",
    strength: "Fierce loyalty and protective nature. Warm charisma. Strong sense of justice. Dependable.",
    weakness: "Can be overly suspicious of strangers. May be possessive. Tendency to worry excessively.",
    career: "Law enforcement, military, security, social work, advocacy.",
    relationships: "Loyal and protective partners who are in it for the long haul. Need trust and faithfulness above all.",
    luckyElements: ["Wood", "Earth"], luckyColors: ["Green", "Brown", "Yellow", "Brown"],
  },
  "ding-hai": {
    personality: "Ding Hai is a candle flame reflected in a peaceful lake — gentle, intuitive, and spiritually deep. Yin Fire gives quiet warmth and refined sensitivity, while the Pig of Hai adds generosity, intuition, and a love of life's pleasures. These individuals have a unique spiritual quality — they see beauty in the ordinary and find wisdom in stillness.",
    strength: "Spiritual depth and intuition. Gentle, comforting presence. Generous and compassionate. Creative.",
    weakness: "Can be overly trusting. May be too passive. Tendency to escape into daydreams.",
    career: "Spiritual counseling, art, music, writing, philanthropy, healing arts.",
    relationships: "Deeply loving and accepting partners who create a warm home. Need emotional connection and appreciation.",
    luckyElements: ["Wood", "Earth"], luckyColors: ["Green", "Brown", "Yellow", "Brown"],
  },
  "wu-zi": {
    personality: "Wu Zi is a mountain surrounded by deep waters — stable, wise, and immensely resourceful. Yang Earth provides unshakeable stability, while the Rat of Zi adds intelligence, adaptability, and strategic thinking. Earth blocks Water, creating a dynamic of contained power. These individuals are reservoirs of potential — calm on the surface but possessing tremendous inner resources and depth.",
    strength: "Rock-solid stability and reliability. Strategic intelligence. Calm under pressure. Wise decision-making.",
    weakness: "Can be overly cautious. May resist necessary change. Tendency to keep emotions bottled up.",
    career: "Banking, real estate, government, strategic planning, engineering.",
    relationships: "Stable and dependable partners who provide a solid foundation. Need patience and emotional openness.",
    luckyElements: ["Metal", "Wood"], luckyColors: ["White", "Gold", "Green", "Brown"],
  },
  "ji-chou": {
    personality: "Ji Chou is fertile valley soil — deep, rich, and immensely productive. Double Earth makes this one of the most grounded and reliable pillars in the cycle. These individuals are the quiet pillars of their community — hardworking, patient, and unfailingly dependable. Like the Ox, they possess tremendous endurance and a methodical approach to life. They build slowly but what they build lasts.",
    strength: "Exceptional reliability and endurance. Deep practical wisdom. Patient and methodical. Loyal.",
    weakness: "Can be stubborn and inflexible. May resist new ideas. Tendency to overwork.",
    career: "Agriculture, construction, accounting, education, nursing, administration.",
    relationships: "Faithful and devoted partners who show love through consistent care. Need appreciation and patience.",
    luckyElements: ["Metal", "Fire"], luckyColors: ["White", "Gold", "Red", "Purple"],
  },
  "geng-yin": {
    personality: "Geng Yin is a metal axe cutting through a forest — powerful, bold, and unstoppable. Yang Metal gives these people strength and determination, while the Tiger of Yin adds courage, charisma, and a pioneering spirit. Metal cutting Wood means they overcome obstacles through sheer force of will. Natural leaders who charge ahead and inspire others to follow, they are born for adventure and challenge.",
    strength: "Bold courage and determination. Natural leadership in crisis. Physical and mental strength. Charismatic.",
    weakness: "Can be reckless and impulsive. May be too aggressive. Tendency to burn bridges.",
    career: "Military, competitive sports, surgery, exploration, entrepreneurship.",
    relationships: "Passionate and exciting partners who lead with confidence. Need a partner who respects their independence.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "xin-mao": {
    personality: "Xin Mao is a delicate metal ornament on a flowering branch — refined, artistic, and beautifully balanced. Yin Metal gives these people a keen eye for detail and quality, while the Rabbit of Mao adds grace, diplomacy, and a love of harmony. They bring beauty and order to everything they touch.",
    strength: "Artistic refinement and precision. Excellent diplomatic skills. Keen aesthetic sense. Graceful.",
    weakness: "Can be overly perfectionistic. May avoid conflict at all costs. Tendency to be overly sensitive.",
    career: "Art and design, fashion, diplomacy, editing, interior design, cosmetics.",
    relationships: "Elegant and attentive partners who create beautiful relationships. Need harmony and gentle communication.",
    luckyElements: ["Water", "Fire"], luckyColors: ["Black", "Blue", "Red", "Purple"],
  },
  "ren-chen": {
    personality: "Ren Chen is a vast ocean contained by ancient earth — powerful, majestic, and deeply wise. Yang Water gives these individuals tremendous depth and strategic vision, while the Dragon of Chen adds charisma, ambition, and transformative power. Earth damming Water creates a person of immense potential energy. They are natural leaders who command respect and have the vision to reshape their world.",
    strength: "Magnificent vision and leadership. Strategic depth. Natural authority. Charismatic and inspiring.",
    weakness: "Can be controlling. May struggle with vulnerability. Tendency to overwhelm others with intensity.",
    career: "CEO, politics, military command, law, finance, architecture.",
    relationships: "Commanding and devoted partners who inspire growth. Need a partner who is their equal.",
    luckyElements: ["Metal", "Wood"], luckyColors: ["White", "Gold", "Green", "Brown"],
  },
  "gui-si": {
    personality: "Gui Si is a hidden spring feeding a secret fire — mysterious, intuitive, and deeply wise. Yin Water meets Yin Fire in a subtle dance of opposing forces. These individuals possess remarkable intuition and a penetrating mind. The Snake of Si gives them strategic cunning and philosophical depth, while Gui Water adds emotional sensitivity and spiritual awareness.",
    strength: "Penetrating intuition and wisdom. Strategic thinking. Mysterious charisma. Emotional depth.",
    weakness: "Can be secretive and guarded. May be prone to suspicion. Tendency to hold onto grudges.",
    career: "Research, psychology, intelligence, philosophy, finance, healing arts.",
    relationships: "Deep and intriguing partners who value emotional intimacy. Need trust and intellectual connection.",
    luckyElements: ["Wood", "Metal"], luckyColors: ["Green", "Brown", "White", "Gold"],
  },
  "jia-wu": {
    personality: "Jia Wu is a great tree ignited by the summer sun — brilliant, passionate, and full of creative fire. Yang Wood provides ambition and vision, while the Horse of Wu adds speed, passion, and a love of freedom. Wood feeds Fire, creating a person of tremendous creative energy and charisma. These individuals are natural performers and leaders who light up every room they enter.",
    strength: "Brilliant creative energy. Natural charisma and charm. Passionate and inspiring leadership.",
    weakness: "Can burn out from their own intensity. May be impatient. Tendency to be dramatic.",
    career: "Entertainment, performing arts, public speaking, marketing, media.",
    relationships: "Passionate and romantic partners who sweep others into their world. Need a partner who can match their fire.",
    luckyElements: ["Water", "Earth"], luckyColors: ["Black", "Blue", "Yellow", "Brown"],
  },
  "yi-wei": {
    personality: "Yi Wei is a flowering vine in a peaceful garden — gentle, creative, and deeply harmonious. Yin Wood brings flexibility and artistic sensitivity, while the Goat of Wei adds a nurturing, gentle nature and a love of beauty. Earth supports Wood, creating a person who grows steadily in a supportive environment. They are natural caregivers who find joy in helping others bloom.",
    strength: "Artistic talent and creativity. Gentle, nurturing nature. Patient and supportive. Harmonious.",
    weakness: "Can be overly dependent on others. May avoid confrontation. Tendency to worry.",
    career: "Art, counseling, teaching, gardening, design, healing arts.",
    relationships: "Tender and devoted partners who create a warm home. Need emotional security and gentle reassurance.",
    luckyElements: ["Fire", "Metal"], luckyColors: ["Red", "Purple", "White", "Gold"],
  },
  "bing-shen": {
    personality: "Bing Shen is a blazing fire melting precious metal — brilliant, witty, and endlessly creative. Yang Fire gives radiant warmth and charisma, while the Monkey of Shen adds intelligence, innovation, and playful wit. Fire melting Metal creates a person who transforms raw ideas into golden results. These individuals are brilliant communicators and entertainers who captivate audiences with their charm and intellect.",
    strength: "Brilliant wit and intelligence. Magnetic personality. Creative problem-solving. Natural entertainer.",
    weakness: "Can be manipulative with their charm. May lack follow-through. Restless.",
    career: "Entertainment, sales, public relations, technology, education, writing.",
    relationships: "Charming and exciting partners who keep life interesting. Need intellectual stimulation and freedom.",
    luckyElements: ["Water", "Earth"], luckyColors: ["Black", "Blue", "Yellow", "Brown"],
  },
  "ding-you": {
    personality: "Ding You is a candle flame refining precious metal — refined, perceptive, and quietly brilliant. Yin Fire gives gentle warmth and penetrating insight, while the Rooster of You adds precision, discipline, and a keen critical eye. These individuals have a rare gift for seeing both beauty and flaws. They are natural critics, editors, and refiners who elevate everything they touch.",
    strength: "Keen perception and critical insight. Refined taste and elegance. Precision and discipline.",
    weakness: "Can be overly critical. May be perfectionistic to a fault. Tendency to be emotionally reserved.",
    career: "Editing, criticism, quality control, design, craftsmanship, finance.",
    relationships: "Discriminating and devoted partners who value quality over quantity. Need appreciation and intellectual respect.",
    luckyElements: ["Wood", "Earth"], luckyColors: ["Green", "Brown", "Yellow", "Brown"],
  },
};

// ─── Public API ──────────────────────────────────────────────────────

const ALL_KEYS = Array.from({ length: 60 }, (_, i) => makePillar(i).key);

export function getAllPillarKeys(): string[] {
  return ALL_KEYS;
}

export function getPillarByKey(key: string): DayPillar {
  const index = ALL_KEYS.indexOf(key);
  if (index === -1) throw new Error(`Pillar "${key}" not found`);
  const raw = makePillar(index);
  const content = CONTENT[key];

  return {
    ...raw,
    personality: content?.personality ?? generatePersonality(raw),
    strength: content?.strength ?? "Resilient and focused. Natural ability to learn from experience.",
    weakness: content?.weakness ?? "May struggle with the opposing energies of stem and branch.",
    career: content?.career ?? "Fields that align with both the stem and branch elements for balance.",
    relationships: content?.relationships ?? "Values authenticity and mutual growth in relationships.",
    luckyElements: content?.luckyElements ?? [],
    luckyColors: content?.luckyColors ?? [],
  };
}

export function getPillarByIndex(index: number): DayPillar {
  return getPillarByKey(ALL_KEYS[index]);
}

export function getAdjacentPillars(key: string): { prev: DayPillar | null; next: DayPillar | null } {
  const index = ALL_KEYS.indexOf(key);
  return {
    prev: index > 0 ? getPillarByIndex(index - 1) : null,
    next: index < 59 ? getPillarByIndex(index + 1) : null,
  };
}
