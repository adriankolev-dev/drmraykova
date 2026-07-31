import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { ClinicCross, ClinicPulse, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { doctor } from "@/lib/doctor";
import { cn } from "@/lib/utils";

function RatingStars({ value }: { value: number }) {
  return (
    <div
      className="mt-3 flex items-center gap-0.5"
      aria-label={`${value} от 5 звезди`}
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

function isHighlightCredential(item: string) {
  return item.toLowerCase().includes("harvard");
}

export async function DoctorCredentialsSection() {
  const tc = await getTranslations("common");
  const tt = await getTranslations("trust");
  const te = await getTranslations("education");
  const tq = await getTranslations("qualifications");
  const tw = await getTranslations("workplaces");

  const facts = [
    {
      label: tc("experience"),
      value: tc("experienceValue"),
      detail: tc("experienceDetail"),
    },
    {
      label: tc("languages"),
      value: tt("languagesValue"),
      detail: tt("languagesDetail"),
    },
    {
      label: tc("rating"),
      value: String(doctor.rating.value),
      detail: tt("ratingDetail", { count: doctor.rating.count }),
      rating: true as const,
    },
  ];

  const education = te.raw("items") as string[];
  const qualifications = tq.raw("items") as string[];
  const workplaces = tw.raw("items") as string[];


  return (
    <>
      {/* Clinical facts band */}
      <section className="relative overflow-hidden border-y border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--clinical-soft) 60%, var(--background)) 0%,
                color-mix(in srgb, var(--accent) 50%, var(--background)) 100%
              )
            `,
          }}
        />
        <div className="container-page py-12 md:py-14">
          <Reveal>
            <ClinicRule />
            <div className="grid gap-0 md:grid-cols-3">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={cn(
                    "py-8 md:px-8 md:py-10",
                    index < facts.length - 1 &&
                      "border-b border-border/80 md:border-b-0 md:border-r",
                  )}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical">
                    {String(index + 1).padStart(2, "0")} · {fact.label}
                  </p>
                  <p className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground md:text-[2.75rem]">
                    {fact.value}
                    {"rating" in fact && fact.rating ? (
                      <span className="ml-1.5 align-baseline font-sans text-base font-normal tracking-normal text-muted-foreground">
                        /5
                      </span>
                    ) : null}
                  </p>
                  {"rating" in fact && fact.rating ? (
                    <RatingStars value={doctor.rating.value} />
                  ) : null}
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
            <ClinicRule />
          </Reveal>
        </div>
      </section>

      {/* Credentials dossier */}
      <section className="section-space">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{tc("profile")}</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
              {tc("educationQualTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {tc("educationQualBody")}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Education timeline */}
            <Reveal>
              <div className="flex items-center gap-3">
                <ClinicCross className="size-3.5" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-clinical">
                  {tc("education")}
                </h3>
              </div>
              <ClinicRule className="mt-4 max-w-[8rem]" />

              <ol className="relative mt-8 space-y-0 pl-1">
                <span
                  aria-hidden
                  className="absolute bottom-3 left-[0.4rem] top-3 w-px bg-border"
                />
                {education.map((item, index) => (
                  <li key={item} className="relative flex gap-5 pb-10 last:pb-0">
                    <span
                      aria-hidden
                      className="relative z-10 mt-1.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border border-primary bg-background"
                    >
                      <span className="size-1.5 rounded-full bg-primary" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {tc("step", { n: String(index + 1).padStart(2, "0") })}
                      </p>
                      <p className="mt-2 font-display text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                        {item}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Qualifications */}
            <Reveal delay={0.08}>
              <div className="flex items-center gap-3">
                <ClinicCross className="size-3.5" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-clinical">
                  {tc("qualifications")}
                </h3>
              </div>
              <ClinicRule className="mt-4 max-w-[8rem]" />

              <RevealGroup className="mt-8 space-y-3">
                {qualifications.map((item, index) => {
                  const highlight = isHighlightCredential(item);
                  return (
                    <RevealItem key={item}>
                      <div
                        className={cn(
                          "relative flex gap-4 py-4",
                          highlight
                            ? "rounded-md bg-clinical-soft/70 px-4 py-5 md:px-5"
                            : "border-b border-border/70 last:border-b-0",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 font-mono text-[11px] tracking-[0.12em]",
                            highlight ? "text-clinical" : "text-muted-foreground",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          {highlight ? (
                            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-clinical">
                              {tc("internationalAccent")}
                            </p>
                          ) : null}
                          <p
                            className={cn(
                              "leading-relaxed",
                              highlight
                                ? "font-display text-lg font-medium tracking-tight text-foreground md:text-xl"
                                : "text-[15px] text-foreground/85 md:text-base",
                            )}
                          >
                            {item}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </Reveal>
          </div>

          <div className="mt-16" aria-hidden>
            <ClinicPulse className="mx-auto max-w-md opacity-80" />
          </div>

          {/* Practice + approach */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <ClinicCross className="size-3.5" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-clinical">
                  {tc("wherePractices")}
                </h3>
              </div>
              <ClinicRule className="mt-4 max-w-[8rem]" />
              <ul className="mt-8 space-y-5">
                {workplaces.map((item, index) => (
                  <li key={item}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")} · {tc("workplace")}
                    </p>
                    <p className="mt-1.5 font-display text-xl font-medium tracking-tight text-foreground">
                      {item}
                    </p>
                  </li>
                ))}
                <li className="border-t border-border/80 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {tc("reception")}
                  </p>
                  <p className="mt-1.5 font-display text-xl font-medium tracking-tight text-foreground">
                    {doctor.clinic.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {doctor.clinic.address}
                  </p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-center gap-3">
                <ClinicCross className="size-3.5" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-clinical">
                  {tc("patientApproach")}
                </h3>
              </div>
              <ClinicRule className="mt-4 max-w-[8rem]" />
              <blockquote className="mt-8 border-l-2 border-primary/50 pl-5">
                <p className="font-display text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                  {tc("approachQuote")}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {tc("approachBody")}
                </p>
              </blockquote>
              <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-clinical">
                {tc("importantScope")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-16">
            <div className="rounded-lg bg-primary px-8 py-12 text-primary-foreground md:px-12 md:py-14">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
                <ClinicCross className="size-3 text-primary-foreground/80" />
                {tc("booking")}
              </p>
              <p className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
                {tc("readyCta")}
              </p>
              <ClinicRule className="mt-6 max-w-[10rem] opacity-40 [&_div]:bg-primary-foreground" />
              <div className="mt-8">
                <BookCta
                  variant="ink"
                  utmCampaign="about-doctor-bottom"
                  className="bg-ink text-ink-foreground hover:bg-ink/90"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
