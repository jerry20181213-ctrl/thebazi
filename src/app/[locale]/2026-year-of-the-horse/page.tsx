import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "2026丙午馬年 — 八字運勢分析與預測" : "2026 Year of the Horse — Ba Zi Forecast & Predictions",
    description: isZh
      ? "2026年是丙午火馬年。了解這一年對你意味著什麼，查看十二生肖運勢預測，以及如何利用這強大年份的能量。"
      : "Discover what 2026 — the Year of the Fire Horse (丙午) — means for you. Ba Zi analysis of the year's energy, predictions for each zodiac sign, and tips for making the most of this powerful year.",
    openGraph: {
      title: isZh ? "2026馬年 — 八字運勢分析" : "2026 Year of the Horse — Ba Zi Forecast",
      description: isZh ? "2026火馬年完整運勢分析。這強大的一年對你的生肖意味著什麼。" : "Complete 2026 Year of the Fire Horse forecast. What this powerful year means for your zodiac sign.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "2026 Year of the Fire Horse" }],
    },
  };
}

const HOROSCOPE: Record<string, { rating: number; prediction: string }> = {
  rat: { rating: 4, prediction: "A promising year for Rats! The Horse is your secret friend, bringing unexpected alliances and opportunities. Your quick wit will help you navigate the strong Fire energy. Focus on networking and creative projects. Romantic prospects look bright." },
  ox: { rating: 3, prediction: "A steady year for the Ox. The Horse creates a productive tension that can fuel your ambitions. Career progress is possible, but avoid pushing too hard in relationships. Take care of your health — the Fire energy may feel overwhelming at times." },
  tiger: { rating: 5, prediction: "An exceptional year — the Horse is your closest ally in the zodiac. Everything flows in your favor. This is your year to take bold action, start new ventures, and expand your horizons. Travel and education are especially favored." },
  rabbit: { rating: 2, prediction: "A year that calls for caution, dear Rabbit. The Fire Horse energy creates friction with your gentle nature. Avoid major decisions in the first half of the year. Focus on self-care and maintaining harmony at home. Better opportunities come in autumn." },
  dragon: { rating: 4, prediction: "An exciting year for Dragons! The Horse's Fire ignites your natural charisma. Leadership opportunities abound. Your creativity is at a peak — channel it into work and personal projects. Love life sizzles, but avoid jealousy." },
  snake: { rating: 3, prediction: "A year of transformation. The Horse energy stirs things up for the Snake, pushing you out of your comfort zone. Embrace change rather than resisting it. Your wisdom will guide you through any challenges. Financial opportunities arise mid-year." },
  horse: { rating: 4, prediction: "Your year, Horse! But with the Fire element doubled, there's a risk of burning out. Channel your abundant energy into meaningful projects. Lead with confidence but temper your impulsiveness. Relationships flourish when you remember to listen." },
  goat: { rating: 2, prediction: "A challenging but growth-filled year. The Horse creates some turbulence for the Goat. Take things slowly and don't overextend yourself. Creative pursuits provide solace. Lean on trusted friends and family for support." },
  monkey: { rating: 3, prediction: "A mixed but opportunities-rich year. The Horse's Fire sharpens your already quick mind. Great for innovation and problem-solving. Be careful with finances — not every opportunity is what it seems. Romance brings pleasant surprises." },
  rooster: { rating: 3, prediction: "A year of dynamic tension between your precision and the Horse's impulsive energy. Use your discipline to harness this Fire productively. Career advancement is possible if you stay focused. Health needs attention — pace yourself." },
  dog: { rating: 4, prediction: "A harmonious year for the Dog! The Horse creates a supportive energy that brings stability and growth. Your loyalty is rewarded. Deepen relationships and pursue long-term goals. A good year for home and family matters." },
  pig: { rating: 3, prediction: "A year of unexpected opportunities. The Horse energy brings excitement and some unpredictability. Stay open to new experiences while maintaining your grounding. Financial luck is favorable in the second half of the year." },
};

