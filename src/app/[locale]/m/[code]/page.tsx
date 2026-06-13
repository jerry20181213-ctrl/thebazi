import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { calculateBaZi } from "@/lib/bazi-engine";
import { generateTemplateReading } from "@/lib/ai";
import { CHINESE_ZODIAC_SIGNS } from "@/lib/constants";
import BaziChart from "@/components/BaziChart";
import { getLocaleInfo } from "@/lib/locale-utils";
import TrackSharedReadingView from "@/components/TrackSharedReadingView";
import { getCanonicalUrl } from "@/lib/canonical-url";

interface Props {
  params: Promise<{ locale: string; code: string }>;
}

const DATA_DIR = join(process.cwd(), ".data", "readings");

interface SavedReading {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: "male" | "female";
  createdAt: string;
}

function getReading(code: string): SavedReading | null {
  const filePath = join(DATA_DIR, `${code}.json`);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, code } = await params;
  const saved = getReading(code);
  if (!saved) return { title: "Reading Not Found" };

  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "m", code),
    },
    title: "Shared Ba Zi Reading",
    description: `A shared Ba Zi reading for someone born in ${saved.year}.`,
    robots: { index: false, follow: false },
  };
}

export default async function SharedReadingPage({ params }: Props) {
  const { locale, code } = await params;
  const { isZh, isJa } = getLocaleInfo(locale);

  const saved = getReading(code);
  if (!saved) notFound();

  const result = calculateBaZi({
    year: saved.year,
    month: saved.month,
    day: saved.day,
    hour: saved.hour,
    minute: saved.minute,
    gender: saved.gender,
  });

  const reading = generateTemplateReading(result);

  const animalSign = CHINESE_ZODIAC_SIGNS.find(
    (s) => s.animal.toLowerCase() === result.zodiacAnimal.toLowerCase()
  );

  const chartUrl = `/bazi/result?year=${saved.year}&month=${saved.month}&day=${saved.day}&hour=${saved.hour}&minute=${saved.minute}&gender=${saved.gender}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-6 text-center">
        <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
          {isZh ? "共享命盤" : isJa ? "共有された命式" : "Shared Reading"}
        </span>
      </div>

      <TrackSharedReadingView animal={result.zodiacAnimal} locale={locale} />
      <BaziChart result={result} />

      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-zinc-400">{isZh ? "性別" : isJa ? "性別" : "Gender"}</span>
            <p className="mt-0.5 font-medium text-zinc-700 capitalize">{saved.gender}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-400">{isZh ? "出生日期" : isJa ? "生年月日" : "Birth Date"}</span>
            <p className="mt-0.5 font-medium text-zinc-700">
              {saved.year}-{String(saved.month).padStart(2, "0")}-{String(saved.day).padStart(2, "0")}
              {saved.hour !== undefined && ` ${String(saved.hour).padStart(2, "0")}:${String(saved.minute ?? 0).padStart(2, "0")}`}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <p className="text-xs text-zinc-400">{isZh ? "日主" : isJa ? "日主" : "Day Master"}</p>
            <p className="text-lg font-bold text-zinc-800">{result.dayPillar.stem}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">{isZh ? "生肖" : isJa ? "生肖" : "Zodiac"}</p>
            <p className="text-lg font-bold text-zinc-800">{result.zodiacAnimal}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">{isZh ? "五行" : isJa ? "五行" : "Element"}</p>
            <p className="text-lg font-bold text-zinc-800">{result.dayMasterElement}</p>
          </div>
        </div>
      </div>

      {/* Reading excerpt */}
      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="mb-2 text-sm font-semibold">
          {isZh ? "命理解讀" : isJa ? "四柱推命 鑑定結果" : "Ba Zi Reading"}
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-6">
          {reading}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-500 mb-3">
          {isZh ? "想獲得完整解讀？" : isJa ? "完全な鑑定を受けてみませんか？" : "Want your own full reading?"}
        </p>
        <Link
          href={chartUrl}
          className="inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          {isZh ? "免費排盤 →" : isJa ? "無料で鑑定する →" : "Get Your Free Reading →"}
        </Link>
      </div>

      {animalSign && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            href={`/zodiac/${animalSign.key}/compatibility`}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-500 hover:bg-zinc-50 transition-colors"
          >
            {isZh ? `${result.zodiacAnimal} 配對` : isJa ? `${result.zodiacAnimal} 相性` : `${result.zodiacAnimal} Compatibility`}
          </Link>
          <Link
            href={`/zodiac/${animalSign.key}/2026`}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-500 hover:bg-zinc-50 transition-colors"
          >
            {isZh ? `2026 年 ${result.zodiacAnimal} 運勢` : isJa ? `${result.zodiacAnimal} 2026年運勢` : `${result.zodiacAnimal} 2026 Horoscope`}
          </Link>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href={chartUrl}
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          ← {isZh ? "返回完整命盤" : isJa ? "完全な命式に戻る" : "View Full Chart"}
        </Link>
      </div>
    </div>
  );
}
