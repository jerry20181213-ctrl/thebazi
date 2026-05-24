import { Solar, Lunar, EightChar } from "lunar-javascript";
import { STEM_WUXING, BRANCH_WUXING, WUXING_COLORS, ELEMENT_EMOJIS } from "./constants";

export interface BaZiInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: "male" | "female";
}

export interface Pillar {
  stem: string;
  branch: string;
  stemElement: string;
  branchElement: string;
  stemColor: string;
  branchColor: string;
  stemEmoji: string;
  branchEmoji: string;
}

export interface BaZiResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  dayMaster: string;
  dayMasterElement: string;
  zodiacAnimal: string;
  missingElements: string[];
  presentElements: Record<string, number>;
  fiveElements: string;
  luckyDirections: string;
  luckyColors: string;
  luckyNumbers: string;
  description: string;
  taiYuan: string;
  mingGong: string;
  shenGong: string;
}

function createPillar(stem: string, branch: string): Pillar {
  const stemElement = STEM_WUXING[stem] || "Unknown";
  const branchElement = BRANCH_WUXING[branch] || "Unknown";
  return {
    stem,
    branch,
    stemElement,
    branchElement,
    stemColor: WUXING_COLORS[stemElement] || "#666",
    branchColor: WUXING_COLORS[branchElement] || "#666",
    stemEmoji: ELEMENT_EMOJIS[stemElement] || "❓",
    branchEmoji: ELEMENT_EMOJIS[branchElement] || "❓",
  };
}

function getYearShengXiao(stemBranch: string): string {
  const animals: Record<string, string> = {
    子: "Rat", 丑: "Ox", 寅: "Tiger", 卯: "Rabbit",
    辰: "Dragon", 巳: "Snake", 午: "Horse", 未: "Goat",
    申: "Monkey", 酉: "Rooster", 戌: "Dog", 亥: "Pig",
  };
  const branch = stemBranch.slice(-1);
  return animals[branch] || "Unknown";
}

export function calculateBaZi(input: BaZiInput): BaZiResult {
  const solar = Solar.fromYmdHms(input.year, input.month, input.day, input.hour, input.minute, 0);
  const lunar = solar.getLunar();
  const ec = EightChar.fromLunar(lunar);

  const yearPillar = createPillar(ec.getYear().slice(0, 1), ec.getYear().slice(1));
  const monthPillar = createPillar(ec.getMonth().slice(0, 1), ec.getMonth().slice(1));
  const dayPillar = createPillar(ec.getDay().slice(0, 1), ec.getDay().slice(1));
  const hourPillar = createPillar(ec.getTime().slice(0, 1), ec.getTime().slice(1));

  const dayGan = ec.getDayGan();
  const dayMasterElement = STEM_WUXING[dayGan] || "Unknown";
  const zodiacAnimal = getYearShengXiao(ec.getYear());

  // Count element occurrences
  const elementCount: Record<string, number> = {};
  const allElements = [
    yearPillar.stemElement, yearPillar.branchElement,
    monthPillar.stemElement, monthPillar.branchElement,
    dayPillar.stemElement, dayPillar.branchElement,
    hourPillar.stemElement, hourPillar.branchElement,
  ];
  allElements.forEach((el) => {
    elementCount[el] = (elementCount[el] || 0) + 1;
  });

  const allFiveElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
  const missingElements = allFiveElements.filter((el) => !elementCount[el]);

  // Calculate five elements for display
  const fiveElements = allFiveElements
    .filter((el) => elementCount[el])
    .map((el) => `${ELEMENT_EMOJIS[el]} ${el} (${elementCount[el]})`)
    .join(" | ");

  // Lucky directions based on day master
  const directions: Record<string, string> = {
    Wood: "East, Southeast",
    Fire: "South",
    Earth: "Center, Northeast, Southwest",
    Metal: "West, Northwest",
    Water: "North",
  };

  // Lucky colors based on generating element
  const colors: Record<string, string> = {
    Wood: "Green, Brown",
    Fire: "Red, Purple, Orange",
    Earth: "Yellow, Beige, Brown",
    Metal: "White, Gold, Silver",
    Water: "Black, Blue",
  };

  // Lucky numbers based on element
  const numbers: Record<string, string> = {
    Wood: "1, 3, 4",
    Fire: "2, 7, 9",
    Earth: "5, 8, 10",
    Metal: "6, 7, 0",
    Water: "1, 6, 11",
  };

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster: dayGan,
    dayMasterElement,
    zodiacAnimal,
    missingElements,
    presentElements: elementCount,
    fiveElements,
    luckyDirections: directions[dayMasterElement] || "North",
    luckyColors: colors[dayMasterElement] || "White",
    luckyNumbers: numbers[dayMasterElement] || "1, 6",
    description: "",
    taiYuan: ec.getTaiYuan(),
    mingGong: ec.getMingGong(),
    shenGong: ec.getShenGong(),
  };
}

export function getZodiacByYear(year: number): string {
  const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  const startYear = 1900; // 1900 is Rat year
  const index = ((year - startYear) % 12 + 12) % 12;
  return animals[index];
}
