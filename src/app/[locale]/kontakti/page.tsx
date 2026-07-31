import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Languages,
  MapPinned,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { getBookingLinkProps } from "@/lib/booking";
import { doctor } from "@/lib/doctor";
import { cn } from "@/lib/utils";
import { getMedicalClinicSchema, getBreadcrumbSchema, JsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { localeOpenGraph } from "@/lib/navigation";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/kontakti" : `/${locale}/kontakti`;
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: {
      canonical: path,
      languages: {
        bg: "/kontakti",
        en: "/en/kontakti",
        es: "/es/kontakti",
        "x-default": "/kontakti",
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: t("contactTitle"),
        description: t("contactDescription"),
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.clinic.address)}`;
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(doctor.clinic.address)}&z=16&output=embed`;
const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.clinic.address)}`;

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const tcp = await getTranslations("contactPage");
  const th = await getTranslations("hero");
  const tn = await getTranslations("nav");

  const booking = getBookingLinkProps({
    utmSource: "website",
    utmMedium: "cta",
    utmCampaign: "contact-quick-book",
  });

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getMedicalClinicSchema(),
            getBreadcrumbSchema([
              { name: tn("home"), path: raw === "bg" ? "/" : `/${raw}` },
              {
                name: tn("contact"),
                path: raw === "bg" ? "/kontakti" : `/${raw}/kontakti`,
              },
            ]),
          ],
        }}
      />

      {/* Intro — tighter bottom */}
      <section className="relative overflow-hidden pt-[var(--space-section)] pb-8 md:pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(70% 55% at 90% 0%, color-mix(in srgb, var(--primary) 28%, transparent), transparent 55%),
              radial-gradient(50% 40% at 10% 100%, color-mix(in srgb, var(--secondary) 55%, transparent), transparent 50%)
            `,
          }}
        />
        <div className="container-page max-w-3xl">
          <Reveal>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {tcp("leadExtra", {
                clinic: doctor.clinic.name,
                address: doctor.clinic.address,
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookCta utmCampaign="contact-hero" />
              <a
                href={doctor.clinic.phoneHref}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Phone />
                {tcp("callUs")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick actions — interactive surfaces */}
      <section className="border-y border-border bg-accent/30 py-8 md:py-10">
        <div className="container-page">
          <RevealGroup className="grid gap-4 md:grid-cols-3" delay={0.05}>
            <RevealItem>
              <a
                {...booking}
                className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/50"
              >
                <CalendarDays className="size-5 text-primary" />
                <p className="mt-5 font-display text-xl font-medium tracking-tight text-foreground">
                  {tcp("bookOnlineTitle")}
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground/70">
                  {tcp("bookOnlineBody")}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {tcp("toSuperdoc")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </RevealItem>

            <RevealItem>
              <a
                href={doctor.clinic.phoneHref}
                className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/50"
              >
                <Phone className="size-5 text-primary" />
                <p className="mt-5 font-display text-xl font-medium tracking-tight text-foreground">
                  {tcp("callTitle")}
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground/70">
                  {tcp("callBody")}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {doctor.clinic.phoneDisplay}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </RevealItem>

            <RevealItem>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/50"
              >
                <Navigation className="size-5 text-primary" />
                <p className="mt-5 font-display text-xl font-medium tracking-tight text-foreground">
                  {tcp("navTitle")}
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground/70">
                  {tcp("navBody")}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {tcp("showRoute")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Details + map */}
      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight">
              {tcp("clinicData")}
            </h2>

            <dl className="mt-8 space-y-7">
              <div className="flex gap-4">
                <MapPinned className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {t("addressLabel")}
                  </dt>
                  <dd className="mt-2 text-lg leading-snug">
                    {doctor.clinic.address}
                  </dd>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {doctor.clinic.name}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {t("phoneLabel")}
                  </dt>
                  <dd className="mt-2 text-lg">
                    <a
                      href={doctor.clinic.phoneHref}
                      className="underline-offset-4 hover:underline"
                    >
                      {doctor.clinic.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3 className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {tcp("hoursLabel")}
                  </dt>
                  <dd className="mt-2 text-lg leading-snug text-foreground">
                    {tcp("hoursValue")}
                  </dd>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {tcp("hoursHint")}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {tcp("accessLabel")}
                  </dt>
                  <dd className="mt-2 text-lg">
                    {doctor.clinic.nhif ? tcp("accessNhif") : tcp("accessPrivate")}
                  </dd>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {tcp("accessHint")}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Languages className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {tcp("languagesLabel")}
                  </dt>
                  <dd className="mt-2 text-lg">{tcp("languagesValue")}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 rounded-lg border border-border bg-muted/50 p-5">
              <p className="font-medium">{tcp("beforeVisitTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tcp("beforeVisitBody")}
              </p>
              <Link
                href="/narachnik/podgotovka-za-ginekologichen-pregled"
                className="mt-4 inline-flex text-sm font-medium underline-offset-4 hover:underline"
              >
                {tcp("prepChecklist")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-lg border border-border bg-muted shadow-[0_20px_50px_-28px_rgba(26,35,50,0.35)]">
              <iframe
                title={tcp("mapTitle")}
                src={mapsEmbedUrl}
                className="h-[340px] w-full lg:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-5 py-4">
                <p className="text-sm text-muted-foreground">
                  {tcp("mapCaption")}
                </p>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                >
                  {tcp("openMaps")}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-[var(--space-section)]">
        <div className="container-page">
          <Reveal>
            <div className="panel-ink rounded-lg px-8 py-12 md:px-12 md:py-14">
              <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-4xl">
                {tcp("finalTitle")}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-ink-foreground/70">
                {tcp("finalBody", {
                  name: th("brand"),
                  phone: doctor.clinic.phoneDisplay,
                })}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookCta utmCampaign="contact-final" />
                <a
                  href={doctor.clinic.phoneHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-ink-foreground/25 bg-transparent text-ink-foreground hover:bg-ink-foreground/10",
                  )}
                >
                  <Phone />
                  {tcp("callUs")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
