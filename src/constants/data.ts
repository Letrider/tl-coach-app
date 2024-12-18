
export const TrueAndFalse_Test = [
  {
    question: "Истинно ли утверждение \"Событие X произойдет в будущем\"?",
    options: [
      { text: "Истинно", isCorrect: false },
      { text: "Ложно", isCorrect: false },
      { text: "Зависит от условий", isCorrect: true }
    ]
  },
  {
    question: "Утверждение \"Всегда будет верно, что X произойдет в будущем\" означает:",
    options: [
      { text: "X произойдет в любом случае", isCorrect: true },
      { text: "X произойдет только в одном будущем моменте времени", isCorrect: false },
      { text: "X никогда не произойдет", isCorrect: false }
    ]
  },
  {
    question: "Утверждение \"Событие X произойдет в некоторый момент времени в будущем\" является:",
    options: [
      { text: "Всегда истинным", isCorrect: false },
      { text: "Всегда ложным", isCorrect: false },
      { text: "Может быть истинным или ложным", isCorrect: true }
    ]
  },
  {
    question: "Если утверждение \"Событие X произойдет в любом будущем моменте времени\", то оно:",
    options: [
      { text: "Всегда истинно", isCorrect: true },
      { text: "Всегда ложно", isCorrect: false },
      { text: "Истинно только в определенных случаях", isCorrect: false }
    ]
  },
  {
    question: "Если утверждение \"Событие X произойдет в будущем\" ложно, то это означает:",
    options: [
      { text: "X никогда не произойдет", isCorrect: true },
      { text: "X уже произошло", isCorrect: false },
      { text: "X произойдет в определенный момент времени в будущем", isCorrect: false }
    ]
  },
  {
    question: "Если утверждение \"Событие X произойдет в некоторый момент времени в прошлом\" истинно, то это означает:",
    options: [
      { text: "X произойдет в определенный момент времени в прошлом", isCorrect: true },
      { text: "X произойдет в любом моменте времени в прошлом", isCorrect: false },
      { text: "X никогда не произойдет", isCorrect: false }
    ]
  }
]

export const TrueAndFalse_Theory = [
  {
    lessonNumber: 1,
    title: "Истинность и ложность",
    objective: "Понять, как меняется истинность высказываний в зависимости от временной точки.",
    content: [
      "Добро пожаловать на урок о временных точках и истинности высказываний! Сейчас мы углубимся в понятие временных точек и их роли в темпоральной логике.",
      "Понятие временных точек:",
      "- Временная точка - это конкретный момент времени, в котором мы анализируем истинность высказывания. В темпоральной логике выделяются три основные временные точки: прошлое, настоящее и будущее.",
      "Истинность высказываний:",
      "- Высказывание может быть истинным или ложным в зависимости от временной точки, в которой оно анализируется. Например, высказывание 'Сегодня будет снег' может быть истинным в будущем, ложным в настоящем и ложным в прошлом."
    ],
    videoId: "BUO1fnTq3XA"
  },
  // Добавьте другие уроки, если есть
]


export const Grammar_Test = [
  {
    question: "Какой термин используется в темпоральной логике для обозначения временных точек или интервалов?",
    options: [
      { text: "Промежутки", isCorrect: false },
      { text: "Временные маркеры", isCorrect: false },
      { text: "События", isCorrect: true }
    ]
  },
  {
    question: "Как называется логическое выражение, которое утверждает, что некоторое утверждение верно в определенный момент времени?",
    options: [
      { text: "Темпоральная формула", isCorrect: true },
      { text: "Временное выражение", isCorrect: false },
      { text: "Событийная логика", isCorrect: false }
    ]
  },
  {
    question: "Как называется выражение в темпоральной логике, которое утверждает, что некоторое событие произойдет в каждом будущем моменте времени?",
    options: [
      { text: "Гарантированное событие", isCorrect: false },
      { text: "Постоянное событие", isCorrect: false },
      { text: "Всегда верное событие", isCorrect: true }
    ]
  },
  {
    question: "Как называется логическая конструкция, описывающая события, которые произошли в прошлом и продолжают быть верными в настоящем?",
    options: [
      { text: "Прошлое условие", isCorrect: false },
      { text: "Постоянное событие", isCorrect: true },
      { text: "Истинное событие", isCorrect: false }
    ]
  },
  {
    question: "Какой термин используется в темпоральной логике для обозначения последовательности событий во времени?",
    options: [
      { text: "Временная последовательность", isCorrect: false },
      { text: "Линейный порядок", isCorrect: false },
      { text: "Хронология", isCorrect: true }
    ]
  },
  {
    question: "Как называется логическая конструкция, описывающая события, которые произошли в прошлом и продолжают быть верными в настоящем?",
    options: [
      { text: "Прошлое условие", isCorrect: false },
      { text: "Постоянное событие", isCorrect: true },
      { text: "Истинное событие", isCorrect: false }
    ]
  }
]

