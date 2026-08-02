"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ServiceLinkCard } from "@/components/services/ServiceLinkCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselService = {
  slug: string;
  title: string;
  description: string;
};

type ServicesCarouselProps = {
  services: CarouselService[];
  ctaLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export function ServicesCarousel({
  services,
  ctaLabel,
  prevLabel,
  nextLabel,
}: ServicesCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      ro.disconnect();
    };
  }, [updateButtons, services.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-service-slide]");
    const styles = getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const amount = (card?.offsetWidth ?? el.clientWidth) + gap;
    el.scrollBy({
      left: direction * amount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative mt-10">
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 text-primary hover:bg-secondary hover:text-primary"
          aria-label={prevLabel}
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          variant="primary"
          size="icon"
          className="size-10"
          aria-label={nextLabel}
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className={cn(
            "flex snap-x snap-mandatory gap-0 overflow-x-auto pb-1 sm:gap-4 sm:pb-2",
            "scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollByCard(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollByCard(1);
            }
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.slug}
              data-service-slide
              className="w-full shrink-0 snap-start sm:w-[22rem]"
            >
              <ServiceLinkCard
                slug={service.slug}
                title={service.title}
                description={service.description}
                ctaLabel={ctaLabel}
                compact
                tone={index % 2 === 0 ? "plain" : "soft"}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Edge fades only on larger screens — avoid “cut” look on mobile */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 sm:block",
            canPrev ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 sm:block",
            canNext ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
