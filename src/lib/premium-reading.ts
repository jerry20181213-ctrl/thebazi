import type { BaZiResult } from "./bazi-engine";

export interface PremiumReading {
  elementDeepDive: string;
  pillarBreakdown: string;
  pillarInteractions: string;
  careerWealth: string;
  loveRelationships: string;
  health: string;
  yearlyForecast: string;
  elementalBalance: string;
  fengShui: string;
  palaceInsights: string;
}

const STEM_NAMES: Record<string, string> = {
  甲: "Jia (Yang Wood)", 乙: "Yi (Yin Wood)",
  丙: "Bing (Yang Fire)", 丁: "Ding (Yin Fire)",
  戊: "Wu (Yang Earth)", 己: "Ji (Yin Earth)",
  庚: "Geng (Yang Metal)", 辛: "Xin (Yin Metal)",
  壬: "Ren (Yang Water)", 癸: "Gui (Yin Water)",
};

const BRANCH_NAMES: Record<string, string> = {
  子: "Zi (Rat)", 丑: "Chou (Ox)", 寅: "Yin (Tiger)", 卯: "Mao (Rabbit)",
  辰: "Chen (Dragon)", 巳: "Si (Snake)", 午: "Wu (Horse)", 未: "Wei (Goat)",
  申: "Shen (Monkey)", 酉: "You (Rooster)", 戌: "Xu (Dog)", 亥: "Hai (Pig)",
};

const BRANCH_ANIMAL: Record<string, string> = {
  子: "Rat", 丑: "Ox", 寅: "Tiger", 卯: "Rabbit",
  辰: "Dragon", 巳: "Snake", 午: "Horse", 未: "Goat",
  申: "Monkey", 酉: "Rooster", 戌: "Dog", 亥: "Pig",
};

const STEM_YINYANG: Record<string, "Yang" | "Yin"> = {
  甲: "Yang", 乙: "Yin", 丙: "Yang", 丁: "Yin",
  戊: "Yang", 己: "Yin", 庚: "Yang", 辛: "Yin",
  壬: "Yang", 癸: "Yin",
};

const ELEMENT_PERSONALITY: Record<string, { traits: string; style: string; growth: string }> = {
  Wood: {
    traits: "You embody the energy of a mighty tree — rooted, expansive, and ever-reaching toward the light. Wood people are natural visionaries who see possibilities everywhere. Your growth mindset is your greatest asset.",
    style: "You thrive on growth, creativity, and expansion. Like spring itself, you bring new ideas to life. In times of balance, you are flexible yet strong, bending with the wind without breaking.",
    growth: "Your path to fulfillment lies in continuous learning and creation. When you nurture others' growth, your own flourishes. Guard against becoming too rigid in your thinking — the strongest tree also knows how to sway.",
  },
  Fire: {
    traits: "You radiate warmth, passion, and electricity. Fire people are natural leaders who illuminate every space they enter. Your charisma and enthusiasm are contagious.",
    style: "You operate on inspiration and intensity. Like summer's peak, you bring warmth, light, and transformation wherever you go. In balance, you inspire without burning out.",
    growth: "Your purpose is to lead, inspire, and transform. Share your light generously but remember to tend your own flame. The greatest fire burns steadily — not in a burst that consumes everything.",
  },
  Earth: {
    traits: "You are the stable ground beneath everyone's feet — dependable, nurturing, and deeply wise. Earth people are the anchors of their communities, providing stability and practical wisdom.",
    style: "You excel through patience, reliability, and deep nurturing. Like the harvest season, you bring ideas to fruition. In balance, you are everyone's foundation.",
    growth: "Your gift is creating security and abundance for yourself and others. Trust your practical wisdom — it has been earned through seasons of experience. Remember to nourish yourself as generously as you nourish others.",
  },
  Metal: {
    traits: "You possess the precision, strength, and clarity of refined metal. Metal people are structured, determined, and guided by principle. Your sharp mind cuts through confusion with ease.",
    style: "You excel through discipline, structure, and unwavering standards. Like autumn's crisp clarity, you bring definition and refinement. In balance, you are both strong and elegant.",
    growth: "Your path is one of mastery and refinement. Channel your precision into building something enduring. The finest metal has been through the hottest fire — your challenges have shaped your strength.",
  },
  Water: {
    traits: "You flow with the deep, adaptive wisdom of water. Water people are intuitive, perceptive, and endlessly resourceful. You understand what others cannot see.",
    style: "You navigate life through adaptability, depth, and quiet power. Like winter's stillness, you hold vast depth beneath a calm surface. In balance, you are both powerful and peaceful.",
    growth: "Your wisdom runs deep — trust it. Adaptability is your superpower; no obstacle can hold you permanently. The deepest waters hold the greatest treasures, and your inner world is rich beyond measure.",
  },
};

