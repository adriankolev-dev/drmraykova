"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

/** Subtle page enter — remounts on route change so motion restarts. */
export function PageEnter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
