import { L, S, type PlayVisualizationDef } from "./play.types";

export const PLAY_VIZ_02: PlayVisualizationDef[] = [
  {
    slug: "join-groups",
    chapterCode: "play.02",
    title: L("Put groups together", "দলগুলো এক করি"),
    summary: L(
      "Two groups slide together and the total is counted aloud.",
      "দুটি দল একসঙ্গে আসে আর মোট সংখ্যা জোরে গোনা হয়।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["addition", "joining", "sums to 10"],
    concepts: ["addition as joining", "total"],
    difficulty: 1,
    data: {
      emoji: "🍎",
      mode: "join",
      groups: [
        { count: 2 },
        { count: 3 },
      ],
      caption: L("Two groups join to make a bigger group.", "দুটি দল মিলে বড় দল হয়।"),
    },
    steps: [
      S("2 apples and 3 apples make 5 apples.", "২টি আপেল আর ৩টি আপেল মিলে ৫টি আপেল।", {
        groups: [{ count: 2 }, { count: 3 }],
      }, "2 + 3 = 5"),
      S("3 apples and 1 apple make 4 apples.", "৩টি আপেল আর ১টি আপেল মিলে ৪টি আপেল।", {
        groups: [{ count: 3 }, { count: 1 }],
      }, "3 + 1 = 4"),
      S("4 apples and 2 apples make 6 apples.", "৪টি আপেল আর ২টি আপেল মিলে ৬টি আপেল।", {
        groups: [{ count: 4 }, { count: 2 }],
      }, "4 + 2 = 6"),
    ],
    aiContext:
      "Play chapter 2: addition as putting two groups together, with sums up to 10.",
  },
  {
    slug: "finger-add",
    chapterCode: "play.02",
    title: L("Add on your fingers", "আঙুলে যোগ"),
    summary: L(
      "Light fingers on both hands, then count all the lit fingers.",
      "দুই হাতে আঙুল জ্বালাও, তারপর সব জ্বলন্ত আঙুল গুনো।",
    ),
    renderer: "finger-hands",
    engine: "fingerHands",
    kind: "STEPPER",
    tags: ["addition", "fingers", "sums to 10"],
    concepts: ["addition", "counting all"],
    difficulty: 1,
    data: { mode: "add", label: L("fingers in all", "মোট আঙুল") },
    steps: [
      S("2 fingers and 3 fingers make 5 fingers.", "২টি আঙুল আর ৩টি আঙুল মিলে ৫টি আঙুল।", {
        left: 2,
        right: 3,
      }, "2 + 3 = 5"),
      S("4 fingers and 1 finger make 5 fingers.", "৪টি আঙুল আর ১টি আঙুল মিলে ৫টি আঙুল।", {
        left: 4,
        right: 1,
      }, "4 + 1 = 5"),
      S("3 fingers and 3 fingers make 6 fingers.", "৩টি আঙুল আর ৩টি আঙুল মিলে ৬টি আঙুল।", {
        left: 3,
        right: 3,
      }, "3 + 3 = 6"),
    ],
    aiContext:
      "Play chapter 2: using fingers to add two small groups and count the total.",
  },
  {
    slug: "birds-on-tree",
    chapterCode: "play.02",
    title: L("Birds on the branch", "ডালে পাখি"),
    summary: L(
      "Birds fly onto a branch. Count each bird as it lands.",
      "পাখিরা ডালে এসে বসে। প্রতিটি পাখি নামার সময় গুনো।",
    ),
    renderer: "story-scene",
    engine: "storyScene",
    kind: "SCENE",
    tags: ["addition", "story", "counting"],
    concepts: ["addition as joining", "story sums"],
    difficulty: 1,
    data: {
      scene: "birds-tree",
      emoji: "🐦",
      items: 5,
      caption: L("Birds land on the branch one by one.", "পাখিরা একে একে ডালে নামে।"),
    },
    steps: [
      S("Three birds land on the branch. Count them.", "তিনটি পাখি ডালে নামল। এগুলো গুনো।", {
        items: 3,
      }),
      S("One more bird lands. Now there are four.", "আরেকটি পাখি নামল। এখন চারটি।", {
        items: 4,
      }),
      S("One more bird lands. Now there are five!", "আরেকটি পাখি নামল। এখন পাঁচটি!", {
        items: 5,
      }),
    ],
    aiContext:
      "Play chapter 2: addition told as a story, with birds joining a group one at a time.",
  },
  {
    slug: "take-away",
    chapterCode: "play.02",
    title: L("Take away cookies", "কুকি সরিয়ে নিই"),
    summary: L(
      "Some cookies are taken away. Count what is left.",
      "কিছু কুকি সরিয়ে নেওয়া হয়। বাকি কুকি গুনো।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["subtraction", "take away", "counting"],
    concepts: ["subtraction as take away", "what is left"],
    difficulty: 1,
    data: {
      emoji: "🍪",
      items: 5,
      mode: "take",
      removed: 1,
      label: L("left", "বাকি"),
      caption: L("Count the cookies that are left.", "যে কুকিগুলো বাকি আছে সেগুলো গুনো।"),
    },
    steps: [
      S("5 cookies. One is eaten. 4 are left.", "৫টি কুকি। একটি খাওয়া হলো। ৪টি বাকি।", {
        removed: 1,
      }, "5 − 1 = 4"),
      S("5 cookies. Two are eaten. 3 are left.", "৫টি কুকি। দুটি খাওয়া হলো। ৩টি বাকি।", {
        removed: 2,
      }, "5 − 2 = 3"),
      S("5 cookies. Three are eaten. 2 are left.", "৫টি কুকি। তিনটি খাওয়া হলো। ২টি বাকি।", {
        removed: 3,
      }, "5 − 3 = 2"),
    ],
    aiContext:
      "Play chapter 2: subtraction as taking away objects and counting what remains.",
  },
  {
    slug: "plus-minus-meaning",
    chapterCode: "play.02",
    title: L("Plus means more, minus means less", "যোগ মানে বেশি, বিয়োগ মানে কম"),
    summary: L(
      "A short story shows what the plus and minus signs mean.",
      "ছোট গল্পে দেখানো হয় যোগ ও বিয়োগ চিহ্নের অর্থ কী।",
    ),
    renderer: "story-scene",
    engine: "storyScene",
    kind: "SCENE",
    tags: ["addition", "subtraction", "signs"],
    concepts: ["meaning of + and −", "more and less"],
    difficulty: 1,
    data: {
      scene: "plus-minus",
      plus: L("more", "বেশি"),
      minus: L("less", "কম"),
      caption: L("Plus adds more. Minus takes some away.", "যোগে বেশি হয়। বিয়োগে কিছু কমে।"),
    },
    steps: [
      S("The plus sign means we get more.", "যোগ চিহ্ন মানে আমরা আরও পাই।", {
        plus: L("more", "বেশি"),
      }),
      S("The minus sign means we take some away.", "বিয়োগ চিহ্ন মানে আমরা কিছু সরিয়ে নিই।", {
        minus: L("less", "কম"),
      }),
      S("Tap each sign and say what it means.", "প্রতিটি চিহ্নে চাপ দিয়ে বলো এর অর্থ কী।", {
        caption: L("Plus = more. Minus = less.", "যোগ = বেশি। বিয়োগ = কম।"),
      }),
    ],
    aiContext:
      "Play chapter 2: the meaning of the plus and minus signs, addressing the misconception that they are just symbols.",
  },
  {
    slug: "zero-idea",
    chapterCode: "play.02",
    title: L("Nothing left is zero", "কিছু না থাকলে শূন্য"),
    summary: L(
      "Balloons fly away until nothing is left. That is zero.",
      "বেলুনগুলো উড়ে যায়, কিছুই বাকি থাকে না। সেটাই শূন্য।",
    ),
    renderer: "object-counting",
    engine: "objectCounting",
    kind: "STEPPER",
    tags: ["zero", "subtraction", "number sense"],
    concepts: ["zero", "nothing left"],
    difficulty: 1,
    data: {
      emoji: "🎈",
      items: 3,
      mode: "zero",
      removed: 0,
      label: L("balloons left", "বেলুন বাকি"),
      caption: L("When nothing is left, we say zero.", "কিছু না থাকলে আমরা শূন্য বলি।"),
    },
    steps: [
      S("Three balloons. All three are here.", "তিনটি বেলুন। তিনটিই এখানে।", {
        removed: 0,
      }),
      S("Two balloons fly away. One is left.", "দুটি বেলুন উড়ে গেল। একটি বাকি।", {
        removed: 2,
      }, "3 − 2 = 1"),
      S("The last balloon flies away. Nothing is left: zero.", "শেষ বেলুনটিও উড়ে গেল। কিছু বাকি নেই: শূন্য।", {
        removed: 3,
      }, "3 − 3 = 0"),
    ],
    aiContext:
      "Play chapter 2: the idea of zero as the count when nothing is left.",
  },
  {
    slug: "add-subtract-pairs",
    chapterCode: "play.02",
    title: L("Frog hops on the number line", "সংখ্যারেখায় ব্যাঙের লাফ"),
    summary: L(
      "A frog hops forward to add and back to subtract.",
      "ব্যাঙ যোগ করতে সামনে আর বিয়োগ করতে পিছনে লাফায়।",
    ),
    renderer: "number-line",
    engine: "numberLine",
    kind: "STEPPER",
    tags: ["addition", "subtraction", "number line"],
    concepts: ["adding on a number line", "subtracting on a number line"],
    difficulty: 2,
    data: {
      min: 0,
      max: 10,
      mode: "jumps",
      stones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      jumps: [{ from: 2, to: 5, dir: "+" }],
    },
    steps: [
      S("Start at 2. Hop forward 3. You land on 5.", "২ থেকে শুরু। ৩ ঘর সামনে লাফ। তুমি ৫-এ পৌঁছাবে।", {
        jumps: [{ from: 2, to: 5, dir: "+" }],
      }, "2 + 3 = 5"),
      S("Start at 7. Hop back 2. You land on 5.", "৭ থেকে শুরু। ২ ঘর পিছনে লাফ। তুমি ৫-এ পৌঁছাবে।", {
        jumps: [{ from: 7, to: 5, dir: "−" }],
      }, "7 − 2 = 5"),
      S("Start at 1. Hop forward 4. You land on 5.", "১ থেকে শুরু। ৪ ঘর সামনে লাফ। তুমি ৫-এ পৌঁছাবে।", {
        jumps: [{ from: 1, to: 5, dir: "+" }],
      }, "1 + 4 = 5"),
    ],
    aiContext:
      "Play chapter 2: adding and subtracting by hopping forward and backward on a 0–10 number line.",
  },
  {
    slug: "story-sum-picture",
    chapterCode: "play.02",
    title: L("Picture stories with numbers", "ছবির গল্পে সংখ্যা"),
    summary: L(
      "Picture stories show the number sentence beside the objects.",
      "ছবির গল্পে বস্তুর পাশেই সংখ্যার বাক্য দেখা যায়।",
    ),
    renderer: "story-scene",
    engine: "storyScene",
    kind: "SCENE",
    tags: ["addition", "story sums", "pictures"],
    concepts: ["addition stories", "number sentence"],
    difficulty: 1,
    data: {
      scene: "story-sum",
      emoji: "🍎",
      groups: [2, 1],
      caption: L("Two apples and one apple make three apples.", "দুটি আপেল আর একটি আপেল মিলে তিনটি আপেল।"),
    },
    steps: [
      S("2 apples plus 1 apple makes 3 apples.", "২টি আপেল যোগ ১টি আপেল = ৩টি আপেল।", {
        groups: [2, 1],
      }, "2 + 1 = 3"),
      S("3 apples plus 2 apples makes 5 apples.", "৩টি আপেল যোগ ২টি আপেল = ৫টি আপেল।", {
        groups: [3, 2],
      }, "3 + 2 = 5"),
      S("4 apples plus 1 apple makes 5 apples.", "৪টি আপেল যোগ ১টি আপেল = ৫টি আপেল।", {
        groups: [4, 1],
      }, "4 + 1 = 5"),
    ],
    aiContext:
      "Play chapter 2: connecting a picture story to its number sentence.",
  },
];