const ELEMENT_CAREER: Record<string, { industries: string; style: string; wealth: string }> = {
  Wood: {
    industries: "Education, publishing, content creation, environmental work, architecture, design, coaching, gardening, non-profit leadership, entrepreneurship",
    style: "You succeed when you're building something meaningful. Your career thrives on growth, creativity, and making a lasting impact. You're a natural educator and innovator.",
    wealth: "Your wealth grows like a tree — steadily, over time, with deep roots. Focus on long-term investments and creating systems that generate passive income. Your prosperity comes from what you nurture, not what you chase.",
  },
  Fire: {
    industries: "Leadership, entertainment, sales, marketing, public speaking, performing arts, technology startups, politics, coaching, motivational work",
    style: "You succeed in roles where you can lead, inspire, and be seen. Your natural charisma opens doors. You're most fulfilled when your work involves passion and human connection.",
    wealth: "Your financial energy is dynamic — you attract abundance through your passion and visibility. Focus on leveraging your personal brand. Guard against impulsive financial decisions driven by enthusiasm.",
  },
  Earth: {
    industries: "Real estate, agriculture, healthcare, education, counseling, HR, hospitality, construction, nutrition, community organizing",
    style: "You succeed through reliability, patience, and service. Your practical wisdom and nurturing nature make you invaluable in any team. You build success slowly and solidly.",
    wealth: "Wealth comes to you through steady accumulation and wise stewardship. You have a natural talent for making resources grow. Real estate and tangible assets are your financial allies.",
  },
  Metal: {
    industries: "Finance, law, engineering, technology, medicine, analysis, management consulting, quality control, military, precision crafts",
    style: "You excel through precision, high standards, and disciplined execution. Quality over quantity is your motto. Your analytical mind solves problems others find impossible.",
    wealth: "Your relationship with money is precise and strategic. You excel at financial planning and structured investments. Your wealth grows through disciplined saving and calculated risks.",
  },
  Water: {
    industries: "Research, psychology, spirituality, art, music, photography, travel, trade, logistics, technology, healing arts",
    style: "You thrive in fluid, dynamic environments where adaptability is key. Your intuitive intelligence gives you an edge in understanding markets, people, and trends before others.",
    wealth: "Your financial path flows like water — sometimes in trickles, sometimes in floods. You have a gift for spotting opportunities others miss. Build multiple streams of income to match your fluid nature.",
  },
};

const ELEMENT_LOVE: Record<string, { style: string; need: string; match: string }> = {
  Wood: {
    style: "You love with generosity and vision. You see your partner's potential and nurture their growth. In relationships, you bring optimism, warmth, and a desire to build a shared future.",
    need: "You need a partner who respects your independence and shares your sense of purpose. Intellectual connection is essential — you fall in love through meaningful conversation and shared dreams.",
    match: "You connect most deeply with Fire (who shares your passionate vision) and Water (who nourishes your roots). Earth can ground you, while Metal may challenge you to grow.",
  },
  Fire: {
    style: "You love with passionate intensity. Your relationships are filled with warmth, excitement, and grand gestures. You lead with your heart and inspire your partner to be their best self.",
    need: "You need a partner who can match your energy and appreciate your need for admiration. Boredom is your enemy — you thrive on spontaneity, adventure, and romantic expression.",
    match: "You spark brightest with Wood (who fuels your fire) and Earth (who absorbs your warmth with steady appreciation). Water cools you — which can be balance or frustration depending on the individuals.",
  },
  Earth: {
    style: "You love with quiet devotion and consistent care. Your love language is service — you show up, you provide, you build a stable home. You are the rock your partner can always lean on.",
    need: "You need security, loyalty, and appreciation for your steady efforts. You want a partner who creates a peaceful home and values commitment. Trust is built slowly, but once earned, it's unshakeable.",
    match: "You harmonize with Fire (who brings warmth and passion to your stable world) and Metal (who shares your value for structure). Water can nourish you, while Wood's constant growth may feel unsettling.",
  },
  Metal: {
    style: "You love with precision and high standards. You're selective about who you let in, but once committed, you are fiercely loyal. You bring structure, reliability, and deep integrity to relationships.",
    need: "You need a partner who meets your standards and shares your values. Quality over quantity applies to your social world too — you prefer a few deep connections over many surface ones. Honesty is non-negotiable.",
    match: "You resonate with Earth (who shares your appreciation for structure and loyalty) and Water (who softens your edges with adaptability). Fire can forge a powerful bond, though sparks may fly.",
  },
  Water: {
    style: "You love with deep emotional intelligence and intuitive understanding. You sense your partner's needs before they voice them. Your love flows around obstacles and finds creative solutions.",
    need: "You need emotional depth, authenticity, and space for your inner world. You need a partner who respects your need for solitude and understands that your silence is not rejection — it's depth.",
    match: "You merge beautifully with Metal (who gives your flow direction and structure) and Wood (who grows alongside you). Earth can create beautiful patterns with you, while Fire may bring intensity.",
  },
};

