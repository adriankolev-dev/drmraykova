import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { ServiceLinkCard } from "@/components/services/ServiceLinkCard";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, JsonLd } from "@/lib/seo/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/uslugi" : `/${locale}/uslugi`;
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
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
      ...pageOpenGraph({
        title: t("servicesTitle"),
        description: t("servicesDescription"),
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function ServicesIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("servicesPage");
  const blurbs = await getTranslations("serviceBlurbs");
  const names = await getTranslations("serviceNames");

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: raw === "bg" ? "/" : `/${raw}` },
          { name: t("eyebrow"), path: raw === "bg" ? "/uslugi" : `/${raw}/uslugi` },
        ])}
      />
      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t("lead")}
          </p>
          <div className="mt-8">
            <BookCta utmCampaign="services-index" />
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {doctor.services.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceLinkCard
                slug={service.slug}
                title={names(service.slug)}
                description={blurbs(service.slug)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </main>
  );
}
