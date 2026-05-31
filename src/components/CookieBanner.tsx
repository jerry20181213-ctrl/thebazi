"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem("cookie-consent", "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">
          We use cookies to enhance your experience. Essential cookies are always active for site functionality.
          With your consent, we also use analytics and advertising cookies. See our{" "}
          <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={acceptEssential}
            className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
