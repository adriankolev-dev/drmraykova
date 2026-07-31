/**
 * Booking abstraction — Superdoc is the provider in v1.
 * Swap implementation later for widget / API without changing CTAs.
 */

export type BookingProvider = "superdoc" | "widget" | "api";

export interface BookingConfig {
  provider: BookingProvider;
  url: string;
  label: string;
}

export const bookingConfig: BookingConfig = {
  provider: "superdoc",
  url:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://superdoc.bg/lekar/maria-raykova",
  label: "Запази час",
};

/** Returns the current booking destination. */
export function getBookingUrl(params?: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}): string {
  const url = new URL(bookingConfig.url);

  if (params?.utmSource) url.searchParams.set("utm_source", params.utmSource);
  if (params?.utmMedium) url.searchParams.set("utm_medium", params.utmMedium);
  if (params?.utmCampaign) {
    url.searchParams.set("utm_campaign", params.utmCampaign);
  }

  return url.toString();
}

export function getBookingLinkProps(options?: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}) {
  return {
    href: getBookingUrl(options),
    target: "_blank" as const,
    rel: "noopener noreferrer",
    "aria-label": `${bookingConfig.label} — отваря Superdoc`,
  };
}
