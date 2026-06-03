import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

interface ReadingRecord {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: "male" | "female";
  code: string;
  createdAt: string;
}

/** Writable storage directory — /tmp on Vercel, .data/ in dev. */
function dataDir(): string {
  return process.env.NODE_ENV === "production"
    ? "/tmp/readings"
    : join(process.cwd(), ".data", "readings");
}

// ─── In-memory store (shared between save + get via module-level state) ──
// This Map is populated by the POST (save) endpoint and read by this GET
// endpoint.  Because both routes live in the same Next.js process they share
// the module cache, so a save → immediate-get works even without filesystem.
declare global {
  // eslint-disable-next-line no-var
  var __readingStore: Map<string, ReadingRecord> | undefined;
}
function getStore(): Map<string, ReadingRecord> {
  if (!globalThis.__readingStore) globalThis.__readingStore = new Map();
  return globalThis.__readingStore;
}

function load(code: string): ReadingRecord | null {
  // 1. Check in-memory store (warm instance)
  const fromMem = getStore().get(code);
  if (fromMem) return fromMem;

  // 2. Check filesystem (/tmp or .data/)
  try {
    const { existsSync, readFileSync } = require("fs") as typeof import("fs");
    const filePath = join(dataDir(), `${code}.json`);
    if (!existsSync(filePath)) return null;
    const record: ReadingRecord = JSON.parse(readFileSync(filePath, "utf-8"));
    // prime the memory store for next time
    getStore().set(code, record);
    return record;
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!code || code.length < 4) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const record = load(code);
  if (!record) {
    return NextResponse.json({ error: "Reading not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
