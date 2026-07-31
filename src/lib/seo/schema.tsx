import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";
import { bookingConfig } from "@/lib/booking";

const ogImage = `${siteConfig.url}/og.png`;

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
    sameAs: [bookingConfig.url.replace(/\?.*$/, "")],
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
    sameAs: [bookingConfig.url.replace(/\?.*$/, "")],
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
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
      "@type": "WebPage",
      "@id": article.url,
    },
    inLanguage: "bg-BG",
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

export function getMedicalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.description,
    url: service.url,
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

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "bg-BG",
    publisher: {
      "@type": "Physician",
      "@id": `${siteConfig.url}/#physician`,
      name: doctor.name,
    },
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