export default function Year2026Page() {
  const signs = [
    { key: "rat", animal: "Rat", emoji: "🐀" },
    { key: "ox", animal: "Ox", emoji: "🐂" },
    { key: "tiger", animal: "Tiger", emoji: "🐅" },
    { key: "rabbit", animal: "Rabbit", emoji: "🐇" },
    { key: "dragon", animal: "Dragon", emoji: "🐉" },
    { key: "snake", animal: "Snake", emoji: "🐍" },
    { key: "horse", animal: "Horse", emoji: "🐎" },
    { key: "goat", animal: "Goat", emoji: "🐐" },
    { key: "monkey", animal: "Monkey", emoji: "🐒" },
    { key: "rooster", animal: "Rooster", emoji: "🐓" },
    { key: "dog", animal: "Dog", emoji: "🐕" },
    { key: "pig", animal: "Pig", emoji: "🐖" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-red-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block" aria-hidden="true">🐎</span>
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">2026: Year of the Fire Horse</h1>
          <p className="text-xl text-red-600 font-medium mb-4">丙午 (Bing Wu) — Yang Fire on Yang Horse</p>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-3xl mx-auto">
            February 17, 2026 to February 5, 2027. The Fire Horse appears once every 60 years — a year of
            intense passion, dramatic change, and extraordinary potential. The combination of Yang Fire
            (丙) and Yang Fire (午) creates twice the heat: a year that demands bold action, authentic
            expression, and fearless leadership.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-2">The Energy of 2026</h2>
          <div className="prose prose-zinc max-w-none mb-8">
            <p>
              The Fire Horse year is one of the most powerful and dynamic years in the Chinese calendar.
              Fire represents passion, visibility, and transformation. Horse represents freedom, speed,
              and adventure. Together, they create a year where:
            </p>
            <ul>
              <li><strong>Bold action is rewarded</strong> — hesitation and indecision are the biggest risks</li>
              <li><strong>Authenticity matters</strong> — pretense and hiding will be exposed by the Fire energy</li>
              <li><strong>Change accelerates</strong> — what takes ten years may happen in months</li>
              <li><strong>Passion ignites</strong> — both in romance and in creative pursuits</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Zodiac Predictions for 2026</h2>
          <div className="grid gap-4">
            {signs.map((sign) => {
              const h = HOROSCOPE[sign.key];
              if (!h) return null;
              return (
                <div key={sign.key} className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl" aria-hidden="true">{sign.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Link href={`/zodiac/${sign.key}`} className="text-lg font-semibold text-zinc-900 hover:text-red-600 transition-colors">
                          {sign.animal}
                        </Link>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-sm ${star <= h.rating ? "text-red-500" : "text-zinc-200"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600">{h.prediction}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">How to Make the Most of 2026</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-800 mb-2">✓ Do</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>Take bold action on long-held dreams</li>
                <li>Lead with authenticity and transparency</li>
                <li>Travel and explore new horizons</li>
                <li>Express yourself creatively</li>
                <li>Build your public presence and reputation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="font-semibold text-red-800 mb-2">✗ Avoid</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>Hesitating when opportunities arise</li>
                <li>Overcommitting and burning out</li>
                <li>Suppressing your true feelings</li>
                <li>Making decisions based on fear</li>
                <li>Ignoring your health and rest needs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Discover Your Personal 2026 Forecast</h2>
          <p className="text-zinc-300 mb-6">
            Your Ba Zi chart reveals how the Fire Horse year specifically affects <em>you</em>.
            Generate your personalized reading to see which areas of life are most energized — and
            where to exercise caution.
          </p>
          <Link
            href="/bazi"
            className="inline-block rounded-lg bg-white text-zinc-900 px-8 py-3 font-medium hover:bg-zinc-100 transition-colors"
          >
            Get Your Ba Zi Reading
          </Link>
        </div>
      </section>
    </div>
  );
}
