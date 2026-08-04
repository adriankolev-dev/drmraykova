import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal } from "@/components/motion/Reveal";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { Stars } from "@/components/ui/Stars";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(70% 55% at 88% 42%, color-mix(in srgb, var(--primary) 26%, transparent), transparent 58%),
            radial-gradient(55% 45% at 8% 88%, color-mix(in srgb, var(--clinical-soft) 80%, transparent), transparent 52%),
            linear-gradient(180deg, var(--background) 0%, color-mix(in srgb, var(--accent) 30%, var(--background)) 100%)
          `,
        }}
      />

      <div className="relative min-h-[calc(100svh-5rem)]">
        <div className="relative z-0 mx-auto w-full max-w-md px-4 pt-2 lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:mx-0 lg:flex lg:w-[48%] lg:max-w-none lg:items-end lg:px-0 lg:pt-0 xl:w-[46%]">
          <HeroPortrait />
        </div>

        <div className="relative z-10 container-page flex min-h-0 items-center pb-12 pt-4 lg:min-h-[calc(100svh-5rem)] lg:pb-20 lg:pt-8">
          <Reveal className="w-full max-w-xl lg:max-w-[34rem] xl:max-w-[38rem]">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <ClinicCross className="size-3" />
              <span>{t("eyebrow")}</span>
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl xl:text-[4.1rem]">
              <span className="block">{t("brand")}</span>
              <span className="mt-3 block text-[0.68em] text-foreground/80">
                {t("headline")}
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("support")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[t("chipAppointment"), t("chipNhif"), t("chipClinic")].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-md border border-border/80 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/70 backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <BookCta utmCampaign="home-hero" />
              <Link
                href="/za-lekarya"
                className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background/70 px-7 text-base font-medium backdrop-blur-sm transition-colors hover:bg-accent"
              >
                {tc("learnMore")}
              </Link>
            </div>

            <ClinicRule className="mt-8 max-w-xs" />
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2">
                <Stars value={doctor.rating.value} />
                <span className="text-sm font-medium text-foreground">
                  {t("ratingProof", {
                    rating: doctor.rating.value,
                    count: doctor.rating.count,
                  })}
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
                {doctor.clinic.address}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
