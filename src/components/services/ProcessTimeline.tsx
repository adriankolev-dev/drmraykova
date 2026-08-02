import { Reveal } from "@/components/motion/Reveal";

type ProcessTimelineProps = {
  heading: string;
  steps: string[];
  stepLabel: (n: number) => string;
  notes?: string[];
};

export function ProcessTimeline({
  heading,
  steps,
  stepLabel,
  notes,
}: ProcessTimelineProps) {
  return (
    <Reveal delay={0.1}>
      <h2 className="mt-14 font-display text-2xl font-medium tracking-tight md:text-3xl">
        {heading}
      </h2>
      <ol className="mt-8 space-y-0">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-5 pb-8 last:pb-0">
            {index < steps.length - 1 ? (
              <span
                className="absolute top-10 bottom-0 left-[1.15rem] w-px bg-border"
                aria-hidden
              />
            ) : null}
            <span className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-secondary font-mono text-xs text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {stepLabel(index + 1)}
              </p>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">
                {step}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {notes?.length ? (
        <ul className="mt-6 space-y-2 border-l-2 border-primary/30 pl-4 text-sm text-muted-foreground">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}
