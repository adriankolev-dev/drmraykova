import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServiceLinkCard } from "@/components/services/ServiceLinkCard";

type RelatedService = {
  slug: string;
  title: string;
  description: string;
};

type RelatedServicesProps = {
  heading: string;
  lead?: string;
  services: RelatedService[];
  ctaLabel: string;
};

export function RelatedServices({
  heading,
  lead,
  services,
  ctaLabel,
}: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
          {heading}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-xl text-muted-foreground">{lead}</p>
        ) : null}
      </Reveal>
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <RevealItem key={service.slug}>
            <ServiceLinkCard
              slug={service.slug}
              title={service.title}
              description={service.description}
              ctaLabel={ctaLabel}
              tone={index % 2 === 0 ? "plain" : "soft"}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
