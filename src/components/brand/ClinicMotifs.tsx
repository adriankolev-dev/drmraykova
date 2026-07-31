import { cn } from "@/lib/utils";

/** Tiny clinical cross — stationery detail, not hospital clipart. */
export function ClinicCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-3.5 shrink-0 text-primary", className)}
    >
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1" />
      <path
        d="M8 4.25v7.5M4.25 8h7.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Soft ECG-inspired rule — elegant medical rhythm between sections. */
export function ClinicPulse({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className="h-px flex-1 bg-border" />
      <svg
        viewBox="0 0 120 24"
        className="h-4 w-[7.5rem] text-primary/70"
        fill="none"
      >
        <path
          d="M0 12h28l4-8 5 16 4-10 3 2h76"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/** Double hairline — clinic letterhead feel. */
export function ClinicRule({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-[3px]", className)} aria-hidden>
      <div className="h-px bg-border" />
      <div className="h-px bg-border/60" />
    </div>
  );
}
