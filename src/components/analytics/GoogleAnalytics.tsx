"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import {
  hasAnalyticsConsent,
  subscribeCookieConsent,
} from "@/lib/cookie-consent";
import { siteConfig } from "@/lib/site";

const MEASUREMENT_ID = siteConfig.gaMeasurementId;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pagePath(pathname: string) {
  return pathname || "/";
}

function trackPageview(pathname: string) {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("config", MEASUREMENT_ID, {
    page_path: pagePath(pathname),
  });
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const allowed = useSyncExternalStore(
    subscribeCookieConsent,
    hasAnalyticsConsent,
    () => false,
  );

  useEffect(() => {
    if (!allowed || !MEASUREMENT_ID) return;
    trackPageview(pathname);
  }, [allowed, pathname]);

  if (!allowed || !MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
