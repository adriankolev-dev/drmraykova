"use client";

import { ArrowRight, ArrowUpRight, Clock3, MapPin, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";
import { getServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

type ServiceLinkCardProps = {
  slug: string;
  title: string;
  description: string;
  ctaLabel?: string;
  /** Show duration / city / doctor meta row (default true). */
  showMeta?: boolean;
  /** Tighter meta for carousels — duration + city only. */
  compact?: boolean;
  /** Alternating surface: plain (white) / soft (tinted). */
  tone?: "plain" | "soft";
  className?: string;
};

export function ServiceLinkCard({
  slug,
  title,
  description,
  ctaLabel,
  showMeta = true,
  compact = false,
  tone = "plain",
  className,
}: ServiceLinkCardProps) {
  const Icon = getServiceIcon(slug);
  const t = useTranslations("serviceCardMeta");
  const tc = useTranslations("common");

  return (
    <Link
      href={`/uslugi/${slug}`}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-lg border border-border p-5 transition-[border-color,transform,background-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/50 motion-safe:hover:shadow-[0_12px_28px_-18px_rgba(26,35,50,0.35)] md:p-6",
        tone === "soft"
          ? "bg-secondary/55 hover:bg-secondary/80"
          : "bg-background hover:bg-accent/50",
        className,
      )}
    >
      <span className="flex gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground md:size-14">
          <Icon className="size-6 md:size-7" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span className="font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
              {title}
            </span>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </span>
          <span
            className={cn(
              "mt-2 block text-sm leading-relaxed text-muted-foreground md:text-[15px]",
              compact && "line-clamp-2",
            )}
          >
            {description}
          </span>
        </span>
      </span>

      {showMeta ? (
        <span
          className={cn(
            "mt-auto flex border-t border-border/70 pt-3 text-[13px] text-muted-foreground",
            compact
              ? "flex-row flex-wrap gap-x-3 gap-y-1"
              : "flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1.5",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5 shrink-0 text-primary/80" aria-hidden />
            <span>{t(`duration.${slug}`)}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 text-primary/80" aria-hidden />
            <span>{t("location", { city: tc("city") })}</span>
          </span>
          {!compact ? (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <UserRound
                className="size-3.5 shrink-0 text-primary/80"
                aria-hidden
              />
              <span className="truncate">
                {t("provider", { name: doctor.name })}
              </span>
            </span>
          ) : null}
        </span>
      ) : null}

      {ctaLabel ? (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary",
            !showMeta && "mt-auto pt-1",
          )}
        >
          {ctaLabel}
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      ) : null}
    </Link>
  );
}
