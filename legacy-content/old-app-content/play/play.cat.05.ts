import {
  L,
  callout,
  text,
  vizBlock,
  type PlayCategoryDef,
} from "./play.types";

export const PLAY_CAT_05: PlayCategoryDef = {
  slug: "time-money",
  title: L("Time and money", "সময় ও টাকা"),
  summary: L(
    "Learn the parts of the day, read o'clock times and use Taka coins.",
    "দিনের অংশ, ঘড়ির সময় আর টাকার কয়েন ব্যবহার শিখি।",
  ),
  icon: "🕒",
  order: 5,
  chapter: {
    slug: "basic-time-money",
    title: L("Basic idea of time and money", "সময় ও টাকার প্রাথমিক ধারণা"),
    summary: L(
      "A day has morning, noon, evening and night. We buy things with Taka.",
      "এক দিনে সকাল, দুপুর, সন্ধ্যা আর রাত থাকে। আমরা টাকা দিয়ে জিনিস কিনি।",
    ),
    order: 5,
    topics: [
      {
        slug: "play-my-day",
        title: L("My day", "আমার দিন"),
        summary: L(
          "Morning, noon, evening and night, then yesterday, today and tomorrow.",
          "সকাল, দুপুর, সন্ধ্যা ও রাত, তারপর গতকাল, আজ ও আগামীকাল।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "A day has parts: morning, noon, evening and night.",
            "এক দিনের অংশ আছে: সকাল, দুপুর, সন্ধ্যা আর রাত।",
          ),
          vizBlock("day-routine"),
          text(
            "Yesterday is behind us. Today is now. Tomorrow is coming.",
            "গতকাল পিছনে। আজ এখন। আগামীকাল আসছে।",
          ),
          vizBlock("today-yesterday-tomorrow"),
        ],
        vizSlugs: ["day-routine", "today-yesterday-tomorrow"],
      },
      {
        slug: "play-clock",
        title: L("The clock", "ঘড়ি"),
        summary: L(
          "The short hand shows the hour. We read o'clock times.",
          "ছোট কাঁটা ঘণ্টা দেখায়। আমরা o'clock সময় পড়ি।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "A clock has a short hand and a long hand. The short hand shows the hour.",
            "ঘড়িতে একটি ছোট কাঁটা আর একটি লম্বা কাঁটা থাকে। ছোট কাঁটা ঘণ্টা দেখায়।",
          ),
          vizBlock("clock-face-intro"),
          callout(
            "When the long hand points to 12, we say o'clock.",
            "লম্বা কাঁটা ১২-এ থাকলে আমরা o'clock বলি।",
          ),
        ],
        vizSlugs: ["clock-face-intro"],
      },
      {
        slug: "play-money",
        title: L("Coins and notes", "কয়েন আর নোট"),
        summary: L(
          "Recognise 1, 2, 5 and 10 Taka, then buy something in the tiny shop.",
          "১, ২, ৫ আর ১০ টাকা চিনি, তারপর ছোট দোকানে কিছু কিনি।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "We use Taka to buy things. Coins and notes have different values.",
            "আমরা টাকা দিয়ে জিনিস কিনি। কয়েন আর নোটের মান আলাদা।",
          ),
          vizBlock("coins-and-notes"),
          text(
            "Tap coins to pay. If you pay more than the price, you get change.",
            "দিতে কয়েনে চাপ দাও। দামের বেশি দিলে ফেরত পাবে।",
          ),
          vizBlock("tiny-shop"),
        ],
        vizSlugs: ["coins-and-notes", "tiny-shop"],
      },
    ],
  },
};
