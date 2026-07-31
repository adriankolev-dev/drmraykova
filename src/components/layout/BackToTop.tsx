"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

export function BackToTop() {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          key="back-to-top"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={goTop}
          aria-label={t("backToTop")}
          className={cn(
            "fixed bottom-5 right-5 z-[55] inline-flex size-11 cursor-pointer items-center justify-center rounded-md",
            "border border-border/80 bg-background/90 text-foreground shadow-[0_8px_28px_rgba(26,35,50,0.1)] backdrop-blur-md",
            "transition-colors hover:border-primary/45 hover:bg-accent",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            "md:bottom-8 md:right-8",
          )}
        >
          <ArrowUp className="size-4" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
