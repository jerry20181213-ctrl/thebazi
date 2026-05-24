"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BaziForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    year: "1990",
    month: "1",
    day: "1",
    hour: "12",
    minute: "0",
    gender: "male" as "male" | "female",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = ["0", "15", "30", "45"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({
      year: form.year,
      month: form.month,
      day: form.day,
      hour: form.hour,
      minute: form.minute,
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="hour">Hour (0-23)</Label>
              <select
                id="hour"
                value={form.hour}
                onChange={(e) => setForm({ ...form, hour: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                required
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{String(h).padStart(2, "0")}:00</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="minute">Minute</Label>
              <select
                id="minute"
                value={form.minute}
                onChange={(e) => setForm({ ...form, minute: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                required
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
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
