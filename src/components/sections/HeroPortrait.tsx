"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { doctor } from "@/lib/doctor";

export function HeroPortrait() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[min(78vw,440px)] w-full sm:h-[500px] lg:mx-0 lg:h-full lg:min-h-[calc(100svh-4.5rem)] lg:max-h-none">
      <motion.div
        aria-hidden
        className="absolute left-[48%] top-[22%] size-[min(88%,420px)] -translate-x-1/2 rounded-full lg:left-[46%] lg:top-[18%] lg:size-[min(92%,520px)]"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--primary) 55%, white), color-mix(in srgb, var(--secondary) 80%, transparent) 62%, transparent 72%)",
        }}
        initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Soft wash without heavy blur on mobile (CWV) */}
      <div
        aria-hidden
        className="absolute bottom-[8%] left-1/2 h-[45%] w-[90%] -translate-x-1/2 rounded-[50%] opacity-60 lg:bottom-[4%] lg:opacity-70 lg:blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 top-[4%] lg:top-[6%]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/doctor-hero.webp"
          alt={`${doctor.name} — ${doctor.specialty}`}
          fill
          priority
          sizes="(max-width: 1023px) 90vw, 46vw"
          className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(26,35,50,0.14)]"
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent lg:h-16"
      />
    </div>
  );
}
