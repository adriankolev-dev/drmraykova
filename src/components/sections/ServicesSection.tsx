import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { ServiceLinkCard } from "@/components/services/ServiceLinkCard";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";

export async function ServicesSection() {
  const t = await getTranslations("servicesHome");
  const blurbs = await getTranslations("serviceBlurbs");
  const names = await getTranslations("serviceNames");

  return (
    <section className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionHeading
            title={t("title")}
            description={t("description")}
            className="mt-4"
          />
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
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

        <Reveal>
          <Link
            href="/uslugi"
            className="mt-8 inline-flex text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("allServices")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
