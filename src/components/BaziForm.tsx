"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Chinese time periods (时辰) — each is a 2-hour window
const SHICHEN = [
  { id: "zi", label: "子时 Zi", range: "23:00–00:59", hour: 23, minute: 30 },
  { id: "chou", label: "丑时 Chou", range: "01:00–02:59", hour: 1, minute: 30 },
  { id: "yin", label: "寅时 Yin", range: "03:00–04:59", hour: 3, minute: 30 },
  { id: "mao", label: "卯时 Mao", range: "05:00–06:59", hour: 5, minute: 30 },
  { id: "chen", label: "辰时 Chen", range: "07:00–08:59", hour: 7, minute: 30 },
  { id: "si", label: "巳时 Si", range: "09:00–10:59", hour: 9, minute: 30 },
  { id: "wu", label: "午时 Wu", range: "11:00–12:59", hour: 11, minute: 30 },
  { id: "wei", label: "未时 Wei", range: "13:00–14:59", hour: 13, minute: 30 },
  { id: "shen", label: "申时 Shen", range: "15:00–16:59", hour: 15, minute: 30 },
  { id: "you", label: "酉时 You", range: "17:00–18:59", hour: 17, minute: 30 },
  { id: "xu", label: "戌时 Xu", range: "19:00–20:59", hour: 19, minute: 30 },
  { id: "hai", label: "亥时 Hai", range: "21:00–22:59", hour: 21, minute: 30 },
];

export default function BaziForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    year: "1990",
    month: "1",
    day: "1",
    shichen: "wu", // default to 午时 (11:00-12:59)
    gender: "male" as "male" | "female",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const period = SHICHEN.find((s) => s.id === form.shichen) || SHICHEN[6];
    const params = new URLSearchParams({
      year: form.year,
      month: form.month,
      day: form.day,
      hour: String(period.hour),
      minute: String(period.minute),
      gender: form.gender,
    });
    router.push(`/bazi/result?${params.toString()}`);
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Your Birth Details</CardTitle>
        <CardDescription>
          Enter your date and time of birth to generate your personalized Ba Zi chart.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <select
                id="year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                required
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <select
                id="month"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                required
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <select
                id="day"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                required
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time of Birth (时辰)</Label>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
              {SHICHEN.map((period) => (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setForm({ ...form, shichen: period.id })}
                  className={`rounded-lg border py-2 text-xs font-medium transition-colors ${
                    form.shichen === period.id
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                  title={period.range}
                >
                  <div>{period.label.split(" ")[1]}</div>
                  <div className="text-[10px] opacity-60">{period.range}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, gender: "male" })}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                  form.gender === "male"
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Male ♂
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, gender: "female" })}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                  form.gender === "female"
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Female ♀
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            {loading ? "Calculating..." : "Generate Your Ba Zi Chart"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
