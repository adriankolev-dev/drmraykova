import {
  EUR_TO_BGN,
  priceItems,
  servicesWithoutListedPrice,
  type PriceItem,
} from "@/content/pricing";
import type { Locale } from "@/i18n/routing";

const LOCALE_TAG: Record<Locale, string> = {
  bg: "bg-BG",
  en: "en-US",
  es: "es-ES",
};

function currencyFormatter(locale: Locale, currency: "EUR" | "BGN") {
  return new Intl.NumberFormat(LOCALE_TAG[locale] ?? LOCALE_TAG.bg, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Rounds to whole cents so the derived BGN figure matches the official conversion. */
export function toBgn(eur: number): number {
  return Math.round(eur * EUR_TO_BGN * 100) / 100;
}

export function formatEur(eur: number, locale: Locale = "bg"): string {
  return currencyFormatter(locale, "EUR").format(eur);
}

export function formatBgn(eur: number, locale: Locale = "bg"): string {
  return currencyFormatter(locale, "BGN").format(toBgn(eur));
}

/** Plain numeric value for schema.org offers. */
export function eurAmount(eur: number): string {
  return eur.toFixed(2);
}

export function getAllPrices(): readonly PriceItem[] {
  return priceItems;
}

/** Prices relevant to a single service page, cheapest first. */
export function getPricesForService(slug: string): PriceItem[] {
  return priceItems
    .filter((item) => item.serviceSlugs.includes(slug))
    .sort((a, b) => a.eur - b.eur);
}

export function getFromPriceEur(slug: string): number | null {
  const prices = getPricesForService(slug);
  return prices.length ? prices[0].eur : null;
}

export function hasListedPrice(slug: string): boolean {
  return (
    !servicesWithoutListedPrice.includes(
      slug as (typeof servicesWithoutListedPrice)[number],
    ) && getPricesForService(slug).length > 0
  );
}
