import { ContentText } from "@/components/content/ContentText";
import { Reveal } from "@/components/motion/Reveal";

export type ServiceGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type ServiceGuideProps = {
  sections: ServiceGuideSection[];
};

export function ServiceGuide({ sections }: ServiceGuideProps) {
  if (!sections.length) return null;

  return (
    <div className="mt-14 space-y-12">
      {sections.map((section) => (
        <Reveal key={section.heading}>
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 leading-relaxed text-muted-foreground"
            >
              <ContentText text={paragraph} />
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mt-6 space-y-3">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-muted-foreground before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']"
                >
                  <span className="leading-relaxed">
                    <ContentText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
