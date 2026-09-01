import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getRelatedServiceSlugsForArticle } from "@/lib/article-clusters";

type Props = {
  articleSlug: string;
  className?: string;
};

export async function ArticleRelatedServices({ articleSlug, className }: Props) {
  const t = await getTranslations("handbook");
  const blurbs = await getTranslations("serviceBlurbs");
  const names = await getTranslations("serviceNames");
  const slugs = getRelatedServiceSlugsForArticle(articleSlug);

  if (slugs.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
        {t("relatedServicesTitle")}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {t("relatedServicesLead")}
      </p>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/uslugi/${slug}`}
              className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-medium text-foreground underline-offset-4 group-hover:underline group-hover:decoration-primary/50">
                {names(slug)}
              </span>
              <span className="max-w-md text-sm text-muted-foreground sm:text-right">
                {blurbs(slug)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
