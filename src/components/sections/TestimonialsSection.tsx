import { getLocale, getTranslations } from "next-intl/server";
import { SuperdocLink } from "@/components/booking/SuperdocText";
import { SuperdocMark } from "@/components/booking/SuperdocMark";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { Stars } from "@/components/ui/Stars";
import { getTestimonials } from "@/content/testimonials.i18n";
import { doctor } from "@/lib/doctor";
import type { Locale } from "@/i18n/routing";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const locale = (await getLocale()) as Locale;
  const items = getTestimonials(locale);

  const fiveStar =
    doctor.rating.distribution.find((entry) => entry.stars === 5)?.count ?? 0;
  const fiveStarPercent = Math.round((fiveStar / doctor.rating.count) * 100);

  return (
    <section className="border-y border-border bg-secondary/30 section-space">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <SectionHeading
              title={t("title")}
              description={t("description", {
                rating: doctor.rating.value,
                count: doctor.rating.count,
              })}
              className="mt-4"
            />
          </div>

          <div className="rounded-lg border border-border bg-background px-5 py-4 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--clinical-soft)_70%,transparent)] lg:min-w-76">
            <div className="flex items-center gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-clinical">
                  <SuperdocMark size={14} />
                  {t("ratingLabel")}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-medium tracking-tight text-foreground">
                    {doctor.rating.value}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>
                <div className="mt-1">
                  <Stars value={doctor.rating.value} />
                </div>
              </div>
              <div className="h-12 w-px bg-border" aria-hidden />
              <p className="max-w-36 text-sm leading-snug text-muted-foreground">
                {t("reviewsLabel", { count: doctor.rating.count })}
              </p>
            </div>

            <div className="mt-4 border-t border-border/70 pt-3">
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-border"
                aria-hidden
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${fiveStarPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs leading-snug text-muted-foreground">
                {t("fiveStarShare", {
                  fiveStar,
                  count: doctor.rating.count,
                })}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <TestimonialsCarousel
            items={items}
            prevLabel={t("prev")}
            nextLabel={t("next")}
          />
        </Reveal>

        <Reveal>
          <SuperdocLink
            utmCampaign="testimonials-footer"
            withMark
            className="mt-6 inline-flex text-sm no-underline hover:underline md:mt-8"
          >
            Superdoc →
          </SuperdocLink>
        </Reveal>
      </div>
    </section>
  );
}
