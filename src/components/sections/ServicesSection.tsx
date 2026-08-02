import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { ServicesCarousel } from "@/components/services/ServicesCarousel";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";

export async function ServicesSection() {
  const t = await getTranslations("servicesHome");
  const tc = await getTranslations("common");
  const blurbs = await getTranslations("serviceBlurbs");
  const names = await getTranslations("serviceNames");

  const services = doctor.services.map((service) => ({
    slug: service.slug,
    title: names(service.slug),
    description: blurbs(service.slug),
  }));

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

        <ServicesCarousel
          services={services}
          ctaLabel={tc("learnMore")}
          prevLabel={t("prev")}
          nextLabel={t("next")}
        />

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
