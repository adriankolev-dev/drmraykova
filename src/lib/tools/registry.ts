/**
 * Future interactive educational tools — stubs only.
 * Pregnancy calculators are educational; they are not clinical services offered by the practice.
 */

export type ToolId =
  | "faq"
  | "pregnancy-due-date"
  | "pregnancy-week"
  | "visit-prep";

export interface EducationalToolMeta {
  id: ToolId;
  title: string;
  description: string;
  enabled: boolean;
  educationalOnly: boolean;
  /** If true, UI must state the doctor does not offer pregnancy follow-up */
  requiresScopeDisclaimer: boolean;
}

export const educationalTools: EducationalToolMeta[] = [
  {
    id: "faq",
    title: "Често задавани въпроси",
    description: "Кратки отговори за подготовка и протичане на преглед.",
    enabled: false,
    educationalOnly: true,
    requiresScopeDisclaimer: false,
  },
  {
    id: "pregnancy-due-date",
    title: "Калкулатор на термина",
    description: "Образователен инструмент — не е клинична услуга.",
    enabled: false,
    educationalOnly: true,
    requiresScopeDisclaimer: true,
  },
  {
    id: "pregnancy-week",
    title: "Календар на бременността по седмици",
    description: "Образователен инструмент — не е клинична услуга.",
    enabled: false,
    educationalOnly: true,
    requiresScopeDisclaimer: true,
  },
  {
    id: "visit-prep",
    title: "Подготовка за преглед",
    description: "Чеклист преди посещение при гинеколог.",
    enabled: false,
    educationalOnly: true,
    requiresScopeDisclaimer: false,
  },
];