const ELEMENT_HEALTH: Record<string, { governs: string; imbalance: string; tips: string }> = {
  Wood: {
    governs: "Liver, gallbladder, eyes, tendons, nerves",
    imbalance: "Wood imbalance often shows up as irritability, eye strain, headaches, joint stiffness, indecision, or frustration. Overactive Wood can lead to anger and aggressive behavior.",
    tips: "Support your Wood energy with gentle stretching, time in nature, and a diet rich in leafy greens and sour foods (lemon, vinegar) in moderation. Reduce alcohol and processed foods.",
  },
  Fire: {
    governs: "Heart, small intestine, blood vessels, tongue, complexion",
    imbalance: "Fire imbalance manifests as insomnia, anxiety, palpitations, poor circulation, or excessive excitement followed by burnout. Overactive Fire can lead to restlessness and emotional volatility.",
    tips: "Cool your Fire with meditation, breathwork, and adequate rest. Bitter foods (dark chocolate, leafy greens) and cooling drinks support heart health. Avoid excessive spicy food and overstimulation before bed.",
  },
  Earth: {
    governs: "Spleen, stomach, pancreas, muscles, mouth",
    imbalance: "Earth imbalance shows as digestive issues, fatigue, worry, overthinking, weak appetite, or weight fluctuations. Overactive Earth energy can lead to excessive care-taking and boundary issues.",
    tips: "Strengthen your Earth with regular meal times, warm cooked foods, and sweet vegetables (carrots, pumpkin, sweet potato). Gentle movement like walking or yoga supports digestion.",
  },
  Metal: {
    governs: "Lungs, large intestine, skin, nose, respiratory system",
    imbalance: "Metal imbalance appears as respiratory issues, skin conditions, constipation, grief, or difficulty letting go. Overactive Metal can lead to rigidity, perfectionism, and emotional isolation.",
    tips: "Support your Metal with deep breathing exercises, skincare routines, and pungent foods (ginger, garlic, onion) in balanced amounts. Spend time in open, airy spaces.",
  },
  Water: {
    governs: "Kidneys, bladder, bones, ears, hair",
    imbalance: "Water imbalance manifests as fatigue, lower back pain, fearfulness, weak immunity, hearing issues, or lack of willpower. Overactive Water can lead to isolation and excessive caution.",
    tips: "Nourish your Water with adequate rest, warm soups, and salty foods in moderation (seaweed, miso, bone broth). Stay hydrated with warm beverages. Face your fears with small, brave steps.",
  },
};

// ---- Wu Xing cycle helpers ----

const GENERATING_CYCLE: Record<string, string> = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

const CONTROLLING_CYCLE: Record<string, string> = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

const REVERSE_CYCLE: Record<string, string> = {
  Fire: "Wood",
  Earth: "Fire",
  Metal: "Earth",
  Water: "Metal",
  Wood: "Water",
};

function getElementRelation(a: string, b: string): "generates" | "controls" | "nourishes" | "neutral" {
  if (GENERATING_CYCLE[a] === b) return "generates";
  if (REVERSE_CYCLE[a] === b) return "nourishes"; // b generates a
  if (CONTROLLING_CYCLE[a] === b) return "controls";
  return "neutral";
}

function getPillarDescription(pillar: { stem: string; branch: string; stemElement: string; branchElement: string }, label: string): string {
  const stemName = STEM_NAMES[pillar.stem] || pillar.stem;
  const branchName = BRANCH_NAMES[pillar.branch] || pillar.branch;
  const yinYang = STEM_YINYANG[pillar.stem] || "";
  const animal = BRANCH_ANIMAL[pillar.branch] || "";

  return `${pillar.stem}${pillar.branch} — ${label}\n` +
    `Heavenly Stem: ${stemName} (${yinYang})\n` +
    `Earthly Branch: ${branchName}\n` +
    `Stem Element: ${pillar.stemElement} · Branch Element: ${pillar.branchElement}`;
}

function pillarInteractionText(a: { stem: string; stemElement: string; branch: string; branchElement: string },
                               b: { stem: string; stemElement: string; branch: string; branchElement: string },
                               aLabel: string, bLabel: string): string {
  const stemRel = getElementRelation(a.stemElement, b.stemElement);
  const parts: string[] = [];

  const relText: Record<string, string> = {
    generates: `The ${a.stemElement} energy of ${aLabel} generates ${b.stemElement} energy for ${bLabel} — this creates a supportive flow, like a river feeding a field.`,
    nourishes: `The ${a.stemElement} energy of ${aLabel} draws strength from ${bLabel}'s ${b.stemElement} — this is a receiving relationship where ${aLabel} benefits from ${bLabel}'s foundation.`,
    controls: `The ${a.stemElement} of ${aLabel} controls ${bLabel}'s ${b.stemElement} — this creates productive tension, like a potter shaping clay. There may be a sense of discipline or challenge between these life areas.`,
    neutral: `The ${a.stemElement} of ${aLabel} and ${b.stemElement} of ${bLabel} are neutral toward each other — neither opposing nor supporting.`,
  };
  parts.push(relText[stemRel]);

  // Check branch interaction too
  const branchRel = getElementRelation(a.branchElement, b.branchElement);
  if (branchRel !== stemRel) {
    const branchRelText: Record<string, string> = {
      generates: `At a deeper level, the ${a.branchElement} energy of ${aLabel} feeds the ${b.branchElement} of ${bLabel}, adding hidden support.`,
      nourishes: `Beneath the surface, ${aLabel} draws hidden nourishment from ${bLabel}'s ${b.branchElement} foundation.`,
      controls: `The ${a.branchElement} hidden influence from ${aLabel} places healthy pressure on ${bLabel}'s ${b.branchElement}.`,
      neutral: ``,
    };
    if (branchRelText[branchRel]) parts.push(branchRelText[branchRel]);
  }

  return parts.join("\n\n");
}

