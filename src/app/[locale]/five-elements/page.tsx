import type { Metadata } from "next";
import Link from "next/link";
import { FIVE_ELEMENTS } from "@/lib/element-content";
import { SITE_CONFIG } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, jsonLdScript } from "@/lib/json-ld";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-TW";
  return {
    title: isZh ? "五行（Wu Xing）— 木火土金水完整指南" : "Five Elements (Wu Xing) — The Ba Zi",
    description: isZh
      ? "學習五行——木、火、土、金、水——如何影響你的性格、事業、健康和命運。了解五行相生相剋之道。"
      : "Learn about the Five Elements — Wood, Fire, Earth, Metal, and Water — and how they shape your personality, career, health, and destiny in Ba Zi astrology.",
    openGraph: {
      title: isZh ? "五行（Wu Xing）— 八字命理基礎" : "Five Elements (Wu Xing) — The Ba Zi",
      description: isZh ? "探索中國五行哲學及其對你生活的影響。" : "Discover the five fundamental elements of Chinese metaphysics and their influence on your life.",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Five Elements (Wu Xing)" }],
    },
  };
}

export default function FiveElementsIndex() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Five Elements" },
        ])) }}
      />
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Five Elements" },
          ]} />
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Five Elements <span className="text-zinc-500">(Wu Xing)</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-3xl">
            The Five Elements — Wood, Fire, Earth, Metal, and Water — are the fundamental building blocks of
            Chinese metaphysics. In Ba Zi (Four Pillars of Destiny), your birth chart contains a unique
            combination of these elements that shapes your personality, strengths, challenges, and life path.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-2">The Five Elements</h2>
          <p className="text-zinc-600 mb-8">
            Each element represents a different energy pattern. Click to explore each one in depth.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIVE_ELEMENTS.map((el) => (
              <Link
                key={el.key}
                href={`/five-elements/${el.key}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3" aria-hidden="true">
                  {el.key === "wood" && "🌳"}
                  {el.key === "fire" && "🔥"}
                  {el.key === "earth" && "⛰️"}
                  {el.key === "metal" && "⚔️"}
                  {el.key === "water" && "💧"}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-1">{el.name}</h3>
                <p className="text-sm text-zinc-500 mb-3">{el.chinese}</p>
                <p className="text-sm text-zinc-600 line-clamp-3">{el.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                    {el.season}
                  </span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                    {el.direction}
                  </span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                    {el.color}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">The Cycle of Creation and Control</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="font-semibold text-green-800 mb-2">🔄 Generating Cycle</h3>
              <p className="text-sm text-green-700">
                Wood feeds Fire → Fire creates Earth (ash) → Earth bears Metal →
                Metal collects Water → Water nourishes Wood
              </p>
              <p className="text-xs text-green-600 mt-2">
                This is the creative, nurturing cycle. Each element supports the next.
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="font-semibold text-red-800 mb-2">⚔️ Controlling Cycle</h3>
              <p className="text-sm text-red-700">
                Wood breaks Earth → Earth absorbs Water → Water extinguishes Fire →
                Fire melts Metal → Metal cuts Wood
              </p>
              <p className="text-xs text-red-600 mt-2">
                This is the balancing cycle. Each element keeps another in check.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">How Elements Affect Your Ba Zi</h2>
          <div className="prose prose-zinc max-w-none">
            <p>
              In your Ba Zi chart, the balance of the five elements reveals your natural strengths and
              potential challenges. Each of the four pillars (Year, Month, Day, Hour) contains a Heavenly
              Stem and an Earthly Branch, each associated with one of the five elements.
            </p>
            <p>
              <strong>The Day Master</strong> (the Heavenly Stem of your Day Pillar) is <em>you</em>. Its
              element represents your core personality. The other elements in your chart show the energies
              surrounding you — your environment, your career, your relationships.
            </p>
            <p>
              When an element is <strong>missing</strong> from your chart, it represents an area of life
              that may need extra attention and cultivation. When an element is <strong>over-abundant</strong>,
              it may create imbalance that needs to be moderated.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
