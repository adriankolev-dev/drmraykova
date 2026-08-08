"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { HOP_EVENT } from "@/components/booking/SuperdocCompanion";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

export function BackToTop() {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // Doubles as the Superdoc companion's launch pad, so it takes the weight
  // when the mascot pushes off it or drops back on.
  const padScaleX = useMotionValue(1);
  const padScaleY = useMotionValue(1);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHop = () => {
      const timing = {
        duration: 0.52,
        times: [0, 0.18, 0.46, 1],
        ease: "easeOut" as const,
      };
      animate(padScaleY, [1, 0.78, 1.06, 1], timing);
      animate(padScaleX, [1, 1.14, 0.97, 1], timing);
    };
    window.addEventListener(HOP_EVENT, onHop);
    return () => window.removeEventListener(HOP_EVENT, onHop);
  }, [padScaleX, padScaleY]);

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
          style={{
            scaleX: padScaleX,
            scaleY: padScaleY,
            transformOrigin: "50% 100%",
          }}
          onClick={goTop}
          aria-label={t("backToTop")}
          data-superdoc-pad=""
          className={cn(
            "fixed bottom-6 right-5 z-[55] inline-flex h-12 w-[3.75rem] cursor-pointer items-center justify-center rounded-xl",
            "border border-[#d8cfc3] text-foreground",
            // A lighter band along the top reads as the slab's lit top face,
            // and the solid offset below it as its thickness — together they
            // make it something the mascot can plausibly stand on.
            "bg-[linear-gradient(to_bottom,#ffffff_0,#fcf9f4_9px,#efe8de_100%)]",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_5px_0_0_#cdc2b3,0_18px_24px_-14px_rgba(26,35,50,0.45)]",
            "transition-colors hover:border-primary/50",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            "md:bottom-9 md:right-8",
          )}
        >
          <ArrowUp className="size-[1.15rem]" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
