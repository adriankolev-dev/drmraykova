import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookCta } from "@/components/booking/BookCta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";

export async function ClinicSection() {
  const t = await getTranslations("clinic");
  const tc = await getTranslations("contact");

  return (
    <section className="pt-[var(--space-section)] pb-6 md:pb-8">
      <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
        <Reveal className="flex flex-col justify-center">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionHeading
            title={t("title")}
            description={t("description")}
            className="mt-4"
          />
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {tc("addressLabel")}
              </dt>
              <dd className="mt-1 text-foreground">{doctor.clinic.address}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {tc("phoneLabel")}
              </dt>
              <dd className="mt-1">
                <a
                  href={doctor.clinic.phoneHref}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {doctor.clinic.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {tc("mapTitle")}
              </dt>
              <dd className="mt-1 text-foreground">{doctor.clinic.name}</dd>
            </div>
          </dl>
          <div className="mt-8">
            <BookCta variant="superdoc" utmCampaign="home-clinic" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            href="/kontakti"
            className="group relative flex min-h-[300px] overflow-hidden rounded-lg bg-ink md:min-h-full"
          >
            <Image
              src="/clinic-interior.webp"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_45%] opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
            <div className="relative mt-auto p-6 text-ink-foreground">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-foreground/70">
                {t("photoCaption")} · {tc("hoursNote")}
              </p>
              <p className="mt-2 font-display text-2xl font-medium tracking-tight">
                {doctor.clinic.address}
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
