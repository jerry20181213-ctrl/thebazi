import { Suspense } from "react";
import type { Metadata } from "next";
import BaziResultClient from "./client";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Your Ba Zi Reading",
  description: "Your personalized Ba Zi (Four Pillars of Destiny) reading with AI-powered insights.",
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Ba Zi Calculator", href: "/bazi" },
  { label: "Your Reading" },
];

export default function BaziResultPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />
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
