import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import {
  formatArticleDate,
  getAllArticles,
} from "@/lib/articles";
import type { Locale } from "@/i18n/routing";

export async function HandbookTeaserSection() {
  const t = await getTranslations("handbookTeaser");
  const locale = (await getLocale()) as Locale;
  const articles = getAllArticles(locale).slice(0, 3);

  return (
    <section className="border-y border-border bg-accent/25 pt-8 pb-[var(--space-section)] md:pt-10">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <SectionHeading
              title={t("title")}
              description={t("description")}
              className="mt-4"
            />
          </div>
          <Link
            href="/narachnik"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("allArticles")}
          </Link>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <RevealItem key={article.slug}>
              <Link
                href={`/narachnik/${article.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-background transition-[border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/45"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Image
                    src={article.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {article.category} ·{" "}
                    {formatArticleDate(article.date, locale)}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight group-hover:text-primary">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
