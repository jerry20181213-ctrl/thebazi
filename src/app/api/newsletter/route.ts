import { NextRequest, NextResponse } from "next/server";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { isRateLimited, rateLimitHeaders, getIp } from "@/lib/rate-limiter";
import { sendWelcomeEmail } from "@/lib/email";

const DATA_DIR = join(process.cwd(), ".data", "newsletter");

interface Subscriber {
  email: string;
  source: string;
  locale: string;
  subscribedAt: string;
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

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }

    // Check for duplicates
    const subscribersPath = join(DATA_DIR, "subscribers.jsonl");
    let isDuplicate = false;
    if (existsSync(subscribersPath)) {
      const existing = readFileSync(subscribersPath, "utf-8");
      const lines = existing.split("\n").filter(Boolean);
      isDuplicate = lines.some((line) => {
        try {
          const sub = JSON.parse(line);
          return sub.email === email;
        } catch {
          return false;
        }
      });
    }

    // Persist to local file (audit trail / backup)
    if (!isDuplicate) {
      const subscriber: Subscriber = {
        email,
        source: source || "unknown",
        locale: locale || "en",
        subscribedAt: new Date().toISOString(),
      };
      writeFileSync(subscribersPath, JSON.stringify(subscriber) + "\n", { flag: "a" });
    }

    // Send welcome email via Resend
    // Fire-and-forget: don't block the response if the email fails
    try {
      await sendWelcomeEmail({ to: email, locale: locale || "en" });
    } catch (emailErr) {
      // Log and continue — the subscription itself succeeded
      console.error("[newsletter] Welcome email failed:", emailErr);
    }

    return NextResponse.json({
      message: isDuplicate
        ? "Already subscribed"
        : "Subscribed successfully",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
