"use client";

import { useTranslations } from "next-intl";
import { getBookingLinkProps, bookingConfig } from "@/lib/booking";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type BookCtaProps = {
  className?: string;
  label?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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
}: BookCtaProps) {
  const t = useTranslations("common");
  const linkProps = getBookingLinkProps({
    utmSource,
    utmMedium,
    utmCampaign,
  });

  return (
    <a
      {...linkProps}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={`${label ?? t("bookCta")} — Superdoc`}
    >
      {label ?? t("bookCta")}
    </a>
  );
}

export { bookingConfig };
