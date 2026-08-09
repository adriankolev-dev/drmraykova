import type { LucideIcon } from "lucide-react";
import {
  Dna,
  HeartPulse,
  MessageCircleHeart,
  Microscope,
  ScanLine,
  Stethoscope,
  ShieldPlus,
  TestTubeDiagonal,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "profilaktichen-ginekologichen-pregled": ShieldPlus,
  "akushero-ginekologichni-pregledi": Stethoscope,
  "ultrazvukovi-izsledvaniya": ScanLine,
  kolposkopiya: Microscope,
  citonamazka: TestTubeDiagonal,
  "hpv-test": Dna,
  histeroskopiya: HeartPulse,
  "zhensko-zdrave": MessageCircleHeart,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Stethoscope;
}
