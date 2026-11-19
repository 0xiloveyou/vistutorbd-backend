import type { VisualActivity } from "../types";
import { b, coach } from "./helpers";

/**
 * CYCLE 2 — one visual explanation per group.
 *
 * These are the "explanation" half of the cycle: the student explores a
 * picture, the companion points at each part, and sliders let them see what
 * changes. No score is kept, so they can explore freely.
 */
export const VISUAL_ACTIVITIES: VisualActivity[] = [
  {
    id: "visual.shape-detectives",
    slug: "next-visual-play-nursery",
    file: "next-visual-play-nursery.html",
    group: "play-nursery",
    kind: "VISUAL",
    cycle: 2,
    order: 10,
    type: "visual",
    scene: "shapes",
    defaultStyle: "robot",
    title: b("Shape Detectives", "আকৃতি গোয়েন্দা"),
    goal: b(
      "Find a circle, a square, a triangle and a rectangle in the village picture.",
      "গ্রামের ছবিতে বৃত্ত, বর্গ, ত্রিভুজ ও আয়তক্ষেত্র খুঁজে বের করো।",
    ),
    concepts: ["N3", "N5"],
    ideas: ["PN-06", "PN-07"],
    steps: [
      {
        target: "#shape-circle",
        say: b(
          "This is a circle. It is round and has no corners.",
          "এটি একটি বৃত্ত। এটি গোল, কোনো কোণ নেই।",
        ),
      },
      {
        target: "#shape-square",
        say: b(
          "This is a square. It has four equal sides and four corners.",
          "এটি একটি বর্গ। এর চারটি সমান বাহু ও চারটি কোণ আছে।",
        ),
      },
      {
        target: "#shape-triangle",
        say: b(
          "This is a triangle. It has three sides and three corners.",
          "এটি একটি ত্রিভুজ। এর তিনটি বাহু ও তিনটি কোণ আছে।",
        ),
      },
      {
        target: "#shape-rect",
        say: b(
          "This is a rectangle. It has four sides and four square corners.",
          "এটি একটি আয়তক্ষেত্র। এর চারটি বাহু ও চারটি সমকোণ আছে।",
        ),
      },
    ],
    coach: coach({
      intro: b(
        "Tap a shape to hear its name. Can you find all four?",
        "আকৃতিতে ট্যাপ করে নাম শোনো। চারটিই খুঁজে পাবে?",
      ),
      steps: [
        b("A circle is round with no corners.", "বৃত্ত গোল, কোনো কোণ নেই।"),
        b(
          "A square has four equal sides and four corners.",
          "বর্গের চারটি সমান বাহু ও চারটি কোণ।",
        ),
        b("A triangle has three sides.", "ত্রিভুজের তিনটি বাহু।"),
        b(
          "A rectangle has four sides and four square corners.",
          "আয়তক্ষেত্রের চারটি বাহু ও চারটি সমকোণ।",
        ),
      ],
      hints: [
        b(
          "Look at the sun and the wheel — both are circles.",
          "সূর্য ও চাকার দিকে দেখো — দুটোই বৃত্ত।",
        ),
        b(
          "Look at the window. Its sides are equal.",
          "জানালার দিকে দেখো। এর বাহুগুলো সমান।",
        ),
        b("The roof and the door are waiting too.", "ছাদ ও দরজাও অপেক্ষা করছে।"),
      ],
      none: b("Tap a shape in the picture.", "ছবিতে একটি আকৃতিতে ট্যাপ করো।"),
      good: b("You found a shape!", "তুমি একটি আকৃতি খুঁজে পেয়েছ!"),
      done: b(
        "All four shapes found. Shape detective!",
        "চারটি আকৃতিই পাওয়া গেছে। আকৃতি গোয়েন্দা!",
      ),
      again: b(
        "Trace the edge with your finger: corners tell you the shape's name.",
        "আঙুল দিয়ে কিনারা বরাবর যাও: কোণই বলে দেয় আকৃতির নাম।",
      ),
    }),
  },

  {
    id: "visual.fraction-wall",
    slug: "next-visual-class-1-5",
    file: "next-visual-class-1-5.html",
    group: "class-1-5",
    kind: "VISUAL",
    cycle: 2,
    order: 10,
    type: "visual",
    scene: "fraction-wall",
    defaultStyle: "robot",
    title: b("Equivalent Fraction Wall", "সমতুল্য ভগ্নাংশের দেয়াল"),
    goal: b(
      "See how halves, quarters and eighths can name the same amount.",
      "দেখো কীভাবে অর্ধ, চতুর্থাংশ ও অষ্টমাংশ একই পরিমাণ বোঝায়।",
    ),
    concepts: ["P8", "P11"],
    ideas: ["C15-16", "C15-17"],
    steps: [
      {
        target: "#frac-half",
        say: b(
          "One half of the bar is coloured. The whole is cut into two equal parts.",
          "বারের অর্ধেক রং করা। পুরোটা দুই সমান অংশে কাটা।",
        ),
      },
      {
        target: "#frac-quarters",
        say: b(
          "The same length is two quarters: 2/4. Two quarters equal one half.",
          "একই দৈর্ঘ্য দুই চতুর্থাংশ: 2/4। দুই চতুর্থাংশ মানে এক অর্ধ।",
        ),
      },
      {
        target: "#frac-eighths",
        say: b(
          "The same length is four eighths: 4/8. So 1/2 = 2/4 = 4/8.",
          "একই দৈর্ঘ্য চার অষ্টমাংশ: 4/8। তাই 1/2 = 2/4 = 4/8।",
        ),
      },
      {
        target: "#frac-line",
        say: b(
          "Draw one straight line down the wall. Every bar ends at the same place.",
          "দেয়ালের নিচে একটি সোজা রেখা টানো। সব বার একই জায়গায় শেষ হয়।",
        ),
      },
    ],
    coach: coach({
      intro: b(
        "Look at the three bars, then use the line button to compare them.",
        "তিনটি বার দেখো, তারপর রেখা বোতাম দিয়ে তুলনা করো।",
      ),
      steps: [
        b(
          "Every bar is the same length. Only the number of parts changes.",
          "প্রতিটি বার সমান লম্বা। শুধু ভাগের সংখ্যা বদলায়।",
        ),
        b(
          "The top bar colours one of two parts: that is 1/2.",
          "ওপরের বারে দুই ভাগের এক ভাগ রং করা: এটি 1/2।",
        ),
        b(
          "The middle bar colours two of four parts: 2/4 = 1/2.",
          "মাঝের বারে চার ভাগের দুই ভাগ রং করা: 2/4 = 1/2।",
        ),
        b(
          "The bottom bar colours four of eight parts: 4/8 = 1/2.",
          "নিচের বারে আট ভাগের চার ভাগ রং করা: 4/8 = 1/2।",
        ),
      ],
      hints: [
        b(
          "Compare where each coloured bar ends.",
          "প্রতিটি রং করা বার কোথায় শেষ হয় দেখো।",
        ),
        b(
          "The line marks the same length for every bar.",
          "রেখাটি প্রতিটি বারের একই দৈর্ঘ্য চিহ্নিত করে।",
        ),
        b(
          "1/2, 2/4 and 4/8 are three names for one amount.",
          "1/2, 2/4 ও 4/8 একই পরিমাণের তিনটি নাম।",
        ),
      ],
      none: b("Look at the coloured bars first.", "আগে রং করা বারগুলো দেখো।"),
      good: b(
        "The bars line up. They are equivalent!",
        "বারগুলো মিলে গেছে। এগুলো সমতুল্য!",
      ),
      done: b(
        "You can now name the same amount in three ways.",
        "এখন একই পরিমাণ তিনভাবে বলতে পারো।",
      ),
      again: b(
        "Fold a paper strip in half, then in half again. The creases show quarters.",
        "কাগজের ফালি অর্ধেক, তারপর আবার অর্ধেক ভাঁজ করো। ভাঁজগুলো চতুর্থাংশ দেখায়।",
      ),
    }),
  },

  {
    id: "visual.pythagoras",
    slug: "next-visual-class-6-8",
    file: "next-visual-class-6-8.html",
    group: "class-6-8",
    kind: "VISUAL",
    cycle: 2,
    order: 10,
    type: "visual",
    scene: "pythagoras",
    defaultStyle: "robot",
    title: b("Pythagoras Squares", "পিথাগোরাসের বর্গ"),
    goal: b(
      "Move the sides and watch the two small squares fill the big square.",
      "বাহু সরিয়ে দেখো দুই ছোট বর্গ মিলে বড় বর্গ পূরণ করে।",
    ),
    concepts: ["M7", "M12"],
    ideas: ["C68-24", "C68-25"],
    steps: [
      {
        target: "#pyth-a",
        say: b(
          "This square sits on side a. Its area is a² = {a2}.",
          "এই বর্গটি a বাহুর উপর। এর ক্ষেত্রফল a² = {a2}।",
        ),
      },
      {
        target: "#pyth-b",
        say: b(
          "This square sits on side b. Its area is b² = {b2}.",
          "এই বর্গটি b বাহুর উপর। এর ক্ষেত্রফল b² = {b2}।",
        ),
      },
      {
        target: "#pyth-c",
        say: b(
          "The big square sits on the longest side c. Its area is c² = {c2}.",
          "বড় বর্গটি দীর্ঘতম বাহু c-এর উপর। এর ক্ষেত্রফল c² = {c2}।",
        ),
      },
      {
        target: "#pyth-eq",
        say: b(
          "{a2} + {b2} = {c2}. The two small areas always add to the big area.",
          "{a2} + {b2} = {c2}। দুই ছোট ক্ষেত্রফল সবসময় বড় ক্ষেত্রফল হয়।",
        ),
      },
    ],
    coach: coach({
      intro: b(
        "Change a and b. The square on c grows or shrinks to keep the rule true.",
        "a ও b বদলাও। নিয়ম সত্য রাখতে c-এর বর্গ বড়-ছোট হয়।",
      ),
      steps: [
        b(
          "The triangle has a right angle between a and b.",
          "a ও b-এর মধ্যে ত্রিভুজের একটি সমকোণ।",
        ),
        b("The square on a has area a².", "a-এর বর্গের ক্ষেত্রফল a²।"),
        b("The square on b has area b².", "b-এর বর্গের ক্ষেত্রফল b²।"),
        b(
          "Together they equal the square on c: a² + b² = c².",
          "একসাথে c-এর বর্গের সমান: a² + b² = c²।",
        ),
      ],
      hints: [
        b(
          "Count the grid squares inside each square.",
          "প্রতিটি বর্গের ভিতরের ঘর গুনো।",
        ),
        b(
          "Add the two small areas, then compare with the big one.",
          "দুই ছোট ক্ষেত্রফল যোগ করে বড়টির সাথে মেলাও।",
        ),
        b("The rule is a² + b² = c².", "নিয়মটি হলো a² + b² = c²।"),
      ],
      none: b("Move the sliders to build a triangle.", "ত্রিভুজ বানাতে স্লাইডার সরাও।"),
      good: b(
        "The areas match. The rule holds!",
        "ক্ষেত্রফল মিলে গেছে। নিয়ম সত্য!",
      ),
      done: b(
        "You have seen why a² + b² = c².",
        "কেন a² + b² = c² তা দেখে ফেলেছ।",
      ),
      again: b(
        "Imagine walking around the right angle: the two short paths together equal the long path's square.",
        "সমকোণের চারপাশে হাঁটার কথা ভাবো: দুই ছোট পথের বর্গ মিলে লম্বা পথের বর্গ হয়।",
      ),
    }),
  },

  {
    id: "visual.parabola-family",
    slug: "next-visual-class-9-10",
    file: "next-visual-class-9-10.html",
    group: "class-9-10",
    kind: "VISUAL",
    cycle: 2,
    order: 10,
    type: "visual",
    scene: "parabola",
    defaultStyle: "robot",
    title: b("Parabola Family", "প্যারাবোলা পরিবার"),
    goal: b(
      "Change a, h and k and watch the vertex, axis and roots move.",
      "a, h ও k বদলে দেখো শীর্ষবিন্দু, অক্ষ ও মূল কীভাবে সরে।",
    ),
    concepts: ["S9", "S2"],
    ideas: ["C910-04", "C910-06"],
    steps: [
      {
        target: "#par-curve",
        say: b(
          "This is y = a(x − h)² + k. Changing a makes the curve wider, narrower or flipped.",
          "এটি y = a(x − h)² + k। a বদলালে বক্ররেখা চওড়া, সরু বা উল্টে যায়।",
        ),
      },
      {
        target: "#par-vertex",
        say: b(
          "The vertex is ({h}, {k}). It is the turning point of the curve.",
          "শীর্ষবিন্দু ({h}, {k})। এটি বক্ররেখার মোড়।",
        ),
      },
      {
        target: "#par-axis",
        say: b(
          "The dashed line is the axis of symmetry: x = {h}.",
          "ড্যাশ রেখাটি প্রতিসাম্যের অক্ষ: x = {h}।",
        ),
      },
      {
        target: "#par-roots",
        say: b(
          "Where the curve crosses the x-axis, y = 0. Those are the roots.",
          "যেখানে বক্ররেখা x-অক্ষকে ছেদ করে, সেখানে y = 0। ওগুলোই মূল।",
        ),
      },
    ],
    coach: coach({
      intro: b(
        "Move a, h and k. What stays the same? What changes?",
        "a, h ও k সরাও। কী একই থাকে? কী বদলায়?",
      ),
      steps: [
        b("Vertex form: y = a(x − h)² + k.", "শীর্ষবিন্দু রূপ: y = a(x − h)² + k।"),
        b("h moves the curve left or right.", "h বক্ররেখাকে ডানে-বাঁয়ে সরায়।"),
        b("k moves the curve up or down.", "k বক্ররেখাকে ওপরে-নিচে সরায়।"),
        b(
          "a controls the width and the direction of opening.",
          "a নিয়ন্ত্রণ করে প্রস্থ ও খোলার দিক।",
        ),
      ],
      hints: [
        b(
          "Find the lowest or highest point: that is the vertex.",
          "সবচেয়ে নিচু বা উঁচু বিন্দু খোঁজো: সেটাই শীর্ষবিন্দু।",
        ),
        b(
          "The axis of symmetry passes through the vertex.",
          "প্রতিসাম্যের অক্ষ শীর্ষবিন্দু দিয়ে যায়।",
        ),
        b(
          "Set a = 0.5, then a = 2. Compare the widths.",
          "a = 0.5, তারপর a = 2 করো। প্রস্থ তুলনা করো।",
        ),
      ],
      none: b(
        "Move a slider to change the curve.",
        "বক্ররেখা বদলাতে একটি স্লাইডার সরাও।",
      ),
      good: b(
        "You found the vertex and the roots.",
        "তুমি শীর্ষবিন্দু ও মূল খুঁজে পেয়েছ।",
      ),
      done: b(
        "Vertex, axis and roots are connected. Nice exploring!",
        "শীর্ষবিন্দু, অক্ষ ও মূল সম্পর্কিত। চমৎকার অন্বেষণ!",
      ),
      again: b(
        "Build the curve in your head: start at (h, k), then step one right and a up.",
        "মনে মনে বক্ররেখা বানাও: (h, k) থেকে শুরু করে এক ডানে ও a ওপরে যাও।",
      ),
    }),
  },

  {
    id: "visual.secant-tangent",
    slug: "next-visual-class-11-12",
    file: "next-visual-class-11-12.html",
    group: "class-11-12",
    kind: "VISUAL",
    cycle: 2,
    order: 10,
    type: "visual",
    scene: "secant",
    defaultStyle: "robot",
    title: b("Secant to Tangent", "সিক্যান্ট থেকে স্পর্শক"),
    goal: b(
      "Slide h toward zero and watch the secant become the tangent.",
      "h-কে শূন্যের দিকে সরিয়ে দেখো সিক্যান্ট কীভাবে স্পর্শক হয়।",
    ),
    concepts: ["H7", "H10"],
    ideas: ["C1112-09", "C1112-10"],
    steps: [
      {
        target: "#sec-pointA",
        say: b(
          "Point A is fixed at x = {a}. We want the slope at A.",
          "A বিন্দু x = {a}-এ স্থির। আমরা A-তে ঢাল চাই।",
        ),
      },
      {
        target: "#sec-pointB",
        say: b(
          "Point B is h steps to the right. Move B closer to A.",
          "B বিন্দু h ধাপ ডানে। B-কে A-এর কাছে নাও।",
        ),
      },
      {
        target: "#sec-line",
        say: b(
          "The secant slope is (f(a + h) − f(a)) ÷ h. As h → 0 it becomes the tangent.",
          "সিক্যান্ট ঢাল = (f(a + h) − f(a)) ÷ h। h → 0 হলে এটি স্পর্শক হয়।",
        ),
      },
      {
        target: "#sec-table",
        say: b(
          "Watch the table: 2a + h gets closer and closer to {v}.",
          "ছক দেখো: 2a + h 점점 {v}-এর কাছে আসে।",
        ),
      },
    ],
    coach: coach({
      intro: b(
        "The curve is y = x². Move h and read the slope table.",
        "বক্ররেখা y = x²। h সরিয়ে ঢালের ছক পড়ো।",
      ),
      steps: [
        b(
          "Secant slope = (f(a + h) − f(a)) / h.",
          "সিক্যান্ট ঢাল = (f(a + h) − f(a)) / h।",
        ),
        b(
          "For y = x² this simplifies to 2a + h.",
          "y = x²-এর জন্য এটি সরল হয় 2a + h।",
        ),
        b("Let h shrink: 0.5, 0.1, 0.01.", "h ছোট করো: 0.5, 0.1, 0.01।"),
        b(
          "The limit as h → 0 is 2a, the derivative.",
          "h → 0 হলে সীমা 2a, যা অন্তরজ।",
        ),
      ],
      hints: [
        b("Read the last two rows of the table.", "ছকের শেষ দুই সারি পড়ো।"),
        b(
          "The smaller h is, the closer the slope is to a single number.",
          "h যত ছোট, ঢাল তত একটি নির্দিষ্ট সংখ্যার কাছে।",
        ),
        b("The limit is 2a. Here that is {v}.", "সীমা 2a। এখানে তা {v}।"),
      ],
      none: b("Move the h slider toward zero.", "h স্লাইডার শূন্যের দিকে সরাও।"),
      good: b("The secant has become the tangent.", "সিক্যান্ট এখন স্পর্শক হয়েছে।"),
      done: b(
        "You have seen a derivative being born.",
        "একটি অন্তরজ জন্মাতে দেখেছ।",
      ),
      again: b(
        "A camera zooming into a curve sees it as a straight line. That line is the tangent.",
        "ক্যামেরা বক্ররেখার কাছে জুম করলে সেটি সোজা রেখা দেখায়। সেই রেখাই স্পর্শক।",
      ),
    }),
  },
];
