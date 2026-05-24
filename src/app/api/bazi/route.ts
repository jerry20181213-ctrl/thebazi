import { NextRequest } from "next/server";
import { generateReading } from "@/lib/ai";
import type { BaZiResult } from "@/lib/bazi-engine";

export async function POST(request: NextRequest) {
  try {
    const result: BaZiResult = await request.json();
    const reading = await generateReading(result);
    return Response.json({ reading });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Failed to generate reading. Please try again." },
      { status: 500 }
    );
  }
}
