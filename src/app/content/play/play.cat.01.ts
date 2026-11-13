import {
  L,
  callout,
  example,
  text,
  vizBlock,
  type PlayCategoryDef,
} from "./play.types";

export const PLAY_CAT_01: PlayCategoryDef = {
  slug: "numbers",
  title: L("Numbers and counting", "সংখ্যা ও গণনা"),
  summary: L(
    "Meet numbers 1 to 100, count objects and find missing numbers.",
    "১ থেকে ১০০ পর্যন্ত সংখ্যার সঙ্গে পরিচিত হও, বস্তু গুনো আর হারানো সংখ্যা খোঁজো।",
  ),
  icon: "🔢",
  order: 1,
  chapter: {
    slug: "numbers-1-to-100",
    title: L("Recognizing numbers 1 to 100", "১ থেকে ১০০ পর্যন্ত সংখ্যা চেনা"),
    summary: L(
      "Hear, see, count and trace numbers, then explore the hundred chart.",
      "সংখ্যা শুনি, দেখি, গুনি ও ট্রেস করি, তারপর শতক গ্রিড ঘুরে দেখি।",
    ),
    order: 1,
    topics: [
      {
        slug: "play-numbers-1-10",
        title: L("Numbers 1 to 10", "১ থেকে ১০ পর্যন্ত সংখ্যা"),
        summary: L(
          "Hear, see and count the numbers from one to ten.",
          "এক থেকে দশ পর্যন্ত সংখ্যা শুনি, দেখি ও গুনি।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Numbers tell us how many. Let's meet 1 to 10.",
            "সংখ্যা বলে দেয় কতগুলো। চলো ১ থেকে ১০-এর সঙ্গে পরিচিত হই।",
          ),
          vizBlock("number-parade"),
          text(
            "Tap each number and say it aloud. Count with your fingers too.",
            "প্রতিটি সংখ্যায় চাপ দিয়ে জোরে বলো। আঙুল দিয়েও গুনো।",
          ),
          vizBlock("finger-count-1-10"),
          vizBlock("count-animals"),
          callout(
            "The last number you say is the total.",
            "শেষ যে সংখ্যাটি বলো, সেটিই মোট সংখ্যা।",
          ),
          vizBlock("number-trace"),
        ],
        vizSlugs: [
          "number-parade",
          "finger-count-1-10",
          "count-animals",
          "number-trace",
        ],
      },
      {
        slug: "play-numbers-to-100",
        title: L("Numbers up to 100", "১০০ পর্যন্ত সংখ্যা"),
        summary: L(
          "Count by tens and find numbers on the hundred chart.",
          "দশে দশে গুনি আর শতক গ্রিডে সংখ্যা খুঁজি।",
        ),
        difficulty: 2,
        lesson: [
          text(
            "The hundred chart has ten rows. Each row has ten numbers.",
            "শতক গ্রিডে দশটি সারি আছে। প্রতিটি সারিতে দশটি সংখ্যা।",
          ),
          vizBlock("number-song-grid"),
          example(
            "10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
            "১০, ২০, ৩০, ৪০, ৫০, ৬০, ৭০, ৮০, ৯০, ১০০।",
          ),
          text(
            "The last column is counting by tens. Tap a number to hear it.",
            "শেষ কলামটি দশে দশে গোনা। সংখ্যায় চাপ দিয়ে শুনো।",
          ),
          vizBlock("find-the-number"),
        ],
        vizSlugs: ["number-song-grid", "find-the-number"],
      },
      {
        slug: "play-missing-and-matching",
        title: L("Missing numbers and matching", "হারানো সংখ্যা ও মিলানো"),
        summary: L(
          "Find the missing number and match a numeral to a group of objects.",
          "হারানো সংখ্যা খুঁজি আর সংখ্যার সঙ্গে বস্তুর দল মিলাই।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Numbers follow a order. 1, 2, 3, 4... Which number comes next?",
            "সংখ্যাগুলো একটি ক্রমে চলে। ১, ২, ৩, ৪... এরপর কোন সংখ্যা?",
          ),
          vizBlock("missing-number"),
          text(
            "A numeral tells how many. Match the card to the right group.",
            "সংখ্যা বলে দেয় কতগুলো। কার্ডটি সঠিক দলের সঙ্গে মিলাও।",
          ),
          vizBlock("number-vs-quantity"),
          callout(
            "Count each object only once.",
            "প্রতিটি বস্তু একবারই গুনো।",
          ),
        ],
        vizSlugs: ["missing-number", "number-vs-quantity"],
      },
    ],
  },
};
