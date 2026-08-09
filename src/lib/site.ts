export const siteConfig = {
  name: "Д-р Мария Райкова",
  shortName: "Д-р Мария Райкова",
  doctorName: "Д-р Мария Райкова",
  title: "Д-р Мария Райкова — Акушер-гинеколог в София",
  description:
    "Премиум акушеро-гинекологична грижа в София. Профилактични прегледи, диагностика и консултации за женско здраве. Запазете час онлайн.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    "https://drmariaraykova.bg",
  locale: "bg_BG",
  keywords: [
    "акушер гинеколог София",
    "гинеколог София",
    "д-р Мария Райкова",
    "профилактичен гинекологичен преглед",
    "гинекологичен ултразвук София",
    "колпоскопия София",
    "хистероскопия София",
    "женско здраве",
    "гинекологичен преглед НЗОК",
    "акушер гинеколог Люлин",
    "гинеколог срещу ВМА",
  ],
  /**
   * GA4 measurement ID (public). Override with NEXT_PUBLIC_GA_MEASUREMENT_ID.
   * Loads only after optional cookie consent.
   */
  gaMeasurementId:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-FX4KH956NH",
} as const;

export type SiteConfig = typeof siteConfig;
