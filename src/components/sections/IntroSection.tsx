import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";

export async function IntroSection() {
  const t = await getTranslations("intro");

  return (
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionHeading title={t("title")} className="mt-4" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
          <Link
            href="/za-lekarya"
            className="mt-8 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("moreAbout")}
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="space-y-4 border-l border-primary/40 pl-6">
            {(t.raw("points") as string[]).map((point) => (
              <li
                key={point}
                className="text-base leading-relaxed text-foreground/90"
              >
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
