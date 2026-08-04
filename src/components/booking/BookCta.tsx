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
} & VariantProps<typeof buttonVariants>;

/**
 * Primary appointment CTA — always routes through the booking provider.
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
}: BookCtaProps) {
  const t = useTranslations("common");
  const linkProps = getBookingLinkProps({
    utmSource,
    utmMedium,
    utmCampaign,
  });

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
