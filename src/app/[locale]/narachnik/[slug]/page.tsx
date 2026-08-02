import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { BookCta } from "@/components/booking/BookCta";
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
      images: [
        {
          url: article.cover,
          alt: article.title,
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

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
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
          ],
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
            {formatArticleDate(article.date, locale)} ·{" "}
            {tc("readingTime", { minutes: article.readingTime })} ·{" "}
            {doctor.name}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={article.cover}
              alt=""
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

        <Reveal delay={0.12}>
          <p className="mt-10 rounded-md bg-accent px-5 py-4 text-sm text-muted-foreground">
            {t("disclaimer")}
          </p>
          <div className="mt-8">
            <BookCta utmCampaign={`article-${article.slug}`} />
          </div>
        </Reveal>
      </article>
    </main>
  );
}
