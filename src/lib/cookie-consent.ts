export const COOKIE_CONSENT_KEY = "mr-cookie-consent";
export const COOKIE_CONSENT_EVENT = "mr-cookie-consent";

export type CookieConsentValue = "accepted" | "essential";

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "essential") return value;
  return null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function subscribeCookieConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** True when optional cookies (analytics) are allowed. */
export function hasAnalyticsConsent() {
  return readCookieConsent() === "accepted";
}
