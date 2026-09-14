import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPinned, Phone } from "lucide-react";
import { BookCta } from "@/components/booking/BookCta";
import { ClinicRule } from "@/components/brand/ClinicMotifs";
import { ContentText } from "@/components/content/ContentText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { AppointmentCTA } from "@/components/services/AppointmentCTA";
import { FAQSection } from "@/components/services/FAQSection";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  getPriceItem,
  NHIF_CONFIRMED_ON,
  NHIF_CONSUMER_FEE_EUR,
  NHIF_CONSUMER_FEE_PENSIONER_EUR,
  NHIF_COVERED_SERVICE_SLUGS,
} from "@/content/pricing";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { localeOpenGraph } from "@/lib/navigation";
import { formatBgn, formatEur } from "@/lib/pricing";
import { pageOpenGraph, pageTwitter } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  getBreadcrumbSchema,
  getClinicSchema,
  getFaqSchema,
  getWebPageSchema,
  JsonLd,
  schemaLanguage,
} from "@/lib/seo/schema";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/tseni/nzok" : `/${locale}/tseni/nzok`;
  const title = t("nhifTitle");
  const description = t("nhifDescription");

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        bg: "/tseni/nzok",
        en: "/en/tseni/nzok",
        es: "/es/tseni/nzok",
        "x-default": "/tseni/nzok",
      },
    },
    openGraph: {
      ...pageOpenGraph({ title, description, path }),
      locale: localeOpenGraph[locale],
    },
    twitter: pageTwitter({ title, description }),
  };
}

export default async function NhifPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("nhifPage");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const names = await getTranslations("serviceNames");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const pageUrl = `${siteConfig.url}${prefix}/tseni/nzok`;

  const listedPrice = (id: string) => {
    const item = getPriceItem(id);
    if (!item) return "";
    return `${formatEur(item.eur, raw)} (${formatBgn(item.eur, raw)})`;
  };

  /** Every figure below traces back to `src/content/pricing.ts`. */
  const vars = {
    fee: `${formatEur(NHIF_CONSUMER_FEE_EUR, raw)} (${formatBgn(NHIF_CONSUMER_FEE_EUR, raw)})`,
    feePensioner: `${formatEur(NHIF_CONSUMER_FEE_PENSIONER_EUR, raw)} (${formatBgn(NHIF_CONSUMER_FEE_PENSIONER_EUR, raw)})`,
    micro: listedPrice("vlagalishten-sekret"),
    pap: listedPrice("tsitonamazka"),
    clinic: doctor.clinic.name,
    address: doctor.clinic.address,
    phone: doctor.clinic.phoneDisplay,
    date: NHIF_CONFIRMED_ON,
  };

  const faqs = (t.raw("faqs") as unknown[]).map((_, index) => ({
    question: t(`faqs.${index}.question`, vars),
    answer: t(`faqs.${index}.answer`, vars),
  }));

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={buildSchemaGraph(
          getWebPageSchema({
            name: t("title"),
            description: t("lead", vars),
            url: pageUrl,
            inLanguage: schemaLanguage(raw),
            type: "MedicalWebPage",
          }),
          getBreadcrumbSchema([
            { name: tn("home"), path: prefix || "/" },
            { name: t("breadcrumbPricing"), path: `${prefix}/tseni` },
            { name: t("eyebrow"), path: `${prefix}/tseni/nzok` },
          ]),
          getFaqSchema(faqs),
          getClinicSchema(),
        )}
      />

      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("lead", vars)}
          </p>
        </Reveal>
      </div>

      {/* The fee is the answer people search for — give it its own surface. */}
      <section className="container-page mt-10">
        <Reveal className="rounded-lg border border-border bg-secondary/30 p-6 md:p-8">
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("feeHeading")}
          </h2>
          <p className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {vars.fee}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("feeBody", vars)}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("feeNote")}
          </p>

          <ClinicRule className="mt-7 max-w-[8rem]" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookCta utmCampaign="nhif-page" variant="superdoc" />
            <a
              href={doctor.clinic.phoneHref}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Phone />
              {doctor.clinic.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="container-page mt-16">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("coveredHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("coveredLead")}
          </p>
          <ul className="mt-5 max-w-2xl space-y-3">
            {NHIF_COVERED_SERVICE_SLUGS.map((slug) => (
              <li
                key={slug}
                className="flex gap-3 text-foreground/80 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']"
              >
                <Link
                  href={`/uslugi/${slug}`}
                  className="font-medium leading-relaxed text-foreground underline-offset-4 hover:underline"
                >
                  {names(slug)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("coveredNote")}
          </p>
        </Reveal>
      </section>

      <section className="container-page mt-14">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("referralHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            <ContentText text={t("referralBody")} />
          </p>
        </Reveal>
      </section>

      <section className="container-page mt-14">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("copayHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("copayBody", vars)}
          </p>
          <Link
            href="/tseni"
            className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("otherPrices")} →
          </Link>
        </Reveal>
      </section>

      <section className="container-page mt-14">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("whereHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("whereBody", vars)}
          </p>
          <Link
            href="/kontakti"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-5",
            )}
          >
            <MapPinned />
            {t("whereLink")}
          </Link>
        </Reveal>
      </section>

      <section className="container-page mt-14">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t("bookHeading")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
            {t("bookBody", vars)}
          </p>
          <p className="mt-6 max-w-2xl rounded-md border border-border bg-secondary/50 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/85">
            {t("sourceNote", vars)}
          </p>
        </Reveal>
      </section>

      <section className="container-page mt-16">
        <FAQSection heading={t("faqHeading")} items={faqs} />
      </section>

      <div className="container-page">
        <AppointmentCTA
          heading={t("ctaHeading")}
          lead={t("ctaLead")}
          eyebrow={tc("bookingViaSuperdoc")}
          utmCampaign="nhif-page-cta"
        />
      </div>
    </main>
  );
}
