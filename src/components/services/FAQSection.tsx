import { Reveal } from "@/components/motion/Reveal";
import { SuperdocText } from "@/components/booking/SuperdocText";

export type FaqItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  heading: string;
  items: FaqItem[];
  className?: string;
};

export function FAQSection({ heading, items, className }: FAQSectionProps) {
  if (!items.length) return null;

  return (
    <Reveal delay={0.15} className={className}>
      <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details
            key={item.question}
            className="group py-5 open:pb-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left outline-none transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <h3 className="font-medium text-foreground group-open:text-foreground">
                {item.question}
              </h3>
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-primary/40 group-open:text-primary"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              <SuperdocText text={item.answer} utmCampaign="faq-inline" />
            </p>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
