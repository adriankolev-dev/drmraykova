import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  getServiceBySlug,
  getServicesContent,
} from "@/content/services.i18n";
import { doctor } from "@/lib/doctor";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getMedicalServiceSchema,
  JsonLd,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getServicesContent(locale).map((service) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const service = getServiceBySlug(slug, locale);
  if (!service) return {};

  const path =
    locale === "bg"
      ? `/uslugi/${service.slug}`
      : `/${locale}/uslugi/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: path,
      languages: {
        bg: `/uslugi/${service.slug}`,
        en: `/en/uslugi/${service.slug}`,
        es: `/es/uslugi/${service.slug}`,
        "x-default": `/uslugi/${service.slug}`,
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: service.seoTitle,
        description: service.seoDescription,
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  setRequestLocale(raw);
  const service = getServiceBySlug(slug, raw);
  if (!service) notFound();

  const t = await getTranslations("servicePage");
  const th = await getTranslations("hero");
  const tc = await getTranslations("common");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const serviceUrl = `${siteConfig.url}${prefix}/uslugi/${service.slug}`;

  return (
    <main className="section-space">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getFaqSchema(service.faqs),
            getMedicalServiceSchema({
              name: service.title,
              description: service.seoDescription,
              url: serviceUrl,
            }),
            getBreadcrumbSchema([
              { name: t("breadcrumbHome"), path: prefix || "/" },
              { name: t("breadcrumbServices"), path: `${prefix}/uslugi` },
              {
                name: service.title,
                path: `${prefix}/uslugi/${service.slug}`,
              },
            ]),
          ],
        }}
      />
      <div className="container-page max-w-3xl">
        <Reveal>
          <SectionEyebrow>
            <Link href="/uslugi" className="hover:text-foreground">
              {t("breadcrumbServices")}
            </Link>
            {" / "}
            {service.title}
          </SectionEyebrow>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {service.intro}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t("withDoctor", { name: th("brand"), city: tc("city") })}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-12 font-display text-2xl font-medium">
            {t("suitableHeading")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {service.suitableFor}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-12 font-display text-2xl font-medium">
            {t("visitHeading")}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
            {service.visitSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {service.notes?.length ? (
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {service.notes.map((note) => (
                <li key={note}>— {note}</li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-12 font-display text-2xl font-medium">
            {t("faqHeading")}
          </h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {service.faqs.map((item) => (
              <div key={item.question} className="py-5">
                <h3 className="font-medium text-foreground">{item.question}</h3>
                <p className="mt-2 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-lg bg-primary px-8 py-10 text-primary-foreground">
            <p className="font-display text-2xl font-medium">
              {t("bookHeading", { service: service.title })}
            </p>
            <p className="mt-2 text-primary-foreground/80">{t("bookLead")}</p>
            <div className="mt-6">
              <BookCta
                variant="ink"
                utmCampaign={`service-${service.slug}`}
                className="bg-ink text-ink-foreground hover:bg-ink/90"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
