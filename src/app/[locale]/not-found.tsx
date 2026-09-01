import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal } from "@/components/motion/Reveal";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="container-page flex min-h-[50vh] flex-col items-start justify-center py-20">
      <Reveal>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 max-w-lg font-display text-4xl font-medium tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">{t("lead")}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("home")}
          </Link>
          <Link
            href="/uslugi"
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
          >
            {t("services")}
          </Link>
        </div>
        <div className="mt-10">
          <BookCta variant="superdoc" utmCampaign="404-page" />
        </div>
      </Reveal>
    </main>
  );
}
