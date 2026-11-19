import type { QuestionActivity } from "../types";
import { b, coach } from "./helpers";

/**
 * CYCLE 3 — one question set per group.
 *
 * Four questions per set move through the three question types from folder 2:
 * Recall ("what is..."), Reasoning ("why...") and Reality ("where..."). The
 * companion gives the method on "Show me how" and a worked explanation after
 * each answer.
 */
export const QUESTION_ACTIVITIES: QuestionActivity[] = [
  {
    id: "questions.play",
    slug: "next-question-play-nursery",
    file: "next-question-play-nursery.html",
    group: "play-nursery",
    kind: "QUESTION",
    cycle: 3,
    order: 20,
    type: "question-set",
    defaultStyle: "robot",
    title: b(
      "Play Quiz: More, Shapes and Patterns",
      "প্লে কুইজ: বেশি, আকৃতি ও প্যাটার্ন",
    ),
    goal: b(
      "Answer four quick questions. Tap the answer you think is right.",
      "চারটি দ্রুত প্রশ্নের উত্তর দাও। যেটি ঠিক মনে হয় সেটিতে ট্যাপ করো।",
    ),
    concepts: ["N1", "N3", "N5"],
    ideas: ["PN-04", "PN-14", "PN-15"],
    coach: coach({
      intro: b(
        "Look at the picture, then tap one answer.",
        "ছবি দেখো, তারপর একটি উত্তরে ট্যাপ করো।",
      ),
      steps: [
        b("Read or listen to the question first.", "আগে প্রশ্নটি পড়ো বা শোনো।"),
        b("Look at the picture carefully.", "ছবিটি মন দিয়ে দেখো।"),
        b(
          "Tap the answer that fits best.",
          "যে উত্তরটি সবচেয়ে মানানসই সেটিতে ট্যাপ করো।",
        ),
        b("Press Check to hear how you did.", "“যাচাই” চেপে ফল জানো।"),
      ],
      hints: [
        b("Count or compare slowly.", "ধীরে গুনো বা তুলনা করো।"),
        b(
          "Ask: which one is bigger, rounder or next in the pattern?",
          "ভাবো: কোনটি বড়, গোল বা প্যাটার্নে পরেরটি?",
        ),
        b("Tap one answer, then press Check.", "একটি উত্তরে ট্যাপ করে “যাচাই” চাপো।"),
      ],
      none: b("Tap an answer first.", "আগে একটি উত্তরে ট্যাপ করো।"),
      good: b("Yes! That is right. ⭐", "হ্যাঁ! এটাই ঠিক। ⭐"),
      done: b(
        "Four questions finished. Super star!",
        "চারটি প্রশ্ন শেষ। দুর্দান্ত তারা!",
      ),
      again: b(
        "Let us look together. Point to each thing and say what you see.",
        "একসাথে দেখি। প্রতিটি জিনিসে আঙুল দিয়ে বলো কী দেখছ।",
      ),
    }),
    questions: [
      {
        id: "q1",
        prompt: b("Which group has more apples?", "কোন দলে বেশি আপেল আছে?"),
        hint: b("Count both groups: 3 and 5.", "দুই দলই গুনো: ৩ ও ৫।"),
        options: [
          { label: b("The group of 3", "৩টির দল") },
          { label: b("The group of 5", "৫টির দল"), correct: true },
          { label: b("They are the same", "দুটি সমান") },
        ],
        explain: b(
          "Five is more than three, so the group of 5 has more.",
          "পাঁচ তিনের চেয়ে বেশি, তাই ৫টির দলে বেশি।",
        ),
        scene: "count",
        sceneData: { left: 3, right: 5, item: "🍎" },
      },
      {
        id: "q2",
        prompt: b(
          "Which shape is round with no corners?",
          "কোন আকৃতি গোল এবং যার কোনো কোণ নেই?",
        ),
        hint: b("Look for the shape like a wheel.", "চাকার মতো আকৃতিটি খোঁজো।"),
        options: [
          { label: b("Circle", "বৃত্ত"), correct: true },
          { label: b("Square", "বর্গ") },
          { label: b("Triangle", "ত্রিভুজ") },
        ],
        explain: b(
          "A circle is round and has no corners.",
          "বৃত্ত গোল এবং এর কোনো কোণ নেই।",
        ),
        scene: "none",
      },
      {
        id: "q3",
        prompt: b(
          "Clap, clap, stomp. Clap, clap, ___?",
          "তালি, তালি, পা। তালি, তালি, ___?",
        ),
        hint: b(
          "The pattern repeats: clap, clap, stomp.",
          "প্যাটার্নটি পুনরাবৃত্তি হয়: তালি, তালি, পা।",
        ),
        options: [
          { label: b("Stomp", "পা"), correct: true },
          { label: b("Clap", "তালি") },
          { label: b("Both", "দুটোই") },
        ],
        explain: b(
          "The pattern repeats every three beats, so the next beat is stomp.",
          "প্যাটার্নটি প্রতি তিন তালে পুনরাবৃত্তি হয়, তাই পরেরটি পা।",
        ),
        scene: "none",
      },
      {
        id: "q4",
        prompt: b("Which one is the smallest?", "কোনটি সবচেয়ে ছোট?"),
        hint: b(
          "Compare the ant, the dog and the elephant.",
          "পিঁপড়া, কুকুর ও হাতিকে তুলনা করো।",
        ),
        options: [
          { label: b("🐜 Ant", "🐜 পিঁপড়া"), correct: true },
          { label: b("🐕 Dog", "🐕 কুকুর") },
          { label: b("🐘 Elephant", "🐘 হাতি") },
        ],
        explain: b(
          "The ant is the smallest of the three.",
          "তিনটির মধ্যে পিঁপড়া সবচেয়ে ছোট।",
        ),
        scene: "none",
      },
    ],
  },

  {
    id: "questions.class-1-5",
    slug: "next-question-class-1-5",
    file: "next-question-class-1-5.html",
    group: "class-1-5",
    kind: "QUESTION",
    cycle: 3,
    order: 20,
    type: "question-set",
    defaultStyle: "robot",
    title: b(
      "Class 1–5 Check: Place Value and Fractions",
      "শ্রেণি ১–৫ যাচাই: স্থানীয় মান ও ভগ্নাংশ",
    ),
    goal: b(
      "Four quick checks on place value, fractions, tables and shapes.",
      "স্থানীয় মান, ভগ্নাংশ, নামতা ও আকৃতি নিয়ে চারটি দ্রুত যাচাই।",
    ),
    concepts: ["P2", "P8", "P11"],
    ideas: ["C15-02", "C15-17", "C15-33"],
    coach: coach({
      intro: b(
        "Read each question, then choose one answer.",
        "প্রতিটি প্রশ্ন পড়ে একটি উত্তর বেছে নাও।",
      ),
      steps: [
        b(
          "Break the number into tens and ones.",
          "সংখ্যাটিকে দশক ও এককে ভাগ করো।",
        ),
        b(
          "For fractions, compare the same denominators first.",
          "ভগ্নাংশে আগে একই হর তুলনা করো।",
        ),
        b(
          "For a missing factor, use the inverse operation.",
          "অজানা গুণনীয়কের জন্য বিপরীত প্রক্রিয়া ব্যবহার করো।",
        ),
        b(
          "For shapes, count sides and right angles.",
          "আকৃতিতে বাহু ও সমকোণ গুনো।",
        ),
      ],
      hints: [
        b(
          "Write what you know, then what you need.",
          "যা জানো লেখো, তারপর যা দরকার।",
        ),
        b(
          "Use a drawing or a number line if it helps.",
          "সাহায্য হলে আঁকো বা সংখ্যারেখা ব্যবহার করো।",
        ),
        b(
          "Check by doing the inverse: 7 × 6 should give 42.",
          "উল্টো করে যাচাই করো: 7 × 6 = 42 হওয়া উচিত।",
        ),
      ],
      none: b("Choose an answer first.", "আগে একটি উত্তর বেছে নাও।"),
      good: b("Correct! ⭐", "সঠিক! ⭐"),
      done: b("Four checks complete. Keep going!", "চারটি যাচাই শেষ। চালিয়ে যাও!"),
      again: b(
        "Let us slow down. Write the number in a place-value table: hundreds, tens, ones.",
        "ধীরে করি। সংখ্যাটি স্থানীয় মানের ছকে লেখো: শতক, দশক, একক।",
      ),
    }),
    questions: [
      {
        id: "q1",
        prompt: b(
          "47 has how many tens and ones?",
          "৪৭-এ কত দশক ও কত একক আছে?",
        ),
        hint: b(
          "The 4 is in the tens place, the 7 is in the ones place.",
          "৪ আছে দশকের ঘরে, ৭ আছে এককের ঘরে।",
        ),
        options: [
          { label: b("4 tens and 7 ones", "৪ দশক ও ৭ একক"), correct: true },
          { label: b("7 tens and 4 ones", "৭ দশক ও ৪ একক") },
          { label: b("4 tens and 0 ones", "৪ দশক ও ০ একক") },
        ],
        explain: b(
          "47 = 40 + 7 = 4 tens + 7 ones.",
          "৪৭ = ৪০ + ৭ = ৪ দশক + ৭ একক।",
        ),
        scene: "bar",
        sceneData: { value: 47, tens: 4, ones: 7 },
      },
      {
        id: "q2",
        prompt: b("Which is greater: 3/4 or 2/4?", "কোনটি বড়: ৩/৪ নাকি ২/৪?"),
        hint: b(
          "The denominators are the same, so compare the numerators.",
          "হর একই, তাই লব তুলনা করো।",
        ),
        options: [
          { label: b("3/4", "৩/৪"), correct: true },
          { label: b("2/4", "২/৪") },
          { label: b("They are equal", "দুটি সমান") },
        ],
        explain: b(
          "With the same denominator, 3 parts are more than 2 parts.",
          "একই হরে ৩ অংশ ২ অংশের চেয়ে বেশি।",
        ),
        scene: "fraction",
        sceneData: { numA: 3, numB: 2, den: 4 },
      },
      {
        id: "q3",
        prompt: b(
          "6 × ___ = 42. What is the missing number?",
          "৬ × ___ = ৪২। অজানা সংখ্যাটি কত?",
        ),
        hint: b("Divide 42 by 6.", "৪২-কে ৬ দিয়ে ভাগ করো।"),
        options: [
          { label: b("7", "৭"), correct: true },
          { label: b("6", "৬") },
          { label: b("8", "৮") },
        ],
        explain: b("42 ÷ 6 = 7, so 6 × 7 = 42.", "৪২ ÷ ৬ = ৭, তাই ৬ × ৭ = ৪২।"),
        scene: "none",
      },
      {
        id: "q4",
        prompt: b(
          "A shape has 4 equal sides and 4 right angles. What is it?",
          "একটি আকৃতির ৪টি সমান বাহু ও ৪টি সমকোণ। এটি কী?",
        ),
        hint: b(
          "All four sides are equal, not just opposite sides.",
          "চারটি বাহুই সমান, শুধু বিপরীত বাহু নয়।",
        ),
        options: [
          { label: b("Square", "বর্গ"), correct: true },
          { label: b("Rectangle", "আয়তক্ষেত্র") },
          { label: b("Triangle", "ত্রিভুজ") },
        ],
        explain: b(
          "A square has 4 equal sides and 4 right angles.",
          "বর্গের ৪টি সমান বাহু ও ৪টি সমকোণ থাকে।",
        ),
        scene: "none",
      },
    ],
  },

  {
    id: "questions.class-6-8",
    slug: "next-question-class-6-8",
    file: "next-question-class-6-8.html",
    group: "class-6-8",
    kind: "QUESTION",
    cycle: 3,
    order: 20,
    type: "question-set",
    defaultStyle: "robot",
    title: b(
      "Class 6–8 Check: LCM, Equations and Percent",
      "শ্রেণি ৬–৮ যাচাই: লসাগু, সমীকরণ ও শতাংশ",
    ),
    goal: b(
      "Four checks on number theory, algebra, percentage and geometry.",
      "সংখ্যাতত্ত্ব, বীজগণিত, শতাংশ ও জ্যামিতি নিয়ে চারটি যাচাই।",
    ),
    concepts: ["M1", "M5", "M8"],
    ideas: ["C68-04", "C68-13", "C68-11"],
    coach: coach({
      intro: b(
        "Show the working in your head, then choose the answer.",
        "মনে মনে কাজটি করে উত্তর বেছে নাও।",
      ),
      steps: [
        b(
          "For LCM, list multiples of both numbers.",
          "লসাগুর জন্য দুই সংখ্যার গুণিতক লেখো।",
        ),
        b(
          "For an equation, do the same operation to both sides.",
          "সমীকরণে দুই পাশে একই কাজ করো।",
        ),
        b(
          "For a discount, find 15% and subtract it.",
          "ছাড়ে ১৫% বের করে বিয়োগ করো।",
        ),
        b(
          "For a triangle, the two shorter sides must add to more than the longest.",
          "ত্রিভুজে দুই ছোট বাহুর যোগফল দীর্ঘতম বাহুর চেয়ে বেশি হতে হবে।",
        ),
      ],
      hints: [
        b("Write the first five multiples.", "প্রথম পাঁচটি গুণিতক লেখো।"),
        b(
          "Undo the subtraction before undoing the multiplication.",
          "গুণের আগে বিয়োগটি উল্টাও।",
        ),
        b(
          "10% of 800 is 80. Half of that is 5%.",
          "৮০০-এর ১০% হলো ৮০। এর অর্ধেক ৫%।",
        ),
      ],
      none: b("Choose an answer first.", "আগে একটি উত্তর বেছে নাও।"),
      good: b(
        "Correct! Show that working again. ⭐",
        "সঠিক! কাজটি আবার দেখাও। ⭐",
      ),
      done: b("Four checks complete. Strong work!", "চারটি যাচাই শেষ। দৃঢ় কাজ!"),
      again: b(
        "Let us use a table: what changes, what stays the same, and what is the question asking?",
        "ছক ব্যবহার করি: কী বদলায়, কী একই থাকে, প্রশ্নটি কী চাইছে?",
      ),
    }),
    questions: [
      {
        id: "q1",
        prompt: b("What is the LCM of 6 and 8?", "৬ ও ৮-এর লসাগু কত?"),
        hint: b(
          "Multiples of 6: 6, 12, 18, 24. Multiples of 8: 8, 16, 24.",
          "৬-এর গুণিতক: ৬, ১২, ১৮, ২৪। ৮-এর: ৮, ১৬, ২৪।",
        ),
        options: [
          { label: b("24", "২৪"), correct: true },
          { label: b("48", "৪৮") },
          { label: b("12", "১২") },
        ],
        explain: b(
          "24 is the smallest number in both lists of multiples.",
          "২৪ দুই তালিকারই সবচেয়ে ছোট সাধারণ গুণিতক।",
        ),
        scene: "none",
      },
      {
        id: "q2",
        prompt: b("Solve 3x − 7 = 11.", "সমাধান করো: 3x − 7 = 11।"),
        hint: b(
          "Add 7 to both sides, then divide by 3.",
          "দুই পাশে ৭ যোগ করো, তারপর ৩ দিয়ে ভাগ করো।",
        ),
        options: [
          { label: b("x = 6", "x = ৬"), correct: true },
          { label: b("x = 4", "x = ৪") },
          { label: b("x = 18", "x = ১৮") },
        ],
        explain: b(
          "3x = 18, so x = 6. Check: 3(6) − 7 = 11.",
          "3x = ১৮, তাই x = ৬। যাচাই: 3(6) − 7 = ১১।",
        ),
        scene: "none",
      },
      {
        id: "q3",
        prompt: b(
          "A shirt costs 800 taka. With 15% off, what is the price?",
          "শার্টের দাম ৮০০ টাকা। ১৫% ছাড়ে দাম কত?",
        ),
        hint: b("15% of 800 = 120.", "৮০০-এর ১৫% = ১২০।"),
        options: [
          { label: b("680 taka", "৬৮০ টাকা"), correct: true },
          { label: b("120 taka", "১২০ টাকা") },
          { label: b("785 taka", "৭৮৫ টাকা") },
        ],
        explain: b("800 − 120 = 680 taka.", "৮০০ − ১২০ = ৬৮০ টাকা।"),
        scene: "bar",
        sceneData: { value: 800, discount: 15 },
      },
      {
        id: "q4",
        prompt: b(
          "Can sides 3, 4 and 8 form a triangle?",
          "৩, ৪ ও ৮ বাহু দিয়ে ত্রিভুজ তৈরি হয়?",
        ),
        hint: b(
          "Check whether 3 + 4 is greater than 8.",
          "দেখো ৩ + ৪ কি ৮-এর চেয়ে বড়।",
        ),
        options: [
          {
            label: b("No, because 3 + 4 < 8", "না, কারণ ৩ + ৪ < ৮"),
            correct: true,
          },
          { label: b("Yes, always", "হ্যাঁ, সবসময়") },
          { label: b("Only if it is right-angled", "শুধু সমকোণী হলে") },
        ],
        explain: b(
          "The two shorter sides must add to more than the longest side. 7 is not greater than 8.",
          "দুই ছোট বাহুর যোগফল দীর্ঘতম বাহুর চেয়ে বেশি হতে হবে। ৭, ৮-এর চেয়ে বড় নয়।",
        ),
        scene: "none",
      },
    ],
  },

  {
    id: "questions.class-9-10",
    slug: "next-question-class-9-10",
    file: "next-question-class-9-10.html",
    group: "class-9-10",
    kind: "QUESTION",
    cycle: 3,
    order: 20,
    type: "question-set",
    defaultStyle: "robot",
    title: b(
      "Class 9–10 Check: Roots, Sequences and Trig",
      "শ্রেণি ৯–১০ যাচাই: মূল, ধারা ও ত্রিকোণমিতি",
    ),
    goal: b(
      "Four exam-style checks on quadratics, AP, trigonometry and probability.",
      "দ্বিঘাত, সমান্তর ধারা, ত্রিকোণমিতি ও সম্ভাব্যতা নিয়ে চারটি পরীক্ষার মতো যাচাই।",
    ),
    concepts: ["S9", "S10", "S12", "S15"],
    ideas: ["C910-04", "C910-09", "C910-17", "C910-26"],
    coach: coach({
      intro: b(
        "Work it out, then choose the matching answer.",
        "সমাধান করে মিলে যাওয়া উত্তর বেছে নাও।",
      ),
      steps: [
        b(
          "For roots, factorise or use the quadratic formula.",
          "মূলের জন্য উৎপাদকে বিশ্লেষণ করো বা সূত্র ব্যবহার করো।",
        ),
        b("For an AP, use aₙ = a + (n − 1)d.", "সমান্তর ধারায় aₙ = a + (n − 1)d।"),
        b("For sin, use opposite ÷ hypotenuse.", "sin-এর জন্য লম্ব ÷ অতিভুজ।"),
        b(
          "For two draws without replacement, multiply the changing probabilities.",
          "প্রতিস্থাপন ছাড়া দুইবার নিলে পরিবর্তিত সম্ভাবনা গুণ করো।",
        ),
      ],
      hints: [
        b(
          "Write the formula before substituting numbers.",
          "সংখ্যা বসানোর আগে সূত্র লেখো।",
        ),
        b(
          "Check the units and the order of operations.",
          "একক ও ক্রম ঠিক আছে কি না দেখো।",
        ),
        b(
          "For probability, list the denominator first.",
          "সম্ভাব্যতায় আগে হর লেখো।",
        ),
      ],
      none: b("Choose an answer first.", "আগে একটি উত্তর বেছে নাও।"),
      good: b(
        "Correct! The method matters as much as the answer. ⭐",
        "সঠিক! উত্তর যতটা গুরুত্বপূর্ণ, পদ্ধতিও ততটা। ⭐",
      ),
      done: b(
        "Four checks complete. Exam-ready thinking!",
        "চারটি যাচাই শেষ। পরীক্ষার জন্য প্রস্তুত!",
      ),
      again: b(
        "Let us label what is given, what is asked, and the formula that connects them.",
        "যা দেওয়া আছে, যা চাওয়া হয়েছে এবং যে সূত্রে তারা যুক্ত — সব লেবেল করি।",
      ),
    }),
    questions: [
      {
        id: "q1",
        prompt: b(
          "What are the roots of x² − 5x + 6 = 0?",
          "x² − 5x + 6 = 0-এর মূল কী?",
        ),
        hint: b(
          "Find two numbers that multiply to 6 and add to −5.",
          "দুই সংখ্যা খোঁজো যাদের গুণফল ৬ ও যোগফল −৫।",
        ),
        options: [
          { label: b("2 and 3", "২ ও ৩"), correct: true },
          { label: b("−2 and −3", "−২ ও −৩") },
          { label: b("1 and 6", "১ ও ৬") },
        ],
        explain: b(
          "x² − 5x + 6 = (x − 2)(x − 3), so x = 2 or x = 3.",
          "x² − 5x + 6 = (x − 2)(x − 3), তাই x = ২ বা x = ৩।",
        ),
        scene: "graph",
        sceneData: { type: "roots", a: 1, b: -5, c: 6 },
      },
      {
        id: "q2",
        prompt: b(
          "Find the 20th term of 5, 9, 13, ...",
          "৫, ৯, ১৩, ... ধারার ২০তম পদ কত?",
        ),
        hint: b("a = 5, d = 4, n = 20.", "a = ৫, d = ৪, n = ২০।"),
        options: [
          { label: b("81", "৮১"), correct: true },
          { label: b("80", "৮০") },
          { label: b("85", "৮৫") },
        ],
        explain: b(
          "aₙ = 5 + 19 × 4 = 5 + 76 = 81.",
          "aₙ = ৫ + ১৯ × ৪ = ৫ + ৭৬ = ৮১।",
        ),
        scene: "none",
      },
      {
        id: "q3",
        prompt: b(
          "In a right triangle, opposite = 5 and hypotenuse = 13. What is sin θ?",
          "সমকোণী ত্রিভুজে লম্ব = ৫, অতিভুজ = ১৩। sin θ কত?",
        ),
        hint: b("sin θ = opposite ÷ hypotenuse.", "sin θ = লম্ব ÷ অতিভুজ।"),
        options: [
          { label: b("5/13", "৫/১৩"), correct: true },
          { label: b("12/13", "১২/১৩") },
          { label: b("5/12", "৫/১২") },
        ],
        explain: b(
          "sin θ = 5/13. The missing side is 12, so cos θ = 12/13.",
          "sin θ = ৫/১৩। অনুপস্থিত বাহু ১২, তাই cos θ = ১২/১৩।",
        ),
        scene: "none",
      },
      {
        id: "q4",
        prompt: b(
          "A bag has 3 red and 2 blue balls. Two are drawn without replacement. P(both red)?",
          "ব্যাগে ৩ লাল ও ২ নীল বল। প্রতিস্থাপন ছাড়া দুটি তোলা হলো। P(দুটোই লাল)?",
        ),
        hint: b(
          "First draw: 3/5. Second draw after one red is gone: 2/4.",
          "প্রথম টান: ৩/৫। একটি লাল যাওয়ার পর দ্বিতীয়: ২/৪।",
        ),
        options: [
          { label: b("3/10", "৩/১০"), correct: true },
          { label: b("9/25", "৯/২৫") },
          { label: b("2/5", "২/৫") },
        ],
        explain: b(
          "P = (3/5) × (2/4) = 6/20 = 3/10.",
          "P = (৩/৫) × (২/৪) = ৬/২০ = ৩/১০।",
        ),
        scene: "none",
      },
    ],
  },

  {
    id: "questions.class-11-12",
    slug: "next-question-class-11-12",
    file: "next-question-class-11-12.html",
    group: "class-11-12",
    kind: "QUESTION",
    cycle: 3,
    order: 20,
    type: "question-set",
    defaultStyle: "robot",
    title: b(
      "Class 11–12 Check: Calculus, Matrices and Domains",
      "শ্রেণি ১১–১২ যাচাই: ক্যালকুলাস, ম্যাট্রিক্স ও ডোমেইন",
    ),
    goal: b(
      "Four higher-math checks on derivatives, integrals, determinants and domains.",
      "অন্তরজ, যোগজ, নির্ধারক ও ডোমেইন নিয়ে চারটি উচ্চতর গণিত যাচাই।",
    ),
    concepts: ["H2", "H10", "H12", "H15"],
    ideas: ["C1112-10", "C1112-12", "C1112-18", "C1112-03"],
    coach: coach({
      intro: b(
        "Choose the exact answer. Equivalent forms are accepted in class.",
        "সঠিক উত্তর বেছে নাও। শ্রেণিতে সমতুল্য রূপও গ্রহণযোগ্য।",
      ),
      steps: [
        b(
          "For a product, use the product rule: (uv)′ = u′v + uv′.",
          "গুণফলে গুণফল নিয়ম: (uv)′ = u′v + uv′।",
        ),
        b(
          "For a definite integral, integrate then substitute the limits.",
          "নির্দিষ্ট যোগজে আগে যোগজ করে সীমা বসাও।",
        ),
        b("For a 2×2 determinant, ad − bc.", "২×২ নির্ধারকে ad − bc।"),
        b(
          "For a square root domain, the inside must be zero or positive.",
          "বর্গমূলের ডোমেইনে ভিতরের রাশি শূন্য বা ধনাত্মক হতে হবে।",
        ),
      ],
      hints: [
        b("Name the rule before you calculate.", "হিসাবের আগে নিয়মের নাম বলো।"),
        b(
          "Check the sign: a determinant can be negative.",
          "চিহ্ন দেখো: নির্ধারক ঋণাত্মক হতে পারে।",
        ),
        b(
          "For the domain, solve 4 − x² ≥ 0.",
          "ডোমেইনের জন্য 4 − x² ≥ 0 সমাধান করো।",
        ),
      ],
      none: b("Choose an answer first.", "আগে একটি উত্তর বেছে নাও।"),
      good: b("Exactly right. ⭐", "একদম ঠিক। ⭐"),
      done: b(
        "Four checks complete. Higher-math ready!",
        "চারটি যাচাই শেষ। উচ্চতর গণিতের জন্য প্রস্তুত!",
      ),
      again: b(
        "Let us write the rule in symbols first, then substitute one step at a time.",
        "আগে নিয়মটি প্রতীকে লিখি, তারপর এক ধাপ করে বসাই।",
      ),
    }),
    questions: [
      {
        id: "q1",
        prompt: b("Differentiate x² sin x.", "x² sin x-এর অন্তরজ কত?"),
        hint: b(
          "Use the product rule with u = x² and v = sin x.",
          "u = x² ও v = sin x নিয়ে গুণফল নিয়ম ব্যবহার করো।",
        ),
        options: [
          {
            label: b("2x sin x + x² cos x", "2x sin x + x² cos x"),
            correct: true,
          },
          { label: b("2x cos x", "2x cos x") },
          { label: b("x² cos x", "x² cos x") },
        ],
        explain: b(
          "(x²)′ sin x + x² (sin x)′ = 2x sin x + x² cos x.",
          "(x²)′ sin x + x² (sin x)′ = 2x sin x + x² cos x।",
        ),
        scene: "none",
      },
      {
        id: "q2",
        prompt: b("Evaluate ∫₀³ 2x dx.", "∫₀³ 2x dx-এর মান কত?"),
        hint: b("The antiderivative of 2x is x².", "2x-এর যোগজ x²।"),
        options: [
          { label: b("9", "৯"), correct: true },
          { label: b("6", "৬") },
          { label: b("18", "১৮") },
        ],
        explain: b(
          "[x²]₀³ = 9 − 0 = 9. It is the area under y = 2x from 0 to 3.",
          "[x²]₀³ = ৯ − ০ = ৯। এটি ০ থেকে ৩ পর্যন্ত y = 2x-এর নিচের ক্ষেত্রফল।",
        ),
        scene: "graph",
        sceneData: { type: "area", a: 2, from: 0, to: 3 },
      },
      {
        id: "q3",
        prompt: b(
          "Find the determinant of [[1, 2], [3, 4]].",
          "[[১, ২], [৩, ৪]]-এর নির্ধারক কত?",
        ),
        hint: b(
          "For [[a, b], [c, d]], the determinant is ad − bc.",
          "[[a, b], [c, d]]-এর নির্ধারক ad − bc।",
        ),
        options: [
          { label: b("−2", "−২"), correct: true },
          { label: b("2", "২") },
          { label: b("10", "১০") },
        ],
        explain: b("1×4 − 2×3 = 4 − 6 = −2.", "১×৪ − ২×৩ = ৪ − ৬ = −২।"),
        scene: "none",
      },
      {
        id: "q4",
        prompt: b(
          "What is the domain of f(x) = √(4 − x²)?",
          "f(x) = √(4 − x²)-এর ডোমেইন কী?",
        ),
        hint: b("Solve 4 − x² ≥ 0.", "4 − x² ≥ 0 সমাধান করো।"),
        options: [
          { label: b("[−2, 2]", "[−২, ২]"), correct: true },
          { label: b("(−∞, ∞)", "(−∞, ∞)") },
          { label: b("[0, 2]", "[০, ২]") },
        ],
        explain: b(
          "4 − x² ≥ 0 gives −2 ≤ x ≤ 2, so the domain is [−2, 2].",
          "4 − x² ≥ 0 হলে −২ ≤ x ≤ ২, তাই ডোমেইন [−২, ২]।",
        ),
        scene: "none",
      },
    ],
  },
];