// ---- Palace (shen gong / ming gong / tai yuan) interpretations ----

const PALACE_DESCRIPTIONS: Record<string, string> = {
  Zi: "creativity, risk-taking, and bold new beginnings — a Rat palace energy that favors innovation",
  Chou: "steady accumulation, patience, and methodical progress — an Ox palace energy of quiet determination",
  Yin: "leadership, courage, and pioneering spirit — a Tiger palace that rewards bold action",
  Mao: "diplomacy, refinement, and artistic expression — a Rabbit palace of grace and strategy",
  Chen: "transformation, ambition, and dragon-like vision — a Dragon palace of great potential",
  Si: "wisdom, depth, and strategic calculation — a Snake palace of profound insight",
  Wu: "passion, visibility, and dramatic expression — a Horse palace of dynamic energy",
  Wei: "harmony, gentleness, and artistic sensitivity — a Goat palace of gentle strength",
  Shen: "innovation, wit, and clever problem-solving — a Monkey palace of endless creativity",
  You: "precision, discipline, and refined skill — a Rooster palace of mastery and order",
  Xu: "loyalty, integrity, and protective strength — a Dog palace of steadfast honor",
  Hai: "generosity, intuition, and abundant flow — a Pig palace of fortunate blessings",
};

function getBranchEn(branch: string): string {
  const map: Record<string, string> = {
    子: "Zi", 丑: "Chou", 寅: "Yin", 卯: "Mao",
    辰: "Chen", 巳: "Si", 午: "Wu", 未: "Wei",
    申: "Shen", 酉: "You", 戌: "Xu", 亥: "Hai",
  };
  return map[branch] || branch;
}

function interpretPalace(palaceStr: string, label: string, descriptions: Record<string, string>): string {
  // palaceStr looks like "甲子" — take the branch (second character)
  const branch = palaceStr.slice(-1);
  const branchEn = getBranchEn(branch);
  const desc = descriptions[branchEn] || "a balanced and harmonious energy";
  return `Your ${label} (${palaceStr}) falls in ${branchEn}, representing ${desc}.`;
}

const ANIMAL_INSIGHT: Record<string, string> = {
  Rat: "Your Year pillar reveals the Rat's quick-witted, resourceful nature in your family and early life. This energy gives you sharp instincts and survival savvy that have shaped your foundation.",
  Ox: "Your Ox heritage brings diligence, strength, and reliability from your ancestors. This steady energy is your rock — it keeps you grounded when life gets chaotic.",
  Tiger: "The Tiger in your chart gives you courage and a streak of bold independence. Your family line carries a spirit of adventure and fearless leadership.",
  Rabbit: "Your Rabbit lineage brings diplomacy, grace, and artistic sensitivity. Your ancestors gifted you with the ability to create harmony wherever you go.",
  Dragon: "The Dragon energy in your lineage is powerful and auspicious. You carry the confidence and vision of this mythical protector in your blood.",
  Snake: "Your Snake ancestry gives you deep wisdom, intuition, and a mysterious allure. You see through facades and understand hidden truths.",
  Horse: "The Horse in your chart brings passion, independence, and an adventurous spirit. Your family line values freedom above all.",
  Goat: "Your Goat ancestry blesses you with creativity, gentleness, and artistic gifts. Your family carries a tradition of beauty and compassion.",
  Monkey: "The Monkey in your lineage gives you brilliance, innovation, and playful intelligence. Your ancestors were problem-solvers and innovators.",
  Rooster: "Your Rooster heritage brings precision, punctuality, and high standards. Your family line takes pride in excellence and attention to detail.",
  Dog: "The Dog in your chart gives you loyalty, integrity, and a protective nature. Your ancestors were guardians — loyal and principled.",
  Pig: "Your Pig ancestry brings generosity, warmth, and an abundant spirit. Your family line knows how to enjoy life's blessings and share them freely.",
};

// ---- Main generation ----

