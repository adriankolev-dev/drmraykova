import Image from "next/image";
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
    <section
      id="testimonials"
      className="border-y border-border bg-secondary/30 section-space scroll-mt-24"
    >
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <SectionHeading
              title={t("title")}
              description={t("description", {
                rating: doctor.rating.value,
                count: doctor.rating.count,
              })}
              className="mt-4"
            />

            <div className="mt-8 max-w-md rounded-lg border border-border/80 bg-background/80 px-5 py-4">
              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-clinical">
                <SuperdocMark size={14} />
                {t("ratingLabel")}
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-medium tracking-tight text-foreground">
                      {doctor.rating.value}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 5</span>
                  </div>
                  <div className="mt-1">
                    <Stars value={doctor.rating.value} />
                  </div>
                </div>
                <p className="max-w-32 text-right text-sm leading-snug text-muted-foreground">
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

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Soft brand wash behind the portrait */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[12%] size-[78%] -translate-x-1/2 rounded-full opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at 42% 38%, color-mix(in srgb, var(--primary) 42%, white), color-mix(in srgb, var(--secondary) 70%, transparent) 58%, transparent 74%)",
                }}
              />

              <div className="relative overflow-hidden rounded-lg bg-linear-to-b from-card to-secondary/40">
                <div className="relative aspect-4/5 sm:aspect-5/6">
                  <Image
                    src="/doctor-gratitude.webp"
                    alt={t("portraitAlt")}
                    fill
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover object-[center_18%]"
                    priority={false}
                  />
                  {/* Soft bottom dissolve into section tone */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-secondary/80 via-secondary/25 to-transparent"
                  />
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70">
                    {t("portraitCaption")}
                  </p>
                  <p className="mt-1.5 max-w-xs font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {t("portraitQuote")}
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>

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
