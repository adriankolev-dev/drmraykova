import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ServicePriceBlock } from "@/components/pricing/ServicePriceBlock";
import { AppointmentCTA } from "@/components/services/AppointmentCTA";
import { FAQSection } from "@/components/services/FAQSection";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceHero } from "@/components/services/ServiceHero";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  getServiceBySlug,
  getServicesContent,
} from "@/content/services.i18n";
import { localeOpenGraph } from "@/lib/navigation";
import {
  eurAmount,
  getPricesForService,
  hasListedPrice,
} from "@/lib/pricing";
import {
  getRelatedServiceSlugs,
  getServiceDuration,
  SERVICES_LAST_UPDATED,
} from "@/lib/services-catalog";
import { pageOpenGraph, pageTwitter } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getItemListSchema,
  getMedicalServiceSchema,
  getPhysicianSchema,
  getWebPageSchema,
  JsonLd,
  schemaLanguage,
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
    twitter: pageTwitter({
      title: service.seoTitle,
      description: service.seoDescription,
    }),
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
  const blurbs = await getTranslations("serviceBlurbs");
  const names = await getTranslations("serviceNames");
  const priceNames = await getTranslations("pricing.items");
  const tsp = await getTranslations("servicesPage");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const serviceUrl = `${siteConfig.url}${prefix}/uslugi/${service.slug}`;

  const related = getRelatedServiceSlugs(service.slug).map((relatedSlug) => ({
    slug: relatedSlug,
    title: names(relatedSlug),
    description: blurbs(relatedSlug),
  }));

  const serviceOffers = hasListedPrice(service.slug)
    ? getPricesForService(service.slug).map((item) => ({
        name: priceNames(item.id),
        priceEur: eurAmount(item.eur),
      }))
    : undefined;

  const updatedLabel = new Intl.DateTimeFormat(
    raw === "bg" ? "bg-BG" : raw === "es" ? "es-ES" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(new Date(SERVICES_LAST_UPDATED));

  return (
    <main className="section-space">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getWebPageSchema({
              name: service.title,
              description: service.seoDescription,
              url: serviceUrl,
              inLanguage: schemaLanguage(raw),
              type: "MedicalWebPage",
            }),
            getMedicalServiceSchema({
              name: service.title,
              description: service.seoDescription,
              url: serviceUrl,
              timeRequired: getServiceDuration(service.slug)?.isoMin,
              offers: serviceOffers,
            }),
            getPhysicianSchema(),
            getFaqSchema(service.faqs),
            getItemListSchema({
              name: t("relatedHeading"),
              description: t("relatedLead"),
              url: `${serviceUrl}#related`,
              items: related.map((item) => ({
                name: item.title,
                description: item.description,
                url: `${siteConfig.url}${prefix}/uslugi/${item.slug}`,
              })),
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
        <ServiceHero
          title={service.title}
          intro={service.intro}
          breadcrumbServices={t("breadcrumbServices")}
          withDoctor={t("withDoctor", { name: th("brand"), city: tc("city") })}
          utmCampaign={`service-${service.slug}`}
        />

        <ServicePriceBlock slug={service.slug} />

        <Reveal delay={0.05}>
          <h2 className="mt-14 font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("suitableHeading")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {service.suitableFor}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-14 font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("importanceHeading")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("importanceLead")}
          </p>
          <ul className="mt-6 space-y-3">
            {(t.raw("importancePoints") as string[]).map((point) => (
              <li
                key={point}
                className="flex gap-3 text-muted-foreground before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']"
              >
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ProcessTimeline
          heading={t("visitHeading")}
          steps={service.visitSteps}
          stepLabel={(n) => tc("step", { n })}
          notes={service.notes}
        />

        <div className="mt-14">
          <FAQSection heading={t("faqHeading")} items={service.faqs} />
        </div>

        <RelatedServices
          heading={t("relatedHeading")}
          lead={t("relatedLead")}
          services={related}
          ctaLabel={t("relatedCta")}
          categoryLabels={tsp.raw("categories") as Record<string, string>}
        />

        <AppointmentCTA
          heading={t("bookHeading", { service: service.title })}
          lead={t("bookLead")}
          eyebrow={tc("bookingViaSuperdoc")}
          utmCampaign={`service-${service.slug}-cta`}
        />

        <footer className="mt-12 space-y-3 border-t border-border pt-8 text-sm text-muted-foreground">
          <p>
            {t("lastUpdated", { date: updatedLabel })}
          </p>
          <p>{t("disclaimer")}</p>
          <p>
            <Link href="/uslugi" className="underline-offset-4 hover:underline">
              {t("backToServices")}
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
