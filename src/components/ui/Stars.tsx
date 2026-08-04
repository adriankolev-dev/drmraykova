import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarsProps = {
  /** Rating out of 5; rounded to the nearest whole star for the visual. */
  value: number;
  className?: string;
  starClassName?: string;
  label?: string;
};

export function Stars({
  value,
  className,
  starClassName,
  label,
}: StarsProps) {
  const filled = Math.round(value);

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `${value}/5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn(
            "size-3.5",
            index < filled
              ? "fill-primary text-primary"
              : "fill-transparent text-border",
            starClassName,
          )}
        />
      ))}
    </div>
  );
}
