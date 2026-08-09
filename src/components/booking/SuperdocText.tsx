import type { ReactNode } from "react";
import { SuperdocMark } from "@/components/booking/SuperdocMark";
import { getBookingUrl } from "@/lib/booking";
import { cn } from "@/lib/utils";

const SUPERDOC_PATTERN = /(Superdoc)/g;

type SuperdocLinkProps = {
  children?: ReactNode;
  className?: string;
  utmCampaign?: string;
  /** Use on pink/ink panels where default link color would clash. */
  tone?: "default" | "onPrimary";
  /** Show the Superdoc mascot mark — for standalone links, not mid-sentence. */
  withMark?: boolean;
};

/** Standalone Superdoc profile link. */
export function SuperdocLink({
  children = "Superdoc",
  className,
  utmCampaign = "inline-superdoc",
  tone = "default",
  withMark = false,
}: SuperdocLinkProps) {
  return (
    <a
      href={getBookingUrl({
        utmSource: "website",
        utmMedium: "inline",
        utmCampaign,
      })}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium underline underline-offset-3 transition-colors",
        tone === "onPrimary"
          ? "text-primary-foreground decoration-primary-foreground/55 hover:decoration-primary-foreground"
          : "text-foreground decoration-primary/50 hover:text-primary hover:decoration-primary",
        className,
      )}
    >
      {withMark ? <SuperdocMark size={16} /> : null}
      <strong className="font-semibold">{children}</strong>
    </a>
  );
}

type SuperdocTextProps = {
  text: string;
  className?: string;
  linkClassName?: string;
  utmCampaign?: string;
  tone?: "default" | "onPrimary";
  as?: "span" | "p";
  /**
   * When true, each “Superdoc” mention becomes a booking link (legacy).
   * Default is false — brand name is emphasized with <strong> instead, so
   * pages don’t accumulate dozens of identical “Superdoc” anchors.
   */
  linkMentions?: boolean;
};

/**
 * Renders plain text and emphasizes every “Superdoc” mention.
 * Set `linkMentions` only when the sentence itself should be a booking CTA.
 */
export function SuperdocText({
  text,
  className,
  linkClassName,
  utmCampaign = "inline-superdoc",
  tone = "default",
  as: Tag = "span",
  linkMentions = false,
}: SuperdocTextProps) {
  if (!text.includes("Superdoc")) {
    return <Tag className={className}>{text}</Tag>;
  }

  const parts = text.split(SUPERDOC_PATTERN);

  return (
    <Tag className={className}>
      {parts.map((part, index) =>
        part === "Superdoc" ? (
          linkMentions ? (
            <SuperdocLink
              key={`superdoc-${index}`}
              className={linkClassName}
              utmCampaign={utmCampaign}
              tone={tone}
            />
          ) : (
            <strong key={`superdoc-${index}`} className="font-semibold">
              Superdoc
            </strong>
          )
        ) : (
          <span key={`text-${index}`}>{part}</span>
        ),
      )}
    </Tag>
  );
}
