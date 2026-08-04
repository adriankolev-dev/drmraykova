import { getLocale, getTranslations } from "next-intl/server";
import type { PriceItem } from "@/content/pricing";
import type { Locale } from "@/i18n/routing";
import { formatBgn, formatEur } from "@/lib/pricing";

type PriceTableProps = {
  items: readonly PriceItem[];
  className?: string;
};

export async function PriceTable({ items, className }: PriceTableProps) {
  if (!items.length) return null;

  const t = await getTranslations("pricing");
  const names = await getTranslations("pricing.items");
  const locale = (await getLocale()) as Locale;

  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="pb-2 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted-foreground"
            >
              {t("tableService")}
            </th>
            <th
              scope="col"
              className="pb-2 text-right font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted-foreground"
            >
              {t("tablePrice")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {items.map((item) => (
            <tr key={item.id}>
              <th
                scope="row"
                className="py-3 pr-4 text-[15px] font-normal leading-snug text-foreground"
              >
                {names(item.id)}
              </th>
              <td className="py-3 text-right align-baseline whitespace-nowrap">
                <span className="font-display text-lg font-medium tracking-tight text-foreground tabular-nums">
                  {formatEur(item.eur, locale)}
                </span>
                <span className="ml-2 text-xs text-muted-foreground tabular-nums">
                  {formatBgn(item.eur, locale)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
