import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, SectionHeading } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";
import { doctor } from "@/lib/doctor";

const PREVIEWS = [
  {
    key: "prevention" as const,
    src: "/instagram/preview-profilaktika.webp",
  },
  {
    key: "cycle" as const,
    src: "/instagram/preview-cikal.webp",
  },
  {
    key: "reviews" as const,
    src: "/instagram/preview-otzivi.webp",
  },
];

export async function InstagramSection() {
  const t = await getTranslations("instagramHome");

  return (
    <section className="section-space">
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
          <a
            href={doctor.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-4" />
            {t("follow")}
            <span className="text-muted-foreground">{t("handle")}</span>
          </a>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
          {PREVIEWS.map((preview) => (
            <RevealItem key={preview.key}>
              <Link
                href={t(`items.${preview.key}.href`)}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={preview.src}
                    alt={t(`items.${preview.key}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t(`items.${preview.key}.title`)}
                </p>
                <h3 className="mt-1 font-display text-xl font-medium tracking-tight group-hover:text-primary">
                  {t(`items.${preview.key}.caption`)}
                </h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
