import { BookCta } from "@/components/booking/BookCta";
import { SuperdocMark } from "@/components/booking/SuperdocMark";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { ClinicRule } from "@/components/brand/ClinicMotifs";
import { Reveal } from "@/components/motion/Reveal";

type AppointmentCTAProps = {
  heading: string;
  lead: string;
  eyebrow?: string;
  utmCampaign: string;
};

export function AppointmentCTA({
  heading,
  lead,
  eyebrow,
  utmCampaign,
}: AppointmentCTAProps) {
  return (
    <Reveal delay={0.2}>
      <div className="panel-primary mt-14 rounded-lg px-8 py-10 md:px-12 md:py-12">
        {eyebrow ? (
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
            <SuperdocMark size={16} />
            <SuperdocText
              text={eyebrow}
              tone="onPrimary"
              utmCampaign={`${utmCampaign}-eyebrow`}
            />
          </p>
        ) : null}
        <p className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
          {heading}
        </p>
        <p className="mt-2 max-w-lg text-primary-foreground/80">
          <SuperdocText
            text={lead}
            tone="onPrimary"
            utmCampaign={`${utmCampaign}-lead`}
          />
        </p>
        <ClinicRule className="mt-5 max-w-[8rem] opacity-40 [&_div]:bg-primary-foreground" />
        <div className="mt-6">
          <BookCta
            variant="ink"
            utmCampaign={utmCampaign}
            className="bg-ink text-ink-foreground hover:bg-ink/90"
          />
        </div>
      </div>
    </Reveal>
  );
}
