import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { getFaqPage } from "@/content/faq.i18n";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { localeOpenGraph } from "@/lib/navigation";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  getBreadcrumbSchema,
  getFaqSchema,
  JsonLd,
} from "@/lib/seo/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "bg" ? "/vaprosi" : `/${locale}/vaprosi`;
  return {
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: {
      canonical: path,
      languages: {
        bg: "/vaprosi",
        en: "/en/vaprosi",
        es: "/es/vaprosi",
        "x-default": "/vaprosi",
      },
    },
    openGraph: {
      ...pageOpenGraph({
        title: t("faqTitle"),
        description: t("faqDescription"),
        path,
      }),
      locale: localeOpenGraph[locale],
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);

  const locale = raw as Locale;
  const faq = getFaqPage(locale);
  const tn = await getTranslations("nav");
  const path = locale === "bg" ? "/vaprosi" : `/${locale}/vaprosi`;
  const homePath = locale === "bg" ? "/" : `/${locale}`;

  return (
    <main className="pt-10 pb-[var(--space-section)] md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getFaqSchema(faq.items),
            getBreadcrumbSchema([
              { name: tn("home"), path: homePath },
              { name: faq.title, path },
            ]),
          ],
        }}
      />

      <div className="container-page max-w-3xl">
        <Reveal>
          <SectionEyebrow>{faq.eyebrow}</SectionEyebrow>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
            {faq.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {faq.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {faq.items.map((item) => (
              <div key={item.question} className="py-6">
                <h2 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                  {item.question}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  <SuperdocText text={item.answer} utmCampaign="faq-page" />
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel-primary mt-14 rounded-lg px-8 py-10">
            <p className="font-display text-2xl font-medium tracking-tight">
              {faq.ctaHeading}
            </p>
            <p className="mt-2 text-primary-foreground/85">
              <SuperdocText
                text={faq.ctaLead}
                tone="onPrimary"
                utmCampaign="faq-page-cta"
              />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookCta
                variant="ink"
                utmCampaign="faq-page"
                className="bg-ink text-ink-foreground hover:bg-ink/90"
              />
              <Link
                href="/kontakti"
                className="inline-flex h-11 items-center justify-center rounded-md border border-primary-foreground/35 px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {tn("contact")}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
