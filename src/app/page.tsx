import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <div className="mb-4 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            Ancient Wisdom ✦ Modern AI
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover Your
            <span className="text-zinc-500"> Destiny</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 sm:text-lg">
            Calculate your Ba Zi (Four Pillars of Destiny) chart and receive a
            personalized AI-powered reading based on 2,000+ years of Chinese
            metaphysical wisdom.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/bazi">
              <Button size="lg">Get Your Free Reading</Button>
            </Link>
            <Link href="/zodiac">
              <Button variant="outline" size="lg">Explore Chinese Zodiac</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: "Enter Your Birth Details", desc: "Share your date, time, and place of birth. This is all we need to calculate your unique destiny chart." },
              { step: "02", title: "AI Analyzes Your Chart", desc: "Our engine maps your Four Pillars — the cosmic blueprint that reveals your innate strengths, challenges, and life path." },
              { step: "03", title: "Get Your Personal Reading", desc: "Receive a detailed, encouraging reading with insights about your career, relationships, and personal growth." },
            ].map((item) => (
              <Card key={item.step}>
                <CardContent className="p-6">
                  <span className="text-3xl font-bold text-zinc-200">{item.step}</span>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ba Zi Preview */}
      <section className="border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What is Ba Zi?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Ba Zi (八字), also known as the Four Pillars of Destiny, is an ancient
                Chinese system that maps your life&apos;s blueprint using your birth
                moment. It reveals the unique interplay of the five elements — Wood,
                Fire, Earth, Metal, and Water — that shape your personality,
                strengths, and life journey.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Unlike Western astrology which focuses on star positions, Ba Zi is
                based on the Chinese calendar and the 60-year cycle of Heavenly
                Stems and Earthly Branches.
              </p>
              <Link href="/bazi">
                <Button className="mt-6">Calculate Your Chart</Button>
              </Link>
            </div>
            <div className="rounded-xl bg-zinc-50 p-6 text-center">
              <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                {["Year", "Month", "Day", "Hour"].map((label) => (
                  <div key={label} className="text-xs text-zinc-400">{label}</div>
                ))}
                {["甲子", "丙寅", "戊辰", "壬申"].map((p, i) => (
                  <div key={i} className="rounded-lg bg-white p-3 text-lg font-bold shadow-sm">
                    {p}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-zinc-400">Example Ba Zi Chart</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Preview */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Your Chinese Zodiac Animal</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-500">
            Each year is associated with one of 12 animals. Discover what yours says about you.
          </p>
          <div className="mt-8 grid grid-cols-6 gap-3 text-sm font-medium">
            {["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"].map((animal) => (
              <Link
                key={animal}
                href={`/zodiac/${animal.toLowerCase()}`}
                className="rounded-lg border border-zinc-200 p-3 text-xs transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              >
                {animal}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-6">
        <p className="mx-auto max-w-2xl px-4 text-center text-xs text-zinc-400">
          All readings are for entertainment purposes only. Ba Zi is a tool for
          self-reflection and personal insight, not a substitute for professional
          advice. By using this site, you agree to our terms.
        </p>
      </section>
    </div>
  );
}
