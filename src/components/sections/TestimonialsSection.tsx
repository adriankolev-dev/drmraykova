import { getLocale, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { SuperdocLink } from "@/components/booking/SuperdocText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { getTestimonials } from "@/content/testimonials.i18n";
import { doctor } from "@/lib/doctor";
import type { Locale } from "@/i18n/routing";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value}/5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-3.5 ${
            index < value
              ? "fill-primary text-primary"
              : "fill-transparent text-border"
          }`}
        />
      ))}
    </div>
  );
}

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const locale = (await getLocale()) as Locale;
  const items = getTestimonials(locale);

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

          <div className="flex items-center gap-4 rounded-lg border border-border bg-background px-5 py-4 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--clinical-soft)_70%,transparent)]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-clinical">
                {t("ratingLabel")}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-medium tracking-tight text-foreground">
                  {doctor.rating.value}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <div className="mt-1">
                <Stars value={5} />
              </div>
            </div>
            <div className="h-12 w-px bg-border" aria-hidden />
            <p className="max-w-[9rem] text-sm leading-snug text-muted-foreground">
              {doctor.rating.count}
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={`${item.name}-${item.date}`}>
              <article className="flex h-full flex-col rounded-lg border border-border bg-background p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.date} ·{" "}
                      <SuperdocLink
                        className="text-xs font-normal"
                        utmCampaign="testimonial-source"
                      />
                    </p>
                  </div>
                  <Stars value={item.rating} />
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">
                  „{item.quote}“
                </blockquote>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <SuperdocLink
            utmCampaign="testimonials-footer"
            className="mt-8 inline-flex text-sm no-underline hover:underline"
          >
            Superdoc →
          </SuperdocLink>
        </Reveal>
      </div>
    </section>
  );
}
