import { Card, CardContent } from "@/components/ui/card";
import type { BaZiResult } from "@/lib/bazi-engine";

interface BaziChartProps {
  result: BaZiResult;
}

const PILLAR_LABELS = ["Year", "Month", "Day", "Hour"];

export default function BaziChart({ result }: BaziChartProps) {
  const pillars = [result.yearPillar, result.monthPillar, result.dayPillar, result.hourPillar];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Your Four Pillars (四柱)
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="mb-2 text-xs font-medium text-zinc-400">{PILLAR_LABELS[i]}</span>
              <div
                className="flex h-12 w-full items-center justify-center rounded-t-lg text-lg font-bold text-white"
                style={{ backgroundColor: pillar.stemColor }}
              >
                {pillar.stem}
              </div>
              <div
                className="flex h-12 w-full items-center justify-center rounded-b-lg text-lg font-bold text-white"
                style={{ backgroundColor: pillar.branchColor }}
              >
                {pillar.branch}
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[10px] text-zinc-400">{pillar.stemElement}</span>
                <span className="mx-1 text-[10px] text-zinc-300">/</span>
                <span className="text-[10px] text-zinc-400">{pillar.branchElement}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-zinc-50 p-3">
            <span className="text-xs text-zinc-400">Day Master</span>
            <p className="mt-0.5 font-semibold">{result.dayMaster} ({result.dayMasterElement})</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3">
            <span className="text-xs text-zinc-400">Zodiac Animal</span>
            <p className="mt-0.5 font-semibold">{result.zodiacAnimal}</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3">
            <span className="text-xs text-zinc-400">Tai Yuan</span>
            <p className="mt-0.5 font-semibold">{result.taiYuan}</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3">
            <span className="text-xs text-zinc-400">Ming Gong</span>
            <p className="mt-0.5 font-semibold">{result.mingGong}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-zinc-50 p-3">
          <span className="text-xs text-zinc-400">Five Elements</span>
          <p className="mt-0.5 text-sm">{result.fiveElements}</p>
          {result.missingElements.length > 0 && (
            <p className="mt-1 text-xs text-amber-600">
              Missing: {result.missingElements.join(", ")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
