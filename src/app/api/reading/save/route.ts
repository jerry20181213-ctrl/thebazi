import { NextRequest, NextResponse } from "next/server";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { isRateLimited, rateLimitHeaders, getIp } from "@/lib/rate-limiter";

interface ReadingData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: "male" | "female";
  createdAt: string;
}

const DATA_DIR = join(process.cwd(), ".data", "readings");

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    if (isRateLimited(ip, { max: 5, windowMs: 60_000 })) {
      return NextResponse.json({ error: "Too many requests" }, {
        status: 429,
        headers: rateLimitHeaders(ip, { max: 5, windowMs: 60_000 }),
      });
    }

    const body: ReadingData = await request.json();
    if (!body.year || !body.month || !body.day) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }

    // Generate unique code (retry on collision)
    let code = generateCode();
    const existing = existsSync(join(DATA_DIR, `${code}.json`));
    if (existing) {
      code = generateCode(); // simple retry
    }

    const record = {
      ...body,
      code,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    writeFileSync(join(DATA_DIR, `${code}.json`), JSON.stringify(record, null, 2));

    return NextResponse.json({ code, url: `/m/${code}` });
  } catch (error) {
    console.error("Save reading error:", error);
    return NextResponse.json({ error: "Failed to save reading" }, { status: 500 });
  }
}
