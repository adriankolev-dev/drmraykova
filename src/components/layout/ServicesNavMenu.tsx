"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_FEATURED_SERVICE_SLUGS } from "@/lib/services-catalog";
import { cn } from "@/lib/utils";

type ServicesNavMenuProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function ServicesNavMenu({ variant, onNavigate }: ServicesNavMenuProps) {
  const t = useTranslations("nav");
  const names = useTranslations("serviceNames");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const servicesActive = pathname.startsWith("/uslugi");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open || variant !== "desktop") return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  const linkClass = (active: boolean) =>
    cn(
      "block rounded-md px-3 py-2.5 text-sm transition-colors",
      active
        ? "bg-accent text-foreground"
        : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
    );

  if (variant === "mobile") {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium transition-colors",
            servicesActive
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {t("services")}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={menuId}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ul className="flex flex-col gap-0.5 py-1 pl-2">
                {NAV_FEATURED_SERVICE_SLUGS.map((slug) => {
                  const href = `/uslugi/${slug}`;
                  const active = pathname === href;
                  return (
                    <li key={slug}>
                      <Link
                        href={href}
                        className={linkClass(active)}
                        onClick={onNavigate}
                      >
                        {names(slug)}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/uslugi"
                    className={cn(
                      linkClass(pathname === "/uslugi"),
                      "font-medium text-foreground",
                    )}
                    onClick={onNavigate}
                  >
                    {t("allServices")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/uslugi"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          servicesActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            const first = rootRef.current?.querySelector<HTMLElement>(
              "[data-services-menu-item]",
            );
            first?.focus();
          }
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {t("services")}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t("services")}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 w-[20rem] -translate-x-1/2 pt-3"
          >
            <div className="rounded-lg border border-border/80 bg-background/95 p-2 shadow-[0_18px_40px_-24px_rgba(26,35,50,0.45)] backdrop-blur-md">
              <ul className="flex flex-col">
                {NAV_FEATURED_SERVICE_SLUGS.map((slug) => {
                  const href = `/uslugi/${slug}`;
                  const active = pathname === href;
                  return (
                    <li key={slug} role="none">
                      <Link
                        href={href}
                        role="menuitem"
                        data-services-menu-item
                        className={linkClass(active)}
                        onClick={() => setOpen(false)}
                      >
                        {names(slug)}
                      </Link>
                    </li>
                  );
                })}
                <li role="none" className="mt-1 border-t border-border pt-1">
                  <Link
                    href="/uslugi"
                    role="menuitem"
                    data-services-menu-item
                    className={cn(
                      linkClass(pathname === "/uslugi"),
                      "font-medium text-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {t("allServices")}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
