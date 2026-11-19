import {
  L,
  callout,
  example,
  text,
  vizBlock,
  type PlayCategoryDef,
} from "./play.types";

export const PLAY_CAT_02: PlayCategoryDef = {
  slug: "add-subtract",
  title: L("Adding and taking away", "যোগ ও বিয়োগ"),
  summary: L(
    "Join groups, take some away and tell addition and subtraction stories.",
    "দল এক করি, কিছু সরিয়ে নিই আর যোগ-বিয়োগের গল্প বলি।",
  ),
  icon: "➕",
  order: 2,
  chapter: {
    slug: "basic-addition-subtraction",
    title: L("Basic idea of addition and subtraction", "যোগ ও বিয়োগের প্রাথমিক ধারণা"),
    summary: L(
      "Put groups together, take objects away, and meet zero.",
      "দল এক করি, বস্তু সরিয়ে নিই আর শূন্যের সঙ্গে পরিচিত হই।",
    ),
    order: 2,
    topics: [
      {
        slug: "play-put-together",
        title: L("Putting groups together", "দল এক করি"),
        summary: L(
          "Two groups join to make a bigger group. This is addition.",
          "দুটি দল মিলে বড় দল হয়। এটাই যোগ।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "When we put two groups together, we add. The plus sign + means more.",
            "দুটি দল এক করলে আমরা যোগ করি। যোগ চিহ্ন + মানে বেশি।",
          ),
          vizBlock("join-groups"),
          example("2 + 3 = 5", "২ + ৩ = ৫"),
          text(
            "You can add on your fingers too. Count all the lit fingers.",
            "আঙুলেও যোগ করতে পারো। সব জ্বলন্ত আঙুল গুনো।",
          ),
          vizBlock("finger-add"),
          vizBlock("birds-on-tree"),
        ],
        vizSlugs: ["join-groups", "finger-add", "birds-on-tree"],
      },
      {
        slug: "play-take-away",
        title: L("Taking away", "সরিয়ে নেওয়া"),
        summary: L(
          "Some objects are taken away. Count what is left.",
          "কিছু বস্তু সরিয়ে নেওয়া হয়। বাকিগুলো গুনি।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "When we take some away, we subtract. The minus sign − means less.",
            "কিছু সরিয়ে নিলে আমরা বিয়োগ করি। বিয়োগ চিহ্ন − মানে কম।",
          ),
          vizBlock("take-away"),
          example("5 − 2 = 3", "৫ − ২ = ৩"),
          text(
            "If nothing is left, the answer is zero.",
            "যদি কিছুই না থাকে, উত্তর হয় শূন্য।",
          ),
          vizBlock("zero-idea"),
          callout(
            "Zero means none left.",
            "শূন্য মানে কিছুই বাকি নেই।",
          ),
        ],
        vizSlugs: ["take-away", "zero-idea"],
      },
      {
        slug: "play-plus-minus-stories",
        title: L("Plus, minus and stories", "যোগ, বিয়োগ ও গল্প"),
        summary: L(
          "Use the signs in picture stories and on the number line.",
          "ছবির গল্পে আর সংখ্যারেখায় চিহ্নগুলো ব্যবহার করি।",
        ),
        difficulty: 2,
        lesson: [
          text(
            "Plus adds more. Minus takes some away.",
            "যোগে বেশি হয়। বিয়োগে কিছু কমে।",
          ),
          vizBlock("plus-minus-meaning"),
          text(
            "A frog can hop forward to add and back to subtract.",
            "ব্যাঙ সামনে লাফিয়ে যোগ করে, পিছনে লাফিয়ে বিয়োগ করে।",
          ),
          vizBlock("add-subtract-pairs"),
          vizBlock("story-sum-picture"),
        ],
        vizSlugs: [
          "plus-minus-meaning",
          "add-subtract-pairs",
          "story-sum-picture",
        ],
      },
    ],
  },
};
