import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { ClinicRule } from "@/components/brand/ClinicMotifs";
import { ContentText } from "@/components/content/ContentText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { PriceTable } from "@/components/pricing/PriceTable";
import { AppointmentCTA } from "@/components/services/AppointmentCTA";
import { FAQSection } from "@/components/services/FAQSection";
import { Link } from "@/i18n/navigation";
import {
  getPriceItem,
  insurers,
  PRICES_LAST_UPDATED,
  PRICES_SOURCE,
  PRICES_YEAR,
} from "@/content/pricing";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { localeOpenGraph } from "@/lib/navigation";
import { eurAmount, formatBgn, formatEur, getAllPrices } from "@/lib/pricing";
import { pageOpenGraph, pageTwitter } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  getBreadcrumbSchema,
  getClinicSchema,
  getFaqSchema,
  getOfferCatalogSchema,
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
  const path = locale === "bg" ? "/tseni" : `/${locale}/tseni`;
  const title = t("pricingTitle");
  const description = t("pricingDescription");

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        bg: "/tseni",
        en: "/en/tseni",
        es: "/es/tseni",
        "x-default": "/tseni",
      },
    },
    openGraph: {
      ...pageOpenGraph({ title, description, path }),
      locale: localeOpenGraph[locale],
    },
    twitter: pageTwitter({ title, description }),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("pricing");
  const names = await getTranslations("pricing.items");
  const tc = await getTranslations("common");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const pageUrl = `${siteConfig.url}${prefix}/tseni`;
  const prices = getAllPrices();
  const offerItems = prices.map((item) => ({
    name: names(item.id),
    priceEur: eurAmount(item.eur),
  }));

  const listedPrice = (id: string) => {
    const item = getPriceItem(id);
    if (!item) return "";
    return `${formatEur(item.eur, raw)} (${formatBgn(item.eur, raw)})`;
  };

  const priceVars = {
    year: PRICES_YEAR,
    count: insurers.length,
    clinic: doctor.clinic.name,
    address: doctor.clinic.address,
    phone: doctor.clinic.phoneDisplay,
    primaryPrice: listedPrice("pervichen-pregled"),
    papPrice: listedPrice("tsitonamazka"),
    microPrice: listedPrice("vlagalishten-sekret"),
    date: PRICES_LAST_UPDATED,
    source: PRICES_SOURCE,
  };

  const faqs = (t.raw("faqs") as unknown[]).map((_, index) => ({
    question: t(`faqs.${index}.question`, priceVars),
    answer: t(`faqs.${index}.answer`, priceVars),
  }));

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={buildSchemaGraph(
          getWebPageSchema({
            name: t("title"),
            description: t("lead", {
              count: insurers.length,
              year: PRICES_YEAR,
            }),
            url: pageUrl,
            inLanguage: schemaLanguage(raw),
          }),
          getOfferCatalogSchema({
            name: t("title"),
            url: pageUrl,
            items: offerItems,
          }),
          getBreadcrumbSchema([
            { name: t("breadcrumbHome"), path: prefix || "/" },
            { name: t("eyebrow"), path: `${prefix}/tseni` },
          ]),
          getFaqSchema(faqs),
          getClinicSchema(),
        )}
      />

      {/* Hero — deliberately compact so the table is visible without scrolling */}
      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("lead", { count: insurers.length, year: PRICES_YEAR })}
          </p>
        </Reveal>
      </div>

      {/* Price list */}
      <div className="container-page mt-10">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div>
            <PriceTable items={prices} />
            <p className="mt-5 rounded-md border border-border bg-secondary/50 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/85">
              {t("sourceNote", {
                date: PRICES_LAST_UPDATED,
                source: PRICES_SOURCE,
              })}
            </p>
          </div>

          <aside className="lg:pt-6">
            <p className="max-w-md text-muted-foreground">{t("intro")}</p>
            <ClinicRule className="mt-6 max-w-[8rem]" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <BookCta utmCampaign="pricing-page" variant="superdoc" />
              <a
                href={doctor.clinic.phoneHref}
                className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-7 text-base font-medium transition-colors hover:bg-accent"
              >
                {doctor.clinic.phoneDisplay}
              </a>
            </div>
          </aside>
        </Reveal>
      </div>

      {/* NHIF */}
      <section id="nzok" className="container-page mt-16">
        <Reveal className="rounded-lg border border-border bg-secondary/30 p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-clinical">
            {t("nhifEyebrow", { year: PRICES_YEAR })}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("nhifHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("nhifLead", priceVars)}
          </p>

          <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
            {t("nhifPrimaryHeading", { year: PRICES_YEAR })}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">
            {t("nhifPrimaryBody", priceVars)}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/uslugi/profilaktichen-ginekologichen-pregled"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t("nhifServicesLink")}
            </Link>
            <Link
              href="/uslugi/akushero-ginekologichni-pregledi"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t("nhifPrimaryLink")}
            </Link>
          </p>

          <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
            {t("nhifReferralHeading")}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">
            <ContentText text={t("nhifReferralBody", priceVars)} />
          </p>

          <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
            {t("nhifCopayHeading")}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">
            {t("nhifCopayBody", priceVars)}
          </p>

          <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
            {t("nhifIncludedHeading")}
          </h3>
          <ul className="mt-4 max-w-2xl space-y-3">
            {(t.raw("nhifIncludedItems") as string[]).map((item) => (
              <li
                key={item}
                className="flex gap-3 text-foreground/80 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']"
              >
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("nhifNote", {
              date: PRICES_LAST_UPDATED,
              source: PRICES_SOURCE,
            })}
          </p>
        </Reveal>
      </section>

      {/* Insurers — compact chips, high trust per pixel */}
      <section className="container-page mt-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-clinical">
            {t("insurersHeading")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("insurersLead")}
          </h2>
        </Reveal>
        <RevealGroup className="mt-6 flex flex-wrap gap-2">
          {insurers.map((insurer) => (
            <RevealItem key={insurer}>
              <span className="inline-flex rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground/80">
                {insurer}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("insurersNote")}
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-page mt-16">
        <FAQSection heading={t("faqHeading")} items={faqs} />
      </section>

      <div className="container-page">
        <AppointmentCTA
          heading={t("ctaHeading")}
          lead={t("ctaLead")}
          eyebrow={tc("bookingViaSuperdoc")}
          utmCampaign="pricing-page-cta"
        />
      </div>
    </main>
  );
}
