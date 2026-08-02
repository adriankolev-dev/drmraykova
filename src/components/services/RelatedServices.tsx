import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { getCategoryForSlug } from "@/lib/services-catalog";

type RelatedService = {
  slug: string;
  title: string;
  description: string;
  categoryLabel?: string;
};

type RelatedServicesProps = {
  heading: string;
  lead?: string;
  services: RelatedService[];
  ctaLabel: string;
  categoryLabels?: Record<string, string>;
};

/**
 * Related services — high-end editorial list.
 * No cards, borders-as-boxes, or tinted containers.
 */
export function RelatedServices({
  heading,
  lead,
  services,
  ctaLabel,
  categoryLabels,
}: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <section className="mt-16 border-t border-border/60 pt-12 md:pt-16">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {heading}
          </h2>
          {lead ? (
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              {lead}
            </p>
          ) : null}
        </Reveal>

        <ul className="md:col-span-8">
          {services.map((service, index) => {
            const categoryId = getCategoryForSlug(service.slug);
            const categoryLabel =
              service.categoryLabel ??
              (categoryId && categoryLabels
                ? categoryLabels[categoryId]
                : undefined);
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <li key={service.slug}>
                <Reveal delay={0.05 + index * 0.04}>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="group relative flex gap-5 border-t border-border/60 py-8 first:border-t-0 first:pt-0 md:gap-8 md:py-9"
                  >
                    <span
                      aria-hidden
                      className={
                        index === 0
                          ? "absolute bottom-8 left-0 top-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100 md:bottom-9"
                          : "absolute inset-y-8 left-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100 md:inset-y-9"
                      }
                    />

                    <span
                      aria-hidden
                      className="shrink-0 pt-0.5 font-display text-lg font-medium tracking-tight text-foreground/20 md:text-xl"
                    >
                      {indexLabel}
                    </span>

                    <span className="min-w-0 flex-1 pl-1">
                      {categoryLabel ? (
                        <span className="block font-mono text-xs uppercase tracking-widest text-[color-mix(in_srgb,var(--primary)_42%,var(--foreground))]">
                          {categoryLabel}
                        </span>
                      ) : null}

                      <span className="mt-2 block font-display text-xl font-medium tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-1.5 md:text-2xl">
                        {service.title}
                      </span>

                      <span className="mt-2.5 block max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                        {service.description}
                      </span>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                        {ctaLabel}
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-1.5"
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
