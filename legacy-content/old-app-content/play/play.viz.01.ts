import { L, S, type PlayVisualizationDef } from "./play.types";

export const PLAY_VIZ_01: PlayVisualizationDef[] = [
  {
    slug: "number-parade",
    chapterCode: "play.01",
    title: L("Number parade 1–10", "সংখ্যার মিছিল ১–১০"),
    summary: L(
      "Numbers 1 to 10 march in, one by one, and say their names.",
      "১ থেকে ১০ পর্যন্ত সংখ্যাগুলো একে একে এসে নিজের নাম বলে।",
    ),
    renderer: "number-grid",
    engine: "numberGrid",
    kind: "STEPPER",
    tags: ["numbers", "counting", "1-10"],
    concepts: ["number recognition", "counting to 10"],
    difficulty: 1,
    data: { max: 10, mode: "parade" },
    steps: [
      S(
        "Here come 1, 2 and 3. Tap each number to hear it.",
        "এই যে ১, ২ আর ৩। প্রতিটিতে চাপ দিয়ে শুনো।",
        { highlight: [1, 2, 3] },
      ),
      S(
        "Next come 4, 5, 6 and 7.",
        "এরপর আসে ৪, ৫, ৬ আর ৭।",
        { highlight: [4, 5, 6, 7] },
      ),
      S(
        "Finally 8, 9 and 10. You counted all the way to ten!",
        "শেষে ৮, ৯ আর ১০। তুমি দশ পর্যন্ত গুনলে!",
        { highlight: [8, 9, 10] },
      ),
    ],
    aiContext:
      "Play chapter 1: recognising numbers 1–10 by seeing and hearing them in order.",
  },
  {
    slug: "finger-count-1-10",
    chapterCode: "play.01",
    title: L("Count on your fingers", "আঙুলে গুনি"),
    summary: L(
      "Each finger lights up as the number is said.",
      "সংখ্যা বলার সঙ্গে সঙ্গে প্রতিটি আঙুল জ্বলে ওঠে।",
    ),
    renderer: "finger-hands",
    engine: "fingerHands",
    kind: "STEPPER",
    tags: ["numbers", "counting", "fingers"],
    concepts: ["one-to-one counting", "numbers 1–10"],
    difficulty: 1,
    data: { mode: "count", label: L("fingers", "আঙুল") },
    steps: [
      S("One finger up. Say one.", "একটি আঙুল ওপরে। বলো এক।", {
        left: 1,
        right: 0,
      }),
      S("Two fingers up. Say two.", "দুটি আঙুল ওপরে। বলো দুই।", {
        left: 2,
        right: 0,
      }),
      S("Three fingers up. Say three.", "তিনটি আঙুল ওপরে। বলো তিন।", {
        left: 3,
        right: 0,
      }),
      S("One full hand makes five.", "এক হাত ভরে গেলে হয় পাঁচ।", {
        left: 5,
        right: 0,
      }),
      S("Two full hands make ten!", "দুই হাত ভরে গেলে হয় দশ!", {
        left: 5,
        right: 5,
      }),
    ],
    aiContext:
      "Play chapter 1: using fingers as a concrete model for numbers 1–10.",
  },
  {
    slug: "count-animals",
    chapterCode: "play.01",
    title: L("Count the animals", "পশু গুনি"),
    summary: L(
      "Tap each animal and count aloud. The last number tells how many.",
      "প্রতিটি পশুতে চাপ দিয়ে জোরে গুনো। শেষ সংখ্যাটিই বলে কতগুলো।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["numbers", "counting", "animals"],
    concepts: ["counting objects", "cardinality"],
    difficulty: 1,
    data: {
      emoji: "🐤",
      items: 5,
      mode: "count",
      label: L("counted", "গোনা হয়েছে"),
    },
    steps: [
      S("Tap the first two chicks. One, two.", "প্রথম দুটি বাচ্চায় চাপ দাও। এক, দুই।", {
        count: 2,
      }),
      S("Now count three and four.", "এবার তিন আর চার গুনো।", { count: 4 }),
      S(
        "The last chick makes five. The last number is how many!",
        "শেষ বাচ্চাটি নিয়ে পাঁচ। শেষ সংখ্যাটিই মোট সংখ্যা!",
        { count: 5 },
      ),
    ],
    aiContext:
      "Play chapter 1: one-to-one counting of objects and the cardinality idea.",
  },
  {
    slug: "number-trace",
    chapterCode: "play.01",
    title: L("Trace the digits", "অঙ্ক ট্রেস করি"),
    summary: L(
      "Follow the glowing path to draw the digits 1, 2 and 3.",
      "জ্বলজ্বলে পথ অনুসরণ করে ১, ২ আর ৩ আঁকো।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["numbers", "writing", "digits"],
    concepts: ["digit formation", "fine motor"],
    difficulty: 1,
    data: { mode: "digit", digit: "1" },
    steps: [
      S("Start at the top and draw straight down. That is 1.", "ওপর থেকে নিচে সোজা টানো। এটাই ১।", {
        digit: "1",
        success: L("Nice 1!", "দারুণ ১!"),
      }),
      S("Curve around and slide across. That is 2.", "বাঁক নিয়ে ডানদিকে টানো। এটাই ২।", {
        digit: "2",
        success: L("Nice 2!", "দারুণ ২!"),
      }),
      S("Two little curves make 3.", "দুটি ছোট বাঁক মিলে হয় ৩।", {
        digit: "3",
        success: L("Nice 3!", "দারুণ ৩!"),
      }),
    ],
    aiContext:
      "Play chapter 1: tracing digits 1–3 to build early number-writing skills.",
  },
  {
    slug: "number-song-grid",
    chapterCode: "play.01",
    title: L("Number song to 100", "১০০ পর্যন্ত সংখ্যার গান"),
    summary: L(
      "A 1–100 grid fills in as the song counts by tens.",
      "গানে দশে দশে গুনতে গুনতে ১–১০০ গ্রিড ভরে ওঠে।",
    ),
    renderer: "number-grid",
    engine: "numberGrid",
    kind: "STEPPER",
    tags: ["numbers", "1-100", "skip counting"],
    concepts: ["counting by tens", "hundred chart"],
    difficulty: 2,
    data: { max: 100, mode: "song" },
    steps: [
      S("Ten, twenty, thirty. The last column lights up.", "দশ, বিশ, ত্রিশ। শেষ কলামটি জ্বলে ওঠে।", {
        highlight: [10, 20, 30],
      }),
      S("Forty, fifty, sixty. Keep the beat!", "চল্লিশ, পঞ্চাশ, ষাট। তাল ধরে রাখো!", {
        highlight: [40, 50, 60],
      }),
      S("Seventy, eighty, ninety, one hundred!", "সত্তর, আশি, নব্বই, একশ!", {
        highlight: [70, 80, 90, 100],
      }),
    ],
    aiContext:
      "Play chapter 1: the hundred chart and counting by tens up to 100.",
  },
  {
    slug: "find-the-number",
    chapterCode: "play.01",
    title: L("Find the number", "সংখ্যাটি খুঁজি"),
    summary: L(
      "Tap the number the companion asks for. Wrong taps wobble.",
      "সঙ্গী যে সংখ্যাটি বলে, সেটিতে চাপ দাও। ভুল হলে কেঁপে ওঠে।",
    ),
    renderer: "number-grid",
    engine: "numberGrid",
    kind: "STEPPER",
    tags: ["numbers", "number recognition", "game"],
    concepts: ["number recognition", "1–10"],
    difficulty: 1,
    data: { max: 10, mode: "find" },
    steps: [
      S("Can you find 7?", "৭ খুঁজে বের করো?", {
        target: 7,
        prompt: L("Find 7", "৭ খুঁজে বের করো"),
      }),
      S("Now find 3.", "এবার ৩ খুঁজে বের করো।", {
        target: 3,
        prompt: L("Find 3", "৩ খুঁজে বের করো"),
      }),
      S("One more: find 9.", "আরেকটি: ৯ খুঁজে বের করো।", {
        target: 9,
        prompt: L("Find 9", "৯ খুঁজে বের করো"),
      }),
    ],
    aiContext:
      "Play chapter 1: finding numerals in a grid to strengthen number recognition.",
  },
  {
    slug: "missing-number",
    chapterCode: "play.01",
    title: L("Missing stepping stone", "হারানো পাথর"),
    summary: L(
      "One stone on the number path is missing. Which number belongs there?",
      "সংখ্যার পথে একটি পাথর হারিয়ে গেছে। সেখানে কোন সংখ্যা হবে?",
    ),
    renderer: "number-line",
    engine: "numberLine",
    kind: "STEPPER",
    tags: ["numbers", "number line", "missing number"],
    concepts: ["number order", "before and after"],
    difficulty: 1,
    data: {
      min: 0,
      max: 10,
      mode: "missing",
      stones: [0, 1, 2, null, 4, 5, 6, 7, 8, 9, 10],
      answer: 3,
    },
    steps: [
      S("The stone after 2 is missing. Tap it to see.", "২-এর পরের পাথরটি নেই। দেখতে চাপ দাও।", {
        answer: 3,
        prompt: L("Which number comes after 2?", "২-এর পরে কোন সংখ্যা আসে?"),
      }),
      S("Now the stone after 5 is missing.", "এবার ৫-এর পরের পাথরটি নেই।", {
        stones: [0, 1, 2, 3, 4, 5, null, 7, 8, 9, 10],
        answer: 6,
        prompt: L("Which number comes after 5?", "৫-এর পরে কোন সংখ্যা আসে?"),
      }),
      S("And the stone before 9 is missing.", "আর ৯-এর আগের পাথরটি নেই।", {
        stones: [0, 1, 2, 3, 4, 5, 6, 7, null, 9, 10],
        answer: 8,
        prompt: L("Which number comes before 9?", "৯-এর আগে কোন সংখ্যা আসে?"),
      }),
    ],
    aiContext:
      "Play chapter 1: missing numbers on a 0–10 number line, using before/after language.",
  },
  {
    slug: "number-vs-quantity",
    chapterCode: "play.01",
    title: L("Numeral and quantity", "সংখ্যা আর পরিমাণ"),
    summary: L(
      "Match the numeral card to the right group of objects.",
      "সংখ্যার কার্ডটি সঠিক পরিমাণের দলের সঙ্গে মিলাও।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["numbers", "quantity", "matching"],
    concepts: ["numeral-quantity match", "counting"],
    difficulty: 1,
    data: {
      emoji: "🍎",
      items: 3,
      numeral: 3,
      mode: "match",
      success: L("Match! 3 apples.", "মিলে গেছে! ৩টি আপেল।"),
    },
    steps: [
      S("The card says 3. Tap three apples.", "কার্ডে লেখা ৩। তিনটি আপেলে চাপ দাও।", {
        items: 3,
        numeral: 3,
        caption: L("Tap 3 apples.", "৩টি আপেলে চাপ দাও।"),
      }),
      S("The card says 4. Tap four apples.", "কার্ডে লেখা ৪। চারটি আপেলে চাপ দাও।", {
        items: 4,
        numeral: 4,
        caption: L("Tap 4 apples.", "৪টি আপেলে চাপ দাও।"),
      }),
      S("The card says 5. Tap five apples.", "কার্ডে লেখা ৫। পাঁচটি আপেলে চাপ দাও।", {
        items: 5,
        numeral: 5,
        caption: L("Tap 5 apples.", "৫টি আপেলে চাপ দাও।"),
      }),
    ],
    aiContext:
      "Play chapter 1: connecting a written numeral with the matching quantity of objects.",
  },
];
