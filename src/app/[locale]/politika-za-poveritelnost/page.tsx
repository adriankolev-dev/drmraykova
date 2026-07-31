import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "bg") as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    robots: { index: true, follow: true },
    alternates: {
      canonical:
        locale === "bg"
          ? "/politika-za-poveritelnost"
          : `/${locale}/politika-za-poveritelnost`,
      languages: {
        bg: "/politika-za-poveritelnost",
        en: "/en/politika-za-poveritelnost",
        es: "/es/politika-za-poveritelnost",
        "x-default": "/politika-za-poveritelnost",
      },
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  setRequestLocale(raw);
  const t = await getTranslations("privacy");
  const dataItems = t.raw("dataItems") as string[];
  const purposesItems = t.raw("purposesItems") as string[];
  const rightsItems = t.raw("rightsItems") as string[];

  return (
    <main className="section-space">
      <div className="container-page max-w-3xl">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <ClinicCross className="size-3" />
            {t("updated")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <ClinicRule className="mt-6 max-w-[10rem]" />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </Reveal>

        <div className="mt-2">
          <Section title={t("controllerTitle")}>
            <p>{t("controllerBody")}</p>
          </Section>

          <Section title={t("scopeTitle")}>
            <p>{t("scopeBody")}</p>
          </Section>

          <Section title={t("dataTitle")}>
            <ul className="list-disc space-y-2 pl-5">
              {dataItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t("purposesTitle")}>
            <ul className="list-disc space-y-2 pl-5">
              {purposesItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t("legalTitle")}>
            <p>{t("legalBody")}</p>
          </Section>

          <Section title={t("cookiesTitle")}>
            <p>{t("cookiesIntro")}</p>
            <p className="font-medium text-foreground">
              {t("cookiesEssentialTitle")}
            </p>
            <p>{t("cookiesEssentialBody")}</p>
            <p className="font-medium text-foreground">
              {t("cookiesOptionalTitle")}
            </p>
            <p>{t("cookiesOptionalBody")}</p>
          </Section>

          <Section title={t("thirdTitle")}>
            <p>{t("thirdBody")}</p>
          </Section>

          <Section title={t("retentionTitle")}>
            <p>{t("retentionBody")}</p>
          </Section>

          <Section title={t("rightsTitle")}>
            <p>{t("rightsIntro")}</p>
            <ul className="list-disc space-y-2 pl-5">
              {rightsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t("rightsContact")}</p>
          </Section>

          <Section title={t("securityTitle")}>
            <p>{t("securityBody")}</p>
          </Section>

          <Section title={t("changesTitle")}>
            <p>{t("changesBody")}</p>
          </Section>

          <Link
            href="/"
            className="mt-12 inline-flex text-sm font-medium underline-offset-4 hover:underline"
          >
            ← {t("backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
