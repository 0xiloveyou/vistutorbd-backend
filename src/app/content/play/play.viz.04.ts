import { L, S, type PlayVisualizationDef } from "./play.types";

export const PLAY_VIZ_04: PlayVisualizationDef[] = [
  {
    slug: "shape-friends",
    chapterCode: "play.04",
    title: L("Shape friends", "আকৃতির বন্ধুরা"),
    summary: L(
      "Circle, triangle, square and rectangle introduce themselves.",
      "বৃত্ত, ত্রিভুজ, বর্গ আর আয়তক্ষেত্র নিজেদের পরিচয় দেয়।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "circle", "triangle", "quadrilateral"],
    concepts: ["shape recognition", "shape names"],
    difficulty: 1,
    data: {
      mode: "friends",
      shapes: [
        { type: "circle", label: L("circle", "বৃত্ত") },
        { type: "triangle", label: L("triangle", "ত্রিভুজ") },
        { type: "square", label: L("square", "বর্গ") },
        { type: "rectangle", label: L("rectangle", "আয়তক্ষেত্র") },
      ],
      caption: L("Tap a shape friend to hear its name.", "নাম শুনতে আকৃতির বন্ধুতে চাপ দাও।"),
    },
    steps: [
      S("This is a circle. It is round with no corners.", "এটি বৃত্ত। এটি গোল, কোনো কোণ নেই।", {
        shapes: [{ type: "circle", label: L("circle", "বৃত্ত") }],
        caption: L("A circle is round.", "বৃত্ত গোল।"),
      }),
      S("This is a triangle. It has three sides.", "এটি ত্রিভুজ। এর তিনটি বাহু আছে।", {
        shapes: [{ type: "triangle", label: L("triangle", "ত্রিভুজ") }],
        caption: L("A triangle has 3 sides.", "ত্রিভুজের ৩টি বাহু।"),
      }),
      S("A square has four equal sides. A rectangle has four sides too.", "বর্গের চারটি সমান বাহু। আয়তক্ষেত্রেরও চারটি বাহু।", {
        shapes: [
          { type: "square", label: L("square", "বর্গ") },
          { type: "rectangle", label: L("rectangle", "আয়তক্ষেত্র") },
        ],
        caption: L("Both have 4 sides.", "দুটিরই ৪টি বাহু।"),
      }),
    ],
    aiContext:
      "Play chapter 4: introducing circle, triangle, square and rectangle with names and basic properties.",
  },
  {
    slug: "shape-hunt",
    chapterCode: "play.04",
    title: L("Shape hunt", "আকৃতি খোঁজা"),
    summary: L(
      "Look at the picture and tap all the circles, triangles or quadrilaterals.",
      "ছবিটি দেখে সব বৃত্ত, ত্রিভুজ বা চতুর্ভুজ খুঁজে চাপ দাও।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "shape hunt", "circle", "triangle"],
    concepts: ["shape recognition in the environment"],
    difficulty: 1,
    data: {
      mode: "hunt",
      scene: "🏠",
      target: "circle",
      shapes: [
        { type: "circle", x: 12, y: 18 },
        { type: "triangle", x: 40, y: 12 },
        { type: "square", x: 66, y: 22 },
        { type: "circle", x: 22, y: 62 },
        { type: "rectangle", x: 58, y: 64 },
      ],
      prompt: L("Find the circles.", "বৃত্তগুলো খুঁজে বের করো।"),
    },
    steps: [
      S("Find all the circles in the picture.", "ছবিতে সব বৃত্ত খুঁজে বের করো।", {
        target: "circle",
        prompt: L("Find the circles.", "বৃত্তগুলো খুঁজে বের করো।"),
      }),
      S("Now find the triangles.", "এবার ত্রিভুজগুলো খুঁজে বের করো।", {
        target: "triangle",
        prompt: L("Find the triangles.", "ত্রিভুজগুলো খুঁজে বের করো।"),
      }),
      S("Now find the quadrilaterals: squares and rectangles.", "এবার চতুর্ভুজ খুঁজে বের করো: বর্গ আর আয়তক্ষেত্র।", {
        target: "square",
        prompt: L("Find the quadrilaterals.", "চতুর্ভুজগুলো খুঁজে বের করো।"),
      }),
    ],
    aiContext:
      "Play chapter 4: finding shapes in a picture, including circles, triangles and quadrilaterals.",
  },
  {
    slug: "count-corners-sides",
    chapterCode: "play.04",
    title: L("Sides and corners", "বাহু আর কোণ"),
    summary: L(
      "Count the sides and corners of a shape.",
      "আকৃতির বাহু আর কোণ গুনো।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "sides", "corners"],
    concepts: ["sides", "corners", "shape properties"],
    difficulty: 2,
    data: {
      mode: "corners",
      shape: "triangle",
      sides: 3,
      corners: 3,
      caption: L("A triangle has 3 sides and 3 corners.", "ত্রিভুজের ৩টি বাহু আর ৩টি কোণ।"),
    },
    steps: [
      S("A triangle has 3 sides and 3 corners.", "ত্রিভুজের ৩টি বাহু আর ৩টি কোণ।", {
        shape: "triangle",
        sides: 3,
        corners: 3,
      }),
      S("A square has 4 sides and 4 corners.", "বর্গের ৪টি বাহু আর ৪টি কোণ।", {
        shape: "square",
        sides: 4,
        corners: 4,
      }),
      S("A rectangle also has 4 sides and 4 corners.", "আয়তক্ষেত্রেরও ৪টি বাহু আর ৪টি কোণ।", {
        shape: "rectangle",
        sides: 4,
        corners: 4,
      }),
    ],
    aiContext:
      "Play chapter 4: counting sides and corners of triangles, squares and rectangles.",
  },
  {
    slug: "shape-sorter",
    chapterCode: "play.04",
    title: L("Shape sorter", "আকৃতি সাজানো"),
    summary: L(
      "Tap a shape, then tap the matching bin.",
      "একটি আকৃতিতে চাপ দাও, তারপর মিলে যাওয়া বাক্সে চাপ দাও।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "sorting", "matching"],
    concepts: ["shape sorting", "shape matching"],
    difficulty: 1,
    data: {
      mode: "sorter",
      shapes: [
        { type: "circle" },
        { type: "triangle" },
        { type: "square" },
      ],
      caption: L("Sort each shape into its matching bin.", "প্রতিটি আকৃতি তার মিলে যাওয়া বাক্সে সাজাও।"),
    },
    steps: [
      S("First find the circle and put it in the circle bin.", "প্রথমে বৃত্তটি খুঁজে বৃত্তের বাক্সে রাখো।", {
        shapes: [{ type: "circle" }, { type: "triangle" }, { type: "square" }],
      }),
      S("Next, the triangle goes in the triangle bin.", "এরপর ত্রিভুজটি ত্রিভুজের বাক্সে যাবে।", {
        shapes: [{ type: "triangle" }, { type: "circle" }, { type: "square" }],
      }),
      S("Finally, the square goes in the square bin.", "শেষে বর্গটি বর্গের বাক্সে যাবে।", {
        shapes: [{ type: "square" }, { type: "circle" }, { type: "triangle" }],
      }),
    ],
    aiContext:
      "Play chapter 4: sorting shapes into matching bins to reinforce shape recognition.",
  },
  {
    slug: "build-a-picture",
    chapterCode: "play.04",
    title: L("Build a picture", "ছবি বানাই"),
    summary: L(
      "A house is built from a triangle, a square, a rectangle and a circle.",
      "ত্রিভুজ, বর্গ, আয়তক্ষেত্র আর বৃত্ত দিয়ে একটি ঘর বানানো হয়।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "building", "creativity"],
    concepts: ["composing shapes", "shape properties"],
    difficulty: 2,
    data: {
      mode: "build",
      picture: "house",
      caption: L("Every part of the house is a shape.", "ঘরের প্রতিটি অংশ একটি আকৃতি।"),
    },
    steps: [
      S("The roof is a triangle.", "ছাদটি একটি ত্রিভুজ।", {
        caption: L("The roof is a triangle.", "ছাদটি একটি ত্রিভুজ।"),
      }),
      S("The wall is a square and the door is a rectangle.", "দেয়ালটি বর্গ আর দরজাটি আয়তক্ষেত্র।", {
        caption: L("Wall: square. Door: rectangle.", "দেয়াল: বর্গ। দরজা: আয়তক্ষেত্র।"),
      }),
      S("The sun is a circle. Shapes can build a picture!", "সূর্যটি একটি বৃত্ত। আকৃতি দিয়ে ছবি বানানো যায়!", {
        caption: L("The sun is a circle.", "সূর্যটি একটি বৃত্ত।"),
      }),
    ],
    aiContext:
      "Play chapter 4: composing a house picture from triangles, squares, rectangles and circles.",
  },
  {
    slug: "trace-the-shape",
    chapterCode: "play.04",
    title: L("Trace the shape", "আকৃতি ট্রেস করি"),
    summary: L(
      "Trace the outline and watch the shape fill with colour.",
      "আকৃতির রূপরেখা ট্রেস করো, দেখো এটি রঙে ভরে ওঠে।",
    ),
    renderer: "shape-canvas",
    engine: "shapeCanvas",
    kind: "STEPPER",
    tags: ["shapes", "tracing", "fine motor"],
    concepts: ["shape drawing", "fine motor"],
    difficulty: 1,
    data: {
      mode: "trace",
      shape: "circle",
      caption: L("Follow the outline with your finger.", "আঙুল দিয়ে রূপরেখা অনুসরণ করো।"),
    },
    steps: [
      S("Trace the circle all the way around.", "বৃত্তটির চারপাশে ঘুরে ট্রেস করো।", {
        shape: "circle",
        success: L("A round circle!", "গোল বৃত্ত!"),
      }),
      S("Trace the triangle: three straight sides.", "ত্রিভুজ ট্রেস করো: তিনটি সোজা বাহু।", {
        shape: "triangle",
        success: L("A sharp triangle!", "ধারালো ত্রিভুজ!"),
      }),
      S("Trace the square: four equal sides.", "বর্গ ট্রেস করো: চারটি সমান বাহু।", {
        shape: "square",
        success: L("A neat square!", "সুন্দর বর্গ!"),
      }),
    ],
    aiContext:
      "Play chapter 4: tracing circles, triangles and squares to build shape drawing skills.",
  },
];
