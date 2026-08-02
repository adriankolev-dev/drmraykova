import { Reveal } from "@/components/motion/Reveal";
import {
  ServiceEditorialBlock,
  type ServiceEditorialItem,
} from "@/components/services/ServiceEditorialBlock";

type ServicesEditorialListProps = {
  services: ServiceEditorialItem[];
  ctaLabel: string;
  className?: string;
};

/** Stacked editorial service blocks — premium clinic list, not a card grid. */
export function ServicesEditorialList({
  services,
  ctaLabel,
  className,
}: ServicesEditorialListProps) {
  return (
    <div className={className}>
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={Math.min(index * 0.04, 0.16)}>
          <ServiceEditorialBlock
            service={service}
            ctaLabel={ctaLabel}
            reverse={index % 2 === 1}
          />
        </Reveal>
      ))}
      <div className="border-t border-border" aria-hidden />
    </div>
  );
}
