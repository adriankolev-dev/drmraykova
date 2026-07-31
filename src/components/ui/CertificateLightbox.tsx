"use client";

import { Award, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

type CertificateLightboxProps = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  triggerLabel: string;
  closeLabel: string;
  className?: string;
};

export function CertificateLightbox({
  src,
  alt,
  title,
  caption,
  triggerLabel,
  closeLabel,
  className,
}: CertificateLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const open = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={cn(
          "mt-3 inline-flex items-center gap-2 rounded-md border border-clinical/35 bg-background/80 px-3 py-1.5",
          "font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/80",
          "transition-[background-color,border-color,color,transform] duration-200",
          "hover:border-clinical hover:bg-clinical-soft hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "motion-safe:hover:-translate-y-px",
          className,
        )}
      >
        <Award className="size-3.5 text-clinical" aria-hidden />
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "fixed inset-0 z-50 m-auto max-h-[min(92vh,52rem)] w-[min(96vw,56rem)]",
          "rounded-lg border border-border bg-card p-0 text-card-foreground shadow-none",
          "open:flex open:flex-col",
          "backdrop:bg-ink/55 backdrop:backdrop-blur-[2px]",
        )}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p
              id={titleId}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/70"
            >
              {title}
            </p>
            <p
              id={descriptionId}
              className="mt-1 text-sm leading-relaxed text-foreground/80"
            >
              {caption}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-md",
              "text-foreground/70 transition-colors hover:bg-muted hover:text-foreground",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            )}
            aria-label={closeLabel}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-auto p-4 md:p-6">
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={776}
            className="mx-auto h-auto w-full max-w-4xl border border-border/70 bg-background"
            sizes="(max-width: 768px) 96vw, 56rem"
            priority={false}
          />
        </div>
      </dialog>
    </>
  );
}
