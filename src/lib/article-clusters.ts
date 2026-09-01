/**
 * Topical clusters: article ↔ service internal linking and handbook hub.
 * Only link to real service slugs from doctor.services / services.i18n.
 */

export type HandbookClusterId =
  | "prevention"
  | "hpv-cytology"
  | "colposcopy"
  | "hysteroscopy"
  | "menstrual"
  | "symptoms";

export const HANDBOOK_CLUSTERS: Array<{
  id: HandbookClusterId;
  /** Article slugs in this cluster (BG); others fall under hub only */
  slugs: readonly string[];
  /** Primary service page for the cluster */
  primaryService: string;
  relatedServices: readonly string[];
}> = [
  {
    id: "prevention",
    slugs: [
      "kakvo-vklyuchva-profilaktichniyat-pregled",
      "kolko-chesto-profilaktichen-pregled",
      "podgotovka-za-ginekologichen-pregled",
    ],
    primaryService: "profilaktichen-ginekologichen-pregled",
    relatedServices: ["citonamazka", "hpv-test", "ultrazvukovi-izsledvaniya"],
  },
  {
    id: "hpv-cytology",
    slugs: [
      "hpv-test-vs-citonamazka",
      "pozitiven-hpv-test",
      "kakvo-pokazva-citonamazkata",
      "kakvo-sledva-sled-abnormalna-citonamazka",
    ],
    primaryService: "hpv-test",
    relatedServices: ["citonamazka", "kolposkopiya", "profilaktichen-ginekologichen-pregled"],
  },
  {
    id: "colposcopy",
    slugs: ["kakvo-e-kolposkopiya", "boli-li-kolposkopiyata"],
    primaryService: "kolposkopiya",
    relatedServices: ["citonamazka", "hpv-test", "profilaktichen-ginekologichen-pregled"],
  },
  {
    id: "hysteroscopy",
    slugs: ["boli-li-histeroskopiyata"],
    primaryService: "histeroskopiya",
    relatedServices: [
      "akushero-ginekologichni-pregledi",
      "ultrazvukovi-izsledvaniya",
      "zhensko-zdrave",
    ],
  },
  {
    id: "menstrual",
    slugs: [
      "menstrualni-narusheniya-koga-da-posetite-ginekolog",
      "neredoven-cikul-koga-e-problem",
    ],
    primaryService: "zhensko-zdrave",
    relatedServices: [
      "akushero-ginekologichni-pregledi",
      "ultrazvukovi-izsledvaniya",
      "profilaktichen-ginekologichen-pregled",
    ],
  },
  {
    id: "symptoms",
    slugs: [],
    primaryService: "akushero-ginekologichni-pregledi",
    relatedServices: ["zhensko-zdrave", "ultrazvukovi-izsledvaniya"],
  },
];

/** Per-article related services (overrides cluster default when set). */
export const ARTICLE_RELATED_SERVICES: Record<string, readonly string[]> = {
  "hpv-test-vs-citonamazka": ["hpv-test", "citonamazka", "kolposkopiya"],
  "pozitiven-hpv-test": ["hpv-test", "kolposkopiya", "citonamazka"],
  "kakvo-pokazva-citonamazkata": ["citonamazka", "hpv-test", "kolposkopiya"],
  "kakvo-sledva-sled-abnormalna-citonamazka": [
    "kolposkopiya",
    "citonamazka",
    "hpv-test",
  ],
  "kakvo-e-kolposkopiya": ["kolposkopiya", "citonamazka", "hpv-test"],
  "boli-li-kolposkopiyata": ["kolposkopiya", "citonamazka"],
  "boli-li-histeroskopiyata": ["histeroskopiya", "ultrazvukovi-izsledvaniya"],
  "kakvo-vklyuchva-profilaktichniyat-pregled": [
    "profilaktichen-ginekologichen-pregled",
    "citonamazka",
    "hpv-test",
  ],
  "kolko-chesto-profilaktichen-pregled": [
    "profilaktichen-ginekologichen-pregled",
    "citonamazka",
  ],
  "podgotovka-za-ginekologichen-pregled": [
    "profilaktichen-ginekologichen-pregled",
    "akushero-ginekologichni-pregledi",
  ],
  "menstrualni-narusheniya-koga-da-posetite-ginekolog": [
    "zhensko-zdrave",
    "akushero-ginekologichni-pregledi",
    "ultrazvukovi-izsledvaniya",
  ],
  "neredoven-cikul-koga-e-problem": [
    "zhensko-zdrave",
    "akushero-ginekologichni-pregledi",
    "ultrazvukovi-izsledvaniya",
  ],
};

export function getRelatedServiceSlugsForArticle(slug: string): string[] {
  if (ARTICLE_RELATED_SERVICES[slug]) {
    return [...ARTICLE_RELATED_SERVICES[slug]];
  }
  const cluster = HANDBOOK_CLUSTERS.find((c) => c.slugs.includes(slug));
  if (cluster) return [...cluster.relatedServices];
  return ["profilaktichen-ginekologichen-pregled", "akushero-ginekologichni-pregledi"];
}

export function getClusterForArticle(slug: string) {
  return HANDBOOK_CLUSTERS.find((c) => c.slugs.includes(slug)) ?? null;
}

export function getClusterIdForArticle(slug: string): HandbookClusterId | null {
  return getClusterForArticle(slug)?.id ?? null;
}

export function getClusterPrimaryService(slug: string): string | null {
  return getClusterForArticle(slug)?.primaryService ?? null;
}

/** Articles belonging to a handbook cluster (preserves cluster slug order). */
export function getClusterArticleSlugs(clusterId: HandbookClusterId): readonly string[] {
  return HANDBOOK_CLUSTERS.find((c) => c.id === clusterId)?.slugs ?? [];
}
