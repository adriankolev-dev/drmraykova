import { siteConfig } from "@/lib/site";

/** Shared SEO helpers for consistent page metadata. */
export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function pageOpenGraph({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    type,
    locale: siteConfig.locale,
    siteName: siteConfig.shortName,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  };
}
