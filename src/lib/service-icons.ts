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

/**
 * Used when a slug has no dedicated icon. Look icons up from `serviceIcons`
 * directly at the call site — routing them through a helper hides the map from
 * the React compiler, which then treats the result as a component built during
 * render.
 */
export const SERVICE_ICON_FALLBACK: LucideIcon = Stethoscope;
