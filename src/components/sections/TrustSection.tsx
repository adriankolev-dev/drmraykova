import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { doctor } from "@/lib/doctor";
import { cn } from "@/lib/utils";

function RatingStars({ value }: { value: number }) {
  return (
    <div
      className="mt-3 flex items-center gap-0.5"
      aria-label={`${value}/5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-3.5",
            index < Math.round(value)
              ? "fill-primary text-primary"
              : "fill-transparent text-border",
          )}
        />
      ))}
    </div>
  );
}

export async function TrustSection() {
  const t = await getTranslations("trust");
  const tc = await getTranslations("common");

  const items = [
    {
      label: tc("rating"),
      value: String(doctor.rating.value),
      detail: t("ratingDetail", { count: doctor.rating.count }),
      rating: true,
    },
    {
      label: tc("access"),
      value: t("accessValue"),
      detail: t("accessDetail"),
    },
    {
      label: tc("languages"),
      value: t("languagesValue"),
      detail: t("languagesDetail"),
    },
    {
      label: tc("location"),
      value: t("locationValue"),
      detail: t("locationDetail"),
    },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border section-space">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(
              180deg,
              color-mix(in srgb, var(--clinical-soft) 55%, var(--background)) 0%,
              color-mix(in srgb, var(--accent) 45%, var(--background)) 100%
            )
          `,
        }}
      />

      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <SectionHeading title={t("title")} className="mt-4" />
          </div>
          <p className="max-w-xs whitespace-pre-line font-mono text-[11px] leading-relaxed tracking-[0.08em] text-clinical lg:text-right">
            {tc("confirmedData")}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <ClinicRule />
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <RevealItem
                  key={item.label}
                  className={cn(
                    "relative py-8 lg:py-10",
                    "sm:px-6 lg:px-7",
                    "border-border/80",
                    !isLast &&
                      "border-b sm:max-lg:border-b-0 lg:border-b-0 lg:border-r",
                    index % 2 === 0 && "sm:border-r sm:max-lg:pr-8",
                    index < 2 && "sm:max-lg:border-b sm:max-lg:pb-8",
                    index >= 2 && "sm:max-lg:pt-8",
                  )}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical">
                    {String(index + 1).padStart(2, "0")} · {item.label}
                  </p>
                  <p
                    className={cn(
                      "mt-5 font-display font-medium tracking-tight text-foreground",
                      item.rating
                        ? "text-5xl md:text-[3.35rem]"
                        : "text-4xl md:text-[2.85rem]",
                    )}
                  >
                    {item.value}
                    {item.rating ? (
                      <span className="ml-1.5 align-baseline font-sans text-base font-normal tracking-normal text-muted-foreground">
                        /5
                      </span>
                    ) : null}
                  </p>
                  {item.rating ? <RatingStars value={doctor.rating.value} /> : null}
                  <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <ClinicRule />
        </Reveal>
      </div>
    </section>
  );
}
