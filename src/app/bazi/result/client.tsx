"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { calculateBaZi } from "@/lib/bazi-engine";
import { generateTemplateReading } from "@/lib/ai";
import BaziChart from "@/components/BaziChart";
import ReportView from "@/components/ReportView";

export default function BaziResultClient() {
  const searchParams = useSearchParams();

  const { result, reading } = useMemo(() => {
    const year = parseInt(searchParams.get("year") || "1990");
    const month = parseInt(searchParams.get("month") || "1");
    const day = parseInt(searchParams.get("day") || "1");
    const hour = parseInt(searchParams.get("hour") || "12");
    const minute = parseInt(searchParams.get("minute") || "0");
    const gender = (searchParams.get("gender") || "male") as "male" | "female";

    if (!year || !month || !day) {
      return { result: null, reading: "Please provide valid birth details." };
    }

    const result = calculateBaZi({ year, month, day, hour, minute, gender });
    const reading = generateTemplateReading(result);
    return { result, reading };
  }, [searchParams]);

  if (!result) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Invalid birth details. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BaziChart result={result} />
      <ReportView result={result} initialReading={reading} />
    </div>
  );
}
