export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">The Ba Zi</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Discover the ancient Chinese wisdom of the Four Pillars of Destiny.
              Free AI-powered Ba Zi readings for entertainment and self-reflection.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Explore</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="/bazi" className="hover:text-zinc-900 transition-colors">Ba Zi Calculator</a></li>
              <li><a href="/zodiac" className="hover:text-zinc-900 transition-colors">Chinese Zodiac</a></li>
              <li><a href="/five-elements" className="hover:text-zinc-900 transition-colors">Five Elements</a></li>
              <li><a href="/blog" className="hover:text-zinc-900 transition-colors">Blog</a></li>
              <li><a href="/learn/glossary" className="hover:text-zinc-900 transition-colors">Glossary</a></li>
              <li><a href="/learn/faq" className="hover:text-zinc-900 transition-colors">FAQ</a></li>
              <li><a href="/2026-year-of-the-horse" className="hover:text-zinc-900 transition-colors">2026 Year of the Horse</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Legal</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</a></li>
              <li><a href="/affiliate-disclosure" className="hover:text-zinc-900 transition-colors">Affiliate Disclosure</a></li>
              <li>For entertainment purposes only</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Support Us</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="https://ko-fi.com/thebazi" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">☕ Buy us a coffee</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} The Ba Zi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
