export interface DailyQuote {
  en: string;
  zh: string;
  author?: string;
}

const quotes: DailyQuote[] = [
  { en: "The wise man knows he knows nothing.", zh: "知者不言，言者不知。", author: "Lao Tzu" },
  { en: "A journey of a thousand miles begins with a single step.", zh: "千里之行，始於足下。", author: "Lao Tzu" },
  { en: "When you realize nothing is lacking, the whole world belongs to you.", zh: "知足者富。", author: "Lao Tzu" },
  { en: "He who conquers others is strong; he who conquers himself is mighty.", zh: "勝人者有力，自勝者強。", author: "Lao Tzu" },
  { en: "Nature does not hurry, yet everything is accomplished.", zh: "道法自然，無為而無不為。", author: "Lao Tzu" },
  { en: "The best way to predict the future is to create it.", zh: "命由己造，福自我求。", author: "Chinese Proverb" },
  { en: "A man who does not plan long ahead will find trouble at his door.", zh: "人無遠慮，必有近憂。", author: "Confucius" },
  { en: "It does not matter how slowly you go as long as you do not stop.", zh: "锲而不捨，金石可鏤。", author: "Confucius" },
  { en: "Everything has its beauty, but not everyone sees it.", zh: "德不孤，必有鄰。", author: "Confucius" },
  { en: "The superior man understands what is right; the inferior man understands what will sell.", zh: "君子喻於義，小人喻於利。", author: "Confucius" },
  { en: "When the winds of change blow, some build walls, others build windmills.", zh: "順天者昌，逆天者亡。", author: "Chinese Proverb" },
  { en: "A gem is not polished without friction, nor a man perfected without trials.", zh: "玉不琢，不成器；人不學，不知義。", author: "Confucius" },
  { en: "Heaven gives no gladness that is not bought with sorrow.", zh: "福兮禍所伏，禍兮福所倚。", author: "Lao Tzu" },
  { en: "The five elements — Wood, Fire, Earth, Metal, Water — give rise to all things in ceaseless cycles.", zh: "五行相生，循環不息，萬物歸一。", author: "Chinese Metaphysics" },
  { en: "Water is the softest thing, yet it can penetrate mountains and earth.", zh: "天下莫柔弱於水，而攻堅強者莫之能勝。", author: "Lao Tzu" },
  { en: "The tree that is unbending is easily broken.", zh: "強梁者不得其死。", author: "Lao Tzu" },
  { en: "Before you embark on a journey of revenge, dig two graves.", zh: "冤冤相報何時了。", author: "Chinese Proverb" },
  { en: "A single conversation across the table with a wise man is worth a month's study of books.", zh: "與君一席話，勝讀十年書。", author: "Chinese Proverb" },
  { en: "If you want happiness for an hour, take a nap. If you want happiness for a lifetime, help someone.", zh: "積善之家，必有餘慶。", author: "Book of Changes (I Ching)" },
  { en: "The slow wind is the teacher of the fast wind. Stillness is the master of agitation.", zh: "靜為躁君，重為輕根。", author: "Lao Tzu" },
  { en: "The difficult things in life are always done from the easy things first.", zh: "天下難事，必作於易；天下大事，必作於細。", author: "Lao Tzu" },
  { en: "Know yourself and you will know the universe.", zh: "知己知彼，百戰不殆。", author: "Sun Tzu" },
  { en: "In the midst of chaos, there is also opportunity.", zh: "亂中取勝，危中有機。", author: "Chinese Proverb" },
  { en: "A man without a plan is like a boat without a rudder.", zh: "善弈者謀局，不善弈者謀子。", author: "Chinese Proverb" },
  { en: "The feng shui of your home influences the flow of your life.", zh: "一命二運三風水。", author: "Chinese Proverb" },
  { en: "Your destiny is written in the stars, but your actions shape the page.", zh: "命中有時終須有，命中無時莫強求。", author: "Chinese Proverb" },
  { en: "A good tree does not grow in a bad feng shui position.", zh: "吉地不可無吉宅。", author: "Chinese Proverb" },
  { en: "The mouth is the gate of fortune and misfortune.", zh: "病從口入，禍從口出。", author: "Chinese Proverb" },
  { en: "He who asks a question is a fool for five minutes; he who does not ask remains a fool forever.", zh: "敏而好學，不恥下問。", author: "Confucius" },
  { en: "Your Ba Zi chart is a map, not a verdict.", zh: "八字如一盤棋，落子在你。", author: "Ba Zi Wisdom" },
  { en: "The year pillar shows your ancestry, the month pillar shows your parents, the day pillar shows yourself, the hour pillar shows your descendants.", zh: "年柱祖上，月柱父母，日柱自身，時柱子孫。", author: "Ba Zi Classic" },
  { en: "Wood bends and straightens. Fire blazes upward. Earth is sown and reaped. Metal yields to shape. Water flows downward.", zh: "木曰曲直，火曰炎上，土曰稼穡，金曰從革，水曰潤下。", author: "Five Elements Canon" },
  { en: "Heaven creates, Earth nourishes, Man completes.", zh: "天生之，地養之，人成之。", author: "Three Powers (San Cai)" },
  { en: "The eight characters are the script of heaven; the ten gods are the actors on the stage of life.", zh: "八個字是天書，十神是人生舞台上的角色。", author: "Ba Zi Wisdom" },
  { en: "Fill your bowl to the brim and it will spill. Keep sharpening your knife and it will blunt.", zh: "持而盈之，不如其已；揣而銳之，不可長保。", author: "Lao Tzu" },
  { en: "One dog barks at something, a hundred bark at the sound.", zh: "一犬吠形，百犬吠聲。", author: "Chinese Proverb" },
  { en: "The pine tree stays green through winter's cold — a sign of resilience in your destiny chart.", zh: "歲寒，然後知松柏之後彫也。", author: "Confucius" },
  { en: "Destiny depends on heaven; fortune depends on the soil you stand on.", zh: "命由天定，運由己造。", author: "Chinese Proverb" },
  { en: "In Ba Zi, the Day Master is the emperor of your chart. Everything else serves it.", zh: "日主為君，餘神為臣。", author: "Ba Zi Classic" },
  { en: "Where there is yin and yang, there is harmony. Where there is harmony, there is life.", zh: "陰陽合而萬物生。", author: "I Ching" },
  { en: "One yang arises within the depth of yin — winter solstice brings the promise of spring.", zh: "冬至一陽生。", author: "Chinese Calendar Wisdom" },
  { en: "Energy follows intention. Where your mind goes, your Qi flows.", zh: "意到氣到，氣到力到。", author: "Qi Gong Proverb" },
  { en: "The four pillars are the foundation; the great luck cycles are the seasons of your life.", zh: "四柱為基，大運為四季。", author: "Ba Zi Wisdom" },
  { en: "To understand your Ba Zi is to understand the symphony of cosmic forces playing through your life.", zh: "讀懂八字，如觀宇宙交響樂。", author: "Ba Zi Wisdom" },
  { en: "A calm sea does not make a skilled sailor — so too, challenges in your chart reveal your strength.", zh: "風浪中方見舵手本色。", author: "Chinese Proverb" },
  { en: "Your lucky colors are not fashion choices — they are invitations to elemental balance.", zh: "用色如用藥，調五行以和陰陽。", author: "Ba Zi Wisdom" },
  { en: "The wood person grows through obstacles; the fire person shines brightest in darkness.", zh: "木遇阻而生，火逢暗則明。", author: "Five Elements Wisdom" },
  { en: "Metal people are born under the autumn sky — refined, structured, and unyielding.", zh: "金曰從革，剛毅果決。", author: "Five Elements Wisdom" },
  { en: "Water people flow like rivers — adaptable, deep, and always finding the way home.", zh: "水曰潤下，智者也。", author: "Five Elements Wisdom" },
  { en: "Earth people are the great containers — patient, nourishing, the foundation of all things.", zh: "土爰稼穡，厚德載物。", author: "Five Elements Wisdom" },
  { en: "Fire is the spirit of transformation — it turns wood into ash and raw ore into steel.", zh: "火主禮，其性炎上而化物。", author: "Five Elements Wisdom" },
  { en: "The twelve earthly branches are the animals that carry the cosmic energy through time.", zh: "十二地支，承天運而行於地。", author: "Ba Zi Wisdom" },
  { en: "Your birth hour is the final brushstroke on the painting of your destiny.", zh: "時辰是命運畫卷上的最後一筆。", author: "Ba Zi Wisdom" },
  { en: "The hidden stems within your branches reveal what is buried in your soul.", zh: "地支藏干，如人心之深藏。", author: "Ba Zi Classic" },
  { en: "No chart is purely good or bad — each is a unique pattern of strengths to nurture and weaknesses to manage.", zh: "命無好壞，格有高低。", author: "Ba Zi Wisdom" },
  { en: "The interaction of the ten gods reveals the drama of your life — your allies, your teachers, your challenges.", zh: "十神交互，演人生百態。", author: "Ba Zi Wisdom" },
  { en: "If your chart lacks water, invite more of its stillness and depth into your life.", zh: "缺水者，以靜深補之。", author: "Five Elements Wisdom" },
  { en: "If your chart has too much fire, the cooling breeze of metal and water brings balance.", zh: "火炎土燥，金水為調候。", author: "Ba Zi Wisdom" },
  { en: "The clash of branches signals change — sometimes disruptive, sometimes liberating.", zh: "地支相沖，動則有變。", author: "Ba Zi Wisdom" },
  { en: "A favorable luck cycle can lift an ordinary chart to greatness.", zh: "好大運可助平凡之命成就非凡。", author: "Ba Zi Wisdom" },
  { en: "The same chart never repeats — even twins born minutes apart walk different paths.", zh: "同年同月同日生，不同時辰不同命。", author: "Ba Zi Wisdom" },
  { en: "The key to reading any chart is finding the balancing element — this is your life's compass.", zh: "用神者，命中之羅盤也。", author: "Ba Zi Classic" },
  { en: "Prosperity is not just about wealth — it is the alignment of heaven, earth, and human effort.", zh: "財非僅金錢，天時地利人和之聚也。", author: "Ba Zi Wisdom" },
  { en: "The direct officer (正官) brings order and responsibility. The seven kill (七殺) brings power and danger.", zh: "正官者，貴氣也；七殺者，威權也。", author: "Ba Zi Wisdom" },
  { en: "When your nobleman star (天乙貴人) appears, help arrives from unexpected directions.", zh: "天乙貴人臨命，危中有救。", author: "Ba Zi Classic" },
  { en: "Your peach blossom star (桃花) is the magnet of romance in your chart.", zh: "子午卯酉為桃花，姻緣動處也。", author: "Ba Zi Classic" },
  { en: "The academic star (文昌貴人) brings literary talent and examination luck.", zh: "文昌入命，聰明好學。", author: "Ba Zi Classic" },
  { en: "In the cycle of five elements, each one creates the next and controls the one after.", zh: "五行相生相剋，如環無端。", author: "Five Elements Canon" },
  { en: "Feng Shui is the art of arranging your environment to support your destiny.", zh: "風水者，助命之道也。", author: "Chinese Proverb" },
  { en: "The best time to plant a tree was 20 years ago. The second best time is now.", zh: "往者不可諫，來者猶可追。", author: "Confucius" },
  { en: "Patience is a form of wisdom. It demonstrates that we understand the natural rhythm of things.", zh: "欲速則不達。", author: "Confucius" },
  { en: "Do not worry about what others think of you. Worry about what you think of yourself.", zh: "人不知而不慍，不亦君子乎？", author: "Confucius" },
  { en: "The superior man is modest in his speech but exceeds in his actions.", zh: "君子欲訥於言而敏於行。", author: "Confucius" },
  { en: "When you see a good person, think of becoming like them. When you see a bad one, examine your own heart.", zh: "見賢思齊焉，見不賢而內自省也。", author: "Confucius" },
];

/** Returns the quote for today (based on day-of-year). */
export function getDailyQuote(): DailyQuote {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diffMs = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return quotes[dayOfYear % quotes.length];
}

export function getAllQuotes(): DailyQuote[] {
  return quotes;
}

export default quotes;
