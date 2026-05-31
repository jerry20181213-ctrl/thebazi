import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mb-6 text-7xl font-bold tracking-tight text-zinc-200">
          404
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          Page Not Found
        </h1>
        <p className="mb-8 text-sm text-zinc-500 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find your way.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Go Home
          </Link>
          <Link
            href="/bazi"
            className="rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300"
          >
            Calculate Your Ba Zi
          </Link>
          <Link
            href="/zodiac"
            className="rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300"
          >
            Explore Zodiac
          </Link>
        </div>
        <div className="mt-10 border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400">Popular pages:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
            <Link href="/zodiac/compatibility" className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2">Compatibility</Link>
            <Link href="/learn/day-pillars" className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2">60 Day Pillars</Link>
            <Link href="/birth-year" className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2">Birth Year Guide</Link>
            <Link href="/learn/glossary" className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2">Glossary</Link>
            <Link href="/five-elements" className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2">Five Elements</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
