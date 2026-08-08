import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal } from "@/components/motion/Reveal";

export async function FinalCtaSection() {
  const t = await getTranslations("finalCta");
  const tc = await getTranslations("common");

  return (
    <section className="pt-4 pb-[var(--space-section)] md:pt-6">
      <div className="container-page">
        <Reveal>
          <div className="panel-primary rounded-lg px-8 py-12 md:px-14 md:py-14">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
              <ClinicCross className="size-3 text-primary-foreground/80" />
              <SuperdocText
                text={tc("bookingViaSuperdoc")}
                tone="onPrimary"
                utmCampaign="home-final-eyebrow"
              />
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-primary-foreground/85">
              <SuperdocText
                text={t("description")}
                tone="onPrimary"
                utmCampaign="home-final-desc"
              />
            </p>
            <ClinicRule className="mt-6 max-w-[10rem] opacity-40 [&_div]:bg-primary-foreground" />
            <div className="mt-8">
              <BookCta variant="superdoc" utmCampaign="home-final" mascotDock />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
