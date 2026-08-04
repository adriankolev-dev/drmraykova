import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { PriceTable } from "@/components/pricing/PriceTable";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";
import { getPricesForService, hasListedPrice } from "@/lib/pricing";

/**
 * Compact price block for a single service page — only the rows that apply,
 * so the page never carries the full list.
 */
export async function ServicePriceBlock({ slug }: { slug: string }) {
  const t = await getTranslations("pricing");
  const prices = getPricesForService(slug);
  const listed = hasListedPrice(slug);

  return (
    <Reveal delay={0.06}>
      <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-5 md:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-clinical">
          {t("priceHeading")}
        </p>

        {listed ? (
          <>
            <PriceTable items={prices} className="mt-4" />
            <Link
              href="/tseni"
              className="mt-4 inline-flex text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t("allPricesLink")} →
            </Link>
          </>
        ) : (
          <p className="mt-3 leading-relaxed text-foreground/80">
            {t("priceOnRequest", { phone: doctor.clinic.phoneDisplay })}
          </p>
        )}
      </div>
    </Reveal>
  );
}
