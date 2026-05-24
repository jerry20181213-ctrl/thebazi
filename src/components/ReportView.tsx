"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BaZiResult } from "@/lib/bazi-engine";

interface ReportViewProps {
  result: BaZiResult;
  initialReading: string;
}

export default function ReportView({ result, initialReading }: ReportViewProps) {
  const [reading, setReading] = useState(initialReading);
  const [generating, setGenerating] = useState(false);

  async function regenerate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      const data = await res.json();
      if (data.reading) setReading(data.reading);
    } catch {
      // keep current reading on error
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Lucky Info */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Lucky Colors", value: result.luckyColors },
          { label: "Lucky Directions", value: result.luckyDirections },
          { label: "Lucky Numbers", value: result.luckyNumbers },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 text-center">
              <span className="text-xs text-zinc-400">{item.label}</span>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Reading */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Your Personal Reading</CardTitle>
          <Button variant="outline" size="sm" onClick={regenerate} disabled={generating}>
            {generating ? "Generating..." : "Regenerate"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="prose prose-zinc max-w-none text-sm leading-relaxed whitespace-pre-line">
            {reading}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-zinc-400 text-center">
        This reading is for entertainment purposes only. It does not constitute
        financial, medical, or legal advice.
      </p>
    </div>
  );
}
