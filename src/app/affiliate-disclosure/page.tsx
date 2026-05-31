import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for The Ba Zi (thebazi.com). Learn about our affiliate relationships and how we earn commissions.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Affiliate Disclosure</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: May 25, 2026</p>

      <div className="prose prose-zinc prose-sm max-w-none space-y-6">
        <h2 className="text-lg font-semibold">Our Commitment to Transparency</h2>
        <p>
          The Ba Zi (thebazi.com) is committed to full transparency about our affiliate relationships.
          This disclosure policy is part of our compliance with the Federal Trade Commission (FTC)
          guidelines and similar regulations worldwide.
        </p>

        <h2 className="text-lg font-semibold">What Are Affiliate Links?</h2>
        <p>
          Some of the links on our website are affiliate links. This means that if you click on one of
          these links and make a purchase, we may earn a small commission — at <strong>no additional cost</strong> to you.
          These commissions help us maintain and improve The Ba Zi, keeping our core Ba Zi calculator free for everyone.
        </p>

        <h2 className="text-lg font-semibold">Our Affiliate Programs</h2>
        <p>The Ba Zi participates in the following affiliate programs:</p>
        <ul>
          <li>
            <strong>Amazon Associates</strong> — As an Amazon Associate, we earn from qualifying purchases
            made through links to books, products, and other items on Amazon.
          </li>
          <li>
            <strong>Other Programs</strong> — We may also participate in other affiliate programs for
            astrology-related products, courses, and services that we believe provide value to our readers.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">How We Choose Products</h2>
        <p>
          We only recommend products, books, and services that we genuinely believe are relevant and
          useful to our audience — primarily books and resources related to Chinese astrology,
          Ba Zi, Five Elements, and personal development. Our recommendations are never influenced
          by commission rates alone.
        </p>

        <h2 className="text-lg font-semibold">Your Trust Matters</h2>
        <p>
          We value your trust and are committed to honest recommendations. If you have any questions
          about our affiliate relationships or a specific link, please contact us at:{/* leave as is */}

        </p>
        <p>
          <strong>Email:</strong> disclosure@thebazi.com
        </p>
      </div>
    </div>
  );
}
