"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ClinicCross } from "@/components/brand/ClinicMotifs";
import { Link } from "@/i18n/navigation";
import { getCategoryForSlug } from "@/lib/services-catalog";
import { cn } from "@/lib/utils";

export type ServiceEditorialItem = {
  slug: string;
  title: string;
  description: string;
  includes: string;
  suitable: string;
  index: number;
};

type ServiceEditorialBlockProps = {
  service: ServiceEditorialItem;
  ctaLabel: string;
  /** Alternate text / visual side on desktop. */
  reverse?: boolean;
  className?: string;
};

export function ServiceEditorialBlock({
  service,
  ctaLabel,
  reverse = false,
  className,
}: ServiceEditorialBlockProps) {
  const meta = useTranslations("serviceCardMeta");
  const categories = useTranslations("servicesPage.categories");
  const categoryId = getCategoryForSlug(service.slug);
  const categoryLabel = categoryId ? categories(categoryId) : null;
  const indexLabel = String(service.index).padStart(2, "0");

  return (
    <article
      className={cn(
        "grid items-center gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-10 md:py-16",
        className,
      )}
    >
      <div
        className={cn(
          "order-2 md:col-span-7",
          reverse ? "md:order-2" : "md:order-1",
        )}
      >
        {categoryLabel ? (
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
            {categoryLabel}
          </p>
        ) : null}
        <h3 className="mt-0 max-w-xl font-display text-2xl font-medium tracking-tight text-foreground md:mt-3 md:text-3xl lg:text-[2rem]">
          <Link
            href={`/uslugi/${service.slug}`}
            className="transition-colors hover:text-primary"
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {service.description}
        </p>

        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:w-36">
              {meta("durationLabel")}
            </dt>
            <dd className="text-foreground/85">
              {meta(`duration.${service.slug}`)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:w-36">
              {meta("includesLabel")}
            </dt>
            <dd className="max-w-md text-foreground/85">{service.includes}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:w-36">
              {meta("suitableLabel")}
            </dt>
            <dd className="max-w-md text-foreground/85">{service.suitable}</dd>
          </div>
        </dl>

        <Link
          href={`/uslugi/${service.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          {ctaLabel}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      <div
        className={cn(
          "relative order-1 flex min-h-[5.5rem] items-end overflow-hidden rounded-md bg-secondary/35 px-5 py-4 md:col-span-5 md:min-h-[17rem] md:px-8 md:py-8",
          reverse ? "md:order-1" : "md:order-2",
        )}
        aria-hidden
      >
        <div className="relative flex w-full items-end justify-between gap-4">
          <div>
            <ClinicCross className="size-4 text-primary/70" />
            {categoryLabel ? (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:mt-4">
                {categoryLabel}
              </p>
            ) : null}
          </div>
          <p className="font-display text-4xl font-medium tracking-tight text-foreground/15 md:text-6xl">
            {indexLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
