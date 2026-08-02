import { Award, Building2, GraduationCap, MapPin, Quote, Star } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { CertificateLightbox } from "@/components/ui/CertificateLightbox";
import { doctor } from "@/lib/doctor";
import { cn } from "@/lib/utils";

const HARVARD_CERTIFICATE_SRC = "/certificates/harvard-hmx-genetics.jpg";
const DOCTOR_GESTURE_SRC = "/doctor-certificate-gesture-v2.webp";

/** High-contrast metadata for WCAG AAA on light canvas */
const metaLabel =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/72";

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

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-md bg-clinical-soft text-clinical">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <h3 className={metaLabel}>{children}</h3>
    </div>
  );
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
                  <p className={metaLabel}>
                    {String(index + 1).padStart(2, "0")} · {fact.label}
                  </p>
                  <p className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground md:text-[2.75rem]">
                    {fact.value}
                    {"rating" in fact && fact.rating ? (
                      <span className="ml-1.5 align-baseline font-sans text-base font-normal tracking-normal text-foreground/65">
                        /5
                      </span>
                    ) : null}
                  </p>
                  {"rating" in fact && fact.rating ? (
                    <RatingStars value={doctor.rating.value} />
                  ) : null}
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-foreground/70">
                    <SuperdocText
                      text={fact.detail}
                      utmCampaign="credentials-detail"
                    />
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
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              {tc("educationQualBody")}
            </p>
          </Reveal>

          {/* Patient approach — accent banner */}
          <Reveal delay={0.06} className="mt-10 md:mt-12">
            <figure className="relative overflow-hidden rounded-lg border border-primary/25 bg-accent/60 px-6 py-7 md:px-10 md:py-9">
              <Quote
                className="absolute -right-2 -top-2 size-16 text-primary/20 md:size-24"
                aria-hidden
              />
              <figcaption className={cn(metaLabel, "text-foreground/75")}>
                <span className="inline-flex items-center gap-2">
                  <ClinicCross className="size-3 text-clinical" />
                  {tc("patientApproach")}
                </span>
              </figcaption>
              <blockquote className="relative mt-4 max-w-3xl">
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
                  {tc("approachQuote")}
                </p>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg">
                  {tc("approachBody")}
                </p>
              </blockquote>
              <p className="relative mt-5 text-sm leading-relaxed text-foreground/68">
                {tc("importantScope")}
              </p>
            </figure>
          </Reveal>

          {/* Education & quals | Practice locations */}
          <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            {/* Left: Education + Qualifications */}
            <Reveal className="min-w-0 space-y-10">
              <div>
                <SectionLabel icon={GraduationCap}>{tc("education")}</SectionLabel>
                <ClinicRule className="mt-4 max-w-32" />

                <ol className="relative mt-7 space-y-0 pl-1">
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-[0.4rem] top-2 w-px bg-border"
                  />
                  {education.map((item, index) => (
                    <li
                      key={item}
                      className="relative flex gap-4 pb-7 last:pb-0 md:gap-5"
                    >
                      <span
                        aria-hidden
                        className="relative z-10 mt-1.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border border-primary bg-background"
                      >
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                      <div>
                        <p className={cn(metaLabel, "text-[10px]")}>
                          {tc("step", {
                            n: String(index + 1).padStart(2, "0"),
                          })}
                        </p>
                        <p className="mt-1.5 font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
                          {item}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <SectionLabel icon={Award}>{tc("qualifications")}</SectionLabel>
                <ClinicRule className="mt-4 max-w-32" />

                <RevealGroup className="mt-6 space-y-1">
                  {qualifications.map((item, index) => {
                    const highlight = isHighlightCredential(item);
                    return (
                      <RevealItem key={item}>
                        <div
                          className={cn(
                            "relative flex gap-3.5 py-3.5 transition-colors duration-200",
                            highlight
                              ? "rounded-md bg-clinical-soft/80 px-3.5 py-4 md:px-4"
                              : "border-b border-border/80 last:border-b-0 hover:bg-muted/40",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 shrink-0 font-mono text-[11px] tracking-[0.12em]",
                              highlight
                                ? "text-foreground/75"
                                : "text-foreground/65",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            {highlight ? (
                              <p className={cn(metaLabel, "mb-1.5 text-[10px]")}>
                                {tc("internationalAccent")}
                              </p>
                            ) : null}
                            <p
                              className={cn(
                                "leading-relaxed",
                                highlight
                                  ? "font-display text-base font-medium tracking-tight text-foreground md:text-lg"
                                  : "text-[15px] text-foreground/90 md:text-base",
                              )}
                            >
                              {item}
                            </p>
                            {highlight ? (
                              <CertificateLightbox
                                src={HARVARD_CERTIFICATE_SRC}
                                alt={tc("harvardCertificateAlt")}
                                title={tc("harvardCertificateTitle")}
                                caption={tc("harvardCertificateCaption")}
                                triggerLabel={tc("harvardCertificateView")}
                                closeLabel={tc("close")}
                              />
                            ) : null}
                          </div>
                        </div>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </div>
            </Reveal>

            {/* Right: Practice locations + portrait gesture */}
            <Reveal delay={0.08} className="min-w-0 lg:pt-0">
              <SectionLabel icon={Building2}>{tc("wherePractices")}</SectionLabel>
              <ClinicRule className="mt-4 max-w-32" />

              <ul className="mt-7 space-y-3">
                {workplaces.map((item, index) => (
                  <li key={item}>
                    <div
                      className={cn(
                        "group rounded-md border border-border/80 bg-card/40 px-4 py-4",
                        "transition-[border-color,background-color,transform] duration-200",
                        "hover:border-clinical/40 hover:bg-clinical-soft/50",
                        "motion-safe:hover:-translate-y-px",
                      )}
                    >
                      <p className={cn(metaLabel, "text-[10px]")}>
                        {String(index + 1).padStart(2, "0")} · {tc("workplace")}
                      </p>
                      <p className="mt-2 flex items-start gap-2.5 font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
                        <Building2
                          className="mt-1 size-4 shrink-0 text-clinical transition-colors group-hover:text-foreground"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </p>
                    </div>
                  </li>
                ))}

                <li>
                  <div
                    className={cn(
                      "group rounded-md border border-primary/30 bg-accent/50 px-4 py-5",
                      "transition-[border-color,background-color,transform] duration-200",
                      "hover:border-primary/50 hover:bg-accent",
                      "motion-safe:hover:-translate-y-px",
                    )}
                  >
                    <p className={cn(metaLabel, "text-[10px]")}>
                      {tc("reception")}
                    </p>
                    <p className="mt-2 flex items-start gap-2.5 font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
                      <MapPin
                        className="mt-1 size-4 shrink-0 text-primary transition-colors group-hover:text-foreground"
                        aria-hidden
                      />
                      <span>{doctor.clinic.name}</span>
                    </p>
                    <p className="mt-2 pl-6.5 text-sm leading-relaxed text-foreground/70">
                      {doctor.clinic.address}
                    </p>
                  </div>
                </li>
              </ul>

              <figure className="relative mt-8 hidden lg:mt-10 lg:block">
                <Image
                  src={DOCTOR_GESTURE_SRC}
                  alt={tc("certificateGestureAlt")}
                  width={682}
                  height={1024}
                  className="relative mx-auto h-auto w-full max-w-md rounded-xl object-contain object-bottom shadow-[0_10px_28px_-12px_rgba(26,35,50,0.22)]"
                  sizes="(max-width: 1024px) 0px, 28rem"
                />
                <figcaption className="sr-only">
                  {tc("certificateGestureAlt")}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-14 md:mt-16">
            <div className="panel-primary rounded-lg px-8 py-12 md:px-12 md:py-14">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/80">
                <ClinicCross className="size-3 text-primary-foreground/85" />
                {tc("booking")}
              </p>
              <p className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
                {tc("readyCta")}
              </p>
              <ClinicRule className="mt-6 max-w-40 opacity-40 [&_div]:bg-primary-foreground" />
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
