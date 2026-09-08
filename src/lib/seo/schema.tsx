import type { Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";
import { bookingConfig } from "@/lib/booking";

const ogImage = `${siteConfig.url}/og.png`;
const bookingProfileUrl = bookingConfig.url.replace(/\?.*$/, "");
/** Профили на лекаря — клиниката е отдельен субект и не ги наследява. */
const doctorProfiles = [
  bookingProfileUrl,
  doctor.social.instagram.url,
  doctor.social.facebook.url,
];

export const PHYSICIAN_ID = `${siteConfig.url}/#physician`;
export const CLINIC_ID = `${siteConfig.url}/#clinic`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** BCP 47 language tags for schema.org ContactPoint / knowsLanguage. */
const SCHEMA_LANGUAGE_TAGS = ["bg", "en", "es"] as const;

const MEDICAL_SPECIALTIES = [
  "https://schema.org/Gynecologic",
  "https://schema.org/Obstetric",
] as const;

/** Graph nodes must not repeat @context — only the root document has it. */
function schemaNode<T extends Record<string, unknown>>(node: T): T {
  const { "@context": _removed, ...rest } = node as T & {
    "@context"?: string;
  };
  return rest as T;
}

function entityId(url: string, fragment: string) {
  return `${url.replace(/\/$/, "")}${fragment.startsWith("#") ? fragment : `#${fragment}`}`;
}

function clinicContactPoint() {
  return {
    "@type": "ContactPoint",
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    contactType: "customer service",
    availableLanguage: [...SCHEMA_LANGUAGE_TAGS],
    areaServed: "BG",
  };
}

function clinicAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: "ул. Добрила 10",
    addressLocality: doctor.city,
    addressCountry: "BG",
  };
}

function clinicAggregateRating() {
  return {
    "@type": "AggregateRating",
    ratingValue: doctor.rating.value,
    reviewCount: doctor.rating.count,
    bestRating: 5,
    worstRating: 1,
  };
}

export function schemaLanguage(locale: Locale = "bg") {
  if (locale === "en") return "en";
  if (locale === "es") return "es-ES";
  return "bg-BG";
}

