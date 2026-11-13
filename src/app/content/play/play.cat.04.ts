import {
  L,
  callout,
  text,
  vizBlock,
  type PlayCategoryDef,
} from "./play.types";

export const PLAY_CAT_04: PlayCategoryDef = {
  slug: "shapes",
  title: L("Shapes around us", "আমাদের চারপাশে আকৃতি"),
  summary: L(
    "Meet circles, triangles and quadrilaterals, then build and trace them.",
    "বৃত্ত, ত্রিভুজ আর চতুর্ভুজের সঙ্গে পরিচিত হও, তারপর সাজাও ও ট্রেস করো।",
  ),
  icon: "🔷",
  order: 4,
  chapter: {
    slug: "recognizing-shapes",
    title: L("Recognizing shapes", "আকৃতি চেনা"),
    summary: L(
      "Find shapes in pictures and count their sides and corners.",
      "ছবিতে আকৃতি খুঁজি আর তাদের বাহু ও কোণ গুনি।",
    ),
    order: 4,
    topics: [
      {
        slug: "play-meet-shapes",
        title: L("Meet the shapes", "আকৃতিদের সঙ্গে পরিচয়"),
        summary: L(
          "Circle, triangle, square and rectangle introduce themselves.",
          "বৃত্ত, ত্রিভুজ, বর্গ আর আয়তক্ষেত্র নিজেদের পরিচয় দেয়।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Shapes are all around us. Let's meet four shape friends.",
            "আকৃতি আমাদের চারপাশেই আছে। চলো চারজন আকৃতির বন্ধুর সঙ্গে পরিচিত হই।",
          ),
          vizBlock("shape-friends"),
          text(
            "Look at a picture and hunt for shapes. Tap each one you find.",
            "একটি ছবি দেখে আকৃতি খোঁজো। যেটি পাবে সেটিতে চাপ দাও।",
          ),
          vizBlock("shape-hunt"),
        ],
        vizSlugs: ["shape-friends", "shape-hunt"],
      },
      {
        slug: "play-sides-corners",
        title: L("Sides and corners", "বাহু আর কোণ"),
        summary: L(
          "Count sides and corners, then trace the outline.",
          "বাহু ও কোণ গুনি, তারপর রূপরেখা ট্রেস করি।",
        ),
        difficulty: 2,
        lesson: [
          text(
            "A triangle has 3 sides. A square and a rectangle have 4 sides.",
            "ত্রিভুজের ৩টি বাহু। বর্গ ও আয়তক্ষেত্রের ৪টি বাহু।",
          ),
          vizBlock("count-corners-sides"),
          callout(
            "Corners are where two sides meet.",
            "দুটি বাহু যেখানে মিলিত হয় সেটিই কোণ।",
          ),
          vizBlock("trace-the-shape"),
        ],
        vizSlugs: ["count-corners-sides", "trace-the-shape"],
      },
      {
        slug: "play-shape-games",
        title: L("Shape games", "আকৃতির খেলা"),
        summary: L(
          "Sort shapes into bins and build a picture from shapes.",
          "আকৃতি বাক্সে সাজাই আর আকৃতি দিয়ে ছবি বানাই।",
        ),
        difficulty: 1,
        lesson: [
          text(
            "Sorting shapes helps us notice what is the same and what is different.",
            "আকৃতি সাজালে বোঝা যায় কী একরকম আর কী আলাদা।",
          ),
          vizBlock("shape-sorter"),
          text(
            "You can build a house from a triangle, a square, a rectangle and a circle.",
            "ত্রিভুজ, বর্গ, আয়তক্ষেত্র আর বৃত্ত দিয়ে ঘর বানানো যায়।",
          ),
          vizBlock("build-a-picture"),
        ],
        vizSlugs: ["shape-sorter", "build-a-picture"],
      },
    ],
  },
};
