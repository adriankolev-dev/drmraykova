import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire GA4 event when analytics consent is granted. Safe no-op otherwise. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!siteConfig.gaMeasurementId) return;
  window.gtag("event", name, params);
}

export function trackBookCta(params: {
  utmCampaign?: string;
  location: string;
  variant?: string;
}) {
  trackEvent("book_appointment_click", {
    event_category: "conversion",
    event_label: params.utmCampaign ?? params.location,
    location: params.location,
    cta_variant: params.variant ?? "primary",
  });
}

export function trackOutboundLink(params: {
  url: string;
  label: string;
}) {
  trackEvent("outbound_click", {
    event_category: "engagement",
    link_url: params.url,
    link_text: params.label,
  });
}
