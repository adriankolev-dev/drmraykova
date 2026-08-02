import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { AppointmentCTA } from "@/components/services/AppointmentCTA";
import { FAQSection } from "@/components/services/FAQSection";
import { ServicesEditorialList } from "@/components/services/ServicesEditorialList";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { localeOpenGraph } from "@/lib/navigation";
import {
  SERVICE_CATEGORIES,
  type ServiceCategoryId,
} from "@/lib/services-catalog";
import { pageOpenGraph, pageTwitter } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getItemListSchema,
  getLocalBusinessSchema,
  getWebPageSchema,
  JsonLd,
  schemaLanguage,
} from "@/lib/seo/schema";
import { doctor } from "@/lib/doctor";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/uslugi" : `/${locale}/uslugi`;
  const title = t("servicesTitle");
  const description = t("servicesDescription");
  return {
    title,
    description,
    keywords: [...doctor.services.map((s) => s.title), locale === "bg" ? "гинеколог София" : "gynecologist Sofia"],
    alternates: {
      canonical: path,
      languages: {
        bg: "/uslugi",
        en: "/en/uslugi",
        es: "/es/uslugi",
        "x-default": "/uslugi",
      },
    },
    openGraph: {
      ...pageOpenGraph({ title, description, path }),
      locale: localeOpenGraph[locale],
    },
    twitter: pageTwitter({ title, description }),
  };
}

export default async function ServicesIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("servicesPage");
  const blurbs = await getTranslations("serviceBlurbs");
  const includes = await getTranslations("serviceIncludes");
  const suitable = await getTranslations("serviceSuitable");
  const names = await getTranslations("serviceNames");
  const tc = await getTranslations("common");
  const tw = await getTranslations("why");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const whyItems = tw.raw("items") as Array<{ title: string; body: string }>;
  const howSteps = t.raw("howSteps") as string[];
  const faqs = t.raw("faqs") as Array<{ question: string; answer: string }>;
  const categoryTitles = t.raw("categories") as Record<ServiceCategoryId, string>;
  const categoryLeads = t.raw("categoryLeads") as Record<
    ServiceCategoryId,
    string
  >;
  const pageUrl = `${siteConfig.url}${prefix}/uslugi`;
  const serviceListItems = doctor.services.map((service) => ({
    name: names(service.slug),
    description: blurbs(service.slug),
    url: `${siteConfig.url}${prefix}/uslugi/${service.slug}`,
  }));

  let serviceIndex = 0;
  const categorizedServices = SERVICE_CATEGORIES.map((category) => ({
    ...category,
    services: category.slugs.map((slug) => {
      serviceIndex += 1;
      return {
        slug,
        title: names(slug),
        description: blurbs(slug),
        includes: includes(slug),
        suitable: suitable(slug),
        index: serviceIndex,
      };
    }),
  }));

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getWebPageSchema({
              name: t("title"),
              description: t("lead"),
              url: pageUrl,
              inLanguage: schemaLanguage(raw),
              type: "CollectionPage",
            }),
            getItemListSchema({
              name: t("title"),
              description: t("lead"),
              url: pageUrl,
              items: serviceListItems,
            }),
            getBreadcrumbSchema([
              {
                name: t("breadcrumbHome"),
                path: prefix || "/",
              },
              { name: t("eyebrow"), path: `${prefix}/uslugi` },
            ]),
            getFaqSchema(faqs),
            getLocalBusinessSchema(),
          ],
        }}
      />

      {/* Hero */}
      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("lead")}
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("intro")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookCta utmCampaign="services-index" />
            <a
              href="#uslugi-katalog"
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t("browseCatalog")}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Editorial service catalog */}
      <div id="uslugi-katalog" className="container-page mt-16 scroll-mt-28">
        {categorizedServices.map((category) => (
          <section key={category.id} className="mt-6 first:mt-0 md:mt-10">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {categoryTitles[category.id]}
              </p>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {categoryLeads[category.id]}
              </p>
            </Reveal>
            <ServicesEditorialList
              services={category.services}
              ctaLabel={t("cardCta")}
            />
          </section>
        ))}
      </div>

      {/* Why choose */}
      <section className="container-page mt-20">
        <Reveal>
          <SectionEyebrow>{t("whyEyebrow")}</SectionEyebrow>
          <SectionHeading title={t("whyTitle")} className="mt-4" />
          <p className="mt-3 max-w-xl text-muted-foreground">{t("whyLead")}</p>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {whyItems.map((item, index) => (
            <RevealItem key={item.title}>
              <p className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                <SuperdocText text={item.body} utmCampaign="services-why" />
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* How consultations work */}
      <section className="container-page mt-20">
        <Reveal>
          <SectionEyebrow>{t("howEyebrow")}</SectionEyebrow>
          <SectionHeading title={t("howTitle")} className="mt-4" />
          <p className="mt-3 max-w-xl text-muted-foreground">{t("howLead")}</p>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((step, index) => (
            <RevealItem key={step}>
              <p className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <SuperdocText text={step} utmCampaign="services-how" />
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          {tc("importantScope")}
        </p>
      </section>

      {/* FAQ */}
      <section className="container-page mt-20">
        <FAQSection heading={t("faqHeading")} items={faqs} />
      </section>

      {/* Appointment CTA */}
      <div className="container-page mt-16">
        <AppointmentCTA
          heading={t("ctaHeading")}
          lead={t("ctaLead")}
          eyebrow={tc("bookingViaSuperdoc")}
          utmCampaign="services-index-cta"
        />
      </div>
    </main>
  );
}
