import { L, S, type PlayVisualizationDef } from "./play.types";

export const PLAY_VIZ_03: PlayVisualizationDef[] = [
  {
    slug: "big-small-pairs",
    chapterCode: "play.03",
    title: L("Big and small", "বড় আর ছোট"),
    summary: L(
      "Two objects stand side by side. Which one is bigger?",
      "দুটি বস্তু পাশাপাশি। কোনটি বড়?",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["compare", "big", "small"],
    concepts: ["size comparison", "bigger and smaller"],
    difficulty: 1,
    data: {
      mode: "compare-size",
      groups: [
        { emoji: "🐘", label: L("big", "বড়"), size: 1.8 },
        { emoji: "🐭", label: L("small", "ছোট"), size: 0.7 },
      ],
      caption: L("The elephant is big. The mouse is small.", "হাতি বড়। ইঁদুর ছোট।"),
    },
    steps: [
      S("Look at the elephant. It is big.", "হাতিটির দিকে তাকাও। এটি বড়।", {
        caption: L("The elephant is big.", "হাতিটি বড়।"),
      }),
      S("Look at the mouse. It is small.", "ইঁদুরটির দিকে তাকাও। এটি ছোট।", {
        caption: L("The mouse is small.", "ইঁদুরটি ছোট।"),
      }),
      S("Big and small are opposites.", "বড় আর ছোট পরস্পরের বিপরীত।", {
        caption: L("Big and small are opposites.", "বড় আর ছোট পরস্পরের বিপরীত।"),
      }),
    ],
    aiContext:
      "Play chapter 3: comparing two objects by size and using the words big and small.",
  },
  {
    slug: "long-short-line",
    chapterCode: "play.03",
    title: L("Long and short ropes", "লম্বা আর ছোট দড়ি"),
    summary: L(
      "Line up two ropes at the same start to compare their length.",
      "দুটি দড়ি একই শুরুতে রাখলে লম্বা-ছোট বোঝা যায়।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["compare", "long", "short", "length"],
    concepts: ["length comparison", "aligning starts"],
    difficulty: 1,
    data: {
      mode: "compare-length",
      lengths: [9, 4],
      labels: [L("red rope", "লাল দড়ি"), L("blue rope", "নীল দড়ি")],
      caption: L("Line up the starts to compare fairly.", "ন্যায্যভাবে তুলনা করতে শুরুগুলো একসঙ্গে রাখো।"),
    },
    steps: [
      S("Line up the starts of both ropes.", "দুই দড়ির শুরু একসঙ্গে রাখো।", {
        caption: L("The starts are aligned now.", "এখন শুরুগুলো একসঙ্গে।"),
      }),
      S("The red rope reaches farther. It is longer.", "লাল দড়িটি বেশি দূর পর্যন্ত গেছে। এটি লম্বা।", {
        caption: L("The red rope is longer.", "লাল দড়িটি লম্বা।"),
      }),
      S("The blue rope stops sooner. It is shorter.", "নীল দড়িটি আগেই থেমে গেছে। এটি ছোট।", {
        caption: L("The blue rope is shorter.", "নীল দড়িটি ছোট।"),
      }),
    ],
    aiContext:
      "Play chapter 3: comparing lengths by aligning the starting points, addressing the common misconception of comparing unaligned objects.",
  },
  {
    slug: "tall-short-giraffe",
    chapterCode: "play.03",
    title: L("Tall and short giraffes", "লম্বা আর খাটো জিরাফ"),
    summary: L(
      "Put the giraffes in order from tallest to shortest.",
      "জিরাফগুলোকে লম্বা থেকে খাটো ক্রমে সাজাও।",
    ),
    renderer: "story-scene",
    engine: "storyScene",
    kind: "SCENE",
    tags: ["compare", "tall", "short", "order"],
    concepts: ["height comparison", "ordering by size"],
    difficulty: 1,
    data: {
      scene: "tall-giraffe",
      heights: [1.2, 2, 2.8],
      ordered: false,
      caption: L("Which giraffe is tallest?", "কোন জিরাফটি সবচেয়ে লম্বা?"),
    },
    steps: [
      S("Two giraffes. The taller one reaches higher.", "দুটি জিরাফ। লম্বাটি বেশি উঁচুতে পৌঁছায়।", {
        heights: [1.2, 2.8],
        ordered: false,
      }),
      S("Three giraffes. Compare their heads.", "তিনটি জিরাফ। তাদের মাথাগুলো তুলনা করো।", {
        heights: [1.2, 2, 2.8],
        ordered: false,
      }),
      S("Now they are ordered: short, taller, tallest.", "এখন তারা সাজানো: খাটো, লম্বা, সবচেয়ে লম্বা।", {
        heights: [1.2, 2, 2.8],
        ordered: true,
        caption: L("Short, taller, tallest.", "খাটো, লম্বা, সবচেয়ে লম্বা।"),
      }),
    ],
    aiContext:
      "Play chapter 3: ordering animals by height and using tall, taller, tallest.",
  },
  {
    slug: "more-less-sets",
    chapterCode: "play.03",
    title: L("More, less or equal", "বেশি, কম বা সমান"),
    summary: L(
      "Pair objects one-to-one to see which group has more.",
      "একটির সঙ্গে একটি মিলিয়ে দেখো কোন দলে বেশি আছে।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["compare", "more", "less", "equal"],
    concepts: ["comparing quantities", "one-to-one matching"],
    difficulty: 1,
    data: {
      mode: "compare",
      groups: [
        { emoji: "🍓", count: 5 },
        { emoji: "🍇", count: 3 },
      ],
      pair: true,
      caption: L("Pair one strawberry with one grape.", "একটি স্ট্রবেরির সঙ্গে একটি আঙুর মিলাও।"),
    },
    steps: [
      S("5 strawberries and 3 grapes. Strawberries are more.", "৫টি স্ট্রবেরি আর ৩টি আঙুর। স্ট্রবেরি বেশি।", {
        groups: [
          { emoji: "🍓", count: 5 },
          { emoji: "🍇", count: 3 },
        ],
        caption: L("5 is more than 3.", "৫, ৩-এর চেয়ে বেশি।"),
      }),
      S("4 strawberries and 4 grapes. They are equal.", "৪টি স্ট্রবেরি আর ৪টি আঙুর। দুটোই সমান।", {
        groups: [
          { emoji: "🍓", count: 4 },
          { emoji: "🍇", count: 4 },
        ],
        caption: L("4 and 4 are equal.", "৪ আর ৪ সমান।"),
      }),
      S("2 strawberries and 6 grapes. Grapes are more.", "২টি স্ট্রবেরি আর ৬টি আঙুর। আঙুর বেশি।", {
        groups: [
          { emoji: "🍓", count: 2 },
          { emoji: "🍇", count: 6 },
        ],
        caption: L("6 is more than 2.", "৬, ২-এর চেয়ে বেশি।"),
      }),
    ],
    aiContext:
      "Play chapter 3: comparing two sets by one-to-one matching and using more, less, equal.",
  },
  {
    slug: "heavy-light-seesaw",
    chapterCode: "play.03",
    title: L("Heavy and light seesaw", "ভারী-হালকা দোলনা"),
    summary: L(
      "A seesaw tilts toward the heavier object.",
      "দোলনা ভারী বস্তুর দিকে ঝুঁকে যায়।",
    ),
    renderer: "balance-scale",
    engine: "balanceScale",
    kind: "ANIMATED",
    tags: ["compare", "heavy", "light", "weight"],
    concepts: ["weight comparison", "heavy and light"],
    difficulty: 1,
    data: {
      left: { emoji: "🐘", weight: 10 },
      right: { emoji: "🐭", weight: 2 },
      caption: L("The elephant is heavier, so its side goes down.", "হাতি ভারী, তাই তার দিক নিচে নামে।"),
    },
    steps: [
      S("The elephant is heavy. The mouse is light.", "হাতি ভারী। ইঁদুর হালকা।", {
        left: { emoji: "🐘", weight: 10 },
        right: { emoji: "🐭", weight: 2 },
        caption: L("The elephant is heavier.", "হাতিটি ভারী।"),
      }),
      S("The seesaw goes down on the heavy side.", "দোলনা ভারী দিকে নিচে যায়।", {
        left: { emoji: "🐘", weight: 10 },
        right: { emoji: "🐭", weight: 2 },
        caption: L("Down goes the heavy side.", "ভারী দিকটি নিচে নামে।"),
      }),
      S("When both sides are equal, the seesaw is level.", "দুই দিক সমান হলে দোলনা সমান থাকে।", {
        left: { emoji: "🐕", weight: 5 },
        right: { emoji: "🐈", weight: 5 },
        caption: L("Equal weight: the seesaw is level.", "সমান ওজন: দোলনা সমান।"),
      }),
    ],
    aiContext:
      "Play chapter 3: comparing weight with a seesaw and the words heavy, light, equal.",
  },
  {
    slug: "order-by-size",
    chapterCode: "play.03",
    title: L("Order by size", "আকার অনুযায়ী সাজাই"),
    summary: L(
      "Stack the rings from smallest to biggest.",
      "রিংগুলোকে ছোট থেকে বড় ক্রমে সাজাও।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["compare", "size", "order"],
    concepts: ["ordering by size", "smallest and biggest"],
    difficulty: 2,
    data: {
      mode: "order-size",
      sizes: [35, 60, 90],
      emojis: ["🟢", "🔵", "🟣"],
      caption: L("Find the smallest ring first.", "প্রথমে সবচেয়ে ছোট রিংটি খুঁজো।"),
    },
    steps: [
      S("Here are three rings of different sizes.", "এখানে তিনটি ভিন্ন আকারের রিং।", {
        caption: L("Three rings, three sizes.", "তিনটি রিং, তিনটি আকার।"),
      }),
      S("The green ring is the smallest.", "সবুজ রিংটি সবচেয়ে ছোট।", {
        caption: L("The green ring is smallest.", "সবুজ রিংটি সবচেয়ে ছোট।"),
      }),
      S("Smallest, middle, biggest. Now they are in order.", "ছোট, মাঝারি, বড়। এখন তারা ক্রমে আছে।", {
        caption: L("Smallest, middle, biggest.", "ছোট, মাঝারি, বড়।"),
      }),
    ],
    aiContext:
      "Play chapter 3: ordering three objects by size from smallest to biggest.",
  },
];
