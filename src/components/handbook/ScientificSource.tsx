import { ClinicRule } from "@/components/brand/ClinicMotifs";
import { cn } from "@/lib/utils";

export type ScientificSourceData = {
  title: string;
  journal: string;
  year: string;
  url: string;
  intro?: string;
};

type ScientificSourceProps = {
  heading: string;
  intro: string;
  linkLabel: string;
  source: ScientificSourceData;
  className?: string;
};

/**
 * Editorial medical reference block for handbook articles.
 * Use only when the article topic is thematically related.
 */
export function ScientificSource({
  heading,
  intro,
  linkLabel,
  source,
  className,
}: ScientificSourceProps) {
  return (
    <aside
      className={cn(
        "rounded-md border border-border/70 bg-muted/40 px-5 py-6 sm:px-6",
        className,
      )}
      aria-label={heading}
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        {heading}
      </p>
      <ClinicRule className="mt-3 max-w-20" />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {source.intro ?? intro}
      </p>
      <p className="mt-4 font-display text-lg font-medium leading-snug tracking-tight text-foreground">
        {source.title}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {source.journal}, {source.year}.
      </p>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
      >
        {linkLabel}
        <span aria-hidden>→</span>
      </a>
    </aside>
  );
}
