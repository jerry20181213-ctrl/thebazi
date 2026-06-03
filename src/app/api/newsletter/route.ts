import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, rateLimitHeaders, getIp } from "@/lib/rate-limiter";
import { sendWelcomeEmail } from "@/lib/email";

/**
 * Log a subscriber to disk as an audit trail.
 *
 * Vercel serverless functions have a read-only filesystem (except /tmp),
 * so this is a no-op in production.  In development the JSONL file serves
 * as a local backup.
 */
function persistToDisk(email: string, source: string, locale: string) {
  if (process.env.NODE_ENV === "production") return;
  try {
    const { existsSync, mkdirSync, writeFileSync } = require("fs") as typeof import("fs");
    const { join } = require("path");
    const dir = join(process.cwd(), ".data", "newsletter");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "subscribers.jsonl"),
      JSON.stringify({ email, source, locale, subscribedAt: new Date().toISOString() }) + "\n",
      { flag: "a" },
    );
  } catch {
    // Best-effort only — never block signup on disk I/O
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    if (isRateLimited(ip, { max: 3, windowMs: 60_000 })) {
      return NextResponse.json({ error: "Too many requests" }, {
        status: 429,
        headers: rateLimitHeaders(ip, { max: 3, windowMs: 60_000 }),
      });
    }

    const { email, source, locale } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Local backup (dev only)
    persistToDisk(email, source || "unknown", locale || "en");

    // Send welcome email via Resend
    await sendWelcomeEmail({ to: email, locale: locale || "en" });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