export function generatePremiumReading(result: BaZiResult): PremiumReading {
  const element = result.dayMasterElement;
  const animal = result.zodiacAnimal;
  const yearEnergy = "a Fire Horse year — a powerful, intense energy that amplifies passion, action, and change. Fire Horse years are known for their dynamic, unpredictable nature. They favor bold moves but require caution against impulsiveness.";

  const personality = ELEMENT_PERSONALITY[element] || ELEMENT_PERSONALITY.Wood;
  const career = ELEMENT_CAREER[element] || ELEMENT_CAREER.Wood;
  const love = ELEMENT_LOVE[element] || ELEMENT_LOVE.Wood;
  const health = ELEMENT_HEALTH[element] || ELEMENT_HEALTH.Wood;

  const { yearPillar, monthPillar, dayPillar, hourPillar } = result;

  // ---- Element strength analysis ----
  const allFiveElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
  const sortedElements = allFiveElements
    .map((el) => ({ element: el, count: result.presentElements[el] || 0 }))
    .sort((a, b) => b.count - a.count);

  const strongest = sortedElements[0];
  const weakest = sortedElements[sortedElements.length - 1];

  const generatingElement = REVERSE_CYCLE[element]; // what generates the day master
  const controllingElement = CONTROLLING_CYCLE[element]; // what controls the day master
  const generatedBy = result.presentElements[generatingElement] || 0;
  const controlledBy = result.presentElements[controllingElement] || 0;

  // ---- Pillar interactions ----

  const pillarInteractions = `
**Year → Month Pillar**
${pillarInteractionText(yearPillar, monthPillar, "Year (Family/Roots)", "Month (Career/Social)")}

**Month → Day Pillar**
${pillarInteractionText(monthPillar, dayPillar, "Month (Career/Social)", "Day (Self/Spouse)")}

**Day → Hour Pillar**
${pillarInteractionText(dayPillar, hourPillar, "Day (Self/Spouse)", "Hour (Legacy/Children)")}

**Year → Day (Distant Influence on Self)**
${pillarInteractionText(yearPillar, dayPillar, "Year (Family)", "Day (Self)")}
`.trim();

  // ---- Pillar breakdown ----

  const pillarBreakdown = `
**${getPillarDescription(yearPillar, "Year Pillar — Ancestors & Early Life")}**

The Year Pillar represents your family lineage, early environment, and inherited traits. ${yearPillar.stem} atop ${yearPillar.branch} weaves ${yearPillar.stemElement.toLowerCase()} heaven energy with ${yearPillar.branchElement.toLowerCase()} earth energy in your foundation. ${ANIMAL_INSIGHT[animal] || ""} This pillar shaped your earliest impressions of the world and the unconscious patterns passed down through your family line.

**${getPillarDescription(monthPillar, "Month Pillar — Career, Social & Siblings")}**

The Month Pillar governs your career path, social world, and young adulthood. ${monthPillar.stem} (${monthPillar.stemElement}) atop ${monthPillar.branch} (${monthPillar.branchElement}) creates the energetic climate of your professional life. This pillar reveals how you navigate groups, your approach to work, and the social strategies you developed in your youth.

**${getPillarDescription(dayPillar, "Day Pillar — Self, Spouse & Inner World")}**

THIS IS YOU. The Day Pillar is the core of your Ba Zi chart. Your Day Master is ${result.dayMaster} (${result.dayMasterElement}), making ${element.toLowerCase()} the ruling energy of your entire being — every other pillar serves, challenges, or supports this central self. The Branch ${dayPillar.branch} (${BRANCH_NAMES[dayPillar.branch] || dayPillar.branch}) is your Spouse Palace, revealing the qualities you seek in a partner and your approach to intimate relationships.

**${getPillarDescription(hourPillar, "Hour Pillar — Children, Creativity & Late Life")}**

The Hour Pillar reflects your later years, your creative output, and your legacy. ${hourPillar.stem} (${hourPillar.stemElement}) atop ${hourPillar.branch} (${hourPillar.branchElement}) shapes how you express your creativity and what you pass on to future generations. This pillar becomes more influential after age 45 and governs the harvest season of your life.
`.trim();

  // ---- Elemental balance with strength analysis ----

  let elementalBalance: string;

  if (result.missingElements.length > 0) {
    const sortedText = sortedElements
      .filter((e) => e.count > 0)
      .map((e) => `${e.element}: ${e.count}`)
      .join(" | ");

    elementalBalance = [
      `Your Five Element Distribution: ${sortedText}`,
      "",
      `Your dominant element is **${strongest.element}** (${strongest.count} occurrences). ${strongest.element === element ? "This means your Day Master element is the most prominent energy in your chart — your core nature is strongly expressed." : `This element is not your Day Master, meaning the strongest energy in your chart is different from your core self. This creates interesting dynamics — the world around you may feel more ${strongest.element.toLowerCase()} while you are ${element.toLowerCase()} inside.`}`,
      "",
      `Your chart is **missing**: ${result.missingElements.join(", ")}. This doesn't mean deficiency — it means these energies are less immediately available to you and may need conscious cultivation.`,
      "",
      `**How to Balance Your ${element} Day Master**`,
      "",
      `Your Day Master ${element} is supported by the generating element **${generatingElement}** — you have ${generatedBy} occurrence${generatedBy !== 1 ? "s" : ""} of ${generatingElement} in your chart. ${generatedBy > 0 ? "This is excellent — you have natural support flowing into your core element." : "This means your core energy isn't receiving much natural generation from your chart's elements. You may need to consciously cultivate ${generatingElement.toLowerCase()} energy through your environment, diet, and activities."}`,
      "",
      `Your Day Master is controlled by **${controllingElement}** — you have ${controlledBy} occurrence${controlledBy !== 1 ? "s" : ""} of ${controllingElement} in your chart. ${controlledBy > 0 ? "This creates healthy discipline and structure for your energy." : "Without ${controllingElement.toLowerCase()} influence, your ${element.toLowerCase()} energy may sometimes feel ungrounded or excessive."}`,
      "",
      result.missingElements.map((el) => {
        const tips: Record<string, string> = {
          Wood: "Surround yourself with plants and wooden objects. Wear green. Spend time in forests or parks. Stretch daily. Start a garden or creative project.",
          Fire: "Add warm colors (red, orange) to your environment. Spend time in sunlight. Engage in passionate conversations or creative work. Light candles.",
          Earth: "Spend time in nature — gardens, mountains, parks. Use ceramic items and earth tones in your decor. Eat root vegetables. Practice grounding meditations.",
          Metal: "Wear white, gold, or silver. Declutter your space. Practice deep breathing. Take up a precision craft or skill. Establish clear routines and boundaries.",
          Water: "Spend time near water — rivers, lakes, the ocean. Wear black or deep blue. Drink plenty of water. Practice stillness and meditation. Keep a dream journal.",
        };
        return `**Cultivating ${el}**: ${tips[el] || ""}`;
      }).join("\n\n"),
    ].join("\n");
  } else {
    elementalBalance = [
      "**All Five Elements Present — Natural Harmony**",
      "",
      "Remarkably, all five elements — Wood, Fire, Earth, Metal, and Water — are present in your chart. This is a rare and auspicious sign of natural balance and completeness.",
      "",
      `Your Five Element Distribution: ${sortedElements.map((e) => `${e.element}: ${e.count}`).join(" | ")}`,
      "",
      `Your strongest element is **${strongest.element}** (${strongest.count} occurrences). Your weakest is **${weakest.element}** (${weakest.count} occurrence${weakest.count !== 1 ? "s" : ""}). The key to maintaining harmony is recognizing when to draw on each energy and not allowing the strongest element to overpower the others.`,
      "",
      `Your Day Master ${element} is generated by **${generatingElement}** (${generatedBy} in chart) and controlled by **${controllingElement}** (${controlledBy} in chart). Both support and challenge are present in healthy measure.`,
    ].join("\n");
  }

  // ---- Palace insights (taiYuan, mingGong, shenGong) ----

  let palaceInsights = "";
  try {
    palaceInsights = [
      "**Three Palaces: The Hidden Architecture of Your Destiny**",
      "",
      "Beyond the Four Pillars, classical Ba Zi examines three additional palaces that reveal deeper layers of your life path:",
      "",
      `🏛 ${interpretPalace(result.taiYuan, "Palace of Conception (胎元 Tai Yuan)", PALACE_DESCRIPTIONS)} This palace reveals the quality of your prenatal energy — the cosmic conditions present at your conception. It speaks to your innate gifts and constitutional strengths.`,
      "",
      `🏛 ${interpretPalace(result.mingGong, "Palace of Destiny (命宫 Ming Gong)", PALACE_DESCRIPTIONS)} Your Ming Gong is the most important of the three — it represents your life purpose, your destined path, and the overall direction of your journey. This is your cosmic compass.`,
      "",
      `🏛 ${interpretPalace(result.shenGong, "Palace of the Self (身宫 Shen Gong)", PALACE_DESCRIPTIONS)} Your Shen Gong reflects your physical body, public persona, and how you manifest your destiny in the material world. It shows how others perceive you versus who you truly are.`,
    ].join("\n");
  } catch {
    palaceInsights = "Your Three Palaces (Tai Yuan, Ming Gong, Shen Gong) reveal the deeper layers of your destiny. Consult a classical Ba Zi master for a full Three Palaces reading.";
  }

  // ---- Yearly forecast with more personalized details ----

  const yearlyForecast = `
**2026: The Fire Horse Year**

${yearEnergy}

**For You, a ${element} Day Master**

${element === "Fire" ? "This is YOUR year — the Horse amplifies your natural Fire energy. Your charisma and leadership abilities are at a peak. Channel this energy into bold initiatives, but guard against burnout and impulsiveness. Relationships flourish when you lead with warmth rather than intensity. The Fire Horse year doubles down on your natural strengths — use this momentum wisely." : ""}
${element === "Wood" ? "The Fire Horse year fuels your Wood energy like sunlight feeds a forest. Your creativity and vision are supercharged. This is an excellent year for launching new projects, expanding your reach, and planting seeds for long-term growth. The Fire element in 2026 helps your ideas catch fire — share them boldly and watch them grow." : ""}
${element === "Earth" ? "The Fire of 2026 generates powerful Earth energy, making this a year of harvest and manifestation for you. Projects and efforts from previous years come to fruition. Your natural stability is amplified — you become the anchor others turn to. Enjoy this abundant phase while staying grounded. The Fire Horse's intensity finds calm in your steady presence." : ""}
${element === "Metal" ? "The Fire Horse year tempers and refines your Metal energy. You may feel pressure, but remember — the finest steel is forged in the hottest fire. This is a year of transformation and honing your skills. Challenges are opportunities in disguise. Your precision and discipline will see you through. The key is flexibility: even the strongest metal can be brittle under too much heat." : ""}
${element === "Water" ? "The Fire Horse year creates a dynamic tension with your Water element — steam and vapor can be powerful forces. Your adaptability is your greatest asset this year. This year asks you to find balance between action (Fire) and wisdom (Water). Trust your intuition to guide you through changing circumstances. When Fire and Water work together, they create the steam that powers transformation." : ""}

**Monthly Guidance for ${element} in 2026**

${element === "Fire" ? "Spring (Wood season) fuels your Fire — excellent for planning and planting seeds. Summer is your peak season — act boldly. Autumn (Metal) tempers you — refine and edit. Winter (Water) is a time of rest and reflection — honor this pause." : ""}
${element === "Wood" ? "Spring is your season of maximum growth — plant the biggest seeds now. Summer (Fire) helps your ideas bloom — share them widely. Autumn (Metal) prunes what isn't working — let go without regret. Winter (Water) nourishes your roots — rest and restore." : ""}
${element === "Earth" ? "Late summer is your season — harvest what you've sown. Spring (Wood) challenges you to grow beyond your comfort zone. Autumn (Metal) helps you refine your treasures. Winter (Water) asks you to rest in your abundance." : ""}
${element === "Metal" ? "Autumn is your season of peak clarity and precision. Spring (Wood) challenges you to be flexible — bend, don't break. Summer (Fire) tempers and refines you — lean into the forge. Winter (Water) sharpens your edge — reflect and plan." : ""}
${element === "Water" ? "Winter is your season of deep power and wisdom. Spring (Wood) helps your insights grow into action. Summer (Fire) challenges you to express your depth outwardly. Autumn (Metal) channels your flow into precise forms." : ""}

**Lucky Numbers for 2026: ${result.luckyNumbers}**
**Lucky Colors: ${result.luckyColors}**
`.trim();

  // ---- Feng shui ----

  const fengShui = `
**Your Lucky Directions: ${result.luckyDirections}**

These directions are energetically favorable for you. Whenever possible, orient yourself toward them during important activities.

**Career & Success**
- Position your desk to face one of your lucky directions
- Place a symbol of your Day Master element (${element}) in the corresponding Bagua area
- ${generatedBy > 0 ? `Since ${generatingElement} supports you, include ${generatingElement.toLowerCase()} elements in your workspace for added support` : "Consider adding your generating element's color or symbol to strengthen your foundation"}
- Keep your space clutter-free — stagnant energy blocks opportunity

**Colors for Power & Harmony**
Your lucky colors are ${result.luckyColors}. Incorporate these into:
- Your clothing for important meetings and events
- Your bedroom for relationship harmony
- Your workspace for career success
${result.missingElements.length > 0 ? `\nSince your chart is light on ${result.missingElements.join(", ")}, consider adding these colors in small accents to create balance without overwhelming your natural energy.` : "\nWith all five elements present, you have natural color balance — use any colors that resonate with your current needs."}

**Simple Daily Ritual**
Each morning, face your most favorable direction. Take three deep breaths — inhale possibility, exhale resistance. Visualize your intention for the day flowing toward you like a favorable wind. This 60-second practice aligns your personal energy with the cosmic currents.
`.trim();

  return {
    elementDeepDive: `
**Your Core Element: ${element} (${result.dayMaster})**

${personality.traits}

**Your Natural Style**
${personality.style}

**Your Path to Growth**
${personality.growth}

**Your Day Master in Detail**
${result.dayMaster} (${STEM_NAMES[result.dayMaster] || result.dayMaster}) is ${STEM_YINYANG[result.dayMaster]?.toLowerCase() || ""} ${element.toLowerCase()} — the ${element.toLowerCase()} energy expressed in its ${STEM_YINYANG[result.dayMaster]?.toLowerCase() || ""} aspect. ${result.dayMaster === "甲" ? "Jia Wood is the mighty tree — tall, upright, and expansive. You lead by standing tall and providing shelter for others." : ""}
${result.dayMaster === "乙" ? "Yi Wood is the flowering vine — flexible, beautiful, and adaptive. You grow by weaving through obstacles with grace." : ""}
${result.dayMaster === "丙" ? "Bing Fire is the sun at noon — blazing, generous, and impossible to ignore. You illuminate everything around you." : ""}
${result.dayMaster === "丁" ? "Ding Fire is the candle flame — gentle, penetrating, and warm. You bring light to dark places without burning." : ""}
${result.dayMaster === "戊" ? "Wu Earth is the great mountain — massive, stable, and awe-inspiring. You are a foundation that others build their lives upon." : ""}
${result.dayMaster === "己" ? "Ji Earth is the fertile garden soil — receptive, nurturing, and life-giving. You transform whatever is planted in you into abundance." : ""}
${result.dayMaster === "庚" ? "Geng Metal is the raw blade — sharp, direct, and cutting. You excel at slicing through confusion to reach the truth." : ""}
${result.dayMaster === "辛" ? "Xin Metal is the polished jewel — refined, precious, and multifaceted. Your brilliance comes from careful refinement over time." : ""}
${result.dayMaster === "壬" ? "Ren Water is the mighty ocean — vast, powerful, and deep beyond measure. Your intuition and depth are your greatest strengths." : ""}
${result.dayMaster === "癸" ? "Gui Water is the gentle rain — soft, pervasive, and life-giving. You nourish the world around you with quiet persistence." : ""}
`.trim(),

    pillarBreakdown,

    pillarInteractions,

    careerWealth: `
**Your Career Element: ${element}**

${career.style}

**Best Industries for You**
${career.industries}

**Your Career Year (Month) Pillar**
Your Month Pillar (${monthPillar.stem}${monthPillar.branch}) influences your professional path. With ${monthPillar.stemElement} atop ${monthPillar.branchElement}, your career approach combines ${monthPillar.stemElement.toLowerCase()} vision with ${monthPillar.branchElement.toLowerCase()} execution. This unique blend shapes how you lead, what work environment suits you, and where you naturally excel.

**Wealth & Prosperity**
${career.wealth}

**Lucky Career Directions**
Your most favorable directions for career success are: ${result.luckyDirections}. Whenever possible, face these directions during important meetings, interviews, or business negotiations. If your workspace allows, position your desk to face one of these directions.
`.trim(),

    loveRelationships: `
**Your Love Style**
${love.style}

**What You Need in a Partner**
${love.need}

**Elemental Compatibility**
${love.match}

**Your Spouse Palace (Day Branch: ${BRANCH_NAMES[dayPillar.branch] || dayPillar.branch})**
The Branch of your Day Pillar is called the Spouse Palace — it holds the secrets of your ideal partner and marital destiny. The ${BRANCH_ANIMAL[dayPillar.branch] || ""} energy here suggests you are drawn to partners who embody ${dayPillar.branchElement.toLowerCase()} qualities. This animal sign in your Day Branch reveals unconscious patterns in your romantic choices — what attracts you, what repels you, and what you need to feel fulfilled in partnership.

${dayPillar.branch === "子" ? "The Rat in your Spouse Palace suggests you need a partner who is clever, adaptable, and socially engaging. You're drawn to wit and resourcefulness." : ""}
${dayPillar.branch === "丑" ? "The Ox in your Spouse Palace indicates you seek a partner who is steady, reliable, and loyal. Trust is built slowly but deeply." : ""}
${dayPillar.branch === "寅" ? "The Tiger in your Spouse Palace means you need a partner who is bold, independent, and exciting. You admire courage and leadership." : ""}
${dayPillar.branch === "卯" ? "The Rabbit in your Spouse Palace reveals you need a partner who is gentle, diplomatic, and aesthetically sensitive. Harmony is essential." : ""}
${dayPillar.branch === "辰" ? "The Dragon in your Spouse Palace suggests you seek a partner who is ambitious, charismatic, and larger than life. You admire vision." : ""}
${dayPillar.branch === "巳" ? "The Snake in your Spouse Palace indicates you need a partner who is wise, mysterious, and emotionally deep. You value intellectual connection." : ""}
${dayPillar.branch === "午" ? "The Horse in your Spouse Palace means you need a partner who is passionate, free-spirited, and adventurous. You value independence." : ""}
${dayPillar.branch === "未" ? "The Goat in your Spouse Palace reveals you need a partner who is gentle, creative, and nurturing. Emotional security matters most." : ""}
${dayPillar.branch === "申" ? "The Monkey in your Spouse Palace suggests you need a partner who is witty, innovative, and intellectually stimulating. Boredom is your enemy." : ""}
${dayPillar.branch === "酉" ? "The Rooster in your Spouse Palace indicates you need a partner who is polished, principled, and confident. You admire excellence." : ""}
${dayPillar.branch === "戌" ? "The Dog in your Spouse Palace means you need a partner who is loyal, honest, and principled. Trust and integrity are non-negotiable." : ""}
${dayPillar.branch === "亥" ? "The Pig in your Spouse Palace reveals you need a partner who is generous, warm, and life-affirming. You value kindness above all." : ""}
`.trim(),

    health: `
**Organs You Govern**
${health.governs}

**Signs of Imbalance**
${health.imbalance}

**Wellness Practices for You**
${health.tips}

**Element-Based Wellness**
Since your core is ${element}, your health is supported by cultivating ${generatingElement} energy (which generates ${element}) and managed by balancing ${controllingElement} (which controls ${element}).
${generatedBy > 0 ? `You have natural ${generatingElement} support in your chart (${generatedBy} occurrence${generatedBy !== 1 ? "s" : ""}), which means your ${element} organs have a built-in support system.` : `Since ${generatingElement} is not strongly present in your chart, be extra mindful of supporting your ${element} organs through diet, rest, and stress management.`}
`.trim(),

    yearlyForecast,

    elementalBalance,

    fengShui,

    palaceInsights,
  };
}
