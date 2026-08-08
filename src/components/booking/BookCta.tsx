"use client";

import { useTranslations } from "next-intl";
import { getBookingLinkProps, bookingConfig } from "@/lib/booking";
import { SuperdocMark } from "@/components/booking/SuperdocMark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type BookCtaProps = {
  className?: string;
  label?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** Hide the Superdoc mark (rare — default shows it as booking provider cue). */
  hideMark?: boolean;
  /**
   * Marks this pill as the landing target for SuperdocCompanion. Set it on the
   * closing CTA of a page only — a second target on the same page is ignored.
   */
  mascotDock?: boolean;
} & VariantProps<typeof buttonVariants>;

/**
 * Primary appointment CTA — always routes through the booking provider.
 * Use `variant="superdoc"` for the partner pill (mascot + teal outline) on
 * booking panels; keep brand `primary` for hero/header identity.
 */
export function BookCta({
  className,
  label,
  variant = "primary",
  size = "lg",
  utmSource = "website",
  utmMedium = "cta",
  utmCampaign,
  hideMark = false,
  mascotDock = false,
}: BookCtaProps) {
  const t = useTranslations("common");
  const linkProps = getBookingLinkProps({
    utmSource,
    utmMedium,
    utmCampaign,
  });

  if (variant === "superdoc") {
    const compact = size === "sm";
    const text = label ?? t("bookOnlineCta");

    return (
      <a
        {...linkProps}
        className={cn(
          "group relative inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-[#01bfa5] bg-white font-semibold text-[#01bfa5]",
          "transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01bfa5]",
          "motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#e6faf7] motion-safe:hover:shadow-[0_12px_28px_-14px_rgba(1,191,165,0.65)]",
          "motion-safe:active:translate-y-0",
          compact
            ? "h-10 gap-2 py-0 pl-11 pr-5 text-sm"
            : "h-12 gap-2.5 py-0 pl-[3.35rem] pr-7 text-base sm:h-[3.25rem] sm:pl-14 sm:pr-8",
          className,
        )}
        aria-label={`${text} — Superdoc`}
      >
        <span
          data-superdoc-slot={mascotDock ? "" : undefined}
          className={cn(
            "pointer-events-none absolute z-[1]",
            compact
              ? "bottom-[-10%] left-[-6%] h-[2.85rem] w-[1.65rem]"
              : "bottom-[-12%] left-[-5%] h-[4.35rem] w-[2.52rem] sm:h-[4.85rem] sm:w-[2.8rem]",
          )}
        >
          {/* Local partner SVG — Next/Image SVG needs dangerouslyAllowSVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/partners/superdoc-hero.svg"
            alt=""
            width={compact ? 28 : 44}
            height={compact ? 48 : 76}
            className="h-full w-full object-contain object-bottom drop-shadow-[0_4px_8px_rgba(1,120,100,0.18)] transition-opacity duration-200"
            aria-hidden
            decoding="async"
          />
        </span>
        <span className="relative z-[2]">{text}</span>
      </a>
    );
  }

  const markSize = size === "sm" ? 16 : 18;

  return (
    <a
      {...linkProps}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={`${label ?? t("bookCta")} — Superdoc`}
    >
      {hideMark ? null : <SuperdocMark size={markSize} />}
      {label ?? t("bookCta")}
    </a>
  );
}

export { bookingConfig };