export const Grammar_Theory = [
  {
    lessonNumber: 1,
    title: "Грамматика в контексте темпоральной логики",
    objective: "Ознакомиться с концепцией грамматики в контексте темпоральной логики.",
    content: [

      "Грамматика представляет собой формальную систему для описания синтаксиса языка.",
      "В контексте темпоральной логики, грамматика используется для формализации структуры и синтаксиса выражений о времени.",
      "Принципы грамматики в темпоральной логике:",
      "1. Формализация времени: Темпоральная логика позволяет формализовать понятия времени и временных отношений.",
      "2. Структурирование выражений: Грамматика позволяет структурировать и формализовать выражения о времени.",
      "3. Семантика операторов: Каждый оператор темпоральной логики имеет свою семантику, определяющую его значение и условия применения.",
      "4. Анализ выражений: Мы можем анализировать синтаксическую структуру и семантику выражений темпоральной логики.",
      `Грамматика представляет собой формальную систему для описания синтаксиса языка. В контексте темпоральной логики, грамматика используется для формализации структуры и синтаксиса выражений о времени.
        Принципы:
        Формализация времени: Темпоральная логика позволяет формализовать понятия времени и временных отношений, что позволяет анализировать и моделировать поведение систем во времени.
        Структурирование выражений: Грамматика позволяет структурировать и формализовать выражения о времени, определяя правила для их построения и разбора.
        Семантика операторов: Каждый оператор темпоральной логики имеет свою семантику, которая определяет его значение и условия его применения в выражениях о времени.
        Анализ выражений: С помощью грамматики и правил вывода мы можем анализировать синтаксическую структуру и семантику выражений темпоральной логики, что позволяет проверять их корректность и устанавливать их значение.
        Основные понятия:
        Временные точки или интервалы: В темпоральной логике для обозначения моментов времени или временных промежутков используется термин "события". Он представляет собой абстракцию временных моментов, в которых происходят или могут произойти определенные события.
        Логические выражения о времени: Для выражения утверждений о времени в темпоральной логике используются "темпоральные формулы". Это логические выражения, которые утверждают, что некоторое утверждение верно в определенный момент времени.
        Условия, верные в каждом будущем моменте времени: Для описания событий, которые происходят в каждом будущем моменте времени, используется термин "всегда верное событие". Это логическое выражение, которое утверждает, что некоторое событие происходит в каждом возможном будущем.
        События, происходящие в прошлом и продолжающиеся в настоящем: Для описания событий, которые произошли в прошлом и продолжают быть верными в настоящем, используется термин "постоянное событие". Это логическая конструкция, которая утверждает, что некоторое событие произошло в прошлом и остается верным в настоящем.
        Последовательность событий во времени: Для обозначения последовательности событий во времени используется термин "временная последовательность". Это понятие описывает порядок событий и их связи друг с другом во времени.
        `


    ]
  }
]