/** Build a JSON-LD @graph document; deduplicates nodes that share the same @id. */
export function buildSchemaGraph(
  ...nodes: Array<object | null | undefined>
) {
  const seen = new Set<string>();
  const graph: object[] = [];

  for (const node of nodes) {
    if (!node) continue;
    const cleaned = schemaNode(node as Record<string, unknown>);
    const id = (cleaned as { "@id"?: string })["@id"];
    if (id) {
      if (seen.has(id)) continue;
      seen.add(id);
    }
    graph.push(cleaned);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getPhysicianSchema() {
  return schemaNode({
    "@type": ["Person", "IndividualPhysician"],
    "@id": PHYSICIAN_ID,
    name: doctor.name,
    alternateName: "Dr. Maria Raykova",
    jobTitle: doctor.specialty,
    description: siteConfig.description,
    medicalSpecialty: [...MEDICAL_SPECIALTIES],
    url: `${siteConfig.url}/za-lekarya`,
    image: `${siteConfig.url}/doctor-about.webp`,
    address: clinicAddress(),
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    knowsLanguage: [...SCHEMA_LANGUAGE_TAGS],
    practicesAt: { "@id": CLINIC_ID },
    aggregateRating: clinicAggregateRating(),
    sameAs: doctorProfiles,
  });
}

/**
 * Canonical clinic / local business entity (single @id).
 * Replaces separate MedicalClinic + LocalBusiness duplicates in @graph.
 */
export function getClinicSchema() {
  return schemaNode({
    "@type": ["MedicalClinic", "MedicalBusiness", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: doctor.clinic.name,
    alternateName: [doctor.name, "Филиал Добрила 10"],
    description: siteConfig.description,
    url: `${siteConfig.url}/kontakti`,
    image: [
      `${siteConfig.url}/clinic-interior.webp`,
      ogImage,
      `${siteConfig.url}/icon-512.png`,
    ],
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    priceRange: "$$",
    address: clinicAddress(),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.clinic.address)}`,
    medicalSpecialty: [...MEDICAL_SPECIALTIES],
    areaServed: {
      "@type": "City",
      name: doctor.city,
    },
    contactPoint: clinicContactPoint(),
    aggregateRating: clinicAggregateRating(),
    member: { "@id": PHYSICIAN_ID },
    sameAs: [bookingProfileUrl],
  });
}

/** @deprecated Use getClinicSchema — kept for call-site compatibility. */
export const getMedicalClinicSchema = getClinicSchema;

/** @deprecated Use getClinicSchema — kept for call-site compatibility. */
export const getLocalBusinessSchema = getClinicSchema;

export function getFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  if (!items.length) return null;

  return schemaNode({
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  inLanguage?: string;
}) {
  return schemaNode({
    "@type": "Article",
    "@id": entityId(article.url, "article"),
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image
      ? article.image.startsWith("http")
        ? article.image
        : `${siteConfig.url}${article.image}`
      : ogImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Person",
      "@id": PHYSICIAN_ID,
      name: doctor.name,
      url: `${siteConfig.url}/za-lekarya`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "MedicalWebPage",
      "@id": article.url,
    },
    inLanguage: article.inLanguage ?? "bg-BG",
  });
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return schemaNode({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  });
}

/** Offer for a published price. Amounts are EUR, VAT-inclusive. */
function priceOffer(item: { name: string; priceEur: string }) {
  return {
    "@type": "Offer",
    name: item.name,
    priceSpecification: {
      "@type": "PriceSpecification",
      price: item.priceEur,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: true,
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": CLINIC_ID },
  };
}

export function getMedicalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  /** ISO-8601 duration, e.g. PT30M */
  timeRequired?: string;
  offers?: Array<{ name: string; priceEur: string }>;
}) {
  return schemaNode({
    "@type": "MedicalProcedure",
    "@id": entityId(service.url, "procedure"),
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.timeRequired
      ? { timeRequired: service.timeRequired }
      : {}),
    ...(service.offers?.length
      ? { offers: service.offers.map(priceOffer) }
      : {}),
    provider: { "@id": PHYSICIAN_ID },
    areaServed: {
      "@type": "City",
      name: doctor.city,
    },
  });
}

/** Full price list as an OfferCatalog so search engines can surface prices. */
export function getOfferCatalogSchema({
  name,
  url,
  items,
}: {
  name: string;
  url: string;
  items: Array<{ name: string; priceEur: string }>;
}) {
  return schemaNode({
    "@type": "OfferCatalog",
    "@id": entityId(url, "pricelist"),
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      ...priceOffer(item),
      position: index + 1,
    })),
  });
}

export function getWebSiteSchema(inLanguage = "bg-BG") {
  return schemaNode({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage,
    publisher: { "@id": PHYSICIAN_ID },
  });
}

/** Generic WebPage / CollectionPage / MedicalWebPage / ContactPage / AboutPage / FAQPage wrapper. */
export function getWebPageSchema({
  name,
  description,
  url,
  inLanguage = "bg-BG",
  type = "WebPage",
}: {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  type?:
    | "WebPage"
    | "CollectionPage"
    | "MedicalWebPage"
    | "ContactPage"
    | "AboutPage"
    | "FAQPage";
}) {
  return schemaNode({
    "@type": type,
    "@id": entityId(url, "webpage"),
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PHYSICIAN_ID },
  });
}

/** ItemList for service catalog / handbook index. */
export function getItemListSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description?: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return schemaNode({
    "@type": "ItemList",
    "@id": entityId(url, "itemlist"),
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description
        ? {
            item: {
              "@type": "Thing",
              name: item.name,
              description: item.description,
              url: item.url,
            },
          }
        : { item: item.url }),
    })),
  });
}

export function JsonLd({ data }: { data: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
