import type { Locale } from "@/i18n/routing";

export function getMainNav(t: (key: string) => string) {
  return [
    { href: "/", label: t("home") },
    { href: "/za-lekarya", label: t("about") },
    { href: "/uslugi", label: t("services") },
    { href: "/tseni", label: t("pricing") },
    { href: "/narachnik", label: t("handbook") },
    { href: "/vaprosi", label: t("faq") },
    { href: "/kontakti", label: t("contact") },
  ] as const;
}

export const localeHtmlLang: Record<Locale, string> = {
  bg: "bg",
  en: "en",
  es: "es",
};

export const localeOpenGraph: Record<Locale, string> = {
  bg: "bg_BG",
  en: "en_US",
  es: "es_ES",
};
