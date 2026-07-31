"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

/** Thin top progress bar — low cost, premium feel. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
