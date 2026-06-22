import { quotes, type Quote } from "@/src/data/quotes";

export function getRomeDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function hashKey(key: string) {
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function getDailyQuote(date = new Date()): Quote & { dateKey: string } {
  const dateKey = getRomeDateKey(date);
  const quote = quotes[hashKey(dateKey) % quotes.length];
  return { ...quote, dateKey };
}
