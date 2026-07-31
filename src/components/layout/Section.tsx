import { ClinicCross } from "@/components/brand/ClinicMotifs";
import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <ClinicCross className="size-3 opacity-90" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
