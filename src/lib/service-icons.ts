import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  MessageCircleHeart,
  Microscope,
  ScanLine,
  Stethoscope,
  ShieldPlus,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "profilaktichen-ginekologichen-pregled": ShieldPlus,
  "akushero-ginekologichni-pregledi": Stethoscope,
  "ultrazvukovi-izsledvaniya": ScanLine,
  kolposkopiya: Microscope,
  histeroskopiya: HeartPulse,
  "zhensko-zdrave": MessageCircleHeart,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Stethoscope;
}
