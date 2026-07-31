import { defineRouting } from "next-intl/routing";

export const locales = ["bg", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
