import type { Locale } from "@/i18n/routing";

export type ServiceContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  suitableFor: string;
  visitSteps: string[];
  notes?: string[];
  faqs: Array<{ question: string; answer: string }>;
};

const byLocale: Record<Locale, ServiceContent[]> = {
  "bg": [
    {
      "slug": "profilaktichen-ginekologichen-pregled",
      "title": "Профилактични гинекологични прегледи",
      "seoTitle": "Профилактичен гинекологичен преглед София",
      "seoDescription": "Профилактичен гинекологичен преглед в София при д-р Мария Райкова. Спокоен преглед, ясно обяснение и план за следващи стъпки.",
      "intro": "Профилактичният гинекологичен преглед е основата на грижата за женското здраве. Целта е ранно откриване на промени, спокойствие и ясна картина за вашето състояние — преди да се появят оплаквания.",
      "suitableFor": "Подходящ е за жени, които искат редовен контрол, първи преглед при нов специалист или профилактика след период без посещение при гинеколог. Не включва проследяване на бременност и прегледи на деца.",
      "visitSteps": [
        "Разговор за история, цикъл, предишни изследвания и текущи притеснения.",
        "Гинекологичен преглед според възрастта и индикациите.",
        "При нужда — насочване към цитонамазка, ултразвук или допълнителни изследвания.",
        "Обяснение на находките и препоръка за следващ контрол."
      ],
      "faqs": [
        {
          "question": "Колко често е нужен профилактичен преглед?",
          "answer": "Честотата се определя индивидуално. Много жени посещават гинеколог веднъж годишно, но вашият план може да е различен според възрастта, историята и резултатите."
        },
        {
          "question": "Трябва ли да имам оплаквания, за да дойда?",
          "answer": "Не. Именно профилактичният преглед е за жени без остри оплаквания, които искат спокойствие и навременна грижа."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "akushero-ginekologichni-pregledi",
      "title": "Акушеро-гинекологични прегледи",
      "seoTitle": "Акушеро-гинекологичен преглед София",
      "seoDescription": "Акушеро-гинекологични прегледи и консултации в София при д-р Мария Райкова. Първичен и вторичен преглед с ясно обяснение.",
      "intro": "Акушеро-гинекологичният преглед е за диагностика и консултация при оплаквания, контрол след лечение или оценка на конкретен симптом. Прегледът започва с разговор и завършва с разбираем план.",
      "suitableFor": "Подходящ при менструални нарушения, болка, вагинални оплаквания, контрол след изследвания или нужда от второ мнение. Д-р Райкова не проследява бременност и не преглежда деца.",
      "visitSteps": [
        "Подробен разговор за симптомите и тяхната продължителност.",
        "Клиничен преглед и оценка на находките.",
        "Назначаване на изследвания при индикации.",
        "Обяснение на възможностите и следващите стъпки."
      ],
      "faqs": [
        {
          "question": "Каква е разликата между първичен и вторичен преглед?",
          "answer": "Първичният преглед е начална оценка. Вторичният обикновено е за проследяване на вече започнат случай, резултати или лечение."
        },
        {
          "question": "Какво да нося със себе си?",
          "answer": "Носете предходна медицинска документация, резултати от изследвания и списък с приемани лекарства, ако имате такива."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "ultrazvukovi-izsledvaniya",
      "title": "Ултразвукови изследвания",
      "seoTitle": "Гинекологичен ултразвук София",
      "seoDescription": "Ултразвуково изследване на женската полова система в София при д-р Мария Райкова. Ясно обяснение на находките.",
      "intro": "Гинекологичният ултразвук помага за оценка на матката, яйчниците и съседните структури. Изследването е важна част от съвременната диагностика и се комбинира с клиничния преглед.",
      "suitableFor": "Подходящ при профилактика, болка, нередовен цикъл, проследяване на находки или когато лекарят прецени, че е нужна образна диагностика.",
      "visitSteps": [
        "Кратък разговор за причината за изследването.",
        "Ултразвуков оглед според клиничната ситуация.",
        "Обяснение на видимите структури и находки на разбираем език.",
        "Препоръка за допълнителни стъпки, ако са нужни."
      ],
      "notes": [
        "Конкретният начин на изследване се определя по време на прегледа според индикациите."
      ],
      "faqs": [
        {
          "question": "Болезнен ли е гинекологичният ултразвук?",
          "answer": "Обикновено е поносим. Ако усетите дискомфорт, кажете на лекаря — прегледът може да бъде адаптиран."
        },
        {
          "question": "Ще получа ли обяснение на резултата веднага?",
          "answer": "Да. Д-р Райкова обяснява находките по време на посещението и какво означават за следващите стъпки."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "kolposkopiya",
      "title": "Колпоскопия",
      "seoTitle": "Колпоскопия София — ранна диагностика",
      "seoDescription": "Колпоскопия в София при д-р Мария Райкова. Прецизен оглед при съмнение за изменения на маточната шийка.",
      "intro": "Колпоскопията е специализиран оглед на маточната шийка с увеличение. Използва се за по-прецизна оценка при съмнение за предракови или други изменения и е част от ранната диагностика.",
      "suitableFor": "Подходяща при отклонения в цитонамазката, видими изменения или когато лекарят препоръча допълнителна оценка на шийката.",
      "visitSteps": [
        "Разговор за предишни резултати и причината за изследването.",
        "Колпоскопски оглед в спокойна обстановка.",
        "При индикации — допълнителни процедури според находката.",
        "Ясно обяснение на резултата и план за наблюдение или лечение."
      ],
      "faqs": [
        {
          "question": "Колпоскопията болезнена ли е?",
          "answer": "Повечето жени усещат лек дискомфорт, подобен на преглед. Ако имате притеснения, споделете ги преди процедурата."
        },
        {
          "question": "Кога ще са готови резултатите?",
          "answer": "Зависи от това дали са взети проби. Лекарят ще ви обясни очакваните срокове по време на посещението."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "citonamazka",
      "title": "Цитонамазка",
      "seoTitle": "Цитонамазка София — профилактика",
      "seoDescription": "Цитонамазка (Pap тест) в София при д-р Мария Райкова. Спокойно обяснение, подготовка и ясен план след резултата.",
      "intro": "Цитонамазката е основен скрининг за ранно откриване на клетъчни промени на маточната шийка. Целта е профилактика и спокойствие — с разбираемо обяснение на всяка стъпка.",
      "suitableFor": "Подходяща като част от профилактичен преглед, при контрол според възрастта и историята или когато лекарят препоръча скрининг. Не замества клиничния преглед.",
      "visitSteps": [
        "Кратък разговор за цикъл, предишни резултати и подготовка.",
        "Вземане на цитонамазка по време на гинекологичен преглед.",
        "Обяснение какво следва и приблизителни срокове за резултат.",
        "При нужда — насочване към HPV тест, колпоскопия или контрол."
      ],
      "notes": [
        "Цената на цитонамазката е публикувана в ценоразписа. При работа с НЗОК може да има доплащане."
      ],
      "faqs": [
        {
          "question": "Болезнена ли е цитонамазката?",
          "answer": "Обикновено усещането е краткотраен дискомфорт, подобен на обикновен преглед. Ако сте тревожна, кажете — обяснението помага."
        },
        {
          "question": "Колко време отнема резултатът?",
          "answer": "Според Superdoc коментарите на резултатите обикновено са готови до около 14 дни. Точният срок се уточнява при посещението."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За цитонамазката може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "hpv-test",
      "title": "HPV тест",
      "seoTitle": "HPV тест София",
      "seoDescription": "HPV тест в София при д-р Мария Райкова. Кога се прави, какво означава и как се комбинира с цитонамазка.",
      "intro": "HPV тестът търси наличие на човешки папилома вирус — честа причина за клетъчни промени на шийката. При индикации се обсъжда като част от скрининга, заедно с цитонамазката и клиничната оценка.",
      "suitableFor": "Подходящ когато лекарят препоръча HPV скрининг според възрастта, историята или резултатите. Конкретният панел и лаборатория се уточняват при посещението.",
      "visitSteps": [
        "Разговор за възраст, предишни изследвания и нужда от HPV скрининг.",
        "Вземане на проба при индикации — често заедно с преглед или цитонамазка.",
        "Обяснение какво измерва тестът и какви са следващите стъпки.",
        "При положителен или неясен резултат — план за контрол или колпоскопия."
      ],
      "notes": [
        "Цената на HPV теста не е фиксирана в публичния ценоразпис — уточнява се при посещението според избрания панел."
      ],
      "faqs": [
        {
          "question": "HPV тестът замества ли цитонамазката?",
          "answer": "Не винаги. Двата теста дават различна информация. Кой е подходящ — или дали се комбинират — се решава според възрастта и клиничния контекст."
        },
        {
          "question": "Какво означава положителен HPV?",
          "answer": "Означава наличие на вируса, а не задължително сериозна находка. Лекарят обяснява какво следва — наблюдение, допълнителни изследвания или колпоскопия."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "histeroskopiya",
      "title": "Хистероскопия",
      "seoTitle": "Хистероскопия София",
      "seoDescription": "Консултация и насочване за хистероскопия при д-р Мария Райкова в София. Миниинвазивен подход при индикации.",
      "intro": "Хистероскопията е миниинвазивен метод за оглед на маточната кухина. Д-р Райкова има квалификация в офис и оперативна хистероскопия. Конкретният обхват на процедурата се определя според индикациите и мястото на извършване.",
      "suitableFor": "Подходяща при индикации като абнормно кървене, съмнение за вътрематочни находки или когато е нужна директна оценка на маточната кухина — след клинична преценка.",
      "visitSteps": [
        "Консултация и оценка дали хистероскопията е подходяща.",
        "Обяснение на процедурата, подготовката и очакванията.",
        "Планиране според индикациите и клиничния контекст.",
        "Проследяване и обяснение на резултатите след процедурата."
      ],
      "notes": [
        "Някои процедури може да се извършват в болнична среда. Това се уточнява при консултацията."
      ],
      "faqs": [
        {
          "question": "Офис и оперативна хистероскопия — каква е разликата?",
          "answer": "Офис хистероскопията обикновено е с по-малък обхват и може да се извършва в амбулаторни условия. Оперативната е при нужда от лечебни манипулации. Изборът зависи от индикациите."
        },
        {
          "question": "Нужна ли е упойка?",
          "answer": "Зависи от вида на процедурата. Това се обсъжда предварително, за да сте подготвени и спокойни."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    },
    {
      "slug": "zhensko-zdrave",
      "title": "Консултации за женско здраве",
      "seoTitle": "Консултация за женско здраве София",
      "seoDescription": "Консултации за женско здраве в София при д-р Мария Райкова. Време за въпроси, профилактика и ясен план.",
      "intro": "Консултацията за женско здраве е пространство за въпроси — за цикъла, профилактиката, симптомите или следващите стъпки след изследвания. Фокусът е върху разбираемо обяснение и практически насоки.",
      "suitableFor": "Подходяща ако имате притеснения, искате второ мнение, подготовка за изследвания или просто спокойно да обсъдите женското си здраве с специалист.",
      "visitSteps": [
        "Разговор за вашите въпроси и приоритети.",
        "Оценка дали е нужен преглед или изследвания.",
        "Ясни препоръки и план във времето.",
        "Насочване към подходяща услуга, ако е необходима."
      ],
      "faqs": [
        {
          "question": "Мога ли да запазя консултация на английски или испански?",
          "answer": "Да. Д-р Мария Райкова обслужва пациенти на български, английски и испански."
        },
        {
          "question": "Консултацията замества ли прегледа?",
          "answer": "Не винаги. Понякога разговорът е достатъчен за насоки; друг път е нужен преглед или изследване. Това се решава заедно по време на посещението."
        },
        {
          "question": "Как да запазя час?",
          "answer": "Часът се запазва онлайн през Superdoc или на телефона на кабинета — 0894 972 626."
        },
        {
          "question": "Работи ли кабинетът с НЗОК?",
          "answer": "Да, д-р Райкова работи с НЗОК. За някои изследвания може да се изисква доплащане."
        }
      ]
    }
  ],
  "en": [
    {
      "slug": "profilaktichen-ginekologichen-pregled",
      "title": "Preventive gynecological exams",
      "seoTitle": "Preventive gynecological exam in Sofia",
      "seoDescription": "Preventive gynecological exam in Sofia with Dr. Maria Raykova. A calm visit, clear explanation, and a plan for next steps.",
      "intro": "A preventive gynecological exam is the foundation of women's healthcare. The goal is early detection of changes, peace of mind, and a clear picture of your health — before symptoms appear.",
      "suitableFor": "Suitable for women who want regular check-ups, a first visit with a new specialist, or prevention after a period without seeing a gynecologist. It does not include pregnancy follow-up or pediatric exams.",
      "visitSteps": [
        "Conversation about history, cycle, previous tests, and current concerns.",
        "Gynecological exam according to age and indications.",
        "When needed — Pap smear, ultrasound, or further tests.",
        "Explanation of findings and recommendation for the next check-up."
      ],
      "faqs": [
        {
          "question": "How often do I need a preventive exam?",
          "answer": "Frequency is individual. Many women see a gynecologist once a year, but your plan may differ based on age, history, and results."
        },
        {
          "question": "Do I need symptoms to come in?",
          "answer": "No. A preventive exam is for women without acute complaints who want timely care and peace of mind."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "akushero-ginekologichni-pregledi",
      "title": "Obstetric-gynecological exams",
      "seoTitle": "Obstetric-gynecological exam in Sofia",
      "seoDescription": "Obstetric-gynecological exams and consultations in Sofia with Dr. Maria Raykova. Primary and follow-up visits with clear explanations.",
      "intro": "An obstetric-gynecological exam is for diagnosis and consultation for symptoms, follow-up after treatment, or assessment of a specific concern. The visit starts with a conversation and ends with a clear plan.",
      "suitableFor": "Suitable for menstrual disorders, pain, vaginal symptoms, follow-up after tests, or a second opinion. Dr. Raykova does not provide pregnancy follow-up and does not examine children.",
      "visitSteps": [
        "Detailed conversation about symptoms and how long they have lasted.",
        "Clinical exam and assessment of findings.",
        "Ordering tests when indicated.",
        "Explanation of options and next steps."
      ],
      "faqs": [
        {
          "question": "What is the difference between a primary and a follow-up visit?",
          "answer": "A primary visit is an initial assessment. A follow-up is usually for monitoring an ongoing case, results, or treatment."
        },
        {
          "question": "What should I bring?",
          "answer": "Bring previous medical records, test results, and a list of medications if you take any."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "ultrazvukovi-izsledvaniya",
      "title": "Ultrasound examinations",
      "seoTitle": "Gynecological ultrasound in Sofia",
      "seoDescription": "Ultrasound of the female reproductive system in Sofia with Dr. Maria Raykova. Clear explanation of findings.",
      "intro": "Gynecological ultrasound helps assess the uterus, ovaries, and nearby structures. It is an important part of modern diagnostics and is combined with the clinical exam.",
      "suitableFor": "Suitable for prevention, pain, irregular cycles, monitoring findings, or when imaging is clinically needed.",
      "visitSteps": [
        "Brief conversation about the reason for the scan.",
        "Ultrasound examination according to the clinical situation.",
        "Explanation of visible structures and findings in clear language.",
        "Recommendation for further steps if needed."
      ],
      "notes": [
        "The exact examination approach is determined during the visit according to indications."
      ],
      "faqs": [
        {
          "question": "Is gynecological ultrasound painful?",
          "answer": "It is usually well tolerated. If you feel discomfort, tell the doctor — the exam can be adapted."
        },
        {
          "question": "Will I get an explanation of the result right away?",
          "answer": "Yes. Dr. Raykova explains the findings during the visit and what they mean for next steps."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "kolposkopiya",
      "title": "Colposcopy",
      "seoTitle": "Colposcopy in Sofia — early assessment",
      "seoDescription": "Colposcopy in Sofia with Dr. Maria Raykova. Precise examination when cervical changes are suspected.",
      "intro": "Colposcopy is a magnified examination of the cervix. It is used for more precise assessment when precancerous or other changes are suspected and is part of early diagnostics.",
      "suitableFor": "Suitable for abnormal Pap results, visible changes, or when the doctor recommends further cervical assessment.",
      "visitSteps": [
        "Conversation about previous results and the reason for the exam.",
        "Colposcopic examination in a calm setting.",
        "When indicated — additional procedures based on findings.",
        "Clear explanation of the result and a plan for monitoring or treatment."
      ],
      "faqs": [
        {
          "question": "Is colposcopy painful?",
          "answer": "Most women feel mild discomfort similar to an exam. If you are concerned, share this before the procedure."
        },
        {
          "question": "When will results be ready?",
          "answer": "It depends on whether samples were taken. The doctor will explain expected timelines during the visit."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "citonamazka",
      "title": "Pap smear (cytology)",
      "seoTitle": "Pap smear in Sofia — cervical screening",
      "seoDescription": "Pap smear (cytology) in Sofia with Dr. Maria Raykova. Clear preparation guidance and a calm plan after results.",
      "intro": "A Pap smear is a core screening test for early detection of cellular changes on the cervix. The goal is prevention and peace of mind — with a clear explanation at every step.",
      "suitableFor": "Suitable as part of a preventive exam, for age- and history-based screening, or when the doctor recommends cytology. It does not replace a clinical exam.",
      "visitSteps": [
        "Brief conversation about your cycle, previous results, and preparation.",
        "Pap smear taken during the gynecological exam.",
        "Explanation of next steps and expected result timelines.",
        "When needed — guidance toward HPV testing, colposcopy, or follow-up."
      ],
      "notes": [
        "Pap smear pricing is listed on the price page. NHIF visits may still require co-payment."
      ],
      "faqs": [
        {
          "question": "Is a Pap smear painful?",
          "answer": "Most women feel brief discomfort similar to a regular exam. If you are anxious, say so — explanation helps."
        },
        {
          "question": "How long do results take?",
          "answer": "According to Superdoc, result comments are usually ready within about 14 days. The exact timeline is confirmed during the visit."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF. A Pap smear may require co-payment."
        }
      ]
    },
    {
      "slug": "hpv-test",
      "title": "HPV test",
      "seoTitle": "HPV test in Sofia",
      "seoDescription": "HPV testing in Sofia with Dr. Maria Raykova. When it is done, what it means, and how it pairs with a Pap smear.",
      "intro": "An HPV test looks for human papillomavirus — a common cause of cervical cell changes. When indicated, it is discussed as part of screening alongside cytology and clinical assessment.",
      "suitableFor": "Suitable when the doctor recommends HPV screening based on age, history, or results. The exact panel and lab details are confirmed during the visit.",
      "visitSteps": [
        "Conversation about age, previous tests, and whether HPV screening is needed.",
        "Sample collection when indicated — often with an exam or Pap smear.",
        "Explanation of what the test measures and what comes next.",
        "If positive or unclear — a plan for follow-up or colposcopy."
      ],
      "notes": [
        "HPV test pricing is not fixed on the public price list — it is confirmed at the visit according to the chosen panel."
      ],
      "faqs": [
        {
          "question": "Does an HPV test replace a Pap smear?",
          "answer": "Not always. The two tests provide different information. Which is appropriate — or whether they are combined — depends on age and clinical context."
        },
        {
          "question": "What does a positive HPV result mean?",
          "answer": "It means the virus is present, not necessarily a serious finding. The doctor explains next steps — monitoring, further tests, or colposcopy."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF. Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "histeroskopiya",
      "title": "Hysteroscopy",
      "seoTitle": "Hysteroscopy in Sofia",
      "seoDescription": "Consultation and guidance for hysteroscopy with Dr. Maria Raykova in Sofia. Minimally invasive approach when indicated.",
      "intro": "Hysteroscopy is a minimally invasive method to examine the uterine cavity. Dr. Raykova is trained in office and operative hysteroscopy. The exact scope is determined by indications and where the procedure is performed.",
      "suitableFor": "Suitable for indications such as abnormal bleeding, suspected intrauterine findings, or when direct assessment of the uterine cavity is needed — after clinical judgment.",
      "visitSteps": [
        "Consultation and assessment of whether hysteroscopy is appropriate.",
        "Explanation of the procedure, preparation, and expectations.",
        "Planning according to indications and clinical context.",
        "Follow-up and explanation of results after the procedure."
      ],
      "notes": [
        "Some procedures may be performed in a hospital setting. This is clarified during consultation."
      ],
      "faqs": [
        {
          "question": "Office vs operative hysteroscopy — what is the difference?",
          "answer": "Office hysteroscopy usually has a smaller scope and may be done in an outpatient setting. Operative hysteroscopy is used when therapeutic procedures are needed. The choice depends on indications."
        },
        {
          "question": "Is anesthesia needed?",
          "answer": "It depends on the type of procedure. This is discussed in advance so you can feel prepared and calm."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    },
    {
      "slug": "zhensko-zdrave",
      "title": "Women's health consultations",
      "seoTitle": "Women's health consultation in Sofia",
      "seoDescription": "Women's health consultations in Sofia with Dr. Maria Raykova. Time for questions, prevention, and a clear plan.",
      "intro": "A women's health consultation is space for questions — about the cycle, prevention, symptoms, or next steps after tests. The focus is clear explanation and practical guidance.",
      "suitableFor": "Suitable if you have concerns, want a second opinion, preparation for tests, or simply wish to discuss women's health calmly with a specialist.",
      "visitSteps": [
        "Conversation about your questions and priorities.",
        "Assessment of whether an exam or tests are needed.",
        "Clear recommendations and a timeline.",
        "Referral to an appropriate service if needed."
      ],
      "faqs": [
        {
          "question": "Can I book a consultation in English or Spanish?",
          "answer": "Yes. Dr. Maria Raykova sees patients in Bulgarian, English, and Spanish."
        },
        {
          "question": "Does a consultation replace an exam?",
          "answer": "Not always. Sometimes conversation is enough for guidance; other times an exam or test is needed. This is decided together during the visit."
        },
        {
          "question": "How do I book an appointment?",
          "answer": "Book online via Superdoc or call the clinic at 0894 972 626."
        },
        {
          "question": "Does the clinic work with NHIF?",
          "answer": "Yes, Dr. Raykova works with NHIF (Bulgarian public health insurance). Some tests may require co-payment."
        }
      ]
    }
  ],
  "es": [
    {
      "slug": "profilaktichen-ginekologichen-pregled",
      "title": "Revisiones ginecológicas preventivas",
      "seoTitle": "Revisión ginecológica preventiva en Sofía",
      "seoDescription": "Revisión ginecológica preventiva en Sofía con la Dra. Maria Raykova. Consulta serena, explicación clara y plan de siguientes pasos.",
      "intro": "La revisión ginecológica preventiva es la base del cuidado de la salud femenina. El objetivo es detectar cambios a tiempo, aportar tranquilidad y ofrecer una imagen clara de su estado — antes de que aparezcan molestias.",
      "suitableFor": "Indicada para mujeres que desean control regular, una primera visita con un nuevo especialista o prevención tras un periodo sin acudir al ginecólogo. No incluye seguimiento del embarazo ni atención pediátrica.",
      "visitSteps": [
        "Conversación sobre historia, ciclo, pruebas previas y preocupaciones actuales.",
        "Exploración ginecológica según edad e indicaciones.",
        "Si es necesario — citología, ecografía u otras pruebas.",
        "Explicación de los hallazgos y recomendación del próximo control."
      ],
      "faqs": [
        {
          "question": "¿Con qué frecuencia necesito una revisión preventiva?",
          "answer": "La frecuencia es individual. Muchas mujeres acuden una vez al año, pero su plan puede variar según edad, historia y resultados."
        },
        {
          "question": "¿Necesito síntomas para venir?",
          "answer": "No. La revisión preventiva es precisamente para mujeres sin molestias agudas que buscan tranquilidad y cuidado oportuno."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "akushero-ginekologichni-pregledi",
      "title": "Consultas obstétrico-ginecológicas",
      "seoTitle": "Consulta obstétrico-ginecológica en Sofía",
      "seoDescription": "Consultas obstétrico-ginecológicas en Sofía con la Dra. Maria Raykova. Visita primaria o de seguimiento con explicación clara.",
      "intro": "La consulta obstétrico-ginecológica sirve para diagnóstico y orientación ante síntomas, control tras un tratamiento o valoración de un problema concreto. Empieza con una conversación y termina con un plan comprensible.",
      "suitableFor": "Indicada ante alteraciones menstruales, dolor, molestias vaginales, control tras pruebas o necesidad de una segunda opinión. La Dra. Raykova no realiza seguimiento del embarazo ni atiende a niños.",
      "visitSteps": [
        "Conversación detallada sobre los síntomas y su duración.",
        "Exploración clínica y valoración de hallazgos.",
        "Solicitud de pruebas cuando esté indicado.",
        "Explicación de opciones y siguientes pasos."
      ],
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre visita primaria y de seguimiento?",
          "answer": "La visita primaria es una valoración inicial. La de seguimiento suele servir para controlar un caso ya iniciado, resultados o tratamiento."
        },
        {
          "question": "¿Qué debo llevar?",
          "answer": "Lleve documentación médica previa, resultados de pruebas y una lista de medicamentos si los toma."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "ultrazvukovi-izsledvaniya",
      "title": "Ecografías",
      "seoTitle": "Ecografía ginecológica en Sofía",
      "seoDescription": "Ecografía del sistema reproductor femenino en Sofía con la Dra. Maria Raykova. Explicación clara de los hallazgos.",
      "intro": "La ecografía ginecológica ayuda a valorar útero, ovarios y estructuras vecinas. Es una parte importante del diagnóstico moderno y se combina con la exploración clínica.",
      "suitableFor": "Indicada en prevención, dolor, ciclo irregular, seguimiento de hallazgos o cuando se necesita diagnóstico por imagen.",
      "visitSteps": [
        "Breve conversación sobre el motivo del estudio.",
        "Ecografía según la situación clínica.",
        "Explicación de las estructuras visibles y hallazgos en lenguaje claro.",
        "Recomendación de pasos adicionales si son necesarios."
      ],
      "notes": [
        "El tipo concreto de estudio se determina durante la consulta según las indicaciones."
      ],
      "faqs": [
        {
          "question": "¿Es dolorosa la ecografía ginecológica?",
          "answer": "Suele ser bien tolerada. Si siente molestia, dígaselo a la doctora: la exploración puede adaptarse."
        },
        {
          "question": "¿Recibiré la explicación del resultado de inmediato?",
          "answer": "Sí. La Dra. Raykova explica los hallazgos durante la visita y qué significan para los siguientes pasos."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "kolposkopiya",
      "title": "Colposcopia",
      "seoTitle": "Colposcopia en Sofía — valoración temprana",
      "seoDescription": "Colposcopia en Sofía con la Dra. Maria Raykova. Exploración precisa ante sospecha de alteraciones cervicales.",
      "intro": "La colposcopia es una exploración ampliada del cuello uterino. Se usa para una valoración más precisa ante sospecha de cambios precancerosos u otras alteraciones y forma parte del diagnóstico temprano.",
      "suitableFor": "Indicada ante citologías alteradas, cambios visibles o cuando el médico recomienda una valoración adicional del cuello.",
      "visitSteps": [
        "Conversación sobre resultados previos y el motivo del estudio.",
        "Exploración colposcópica en un ambiente tranquilo.",
        "Si está indicado — procedimientos adicionales según el hallazgo.",
        "Explicación clara del resultado y plan de seguimiento o tratamiento."
      ],
      "faqs": [
        {
          "question": "¿Es dolorosa la colposcopia?",
          "answer": "La mayoría de mujeres nota una molestia leve, similar a una exploración. Si tiene preocupación, coméntelo antes del procedimiento."
        },
        {
          "question": "¿Cuándo estarán los resultados?",
          "answer": "Depende de si se toman muestras. La doctora explicará los plazos esperados durante la visita."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "citonamazka",
      "title": "Citología (Pap)",
      "seoTitle": "Citología en Sofía — prevención",
      "seoDescription": "Citología (Pap) en Sofía con la Dra. Maria Raykova. Preparación clara y un plan tranquilo tras el resultado.",
      "intro": "La citología es un cribado clave para detectar a tiempo cambios celulares en el cuello uterino. El objetivo es prevención y tranquilidad — con una explicación comprensible en cada paso.",
      "suitableFor": "Indicada como parte de una revisión preventiva, según edad e historial, o cuando el médico recomienda cribado. No sustituye la exploración clínica.",
      "visitSteps": [
        "Breve conversación sobre el ciclo, resultados previos y preparación.",
        "Toma de citología durante la exploración ginecológica.",
        "Explicación de los siguientes pasos y plazos aproximados del resultado.",
        "Si hace falta — orientación hacia test de VPH, colposcopia o control."
      ],
      "notes": [
        "El precio de la citología está publicado en el tarifario. Con NHIF puede haber copago."
      ],
      "faqs": [
        {
          "question": "¿Duele la citología?",
          "answer": "Suele notarse una molestia breve, similar a una exploración habitual. Si está nerviosa, dígalo: la explicación ayuda."
        },
        {
          "question": "¿Cuánto tarda el resultado?",
          "answer": "Según Superdoc, los comentarios de resultados suelen estar listos en unos 14 días. El plazo exacto se confirma en la visita."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF. La citología puede requerir copago."
        }
      ]
    },
    {
      "slug": "hpv-test",
      "title": "Test de VPH",
      "seoTitle": "Test de VPH en Sofía",
      "seoDescription": "Test de VPH en Sofía con la Dra. Maria Raykova. Cuándo se hace, qué significa y cómo se combina con la citología.",
      "intro": "El test de VPH busca la presencia del virus del papiloma humano — una causa frecuente de cambios celulares en el cuello. Cuando está indicado, se valora como parte del cribado junto con la citología y la evaluación clínica.",
      "suitableFor": "Indicado cuando el médico recomienda cribado de VPH según edad, historial o resultados. El panel concreto y el laboratorio se aclaran en la visita.",
      "visitSteps": [
        "Conversación sobre edad, pruebas previas y necesidad de cribado de VPH.",
        "Toma de muestra cuando esté indicado — a menudo con exploración o citología.",
        "Explicación de qué mide el test y cuáles son los siguientes pasos.",
        "Si el resultado es positivo o poco claro — plan de control o colposcopia."
      ],
      "notes": [
        "El precio del test de VPH no está fijado en el tarifario público — se confirma en la visita según el panel elegido."
      ],
      "faqs": [
        {
          "question": "¿El test de VPH sustituye a la citología?",
          "answer": "No siempre. Las dos pruebas dan información distinta. Cuál conviene — o si se combinan — se decide según la edad y el contexto clínico."
        },
        {
          "question": "¿Qué significa un VPH positivo?",
          "answer": "Significa presencia del virus, no necesariamente un hallazgo grave. La doctora explica qué sigue: observación, más pruebas o colposcopia."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF. Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "histeroskopiya",
      "title": "Histeroscopia",
      "seoTitle": "Histeroscopia en Sofía",
      "seoDescription": "Consulta y orientación sobre histeroscopia con la Dra. Maria Raykova en Sofía. Enfoque mínimamente invasivo cuando está indicado.",
      "intro": "La histeroscopia es un método mínimamente invasivo para explorar la cavidad uterina. La Dra. Raykova tiene formación en histeroscopia de consulta y operatoria. El alcance concreto se determina según indicaciones y el lugar de realización.",
      "suitableFor": "Indicada ante sangrado anormal, sospecha de hallazgos intrauterinos o cuando se necesita valoración directa de la cavidad uterina — tras criterio clínico.",
      "visitSteps": [
        "Consulta y valoración de si la histeroscopia es adecuada.",
        "Explicación del procedimiento, preparación y expectativas.",
        "Planificación según indicaciones y contexto clínico.",
        "Seguimiento y explicación de resultados tras el procedimiento."
      ],
      "notes": [
        "Algunos procedimientos pueden realizarse en entorno hospitalario. Esto se aclara en la consulta."
      ],
      "faqs": [
        {
          "question": "Histeroscopia de consulta vs operatoria — ¿cuál es la diferencia?",
          "answer": "La de consulta suele tener menor alcance y puede hacerse en ambulatorio. La operatoria se usa cuando hacen falta manipulaciones terapéuticas. La elección depende de las indicaciones."
        },
        {
          "question": "¿Se necesita anestesia?",
          "answer": "Depende del tipo de procedimiento. Se comenta de antemano para que esté preparada y tranquila."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    },
    {
      "slug": "zhensko-zdrave",
      "title": "Consultas de salud femenina",
      "seoTitle": "Consulta de salud femenina en Sofía",
      "seoDescription": "Consultas de salud femenina en Sofía con la Dra. Maria Raykova. Tiempo para preguntas, prevención y un plan claro.",
      "intro": "La consulta de salud femenina es un espacio para preguntas — sobre el ciclo, la prevención, los síntomas o los siguientes pasos tras pruebas. El foco es una explicación comprensible y orientación práctica.",
      "suitableFor": "Indicada si tiene preocupaciones, desea una segunda opinión, preparación para pruebas o simplemente quiere hablar con calma de su salud femenina con una especialista.",
      "visitSteps": [
        "Conversación sobre sus preguntas y prioridades.",
        "Valoración de si hace falta exploración o pruebas.",
        "Recomendaciones claras y un plan en el tiempo.",
        "Derivación al servicio adecuado si es necesario."
      ],
      "faqs": [
        {
          "question": "¿Puedo reservar una consulta en inglés o español?",
          "answer": "Sí. La Dra. Maria Raykova atiende en búlgaro, inglés y español."
        },
        {
          "question": "¿La consulta sustituye a la exploración?",
          "answer": "No siempre. A veces la conversación basta para orientar; otras veces hace falta exploración o prueba. Se decide juntas durante la visita."
        },
        {
          "question": "¿Cómo reservo una cita?",
          "answer": "Reserve online a través de Superdoc o llame a la consulta al 0894 972 626."
        },
        {
          "question": "¿La consulta trabaja con NHIF?",
          "answer": "Sí, la Dra. Raykova trabaja con NHIF (seguro público búlgaro). Algunas pruebas pueden requerir copago."
        }
      ]
    }
  ]
};

export function getServicesContent(locale: Locale = "bg"): ServiceContent[] {
  return byLocale[locale] ?? byLocale.bg;
}

export function getServiceBySlug(
  slug: string,
  locale: Locale = "bg",
): ServiceContent | undefined {
  return getServicesContent(locale).find((service) => service.slug === slug);
}
