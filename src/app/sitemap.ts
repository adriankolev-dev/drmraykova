import type { MetadataRoute } from "next";
import { NHIF_CONFIRMED_ON, PRICES_LAST_UPDATED } from "@/content/pricing";
import { getAllArticles } from "@/lib/articles";
import { doctor } from "@/lib/doctor";
import { SERVICES_LAST_UPDATED } from "@/lib/services-catalog";
import { siteConfig } from "@/lib/site";
import { locales, type Locale } from "@/i18n/routing";

function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path;
  if (locale === "bg") return `${siteConfig.url}${normalized || ""}`;
  return `${siteConfig.url}/${locale}${normalized}`;
}

type Entry = { path: string; lastModified: string; priority: number };

/**
 * Real content dates — a build timestamp on every URL is a signal search
 * engines learn to ignore.
 */
function entriesForLocale(locale: Locale): Entry[] {
  const services = doctor.services.map((service) => ({
    path: `/uslugi/${service.slug}`,
    lastModified: SERVICES_LAST_UPDATED,
    priority: 0.8,
  }));

  const articles = getAllArticles(locale).map((article) => ({
    path: `/narachnik/${article.slug}`,
    lastModified: article.updated ?? article.date,
    priority: 0.6,
  }));

  /** Newest content date across the section, for its hub page. */
  const newest = (items: Entry[], fallback: string) =>
    items.reduce((max, item) => (item.lastModified > max ? item.lastModified : max), fallback);

  return [
    { path: "/", lastModified: newest([...services, ...articles], SERVICES_LAST_UPDATED), priority: 1 },
    { path: "/uslugi", lastModified: newest(services, SERVICES_LAST_UPDATED), priority: 0.9 },
    { path: "/tseni", lastModified: PRICES_LAST_UPDATED, priority: 0.9 },
    { path: "/tseni/nzok", lastModified: NHIF_CONFIRMED_ON, priority: 0.9 },
    { path: "/kontakti", lastModified: SERVICES_LAST_UPDATED, priority: 0.9 },
    { path: "/za-lekarya", lastModified: SERVICES_LAST_UPDATED, priority: 0.8 },
    ...services,
    { path: "/narachnik", lastModified: newest(articles, SERVICES_LAST_UPDATED), priority: 0.7 },
    ...articles,
    { path: "/vaprosi", lastModified: SERVICES_LAST_UPDATED, priority: 0.6 },
    { path: "/politika-za-poveritelnost", lastModified: SERVICES_LAST_UPDATED, priority: 0.2 },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    entriesForLocale(locale).map(({ path, lastModified, priority }) => ({
      url: localizedPath(locale, path),
      lastModified: new Date(lastModified),
      changeFrequency: (path.startsWith("/narachnik/")
        ? "monthly"
        : "weekly") as "monthly" | "weekly",
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, localizedPath(l, path)]),
          ),
          "x-default": localizedPath("bg", path),
        },
      },
    })),
  );
}
