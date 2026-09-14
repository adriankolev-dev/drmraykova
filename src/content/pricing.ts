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
/** Calendar year shown on the public price page — derived from the update date. */
export const PRICES_YEAR = PRICES_LAST_UPDATED.slice(0, 4);

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
    serviceSlugs: [
      "profilaktichen-ginekologichen-pregled",
      "citonamazka",
    ],
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
export const servicesWithoutListedPrice = [
  "histeroskopiya",
  "hpv-test",
] as const;

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

export function getPriceItem(id: string): PriceItem | undefined {
  return priceItems.find((item) => item.id === id);
}

/** NHIF co-payment applies to these price items. */
export const nhifCopayItemIds = ["tsitonamazka", "vlagalishten-sekret"] as const;

/**
 * NHIF (НЗОК) terms. Two different provenances live here — keep them straight:
 *
 * - The consumer fee is set by law, identical at every NHIF provider, and is
 *   NOT the practice's to choose. It converted to euro unchanged in value on
 *   2026-01-01: 2.90 BGN / 1.95583 = 1.48 EUR, and 1.00 BGN = 0.51 EUR for
 *   pensioners. Verify against nhif.bg before changing.
 * - Everything else below (referral, covered services, co-payments) was
 *   confirmed by the practice on 2026-09-14.
 *
 * Do not extend this block with rules that were not verified.
 */
export const NHIF_CONFIRMED_ON = "2026-09-14";

/** Statutory consumer fee (потребителска такса) per NHIF visit, in EUR. */
export const NHIF_CONSUMER_FEE_EUR = 1.48;

/** Reduced statutory fee for old-age pensioners, in EUR. */
export const NHIF_CONSUMER_FEE_PENSIONER_EUR = 0.51;

/** A GP referral (направление) is required for an NHIF visit. */
export const NHIF_REQUIRES_REFERRAL = true;

/** Services the NHIF referral covers at this practice. */
export const NHIF_COVERED_SERVICE_SLUGS = [
  "akushero-ginekologichni-pregledi",
  "kolposkopiya",
  "ultrazvukovi-izsledvaniya",
] as const;
