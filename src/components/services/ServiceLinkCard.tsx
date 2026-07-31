import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

type ServiceLinkCardProps = {
  slug: string;
  title: string;
  description: string;
  className?: string;
};

export function ServiceLinkCard({
  slug,
  title,
  description,
  className,
}: ServiceLinkCardProps) {
  const Icon = getServiceIcon(slug);

  return (
    <Link
      href={`/uslugi/${slug}`}
      className={cn(
        "group flex h-full gap-4 rounded-lg border border-border bg-background p-5 transition-[border-color,transform,background-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/40 md:p-6",
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground md:size-14">
        <Icon className="size-6 md:size-7" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
            {title}
          </span>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {description}
        </span>
      </span>
    </Link>
  );
}
