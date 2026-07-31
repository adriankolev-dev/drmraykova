import type { Locale } from "@/i18n/routing";

export type FaqItem = {
  question: string;
  answer: string;
};

const faqByLocale: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    ctaHeading: string;
    ctaLead: string;
    items: FaqItem[];
  }
> = {
  bg: {
    eyebrow: "Практически въпроси",
    title: "Често задавани въпроси",
    lead: "Кратки отговори за записване, НЗОК, обхват на грижата и посещението в кабинета — без да заместват лична консултация.",
    ctaHeading: "Остават въпроси?",
    ctaLead: "Запазете час онлайн или се обадете за уточнение.",
    items: [
      {
        question: "Как да запазя час?",
        answer:
          "Записването е онлайн през Superdoc. От сайта натиснете „Запази час“ — ще бъдете пренасочени към профила на д-р Мария Райкова в Superdoc, където избирате удобен час.",
      },
      {
        question: "Работи ли д-р Райкова с НЗОК?",
        answer:
          "Да. Приемът е в МЦ Люлин Мед — Филиал Добрила 10 и кабинетът работи с НЗОК. За конкретни направления и покритие уточнете при записване или по телефона.",
      },
      {
        question: "Проследява ли бременност?",
        answer:
          "Не. Д-р Мария Райкова не предлага проследяване на бременност. За профилактични прегледи, диагностика и консултации по женско здраве можете да запазите час.",
      },
      {
        question: "Преглежда ли деца?",
        answer:
          "Не. Кабинетът не извършва прегледи на деца. Грижата е насочена към възрастни пациентки.",
      },
      {
        question: "Къде се намира кабинетът?",
        answer:
          "МЦ Люлин Мед — Филиал Добрила 10, ул. Добрила 10, срещу ВМА, София. На страницата „Контакти“ има карта и упътвания.",
      },
      {
        question: "На какви езици се провежда прегледът?",
        answer:
          "Д-р Райкова говори български, английски и испански. Можете да уточните предпочитания език при записване или в началото на посещението.",
      },
      {
        question: "Какво да нося на първи преглед?",
        answer:
          "Носете документ за самоличност, здравна книжка/карта (ако имате) и предишни изследвания или епикризи, ако са налични. Ако имате конкретни симптоми или въпроси, е полезно да ги запишете предварително.",
      },
      {
        question: "Мога ли да се обадя вместо онлайн запис?",
        answer:
          "Да. Телефонът на кабинета е 0894 972 626. За свободен час най-удобно е Superdoc, а телефонът е подходящ за бърз въпрос или уточнение.",
      },
    ],
  },
  en: {
    eyebrow: "Practical questions",
    title: "Frequently asked questions",
    lead: "Short answers about booking, NHIF, scope of care, and visiting the clinic — they do not replace a personal consultation.",
    ctaHeading: "Still have questions?",
    ctaLead: "Book online or call for clarification.",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Booking is online via Superdoc. Click “Book appointment” on the site — you’ll be redirected to Dr. Maria Raykova’s Superdoc profile to choose a suitable time.",
      },
      {
        question: "Does Dr. Raykova work with NHIF?",
        answer:
          "Yes. Appointments are at Lyulin Med Medical Center — Dobrila 10 Branch, and the clinic works with NHIF. For specific referrals and coverage, confirm when booking or by phone.",
      },
      {
        question: "Does she provide pregnancy follow-up?",
        answer:
          "No. Dr. Maria Raykova does not offer pregnancy follow-up. You can book for preventive exams, diagnostics, and women’s health consultations.",
      },
      {
        question: "Does she examine children?",
        answer:
          "No. The practice does not offer pediatric exams. Care is for adult patients.",
      },
      {
        question: "Where is the clinic?",
        answer:
          "Lyulin Med Medical Center — Dobrila 10 Branch, 10 Dobrila St., opposite VMA, Sofia. The Contact page has a map and directions.",
      },
      {
        question: "What languages are available?",
        answer:
          "Dr. Raykova speaks Bulgarian, English, and Spanish. You can mention your preferred language when booking or at the start of the visit.",
      },
      {
        question: "What should I bring to a first visit?",
        answer:
          "Bring an ID document, your health booklet/card if you have one, and previous tests or discharge summaries if available. If you have specific symptoms or questions, jotting them down beforehand helps.",
      },
      {
        question: "Can I call instead of booking online?",
        answer:
          "Yes. The clinic phone is 0894 972 626. Superdoc is the easiest way to find an open slot; the phone is useful for a quick question or clarification.",
      },
    ],
  },
  es: {
    eyebrow: "Preguntas prácticas",
    title: "Preguntas frecuentes",
    lead: "Respuestas breves sobre reserva, NHIF, alcance de la atención y la visita a la consulta — no sustituyen una consulta personal.",
    ctaHeading: "¿Todavía tiene dudas?",
    ctaLead: "Reserve cita online o llame para aclaraciones.",
    items: [
      {
        question: "¿Cómo reservo una cita?",
        answer:
          "La reserva es online a través de Superdoc. Pulse “Reservar cita” en el sitio — será redirigida al perfil de la Dra. Maria Raykova en Superdoc para elegir un horario.",
      },
      {
        question: "¿Trabaja con el NHIF (seguro público)?",
        answer:
          "Sí. La consulta es en el Centro Médico Lyulin Med — Filial Dobrila 10 y trabaja con NHIF. Para derivaciones y cobertura concretas, confirme al reservar o por teléfono.",
      },
      {
        question: "¿Hace seguimiento del embarazo?",
        answer:
          "No. La Dra. Maria Raykova no ofrece seguimiento del embarazo. Puede reservar para revisiones preventivas, diagnóstico y consultas de salud femenina.",
      },
      {
        question: "¿Atiende a niños?",
        answer:
          "No. La consulta no realiza exámenes pediátricos. La atención está dirigida a pacientes adultas.",
      },
      {
        question: "¿Dónde está la consulta?",
        answer:
          "Centro Médico Lyulin Med — Filial Dobrila 10, calle Dobrila 10, frente a VMA, Sofía. En Contacto hay mapa e indicaciones.",
      },
      {
        question: "¿En qué idiomas se atiende?",
        answer:
          "La Dra. Raykova habla búlgaro, inglés y español. Puede indicar el idioma preferido al reservar o al inicio de la visita.",
      },
      {
        question: "¿Qué debo llevar a la primera visita?",
        answer:
          "Lleve documento de identidad, cartilla/tarjeta sanitaria si la tiene, y pruebas o informes previos si están disponibles. Si tiene síntomas o preguntas concretas, anotarlas antes ayuda.",
      },
      {
        question: "¿Puedo llamar en lugar de reservar online?",
        answer:
          "Sí. El teléfono de la consulta es 0894 972 626. Superdoc es la forma más fácil de encontrar hueco; el teléfono sirve para una duda rápida o una aclaración.",
      },
    ],
  },
};

export function getFaqPage(locale: Locale) {
  return faqByLocale[locale] ?? faqByLocale.bg;
}
