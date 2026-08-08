import { getTranslations } from "next-intl/server";
import { ClinicCross, ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";
import { SASHO_RAYKOV_PUBLICATION } from "@/lib/medical-environment";
import { cn } from "@/lib/utils";

const metaLabel =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/72";

type TraditionCard = {
  index: string;
  label: string;
  title: string;
  body: string;
  pubmed?: boolean;
};

export async function MedicalTraditionSection() {
  const t = await getTranslations("tradition");

  const cards: TraditionCard[] = [
    {
      index: "01",
      label: t("card1Label"),
      title: t("card1Title"),
      body: t("card1Body"),
    },
    {
      index: "02",
      label: t("card2Label"),
      title: t("card2Title"),
      body: t("card2Body"),
      pubmed: true,
    },
    {
      index: "03",
      label: t("card3Label"),
      title: t("card3Title"),
      body: t("card3Body"),
    },
  ];

  return (
    <Reveal delay={0.08} className="mt-14 md:mt-16">
      <div className="relative overflow-hidden rounded-lg border border-border/80 bg-card/30 px-5 py-8 sm:px-7 sm:py-9 md:px-10 md:py-11">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 50% at 8% 0%, color-mix(in srgb, var(--clinical-soft) 55%, transparent), transparent 65%),
              radial-gradient(45% 40% at 100% 100%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 60%)
            `,
          }}
        />

        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-2xl font-medium tracking-tight text-balance text-foreground md:text-3xl">
          {t("title")}
        </h2>
        <ClinicRule className="mt-5 max-w-28" />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg">
          {t("subtitle")}
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/68 md:text-base">
          {t("body")}
        </p>

        {/* Explicit hide: nested layout inside details can break UA closed-state collapsing */}
        <details className="group mt-7 md:mt-8 [&_summary::-webkit-details-marker]:hidden [&:not([open])>:not(summary)]:hidden">
          <summary
            className={cn(
              "inline-flex cursor-pointer list-none items-center gap-2",
              "text-[15px] font-medium text-foreground outline-none",
              "underline decoration-primary/40 underline-offset-4",
              "transition-colors hover:decoration-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            )}
          >
            <span>{t("expandCta")}</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 group-open:rotate-90"
            >
              →
            </span>
          </summary>

          <div className="mt-8 border-t border-border/70 pt-8">
            <div className="flex items-center gap-2">
              <ClinicCross className="size-3 text-clinical" />
              <h3 className={cn(metaLabel, "text-foreground/75")}>
                {t("expandTitle")}
              </h3>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/68 md:text-[15px]">
              {t("expandIntro")}
            </p>

            <div className="mt-7 grid gap-3 sm:gap-4 md:grid-cols-3">
              {cards.map((card) => (
                <article
                  key={card.index}
                  className={cn(
                    "flex h-full flex-col rounded-md border border-border/80 bg-background/60 px-4 py-5",
                    "transition-[border-color,background-color] duration-200",
                    "hover:border-clinical/35 hover:bg-clinical-soft/35",
                  )}
                >
                  <p className={cn(metaLabel, "text-[10px]")}>
                    {card.index} · {card.label}
                  </p>
                  <h4 className="mt-3 font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
                    {card.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/68">
                    {card.body}
                  </p>
                  {card.pubmed ? (
                    <a
                      href={SASHO_RAYKOV_PUBLICATION.pubmedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                    >
                      {t("pubmedLink")}
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </details>
      </div>
    </Reveal>
  );
}
