import type { Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";
import { bookingConfig } from "@/lib/booking";

const ogImage = `${siteConfig.url}/og.png`;
const bookingProfileUrl = bookingConfig.url.replace(/\?.*$/, "");
/** Профили на лекаря — клиниката е отделен субект и не ги наследява. */
const doctorProfiles = [
  bookingProfileUrl,
  doctor.social.instagram.url,
  doctor.social.facebook.url,
];


export function schemaLanguage(locale: Locale = "bg") {
  if (locale === "en") return "en";
  if (locale === "es") return "es-ES";
  return "bg-BG";
}

export function getPhysicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${siteConfig.url}/#physician`,
    name: doctor.name,
    alternateName: "Dr. Maria Raykova",
    description: siteConfig.description,
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    url: `${siteConfig.url}/za-lekarya`,
    image: `${siteConfig.url}/icon-512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Добрила 10",
      addressLocality: doctor.city,
      addressCountry: "BG",
    },
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    availableLanguage: [...doctor.languages],
    knowsLanguage: [...doctor.languages],
    worksFor: {
      "@type": "MedicalClinic",
      "@id": `${siteConfig.url}/#clinic`,
      name: doctor.clinic.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: doctor.rating.value,
      reviewCount: doctor.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: doctorProfiles,
  };
}

export function getMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteConfig.url}/#clinic`,
    name: doctor.clinic.name,
    url: `${siteConfig.url}/kontakti`,
    image: `${siteConfig.url}/icon-512.png`,
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Добрила 10",
      addressLocality: "София",
      addressCountry: "BG",
    },
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    areaServed: {
      "@type": "City",
      name: "София",
    },
    employee: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
    sameAs: [bookingProfileUrl],
  };
}

/** LocalBusiness + MedicalBusiness for local SEO (maps, NAP consistency). */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "MedicalClinic"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: doctor.name,
    alternateName: doctor.clinic.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: [ogImage, `${siteConfig.url}/icon-512.png`],
    telephone: doctor.clinic.phoneHref.replace("tel:", ""),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Добрила 10",
      addressLocality: doctor.city,
      addressCountry: "BG",
    },
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    areaServed: {
      "@type": "City",
      name: doctor.city,
    },
    availableLanguage: [...doctor.languages],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: doctor.rating.value,
      reviewCount: doctor.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: doctorProfiles,
    employee: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
  };
}

export function getFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${article.url}#article`,
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
      "@id": `${siteConfig.url}/#physician`,
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
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
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
    seller: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${service.url}#procedure`,
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.timeRequired
      ? { timeRequired: service.timeRequired }
      : {}),
    ...(service.offers?.length
      ? { offers: service.offers.map(priceOffer) }
      : {}),
    provider: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
      url: `${siteConfig.url}/za-lekarya`,
    },
    areaServed: {
      "@type": "City",
      name: doctor.city,
    },
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#pricelist`,
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      ...priceOffer(item),
      position: index + 1,
    })),
  };
}

export function getWebSiteSchema(inLanguage = "bg-BG") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage,
    publisher: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
  };
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
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
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
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
