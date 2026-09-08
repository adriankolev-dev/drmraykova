import type { ReactNode } from "react";
import { SuperdocText } from "@/components/booking/SuperdocText";
import { Link } from "@/i18n/navigation";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders educational copy with optional markdown links and Superdoc emphasis.
 * Use `[label](/path)` for internal links — do not put HTML in content files.
 */
export function ContentText({ text }: { text: string }) {
  if (!text.includes("[")) {
    return <SuperdocText text={text} />;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(LINK_RE.source, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <SuperdocText
          key={`t-${lastIndex}`}
          text={text.slice(lastIndex, match.index)}
        />,
      );
    }

    const label = match[1];
    const href = match[2];
    const className =
      "font-medium text-foreground underline-offset-4 hover:text-primary hover:underline";

    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`l-${match.index}`} href={href} className={className}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`a-${match.index}`}
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <SuperdocText key={`t-${lastIndex}`} text={text.slice(lastIndex)} />,
    );
  }

  return <>{nodes}</>;
}
