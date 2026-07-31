import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClinicPulse } from "@/components/brand/ClinicMotifs";
import { ClinicSection } from "@/components/sections/ClinicSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HandbookTeaserSection } from "@/components/sections/HandbookTeaserSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhySection } from "@/components/sections/WhySection";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getMedicalClinicSchema,
  getPhysicianSchema,
  getWebSiteSchema,
  JsonLd,
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

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: {
      canonical: locale === "bg" ? "/" : `/${locale}`,
      languages: {
        bg: "/",
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: t("title"),
        description: t("description"),
        path: locale === "bg" ? "/" : `/${locale}`,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getWebSiteSchema(),
            getPhysicianSchema(),
            getMedicalClinicSchema(),
          ],
        }}
      />
      <HeroSection />
      <div className="cv-auto">
        <IntroSection />
      </div>
      <div className="cv-auto">
        <TrustSection />
      </div>
      <div className="container-page py-2" aria-hidden>
        <ClinicPulse className="mx-auto max-w-md opacity-80" />
      </div>
      <div className="cv-auto">
        <ServicesSection />
      </div>
      <div className="cv-auto">
        <WhySection />
      </div>
      <div className="cv-auto">
        <TestimonialsSection />
      </div>
      <div className="container-page py-2" aria-hidden>
        <ClinicPulse className="mx-auto max-w-md opacity-80" />
      </div>
      <div className="cv-auto">
        <ClinicSection />
      </div>
      <div className="cv-auto">
        <HandbookTeaserSection />
      </div>
      <div className="cv-auto">
        <FinalCtaSection />
      </div>
    </>
  );
}
