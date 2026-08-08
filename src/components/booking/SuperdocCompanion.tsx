"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "@/i18n/navigation";
import { getBookingLinkProps } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Mode = "hidden" | "park" | "travel" | "docked";

const COOKIE_KEY = "mr-cookie-consent";
const SLOT_SELECTOR = "[data-superdoc-slot]";
const PAD_SELECTOR = "[data-superdoc-pad]";
/** Tells the pad to recoil when the companion jumps off it or lands back on. */
export const HOP_EVENT = "mr-superdoc-hop";
const NARROW_QUERY = "(max-width: 767px)";
/** Mascot artwork aspect ratio (width / height). */
const ASPECT = 0.58;
/**
 * Journey window, measured as the CTA slot's top edge in viewport heights.
 * The whole flight is scroll-linked, so it can never overshoot the target.
 */
const TRAVEL_START = 1.15;
const TRAVEL_END = 0.68;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

function hasCookieConsent(): boolean {
  const value = window.localStorage.getItem(COOKIE_KEY);
  return value === "accepted" || value === "essential";
}

function subscribeConsent(onStoreChange: () => void) {
  window.addEventListener("mr-cookie-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("mr-cookie-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function subscribeViewport(onStoreChange: () => void) {
  const mq = window.matchMedia(NARROW_QUERY);
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  mq.addEventListener("change", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
    mq.removeEventListener("change", onStoreChange);
  };
}

function findPad(): HTMLElement | null {
  return document.querySelector<HTMLElement>(PAD_SELECTOR);
}

/**
 * Resting spot before the flight: standing on top of the back-to-top button,
 * which doubles as the companion's launch pad. Falls back to the bottom-right
 * corner if the pad is not on screen.
 */
function parkSpot(narrow: boolean) {
  const height = narrow ? 78 : 102;
  const width = height * ASPECT;
  const pad = findPad()?.getBoundingClientRect();

  if (pad) {
    return {
      height,
      left: pad.left + pad.width / 2 - width / 2,
      // Sink the feet a couple of pixels into the pad so it reads as standing
      // on it rather than hovering above it.
      top: pad.top - height + 3,
    };
  }

  return {
    height,
    left: window.innerWidth - (narrow ? 16 : 28) - width,
    top: window.innerHeight - (narrow ? 112 : 96) - height,
  };
}

function travelProgress(slotTop: number) {
  const ratio = slotTop / window.innerHeight;
  return clamp01((TRAVEL_START - ratio) / (TRAVEL_START - TRAVEL_END));
}

/** The page's landing pill — the last one wins if a page ever marks two. */
function findSlot(): HTMLElement | null {
  const slots = document.querySelectorAll<HTMLElement>(SLOT_SELECTOR);
  return slots.length ? slots[slots.length - 1] : null;
}

function getModeSnapshot(): Mode {
  const slot = findSlot();
  if (!slot) return "hidden";

  const progress = travelProgress(slot.getBoundingClientRect().top);
  if (progress >= 1) return "docked";
  if (progress > 0) return "travel";

  // Idle companion only on pointer-sized screens, and only while it has the
  // back-to-top pad to stand on; on phones it would sit on top of the content
  // the whole way down.
  const narrow = window.matchMedia(NARROW_QUERY).matches;
  if (!narrow && findPad()) return "park";
  return "hidden";
}

function MascotImg({ className }: { className?: string }) {
  return (
    // Local partner SVG — Next/Image SVG needs dangerouslyAllowSVG
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/partners/superdoc-hero.svg"
      alt=""
      className={cn(
        "pointer-events-none h-full w-auto select-none object-contain object-bottom",
        className,
      )}
      aria-hidden
      decoding="async"
      draggable={false}
    />
  );
}

/**
 * Site-wide Superdoc guide. Mounted once in the layout; it waits by the edge
 * and flies onto whichever booking pill the page marked with `mascotDock`.
 * The flight is driven by scroll position, so it always lands exactly in the
 * slot no matter how fast the page is scrolled. Pages without a marked pill
 * render nothing.
 */
export function SuperdocCompanion() {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  const cookiesOk = useSyncExternalStore(
    subscribeConsent,
    hasCookieConsent,
    () => false,
  );
  const mode = useSyncExternalStore(
    subscribeViewport,
    getModeSnapshot,
    () => "hidden" as Mode,
  );

  const leftMv = useMotionValue(0);
  const topMv = useMotionValue(0);
  const heightMv = useMotionValue(116);
  const rotateMv = useMotionValue(0);
  const opacityMv = useMotionValue(0);
  const cueMv = useMotionValue(0);

  const left = useSpring(leftMv, { stiffness: 420, damping: 44, mass: 0.6 });
  const top = useSpring(topMv, { stiffness: 420, damping: 44, mass: 0.6 });
  const rotate = useSpring(rotateMv, { stiffness: 200, damping: 26 });

  const linkProps = getBookingLinkProps({
    utmSource: "website",
    utmMedium: "cta",
    utmCampaign: "home-superdoc-companion",
  });

  const writeFrame = useCallback(() => {
    const slot = findSlot();
    const narrow = window.matchMedia(NARROW_QUERY).matches;
    const park = parkSpot(narrow);

    if (!slot) {
      leftMv.set(park.left);
      topMv.set(park.top);
      heightMv.set(park.height);
      return;
    }

    const target = slot.getBoundingClientRect();
    const progress = travelProgress(target.top);
    const eased = easeInOut(progress);
    // Hop over the gap instead of sliding in a straight line.
    const arc = reduceMotion
      ? 0
      : (narrow ? 56 : 92) * Math.sin(Math.PI * progress);

    leftMv.set(lerp(park.left, target.left, eased));
    topMv.set(lerp(park.top, target.top, eased) - arc);
    heightMv.set(lerp(park.height, target.height || park.height, eased));
    rotateMv.set(reduceMotion ? 0 : Math.sin(Math.PI * progress) * -9);
    opacityMv.set(narrow ? clamp01(progress * 6) : 1);
    cueMv.set(
      reduceMotion ? 0 : clamp01(progress > 0 ? (0.45 - progress) / 0.18 : 1),
    );
  }, [cueMv, heightMv, leftMv, opacityMv, reduceMotion, rotateMv, topMv]);

  useLayoutEffect(() => {
    if (!cookiesOk) return;
    writeFrame();
  }, [cookiesOk, mode, writeFrame]);

  useEffect(() => {
    if (!cookiesOk) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        writeFrame();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cookiesOk, writeFrame]);

  // Let the pad recoil as the companion pushes off it or drops back onto it.
  const lastMode = useRef(mode);
  useEffect(() => {
    const from = lastMode.current;
    lastMode.current = mode;
    // A fast scroll can skip straight past "travel", so key off arriving at or
    // leaving the pad rather than the flight itself. Fading in and out of
    // "hidden" is not a jump, so it leaves the pad alone.
    const jumped = from === "park" && mode !== "park" && mode !== "hidden";
    const landed = mode === "park" && from !== "park" && from !== "hidden";
    if ((jumped || landed) && !reduceMotion) {
      window.dispatchEvent(new Event(HOP_EVENT));
    }
  }, [mode, reduceMotion]);

  // Claim this page's pill so it drops its static mascot — without the
  // companion the pill keeps rendering it, so no-JS and no-consent still work.
  useEffect(() => {
    if (!cookiesOk) return;
    const slot = findSlot();
    if (!slot) return;
    slot.dataset.superdocActive = "";
    return () => {
      delete slot.dataset.superdocActive;
    };
  }, [cookiesOk, pathname]);

  if (!cookiesOk) return null;

  const flying = mode === "park" || mode === "travel";
  const slotEl = mode === "docked" ? findSlot() : null;

  return (
    <>
      {flying ? (
        <motion.div
          className="pointer-events-none fixed z-50"
          style={{
            left,
            top,
            height: heightMv,
            rotate,
            opacity: opacityMv,
            transformOrigin: "50% 90%",
          }}
        >
          <a
            {...linkProps}
            aria-label={t("mascotAria")}
            // Only a target while it stands still — chasing a moving link is a
            // bad tap target, especially on touch.
            aria-hidden={mode !== "park"}
            tabIndex={mode === "park" ? undefined : -1}
            className={cn(
              "relative block h-full outline-none",
              mode === "park" ? "pointer-events-auto" : "pointer-events-none",
              "focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#01bfa5]",
            )}
          >
            <motion.span
              className="pointer-events-none absolute bottom-full right-0 mb-2 block whitespace-nowrap rounded-2xl rounded-br-md border border-[#01bfa5]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#017a6a] shadow-[0_8px_22px_-12px_rgba(1,120,100,0.55)]"
              style={{ opacity: cueMv }}
            >
              {t("mascotCue")}
            </motion.span>
            <motion.span
              className="block h-full origin-bottom"
              // Standing on the pad it sways on its feet; a floaty bob would
              // undercut the idea that it is perched on something.
              animate={
                mode === "park" && !reduceMotion
                  ? { rotate: [0, 2.2, 0, -2.2, 0] }
                  : { rotate: 0 }
              }
              transition={
                mode === "park" && !reduceMotion
                  ? { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              <MascotImg className="drop-shadow-[0_12px_26px_rgba(1,120,100,0.3)]" />
            </motion.span>
          </a>
        </motion.div>
      ) : null}

      {slotEl
        ? createPortal(
            <motion.span
              className="absolute inset-0 block"
              initial={reduceMotion ? false : { scaleY: 0.9, y: 4 }}
              animate={{ scaleY: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 460, damping: 18 }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <MascotImg className="drop-shadow-[0_4px_8px_rgba(1,120,100,0.18)]" />
            </motion.span>,
            slotEl,
          )
        : null}
    </>
  );
}
