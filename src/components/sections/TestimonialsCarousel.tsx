"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { SuperdocLink } from "@/components/booking/SuperdocText";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/Stars";
import type { Testimonial } from "@/content/testimonials.i18n";
import { cn } from "@/lib/utils";

type TestimonialsCarouselProps = {
  items: Testimonial[];
  prevLabel: string;
  nextLabel: string;
};

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-background p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {item.date} ·{" "}
            <SuperdocLink
              className="text-xs font-normal"
              utmCampaign="testimonial-source"
            />
          </p>
        </div>
        <Stars value={item.rating} />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">
        „{item.quote}“
      </blockquote>
    </article>
  );
}

export function TestimonialsCarousel({
  items,
  prevLabel,
  nextLabel,
}: TestimonialsCarouselProps) {
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
  }, [updateButtons, items.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-slide]");
    const styles = getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const amount = (card?.offsetWidth ?? el.clientWidth) + gap;
    el.scrollBy({
      left: direction * amount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-10">
      {/* Mobile / tablet: carousel with arrows (md+ switches to grid below) */}
      <div className="md:hidden">
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

        <div
          ref={scrollerRef}
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1",
            "scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden",
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
          {items.map((item) => (
            <div
              key={`${item.name}-${item.date}`}
              data-testimonial-slide
              className="w-full shrink-0 snap-start sm:w-[22rem]"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: static grid — no carousel chrome */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard key={`${item.name}-${item.date}`} item={item} />
        ))}
      </div>
    </div>
  );
}
