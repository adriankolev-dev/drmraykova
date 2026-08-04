import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { SuperdocLink } from "@/components/booking/SuperdocText";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";
import { getMainNav } from "@/lib/navigation";

export async function Footer() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const tw = await getTranslations("workplaces");
  const year = new Date().getFullYear();
  const mainNav = getMainNav(t);

  return (
    <footer className="mt-auto border-t border-border bg-ink text-ink-foreground">
      <div className="container-page section-space">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLogo variant="fullOnDark" />
            <p className="mt-4 max-w-sm text-ink-foreground/70">
              {tc("specialty")} · {tc("city")}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-foreground/45">
              {tw.raw("items").join(" · ")}
            </p>
            <div className="mt-6">
              <BookCta variant="primary" utmCampaign="footer" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={doctor.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tc("followInstagram")}
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                <InstagramIcon className="size-4" />
                {doctor.social.instagram.handle}
              </a>
              <a
                href={doctor.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tc("followFacebook")}
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                <FacebookIcon className="size-4" />
                {doctor.social.facebook.handle}
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-foreground/50">
              {tc("navigation")}
            </p>
            <ul className="mt-4 space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-foreground/50">
              {tc("cabinet")}
            </p>
            <ul className="mt-4 space-y-3 text-ink-foreground/80">
              <li>{doctor.clinic.name}</li>
              <li>{doctor.clinic.address}</li>
              <li>
                <a
                  href={doctor.clinic.phoneHref}
                  className="transition-colors hover:text-ink-foreground"
                >
                  {doctor.clinic.phoneDisplay}
                </a>
              </li>
              {doctor.clinic.nhif ? <li>{tc("worksNhif")}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p>
              © {year} {doctor.name}. {tc("footerNote")}
            </p>
            <p>
              {tc("madeBy")}{" "}
              <a
                href="https://www.adrexio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-foreground/70 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
              >
                Adrexio
              </a>
            </p>
          </div>
          <div className="flex gap-5">
            <Link
              href="/politika-za-poveritelnost"
              className="hover:text-ink-foreground/70"
            >
              {tc("privacy")}
            </Link>
            <SuperdocLink
              utmCampaign="footer"
              withMark
              className="text-ink-foreground/55 no-underline hover:text-ink-foreground/70 hover:underline"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
