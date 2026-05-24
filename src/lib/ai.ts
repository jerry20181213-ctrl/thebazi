import type { BaZiResult } from "./bazi-engine";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

function buildPrompt(result: BaZiResult): string {
  return `You are a friendly and insightful Chinese Ba Zi (Four Pillars of Destiny) consultant. Write a personalized fortune reading in English based on the following Ba Zi chart data.

**IMPORTANT RULES:**
1. Always add a disclaimer: "This reading is for entertainment purposes only."
2. Be encouraging and focus on positive potential, not negative predictions.
3. Write in warm, clear English. Use emojis sparingly (1-2 max).
4. Keep the reading to 3-4 paragraphs (about 200-300 words total).
5. Structure: Career/Wealth → Relationships → Health → Personal Growth advice.
6. Tie advice to the person's element and zodiac animal naturally.
7. Never claim 100% accuracy or make absolute predictions.

**BAZI CHART DATA:**
- Year Pillar: ${result.yearPillar.stem}${result.yearPillar.branch} (${result.yearPillar.stemElement} ${result.yearPillar.branchElement})
- Month Pillar: ${result.monthPillar.stem}${result.monthPillar.branch} (${result.monthPillar.stemElement} ${result.monthPillar.branchElement})
- Day Pillar: ${result.dayPillar.stem}${result.dayPillar.branch} (${result.dayPillar.stemElement} ${result.dayPillar.branchElement}) — THIS IS YOU
- Hour Pillar: ${result.hourPillar.stem}${result.hourPillar.branch} (${result.hourPillar.stemElement} ${result.hourPillar.branchElement})
- Day Master (You): ${result.dayMaster} (${result.dayMasterElement})
- Chinese Zodiac Animal: ${result.zodiacAnimal}
- Present Elements: ${result.fiveElements}
- Missing Elements: ${result.missingElements.length ? result.missingElements.join(", ") : "None"}
- Lucky Directions: ${result.luckyDirections}
- Lucky Colors: ${result.luckyColors}
- Lucky Numbers: ${result.luckyNumbers}

Write the reading now:`;
}

export async function generateReading(result: BaZiResult): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return "\[Reading unavailable: API key not configured.\]";
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a wise and warm Ba Zi fortune teller who provides insightful, encouraging readings for entertainment purposes. You never make absolute predictions or medical/financial claims.",
          },
          {
            role: "user",
            content: buildPrompt(result),
          },
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error(`DeepSeek API error ${response.status}: ${errBody}`);
      return "\[The stars are aligning... please try again later.\]";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "\[Reading could not be generated. Please try again.\]";
  } catch (error) {
    console.error("DeepSeek API call failed:", error);
    return "\[Unable to connect to the cosmic source. Please try again later.\]";
  }
}

// Fallback: generate a template-based reading when AI is unavailable
export function generateTemplateReading(result: BaZiResult): string {
  const elementTraits: Record<string, string> = {
    Wood: "You have the spirit of Wood — growth, creativity, and expansion. Like a mighty tree, you naturally reach for the sky while staying rooted in your values. In career, you thrive when you can innovate and build something lasting.",
    Fire: "Your Fire element gives you passion, charisma, and warmth. You light up every room you enter and inspire those around you. Your career path benefits from roles where you can lead, motivate, and shine.",
    Earth: "With Earth as your core element, you are stable, nurturing, and reliable — the foundation others depend on. Your practical wisdom makes you excellent in roles that require patience, care, and long-term thinking.",
    Metal: "Your Metal element gives you strength, precision, and determination. You cut through obstacles with clarity and grace. Your path to success lies in focused expertise and unwavering discipline.",
    Water: "Water flows through you — adaptable, deep, and intuitive. You navigate life's challenges with flexibility and wisdom. Your strength lies in your emotional intelligence and ability to go with the flow.",
  };

  const animalTraits: Record<string, string> = {
    Rat: "Your Rat spirit brings quick wit and resourcefulness. Trust your instincts in financial matters — they're sharper than you think.",
    Ox: "Your Ox determination is your superpower. Steady progress, not speed, will bring you the lasting success you deserve.",
    Tiger: "Your Tiger courage sets you apart. Take that bold step you've been considering — the universe has your back.",
    Rabbit: "Your Rabbit grace and diplomacy make you a natural peacemaker. Your gentleness is not weakness — it's your greatest strength.",
    Dragon: "Your Dragon energy is magnetic and powerful. This is your year to lead with confidence and vision.",
    Snake: "Your Snake wisdom runs deep. Trust your intuition — it sees what others miss.",
    Horse: "Your Horse spirit craves freedom and adventure. When you follow your passion, success follows you.",
    Goat: "Your Goat creativity knows no bounds. Express yourself boldly — your art is needed in this world.",
    Monkey: "Your Monkey cleverness solves problems others can't. Your innovative mind is your ticket to greatness.",
    Rooster: "Your Rooster precision and punctuality set a standard others aspire to. Keep your standards high.",
    Dog: "Your Dog loyalty and integrity build trust wherever you go. Your honest nature attracts the right opportunities.",
    Pig: "Your Pig generosity and warmth make you deeply loved by those around you. Your abundance mindset attracts prosperity.",
  };

  const self = result;
  const element = elementTraits[self.dayMasterElement] || "";
  const animal = animalTraits[self.zodiacAnimal] || "";

  return `🔮 **Your Ba Zi Reading**

*For entertainment purposes only.*

**Your Core Element: ${self.dayMasterElement} (${self.dayMaster})**

${element}

**Your Spirit Animal: The ${self.zodiacAnimal}**

${animal}

**Your Lucky Elements**
✨ Lucky Colors: ${self.luckyColors}
🧭 Lucky Directions: ${self.luckyDirections}
🔢 Lucky Numbers: ${self.luckyNumbers}

${self.missingElements.length ? `**Elemental Balance Tip:** Your chart is light on ${self.missingElements.join(", ")} energy. Consider incorporating these elements' colors and environments into your daily life for greater harmony.` : "**Elemental Balance:** All five elements are present in your chart — a sign of natural harmony and balance. 🌟"}

**Looking Ahead**
The ancient wisdom of Ba Zi reminds us that knowing your destiny is the first step to creating it. Your chart reveals unique strengths and potentials. Embrace them, work with them, and remember: the stars incline, they do not compel.

Blessings on your journey. ☯️`;
}