export const TemporalOperators_Test = [
  {
    question: "Какой оператор в темпоральной логике утверждает, что событие произойдет в следующем моменте времени?",
    options: [
      { text: "F", isCorrect: true },
      { text: "U", isCorrect: false },
      { text: "G", isCorrect: false }
    ]
  },
  {
    question: "Какой оператор в темпоральной логике утверждает, что событие произойдет в каждом будущем моменте времени, начиная с некоторого?",
    options: [
      { text: "F", isCorrect: false },
      { text: "A", isCorrect: false },
      { text: "G", isCorrect: true }
    ]
  },
  {
    question: "Какие существуют бинарные операторы в темпоральной логике?",
    options: [
      { text: "F, U", isCorrect: false },
      { text: "R, U", isCorrect: true },
      { text: "R, E", isCorrect: false }
    ]
  },
  {
    question: "О каком операторе идет речь? «Выражение должно быть истинным в состоянии, непосредственно следующим за данным»",
    options: [
      { text: "A", isCorrect: false },
      { text: "N", isCorrect: true },
      { text: "R", isCorrect: false }
    ]
  },
  {
    question: "Какие существуют унарные операторы в темпоральной логике?",
    options: [
      { text: "N, F, G, A, E", isCorrect: true },
      { text: "A, E, U, G", isCorrect: false },
      { text: "U, R", isCorrect: false }
    ]
  },
  {
    question: "Что обозначает оператор U?",
    options: [
      { text: "Union", isCorrect: false },
      { text: "Use", isCorrect: false },
      { text: "Until", isCorrect: true }
    ]
  }
]

export const TemporalOperators_Theory = [
  {
    lessonNumber: 1,
    title: "Операторы в темпоральной логике",
    objective: "Понять суть операторов в темпоральной логике и их роль в анализе временных свойств систем.",
    content: [
      "Темпоральные логики содержат два вида операторов: логические и модальные.",
      "Логические операторы обычно используются для работы с высказываниями (например, ¬ - отрицание, ∨ - дизъюнкция, ∧ - конъюнкция, → - импликация).",
      "Модальные операторы в темпоральной логике определяются специальным образом и представляют собой инструменты для работы с временными свойствами системы.",
      "В логике линейного времени и логике деревьев вычислений используются различные модальные операторы, такие как:",
      "- F (Future) - утверждает, что некоторое выражение станет истинным в следующем моменте времени.",
      "- G (Globally) - утверждает, что некоторое выражение будет верным в каждом моменте времени в будущем.",
      "- U (Until) - утверждает, что некоторое выражение будет верным до тех пор, пока не станет верным другое заданное выражение.",
      "- X (Next) - утверждает, что некоторое выражение будет верным в следующем моменте времени.",
      "- R (Release) - утверждает, что некоторое выражение будет верным в текущем моменте времени или в любом моменте в будущем, если верно другое заданное выражение.",
      "Понимание и использование этих операторов позволяет анализировать и формализовать временные свойства систем и программ.",
    ],
    videoId: "BUO1fnTq3XA"
  }
]

