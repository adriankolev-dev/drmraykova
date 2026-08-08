import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { BookCta } from "@/components/booking/BookCta";
import { FAQSection } from "@/components/services/FAQSection";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import {
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";
import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  getWebPageSchema,
  JsonLd,
  schemaLanguage,
} from "@/lib/seo/schema";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllArticles(locale).map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "bg";
  const article = getArticleBySlug(slug, locale);
  if (!article) return {};

  const path =
    locale === "bg"
      ? `/narachnik/${article.slug}`
      : `/${locale}/narachnik/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: path,
      languages: {
        bg: `/narachnik/${article.slug}`,
        en: `/en/narachnik/${article.slug}`,
        es: `/es/narachnik/${article.slug}`,
        "x-default": `/narachnik/${article.slug}`,
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: article.title,
        description: article.excerpt,
        path,
        type: "article",
      }),
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      images: [
        {
          url: article.cover,
          alt: article.coverAlt || article.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();

  const t = await getTranslations("handbook");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const prefix = locale === "bg" ? "" : `/${locale}`;
  const articleUrl = `${siteConfig.url}${prefix}/narachnik/${article.slug}`;
  const related = getAllArticles(locale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const schemaGraph: object[] = [
    getWebPageSchema({
      name: article.title,
      description: article.excerpt,
      url: articleUrl,
      inLanguage: schemaLanguage(locale),
      type: "MedicalWebPage",
    }),
    getArticleSchema({
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      image: article.cover,
      inLanguage: schemaLanguage(locale),
    }),
    getBreadcrumbSchema([
      { name: tn("home"), path: prefix || "/" },
      { name: t("title"), path: `${prefix}/narachnik` },
      {
        name: article.title,
        path: `${prefix}/narachnik/${article.slug}`,
      },
    ]),
  ];

  if (article.faq.length) {
    schemaGraph.push(getFaqSchema(article.faq));
  }

  const publishedLabel = formatArticleDate(article.date, locale);
  const updatedLabel =
    article.updated && article.updated !== article.date
      ? formatArticleDate(article.updated, locale)
      : null;

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": schemaGraph,
        }}
      />
      <article className="container-page max-w-3xl">
        <Reveal>
          <SectionEyebrow>
            <Link href="/narachnik" className="hover:text-foreground">
              {t("eyebrow")}
            </Link>
            {" / "}
            {article.category}
          </SectionEyebrow>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance text-foreground md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {publishedLabel}
            {updatedLabel ? ` · ${t("updated")} ${updatedLabel}` : null}
            {" · "}
            {tc("readingTime", { minutes: article.readingTime })}
            {" · "}
            {doctor.name}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={article.cover}
              alt={article.coverAlt || article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div
            className="article-prose mt-8"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </Reveal>

        {article.faq.length > 0 ? (
          <FAQSection
            heading={t("faqTitle")}
            items={article.faq}
            className="mt-12"
          />
        ) : null}

        <Reveal delay={0.12}>
          {article.closing ? (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
                {t("closingTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {article.closing}
              </p>
            </div>
          ) : null}

          {(article.ctaLead || article.ctaLabel) && (
            <div
              className={`${article.closing ? "mt-8" : "mt-12"} rounded-lg border border-border/80 bg-card/70 px-5 py-6 sm:px-6`}
            >
              {article.ctaLead ? (
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {article.ctaLead}
                </p>
              ) : null}
              <div className={article.ctaLead ? "mt-5" : undefined}>
                <BookCta
                  label={article.ctaLabel}
                  utmCampaign={`article-${article.slug}`}
                />
              </div>
            </div>
          )}

          {!article.ctaLead && !article.ctaLabel ? (
            <div className="mt-10">
              <BookCta utmCampaign={`article-${article.slug}`} />
            </div>
          ) : null}

          <div className="mt-10 rounded-md border border-border/70 bg-card/60 px-5 py-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              {t("authorLabel")}
            </p>
            <p className="mt-2 font-display text-xl font-medium tracking-tight text-foreground">
              {doctor.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("authorRole")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <Link
                href="/za-lekarya"
                className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {t("aboutDoctor")}
              </Link>
            </p>
          </div>

          <p className="mt-6 rounded-md bg-accent px-5 py-4 text-sm text-muted-foreground">
            {t("disclaimer")}
          </p>
        </Reveal>

        {article.sources.length > 0 ? (
          <Reveal delay={0.13} className="mt-12">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
              {t("sourcesTitle")}
            </h2>
            <ul className="sources-list mt-5">
              {article.sources.map((source) => (
                <li key={`${source.org}-${source.url}`}>
                  <span className="source-org">{source.org}</span>
                  <a
                    href={source.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {related.length > 0 ? (
          <Reveal delay={0.14} className="mt-12">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
              {t("relatedTitle")}
            </h2>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/narachnik/${item.slug}`}
                    className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-medium text-foreground underline-offset-4 group-hover:underline group-hover:decoration-primary/50">
                      {item.title}
                    </span>
                    <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {item.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </article>
    </main>
  );
}
