import { BookCta } from "@/components/booking/BookCta";
import { ContentText } from "@/components/content/ContentText";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionEyebrow } from "@/components/layout/Section";

type ServiceHeroProps = {
  title: string;
  intro: string;
  breadcrumbHome: string;
  breadcrumbServices: string;
  withDoctor: string;
  utmCampaign: string;
};

export function ServiceHero({
  title,
  intro,
  breadcrumbHome,
  breadcrumbServices,
  withDoctor,
  utmCampaign,
}: ServiceHeroProps) {
  return (
    <Reveal>
      <Breadcrumbs
        className="mb-4"
        items={[
          { label: breadcrumbHome, href: "/" },
          { label: breadcrumbServices, href: "/uslugi" },
          { label: title },
        ]}
      />
      <SectionEyebrow>{breadcrumbServices}</SectionEyebrow>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        <ContentText text={intro} />
      </p>
      <p className="mt-4 text-muted-foreground">{withDoctor}</p>
      <div className="mt-8">
        <BookCta utmCampaign={utmCampaign} />
      </div>
    </Reveal>
  );
}
