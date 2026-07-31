"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  variant?: "mark" | "full" | "fullOnDark" | "mobile";
  withWordmark?: boolean;
  wordmark?: string;
  priority?: boolean;
};

const assets = {
  mark: {
    src: "/logo-mark.webp",
    width: 512,
    height: 512,
    alt: "МР",
  },
  full: {
    src: "/logo.webp",
    width: 168,
    height: 110,
    alt: "Д-р Мария Райкова — Специалист акушер-гинеколог",
  },
  fullOnDark: {
    src: "/logo-on-dark.webp",
    width: 168,
    height: 112,
    alt: "Д-р Мария Райкова — Специалист акушер-гинеколог",
  },
} as const;

export function BrandLogo({
  className,
  variant = "mark",
  withWordmark = false,
  wordmark,
  priority = false,
}: BrandLogoProps) {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const name = wordmark ?? t("brand");

  if (variant === "mobile") {
    return (
      <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
        <Image
          src={assets.mark.src}
          alt=""
          width={80}
          height={80}
          priority={priority}
          className="size-10 shrink-0 object-contain"
        />
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-display text-[0.98rem] font-semibold tracking-tight text-foreground">
            {name}
          </span>
          <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            {tc("specialty")}
          </span>
        </span>
        <span className="sr-only">
          {name} — {tc("specialty")}
        </span>
      </span>
    );
  }

  const asset = assets[variant];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={asset.src}
        alt={withWordmark ? "" : asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={cn(
          "h-auto w-auto object-contain",
          variant === "mark" && "h-10 w-10 md:h-11 md:w-11",
          variant === "full" && "h-[3.35rem] w-auto md:h-[3.85rem]",
          variant === "fullOnDark" && "h-16 w-auto md:h-[4.5rem]",
        )}
      />
      {withWordmark ? (
        <span className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg md:text-xl">
          {name}
        </span>
      ) : null}
      {withWordmark ? <span className="sr-only">{asset.alt}</span> : null}
    </span>
  );
}
