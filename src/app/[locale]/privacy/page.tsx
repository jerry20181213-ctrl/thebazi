import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-url";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: getCanonicalUrl(locale, "privacy"),
    },
    title: "Privacy Policy",
    description: "Privacy Policy for The Ba Zi (thebazi.com). Learn how we collect, use, and protect your personal data.",
  };
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Privacy Policy</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: May 25, 2026</p>

      <div className="prose prose-zinc prose-sm max-w-none space-y-6">
        <h2 className="text-lg font-semibold">1. Information We Collect</h2>
        <p>
          The Ba Zi (thebazi.com) is committed to protecting your privacy. We collect minimal personal data:
        </p>
        <ul>
          <li><strong>Birth information</strong> — Your birth date, time, and gender when you use our Ba Zi calculator. This data is processed entirely in your browser and is never sent to or stored on our servers.</li>
          <li><strong>Cookies</strong> — We use minimal cookies for essential site functionality and, with your consent, for analytics and advertising purposes.</li>
          <li><strong> analytics data</strong> — Anonymous usage data (page views, referrer, browser type) if you consent to analytics cookies.</li>
        </ul>

        <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our Ba Zi calculation and AI reading service</li>
          <li>To understand site traffic patterns and improve user experience</li>
          <li>To display personalized or contextual advertisements (with your consent)</li>
        </ul>

        <h2 className="text-lg font-semibold">3. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Vercel</strong> — Hosting and infrastructure. See <a href="https://vercel.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener">Vercel&apos;s Privacy Policy</a>.</li>
          <li><strong>Google AdSense</strong> — Contextual advertising. Google uses cookies to serve relevant ads. See <a href="https://policies.google.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener">Google&apos;s Privacy Policy</a>.</li>
          <li><strong>DeepSeek</strong> — AI-powered reading generation. Anonymous birth data may be processed by DeepSeek&apos;s API.</li>
        </ul>

        <h2 className="text-lg font-semibold">4. Your Rights (GDPR)</h2>
        <p>If you are a resident of the European Economic Area (EEA), you have the following rights:</p>
        <ul>
          <li><strong>Right to access</strong> — Request a copy of the data we hold about you</li>
          <li><strong>Right to erasure</strong> — Request deletion of your data</li>
          <li><strong>Right to object</strong> — Object to processing of your personal data</li>
          <li><strong>Right to data portability</strong> — Request transfer of your data</li>
        </ul>
        <p>
          Since we do not store birth data on our servers, most of these rights are automated. For any privacy inquiries, contact us at the email below.
        </p>

        <h2 className="text-lg font-semibold">5. Cookie Policy</h2>
        <p>
          We use cookies and similar tracking technologies. You can control cookie preferences through your browser settings or our cookie consent banner. Types of cookies we use:
        </p>
        <ul>
          <li><strong>Essential cookies</strong> — Required for basic site functionality (no consent needed)</li>
          <li><strong>Analytics cookies</strong> — Help us understand how visitors use the site (consent required)</li>
          <li><strong>Advertising cookies</strong> — Used by Google AdSense to serve relevant ads (consent required)</li>
        </ul>

        <h2 className="text-lg font-semibold">6. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your data. All communications are encrypted via HTTPS. Your birth data is processed locally in your browser and is never stored on our servers.
        </p>

        <h2 className="text-lg font-semibold">7. Contact</h2>
        <p>
          For privacy-related inquiries, please contact us at: <strong>privacy@thebazi.com</strong>
        </p>

        <h2 className="text-lg font-semibold">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
        </p>
      </div>
    </div>
  );
}
