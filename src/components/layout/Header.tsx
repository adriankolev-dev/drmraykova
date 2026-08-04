"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookCta } from "@/components/booking/BookCta";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ServicesNavMenu } from "@/components/layout/ServicesNavMenu";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { getMainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mainNav = getMainNav(t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-[4.75rem] items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center rounded-md py-1 pr-2"
          aria-label={t("homeAria")}
        >
          <span className="md:hidden">
            <BrandLogo variant="mobile" priority />
          </span>
          <span className="hidden md:inline-flex">
            <BrandLogo variant="full" priority className="contrast-125" />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-8"
          aria-label={t("home")}
        >
          {mainNav.map((item) => {
            if (item.href === "/uslugi") {
              return <ServicesNavMenu key={item.href} variant="desktop" />;
            }

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <BookCta
            size="sm"
            className="hidden sm:inline-flex"
            utmCampaign="header"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-background lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {mainNav.map((item) => {
                if (item.href === "/uslugi") {
                  return (
                    <ServicesNavMenu
                      key={item.href}
                      variant="mobile"
                      onNavigate={() => setOpen(false)}
                    />
                  );
                }

                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between gap-3 px-3 pt-3">
                <LocaleSwitcher />
              </div>
              <div className="pt-3">
                <BookCta className="w-full" utmCampaign="mobile-nav" />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
