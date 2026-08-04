/**
 * Price list — sourced from the Superdoc profile, confirmed against the clinic.
 * Only EUR is stored; BGN is derived via the fixed rate so the two can never drift.
 * Display names live in messages under the `pricing.items` namespace.
 * @see src/lib/pricing.ts
 */

/** Official fixed BGN/EUR rate. */
export const EUR_TO_BGN = 1.95583;

export const PRICES_LAST_UPDATED = "2026-08-04";
export const PRICES_SOURCE = "Superdoc";

export type PriceItem = {
  /** Key into the `pricing.items` message namespace. */
  id: string;
  eur: number;
  /** Service pages this price is shown on. */
  serviceSlugs: readonly string[];
};

export const priceItems: readonly PriceItem[] = [
  {
    id: "paket-ag-pregled",
    eur: 100,
    serviceSlugs: [
      "profilaktichen-ginekologichen-pregled",
      "akushero-ginekologichni-pregledi",
    ],
  },
  {
    id: "pervichen-pregled",
    eur: 40,
    serviceSlugs: [
      "profilaktichen-ginekologichen-pregled",
      "akushero-ginekologichni-pregledi",
      "zhensko-zdrave",
    ],
  },
  {
    id: "vtorichen-pregled",
    eur: 30,
    serviceSlugs: ["akushero-ginekologichni-pregledi", "zhensko-zdrave"],
  },
  {
    id: "kolposkopiya",
    eur: 45,
    serviceSlugs: ["kolposkopiya"],
  },
  {
    id: "ultrazvuk",
    eur: 45,
    serviceSlugs: ["ultrazvukovi-izsledvaniya"],
  },
  {
    id: "tsitonamazka",
    eur: 25,
    serviceSlugs: ["profilaktichen-ginekologichen-pregled"],
  },
  {
    id: "vlagalishten-sekret",
    eur: 25,
    serviceSlugs: [
      "profilaktichen-ginekologichen-pregled",
      "akushero-ginekologichni-pregledi",
    ],
  },
  {
    id: "biopsiya-himiokoagulatsiya",
    eur: 100,
    serviceSlugs: ["kolposkopiya"],
  },
] as const;

/**
 * Services with no published price — quoted after consultation.
 * Do not invent a figure for these.
 */
export const servicesWithoutListedPrice = ["histeroskopiya"] as const;

/** Insurers accepted for cashless visits. Proper names — not translated. */
export const insurers = [
  "Аксиом",
  "Алианц",
  "Булстрад Живот",
  "България Иншурънс",
  "Групама",
  "Дженерали",
  "ДЗИ",
  "Доверие",
  "Евроинс",
  "ЕЗК (ЕЗОК)",
  "Лев Инс Живот (ЖЗИ)",
  "ОЗОК Инс",
  "Съгласие",
  "Уника",
  "Фи Хелт",
  "ЦКБ Живот",
] as const;

/** NHIF co-payment applies to these price items. */
export const nhifCopayItemIds = ["tsitonamazka"] as const;
