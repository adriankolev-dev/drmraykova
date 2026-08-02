import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { DoctorCredentialsSection } from "@/components/sections/DoctorCredentialsSection";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { doctor } from "@/lib/doctor";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getMedicalClinicSchema,
  getPhysicianSchema,
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
  const path = locale === "bg" ? "/za-lekarya" : `/${locale}/za-lekarya`;

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: {
      canonical: path,
      languages: {
        bg: "/za-lekarya",
        en: "/en/za-lekarya",
        es: "/es/za-lekarya",
        "x-default": "/za-lekarya",
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: t("aboutTitle"),
        description: t("aboutDescription"),
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function AboutDoctorPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const th = await getTranslations("hero");
  const tn = await getTranslations("nav");
  const tm = await getTranslations("meta");
  const prefix = raw === "bg" ? "" : `/${raw}`;
  const pageUrl = `${siteConfig.url}${prefix}/za-lekarya`;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getWebPageSchema({
              name: t("eyebrow"),
              description: tm("aboutDescription"),
              url: pageUrl,
              inLanguage: schemaLanguage(raw),
              type: "AboutPage",
            }),
            getPhysicianSchema(),
            getMedicalClinicSchema(),
            getBreadcrumbSchema([
              { name: tn("home"), path: prefix || "/" },
              { name: t("eyebrow"), path: `${prefix}/za-lekarya` },
            ]),
          ],
        }}
      />
      <section className="relative overflow-hidden section-space">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(55% 45% at 18% 20%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 60%),
              radial-gradient(50% 40% at 90% 70%, color-mix(in srgb, var(--clinical-soft) 70%, transparent), transparent 55%)
            `,
          }}
        />
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl bg-background shadow-[0_12px_32px_-10px_rgba(26,35,50,0.22)]">
              <Image
                src="/doctor-about.webp"
                alt={`${th("brand")} — ${tc("specialty")}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
              {th("brand")}
            </h1>
            <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-clinical">
              <span>{tc("specialty")}</span>
              <span className="text-border">·</span>
              <span>{tc("specialtyStatus")}</span>
              <span className="text-border">·</span>
              <span>{tc("city")}</span>
            </p>
            <ClinicRule className="mt-6 max-w-[10rem]" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t("lead")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookCta utmCampaign="about-doctor" />
              <Link
                href="/uslugi"
                className="inline-flex h-12 items-center rounded-md border border-border bg-background/70 px-7 text-base font-medium backdrop-blur-sm hover:bg-accent"
              >
                {tc("viewServices")}
              </Link>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
              <ClinicCross className="size-3" />
              {doctor.clinic.address}
            </p>
          </Reveal>
        </div>
      </section>

      <DoctorCredentialsSection />
    </main>
  );
}
