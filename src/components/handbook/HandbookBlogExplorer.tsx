"use client";

import { Suspense, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { HandbookArticleCard } from "@/components/handbook/HandbookArticleCard";
import { cn } from "@/lib/utils";

export type HandbookBlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  cover: string;
  coverAlt: string;
  readingTimeLabel: string;
};

export type HandbookBlogLabels = {
  filterAll: string;
  categoriesLabel: string;
  articlesLabel: string;
  noResults: string;
  clearFilters: string;
};

type HandbookBlogExplorerProps = {
  articles: HandbookBlogArticle[];
  categories: Array<{ name: string; count: number }>;
  labels: HandbookBlogLabels;
};

const ALL = "all";

function HandbookBlogExplorerInner({
  articles,
  categories,
  labels,
}: HandbookBlogExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /**
   * The URL is the single source of truth for the filter, so it is read rather
   * than mirrored into state — that also keeps back/forward and shared links
   * working. An unknown ?category= falls back to showing everything.
   */
  const requestedCategory = searchParams.get("category") ?? ALL;
  const activeCategory =
    requestedCategory === ALL ||
    categories.some((item) => item.name === requestedCategory)
      ? requestedCategory
      : ALL;

  const selectCategory = useCallback(
    (category: string) => {
      if (category === ALL) {
        router.replace(pathname, { scroll: false });
        return;
      }
      router.replace(`${pathname}?category=${encodeURIComponent(category)}`, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const filtered = useMemo(() => {
    if (activeCategory === ALL) return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

  const hasFilter = activeCategory !== ALL;

  const clearFilters = () => selectCategory(ALL);

  return (
    <div className="mt-12">
      {categories.length > 0 ? (
        <div className="sticky top-16 z-30 -mx-5 border-y border-border bg-background/95 px-5 py-4 backdrop-blur-md supports-backdrop-filter:bg-background/85 md:-mx-8 md:px-8">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {labels.categoriesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={activeCategory === ALL}
                onClick={() => selectCategory(ALL)}
                count={articles.length}
              >
                {labels.filterAll}
              </FilterChip>
              {categories.map((cat) => (
                <FilterChip
                  key={cat.name}
                  active={activeCategory === cat.name}
                  onClick={() => selectCategory(cat.name)}
                  count={cat.count}
                >
                  {cat.name}
                </FilterChip>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-muted-foreground">
                {filtered.length} {labels.articlesLabel}
              </p>
              {hasFilter ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {labels.clearFilters}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <li key={article.slug} className="h-full">
              <HandbookArticleCard
                article={{
                  slug: article.slug,
                  title: article.title,
                  excerpt: article.excerpt,
                  category: article.category,
                  dateLabel: article.dateLabel,
                  cover: article.cover,
                  coverAlt: article.coverAlt,
                }}
                readingTimeLabel={article.readingTimeLabel}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 rounded-lg border border-dashed border-border bg-card/40 px-6 py-12 text-center">
          <p className="font-display text-xl font-medium tracking-tight text-foreground">
            {labels.noResults}
          </p>
          {hasFilter ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors",
        active
          ? "border-primary/50 bg-primary/10 text-foreground"
          : "border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[9px] tabular-nums",
          active ? "bg-primary/15" : "bg-muted/80",
        )}
      >
        {count}
      </span>
    </button>
  );
}

export function HandbookBlogExplorer(props: HandbookBlogExplorerProps) {
  return (
    <Suspense
      fallback={
        <div className="mt-12 h-24 animate-pulse rounded-lg bg-accent/40" />
      }
    >
      <HandbookBlogExplorerInner {...props} />
    </Suspense>
  );
}
