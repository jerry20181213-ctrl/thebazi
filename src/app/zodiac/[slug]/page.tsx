import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";
import AdSlot from "@/components/AdSlot";

const ZODIAC_CONTENT: Record<string, {
  element: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatibility: string[];
  description: string;
  career: string;
  love: string;
  health: string;
}> = {
  rat: {
    element: "Water",
    traits: ["Quick-witted", "Resourceful", "Versatile", "Charming"],
    strengths: ["Adaptability", "Intelligence", "Strong intuition", "Social skills"],
    weaknesses: ["Opportunistic", "Stubborn", "Critical", "Cunning"],
    compatibility: ["Dragon", "Monkey", "Ox"],
    description: "The Rat is the first animal in the Chinese zodiac cycle. People born in the Year of the Rat are known for their quick wit, charm, and resourcefulness. They are natural survivors who can navigate complex situations with ease.",
    career: "Rats excel in careers that require intelligence and quick thinking — writing, analysis, management, and entrepreneurship. Their adaptability makes them thrive in dynamic environments.",
    love: "In relationships, Rats are romantic and attentive partners. They seek intellectual stimulation and emotional security. The Rat's charm makes them naturally attractive, but they need someone who can match their mental agility.",
    health: "Rats should pay attention to stress management and digestive health. Regular exercise and a balanced diet help maintain their natural vitality.",
  },
  ox: {
    element: "Earth",
    traits: ["Diligent", "Dependable", "Strong", "Honest"],
    strengths: ["Patience", "Hard work", "Discipline", "Loyalty"],
    weaknesses: ["Stubborn", "Conservative", "Pessimistic", "Rigid"],
    compatibility: ["Snake", "Rooster", "Rat"],
    description: "The Ox is a symbol of diligence, persistence, and honesty. People born in the Year of the Ox are known for their strong work ethic and reliability. They approach life with patience and determination.",
    career: "Oxen thrive in structured environments where their diligence is valued. They excel in finance, engineering, agriculture, and management — fields that require patience and attention to detail.",
    love: "In love, Oxen are loyal and devoted partners. They may be slow to open up, but once committed, they are steadfast and protective. They value actions more than words.",
    health: "Oxen generally have strong constitutions but should watch for stress-related issues. Regular rest and relaxation are essential to balance their hardworking nature.",
  },
  tiger: {
    element: "Wood",
    traits: ["Brave", "Confident", "Charismatic", "Competitive"],
    strengths: ["Courage", "Natural leadership", "Generosity", "Passion"],
    weaknesses: ["Impulsive", "Rebellious", "Hot-tempered", "Restless"],
    compatibility: ["Horse", "Dog", "Pig"],
    description: "The Tiger is known for its courage, competitiveness, and confidence. People born in the Year of the Tiger are natural leaders who aren't afraid to take risks and stand out from the crowd.",
    career: "Tigers thrive in leadership roles and dynamic environments. They excel in entrepreneurship, entertainment, politics, and any field that rewards boldness and vision.",
    love: "In relationships, Tigers are passionate and protective partners. They seek excitement and deep emotional connections. They need a partner who appreciates their independence and adventurous spirit.",
    health: "Tigers have abundant energy but need to manage stress and avoid burnout. Regular physical activity and relaxation practices help maintain balance.",
  },
  rabbit: {
    element: "Wood",
    traits: ["Gentle", "Elegant", "Kind", "Responsible"],
    strengths: ["Diplomacy", "Artistic talent", "Compassion", "Caution"],
    weaknesses: ["Overly cautious", "Indecisive", "Reserved", "Superficial"],
    compatibility: ["Goat", "Pig", "Dog"],
    description: "The Rabbit is the fourth animal in the Chinese zodiac. People born in the Year of the Rabbit are known for their grace, diplomacy, and artistic sensibilities. They create harmony wherever they go.",
    career: "Rabbits excel in diplomatic, creative, and helping professions. They make excellent counselors, artists, judges, and diplomats. Their attention to detail serves them well.",
    love: "In love, Rabbits are gentle, caring partners who value peace and harmony. They seek stable, committed relationships and create warm, nurturing homes.",
    health: "Rabbits should focus on mental wellbeing and maintaining regular exercise routines. They benefit from calming activities like yoga and meditation.",
  },
  dragon: {
    element: "Earth",
    traits: ["Confident", "Intelligent", "Enthusiastic", "Charismatic"],
    strengths: ["Natural leadership", "Ambition", "Innovation", "Confidence"],
    weaknesses: ["Arrogant", "Impatient", "Dogmatic", "Overly demanding"],
    compatibility: ["Rat", "Monkey", "Rooster"],
    description: "The Dragon is the only mythical creature in the Chinese zodiac. People born in the Year of the Dragon are confident, ambitious, and naturally charismatic. They are born leaders who inspire others.",
    career: "Dragons excel in positions of power and influence. They thrive in entrepreneurship, politics, entertainment, and executive leadership. Their innovative thinking drives success.",
    love: "Dragons are passionate and romantic partners. They bring excitement and grand gestures to relationships. They need a partner who can match their intensity and ambition.",
    health: "Dragons have strong vitality but can overextend themselves. Regular rest and stress management are crucial for maintaining their health.",
  },
  snake: {
    element: "Fire",
    traits: ["Wise", "Mysterious", "Intuitive", "Elegant"],
    strengths: ["Deep thinking", "Intuition", "Wisdom", "Elegance"],
    weaknesses: ["Jealous", "Secretive", "Lazy", "Possessive"],
    compatibility: ["Ox", "Rooster", "Monkey"],
    description: "The Snake is the sixth animal in the Chinese zodiac. People born in the Year of the Snake are wise, intuitive, and deeply philosophical. They possess a natural elegance and mysterious charm.",
    career: "Snakes excel in roles that require deep thinking and strategy. They thrive in research, philosophy, finance, and the arts. Their intuition guides them to make excellent decisions.",
    love: "In relationships, Snakes are passionate and deeply committed partners. They seek intellectual and emotional depth. They value loyalty and expect the same in return.",
    health: "Snakes should focus on maintaining a healthy digestive system and managing stress. Moderate exercise and a balanced lifestyle suit their nature.",
  },
  horse: {
    element: "Fire",
    traits: ["Energetic", "Independent", "Impatient", "Outgoing"],
    strengths: ["Enthusiasm", "Independence", "Social skills", "Adventurous spirit"],
    weaknesses: ["Impulsive", "Stubborn", "Self-centered", "Restless"],
    compatibility: ["Tiger", "Goat", "Dog"],
    description: "The Horse is the seventh animal in the Chinese zodiac. People born in the Year of the Horse are energetic, independent, and adventurous. They have an unstoppable spirit and love freedom.",
    career: "Horses thrive in dynamic, fast-paced environments. They excel in sales, travel, sports, entertainment, and entrepreneurship. Their energy inspires those around them.",
    love: "In love, Horses are passionate and exciting partners. They value their independence and need a partner who respects their need for freedom. When committed, they are devoted and loyal.",
    health: "Horses have robust energy but should watch for burnout. Regular exercise and adequate rest are essential for maintaining their vitality.",
  },
  goat: {
    element: "Earth",
    traits: ["Creative", "Gentle", "Compassionate", "Artistic"],
    strengths: ["Creativity", "Empathy", "Artistic talent", "Kindness"],
    weaknesses: ["Indecisive", "Pessimistic", "Worrisome", "Overly dependent"],
    compatibility: ["Rabbit", "Horse", "Pig"],
    description: "The Goat is the eighth animal in the Chinese zodiac. People born in the Year of the Goat are creative, gentle, and deeply compassionate. They see beauty where others don't.",
    career: "Goats thrive in creative and helping professions. They excel in art, music, design, counseling, and education. Their empathy and creativity are their greatest assets.",
    love: "In relationships, Goats are tender, caring partners who create beautiful homes. They need reassurance and emotional security. They give love generously when they feel safe.",
    health: "Goats should focus on mental health and stress reduction. Creative expression and time in nature are essential for their wellbeing.",
  },
  monkey: {
    element: "Metal",
    traits: ["Witty", "Innovative", "Playful", "Intelligent"],
    strengths: ["Brilliance", "Innovation", "Versatility", "Humor"],
    weaknesses: ["Mischievous", "Arrogant", "Manipulative", "Restless"],
    compatibility: ["Rat", "Dragon", "Snake"],
    description: "The Monkey is the ninth animal in the Chinese zodiac. People born in the Year of the Monkey are brilliant, innovative, and endlessly entertaining. They have a natural curiosity that drives them to excel.",
    career: "Monkeys excel in roles that require creativity and problem-solving. They thrive in technology, finance, media, and entrepreneurship. Their adaptability makes them valuable in any field.",
    love: "In relationships, Monkeys are charming and fun-loving partners. They keep relationships exciting with their wit and creativity. They need a partner who can keep up with their active mind.",
    health: "Monkeys have strong vitality but need to avoid overexertion. Regular exercise and mental stimulation are key to their wellbeing.",
  },
  rooster: {
    element: "Metal",
    traits: ["Observant", "Hardworking", "Courageous", "Talented"],
    strengths: ["Precision", "Reliability", "Honesty", "Organization"],
    weaknesses: ["Critical", "Boastful", "Opinionated", "Perfectionist"],
    compatibility: ["Ox", "Snake", "Dragon"],
    description: "The Rooster is the tenth animal in the Chinese zodiac. People born in the Year of the Rooster are observant, hardworking, and incredibly talented. They set high standards for themselves and others.",
    career: "Roosters excel in roles that require precision and organization. They thrive in management, journalism, medicine, and the military. Their attention to detail makes them exceptional professionals.",
    love: "In relationships, Roosters are loyal and devoted partners. They may be critical at times, but their intentions come from a place of care. They seek partners who share their values and standards.",
    health: "Roosters should pay attention to their respiratory and digestive health. Regular check-ups and a balanced lifestyle help maintain their wellbeing.",
  },
  dog: {
    element: "Earth",
    traits: ["Loyal", "Honest", "Kind", "Reliable"],
    strengths: ["Loyalty", "Integrity", "Compassion", "Protective nature"],
    weaknesses: ["Anxious", "Stubborn", "Critical", "Pessimistic"],
    compatibility: ["Tiger", "Rabbit", "Horse"],
    description: "The Dog is the eleventh animal in the Chinese zodiac. People born in the Year of the Dog are loyal, honest, and deeply principled. They stand up for what's right and protect those they love.",
    career: "Dogs excel in roles that require integrity and service. They thrive in law, social work, healthcare, education, and any field where they can make a difference.",
    love: "In relationships, Dogs are faithful and devoted partners. They value trust and honesty above all else. Once committed, they are loyal for life.",
    health: "Dogs should manage their tendency toward anxiety and worry. Regular exercise, a healthy diet, and stress-relief practices are essential.",
  },
  pig: {
    element: "Water",
    traits: ["Compassionate", "Generous", "Diligent", "Easygoing"],
    strengths: ["Generosity", "Patience", "Dependability", "Good nature"],
    weaknesses: ["Naive", "Overindulgent", "Materialistic", "Self-pitying"],
    compatibility: ["Goat", "Rabbit", "Tiger"],
    description: "The Pig is the twelfth and final animal in the Chinese zodiac cycle. People born in the Year of the Pig are generous, compassionate, and remarkably easygoing. They enjoy life's pleasures and share them freely.",
    career: "Pigs excel in creative and helping professions. They thrive in the arts, entertainment, hospitality, and philanthropy. Their generous nature makes them beloved colleagues.",
    love: "In relationships, Pigs are devoted and affectionate partners. They give generously and expect the same in return. They create warm, comfortable homes filled with love.",
    health: "Pigs should watch their diet and maintain regular exercise routines. They have a tendency to overindulge, so moderation is key to their health.",
  },
};

