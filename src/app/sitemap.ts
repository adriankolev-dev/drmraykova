import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";
import { locales, type Locale } from "@/i18n/routing";

function localizedPath(locale: Locale, path: string) {
  const normalized = path === "/" ? "" : path;
  if (locale === "bg") return `${siteConfig.url}${normalized || ""}`;
  return `${siteConfig.url}/${locale}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => {
    const paths = [
      "",
      "/za-lekarya",
      "/uslugi",
      "/kontakti",
      "/narachnik",
      "/vaprosi",
      "/politika-za-poveritelnost",
      ...doctor.services.map((s) => `/uslugi/${s.slug}`),
      ...getAllArticles(locale).map((a) => `/narachnik/${a.slug}`),
    ];

    return paths.map((path) => ({
      url: localizedPath(locale, path || "/"),
      lastModified,
      changeFrequency: (path.includes("/narachnik/")
        ? "monthly"
        : "weekly") as "monthly" | "weekly",
      priority:
        path === "" || path === "/"
          ? 1
          : path.startsWith("/uslugi/")
            ? 0.75
            : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localizedPath(l, path || "/")]),
        ),
      },
    }));
  });
}
