import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type HandbookArticleCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  cover: string;
  coverAlt: string;
};

type HandbookArticleCardProps = {
  article: HandbookArticleCardData;
  readingTimeLabel: string;
  className?: string;
};

export function HandbookArticleCard({
  article,
  readingTimeLabel,
  className,
}: HandbookArticleCardProps) {
  return (
    <Link
      href={`/narachnik/${article.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/45",
        className,
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-secondary">
        <Image
          src={article.cover}
          alt={article.coverAlt || article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {article.category} · {article.dateLabel} · {readingTimeLabel}
        </p>
        <h3 className="mt-2 line-clamp-3 font-display text-xl font-medium tracking-tight group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
