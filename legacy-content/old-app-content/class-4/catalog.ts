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

export const CLASS4_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("number-line-big-zoom", "c4.01", "Zoom on a large number line", "বড় সংখ্যারেখায় জুম", "number-line", "numberLine", { mode: "zoom", from: 0, to: 100000, step: 10000 }, [
    S("Zoom from 0 to 1,00,000 in steps of 10,000.", "০ থেকে ১,০০,০০০ পর্যন্ত ১০,০০০ করে জুম করি।", { from: 0, to: 100000, step: 10000 }),
    S("Zooming in shows 20,000, 30,000 and 40,000 clearly.", "জুম করলে ২০,০০০, ৩০,০০০ ও ৪০,০০০ স্পষ্ট দেখা যায়।", { marks: [20000, 30000, 40000] }),
  ]),
  V("compare-order-big", "c4.01", "Compare large numbers", "বড় সংখ্যা তুলনা", "algebra-stepper", "algebraStepper", { mode: "compare", a: 245678, b: 245687 }, [
    S("Both have 2 lakh 45 thousand; compare the tens: 7 < 8.", "দুই সংখ্যাতেই ২ লাখ ৪৫ হাজার; দশক তুলনা: ৭ < ৮।", { compare: "7 < 8" }),
    S("So 2,45,678 < 2,45,687.", "তাই ২,৪৫,৬৭৮ < ২,৪৫,৬৮৭।", { compare: "245678 < 245687" }),
  ]),
  V("rounding-visual", "c4.01", "Rounding large numbers", "বড় সংখ্যার আসন্ন মান", "number-line", "numberLine", { mode: "round", value: 3478, nearest: [10, 100, 1000] }, [
    S("3,478 is closer to 3,500 than 3,400, so to the nearest 100 it is 3,500.", "৩,৪৭৮, ৩,৪০০-এর চেয়ে ৩,৫০০-এর কাছাকাছি, তাই নিকটতম ১০০-তে ৩,৫০০।", { rounded100: 3500 }),
    S("To the nearest 1,000 it is 3,000.", "নিকটতম ১,০০০-তে ৩,০০০।", { rounded1000: 3000 }),
  ]),
  V("roman-numerals-intro", "c4.01", "Roman numerals", "রোমান সংখ্যা", "number-grid", "numberGrid", { mode: "roman", symbols: ["I", "V", "X", "L", "C"], value: 42 }, [
    S("I = 1, V = 5, X = 10, L = 50 and C = 100.", "I = ১, V = ৫, X = ১০, L = ৫০ আর C = ১০০।", { symbols: [1, 5, 10, 50, 100] }),
    S("42 is XLII: 40 + 2.", "৪২ হলো XLII: ৪০ + ২।", { roman: "XLII" }),
  ]),

  V("base-blocks-regroup", "c4.02", "Regroup large blocks", "বড় ব্লক পুনর্বিন্যাস", "base-blocks", "baseBlocks", { mode: "regroup", value: 3456 }, [
    S("3,456 = 3 thousands + 4 hundreds + 5 tens + 6 ones.", "৩,৪৫৬ = ৩ হাজার + ৪ শতক + ৫ দশক + ৬ একক।", { parts: [3000, 400, 50, 6] }),
    S("Trade 10 ones for 1 ten or 10 tens for 1 hundred.", "১০ একক বদলে ১ দশক বা ১০ দশক বদলে ১ শতক।", { trade: true }),
  ]),
  V("bar-model-two-step", "c4.02", "Two-step bar model", "দুই ধাপের বার মডেল", "tape-diagram", "tapeDiagram", { mode: "two-step", start: 250, sold: 120, bought: 45 }, [
    S("Start with 250 books and subtract the 120 sold: 250 − 120 = 130.", "২৫০টি বই থেকে বিক্রি হওয়া ১২০টি বিয়োগ: ২৫০ − ১২০ = ১৩০।", { afterSale: 130 }),
    S("Add the 45 new books: 130 + 45 = 175.", "নতুন ৪৫টি বই যোগ: ১৩০ + ৪৫ = ১৭৫।", { final: 175 }),
  ]),
  V("word-problem-scenes", "c4.02", "Add and subtract stories", "যোগ-বিয়োগের গল্প", "story-scene", "storyScene", { story: "A bus had 68 passengers. 24 got off and 15 got on.", expression: "68 − 24 + 15", answer: 59, mode: "add-subtract" }, [
    S("68 − 24 = 44 passengers after some got off.", "৬৮ − ২৪ = ৪৪ জন যাত্রী নামার পর থাকে।", { afterOff: 44 }),
    S("44 + 15 = 59 passengers in all.", "৪৪ + ১৫ = ৫৯ জন যাত্রী মোট।", { answer: 59 }),
  ]),

  V("lattice-method", "c4.03", "Lattice multiplication", "জালি পদ্ধতিতে গুণ", "algebra-stepper", "algebraStepper", { a: 23, b: 14, mode: "lattice" }, [
    S("Split 23 into 2 and 3, and 14 into 1 and 4.", "২৩-কে ২ ও ৩, আর ১৪-কে ১ ও ৪-এ ভাগ করি।", { split: [2, 3, 1, 4] }),
    S("The lattice diagonal sums give 322.", "জালির কর্ণ বরাবর যোগফল ৩২২ দেয়।", { product: 322 }),
  ]),
  V("estimate-product", "c4.03", "Estimate a product", "গুণফলের আসন্ন মান", "number-line", "numberLine", { mode: "estimate-product", a: 48, b: 21, estimate: 1000, exact: 1008 }, [
    S("Round 48 to 50 and 21 to 20; the estimate is 50 × 20 = 1000.", "৪৮-কে ৫০ আর ২১-কে ২০ ধরে আন্দাজ ৫০ × ২০ = ১০০০।", { estimate: 1000 }),
    S("The exact product 48 × 21 = 1008 is close to 1000.", "প্রকৃত গুণফল ৪৮ × ২১ = ১০০৮, ১০০০-এর কাছাকাছি।", { exact: 1008 }),
  ]),
  V("multiplication-patterns", "c4.03", "Patterns in tables", "নামতার নকশা", "number-grid", "numberGrid", { mode: "patterns", tables: [2, 5, 10] }, [
    S("The 2 table is all even numbers.", "২-এর নামতায় সব জোড় সংখ্যা।", { table: 2 }),
    S("The 5 table ends in 0 or 5; the 10 table always ends in 0.", "৫-এর নামতা ০ বা ৫-এ শেষ; ১০-এর নামতা সবসময় ০-এ শেষ।", { tables: [5, 10] }),
  ]),

  V("share-and-group-blocks", "c4.04", "Divide with place-value blocks", "স্থানীয় মান ব্লকে ভাগ", "base-blocks", "baseBlocks", { mode: "divide-blocks", dividend: 84, divisor: 4 }, [
    S("Share 8 tens equally into 4 groups: 2 tens each.", "৮ দশক ৪ দলে সমান ভাগ: প্রত্যেকে ২ দশক।", { tensEach: 2 }),
    S("Share 4 ones: 1 each. So 84 ÷ 4 = 21.", "৪ একক ভাগ: প্রত্যেকে ১। তাই ৮৪ ÷ ৪ = ২১।", { quotient: 21 }),
  ]),
  V("divide-by-10-100", "c4.04", "Divide by 10 and 100", "১০ ও ১০০ দিয়ে ভাগ", "base-blocks", "baseBlocks", { mode: "shift-divide", value: 3400, divisor: 100 }, [
    S("3,400 ÷ 10 moves each digit one place right: 340.", "৩,৪০০ ÷ ১০-এ প্রতিটি অঙ্ক এক স্থান ডানে: ৩৪০।", { result: 340 }),
    S("3,400 ÷ 100 moves two places right: 34.", "৩,৪০০ ÷ ১০০-তে দুই স্থান ডানে: ৩৪।", { result: 34 }),
  ]),
  V("division-word-problems", "c4.04", "Division story problem", "ভাগের শব্দ সমস্যা", "story-scene", "storyScene", { story: "84 mangoes are packed equally into 4 baskets.", expression: "84 ÷ 4", answer: 21, mode: "divide" }, [
    S("Share 84 mangoes equally into 4 baskets.", "৮৪টি আম ৪টি ঝুড়িতে সমানভাবে ভাগ করি।", { total: 84, baskets: 4 }),
    S("84 ÷ 4 = 21 mangoes per basket.", "৮৪ ÷ ৪ = ২১টি আম প্রতি ঝুড়িতে।", { answer: 21 }),
  ]),

  V("number-sentence-builder", "c4.05", "Build a number sentence", "সংখ্যা বাক্য গঠন", "algebra-stepper", "algebraStepper", { story: "5 more than a number is 12.", equation: "x + 5 = 12", answer: 7, mode: "sentence" }, [
    S("The unknown plus 5 equals 12: x + 5 = 12.", "অজানা সংখ্যা যোগ ৫ সমান ১২: x + ৫ = ১২।", { equation: "x + 5 = 12" }),
    S("Subtract 5 from both sides: x = 7.", "দুই পাশ থেকে ৫ বিয়োগ: x = ৭।", { answer: 7 }),
  ]),
  V("bracket-effect", "c4.05", "Brackets change the result", "বন্ধনী ফলাফল বদলায়", "algebra-stepper", "algebraStepper", { mode: "brackets", expression: "(2 + 3) × 4", answer: 20 }, [
    S("Brackets first: 2 + 3 = 5.", "আগে বন্ধনী: ২ + ৩ = ৫।", { brackets: 5 }),
    S("Then 5 × 4 = 20. Without brackets, 2 + 3 × 4 = 14.", "তারপর ৫ × ৪ = ২০। বন্ধনী ছাড়া ২ + ৩ × ৪ = ১৪।", { answer: 20 }),
  ]),
  V("true-or-false-sentence", "c4.05", "True or false sentence", "সত্য বা মিথ্যা বাক্য", "balance-scale", "balanceScale", { mode: "true-false", left: 10, right: 12, truth: false }, [
    S("Check both sides: 6 + 4 = 10.", "দুই পাশ মিলাও: ৬ + ৪ = ১০।", { left: 10 }),
    S("10 ≠ 12, so the sentence is false.", "১০ ≠ ১২, তাই বাক্যটি মিথ্যা।", { truth: false }),
  ]),
  V("find-the-unknown-bars", "c4.05", "Find the unknown in bars", "বারে অজানা খুঁজি", "tape-diagram", "tapeDiagram", { mode: "unknown-bars", whole: 30, parts: [18, null] }, [
    S("The whole is 30 and one part is 18.", "সম্পূর্ণ ৩০ আর এক ভাগ ১৮।", { whole: 30, part: 18 }),
    S("The other part is 30 − 18 = 12.", "অন্য ভাগ ৩০ − ১৮ = ১২।", { unknown: 12 }),
  ]),

  V("common-multiples-overlap", "c4.06", "Common multiples", "সাধারণ গুণিতক", "venn-set", "vennSet", { mode: "common-multiples", a: 4, b: 6, common: [12, 24, 36] }, [
    S("Multiples of 4: 4, 8, 12, 16, 20, 24.", "৪-এর গুণিতক: ৪, ৮, ১২, ১৬, ২০, ২৪।", { multiples4: [4, 8, 12, 16, 20, 24] }),
    S("Multiples of 6: 6, 12, 18, 24. The overlap starts at 12.", "৬-এর গুণিতক: ৬, ১২, ১৮, ২৪। ছেদ ১২ থেকে শুরু।", { common: [12, 24] }),
  ]),
  V("common-factors-overlap", "c4.06", "Common factors", "সাধারণ গুণনীয়ক", "venn-set", "vennSet", { mode: "common-factors", a: 18, b: 24, common: [1, 2, 3, 6] }, [
    S("Factors of 18: 1, 2, 3, 6, 9, 18.", "১৮-এর গুণনীয়ক: ১, ২, ৩, ৬, ৯, ১৮।", { factors18: [1, 2, 3, 6, 9, 18] }),
    S("Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Common: 1, 2, 3, 6.", "২৪-এর গুণনীয়ক: ১, ২, ৩, ৪, ৬, ৮, ১২, ২৪। সাধারণ: ১, ২, ৩, ৬।", { common: [1, 2, 3, 6] }),
  ]),
  V("divisibility-tests", "c4.06", "Divisibility tests", "বিভাজ্যতার পরীক্ষা", "algebra-stepper", "algebraStepper", { mode: "divisibility", number: 135, tests: [2, 3, 5, 9, 10] }, [
    S("135 ends in 5, so it is divisible by 5 but not by 2 or 10.", "১৩৫ ৫-এ শেষ, তাই ৫ দিয়ে বিভাজ্য, কিন্তু ২ বা ১০ দিয়ে নয়।", { by: [5] }),
    S("Digit sum 1 + 3 + 5 = 9, so it is divisible by 3 and 9.", "অঙ্কসমষ্টি ১ + ৩ + ৫ = ৯, তাই ৩ ও ৯ দিয়ে বিভাজ্য।", { by: [3, 9] }),
  ]),
  V("prime-vs-composite", "c4.06", "Prime or composite", "মৌলিক বা যৌগিক", "array-grid", "arrayGrid", { mode: "prime-composite", numbers: [7, 12] }, [
    S("7 makes only one rectangle, 1 × 7, so it is prime.", "৭ দিয়ে শুধু ১ × ৭ আয়তক্ষেত্র হয়, তাই এটি মৌলিক।", { factors: [1, 7] }),
    S("12 makes 1 × 12, 2 × 6 and 3 × 4, so it is composite.", "১২ দিয়ে ১ × ১২, ২ × ৬ ও ৩ × ৪ হয়, তাই এটি যৌগিক।", { factors: [[1, 12], [2, 6], [3, 4]] }),
  ]),

  V("compare-fractions", "c4.07", "Compare unlike fractions", "অসম হর ভগ্নাংশ তুলনা", "fraction-bar", "fractionBar", { mode: "compare-unlike", a: "2/3", b: "3/4" }, [
    S("Use denominator 12: 2/3 = 8/12 and 3/4 = 9/12.", "হর ১২ নিই: ২/৩ = ৮/১২ আর ৩/৪ = ৯/১২।", { lcd: 12 }),
    S("8/12 < 9/12, so 2/3 < 3/4.", "৮/১২ < ৯/১২, তাই ২/৩ < ৩/৪।", { compare: "2/3 < 3/4" }),
  ]),
  V("subtract-same-denominator", "c4.07", "Subtract fractions", "ভগ্নাংশ বিয়োগ", "fraction-bar", "fractionBar", { mode: "subtract", a: "4/5", b: "1/5" }, [
    S("Same denominator 5, so subtract the numerators: 4 − 1 = 3.", "হর একই ৫, তাই লব বিয়োগ: ৪ − ১ = ৩।", { numerator: 3 }),
    S("So 4/5 − 1/5 = 3/5.", "তাই ৪/৫ − ১/৫ = ৩/৫।", { difference: "3/5" }),
  ]),
  V("fraction-number-line", "c4.07", "Fractions on a number line", "সংখ্যারেখায় ভগ্নাংশ", "number-line", "numberLine", { mode: "fractions", from: 0, to: 2, denominator: 4 }, [
    S("Divide each whole into 4 equal parts.", "প্রতিটি সম্পূর্ণকে ৪টি সমান ভাগে ভাগ করি।", { parts: 4 }),
    S("Count 5 parts from 0 to reach 5/4 = 1 1/4.", "০ থেকে ৫ ভাগ গুনলে ৫/৪ = ১ ১/৪-এ পৌঁছাই।", { mark: "5/4" }),
  ]),
  V("adding-denominators-misconception", "c4.07", "Do not add denominators", "হর যোগ করা যায় না", "fraction-bar", "fractionBar", { mode: "misconception", wrong: "1/2 + 1/3 = 2/5", correct: "5/6" }, [
    S("Adding numerators and denominators gives 2/5, which is wrong.", "লব ও হর যোগ করলে ২/৫ আসে, যা ভুল।", { wrong: "2/5" }),
    S("Use 6: 3/6 + 2/6 = 5/6.", "৬ নিই: ৩/৬ + ২/৬ = ৫/৬।", { correct: "5/6" }),
  ]),

  V("hundredths-grid", "c4.08", "Hundredths grid", "শতাংশ গ্রিড", "array-grid", "arrayGrid", { mode: "hundredths", shaded: 45 }, [
    S("The 10 × 10 grid has 100 equal squares.", "১০ × ১০ গ্রিডে ১০০টি সমান ঘর।", { squares: 100 }),
    S("45 shaded squares = 45/100 = 0.45.", "৪৫টি রঙিন ঘর = ৪৫/১০০ = ০.৪৫।", { decimal: 0.45 }),
  ]),
  V("decimal-number-line", "c4.08", "Decimals on a number line", "সংখ্যারেখায় দশমিক", "number-line", "numberLine", { mode: "decimal-line", from: 0, to: 1, step: 0.1 }, [
    S("Split 0 to 1 into 10 equal parts.", "০ থেকে ১-কে ১০টি সমান ভাগে ভাগ করি।", { parts: 10 }),
    S("0.3 is three steps from 0 and 0.7 is seven steps.", "০.৩ শূন্য থেকে তিন ধাপ আর ০.৭ সাত ধাপ।", { marks: [0.3, 0.7] }),
  ]),
  V("decimal-place-value", "c4.08", "Decimal place value", "দশমিকের স্থানীয় মান", "base-blocks", "baseBlocks", { mode: "decimal-place", value: 3.47 }, [
    S("3.47 has 3 ones, 4 tenths and 7 hundredths.", "৩.৪৭-এ ৩ একক, ৪ দশাংশ আর ৭ শতাংশ।", { parts: [3, 0.4, 0.07] }),
    S("3 + 0.4 + 0.07 = 3.47.", "৩ + ০.৪ + ০.০৭ = ৩.৪৭।", { value: 3.47 }),
  ]),
  V("decimal-money-link", "c4.08", "Decimals and money", "দশমিক ও টাকা", "money-shop", "moneyShop", { mode: "money-decimal", taka: 12.5 }, [
    S("12.50 Taka is 12 Taka and 50 poisha.", "১২.৫০ টাকা হলো ১২ টাকা ৫০ পয়সা।", { taka: 12, poisha: 50 }),
    S("50 poisha = 0.50 Taka, so 12 + 0.50 = 12.50.", "৫০ পয়সা = ০.৫০ টাকা, তাই ১২ + ০.৫০ = ১২.৫০।", { total: 12.5 }),
  ]),

  V("balance-kg-g", "c4.09", "Weight conversion", "ওজনের রূপান্তর", "balance-scale", "balanceScale", { mode: "balance", kg: 3, g: 250 }, [
    S("1 kg = 1000 g.", "১ কেজি = ১০০০ গ্রাম।", { expression: "1 kg = 1000 g" }),
    S("3 kg 250 g = 3000 + 250 = 3250 g.", "৩ কেজি ২৫০ গ্রাম = ৩০০০ + ২৫০ = ৩২৫০ গ্রাম।", { grams: 3250 }),
  ]),
  V("liquid-l-ml", "c4.09", "Volume conversion", "আয়তনের রূপান্তর", "object-counting", "objectCounting", { mode: "pour", litres: 2, millilitres: 750 }, [
    S("1 L = 1000 mL.", "১ লিটার = ১০০০ মিলিলিটার।", { expression: "1 L = 1000 mL" }),
    S("2 L 750 mL = 2000 + 750 = 2750 mL.", "২ লিটার ৭৫০ মিলি = ২০০০ + ৭৫০ = ২৭৫০ মিলি।", { millilitres: 2750 }),
  ]),
  V("elapsed-time-timeline", "c4.09", "Elapsed time timeline", "অতিবাহিত সময়ের রেখা", "clock", "clock", { mode: "elapsed", start: "9:20", end: "11:05" }, [
    S("From 9:20 to 10:20 is 1 hour.", "৯:২০ থেকে ১০:২০ = ১ ঘণ্টা।", { firstHour: 1 }),
    S("From 10:20 to 11:05 is 45 minutes, so the total is 1 hour 45 minutes.", "১০:২০ থেকে ১১:০৫ = ৪৫ মিনিট, মোট ১ ঘণ্টা ৪৫ মিনিট।", { duration: "1h 45m" }),
  ]),
  V("area-vs-perimeter", "c4.09", "Same perimeter, different area", "একই পরিসীমা, ভিন্ন ক্ষেত্রফল", "shape-canvas", "shapeCanvas", { mode: "compare-area-perimeter", rectangles: [[6, 2], [5, 3]] }, [
    S("6 × 2 has perimeter 16 and area 12.", "৬ × ২-এর পরিসীমা ১৬ আর ক্ষেত্রফল ১২।", { perimeter: 16, area: 12 }),
    S("5 × 3 has the same perimeter 16 but area 15.", "৫ × ৩-এর পরিসীমাও ১৬, কিন্তু ক্ষেত্রফল ১৫।", { perimeter: 16, area: 15 }),
  ]),

  V("protractor-measure", "c4.10", "Measure with a protractor", "চাঁদা দিয়ে মাপি", "geometry-board", "geometryBoard", { mode: "protractor", degrees: 65 }, [
    S("Place the protractor centre on the vertex and the zero line on one arm.", "চাঁদার কেন্দ্র শীর্ষে আর শূন্য রেখা এক বাহুতে রাখি।", { aligned: true }),
    S("Read the inner scale: the angle is 65°.", "ভিতরের স্কেল পড়ি: কোণটি ৬৫°।", { degrees: 65 }),
  ]),
  V("parallel-perpendicular", "c4.10", "Parallel and perpendicular lines", "সমান্তরাল ও লম্ব রেখা", "geometry-board", "geometryBoard", { mode: "parallel-perpendicular", angle: 90 }, [
    S("Parallel lines stay the same distance apart and never meet.", "সমান্তরাল রেখা একই দূরত্বে থাকে, কখনো মেলে না।", { parallel: true }),
    S("Perpendicular lines meet at a right angle, 90°.", "লম্ব রেখা সমকোণে, ৯০°-এ মেলে।", { degrees: 90 }),
  ]),
  V("quadrilateral-family", "c4.10", "Quadrilateral family", "চতুর্ভুজ পরিবার", "shape-canvas", "shapeCanvas", { mode: "quadrilaterals", shapes: ["square", "rectangle", "rhombus", "parallelogram", "trapezium"] }, [
    S("A square is a rectangle with all sides equal.", "বর্গ হলো এমন আয়তক্ষেত্র যার সব বাহু সমান।", { square: true }),
    S("A parallelogram has both pairs of opposite sides parallel.", "সমান্তরাল চতুর্ভুজের দুই জোড়া বিপরীত বাহু সমান্তরাল।", { parallel: true }),
  ]),
  V("angle-sum-triangle-tear", "c4.10", "Angles of a triangle sum to 180°", "ত্রিভুজের কোণ সমষ্টি ১৮০°", "geometry-board", "geometryBoard", { mode: "angle-sum", angles: [55, 65, 60] }, [
    S("The three angles are 55°, 65° and 60°.", "তিনটি কোণ ৫৫°, ৬৫° ও ৬০°।", { angles: [55, 65, 60] }),
    S("Their sum is 55 + 65 + 60 = 180°.", "সমষ্টি ৫৫ + ৬৫ + ৬০ = ১৮০°।", { sum: 180 }),
  ]),
  V("solid-nets-3d", "c4.10", "Faces, edges and vertices", "তল, প্রান্ত ও শীর্ষ", "solid-3d", "solid3d", { mode: "solid-properties", shape: "cuboid" }, [
    S("A cuboid has 6 faces, 12 edges and 8 vertices.", "আয়তঘনকের ৬টি তল, ১২টি প্রান্ত আর ৮টি শীর্ষ।", { faces: 6, edges: 12, vertices: 8 }),
    S("Its net unfolds into 6 rectangles.", "এর জাল ৬টি আয়তক্ষেত্রে খুলে যায়।", { net: 6 }),
  ]),

  V("line-graph-intro", "c4.11", "Line graph introduction", "রেখা গ্রাফের ভূমিকা", "chart", "chart", { mode: "line", points: [10, 12, 11, 15, 18] }, [
    S("Plot each point and join them in order.", "প্রতিটি বিন্দু বসিয়ে ক্রমানুসারে যোগ করি।", { points: 5 }),
    S("The line rises from 10 to 18, so the trend is upward.", "রেখা ১০ থেকে ১৮-এ ওঠে, তাই প্রবণতা ঊর্ধ্বমুখী।", { trend: "up" }),
  ]),
  V("read-and-compare-graphs", "c4.11", "Read and compare graphs", "গ্রাফ পড়ি ও তুলনা করি", "chart", "chart", { mode: "compare-graphs", categories: ["Mon", "Tue", "Wed"], values: [12, 18, 9] }, [
    S("Tuesday has the tallest bar, 18.", "মঙ্গলবারের বার সবচেয়ে উঁচু, ১৮।", { max: ["Tue", 18] }),
    S("The difference between Tuesday and Wednesday is 18 − 9 = 9.", "মঙ্গলবার ও বুধবারের পার্থক্য ১৮ − ৯ = ৯।", { difference: 9 }),
  ]),
];
