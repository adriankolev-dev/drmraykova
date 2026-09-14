import type { Locale } from "@/i18n/routing";

export type ServiceGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  suitableFor: string;
  visitSteps: string[];
  notes?: string[];
  /** Optional intent-focused sections — used when a service page is the ranking URL. */
  guideSections?: ServiceGuideSection[];
  relatedReading?: Array<{ href: string; label: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const byLocale: Record<Locale, ServiceContent[]> = {
  "bg": [
    {
      "slug": "profilaktichen-ginekologichen-pregled",
      "title": "Профилактични гинекологични прегледи",
      "seoTitle": "Профилактичен гинекологичен преглед в София",
      "seoDescription": "Профилактичен гинекологичен преглед в София при д-р Мария Райкова. Спокоен преглед, ясно обяснение и план за следващи стъпки.",
      "intro": "Профилактичният гинекологичен преглед е основата на грижата за женското здраве. Целта е ранно откриване на промени, спокойствие и ясна картина за вашето състояние — преди да се появят оплаквания.",
      "suitableFor": "Подходящ е за жени, които искат редовен контрол, първи преглед при нов специалист или профилактика след период без посещение при гинеколог. Не включва проследяване на бременност и прегледи на деца.",
      "visitSteps": [
        "Разговор за история, цикъл, предишни изследвания и текущи притеснения.",
        "Гинекологичен преглед според възрастта и индикациите.",
        "При нужда — насочване към цитонамазка, ултразвук или допълнителни изследвания.",
        "Обяснение на находките и препоръка за следващ контрол."
      ],
      "notes": [
        "При индикации прегледът може да включи насочване към [цитонамазка](/uslugi/citonamazka), [HPV тест](/uslugi/hpv-test) или [колпоскопия](/uslugi/kolposkopiya)."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-vklyuchva-profilaktichniyat-pregled",
          "label": "Какво включва профилактичният гинекологичен преглед"
        },
        {
          "href": "/narachnik/kolko-chesto-profilaktichen-pregled",
          "label": "Колко често е нужен профилактичен преглед"
        },
        {
          "href": "/narachnik/kakvo-pokazva-citonamazkata",
          "label": "Какво показва цитонамазката?"
        }
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
      "seoTitle": "Гинекологичен преглед в София | Д-р Мария Райкова",
      "seoDescription": "Гинекологичен преглед в София при д-р Мария Райкова — при оплаквания, контрол след изследвания или второ мнение. Първичен и вторичен преглед.",
      "intro": "Акушеро-гинекологичният преглед е за диагностика и консултация при оплаквания, контрол след лечение или оценка на конкретен симптом. Прегледът започва с разговор и завършва с разбираем план.",
      "suitableFor": "Подходящ при менструални нарушения, болка, вагинални оплаквания, контрол след изследвания или нужда от второ мнение. Д-р Райкова не проследява бременност и не преглежда деца.",
      "visitSteps": [
        "Подробен разговор за симптомите и тяхната продължителност.",
        "Клиничен преглед и оценка на находките.",
        "Назначаване на изследвания при индикации.",
        "Обяснение на възможностите и следващите стъпки."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/podgotovka-za-ginekologichen-pregled",
          "label": "Подготовка за гинекологичен преглед"
        },
        {
          "href": "/narachnik/neredoven-cikul-koga-e-problem",
          "label": "Нередовен менструален цикъл — кога е проблем?"
        },
        {
          "href": "/narachnik/menstrualni-narusheniya-koga-da-posetite-ginekolog",
          "label": "Менструални нарушения — кога да посетите гинеколог"
        }
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
      "seoTitle": "Гинекологичен ултразвук в София | Д-р Мария Райкова",
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
      "seoTitle": "Колпоскопия в София | Д-р Мария Райкова",
      "seoDescription": "Колпоскопия в София при д-р Мария Райкова. Кога се назначава след цитонамазка или HPV, как протича и как да запазите час.",
      "intro": "Колпоскопията е специализиран оглед на маточната шийка с увеличение. Назначава се най-често след отклонение в [цитонамазката](/uslugi/citonamazka) или при определен резултат от [HPV тест](/uslugi/hpv-test), за да се направи по-прецизна оценка. Целта е ранна диагностика — не задължително „лоша новина“.",
      "suitableFor": "Подходяща при отклонения в цитонамазката, положителен HPV с определени находки, видими изменения или когато лекарят препоръча допълнителна оценка на шийката. Решението е индивидуално — обикновено след [профилактичен гинекологичен преглед](/uslugi/profilaktichen-ginekologichen-pregled) или консултация по резултати.",
      "visitSteps": [
        "Разговор за предишни резултати и причината за изследването.",
        "Колпоскопски оглед в спокойна обстановка.",
        "При индикации — допълнителни процедури според находката, включително биопсия.",
        "Ясно обяснение на резултата и план за наблюдение или лечение."
      ],
      "notes": [
        "Колпоскопията не замества скрининга. Често следва след [цитонамазка](/uslugi/citonamazka) или [HPV тест](/uslugi/hpv-test) и се планира в рамките на клиничната оценка."
      ],
      "guideSections": [
        {
          "heading": "Какво е колпоскопия?",
          "paragraphs": [
            "Колпоскопията е прецизен оглед на шийката на матката — и понякога на влагалището — с увеличителен апарат (колпоскоп). Колпоскопът стои на разстояние и увеличава образа; не се поставя дълбоко в тялото.",
            "Понякога се нанася разтвор, за да се видят промените по-ясно. При нужда може да се вземе малка биопсия. Изследването се прави след клинична преценка и разговор за показанията."
          ]
        },
        {
          "heading": "Кога се препоръчва?",
          "paragraphs": [
            "Колпоскопията не е рутинен скрининг за всяка жена. Назначава се, когато има причина за по-подробна оценка на шийката."
          ],
          "bullets": [
            "отклонения в [цитонамазката](/uslugi/citonamazka);",
            "[положителен HPV тест](/uslugi/hpv-test) с определени комбинации от резултати;",
            "проследяване след предишна находка;",
            "видими изменения, които изискват по-прецизен оглед."
          ]
        },
        {
          "heading": "Как протича?",
          "paragraphs": [
            "Позицията е същата като при гинекологичен преглед. Лекарят поставя спекулум, оглежда шийката с колпоскопа и при нужда нанася разтвор. Ако се вземе биопсия, това се обяснява по време на посещението.",
            "Самият оглед обикновено е кратък. Посещението включва и разговор за резултатите и следващите стъпки."
          ]
        },
        {
          "heading": "Как да се подготвите?",
          "paragraphs": [
            "Подготовката е близка до тази за обикновен гинекологичен преглед. Ако лекарят е дал други указания, следвайте тях."
          ],
          "bullets": [
            "Носете предишни резултати — цитонамазки, HPV тестове, предишни колпоскопии.",
            "Избягвайте вагинални кремове, тампони и спермициди 24 часа преди процедурата, ако не е казано друго.",
            "Запишете въпросите си: ще се вземе ли биопсия и кога ще получите резултат.",
            "Вижте и [подготовката за гинекологичен преглед](/narachnik/podgotovka-za-ginekologichen-pregled)."
          ]
        },
        {
          "heading": "Боли ли колпоскопията?",
          "paragraphs": [
            "Повечето жени усещат лек дискомфорт, подобен на преглед — притискане или кратко разтягане, а не силна болка. Ако се вземе биопсия, може да има кратък дискомфорт или спазъм, който обикновено отминава бързо.",
            "Ако усетите силна болка, кажете веднага — прегледът може да бъде адаптиран. По-подробно: [Боли ли колпоскопията?](/narachnik/boli-li-kolposkopiyata)"
          ]
        },
        {
          "heading": "Колпоскопия при HPV",
          "paragraphs": [
            "Положителен [HPV тест](/uslugi/hpv-test) означава наличие на вируса, а не задължително сериозна находка. Колпоскопия се препоръчва при определени комбинации от HPV резултат, цитология и клинична история — не автоматично при всеки положителен тест.",
            "Планът се обяснява след преглед на вашите резултати. Образователно: [Какво означава положителен HPV тест?](/narachnik/pozitiven-hpv-test)"
          ]
        },
        {
          "heading": "Колпоскопия след отклонение в цитонамазката",
          "paragraphs": [
            "Отклонение в [цитонамазката](/uslugi/citonamazka) не е диагноза рак. Следва индивидуален план: понякога е достатъчно наблюдение или [HPV тест](/uslugi/hpv-test), друг път се препоръчва колпоскопия.",
            "Категорията на резултата, възрастта и предишните изследвания определят следващата стъпка. Подробно: [Какво следва след абнормна цитонамазка?](/narachnik/kakvo-sledva-sled-abnormalna-citonamazka)"
          ]
        },
        {
          "heading": "Какво следва след изследването?",
          "paragraphs": [
            "Лекарят обяснява какво е видял и дали са нужни допълнителни стъпки. Ако е взета биопсия, срокът за резултат зависи от лабораторията — обикновено няколко дни до около седмица.",
            "Леко зацапване за 1–2 дни е възможно, особено след биопсия. Следвайте указанията за тампони и полов контакт. Следващият контрол може да включва наблюдение, лечение или нов [профилактичен преглед](/uslugi/profilaktichen-ginekologichen-pregled)."
          ]
        }
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "Какво е колпоскопия и кога се прави"
        },
        {
          "href": "/narachnik/boli-li-kolposkopiyata",
          "label": "Боли ли колпоскопията?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "Какво следва след абнормна цитонамазка?"
        },
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "Положителен HPV тест — какво следва"
        }
      ],
      "faqs": [
        {
          "question": "Какво е колпоскопия?",
          "answer": "Прецизен оглед на шийката на матката с увеличителен апарат (колпоскоп). Целта е да се видят зони, които изискват по-подробна оценка — не да се постави диагноза по телефона."
        },
        {
          "question": "Кога се препоръчва колпоскопия?",
          "answer": "Най-често след отклонение в цитонамазката, при определен HPV резултат, при проследяване на предишна находка или когато лекарят види изменения, които иска да огледа по-прецизно."
        },
        {
          "question": "Боли ли колпоскопията?",
          "answer": "Повечето жени усещат лек дискомфорт, подобен на преглед. Ако се вземе биопсия, може да има кратък дискомфорт. Споделете притесненията си преди процедурата."
        },
        {
          "question": "Как да се подготвя за колпоскопия?",
          "answer": "Носете предишни резултати. Избягвайте вагинални кремове и тампони 24 часа преди процедурата, ако не е казано друго. Запишете въпросите си за биопсия и срок на резултата."
        },
        {
          "question": "Прави ли се колпоскопия при всеки положителен HPV?",
          "answer": "Не. Положителен HPV не означава задължително колпоскопия. Решението зависи от типа на резултата, цитонамазката и клиничната история."
        },
        {
          "question": "След отклонение в цитонамазката винаги ли се прави колпоскопия?",
          "answer": "Не винаги. Понякога е достатъчно наблюдение или HPV тест. При по-значими отклонения или определени комбинации от резултати колпоскопията е следващата стъпка."
        },
        {
          "question": "Какво следва след колпоскопия?",
          "answer": "Обяснение на находката и план за наблюдение, лечение или контрол. Ако е взета биопсия, лекарят ще каже очаквания срок за резултат."
        },
        {
          "question": "Кога ще са готови резултатите?",
          "answer": "Зависи от това дали са взети проби. Ако има биопсия, резултатът обикновено идва след няколко дни до около седмица. Точният срок се уточнява на посещението."
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
      "seoTitle": "Цитонамазка в София | Д-р Мария Райкова",
      "seoDescription": "Цитонамазка (Pap тест) в София при д-р Мария Райкова. Подготовка, как протича вземането и какво следва при отклонение. Записване онлайн.",
      "intro": "Цитонамазката е основен скрининг за ранно откриване на клетъчни промени на маточната шийка. Целта е профилактика и спокойствие — с разбираемо обяснение на всяка стъпка.",
      "suitableFor": "Подходяща като част от профилактичен преглед, при контрол според възрастта и историята или когато лекарят препоръча скрининг. Не замества клиничния преглед.",
      "visitSteps": [
        "Кратък разговор за цикъл, предишни резултати и подготовка.",
        "Вземане на цитонамазка по време на гинекологичен преглед.",
        "Обяснение какво следва и приблизителни срокове за резултат.",
        "При нужда — насочване към HPV тест, колпоскопия или контрол."
      ],
      "notes": [
        "Цената на цитонамазката е публикувана в ценоразписа. При работа с НЗОК може да има доплащане.",
        "При отклонение следващата стъпка може да е [HPV тест](/uslugi/hpv-test) или [колпоскопия](/uslugi/kolposkopiya). Скринингът често започва от [профилактичен преглед](/uslugi/profilaktichen-ginekologichen-pregled)."
      ],
      "guideSections": [
        {
          "heading": "Какво е цитонамазка?",
          "paragraphs": [
            "Цитонамазката (Pap тест) е изследване на клетки от шийката на матката. Лабораторията търси клетъчни промени, които изискват допълнителна оценка — не поставя диагноза рак по самия резултат.",
            "Често се комбинира с [HPV тест](/uslugi/hpv-test), но двата теста дават различна информация. Образователно: [Какво показва цитонамазката?](/narachnik/kakvo-pokazva-citonamazkata) и [HPV тест vs цитонамазка](/narachnik/hpv-test-vs-citonamazka)."
          ]
        },
        {
          "heading": "Как протича вземането?",
          "paragraphs": [
            "Пробата се взема по време на гинекологичен преглед — с мека четка или шпатула. Отнема секунди. Повечето жени описват кратко притискане, не силна болка."
          ]
        },
        {
          "heading": "Как да се подготвите?",
          "paragraphs": [
            "Подготовката е близка до тази за обикновен преглед. Ако лекарят е дал други указания, следвайте тях."
          ],
          "bullets": [
            "Избягвайте вагинални кремове, тампони и спермициди 24–48 часа преди прегледа, ако не е казано друго.",
            "Носете предишни резултати — цитонамазки, HPV тестове, колпоскопии.",
            "Попитайте кога да очаквате резултата и как ще бъдете уведомена.",
            "Вижте и [подготовката за гинекологичен преглед](/narachnik/podgotovka-za-ginekologichen-pregled)."
          ]
        },
        {
          "heading": "Какво следва след резултата?",
          "paragraphs": [
            "Нормалният резултат обикновено води към следващ [профилактичен преглед](/uslugi/profilaktichen-ginekologichen-pregled) според препоръките. При отклонение планът е индивидуален — наблюдение, HPV тест или [колпоскопия](/uslugi/kolposkopiya).",
            "Отклонението не е диагноза рак. Подробно: [Какво следва след абнормна цитонамазка?](/narachnik/kakvo-sledva-sled-abnormalna-citonamazka)"
          ]
        }
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-pokazva-citonamazkata",
          "label": "Какво показва цитонамазката?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "Какво следва след абнормна цитонамазка?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "HPV тест vs цитонамазка"
        },
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "Какво е колпоскопия и кога се прави"
        }
      ],
      "faqs": [
        {
          "question": "Болезнена ли е цитонамазката?",
          "answer": "Обикновено усещането е краткотраен дискомфорт, подобен на обикновен преглед. Ако сте тревожна, кажете — обяснението помага."
        },
        {
          "question": "Какви видове цитонамазка има?",
          "answer": "Лабораториите използват конвенционална цитонамазка или течностна цитология (LBC). И двете оценяват клетки от шийката. Кой метод се прилага се уточнява при посещението — не избирате „по-добър“ вариант от интернет."
        },
        {
          "question": "Какво следва при отклонение или цитонамазка IIIа?",
          "answer": "Резултатът сам по себе си не е лечение и не е диагноза рак. Следващата стъпка — HPV тест, наблюдение или колпоскопия — се определя след преглед на целия резултат. Подробно: статията „Какво следва след абнормна цитонамазка?“"
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
      "seoTitle": "HPV тест в София | Д-р Мария Райкова",
      "seoDescription": "HPV тест (човешки папилома вирус) в София при д-р Мария Райкова. Какво показва, как се комбинира с цитонамазка и какво следва при положителен резултат.",
      "intro": "HPV тестът търси наличие на човешки папилома вирус — честа причина за клетъчни промени на шийката. При индикации се обсъжда като част от скрининга, заедно с цитонамазката и клиничната оценка.",
      "suitableFor": "Подходящ когато лекарят препоръча HPV скрининг според възрастта, историята или резултатите. Конкретният панел и лаборатория се уточняват при посещението.",
      "visitSteps": [
        "Разговор за възраст, предишни изследвания и нужда от HPV скрининг.",
        "Вземане на проба при индикации — често заедно с преглед или цитонамазка.",
        "Обяснение какво измерва тестът и какви са следващите стъпки.",
        "При положителен или неясен резултат — план за контрол или колпоскопия."
      ],
      "notes": [
        "Цената на HPV теста не е фиксирана в публичния ценоразпис — уточнява се при посещението според избрания панел.",
        "HPV тестът се комбинира с [цитонамазка](/uslugi/citonamazka). При определени резултати следващата стъпка може да е [колпоскопия](/uslugi/kolposkopiya)."
      ],
      "guideSections": [
        {
          "heading": "Какво е HPV?",
          "paragraphs": [
            "Човешкият папилома вирус (HPV) е много чест. Според NHS повечето сексуално активни хора го срещат по някое време. При много жени организмът изчиства инфекцията без лечение.",
            "Високорисковите типове са свързани с клетъчни промени на шийката. Положителният тест означава наличие на вируса — не диагноза рак. Подробно: [Какво означава положителен HPV тест?](/narachnik/pozitiven-hpv-test)"
          ]
        },
        {
          "heading": "Какво показва HPV тестът?",
          "paragraphs": [
            "Тестът търси генетичен материал на вируса в проба от шийката. Различава се от [цитонамазката](/uslugi/citonamazka), която оглежда самите клетки.",
            "Конкретният панел (кои типове се изследват) се уточнява при посещението."
          ]
        },
        {
          "heading": "HPV тест и цитонамазка — каква е разликата?",
          "paragraphs": [
            "Цитонамазката описва клетките. HPV тестът търси вируса. Често се комбинират, но единият не замества автоматично другия. Изборът зависи от възрастта и клиничния контекст.",
            "Образователно: [HPV тест vs цитонамазка](/narachnik/hpv-test-vs-citonamazka)"
          ]
        },
        {
          "heading": "Какво следва при положителен резултат?",
          "paragraphs": [
            "Не всеки положителен HPV води до [колпоскопия](/uslugi/kolposkopiya). Решението зависи от типа на резултата, цитонамазката и историята. Понякога е достатъчно наблюдение и повторен тест."
          ]
        }
      ],
      "relatedReading": [
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "Какво означава положителен HPV тест?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "HPV тест vs цитонамазка"
        },
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "Какво е колпоскопия и кога се прави"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "Какво следва след абнормна цитонамазка?"
        }
      ],
      "faqs": [
        {
          "question": "Колко струва HPV тестът?",
          "answer": "Цената на HPV теста не е в публичния ценоразпис на кабинета. Обадете се на 0894 972 626 и ще ви я кажат преди да запазите час."
        },
        {
          "question": "Какво е човешки папилома вирус (HPV)?",
          "answer": "Чест вирус, който при много хора се изчиства от организма. Високорисковите типове са свързани с клетъчни промени на шийката. Положителният тест не означава рак."
        },
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
      "seoTitle": "Хистероскопия в София — консултация и насочване",
      "seoDescription": "Хистероскопия в София при д-р Мария Райкова: консултация и насочване за офис или оперативна процедура според индикациите. Запазете час.",
      "intro": "Хистероскопията е миниинвазивен оглед на маточната кухина. В кабинета в София д-р Райкова консултира и насочва при индикации; има квалификация в офис и оперативна хистероскопия. Конкретният обхват и мястото — кабинет или болница — се уточняват след преглед.",
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
      "relatedReading": [
        {
          "href": "/narachnik/boli-li-histeroskopiyata",
          "label": "Боли ли хистероскопията?"
        }
      ],
      "faqs": [
        {
          "question": "Колко струва хистероскопията?",
          "answer": "Цената на хистероскопията не е в публичния ценоразпис на кабинета, защото зависи от вида на процедурата. Обадете се на 0894 972 626, за да я уточните."
        },
        {
          "question": "Какво е хистероскопия?",
          "answer": "Миниинвазивен оглед на маточната кухина с тънка камера. Може да е диагностична (офис) или оперативна. Обхватът и мястото се определят след консултация."
        },
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
      "relatedReading": [
        {
          "href": "/narachnik/menstrualni-narusheniya-koga-da-posetite-ginekolog",
          "label": "Менструални нарушения — кога да посетите гинеколог"
        },
        {
          "href": "/narachnik/neredoven-cikul-koga-e-problem",
          "label": "Нередовен менструален цикъл — кога е проблем?"
        },
        {
          "href": "/narachnik/podgotovka-za-ginekologichen-pregled",
          "label": "Подготовка за гинекологичен преглед"
        }
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
      "notes": [
        "When indicated, the visit may include referral for a [Pap smear](/uslugi/citonamazka), [HPV test](/uslugi/hpv-test), or [colposcopy](/uslugi/kolposkopiya)."
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
      "seoTitle": "Gynecological exam in Sofia | Dr. Maria Raykova",
      "seoDescription": "Gynecological exam in Sofia with Dr. Maria Raykova — for symptoms, follow-up after tests, or a second opinion. Primary and follow-up visits.",
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
      "seoTitle": "Colposcopy in Sofia | Dr. Maria Raykova",
      "seoDescription": "Colposcopy in Sofia with Dr. Maria Raykova. When it is recommended after a Pap smear or HPV test, how the visit goes, and how to book.",
      "intro": "Colposcopy is a magnified examination of the cervix. It is most often recommended after an abnormal [Pap smear](/uslugi/citonamazka) or a specific [HPV test](/uslugi/hpv-test) result, for a more precise assessment. The aim is earlier diagnosis — not automatically “bad news”.",
      "suitableFor": "Suitable for abnormal Pap results, a positive HPV test with certain findings, visible changes, or when the doctor recommends further cervical assessment. The decision is individual — usually after a [preventive gynecological exam](/uslugi/profilaktichen-ginekologichen-pregled) or a consultation about results.",
      "visitSteps": [
        "Conversation about previous results and the reason for the exam.",
        "Colposcopic examination in a calm setting.",
        "When indicated — additional procedures based on findings, including biopsy.",
        "Clear explanation of the result and a plan for monitoring or treatment."
      ],
      "notes": [
        "Colposcopy does not replace screening. It often follows a [Pap smear](/uslugi/citonamazka) or [HPV test](/uslugi/hpv-test) and is planned as part of the clinical assessment."
      ],
      "guideSections": [
        {
          "heading": "What is colposcopy?",
          "paragraphs": [
            "Colposcopy is a close examination of the cervix — and sometimes the vagina — with a magnifying device (colposcope). The colposcope stays at a distance and magnifies the image; it is not inserted deep into the body.",
            "A solution may be applied so changes are easier to see. If needed, a small biopsy can be taken. The exam is done after clinical judgment and a conversation about the indications."
          ]
        },
        {
          "heading": "When is it recommended?",
          "paragraphs": [
            "Colposcopy is not routine screening for every woman. It is recommended when there is a reason for a closer look at the cervix."
          ],
          "bullets": [
            "abnormal [Pap smear](/uslugi/citonamazka) results;",
            "a [positive HPV test](/uslugi/hpv-test) with certain combinations of findings;",
            "follow-up after a previous finding;",
            "visible changes that need a more precise exam."
          ]
        },
        {
          "heading": "How does it proceed?",
          "paragraphs": [
            "The position is the same as for a gynecological exam. The doctor places a speculum, examines the cervix with the colposcope, and may apply a solution. If a biopsy is taken, this is explained during the visit.",
            "The examination itself is usually brief. The visit also includes a conversation about findings and next steps."
          ]
        },
        {
          "heading": "How should you prepare?",
          "paragraphs": [
            "Preparation is similar to a regular gynecological exam. If the doctor has given other instructions, follow those."
          ],
          "bullets": [
            "Bring previous results — Pap smears, HPV tests, previous colposcopies.",
            "Avoid vaginal creams, tampons, and spermicides for 24 hours before the procedure, unless told otherwise.",
            "Write down your questions: will a biopsy be taken, and when will results be ready?",
            "See also [preparation for a gynecological exam](/narachnik/podgotovka-za-ginekologichen-pregled)."
          ]
        },
        {
          "heading": "Is colposcopy painful?",
          "paragraphs": [
            "Most women feel mild discomfort similar to an exam — pressure or brief stretching, not severe pain. If a biopsy is taken, there may be brief discomfort or a cramp that usually passes quickly.",
            "If you feel strong pain, say so immediately — the exam can be adapted. More detail: [Is colposcopy painful?](/narachnik/boli-li-kolposkopiyata)"
          ]
        },
        {
          "heading": "Colposcopy and HPV",
          "paragraphs": [
            "A positive [HPV test](/uslugi/hpv-test) means the virus is present, not necessarily a serious finding. Colposcopy is recommended for certain combinations of HPV result, cytology, and clinical history — not automatically after every positive test.",
            "The plan is explained after reviewing your results. Educational: [What does a positive HPV test mean?](/narachnik/pozitiven-hpv-test)"
          ]
        },
        {
          "heading": "Colposcopy after an abnormal Pap smear",
          "paragraphs": [
            "An abnormal [Pap smear](/uslugi/citonamazka) is not a cancer diagnosis. Next comes an individual plan: sometimes observation or an [HPV test](/uslugi/hpv-test) is enough; other times colposcopy is recommended.",
            "The result category, age, and previous tests determine the next step. Details: [What follows an abnormal Pap smear?](/narachnik/kakvo-sledva-sled-abnormalna-citonamazka)"
          ]
        },
        {
          "heading": "What happens after the exam?",
          "paragraphs": [
            "The doctor explains what was seen and whether further steps are needed. If a biopsy was taken, the result timeline depends on the laboratory — usually a few days to about a week.",
            "Light spotting for 1–2 days is possible, especially after biopsy. Follow instructions about tampons and intercourse. Follow-up may include observation, treatment, or another [preventive exam](/uslugi/profilaktichen-ginekologichen-pregled)."
          ]
        }
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "What is colposcopy and when is it done"
        },
        {
          "href": "/narachnik/boli-li-kolposkopiyata",
          "label": "Is colposcopy painful?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "What follows an abnormal Pap smear?"
        },
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "Positive HPV test — what next"
        }
      ],
      "faqs": [
        {
          "question": "What is colposcopy?",
          "answer": "A close examination of the cervix with a magnifying device (colposcope). The aim is to see areas that need a closer look — not to give a diagnosis over the phone."
        },
        {
          "question": "When is colposcopy recommended?",
          "answer": "Most often after an abnormal Pap smear, a specific HPV result, follow-up of a previous finding, or when the doctor sees changes that need a more precise exam."
        },
        {
          "question": "Is colposcopy painful?",
          "answer": "Most women feel mild discomfort similar to an exam. If a biopsy is taken, there may be brief discomfort. Share any concerns before the procedure."
        },
        {
          "question": "How should I prepare for colposcopy?",
          "answer": "Bring previous results. Avoid vaginal creams and tampons for 24 hours beforehand, unless told otherwise. Write down questions about biopsy and result timing."
        },
        {
          "question": "Is colposcopy needed after every positive HPV test?",
          "answer": "No. A positive HPV result does not automatically mean colposcopy. The decision depends on the type of result, the Pap smear, and clinical history."
        },
        {
          "question": "Is colposcopy always done after an abnormal Pap smear?",
          "answer": "Not always. Sometimes observation or an HPV test is enough. With more significant changes or certain combinations of results, colposcopy is the next step."
        },
        {
          "question": "What happens after colposcopy?",
          "answer": "An explanation of the finding and a plan for observation, treatment, or follow-up. If a biopsy was taken, the doctor will give the expected result timeline."
        },
        {
          "question": "When will results be ready?",
          "answer": "It depends on whether samples were taken. If there is a biopsy, the result usually comes in a few days to about a week. The exact timing is confirmed during the visit."
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
      "seoTitle": "Pap smear in Sofia | Dr. Maria Raykova",
      "seoDescription": "Pap smear (cytology) in Sofia with Dr. Maria Raykova. Preparation, how the sample is taken, and what follows if the result is abnormal. Book online.",
      "intro": "A Pap smear is a core screening test for early detection of cellular changes on the cervix. The goal is prevention and peace of mind — with a clear explanation at every step.",
      "suitableFor": "Suitable as part of a preventive exam, for age- and history-based screening, or when the doctor recommends cytology. It does not replace a clinical exam.",
      "visitSteps": [
        "Brief conversation about your cycle, previous results, and preparation.",
        "Pap smear taken during the gynecological exam.",
        "Explanation of next steps and expected result timelines.",
        "When needed — guidance toward HPV testing, colposcopy, or follow-up."
      ],
      "notes": [
        "Pap smear pricing is listed on the price page. NHIF visits may still require co-payment.",
        "If the result is abnormal, the next step may be an [HPV test](/uslugi/hpv-test) or [colposcopy](/uslugi/kolposkopiya). Screening often starts with a [preventive exam](/uslugi/profilaktichen-ginekologichen-pregled)."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-pokazva-citonamazkata",
          "label": "What does a Pap smear show?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "What happens after an abnormal Pap smear?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "HPV test vs Pap smear"
        }
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
      "seoTitle": "HPV test in Sofia | Dr. Maria Raykova",
      "seoDescription": "HPV testing (human papillomavirus) in Sofia with Dr. Maria Raykova. What it shows, how it pairs with a Pap smear, and what a positive result means.",
      "intro": "An HPV test looks for human papillomavirus — a common cause of cervical cell changes. When indicated, it is discussed as part of screening alongside cytology and clinical assessment.",
      "suitableFor": "Suitable when the doctor recommends HPV screening based on age, history, or results. The exact panel and lab details are confirmed during the visit.",
      "visitSteps": [
        "Conversation about age, previous tests, and whether HPV screening is needed.",
        "Sample collection when indicated — often with an exam or Pap smear.",
        "Explanation of what the test measures and what comes next.",
        "If positive or unclear — a plan for follow-up or colposcopy."
      ],
      "notes": [
        "HPV test pricing is not fixed on the public price list — it is confirmed at the visit according to the chosen panel.",
        "An HPV test is often combined with a [Pap smear](/uslugi/citonamazka). With certain results, the next step may be [colposcopy](/uslugi/kolposkopiya)."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "What does a positive HPV test mean?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "HPV test vs Pap smear"
        },
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "What is colposcopy and when is it done?"
        }
      ],
      "faqs": [
        {
          "question": "How much does the HPV test cost?",
          "answer": "The price of the HPV test is not in the practice's published price list. Call 0894 972 626 and they will tell you before you book."
        },
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
      "seoTitle": "Hysteroscopy in Sofia — consultation and guidance",
      "seoDescription": "Hysteroscopy in Sofia with Dr. Maria Raykova: consultation and guidance for office or operative procedure when indicated. Book an appointment.",
      "intro": "Hysteroscopy is a minimally invasive look inside the uterine cavity. In the Sofia clinic Dr. Raykova consults and guides when it may be indicated; she is trained in office and operative hysteroscopy. The exact scope and setting — clinic or hospital — are decided after examination.",
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
      "relatedReading": [
        {
          "href": "/narachnik/boli-li-histeroskopiyata",
          "label": "Is hysteroscopy painful?"
        }
      ],
      "faqs": [
        {
          "question": "How much does a hysteroscopy cost?",
          "answer": "The price of a hysteroscopy is not in the practice's published price list, as it depends on the type of procedure. Call 0894 972 626 to find out."
        },
        {
          "question": "What is hysteroscopy?",
          "answer": "A minimally invasive look inside the uterine cavity with a thin camera. It may be diagnostic (office) or operative. Scope and setting are decided after consultation."
        },
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
      "notes": [
        "Si está indicado, la visita puede incluir derivación a [citología](/uslugi/citonamazka), [test de VPH](/uslugi/hpv-test) o [colposcopia](/uslugi/kolposkopiya)."
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
      "seoTitle": "Consulta ginecológica en Sofía | Dra. Maria Raykova",
      "seoDescription": "Consulta ginecológica en Sofía con la Dra. Maria Raykova — por síntomas, control tras pruebas o una segunda opinión. Visita primaria o de seguimiento.",
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
      "seoTitle": "Colposcopia en Sofía | Dra. Maria Raykova",
      "seoDescription": "Colposcopia en Sofía con la Dra. Maria Raykova. Cuándo se indica tras una citología o un test de VPH, cómo transcurre la visita y cómo reservar.",
      "intro": "La colposcopia es una exploración ampliada del cuello uterino. Se recomienda sobre todo tras una [citología](/uslugi/citonamazka) alterada o un resultado concreto de [test de VPH](/uslugi/hpv-test), para una valoración más precisa. El objetivo es un diagnóstico más temprano — no automáticamente una «mala noticia».",
      "suitableFor": "Indicada ante citologías alteradas, VPH positivo con determinados hallazgos, cambios visibles o cuando el médico recomienda una valoración adicional del cuello. La decisión es individual — habitualmente tras una [revisión ginecológica preventiva](/uslugi/profilaktichen-ginekologichen-pregled) o una consulta sobre resultados.",
      "visitSteps": [
        "Conversación sobre resultados previos y el motivo del estudio.",
        "Exploración colposcópica en un ambiente tranquilo.",
        "Si está indicado — procedimientos adicionales según el hallazgo, incluida biopsia.",
        "Explicación clara del resultado y plan de seguimiento o tratamiento."
      ],
      "notes": [
        "La colposcopia no sustituye el cribado. A menudo sigue a una [citología](/uslugi/citonamazka) o un [test de VPH](/uslugi/hpv-test) y se planifica dentro de la valoración clínica."
      ],
      "guideSections": [
        {
          "heading": "¿Qué es la colposcopia?",
          "paragraphs": [
            "La colposcopia es una exploración precisa del cuello uterino — y a veces de la vagina — con un aparato de aumento (colposcopio). El colposcopio permanece a distancia y aumenta la imagen; no se introduce en profundidad en el cuerpo.",
            "A veces se aplica una solución para ver mejor los cambios. Si hace falta, puede tomarse una biopsia pequeña. El estudio se realiza tras criterio clínico y una conversación sobre las indicaciones."
          ]
        },
        {
          "heading": "¿Cuándo se recomienda?",
          "paragraphs": [
            "La colposcopia no es un cribado rutinario para todas las mujeres. Se indica cuando hay un motivo para valorar el cuello con más detalle."
          ],
          "bullets": [
            "alteraciones en la [citología](/uslugi/citonamazka);",
            "[test de VPH positivo](/uslugi/hpv-test) con determinadas combinaciones de resultados;",
            "seguimiento tras un hallazgo previo;",
            "cambios visibles que requieren una exploración más precisa."
          ]
        },
        {
          "heading": "¿Cómo se realiza?",
          "paragraphs": [
            "La posición es la misma que en una exploración ginecológica. La doctora coloca un espéculo, observa el cuello con el colposcopio y, si hace falta, aplica una solución. Si se toma biopsia, se explica durante la visita.",
            "La exploración en sí suele ser breve. La visita incluye también una conversación sobre los hallazgos y los siguientes pasos."
          ]
        },
        {
          "heading": "¿Cómo prepararse?",
          "paragraphs": [
            "La preparación es similar a la de una exploración ginecológica habitual. Si la doctora ha dado otras indicaciones, sígalas."
          ],
          "bullets": [
            "Lleve resultados previos — citologías, tests de VPH, colposcopias anteriores.",
            "Evite cremas vaginales, tampones y espermicidas 24 horas antes, salvo otra indicación.",
            "Anote sus preguntas: ¿se tomará biopsia y cuándo estará el resultado?",
            "Vea también la [preparación para una exploración ginecológica](/narachnik/podgotovka-za-ginekologichen-pregled)."
          ]
        },
        {
          "heading": "¿Duele la colposcopia?",
          "paragraphs": [
            "La mayoría de mujeres nota una molestia leve, similar a una exploración — presión o un breve estiramiento, no un dolor intenso. Si se toma biopsia, puede haber una molestia o un calambre breve que suele pasar rápido.",
            "Si siente dolor intenso, dígalo de inmediato: la exploración puede adaptarse. Más detalle: [¿Duele la colposcopia?](/narachnik/boli-li-kolposkopiyata)"
          ]
        },
        {
          "heading": "Colposcopia y VPH",
          "paragraphs": [
            "Un [test de VPH](/uslugi/hpv-test) positivo significa presencia del virus, no necesariamente un hallazgo grave. La colposcopia se recomienda ante determinadas combinaciones de VPH, citología e historia clínica — no de forma automática tras cada resultado positivo.",
            "El plan se explica tras revisar sus resultados. Educativo: [¿Qué significa un test de VPH positivo?](/narachnik/pozitiven-hpv-test)"
          ]
        },
        {
          "heading": "Colposcopia tras una citología alterada",
          "paragraphs": [
            "Una [citología](/uslugi/citonamazka) alterada no es un diagnóstico de cáncer. Sigue un plan individual: a veces basta observación o un [test de VPH](/uslugi/hpv-test); otras veces se recomienda colposcopia.",
            "La categoría del resultado, la edad y las pruebas previas determinan el siguiente paso. Detalle: [¿Qué sigue tras una citología anormal?](/narachnik/kakvo-sledva-sled-abnormalna-citonamazka)"
          ]
        },
        {
          "heading": "¿Qué sigue después del estudio?",
          "paragraphs": [
            "La doctora explica lo que ha visto y si hacen falta más pasos. Si se tomó biopsia, el plazo del resultado depende del laboratorio — suele ser de unos días a aproximadamente una semana.",
            "Un ligero manchado de 1–2 días es posible, sobre todo tras biopsia. Siga las indicaciones sobre tampones y relaciones sexuales. El control posterior puede incluir observación, tratamiento u otra [revisión preventiva](/uslugi/profilaktichen-ginekologichen-pregled)."
          ]
        }
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "Qué es la colposcopia y cuándo se hace"
        },
        {
          "href": "/narachnik/boli-li-kolposkopiyata",
          "label": "¿Duele la colposcopia?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "Qué sigue tras una citología anormal"
        },
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "Test de VPH positivo — qué sigue"
        }
      ],
      "faqs": [
        {
          "question": "¿Qué es la colposcopia?",
          "answer": "Una exploración precisa del cuello uterino con un aparato de aumento (colposcopio). El objetivo es ver zonas que requieren una valoración más detallada — no dar un diagnóstico por teléfono."
        },
        {
          "question": "¿Cuándo se recomienda la colposcopia?",
          "answer": "Sobre todo tras una citología alterada, un resultado concreto de VPH, el seguimiento de un hallazgo previo o cuando la doctora ve cambios que quiere examinar con más precisión."
        },
        {
          "question": "¿Duele la colposcopia?",
          "answer": "La mayoría de mujeres nota una molestia leve, similar a una exploración. Si se toma biopsia, puede haber una molestia breve. Comente sus preocupaciones antes del procedimiento."
        },
        {
          "question": "¿Cómo me preparo para la colposcopia?",
          "answer": "Lleve resultados previos. Evite cremas vaginales y tampones 24 horas antes, salvo otra indicación. Anote preguntas sobre biopsia y plazo del resultado."
        },
        {
          "question": "¿Se hace colposcopia tras cada VPH positivo?",
          "answer": "No. Un VPH positivo no implica automáticamente colposcopia. La decisión depende del tipo de resultado, la citología y la historia clínica."
        },
        {
          "question": "¿Tras una citología alterada siempre se hace colposcopia?",
          "answer": "No siempre. A veces basta observación o un test de VPH. Ante cambios más significativos o determinadas combinaciones de resultados, la colposcopia es el siguiente paso."
        },
        {
          "question": "¿Qué sigue después de la colposcopia?",
          "answer": "Una explicación del hallazgo y un plan de observación, tratamiento o control. Si se tomó biopsia, la doctora indicará el plazo esperado del resultado."
        },
        {
          "question": "¿Cuándo estarán los resultados?",
          "answer": "Depende de si se toman muestras. Si hay biopsia, el resultado suele llegar en unos días a aproximadamente una semana. El plazo exacto se confirma en la visita."
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
      "seoTitle": "Citología en Sofía | Dra. Maria Raykova",
      "seoDescription": "Citología (Pap) en Sofía con la Dra. Maria Raykova. Preparación, cómo se toma la muestra y qué sigue si el resultado está alterado. Reserva online.",
      "intro": "La citología es un cribado clave para detectar a tiempo cambios celulares en el cuello uterino. El objetivo es prevención y tranquilidad — con una explicación comprensible en cada paso.",
      "suitableFor": "Indicada como parte de una revisión preventiva, según edad e historial, o cuando el médico recomienda cribado. No sustituye la exploración clínica.",
      "visitSteps": [
        "Breve conversación sobre el ciclo, resultados previos y preparación.",
        "Toma de citología durante la exploración ginecológica.",
        "Explicación de los siguientes pasos y plazos aproximados del resultado.",
        "Si hace falta — orientación hacia test de VPH, colposcopia o control."
      ],
      "notes": [
        "El precio de la citología está publicado en el tarifario. Con NHIF puede haber copago.",
        "Si el resultado está alterado, el siguiente paso puede ser un [test de VPH](/uslugi/hpv-test) o una [colposcopia](/uslugi/kolposkopiya). El cribado suele empezar con una [revisión preventiva](/uslugi/profilaktichen-ginekologichen-pregled)."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/kakvo-pokazva-citonamazkata",
          "label": "¿Qué muestra la citología?"
        },
        {
          "href": "/narachnik/kakvo-sledva-sled-abnormalna-citonamazka",
          "label": "¿Qué sigue tras una citología alterada?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "Test de VPH vs citología"
        }
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
      "seoTitle": "Test de VPH en Sofía | Dra. Maria Raykova",
      "seoDescription": "Test de VPH (virus del papiloma humano) en Sofía con la Dra. Maria Raykova. Qué muestra, cómo se combina con la citología y qué sigue si es positivo.",
      "intro": "El test de VPH busca la presencia del virus del papiloma humano — una causa frecuente de cambios celulares en el cuello. Cuando está indicado, se valora como parte del cribado junto con la citología y la evaluación clínica.",
      "suitableFor": "Indicado cuando el médico recomienda cribado de VPH según edad, historial o resultados. El panel concreto y el laboratorio se aclaran en la visita.",
      "visitSteps": [
        "Conversación sobre edad, pruebas previas y necesidad de cribado de VPH.",
        "Toma de muestra cuando esté indicado — a menudo con exploración o citología.",
        "Explicación de qué mide el test y cuáles son los siguientes pasos.",
        "Si el resultado es positivo o poco claro — plan de control o colposcopia."
      ],
      "notes": [
        "El precio del test de VPH no está fijado en el tarifario público — se confirma en la visita según el panel elegido.",
        "El test de VPH se combina con la [citología](/uslugi/citonamazka). Ante determinados resultados, el siguiente paso puede ser una [colposcopia](/uslugi/kolposkopiya)."
      ],
      "relatedReading": [
        {
          "href": "/narachnik/pozitiven-hpv-test",
          "label": "¿Qué significa un test de VPH positivo?"
        },
        {
          "href": "/narachnik/hpv-test-vs-citonamazka",
          "label": "Test de VPH vs citología"
        },
        {
          "href": "/narachnik/kakvo-e-kolposkopiya",
          "label": "Qué es la colposcopia y cuándo se hace"
        }
      ],
      "faqs": [
        {
          "question": "¿Cuánto cuesta la prueba del VPH?",
          "answer": "El precio de la prueba del VPH no figura en la lista pública de precios de la consulta. Llame al 0894 972 626 y se lo indicarán antes de reservar."
        },
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
      "seoTitle": "Histeroscopia en Sofía — consulta y orientación",
      "seoDescription": "Histeroscopia en Sofía con la Dra. Maria Raykova: consulta y orientación para procedimiento de consulta u operatorio según indicaciones. Reserve cita.",
      "intro": "La histeroscopia es una exploración mínimamente invasiva de la cavidad uterina. En la consulta de Sofía la Dra. Raykova valora y orienta cuando puede estar indicada; tiene formación en histeroscopia de consulta y operatoria. El alcance concreto y el lugar — consulta u hospital — se aclaran tras la exploración.",
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
      "relatedReading": [
        {
          "href": "/narachnik/boli-li-histeroskopiyata",
          "label": "¿Duele la histeroscopia?"
        }
      ],
      "faqs": [
        {
          "question": "¿Cuánto cuesta la histeroscopia?",
          "answer": "El precio de la histeroscopia no figura en la lista pública de precios, ya que depende del tipo de procedimiento. Llame al 0894 972 626 para consultarlo."
        },
        {
          "question": "¿Qué es la histeroscopia?",
          "answer": "Una exploración mínimamente invasiva de la cavidad uterina con una cámara fina. Puede ser diagnóstica (de consulta) u operatoria. El alcance y el lugar se deciden tras la consulta."
        },
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
