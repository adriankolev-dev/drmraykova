import { Link } from "@/i18n/navigation";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow } from "@/components/layout/Section";

type ServiceHeroProps = {
  title: string;
  intro: string;
  breadcrumbServices: string;
  withDoctor: string;
  utmCampaign: string;
};

export function ServiceHero({
  title,
  intro,
  breadcrumbServices,
  withDoctor,
  utmCampaign,
}: ServiceHeroProps) {
  return (
    <Reveal>
      <SectionEyebrow>
        <Link href="/uslugi" className="hover:text-foreground">
          {breadcrumbServices}
        </Link>
        {" / "}
        {title}
      </SectionEyebrow>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {intro}
      </p>
      <p className="mt-4 text-muted-foreground">{withDoctor}</p>
      <div className="mt-8">
        <BookCta utmCampaign={utmCampaign} />
      </div>
    </Reveal>
  );
}
