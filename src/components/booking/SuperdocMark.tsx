import Image from "next/image";
import { cn } from "@/lib/utils";

type SuperdocMarkProps = {
  className?: string;
  /** Visual size in pixels — defaults to 20 for button/inline use. */
  size?: number;
  priority?: boolean;
};

/**
 * Official Superdoc mascot mark (hosted locally from their favicon asset).
 * Use beside booking CTAs and Superdoc attribution — not mid-sentence.
 */
export function SuperdocMark({
  className,
  size = 20,
  priority = false,
}: SuperdocMarkProps) {
  return (
    <Image
      src="/partners/superdoc-icon.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 rounded-full", className)}
      aria-hidden
    />
  );
}
