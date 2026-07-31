"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border/80 bg-background/70 p-0.5",
        className,
      )}
      role="group"
      aria-label={t("label")}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={cn(
            "rounded px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
            locale === code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={locale === code}
        >
          {t(code)}
        </button>
      ))}
    </div>
  );
}
