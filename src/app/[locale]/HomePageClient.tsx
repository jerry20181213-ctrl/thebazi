"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdSlot from "@/components/AdSlot";

const ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

export default function HomePageClient() {
  const t = useTranslations("home");
  const site = useTranslations("site");

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <div className="mb-4 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            {t("badge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t("title")}
            <span className="text-zinc-500"> {t("titleHighlight")}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/bazi">
              <Button size="lg">{t("ctaReading")}</Button>
            </Link>
            <Link href="/zodiac">
              <Button variant="outline" size="lg">{t("ctaZodiac")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">{t("howItWorks")}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: t("step1Title"), desc: t("step1Desc") },
              { step: "02", title: t("step2Title"), desc: t("step2Desc") },
              { step: "03", title: t("step3Title"), desc: t("step3Desc") },
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

      {/* Ad placement */}
      <div className="border-b border-zinc-200 py-8">
        <AdSlot format="banner" />
      </div>

      {/* Ba Zi Preview */}
      <section className="border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("whatIsBazi")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {t("whatIsBaziDesc1")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {t("whatIsBaziDesc2")}
              </p>
              <Link href="/bazi">
                <Button className="mt-6">{t("calcChart")}</Button>
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
              <p className="mt-4 text-xs text-zinc-400">{t("exampleChart")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Preview */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{t("zodiacTitle")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-500">
            {t("zodiacSubtitle")}
          </p>
          <div className="mt-8 grid grid-cols-6 gap-3 text-sm font-medium">
            {ANIMALS.map((animal) => (
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
          {t("disclaimer")}
        </p>
      </section>
    </div>
  );
}
