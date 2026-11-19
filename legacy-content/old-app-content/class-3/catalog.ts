import {
  L,
  S,
  type PlayStep,
  type PlayVisualizationDef,
} from "../play/play.types";

const V = (
  slug: string,
  chapterCode: string,
  en: string,
  bn: string,
  renderer: string,
  engine: string,
  data: Record<string, unknown>,
  steps: PlayStep[],
): PlayVisualizationDef => ({
  slug,
  chapterCode,
  title: L(en, bn),
  summary: L(en, bn),
  renderer,
  engine,
  kind: "STEPPER",
  tags: [chapterCode],
  concepts: [en],
  difficulty: 3,
  data,
  steps,
  aiContext: `${chapterCode}: ${en}`,
});

export const CLASS3_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("number-line-zoom", "c3.01", "Zoom on a number line", "সংখ্যারেখায় জুম", "number-line", "numberLine", { mode: "zoom", from: 3000, to: 4000, step: 100 }, [
    S("Zoom from 3000 to 4000 in steps of 100.", "৩০০০ থেকে ৪০০০ পর্যন্ত ১০০ করে জুম করি।", { from: 3000, to: 4000, step: 100 }),
    S("Zooming in shows each hundred: 3200, 3300, 3400.", "জুম করলে প্রতিটি শতক দেখা যায়: ৩২০০, ৩৩০০, ৩৪০০।", { marks: [3200, 3300, 3400] }),
  ]),
  V("rounding-to-nearest-10-100", "c3.01", "Rounding to 10 and 100", "১০ ও ১০০-তে আসন্ন মান", "number-line", "numberLine", { mode: "round", value: 347, nearest: [10, 100] }, [
    S("347 is between 340 and 350; it is closer to 350.", "৩৪৭, ৩৪০ ও ৩৫০-এর মধ্যে; ৩৫০-এর কাছাকাছি।", { tens: [340, 350], rounded10: 350 }),
    S("For the nearest 100, 347 is closer to 300 than 400.", "নিকটতম ১০০-এর জন্য ৩৪৭, ৪০০-এর চেয়ে ৩০০-এর কাছাকাছি।", { hundreds: [300, 400], rounded100: 300 }),
  ]),
  V("words-and-numerals", "c3.01", "Words and numerals", "শব্দ ও সংখ্যা", "number-grid", "numberGrid", { mode: "word-match", values: [3452, 2789], language: "bn-en" }, [
    S("3,452 is three thousand four hundred fifty-two.", "৩,৪৫২ হলো তিন হাজার চারশ বায়ান্ন।", { value: 3452 }),
    S("2,789 is two thousand seven hundred eighty-nine.", "২,৭৮৯ হলো দুই হাজার সাতশ নিরাশি।", { value: 2789 }),
  ]),

  V("blocks-add-hundreds", "c3.02", "Adding with hundreds blocks", "শতক ব্লক দিয়ে যোগ", "base-blocks", "baseBlocks", { mode: "add-blocks", a: 348, b: 275 }, [
    S("348 + 275: 8 + 5 = 13 ones, so trade 10 ones for 1 ten.", "৩৪৮ + ২৭৫: ৮ + ৫ = ১৩ একক, তাই ১০ একক বদলে ১ দশক।", { ones: 13, carry: 1 }),
    S("Tens: 4 + 7 + 1 = 12, trade 10 tens for 1 hundred. Answer 623.", "দশক: ৪ + ৭ + ১ = ১২, ১০ দশক বদলে ১ শতক। উত্তর ৬২৩।", { tens: 12, sum: 623 }),
  ]),
  V("add-misaligned-digits", "c3.02", "Line up the place values", "স্থানীয় মান সোজা রাখো", "algebra-stepper", "algebraStepper", { mode: "misaligned-add", a: 348, b: 75, correct: 423 }, [
    S("Writing 75 under 348 without lining up places gives a wrong sum.", "স্থান না মিলিয়ে ৩৪৮-এর নিচে ৭৫ লিখলে ভুল যোগফল আসে।", { wrong: true }),
    S("Line up ones with ones: 348 + 75 = 423.", "একক এককের নিচে রাখো: ৩৪৮ + ৭৫ = ৪২৩।", { sum: 423 }, "348 + 75 = 423"),
  ]),
  V("word-problem-add", "c3.02", "Addition story problem", "যোগের শব্দ সমস্যা", "story-scene", "storyScene", { story: "A shop sold 348 pens on Saturday and 275 on Sunday.", expression: "348 + 275", answer: 623, mode: "add" }, [
    S("Saturday 348 pens and Sunday 275 pens are joined.", "শনিবার ৩৪৮টি ও রবিবার ২৭৫টি কলম মিলিয়ে যোগ করি।", { groups: [348, 275] }),
    S("348 + 275 = 623 pens in all.", "সর্বমোট ৩৪৮ + ২৭৫ = ৬২৩টি কলম।", { answer: 623 }),
  ]),

  V("blocks-subtract-across-zero", "c3.03", "Subtract across zero", "শূন্য পার হয়ে বিয়োগ", "base-blocks", "baseBlocks", { mode: "subtract-zero", a: 300, b: 148 }, [
    S("300 − 148: borrow 1 hundred as 10 tens, then 1 ten as 10 ones.", "৩০০ − ১৪৮: ১ শতক ধার করে ১০ দশক, তারপর ১ দশক ধার করে ১০ একক।", { regrouped: [2, 9, 10] }),
    S("Now 10 − 8 = 2, 9 − 4 = 5, 2 − 1 = 1, so the answer is 152.", "এখন ১০ − ৮ = ২, ৯ − ৪ = ৫, ২ − ১ = ১, তাই উত্তর ১৫২।", { difference: 152 }),
  ]),
  V("subtract-check-by-add", "c3.03", "Check subtraction by adding", "যোগ করে বিয়োগ মিলাও", "tape-diagram", "tapeDiagram", { mode: "check-subtract", a: 503, b: 247, difference: 256 }, [
    S("503 − 247 = 256.", "৫০৩ − ২৪৭ = ২৫৬।", { difference: 256 }),
    S("Add back: 256 + 247 = 503, so the answer is correct.", "ফিরে যোগ: ২৫৬ + ২৪৭ = ৫০৩, তাই উত্তর সঠিক।", { check: 503 }),
  ]),
  V("borrow-misconception", "c3.03", "Borrow does not flip digits", "ধার নিলে অঙ্ক উল্টায় না", "algebra-stepper", "algebraStepper", { mode: "borrow-misconception", a: 503, b: 247, wrong: 344, correct: 256 }, [
    S("Subtracting smaller from bigger in every column gives 344, which is wrong.", "প্রতিটি স্তম্ভে ছোট থেকে বড় বিয়োগ করলে ৩৪৪ আসে, যা ভুল।", { wrong: 344 }),
    S("Borrow properly: 503 − 247 = 256.", "সঠিকভাবে ধার নাও: ৫০৩ − ২৪৭ = ২৫৬।", { correct: 256 }),
  ]),

  V("undo-machine", "c3.04", "Undo machine", "ফেরানোর যন্ত্র", "story-scene", "storyScene", { story: "Start with 17, add 8, then subtract 8.", start: 17, add: 8, result: 17, mode: "inverse" }, [
    S("17 + 8 = 25.", "১৭ + ৮ = ২৫।", { afterAdd: 25 }),
    S("25 − 8 = 17: subtraction undoes addition.", "২৫ − ৮ = ১৭: বিয়োগ যোগকে ফিরিয়ে আনে।", { result: 17 }),
  ]),

  V("column-multiply-stepper", "c3.05", "Column multiplication", "স্তম্ভ গুণ", "algebra-stepper", "algebraStepper", { a: 34, b: 6, mode: "column-multiply" }, [
    S("Multiply the ones: 4 × 6 = 24. Write 4, carry 2.", "একক গুণ: ৪ × ৬ = ২৪। ৪ লেখো, ২ হাতে রাখো।", { ones: 24, carry: 2 }),
    S("Multiply the tens: 3 × 6 = 18, plus 2 gives 20. So 34 × 6 = 204.", "দশক গুণ: ৩ × ৬ = ১৮, ২ যোগে ২০। তাই ৩৪ × ৬ = ২০৪।", { product: 204 }),
  ]),
  V("commutative-array-turn", "c3.05", "Turn the array", "অ্যারে ঘোরাও", "array-grid", "arrayGrid", { rows: 3, cols: 4, mode: "commutative" }, [
    S("3 rows of 4 give 12.", "৪-এর ৩ সারি মিলে ১২।", { product: 12 }),
    S("Turning the array gives 4 rows of 3, still 12: 3 × 4 = 4 × 3.", "অ্যারে ঘোরালে ৩-এর ৪ সারি, তবুও ১২: ৩ × ৪ = ৪ × ৩।", { product: 12 }, "3 \\times 4 = 4 \\times 3 = 12"),
  ]),
  V("multiply-by-0-1-10", "c3.05", "Multiply by 0, 1 and 10", "০, ১ ও ১০ দিয়ে গুণ", "base-blocks", "baseBlocks", { mode: "special-cases", values: [0, 1, 10] }, [
    S("Any number × 0 = 0; any number × 1 stays the same.", "যেকোনো সংখ্যা × ০ = ০; × ১ করলে সংখ্যা একই থাকে।", { zero: 0, one: "same" }),
    S("× 10 shifts each digit one place left: 24 × 10 = 240.", "× ১০-এ প্রতিটি অঙ্ক এক স্থান বাঁয়ে সরে: ২৪ × ১০ = ২৪০।", { product: 240 }),
  ]),
  V("word-problem-multiply", "c3.05", "Multiplication story problem", "গুণের শব্দ সমস্যা", "story-scene", "storyScene", { story: "There are 7 boxes with 8 pencils each.", expression: "7 × 8", answer: 56, mode: "multiply" }, [
    S("7 equal groups of 8.", "৮-এর ৭টি সমান দল।", { groups: 7, each: 8 }),
    S("7 × 8 = 56 pencils.", "৭ × ৮ = ৫৬টি পেন্সিল।", { answer: 56 }),
  ]),

  V("repeated-subtraction", "c3.06", "Repeated subtraction", "বারবার বিয়োগ", "number-line", "numberLine", { mode: "repeated-subtract", total: 12, divisor: 3 }, [
    S("Start at 12 and subtract 3 each time.", "১২ থেকে শুরু করে প্রতিবার ৩ বিয়োগ করি।", { start: 12, step: -3 }),
    S("12 − 3 − 3 − 3 − 3 = 0, so 12 ÷ 3 = 4.", "১২ − ৩ − ৩ − ৩ − ৩ = ০, তাই ১২ ÷ ৩ = ৪।", { quotient: 4 }),
  ]),
  V("long-division-stepper-intro", "c3.06", "Long division introduction", "দীর্ঘ ভাগের ভূমিকা", "algebra-stepper", "algebraStepper", { dividend: 48, divisor: 3, mode: "long-division" }, [
    S("4 ÷ 3 = 1 remainder 1. Bring down 8 to make 18.", "৪ ÷ ৩ = ১ ভাগশেষ ১। ৮ নামিয়ে ১৮ করি।", { firstQuotient: 1, brought: 18 }),
    S("18 ÷ 3 = 6, so 48 ÷ 3 = 16.", "১৮ ÷ ৩ = ৬, তাই ৪৮ ÷ ৩ = ১৬।", { quotient: 16 }),
  ]),
  V("word-problem-divide", "c3.06", "Division story problem", "ভাগের শব্দ সমস্যা", "story-scene", "storyScene", { story: "24 sweets are shared equally among 6 children.", expression: "24 ÷ 6", answer: 4, mode: "divide" }, [
    S("Share 24 sweets among 6 children equally.", "২৪টি মিষ্টি ৬ শিশুর মধ্যে সমানভাবে ভাগ করি।", { total: 24, groups: 6 }),
    S("24 ÷ 6 = 4 sweets for each child.", "২৪ ÷ ৬ = ৪টি মিষ্টি প্রত্যেকে পায়।", { answer: 4 }),
  ]),

  V("missing-factor", "c3.07", "Find the missing factor", "অজানা গুণনীয়ক খুঁজি", "tape-diagram", "tapeDiagram", { mode: "missing-factor", equation: "? × 4 = 20", answer: 5 }, [
    S("? × 4 = 20 means 20 ÷ 4 gives the missing factor.", "? × ৪ = ২০ মানে ২০ ÷ ৪ অজানা গুণনীয়ক দেয়।", { division: "20 ÷ 4" }),
    S("20 ÷ 4 = 5, so ? = 5.", "২০ ÷ ৪ = ৫, তাই ? = ৫।", { answer: 5 }),
  ]),

  V("keyword-trap", "c3.08", "Keyword trap", "শব্দের ফাঁদ", "story-scene", "storyScene", { story: "Rahim had 12 marbles. He got 5 more, then lost 8.", expression: "12 + 5 − 8", answer: 9, mode: "keyword" }, [
    S("More means add here, but the story also has a later loss.", "এখানে আরও মানে যোগ, তবে গল্পে পরে হারানোও আছে।", { first: 17 }),
    S("12 + 5 = 17, then 17 − 8 = 9.", "১২ + ৫ = ১৭, তারপর ১৭ − ৮ = ৯।", { answer: 9 }),
  ]),
  V("estimate-check", "c3.08", "Check the answer with an estimate", "আন্দাজে উত্তর যাচাই", "number-line", "numberLine", { mode: "estimate-check", expression: "398 + 205", estimate: 600, exact: 603 }, [
    S("Round 398 to 400 and 205 to 200; the estimate is 600.", "৩৯৮-কে ৪০০ আর ২০৫-কে ২০০ ধরে আন্দাজ ৬০০।", { estimate: 600 }),
    S("The exact answer 603 is close to 600, so it is reasonable.", "প্রকৃত উত্তর ৬০৩, ৬০০-র কাছাকাছি, তাই যুক্তিসঙ্গত।", { exact: 603 }),
  ]),

  V("equal-parts-misconception", "c3.09", "Equal parts only", "শুধু সমান ভাগ", "fraction-bar", "fractionBar", { mode: "equal-parts", parts: [3, 2, 3], equal: false }, [
    S("Unequal slices are not fractions of the whole.", "অসমান টুকরা সম্পূর্ণের ভগ্নাংশ নয়।", { equal: false }),
    S("Each part must be the same size before we write 1/4.", "১/৪ লেখার আগে প্রতিটি ভাগ সমান হতে হবে।", { equal: true }),
  ]),
  V("compare-fractions-bars", "c3.09", "Compare fractions with bars", "বার দিয়ে ভগ্নাংশ তুলনা", "fraction-bar", "fractionBar", { mode: "compare", a: "3/8", b: "5/8" }, [
    S("Same denominator 8, so compare the numerators: 3 < 5.", "হর একই ৮, তাই লব তুলনা: ৩ < ৫।", { compare: "3 < 5" }),
    S("So 3/8 < 5/8.", "তাই ৩/৮ < ৫/৮।", { compare: "3/8 < 5/8" }),
  ]),
  V("equivalent-fractions-intro", "c3.09", "Equivalent fractions", "সমান ভগ্নাংশ", "fraction-bar", "fractionBar", { mode: "equivalent", a: "1/2", b: "2/4" }, [
    S("1/2 and 2/4 cover the same length.", "১/২ আর ২/৪ একই দৈর্ঘ্য ঢাকে।", { same: true }),
    S("Multiply top and bottom by 2: 1/2 = 2/4.", "লব ও হরকে ২ দিয়ে গুণ: ১/২ = ২/৪।", { equivalent: true }, "\\frac{1}{2} = \\frac{2}{4}"),
  ]),

  V("exchange-and-compose", "c3.10", "Exchange and compose money", "টাকা ভাঙানো ও জোড়া", "money-shop", "moneyShop", { mode: "exchange", amount: 100, options: [50, 20, 10] }, [
    S("100 Taka can be two 50-Taka notes.", "১০০ টাকা দুইটি ৫০ টাকার নোটে হয়।", { notes: [50, 50] }),
    S("Or five 20-Taka notes: 5 × 20 = 100.", "অথবা পাঁচটি ২০ টাকার নোট: ৫ × ২০ = ১০০।", { notes: [20, 20, 20, 20, 20] }),
  ]),
  V("save-and-spend", "c3.10", "Save and spend", "সঞ্চয় ও খরচ", "story-scene", "storyScene", { story: "Mina saves 20 Taka each week for 4 weeks.", save: 20, weeks: 4, total: 80, mode: "saving" }, [
    S("Saving 20 Taka a week for 4 weeks: 4 × 20.", "সপ্তাহে ২০ টাকা করে ৪ সপ্তাহ সঞ্চয়: ৪ × ২০।", { weeks: 4, each: 20 }),
    S("4 × 20 = 80 Taka saved.", "৪ × ২০ = ৮০ টাকা জমে।", { total: 80 }),
  ]),

  V("balance-kg-g", "c3.11", "Kilograms and grams", "কিলোগ্রাম ও গ্রাম", "balance-scale", "balanceScale", { mode: "balance", kg: 2, g: 350 }, [
    S("1 kg = 1000 g.", "১ কেজি = ১০০০ গ্রাম।", { expression: "1 kg = 1000 g" }),
    S("2 kg 350 g = 2000 + 350 = 2350 g.", "২ কেজি ৩৫০ গ্রাম = ২০০০ + ৩৫০ = ২৩৫০ গ্রাম।", { grams: 2350 }),
  ]),
  V("pouring-l-ml", "c3.11", "Litres and millilitres", "লিটার ও মিলিলিটার", "object-counting", "objectCounting", { mode: "pour", litres: 1, millilitres: 500 }, [
    S("1 L = 1000 mL.", "১ লিটার = ১০০০ মিলিলিটার।", { expression: "1 L = 1000 mL" }),
    S("1 L 500 mL = 1000 + 500 = 1500 mL.", "১ লিটার ৫০০ মিলি = ১০০০ + ৫০০ = ১৫০০ মিলি।", { millilitres: 1500 }),
  ]),
  V("elapsed-time", "c3.11", "Elapsed time", "অতিবাহিত সময়", "clock", "clock", { mode: "elapsed", start: "3:15", end: "4:40" }, [
    S("From 3:15 to 4:15 is 1 hour.", "৩:১৫ থেকে ৪:১৫ = ১ ঘণ্টা।", { firstHour: 1 }),
    S("From 4:15 to 4:40 is 25 minutes, so the total is 1 hour 25 minutes.", "৪:১৫ থেকে ৪:৪০ = ২৫ মিনিট, মোট ১ ঘণ্টা ২৫ মিনিট।", { duration: "1h 25m" }),
  ]),
  V("calendar-problems", "c3.11", "Calendar problems", "ক্যালেন্ডারের সমস্যা", "calendar", "calendar", { mode: "calendar", month: "February", year: 2024, days: 29 }, [
    S("February 2024 has 29 days because 2024 is a leap year.", "ফেব্রুয়ারি ২০২৪-এ ২৯ দিন, কারণ ২০২৪ অধিবর্ষ।", { days: 29 }),
    S("A leap year is divisible by 4: 2024 ÷ 4 = 506.", "অধিবর্ষ ৪ দিয়ে বিভাজ্য: ২০২৪ ÷ ৪ = ৫০৬।", { leap: true }),
  ]),

  V("polygon-explorer", "c3.12", "Polygon explorer", "বহুভুজ অন্বেষণ", "shape-canvas", "shapeCanvas", { mode: "polygons", shapes: ["triangle", "quadrilateral", "pentagon", "hexagon"] }, [
    S("A triangle has 3 sides, a quadrilateral has 4.", "ত্রিভুজের ৩ বাহু, চতুর্ভুজের ৪ বাহু।", { sides: [3, 4] }),
    S("A pentagon has 5 and a hexagon has 6 sides.", "পঞ্চভুজের ৫ আর ষড়ভুজের ৬ বাহু।", { sides: [5, 6] }),
  ]),
  V("solid-3d-nets", "c3.12", "Nets of solids", "ঘনবস্তুর জাল", "solid-3d", "solid3d", { mode: "net", shapes: ["cube", "cuboid"] }, [
    S("A cube's net unfolds into 6 equal squares.", "ঘনকের জাল ৬টি সমান বর্গে খুলে যায়।", { faces: 6 }),
    S("A cuboid's net has 6 rectangles in 3 pairs.", "আয়তঘনকের জালে ৩ জোড়ায় ৬টি আয়তক্ষেত্র।", { faces: 6 }),
  ]),
  V("shape-properties-sort", "c3.12", "Sort shapes by properties", "ধর্ম অনুযায়ী আকৃতি সাজাও", "shape-canvas", "shapeCanvas", { mode: "sort", groups: ["sides", "corners", "symmetry"] }, [
    S("Sort by the number of sides and corners.", "বাহু ও কোণার সংখ্যা অনুযায়ী সাজাও।", { rule: "sides" }),
    S("Then check which shapes have line symmetry.", "তারপর দেখো কোন আকৃতিতে প্রতিসাম্য আছে।", { rule: "symmetry" }),
  ]),

  V("survey-collector", "c3.13", "Collect survey data", "জরিপের তথ্য সংগ্রহ", "chart", "chart", { mode: "survey", question: "Favourite fruit", categories: ["mango", "banana", "lychee"] }, [
    S("Ask each student and record one tally for each answer.", "প্রতিটি শিক্ষার্থীকে জিজ্ঞাসা করে প্রতিটি উত্তরের জন্য ট্যালি লেখো।", { mode: "tally" }),
    S("Count the tallies to find the total for each fruit.", "প্রতিটি ফলের মোট পেতে ট্যালি গুনো।", { total: "tallies" }),
  ]),
];
