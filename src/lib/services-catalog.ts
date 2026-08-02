/**
 * Service taxonomy, nav highlights, and internal linking.
 * Categories map only to real offered services — do not invent procedures.
 * @see doctor.doesNotOffer
 */

export type ServiceCategoryId =
  | "prevention"
  | "diagnostics"
  | "consultations"
  | "treatment";

export const SERVICES_LAST_UPDATED = "2026-08-02";

/**
 * Orientational visit length for UX cards — not a clinical guarantee.
 * ISO-8601 ranges for optional schema (min–max).
 */
export const SERVICE_DURATION: Record<
  string,
  { isoMin: string; isoMax: string }
> = {
  "profilaktichen-ginekologichen-pregled": {
    isoMin: "PT30M",
    isoMax: "PT40M",
  },
  "akushero-ginekologichni-pregledi": {
    isoMin: "PT30M",
    isoMax: "PT45M",
  },
  "ultrazvukovi-izsledvaniya": {
    isoMin: "PT15M",
    isoMax: "PT30M",
  },
  kolposkopiya: {
    isoMin: "PT20M",
    isoMax: "PT40M",
  },
  histeroskopiya: {
    isoMin: "PT30M",
    isoMax: "PT45M",
  },
  "zhensko-zdrave": {
    isoMin: "PT20M",
    isoMax: "PT40M",
  },
};

/** Featured links in the Услуги dropdown (order matters). */
export const NAV_FEATURED_SERVICE_SLUGS = [
  "profilaktichen-ginekologichen-pregled",
  "ultrazvukovi-izsledvaniya",
  "kolposkopiya",
  "histeroskopiya",
  "akushero-ginekologichni-pregledi",
  "zhensko-zdrave",
] as const;

export const SERVICE_CATEGORIES: Array<{
  id: ServiceCategoryId;
  slugs: readonly string[];
}> = [
  {
    id: "prevention",
    slugs: ["profilaktichen-ginekologichen-pregled"],
  },
  {
    id: "diagnostics",
    slugs: ["ultrazvukovi-izsledvaniya", "kolposkopiya"],
  },
  {
    id: "consultations",
    slugs: ["akushero-ginekologichni-pregledi", "zhensko-zdrave"],
  },
  {
    id: "treatment",
    slugs: ["histeroskopiya"],
  },
];

/** Related services for internal linking — clinically adjacent, not invented. */
export const RELATED_SERVICES: Record<string, readonly string[]> = {
  "profilaktichen-ginekologichen-pregled": [
    "ultrazvukovi-izsledvaniya",
    "kolposkopiya",
    "zhensko-zdrave",
  ],
  "akushero-ginekologichni-pregledi": [
    "profilaktichen-ginekologichen-pregled",
    "ultrazvukovi-izsledvaniya",
    "zhensko-zdrave",
  ],
  "ultrazvukovi-izsledvaniya": [
    "profilaktichen-ginekologichen-pregled",
    "akushero-ginekologichni-pregledi",
    "kolposkopiya",
  ],
  kolposkopiya: [
    "profilaktichen-ginekologichen-pregled",
    "ultrazvukovi-izsledvaniya",
    "zhensko-zdrave",
  ],
  histeroskopiya: [
    "akushero-ginekologichni-pregledi",
    "ultrazvukovi-izsledvaniya",
    "zhensko-zdrave",
  ],
  "zhensko-zdrave": [
    "profilaktichen-ginekologichen-pregled",
    "akushero-ginekologichni-pregledi",
    "ultrazvukovi-izsledvaniya",
  ],
};

export function getRelatedServiceSlugs(slug: string): string[] {
  return [...(RELATED_SERVICES[slug] ?? [])];
}

export function getCategoryForSlug(slug: string): ServiceCategoryId | null {
  for (const category of SERVICE_CATEGORIES) {
    if (category.slugs.includes(slug)) return category.id;
  }
  return null;
}

export function getServiceDuration(slug: string) {
  return SERVICE_DURATION[slug] ?? null;
}
