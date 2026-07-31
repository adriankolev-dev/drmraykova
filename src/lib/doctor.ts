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
  },
  education: [
    "Медицински университет — Варна",
    "Специализация по акушерство и гинекология (в ход)",
  ] as const,
  qualifications: [
    "Следдипломна квалификация в областта на генетиката, Harvard Medical School, Бостън, САЩ",
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
