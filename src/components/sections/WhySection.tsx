import { getTranslations } from "next-intl/server";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";

export async function WhySection() {
  const t = await getTranslations("why");
  const items = t.raw("items") as Array<{ title: string; body: string }>;

  return (
    <section className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionHeading title={t("title")} className="mt-4" />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {items.map((item, index) => (
            <RevealItem key={item.title}>
              <p className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                <SuperdocText text={item.body} utmCampaign="why-inline" />
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
