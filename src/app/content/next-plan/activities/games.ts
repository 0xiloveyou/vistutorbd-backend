import type { GameActivity } from "../types";
import { b, coach } from "./helpers";

/**
 * CYCLE 1 — one game per group.
 *
 * Every game keeps Bolt on screen and uses the same loop from the folder 1
 * plan: MEET -> SEE -> TRY -> PLAY -> CHECK -> REWARD -> REVIEW.
 */
export const GAME_ACTIVITIES: GameActivity[] = [
  {
    id: "game.count-mangoes",
    slug: "next-game-play-nursery",
    file: "next-game-play-nursery.html",
    group: "play-nursery",
    kind: "GAME",
    cycle: 1,
    order: 10,
    type: "count",
    defaultStyle: "robot",
    title: b("Count the Mangoes", "আম গুনি"),
    goal: b(
      "Tap exactly the number of mangoes shown and put them in the basket.",
      "দেখানো সংখ্যার সমান আম ট্যাপ করে ঝুড়িতে রাখো।",
    ),
    concepts: ["N2", "N7"],
    ideas: ["PN-01", "PN-02"],
    rounds: [
      { target: 3, item: "🥭", itemName: b("mango", "আম") },
      { target: 5, item: "🥭", itemName: b("mango", "আম") },
      { target: 7, item: "🥭", itemName: b("mango", "আম") },
    ],
    coach: coach({
      intro: b(
        "The card says {a}. Tap {a} mangoes and put them in the basket.",
        "কার্ডে লেখা {a}। {a}টি আম ট্যাপ করে ঝুড়িতে রাখো।",
      ),
      steps: [
        b(
          "Look at the number card. It says {a}.",
          "সংখ্যার কার্ডটি দেখো। ওতে লেখা {a}।",
        ),
        b(
          "Tap one mango. I will count with you: one.",
          "একটি আমে ট্যাপ করো। আমি সাথে গুনব: এক।",
        ),
        b(
          "Tap a different mango each time. Do not tap the same one twice.",
          "প্রতিবার আলাদা আমে ট্যাপ করো। একই আমে দুবার ট্যাপ করো না।",
        ),
        b(
          "When the basket has {a} mangoes, press Check.",
          "ঝুড়িতে {a}টি আম হলে “যাচাই” চাপো।",
        ),
      ],
      hints: [
        b(
          "Point to each mango and say the number.",
          "প্রতিটি আমে আঙুল দিয়ে সংখ্যাটি বলো।",
        ),
        b(
          "The basket needs {a}. Count the mangoes already inside.",
          "ঝুড়িতে {a}টি লাগবে। ভিতরে থাকা আমগুলো গুনো।",
        ),
        b(
          "Tap one more mango, then count again.",
          "আরও একটি আমে ট্যাপ করো, তারপর আবার গুনো।",
        ),
      ],
      none: b(
        "The basket is empty. Tap a mango first.",
        "ঝুড়ি খালি। আগে একটি আমে ট্যাপ করো।",
      ),
      less: b(
        "The basket has {n}. We need {a}. Tap {d} more.",
        "ঝুড়িতে আছে {n}টি। দরকার {a}টি। আরও {d}টি ট্যাপ করো।",
      ),
      more: b(
        "The basket has {n}. We need {a}. Tap {d} to take them back.",
        "ঝুড়িতে আছে {n}টি। দরকার {a}টি। {d}টি ফিরিয়ে দাও।",
      ),
      good: b("Yes! {a} mangoes in the basket. ⭐", "হ্যাঁ! ঝুড়িতে {a}টি আম। ⭐"),
      done: b(
        "You counted every basket. Great counting!",
        "সব ঝুড়ি গুনে শেষ করেছ। চমৎকার গোনা!",
      ),
      again: b(
        "Let us count together: tap a mango and say one, tap the next and say two.",
        "একসাথে গুনি: একটি আমে ট্যাপ করে বলো এক, পরেরটিতে ট্যাপ করে বলো দুই।",
      ),
    }),
  },

  {
    id: "game.fraction-pizza",
    slug: "next-game-class-1-5",
    file: "next-game-class-1-5.html",
    group: "class-1-5",
    kind: "GAME",
    cycle: 1,
    order: 10,
    type: "fraction-pizza",
    defaultStyle: "robot",
    title: b("Fraction Pizza Shop", "ভগ্নাংশ পিৎজা শপ"),
    goal: b(
      "Read the customer order and colour exactly that fraction of the pizza.",
      "গ্রাহকের অর্ডার পড়ে পিৎজার ঠিক ততটুকু অংশ রং করো।",
    ),
    concepts: ["P8", "P11"],
    ideas: ["C15-15", "C15-18"],
    rounds: [
      { num: 1, den: 2 },
      { num: 1, den: 4 },
      { num: 3, den: 4 },
      { num: 2, den: 3 },
    ],
    coach: coach({
      intro: b(
        "The order is {a}/{b}. Tap {a} slices out of {b}.",
        "অর্ডার হলো {a}/{b}। {b}টি টুকরোর মধ্যে {a}টিতে ট্যাপ করো।",
      ),
      steps: [
        b(
          "The bottom number tells how many equal slices the whole pizza has: {b}.",
          "নিচের সংখ্যা বলে পুরো পিৎজা কয়টি সমান টুকরোয় কাটা: {b}টি।",
        ),
        b(
          "Here is our pizza, cut into {b} equal slices.",
          "এই যে পিৎজা, {b}টি সমান টুকরো।",
        ),
        b(
          "The top number tells how many slices to take: {a}. Colour {a} of them.",
          "ওপরের সংখ্যা বলে কয়টি টুকরো নিতে হবে: {a}টি। এর মধ্যে {a}টি রং করো।",
        ),
        b(
          "{a} out of {b} slices is the fraction {a}/{b}. Now press Check!",
          "{b}টির মধ্যে {a}টি মানে ভগ্নাংশ {a}/{b}। এবার “যাচাই” চাপো!",
        ),
      ],
      hints: [
        b(
          "Look at the bottom number. It is the total number of slices: {b}.",
          "নিচের সংখ্যা দেখো। এটাই মোট টুকরো: {b}।",
        ),
        b(
          "Now the top number: colour exactly {a} slices.",
          "এবার ওপরের সংখ্যা: ঠিক {a}টি টুকরো রং করো।",
        ),
        b(
          "Count the coloured slices. You need {a}.",
          "রং করা টুকরো গুনো। দরকার {a}টি।",
        ),
      ],
      none: b("Colour some slices first.", "আগে কয়েকটি টুকরো রং করো।"),
      less: b(
        "You coloured {n}. The order needs {a}. Colour {d} more.",
        "তুমি {n}টি রং করেছ। অর্ডারে লাগবে {a}টি। আরও {d}টি রং করো।",
      ),
      more: b(
        "You coloured {n}. The order needs {a}. Take {d} away.",
        "তুমি {n}টি রং করেছ। অর্ডারে লাগবে {a}টি। {d}টি কমাও।",
      ),
      good: b(
        "Perfect! {a}/{b} of the pizza. 🍕",
        "চমৎকার! পিৎজার {a}/{b} অংশ। 🍕",
      ),
      done: b(
        "All orders done! You earned {s} stars. 🎉",
        "সব অর্ডার শেষ! তুমি {s}টি তারা পেয়েছ। 🎉",
      ),
      again: b(
        "Think of a chocolate bar: the bottom number says how many pieces, the top says how many you eat.",
        "চকলেট বার ভাবো: নিচের সংখ্যা বলে কয়টি টুকরা, ওপরের সংখ্যা বলে কয়টি খাবে।",
      ),
    }),
  },

  {
    id: "game.integer-elevator",
    slug: "next-game-class-6-8",
    file: "next-game-class-6-8.html",
    group: "class-6-8",
    kind: "GAME",
    cycle: 1,
    order: 10,
    type: "integer-elevator",
    defaultStyle: "robot",
    title: b("Integer Elevator", "পূর্ণসংখ্যা লিফট"),
    goal: b(
      "Start on the given floor, move by the integer, and stop on the answer floor.",
      "নির্দিষ্ট তলায় শুরু করে পূর্ণসংখ্যা অনুযায়ী লিফট চালাও, উত্তর তলায় থামাও।",
    ),
    concepts: ["M2", "S1"],
    ideas: ["C68-01", "C68-19"],
    rounds: [
      { start: 2, move: -5 },
      { start: -3, move: 7 },
      { start: 4, move: -9 },
      { start: -6, move: 8 },
    ],
    coach: coach({
      intro: b(
        "The lift is on floor {st}. Move {m} floors. Where does it stop?",
        "লিফট এখন {st} তলায়। {m} তলা চলো। কোথায় থামবে?",
      ),
      steps: [
        b("Start at floor {st}.", "শুরু করো {st} তলায়।"),
        b(
          "A negative move means go down. A positive move means go up.",
          "ঋণাত্মক মানে নিচে যাও। ধনাত্মক মানে ওপরে যাও।",
        ),
        b("Count one floor for each step.", "প্রতিটি ধাপে এক তলা করে গুনো।"),
        b(
          "Stop on floor {t}. Then press Check.",
          "থামো {t} তলায়। তারপর “যাচাই” চাপো।",
        ),
      ],
      hints: [
        b(
          "Down means subtract. Up means add.",
          "নিচে মানে বিয়োগ। ওপরে মানে যোগ।",
        ),
        b(
          "Start at {st} and count {k} floors {dir}.",
          "{st} থেকে শুরু করে {k} তলা {dir} গুনো।",
        ),
        b(
          "The answer is floor {t}. Move the lift there.",
          "উত্তর {t} তলা। লিফট সেখানে নাও।",
        ),
      ],
      none: b(
        "Move the lift with the Up and Down buttons.",
        "“ওপরে” ও “নিচে” বোতাম দিয়ে লিফট চালাও।",
      ),
      less: b(
        "The lift is on floor {n}. The answer is {t}.",
        "লিফট আছে {n} তলায়। উত্তর {t}।",
      ),
      more: b(
        "The lift is on floor {n}. The answer is {t}.",
        "লিফট আছে {n} তলায়। উত্তর {t}।",
      ),
      good: b("Yes! {st} {m} = {t}. ⭐", "হ্যাঁ! {st} {m} = {t}। ⭐"),
      done: b(
        "All lifts parked. Integer moves complete!",
        "সব লিফট থামানো হয়েছে। পূর্ণসংখ্যার চলা শেষ!",
      ),
      again: b(
        "Picture a lift: floor 0 is the ground. Floor -1 is one step below, floor 1 is one step above.",
        "লিফট ভাবো: ০ হলো মাটি। -১ এক ধাপ নিচে, ১ এক ধাপ ওপরে।",
      ),
    }),
  },

  {
    id: "game.quadratic-hoops",
    slug: "next-game-class-9-10",
    file: "next-game-class-9-10.html",
    group: "class-9-10",
    kind: "GAME",
    cycle: 1,
    order: 10,
    type: "quadratic-hoops",
    defaultStyle: "robot",
    title: b("Hoop Shot Parabolas", "প্যারাবোলা হুপ শট"),
    goal: b(
      "Tune a, h and k so the parabola passes through the hoop.",
      "a, h ও k বদলে প্যারাবোলা হুপের মধ্য দিয়ে যাওয়াও।",
    ),
    concepts: ["S9", "S2"],
    ideas: ["C910-04", "C910-06"],
    rounds: [
      { a: 1, h: 2, k: 1, hoop: { x: 3, y: 2 } },
      { a: -1, h: -1, k: 4, hoop: { x: 0, y: 3 } },
      { a: 0.5, h: 3, k: -1, hoop: { x: 5, y: 1 } },
      { a: 2, h: -2, k: -2, hoop: { x: -1, y: 0 } },
    ],
    coach: coach({
      intro: b(
        "Set a, h and k so the ball flies through the hoop.",
        "a, h ও k এমনভাবে বসাও যেন বলটি হুপের ভিতর দিয়ে যায়।",
      ),
      steps: [
        b("The curve is y = a(x − h)² + k.", "বক্ররেখা: y = a(x − h)² + k।"),
        b(
          "h moves the curve left or right. We need h = {h}.",
          "h বক্ররেখাকে ডানে-বাঁয়ে সরায়। দরকার h = {h}।",
        ),
        b(
          "k moves it up or down. We need k = {k}.",
          "k ওপরে-নিচে সরায়। দরকার k = {k}।",
        ),
        b(
          "a makes it narrow or wide, and flips it. Aim through the hoop at ({x}, {y}).",
          "a বক্ররেখাকে সরু-চওড়া করে, উল্টে দেয়। হুপ ({x}, {y}) দিয়ে যেতে হবে।",
        ),
      ],
      hints: [
        b(
          "First match the vertex: h = {h}, k = {k}.",
          "আগে শীর্ষবিন্দু মেলাও: h = {h}, k = {k}।",
        ),
        b(
          "Then set a = {a}. A negative a opens downward.",
          "তারপর a = {a} বসাও। ঋণাত্মক a নিচের দিকে খোলে।",
        ),
        b(
          "Move one slider slowly and watch the hoop.",
          "একটি স্লাইডার ধীরে সরিয়ে হুপ দেখো।",
        ),
      ],
      none: b("Move the sliders to start aiming.", "লক্ষ্য করতে স্লাইডার সরাও।"),
      good: b(
        "Swish! The curve passes through the hoop. ⭐",
        "সুইশ! বক্ররেখা হুপের ভিতর দিয়ে গেছে। ⭐",
      ),
      done: b(
        "Every hoop scored. Parabola champion!",
        "সব হুপে স্কোর! প্যারাবোলা চ্যাম্পিয়ন!",
      ),
      again: b(
        "Start at the vertex (h, k). From there, a tells you how quickly the curve rises.",
        "শীর্ষবিন্দু (h, k) থেকে শুরু করো। সেখান থেকে a বলে বক্ররেখা কত দ্রুত ওঠে।",
      ),
    }),
  },

  {
    id: "game.secant-slope",
    slug: "next-game-class-11-12",
    file: "next-game-class-11-12.html",
    group: "class-11-12",
    kind: "GAME",
    cycle: 1,
    order: 10,
    type: "secant-slope",
    defaultStyle: "robot",
    title: b("Slope Tracker", "ঢাল ট্র্যাকার"),
    goal: b(
      "Slide B toward A and find the limit of the secant slope.",
      "B-কে A-এর দিকে সরিয়ে সিক্যান্ট ঢালের সীমা বের করো।",
    ),
    concepts: ["H7", "H10"],
    ideas: ["C1112-09", "C1112-10"],
    rounds: [{ a: 1 }, { a: 2 }, { a: -1 }, { a: 3 }],
    coach: coach({
      intro: b(
        "Slide B toward A. What number does the secant slope approach?",
        "B-কে A-এর দিকে সরাও। সিক্যান্ট ঢাল কোন সংখ্যার দিকে এগোয়?",
      ),
      steps: [
        b(
          "A is at x = {a}. B is at x = {a} + h.",
          "A আছে x = {a}-এ। B আছে x = {a} + h-এ।",
        ),
        b(
          "The secant slope is ((a + h)² − a²) ÷ h = 2a + h.",
          "সিক্যান্ট ঢাল = ((a + h)² − a²) ÷ h = 2a + h।",
        ),
        b(
          "As h gets smaller, the slope gets closer to {v}.",
          "h যত ছোট হয়, ঢাল তত {v}-এর কাছে আসে।",
        ),
        b(
          "That limit is the derivative: f′({a}) = {v}.",
          "সেই সীমাই অন্তরজ: f′({a}) = {v}।",
        ),
      ],
      hints: [
        b(
          "Look at the slope table when h = 0.1 and h = 0.01.",
          "ছকে h = ০.১ ও h = ০.০১ হলে ঢাল দেখো।",
        ),
        b("The secant slope is {sl} right now.", "এই মুহূর্তে সিক্যান্ট ঢাল {sl}।"),
        b("The limit is {v}.", "সীমা হলো {v}।"),
      ],
      none: b(
        "Press Make tangent or slide h closer to zero.",
        "“স্পর্শক বানাও” চাপো বা h-কে শূন্যের কাছে নাও।",
      ),
      good: b("Exactly! The limit is {v}. ⭐", "ঠিক! সীমা {v}। ⭐"),
      done: b(
        "All four tangents found. Calculus unlocked!",
        "চারটি স্পর্শকই পেয়েছ। ক্যালকুলাস উন্মুক্ত!",
      ),
      again: b(
        "A secant uses two points. A tangent uses one. The limit is the bridge between them.",
        "সিক্যান্টে দুই বিন্দু লাগে, স্পর্শকে এক বিন্দু। সীমা হলো তাদের সেতু।",
      ),
    }),
  },
];
