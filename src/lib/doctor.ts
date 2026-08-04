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
    count: 48,
    source: "Superdoc",
    /** Star distribution from the Superdoc profile, 5★ → 1★. */
    distribution: [
      { stars: 5, count: 46 },
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
    phone: "0894972626",
    phoneDisplay: "0894 972 626",
    phoneHref: "tel:+359894972626",
    nhif: true,
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
