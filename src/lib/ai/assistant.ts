/**
 * Future AI medical assistant — architecture stub only.
 * Must not diagnose, prescribe, or replace a physician.
 */

export const assistantConfig = {
  enabled: false,
  name: "Медицински асистент",
  disclaimer:
    "Този асистент предоставя обща образователна информация и не поставя диагнози, не предписва лечение и не замества консултация с лекар. При симптоми или притеснения запазете час.",
  allowedTopics: [
    "обща профилактика",
    "подготовка за преглед",
    "образователни обяснения",
    "кога да се свържете с лекар",
  ] as const,
  forbiddenBehaviors: [
    "диагноза",
    "предписване на лечение",
    "интерпретация на лични резултати като окончателни",
    "спешни указания вместо спешна помощ",
  ] as const,
  bookingNudge: true,
} as const;

export type AssistantConfig = typeof assistantConfig;