export function generateStaticParams() {
  return CHINESE_ZODIAC_SIGNS.map((sign) => ({
    slug: sign.key,
  }));
}

export default async function ZodiacDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sign = CHINESE_ZODIAC_SIGNS.find((s) => s.key === slug);
  const content = ZODIAC_CONTENT[slug];

  if (!sign || !content) {
    notFound();
  }

  const elementColors: Record<string, string> = {
    Wood: "bg-green-100 text-green-700",
    Fire: "bg-red-100 text-red-700",
    Earth: "bg-amber-100 text-amber-700",
    Metal: "bg-gray-100 text-gray-700",
    Water: "bg-blue-100 text-blue-700",
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Zodiac", href: "/zodiac" },
    { label: sign.animal },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />
      <Link href="/zodiac" className="mb-2 block text-xs text-zinc-400 hover:text-zinc-600">
        ← All Zodiac Signs
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{sign.animal}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${elementColors[content.element] || "bg-zinc-100 text-zinc-600"}`}>
            Element: {content.element}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">{content.description}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-green-600">Strengths</h2>
            <ul className="mt-2 space-y-1">
              {content.strengths.map((s) => (
                <li key={s} className="text-sm text-zinc-600">✦ {s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-red-500">Weaknesses</h2>
            <ul className="mt-2 space-y-1">
              {content.weaknesses.map((w) => (
                <li key={w} className="text-sm text-zinc-600">✦ {w}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-semibold">Career</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">{content.career}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Love & Relationships</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">{content.love}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Health</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">{content.health}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Best Matches</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {content.compatibility.map((c) => (
              <Link
                key={c}
                href={`/zodiac/${c.toLowerCase()}`}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
              >
                {c}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Learn More */}
      <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Learn More About {sign.animal}</h2>
        <div className="flex flex-wrap gap-2">
          <Link href={`/zodiac/${slug}/compatibility`} className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            {sign.animal} Compatibility
          </Link>
          <Link href={`/zodiac/2026/${slug}`} className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            2026 Horoscope
          </Link>
          <Link href="/zodiac/compatibility" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            Compatibility Guide
          </Link>
          <Link href="/five-elements" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            Five Elements
          </Link>
          <Link href="/birth-year" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            Birth Year Guide
          </Link>
          <Link href="/bazi" className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
            Get Ba Zi Reading
          </Link>
        </div>
      </div>

      {/* Ad placement */}
      <div className="mt-10">
        <AdSlot format="banner" />
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 text-center">
        <p className="mb-3 text-xs text-zinc-400">For entertainment purposes only</p>
        <Link href="/bazi">
          <Button>Get Your Full Ba Zi Reading</Button>
        </Link>
      </div>
    </div>
  );
}
