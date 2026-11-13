import { L, S, type PlayVisualizationDef } from "./play.types";

export const PLAY_VIZ_05: PlayVisualizationDef[] = [
  {
    slug: "day-routine",
    chapterCode: "play.05",
    title: L("My day", "আমার দিন"),
    summary: L(
      "Morning, noon, evening and night, with matching activities.",
      "সকাল, দুপুর, সন্ধ্যা আর রাত, সঙ্গে মিলে যাওয়া কাজ।",
    ),
    renderer: "clock",
    engine: "clock",
    kind: "STEPPER",
    tags: ["time", "day", "routine"],
    concepts: ["parts of the day", "time order"],
    difficulty: 1,
    data: {
      mode: "routine",
      hour: 7,
      minute: 0,
      activity: L("Morning", "সকাল"),
      emoji: "🌅",
      caption: L("At 7 in the morning, we wake up.", "সকাল ৭টায় আমরা ঘুম থেকে উঠি।"),
    },
    steps: [
      S("Morning: the sun rises. We wake up.", "সকাল: সূর্য ওঠে। আমরা ঘুম থেকে উঠি।", {
        hour: 7,
        activity: L("Morning", "সকাল"),
        emoji: "🌅",
        caption: L("7 o'clock in the morning.", "সকাল ৭টা।"),
      }),
      S("Noon: the sun is high. We eat lunch.", "দুপুর: সূর্য মাথার ওপর। আমরা দুপুরের খাবার খাই।", {
        hour: 12,
        activity: L("Noon", "দুপুর"),
        emoji: "☀️",
        caption: L("12 o'clock at noon.", "দুপুর ১২টা।"),
      }),
      S("Evening: the sky turns orange. We go home.", "সন্ধ্যা: আকাশ কমলা হয়। আমরা বাড়ি ফিরি।", {
        hour: 18,
        activity: L("Evening", "সন্ধ্যা"),
        emoji: "🌇",
        caption: L("6 o'clock in the evening.", "সন্ধ্যা ৬টা।"),
      }),
      S("Night: the moon shines. We sleep.", "রাত: চাঁদ জ্বলে। আমরা ঘুমাই।", {
        hour: 21,
        activity: L("Night", "রাত"),
        emoji: "🌙",
        caption: L("9 o'clock at night.", "রাত ৯টা।"),
      }),
    ],
    aiContext:
      "Play chapter 5: the order of morning, noon, evening and night with everyday routines.",
  },
  {
    slug: "clock-face-intro",
    chapterCode: "play.05",
    title: L("Meet the clock", "ঘড়ির সঙ্গে পরিচয়"),
    summary: L(
      "The hour hand and minute hand show o'clock times.",
      "ঘণ্টার কাঁটা আর মিনিটের কাঁটা o'clock সময় দেখায়।",
    ),
    renderer: "clock",
    engine: "clock",
    kind: "STEPPER",
    tags: ["time", "clock", "o'clock"],
    concepts: ["clock face", "hour hand", "o'clock"],
    difficulty: 1,
    data: {
      mode: "oclock",
      hour: 3,
      minute: 0,
      caption: L("The short hand shows the hour.", "ছোট কাঁটাটি ঘণ্টা দেখায়।"),
    },
    steps: [
      S("The short hand points to 3. It is 3 o'clock.", "ছোট কাঁটা ৩-এ আছে। এখন ৩টা।", {
        hour: 3,
        minute: 0,
        caption: L("3 o'clock.", "৩টা।"),
      }),
      S("The short hand points to 6. It is 6 o'clock.", "ছোট কাঁটা ৬-এ আছে। এখন ৬টা।", {
        hour: 6,
        minute: 0,
        caption: L("6 o'clock.", "৬টা।"),
      }),
      S("The short hand points to 9. It is 9 o'clock.", "ছোট কাঁটা ৯-এ আছে। এখন ৯টা।", {
        hour: 9,
        minute: 0,
        caption: L("9 o'clock.", "৯টা।"),
      }),
    ],
    aiContext:
      "Play chapter 5: reading o'clock times on an analog clock and identifying the hour hand.",
  },
  {
    slug: "coins-and-notes",
    chapterCode: "play.05",
    title: L("Coins and notes", "কয়েন আর নোট"),
    summary: L(
      "1, 2, 5 and 10 Taka coins and notes with large pictures.",
      "১, ২, ৫ আর ১০ টাকার কয়েন ও নোট, বড় ছবিসহ।",
    ),
    renderer: "money-shop",
    engine: "moneyShop",
    kind: "STEPPER",
    tags: ["money", "taka", "coins"],
    concepts: ["coin values", "Taka"],
    difficulty: 1,
    data: {
      mode: "coins",
      coins: [1, 2, 5, 10],
      caption: L("Tap a coin or note to hear its value.", "মান শুনতে কয়েন বা নোটে চাপ দাও।"),
    },
    steps: [
      S("This is a 1 Taka coin.", "এটি ১ টাকার কয়েন।", {
        caption: L("1 Taka.", "১ টাকা।"),
      }),
      S("This is a 2 Taka coin.", "এটি ২ টাকার কয়েন।", {
        caption: L("2 Taka.", "২ টাকা।"),
      }),
      S("This is a 5 Taka note.", "এটি ৫ টাকার নোট।", {
        caption: L("5 Taka.", "৫ টাকা।"),
      }),
      S("This is a 10 Taka note.", "এটি ১০ টাকার নোট।", {
        caption: L("10 Taka.", "১০ টাকা।"),
      }),
    ],
    aiContext:
      "Play chapter 5: recognising Bangladeshi 1, 2, 5 and 10 Taka coins and notes.",
  },
  {
    slug: "tiny-shop",
    chapterCode: "play.05",
    title: L("The tiny shop", "ছোট দোকান"),
    summary: L(
      "Buy a teddy for 2 Taka by tapping coins.",
      "কয়েনে চাপ দিয়ে ২ টাকায় একটি টেডি কিনো।",
    ),
    renderer: "money-shop",
    engine: "moneyShop",
    kind: "STEPPER",
    tags: ["money", "shopping", "change"],
    concepts: ["paying with coins", "change"],
    difficulty: 1,
    data: {
      mode: "shop",
      coins: [1, 2, 5],
      item: {
        emoji: "🧸",
        name: L("Teddy", "টেডি"),
        price: 2,
      },
      caption: L("Tap coins to pay. The shopkeeper gives change.", "দিতে কয়েনে চাপ দাও। দোকানদার ফেরত দেবে।"),
    },
    steps: [
      S("The teddy costs 2 Taka. Tap a 2 Taka coin.", "টেডির দাম ২ টাকা। ২ টাকার কয়েনে চাপ দাও।", {
        caption: L("Pay 2 Taka.", "২ টাকা দাও।"),
      }),
      S("You pay 5 Taka. The change is 3 Taka.", "তুমি ৫ টাকা দিলে। ফেরত ৩ টাকা।", {
        caption: L("5 − 2 = 3 Taka change.", "৫ − ২ = ৩ টাকা ফেরত।"),
      }),
      S("You pay 10 Taka. The change is 8 Taka.", "তুমি ১০ টাকা দিলে। ফেরত ৮ টাকা।", {
        coins: [1, 2, 5, 10],
        caption: L("10 − 2 = 8 Taka change.", "১০ − ২ = ৮ টাকা ফেরত।"),
      }),
    ],
    aiContext:
      "Play chapter 5: paying for an item with coins and finding the change.",
  },
  {
    slug: "today-yesterday-tomorrow",
    chapterCode: "play.05",
    title: L("Yesterday, today, tomorrow", "গতকাল, আজ, আগামীকাল"),
    summary: L(
      "A three-day strip shows yesterday, today and tomorrow.",
      "তিন দিনের স্ট্রিপে গতকাল, আজ আর আগামীকাল দেখা যায়।",
    ),
    renderer: "story-scene",
    engine: "storyScene",
    kind: "SCENE",
    tags: ["time", "days", "sequence"],
    concepts: ["yesterday", "today", "tomorrow"],
    difficulty: 1,
    data: {
      scene: "day-strip",
      days: [
        { label: L("Yesterday", "গতকাল"), emoji: "🌙" },
        { label: L("Today", "আজ"), emoji: "☀️" },
        { label: L("Tomorrow", "আগামীকাল"), emoji: "🌈" },
      ],
      caption: L("Yesterday is behind us. Tomorrow is coming.", "গতকাল পিছনে। আগামীকাল আসছে।"),
    },
    steps: [
      S("Yesterday is the day before today.", "গতকাল হলো আজকের আগের দিন।", {
        active: 0,
        caption: L("Yesterday has gone.", "গতকাল চলে গেছে।"),
      }),
      S("Today is the day we are in now.", "আজ হলো আমরা এখন যে দিনে আছি।", {
        active: 1,
        caption: L("Today is here.", "আজ এখানে।"),
      }),
      S("Tomorrow is the day after today.", "আগামীকাল হলো আজকের পরের দিন।", {
        active: 2,
        caption: L("Tomorrow is coming.", "আগামীকাল আসছে।"),
      }),
    ],
    aiContext:
      "Play chapter 5: the sequence yesterday, today and tomorrow.",
  },
];
