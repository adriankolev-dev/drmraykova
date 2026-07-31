import type { Locale } from "@/i18n/routing";

export type Testimonial = {
  name: string;
  date: string;
  rating: number;
  quote: string;
};

const testimonialsByLocale: Record<Locale, Testimonial[]> = {
  bg: [
    {
      name: "Радостина Б.",
      date: "27 юни 2026",
      rating: 5,
      quote:
        "Д-р Мария Райкова е млад специалист, който впечатлява с отношение, внимание и професионализъм. Прегледът беше обстоен, а всичко ми беше обяснено спокойно и разбираемо. Почувствах се спокойна и обгрижена. Препоръчвам с удоволствие!",
    },
    {
      name: "Валенсия Н.",
      date: "16 май 2026",
      rating: 5,
      quote:
        "Препоръчвам с 2 ръце! Д-р Райкова обяснява всичко до най-малкия детайл. Внимателна е и изслушва нуждите на пациента! Страхотен професионалист е!",
    },
    {
      name: "Мария Т.",
      date: "24 март 2026",
      rating: 5,
      quote:
        "Изключително внимателна! Обяснява всичко много подробно – какво прави, как го прави и защо го прави. Прегледът беше изключително обстоен и премина спокойно.",
    },
    {
      name: "Милагрос М.",
      date: "23 май 2026",
      rating: 5,
      quote:
        "Първото ми посещение мина много добре. Гинекологът беше внимателен, любезен и професионален. Чувствах се спокойна и бих посетила отново.",
    },
    {
      name: "Антоанета С.",
      date: "28 март 2026",
      rating: 5,
      quote:
        "Много съм доволна. Часът беше спазен, прегледът беше много обстоен и всичко ми се обясняваше. Много мила лекарка, успя да ме предразположи.",
    },
    {
      name: "Изабел Б.",
      date: "29 януари 2026",
      rating: 5,
      quote:
        "Посетих за първи път докторката и мога да кажа, че останах много доволна. Толкова обстоен преглед никога не са правили, отношение на ниво.",
    },
  ],
  en: [
    {
      name: "Radostina B.",
      date: "27 June 2026",
      rating: 5,
      quote:
        "Dr. Maria Raykova is a young specialist who impresses with her attitude, attention, and professionalism. The exam was thorough, and everything was explained calmly and clearly. I felt at ease and well cared for. I recommend her with pleasure!",
    },
    {
      name: "Valencia N.",
      date: "16 May 2026",
      rating: 5,
      quote:
        "I recommend her wholeheartedly! Dr. Raykova explains everything down to the smallest detail. She is attentive and listens to the patient's needs. An outstanding professional!",
    },
    {
      name: "Maria T.",
      date: "24 March 2026",
      rating: 5,
      quote:
        "Extremely attentive! She explains everything in detail — what she does, how she does it, and why. The exam was exceptionally thorough and went calmly.",
    },
    {
      name: "Milagros M.",
      date: "23 May 2026",
      rating: 5,
      quote:
        "My first visit went very well. The gynecologist was attentive, kind, and professional. I felt calm and would visit again.",
    },
    {
      name: "Antoaneta S.",
      date: "28 March 2026",
      rating: 5,
      quote:
        "I am very pleased. The appointment was on time, the exam was very thorough, and everything was explained to me. A very kind doctor who put me at ease.",
    },
    {
      name: "Isabel B.",
      date: "29 January 2026",
      rating: 5,
      quote:
        "I visited the doctor for the first time and was very satisfied. I have never had such a thorough exam — the care was outstanding.",
    },
  ],
  es: [
    {
      name: "Radostina B.",
      date: "27 de junio de 2026",
      rating: 5,
      quote:
        "La Dra. Maria Raykova es una joven especialista que impresiona por su trato, atención y profesionalidad. La exploración fue minuciosa y todo se me explicó con calma y claridad. Me sentí tranquila y bien atendida. ¡La recomiendo con gusto!",
    },
    {
      name: "Valencia N.",
      date: "16 de mayo de 2026",
      rating: 5,
      quote:
        "¡La recomiendo con los ojos cerrados! La Dra. Raykova explica todo hasta el más mínimo detalle. Es atenta y escucha las necesidades de la paciente. ¡Una profesional excelente!",
    },
    {
      name: "Maria T.",
      date: "24 de marzo de 2026",
      rating: 5,
      quote:
        "¡Extremadamente atenta! Explica todo con mucho detalle: qué hace, cómo lo hace y por qué. La exploración fue excepcionalmente minuciosa y transcurrió con calma.",
    },
    {
      name: "Milagros M.",
      date: "23 de mayo de 2026",
      rating: 5,
      quote:
        "Mi primera visita fue muy bien. La ginecóloga fue atenta, amable y profesional. Me sentí tranquila y volvería a visitarla.",
    },
    {
      name: "Antoaneta S.",
      date: "28 de marzo de 2026",
      rating: 5,
      quote:
        "Estoy muy contenta. La cita fue puntual, la exploración muy minuciosa y todo se me explicó. Una doctora muy amable que me hizo sentir cómoda.",
    },
    {
      name: "Isabel B.",
      date: "29 de enero de 2026",
      rating: 5,
      quote:
        "Visité a la doctora por primera vez y quedé muy satisfecha. Nunca me habían hecho una exploración tan minuciosa; el trato fue de alto nivel.",
    },
  ],
};

export function getTestimonials(locale: Locale = "bg"): Testimonial[] {
  return testimonialsByLocale[locale] ?? testimonialsByLocale.bg;
}
