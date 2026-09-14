/**
 * Factual doctor profile — sourced from Superdoc + confirmed audit.
 * Do not invent qualifications, procedures, or experience.
 * @see docs/DOCTOR_CONTENT_AUDIT.md
 */

export const doctor = {
  name: "Д-р Мария Райкова",
  honorificName: "Д-р Мария Райкова",
  specialty: "Акушер-гинеколог",
  specialtyStatus: "специализант",
  city: "София",
  experienceLabel: "Под 5 години опит",
  languages: ["Български", "Английски", "Испански"] as const,
  rating: {
    value: 4.9,
    count: 52,
    source: "Superdoc",
    /** Verified against the Superdoc profile on 2026-09-14 (ratingValue 4.88, ratingCount 52). */
    verifiedOn: "2026-09-14",
    /**
     * Star distribution from the Superdoc profile, 5★ → 1★.
     * Superdoc paginates reviews client-side, so only the newest 20 render in
     * the HTML. The remainder is fixed by arithmetic on the two published
     * figures: round(total / 52, 2) === 4.88 forces total = 254 points, and the
     * 4 reviews added since the previously verified 48-review split (234 points)
     * must therefore contribute 20 — which only 5+5+5+5 satisfies.
     * Re-check here whenever the count changes.
     */
    distribution: [
      { stars: 5, count: 50 },
      { stars: 4, count: 0 },
      { stars: 3, count: 1 },
      { stars: 2, count: 0 },
      { stars: 1, count: 1 },
    ],
  },
  education: [
    "Медицински университет — Варна",
    "Специализация по акушерство и гинекология (в ход)",
  ] as const,
  qualifications: [
    "HMX Fundamentals — Genetics, Certificate of Achievement, Harvard Medical School, Бостън, САЩ (ноември 2024)",
    "Ултразвукова диагностика",
    "Курс по офис хистероскопия",
    "Теоретичен и практически курс по оперативна хистероскопия",
    "Член на Български лекарски съюз",
    "Член на Българско дружество по акушерство и гинекология",
  ] as const,
  workplaces: [
    "ПСАГБАЛ „Св. София“",
    "МЦ Люлин Мед",
  ] as const,
  /** Hospital where she also sees patients — confirmed by the practice 2026-09-14. */
  hospitalAffiliation: "ПСАГБАЛ „Св. София“",
  social: {
    instagram: {
      handle: "@drmariaraykova",
      url: "https://www.instagram.com/drmariaraykova/",
    },
    facebook: {
      handle: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61592771282807",
    },
  },

  clinic: {
    name: "МЦ Люлин Мед — Филиал Добрила 10",
    address: "ул. Добрила 10, срещу ВМА, София",
    /**
     * Confirmed by the practice 2026-09-14. No postal code is known, so none is
     * published — an invented one would be worse than a missing one.
     */
    geo: { latitude: 42.685656, longitude: 23.304764 },
    phone: "0894972626",
    phoneDisplay: "0894 972 626",
    phoneHref: "tel:+359894972626",
    nhif: true,
    /**
     * NHIF visits happen at this office — confirmed by the practice 2026-09-14.
     * There is no fixed schedule: appointments only, via Superdoc or by phone.
     * Do not publish openingHours anywhere until a real schedule exists.
     */
    nhifAtThisOffice: true,
    byAppointmentOnly: true,
  },
  /** Explicit scope boundaries from Superdoc — do not contradict on the site */
  doesNotOffer: [
    "Проследяване на бременност",
    "Прегледи на деца",
  ] as const,
  services: [
    {
      slug: "profilaktichen-ginekologichen-pregled",
      title: "Профилактични гинекологични прегледи",
    },
    {
      slug: "akushero-ginekologichni-pregledi",
      title: "Акушеро-гинекологични прегледи",
    },
    {
      slug: "ultrazvukovi-izsledvaniya",
      title: "Ултразвукови изследвания",
    },
    {
      slug: "kolposkopiya",
      title: "Колпоскопия",
    },
    {
      slug: "citonamazka",
      title: "Цитонамазка",
    },
    {
      slug: "hpv-test",
      title: "HPV тест",
    },
    {
      slug: "histeroskopiya",
      title: "Хистероскопия",
    },
    {
      slug: "zhensko-zdrave",
      title: "Консултации за женско здраве",
    },
  ] as const,
} as const;

export type Doctor = typeof doctor;
