import { NextRequest, NextResponse } from "next/server";
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

/** Writable storage directory — /tmp on Vercel, .data/ in dev. */
function dataDir(): string {
  return process.env.NODE_ENV === "production"
    ? "/tmp/readings"
    : join(process.cwd(), ".data", "readings");
}
import { join } from "path";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ─── In-memory fallback (for when filesystem is unavailable) ────────
const memStore = new Map<string, ReadingData & { code: string }>();

function persist(code: string, record: ReadingData & { code: string }) {
  memStore.set(code, record);
  try {
    const { existsSync, mkdirSync, writeFileSync } =
      require("fs") as typeof import("fs");
    const dir = dataDir();
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${code}.json`), JSON.stringify(record, null, 2));
  } catch {
    // best-effort — in-memory works for current instance
  }
}

function load(code: string): (ReadingData & { code: string }) | null {
  const fromMem = memStore.get(code);
  if (fromMem) return fromMem;
  try {
    const { existsSync, readFileSync } = require("fs") as typeof import("fs");
    const filePath = join(dataDir(), `${code}.json`);
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
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

    // Generate unique code (collision retry with memStore check)
    let code = generateCode();
    if (load(code)) code = generateCode();

    const record = {
      ...body,
      code,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    persist(code, record);

    return NextResponse.json({ code, url: `/m/${code}` });
  } catch (error) {
    console.error("Save reading error:", error);
    return NextResponse.json({ error: "Failed to save reading" }, { status: 500 });
  }
}
