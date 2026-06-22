"use client";

import { useEffect, useState } from "react";
import { getDailyQuote } from "@/src/lib/quote";

type DailyQuoteState = ReturnType<typeof getDailyQuote>;

export function DailyQuote() {
  const [quote, setQuote] = useState<DailyQuoteState | null>(null);

  useEffect(() => {
    setQuote(getDailyQuote());
    const interval = window.setInterval(() => setQuote(getDailyQuote()), 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const display = quote ?? {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    dateKey: ""
  };

  return (
    <aside className="daily-quote" aria-live="polite">
      <p className="quote-label">Daily thought - updates once per day</p>
      <blockquote>&quot;{display.text}&quot;</blockquote>
      <p className="quote-author">{display.author}</p>
    </aside>
  );
}
