import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { HandbookBlogExplorer } from "@/components/handbook/HandbookBlogExplorer";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  formatArticleDate,
  getAllArticles,
  getArticleCategories,
} from "@/lib/articles";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getItemListSchema,
  getWebPageSchema,
  JsonLd,
  schemaLanguage,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/narachnik" : `/${locale}/narachnik`;
  return {
    title: t("handbookTitle"),
    description: t("handbookDescription"),
    alternates: {
      canonical: path,
      languages: {
        bg: "/narachnik",
        en: "/en/narachnik",
        es: "/es/narachnik",
        "x-default": "/narachnik",
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: t("handbookTitle"),
        description: t("handbookDescription"),
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function HandbookPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("handbook");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const articles = getAllArticles(locale);
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const pageUrl = `${siteConfig.url}${prefix}/narachnik`;
  const meta = await getTranslations({ locale: raw, namespace: "meta" });

  const blogArticles = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    dateLabel: formatArticleDate(article.date, locale),
    cover: article.cover,
    coverAlt: article.coverAlt,
    readingTimeLabel: tc("readingTime", { minutes: article.readingTime }),
  }));

  const categoryNames = getArticleCategories(locale).slice(1);
  const categories = categoryNames.map((name) => ({
    name,
    count: articles.filter((a) => a.category === name).length,
  }));

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getWebPageSchema({
              name: t("title"),
              description: meta("handbookDescription"),
              url: pageUrl,
              inLanguage: schemaLanguage(raw),
              type: "CollectionPage",
            }),
            getItemListSchema({
              name: t("title"),
              description: t("lead"),
              url: pageUrl,
              items: articles.map((article) => ({
                name: article.title,
                description: article.excerpt,
                url: `${siteConfig.url}${prefix}/narachnik/${article.slug}`,
              })),
            }),
            getBreadcrumbSchema([
              { name: tn("home"), path: prefix || "/" },
              { name: t("title"), path: `${prefix}/narachnik` },
            ]),
          ],
        }}
      />
      <div className="container-page">
        <Reveal>
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: tn("home"), href: "/" },
              { label: t("title") },
            ]}
          />
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t("lead")}
          </p>
          <div className="mt-8">
            <BookCta variant="superdoc" utmCampaign="handbook-index" />
          </div>
        </Reveal>

        <HandbookBlogExplorer
          articles={blogArticles}
          categories={categories}
          labels={{
            filterAll: tc("allCategories"),
            categoriesLabel: t("categoriesLabel"),
            articlesLabel: t("articlesLabel"),
            noResults: t("noResults"),
            clearFilters: t("clearFilters"),
          }}
        />
      </div>
    </main>
  );
}
