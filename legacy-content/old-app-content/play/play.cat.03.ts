import {
  L,
  callout,
  text,
  vizBlock,
  type PlayCategoryDef,
} from "./play.types";

export const PLAY_CAT_03: PlayCategoryDef = {
  slug: "compare",
  title: L("Comparing and measuring", "তুলনা ও মাপ"),
  summary: L(
    "Compare big and small, long and short, more and less, heavy and light.",
    "বড়-ছোট, লম্বা-খাটো, বেশি-কম আর ভারী-হালকা তুলনা করি।",
  ),
  icon: "⚖️",
  order: 3,
  chapter: {
    slug: "comparing-big-small-long-short",
    title: L("Comparing: big/small, long/short", "তুলনা: বড়/ছোট, লম্বা/খাটো"),
    summary: L(
      "Look carefully at size, length, quantity and weight.",
      "আকার, দৈর্ঘ্য, পরিমাণ আর ওজন মন দিয়ে দেখি।",
    ),
    order: 3,
    topics: [
      {
        slug: "play-big-small",
        title: L("Big and small", "বড় আর ছোট"),
        summary: L(
          "Compare two objects by size and by height.",
          "আকার ও উচ্চতা দিয়ে দুটি বস্তু তুলনা করি।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Big and small are opposites. Look at the whole object.",
            "বড় আর ছোট পরস্পরের বিপরীত। পুরো বস্তুটির দিকে তাকাও।",
          ),
          vizBlock("big-small-pairs"),
          text(
            "Tall and short compare height. Line up the feet to be fair.",
            "লম্বা আর খাটো উচ্চতা তুলনা করে। ন্যায্যভাবে তুলনা করতে পা একসঙ্গে রাখো।",
          ),
          vizBlock("tall-short-giraffe"),
        ],
        vizSlugs: ["big-small-pairs", "tall-short-giraffe"],
      },
      {
        slug: "play-long-short",
        title: L("Long and short", "লম্বা আর খাটো"),
        summary: L(
          "Align the starts, compare lengths, then order by size.",
          "শুরু একসঙ্গে রেখে দৈর্ঘ্য তুলনা করি, তারপর আকারে সাজাই।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "To compare length, start both objects at the same place.",
            "দৈর্ঘ্য তুলনা করতে দুই বস্তু একই জায়গা থেকে শুরু করো।",
          ),
          vizBlock("long-short-line"),
          callout(
            "If the starts are not aligned, the comparison is not fair.",
            "শুরু একসঙ্গে না থাকলে তুলনা ন্যায্য হয় না।",
          ),
          vizBlock("order-by-size"),
        ],
        vizSlugs: ["long-short-line", "order-by-size"],
      },
      {
        slug: "play-more-less-heavy",
        title: L("More, less and heavy", "বেশি, কম আর ভারী"),
        summary: L(
          "Pair objects to compare quantity, then compare weight.",
          "পরিমাণ তুলনা করতে বস্তু মিলাও, তারপর ওজন তুলনা করো।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Pair one object with one object. The group with leftovers has more.",
            "একটি বস্তুর সঙ্গে একটি বস্তু মিলাও। যে দলে বাড়তি থাকে সেটিতে বেশি।",
          ),
          vizBlock("more-less-sets"),
          text(
            "A seesaw goes down on the heavier side.",
            "দোলনা ভারী দিকে নিচে যায়।",
          ),
          vizBlock("heavy-light-seesaw"),
        ],
        vizSlugs: ["more-less-sets", "heavy-light-seesaw"],
      },
    ],
  },
};
