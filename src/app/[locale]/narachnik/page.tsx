import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  formatArticleDate,
  getAllArticles,
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
  const tn = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const articles = getAllArticles(locale);
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const pageUrl = `${siteConfig.url}${prefix}/narachnik`;
  const meta = await getTranslations({ locale: raw, namespace: "meta" });

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
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t("lead")}
          </p>
          <div className="mt-8">
            <BookCta utmCampaign="handbook-index" />
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <RevealItem key={article.slug}>
              <Link
                href={`/narachnik/${article.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-background transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/45"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Image
                    src={article.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {article.category} ·{" "}
                    {formatArticleDate(article.date, locale)}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </main>
  );
}
