"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mr-cookie-consent";

type ConsentValue = "accepted" | "essential";

function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "essential") return value;
  return null;
}

function writeConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event("mr-cookie-consent"));
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  function acceptAll() {
    writeConsent("accepted");
    setVisible(false);
  }

  function acceptEssential() {
    writeConsent("essential");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-border bg-background/95 p-5 shadow-[0_-8px_40px_rgba(26,35,50,0.08)] backdrop-blur-md md:flex-row md:items-end md:gap-6 md:p-6">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-medium tracking-tight text-foreground">
            {t("title")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("body")}{" "}
            <Link
              href="/politika-za-poveritelnost"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {t("policyLink")}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={acceptEssential}
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
          >
            {t("essential")}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