export const Formalization_Test = [
  {
    question: "Формализуйте выражение: «Любое сообщение будет получено».",
    options: [
      { text: "G[ Послано(m) → F Получено(m) ]", isCorrect: true },
      { text: "G[ Послано(m) → Получено(m) ]", isCorrect: false },
      { text: "F[ Послано(m) → G Получено(m) ]", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: «После каждого дождя наступает солнце».",
    options: [
      { text: "Солнце = Дождь U X(Дождь)", isCorrect: true },
      { text: "Солнце = G(Дождь)", isCorrect: false },
      { text: "Солнце = X(Дождь)", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: «Еще вчера «сегодня» было «завтра»».",
    options: [
      { text: "y = X-1(Xy)", isCorrect: true },
      { text: "y = Gy(Xy)", isCorrect: false },
      { text: "y = Xy", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: 'В течение последнего часа наступило утро'.",
    options: [
      { text: "Утро = X-1(Час)", isCorrect: true },
      { text: "Утро = G(Час)", isCorrect: false },
      { text: "Утро = X(Час)", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: «Если она сказала, что придет завтра, значит, она придет сегодня».",
    options: [
      { text: "X-1(X Прихожу) = Прихожу", isCorrect: true },
      { text: "G Прихожу → F Прихожу", isCorrect: false },
      { text: "Прихожу =  X (X-1 Прихожу)", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: «На протяжении всего утра была температура ниже нуля градусов».",
    options: [
      { text: "Температура = Утро U G(Ноль градусов)", isCorrect: false },
      { text: "Температура = G(Утро)", isCorrect: false },
      { text: "Температура = Утро U X(Ноль градусов)", isCorrect: true }
    ]
  }
]

export const LinearTemporalLogic_Theory = [
  {
    lessonNumber: 1,
    title: "Линейная темпоральная логика",
    objective: "Понять основные принципы и операторы линейной темпоральной логики и их роль в анализе временных свойств систем.",
    content: [
      "Линейная темпоральная логика расширяет обычную логику высказываний для рассуждений о бесконечной последовательности 'миров', где каждый 'мир' представляет собой определенный момент времени.",
      "В линейной темпоральной логике используются специальные операторы для работы с временными свойствами системы:",
      "- F (Future) - утверждает, что некоторое выражение станет истинным в следующем моменте времени.",
      "- G (Globally) - утверждает, что некоторое выражение будет верным в каждом моменте времени в будущем.",
      "- U (Until) - утверждает, что некоторое выражение будет верным до тех пор, пока не станет верным другое заданное выражение.",
      "- X (Next) - утверждает, что некоторое выражение будет верным в следующем моменте времени.",
      "- R (Release) - утверждает, что некоторое выражение будет верным в текущем моменте времени или в любом моменте в будущем, если верно другое заданное выражение.",
      "Формулы GFp и FGp используются для работы с бесконечной последовательностью 'миров' и утверждают, что некоторое выражение будет истинным в каждом будущем моменте времени или будет истинным в будущем и останется истинным навсегда соответственно.",
      "Понимание и использование этих операторов позволяет анализировать временные свойства систем и программ в контексте бесконечной последовательности времени.",
      "Дополнительные материалы и примеры представлены в видео по ссылке: [Линейная темпоральная логика](https://youtu.be/6xEjYU7eadc?si=E7rN3mS33Et2RIqr)",
    ],
    videoId: '6xEjYU7eadc'
  }
]

export const LinearTemporalLogic_Test = [
  {
    question: "Формализуйте выражение: «Пока живу – надеюсь».",
    options: [
      { text: "G(я_живу→я_надеюсь)", isCorrect: true },
      { text: "G(я_надеюсь→я_живу)", isCorrect: false },
      { text: "U(я_живу→я_надеюсь)", isCorrect: false }
    ]
  },
  {
    question: "Продолжите высказывание: «Язык формальной логики имеет синтаксис (правила построения формул) и …».",
    options: [
      { text: "семантику (правила, определяющие истинностное значение формул)", isCorrect: true },
      { text: "семантику (правила, определяющие логику формул)", isCorrect: false },
      { text: "семантику (правила, определяющие формализацию формул)", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте выражение: «Мы придем к победе коммунистического труда».",
    options: [
      { text: "F коммунистический_труд_победил", isCorrect: true },
      { text: "G коммунистический_труд_победил", isCorrect: false },
      { text: "F (мы_придем→победа_коммунистического_труда)", isCorrect: false }
    ]
  },
  {
    question: "Выберите верное утверждение:",
    options: [
      { text: "Формула LTL это атомарное утверждение, или формулы, связанные с ¬, ∨, или формулы, связанные с U, X", isCorrect: true },
      { text: "Формула LTL это атомарное утверждение, или формулы, связанные с ¬, ∧, или формулы, связанные с U, X", isCorrect: false },
      { text: "Формула LTL это атомарное утверждение, или формулы, связанные с ¬, ∨, или формулы, связанные с U, R", isCorrect: false }
    ]
  },
  {
    question: "Формализуйте фразу Бахнова: «Сегодня он играет джаз, а завтра Родину продаст».",
    options: [
      { text: "G(он_играет_джаз→FXон_продает_Родину)", isCorrect: true },
      { text: "G(он_играет_джаз→Fон_продает_Родину)", isCorrect: false },
      { text: "G(он_играет_джаз→Xон_продает_Родину)", isCorrect: false }
    ]
  },
  {
    question: "Допустим, p=«я люблю Машу», q=«я люблю Сашу». Тогда FGq=?",
    options: [
      { text: "«когда-нибудь в будущем я полюблю Сашу навечно»", isCorrect: true },
      { text: "«когда-нибудь в будущем я полюблю Машу навечно»", isCorrect: false },
      { text: "«когда-нибудь в будущем я полюблю Сашу»", isCorrect: false }
    ]
  }
]

export const TemporalDualityIdentities_Theory = [
  {
    lessonNumber: 1,
    title: "Тождества двойственности в темпоральной логике",
    objective: "Изучить основные тождества двойственности в темпоральной логике.",
    content: [
      "Подобно правилам де Моргана существуют свойства двойственности для темпоральных операторов:",
      "1. pUq = ¬(¬pV¬q)",
      "2. ¬Fq = G¬q",
      "3. ¬Ap = E¬p",
      "Тождества двойственности представляют собой набор соотношений между логическими операторами, играющих важную роль в анализе и преобразовании временных выражений. Эти тождества помогают упростить и анализировать сложные выражения, представляющие временные отношения между событиями."
    ]
  }
]

export const TemporalDualityIdentities_Test = [
  {
    question: "pUq=?",
    options: [
      { text: "¬(¬pV¬q)", isCorrect: true },
      { text: "¬(¬pR¬q)", isCorrect: false },
      { text: "(¬pV¬q)", isCorrect: false }
    ]
  },
  {
    question: "¬Fq=?",
    options: [
      { text: "G¬q", isCorrect: true },
      { text: "¬Vq", isCorrect: false },
      { text: "V¬q", isCorrect: false }
    ]
  },
  {
    question: "¬Ap=?",
    options: [
      { text: "U¬p", isCorrect: false },
      { text: "¬Rp", isCorrect: false },
      { text: "E¬p", isCorrect: true }
    ]
  },
  {
    question: "¬(¬xV¬y)=?",
    options: [
      { text: "xUy", isCorrect: true },
      { text: "¬(xUy)", isCorrect: false },
      { text: "¬(xVy)", isCorrect: false }
    ]
  },
  {
    question: "E¬p=?",
    options: [
      { text: "¬Ap", isCorrect: true },
      { text: "¬Ep", isCorrect: false },
      { text: "¬Up", isCorrect: false }
    ]
  },
  {
    question: "G¬q=?",
    options: [
      { text: "¬Eq", isCorrect: false },
      { text: "¬Fq", isCorrect: true },
      { text: "¬(¬Fq)", isCorrect: false }
    ]
  }
]


export const topics = [
  {
    id: 1,
    title: "Истинность и ложность",
    description: "Понимание того, как меняется истинность высказываний в зависимости от временной точки.",
    tests: TrueAndFalse_Test,
    theory: TrueAndFalse_Theory
  },
  {
    id: 2,
    title: "Грамматика в контексте темпоральной логики",
    description: "Ознакомление с концепцией грамматики в контексте темпоральной логики.",
    tests: Grammar_Test,
    theory: Grammar_Theory
  },
  {
    id: 3,
    title: "Операторы в темпоральной логике",
    description: "Понимание сути операторов в темпоральной логике и их роль в анализе временных свойств систем.",
    tests: TemporalOperators_Test,
    theory: TemporalOperators_Theory
  },
  {
    id: 4,
    title: "Линейная темпоральная логика",
    description: "Основные принципы и операторы линейной темпоральной логики.",
    tests: LinearTemporalLogic_Test,
    theory: LinearTemporalLogic_Theory
  },
  {
    id: 5,
    title: "Тождества двойственности",
    description: "Нет информации..",
    tests: LinearTemporalLogic_Test,
    theory: LinearTemporalLogic_Theory
  },
  {
    id: 6,
    title: "Формализация",
    description: "Нет информации..",
    tests: Formalization_Test,
    theory: TrueAndFalse_Theory
  }
]


export default topics