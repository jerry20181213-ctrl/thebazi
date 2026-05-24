import { Suspense } from "react";
import type { Metadata } from "next";
import BaziResultClient from "./client";

export const metadata: Metadata = {
  title: "Your Ba Zi Reading",
  description: "Your personalized Ba Zi (Four Pillars of Destiny) reading with AI-powered insights.",
};

export default function BaziResultPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your Ba Zi Reading
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Your personalized destiny chart, powered by ancient wisdom and AI.
        </p>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-zinc-400">Loading your reading...</div>}>
        <BaziResultClient />
      </Suspense>
    </div>
  );
}
