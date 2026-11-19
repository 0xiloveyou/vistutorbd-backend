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

export const CLASS7_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("c7-integers-number-line", "c7.01", "Integers on the number line", "সংখ্যারেখায় পূর্ণসংখ্যা", "number-line", "numberLine", { min: -10, max: 10, mode: "integers" }, [
    S("Positive integers lie right of 0 and negatives left.", "ধনাত্মক পূর্ণসংখ্যা ০-এর ডানে, ঋণাত্মক বামে।", { zero: 0 }),
    S("−3 is 3 steps left of 0 and 4 is 4 steps right.", "−৩ হলো ০ থেকে ৩ ধাপ বামে, ৪ হলো ৪ ধাপ ডানে।", { position: [-3, 4] }),
  ]),
  V("c7-integers-add-chips", "c7.01", "Adding integers with counters", "কাউন্টার দিয়ে পূর্ণসংখ্যার যোগ", "base-blocks", "baseBlocks", { positive: 5, negative: 3, mode: "zero-pairs" }, [
    S("5 positive and 3 negative counters make 3 zero pairs.", "৫টি ধনাত্মক ও ৩টি ঋণাত্মক কাউন্টারে ৩ জোড়া শূন্য হয়।", { pairs: 3 }),
    S("Two positive counters remain, so 5 + (−3) = 2.", "২টি ধনাত্মক কাউন্টার থাকে, তাই ৫ + (−৩) = ২।", { result: 2 }),
  ]),
  V("c7-integers-subtract-negative", "c7.01", "Subtracting a negative integer", "ঋণাত্মক পূর্ণসংখ্যা বিয়োগ", "number-line", "numberLine", { a: -3, b: -5, mode: "subtract-negative" }, [
    S("Subtracting −5 is the same as adding 5.", "−৫ বিয়োগ করা মানে ৫ যোগ করা।", { add: 5 }),
    S("−3 + 5 = 2, so −3 − (−5) = 2.", "−৩ + ৫ = ২, তাই −৩ − (−৫) = ২।", { result: 2 }),
  ]),
  V("c7-integers-multiply-signs", "c7.01", "Sign rules for multiplication", "গুণের চিহ্নের নিয়ম", "algebra-stepper", "algebraStepper", { a: -2, b: 3, c: -3, mode: "sign-rules" }, [
    S("A negative times a positive is negative: −2 × 3 = −6.", "ঋণাত্মক গুণ ধনাত্মক = ঋণাত্মক: −২ × ৩ = −৬।", { result: -6 }),
    S("A negative times a negative is positive: −2 × (−3) = 6.", "ঋণাত্মক গুণ ঋণাত্মক = ধনাত্মক: −২ × (−৩) = ৬।", { result: 6 }),
  ]),
  V("c7-integers-word-problem", "c7.01", "Temperature change word problem", "তাপমাত্রা পরিবর্তনের সমস্যা", "story-scene", "storyScene", { start: 7, change: -12, end: -5, mode: "temperature" }, [
    S("The temperature starts at 7 °C and falls 12 °C.", "তাপমাত্রা ৭ °সে থেকে শুরু করে ১২ °সে কমে।", { start: 7, change: -12 }),
    S("7 + (−12) = −5, so it becomes −5 °C.", "৭ + (−১২) = −৫, তাই তাপমাত্রা −৫ °সে হয়।", { end: -5 }),
  ]),
  V("c7-integers-practice", "c7.01", "Integer practice ladder", "পূর্ণসংখ্যার অনুশীলন", "number-grid", "numberGrid", { mode: "practice", questions: ["−7+10", "4−(−6)"] }, [
    S("−7 + 10 = 3 because we move 10 steps to the right.", "−৭ + ১০ = ৩, কারণ ১০ ধাপ ডানে যাই।", { answer: 3 }),
    S("4 − (−6) = 4 + 6 = 10 because subtracting a negative adds.", "৪ − (−৬) = ৪ + ৬ = ১০, কারণ ঋণাত্মক বিয়োগ মানে যোগ।", { answer: 10 }),
  ]),

  V("c7-rational-number-line", "c7.02", "Rational numbers on the number line", "সংখ্যারেখায় মূলদ সংখ্যা", "number-line", "numberLine", { points: ["3/4", "-1/2"], mode: "rational" }, [
    S("3/4 lies between 0 and 1, closer to 1.", "৩/৪ সংখ্যাটি ০ ও ১-এর মধ্যে, ১-এর কাছাকাছি।", { between: [0, 1] }),
    S("−1/2 lies halfway between −1 and 0.", "−১/২ হলো −১ ও ০-এর ঠিক মাঝে।", { between: [-1, 0] }),
  ]),
  V("c7-rational-fraction-form", "c7.02", "Write a decimal as p/q", "দশমিককে p/q আকারে লেখা", "fraction-bar", "fractionBar", { value: "3/4", decimal: 0.75, mode: "p-q" }, [
    S("0.75 = 75/100 because the last digit is in hundredths.", "০.৭৫ = ৭৫/১০০, কারণ শেষ অঙ্ক শতাংশে।", { fraction: "75/100" }),
    S("Divide top and bottom by 25: 0.75 = 3/4.", "লব ও হর ২৫ দিয়ে ভাগ: ০.৭৫ = ৩/৪।", { fraction: "3/4" }),
  ]),
  V("c7-irrational-decimal", "c7.02", "Irrational decimals never repeat", "অমূলদ দশমিক কখনো পুনরাবৃত্ত হয় না", "number-line", "numberLine", { value: "sqrt2", approx: 1.414, mode: "irrational" }, [
    S("√2 is between 1.4 and 1.5 on the number line.", "√২ সংখ্যারেখায় ১.৪ ও ১.৫-এর মধ্যে।", { between: [1.4, 1.5] }),
    S("Its decimal 1.414... never ends or repeats, so it is irrational.", "এর দশমিক ১.৪১৪... না শেষ হয় না পুনরাবৃত্ত, তাই অমূলদ।", { approx: 1.414 }),
  ]),
  V("c7-rational-vs-irrational", "c7.02", "Sort rational and irrational numbers", "মূলদ ও অমূলদ সংখ্যা সাজানো", "venn-set", "vennSet", { rational: ["3/4", "0.5", "sqrt9"], irrational: ["sqrt2", "pi"], mode: "sort" }, [
    S("√9 = 3 and 0.5 = 1/2, so both are rational.", "√৯ = ৩ এবং ০.৫ = ১/২, তাই দুটোই মূলদ।", { rational: ["3", "1/2"] }),
    S("√2 and π cannot be written as p/q, so they are irrational.", "√২ ও π-কে p/q আকারে লেখা যায় না, তাই এরা অমূলদ।", { irrational: ["sqrt2", "pi"] }),
  ]),
  V("c7-rational-word-problem", "c7.02", "Sharing pizzas as fractions", "ভগ্নাংশে পিজ্জা ভাগ", "story-scene", "storyScene", { pizzas: 3, children: 4, share: "3/4", mode: "share" }, [
    S("Share 3 pizzas equally among 4 children.", "৩টি পিজ্জা ৪ জন শিশুর মধ্যে সমান ভাগ করি।", { pizzas: 3, children: 4 }),
    S("Each child gets 3 ÷ 4 = 3/4 of a pizza.", "প্রত্যেকে পায় ৩ ÷ ৪ = ৩/৪ পিজ্জা।", { share: "3/4" }),
  ]),
  V("c7-rational-misconception", "c7.02", "Repeating decimals are rational", "পুনরাবৃত্ত দশমিকও মূলদ", "algebra-stepper", "algebraStepper", { value: 0.333, fraction: "1/3", mode: "repeating" }, [
    S("A decimal that repeats can still be rational.", "পুনরাবৃত্ত দশমিকও মূলদ হতে পারে।", { repeating: true }),
    S("0.333... = 1/3, so it is a rational number.", "০.৩৩৩... = ১/৩, তাই এটি মূলদ সংখ্যা।", { fraction: "1/3" }),
  ]),

  V("c7-congruence-rigid-motion", "c7.03", "Congruence by rigid motion", "কঠিন গতিতে সর্বসমতা", "geometry-board", "geometryBoard", { mode: "congruence", transform: "translate" }, [
    S("Sliding or turning a shape does not change its size.", "আকৃতি সরানো বা ঘোরালে তার মাপ বদলায় না।", { transform: "rigid" }),
    S("Two shapes that match exactly after rigid motion are congruent.", "কঠিন গতির পর হুবহু মিললে আকৃতি দুটি সর্বসম।", { congruent: true }),
  ]),
  V("c7-congruence-corresponding-parts", "c7.03", "Corresponding sides and angles", "অনুরূপ বাহু ও কোণ", "geometry-board", "geometryBoard", { mode: "corresponding", triangles: 2 }, [
    S("Matching sides are called corresponding sides.", "মিলে যাওয়া বাহুগুলোকে অনুরূপ বাহু বলে।", { sides: "AB = DE" }),
    S("Matching angles are equal in congruent triangles.", "সর্বসম ত্রিভুজে অনুরূপ কোণগুলো সমান।", { angles: "∠A = ∠D" }),
  ]),
  V("c7-similarity-scale-factor", "c7.03", "Similar figures and scale factor", "সদৃশ আকৃতি ও স্কেল ফ্যাক্টর", "geometry-board", "geometryBoard", { mode: "similar", scale: 2 }, [
    S("Similar shapes have equal angles and proportional sides.", "সদৃশ আকৃতির কোণ সমান ও বাহু সমানুপাতিক।", { angles: "equal" }),
    S("A scale factor of 2 doubles every side length.", "স্কেল ফ্যাক্টর ২ হলে প্রতিটি বাহু দ্বিগুণ হয়।", { scale: 2 }),
  ]),
  V("c7-similarity-perimeter-area", "c7.03", "Perimeter and area under scaling", "স্কেলিংয়ে পরিসীমা ও ক্ষেত্রফল", "shape-canvas", "shapeCanvas", { mode: "scale-area", scale: 2, base: [3, 2] }, [
    S("When sides double, the perimeter also doubles.", "বাহু দ্বিগুণ হলে পরিসীমাও দ্বিগুণ হয়।", { perimeterFactor: 2 }),
    S("The area becomes 2² = 4 times larger.", "ক্ষেত্রফল হয় ২² = ৪ গুণ বড়।", { areaFactor: 4 }),
  ]),
  V("c7-congruence-misconception", "c7.03", "Equal area is not congruence", "সমান ক্ষেত্রফল মানেই সর্বসম নয়", "shape-canvas", "shapeCanvas", { mode: "same-area", rects: [[2, 6], [3, 4]] }, [
    S("A 2 × 6 rectangle and a 3 × 4 rectangle both have area 12.", "২ × ৬ ও ৩ × ৪ আয়তক্ষেত্রের ক্ষেত্রফলই ১২।", { area: 12 }),
    S("Their shapes differ, so equal area does not mean congruent.", "আকৃতি আলাদা, তাই সমান ক্ষেত্রফল মানে সর্বসম নয়।", { congruent: false }),
  ]),
  V("c7-similarity-real-life", "c7.03", "Map scale and similarity", "মানচিত্রের স্কেল ও সদৃশতা", "story-scene", "storyScene", { mode: "map-scale", scale: "1:100", drawing: 3 }, [
    S("A map scale of 1:100 means 1 cm stands for 100 cm.", "মানচিত্রের স্কেল ১:১০০ মানে ১ সেমি = ১০০ সেমি।", { scale: 100 }),
    S("3 cm on the map represents 3 × 100 = 300 cm = 3 m.", "মানচিত্রে ৩ সেমি বোঝায় ৩ × ১০০ = ৩০০ সেমি = ৩ মি।", { actual: 300 }),
  ]),

  V("c7-algebra-monomial-product", "c7.04", "Multiply monomials", "একপদী রাশির গুণ", "algebra-stepper", "algebraStepper", { a: "3x^2", b: "4x^3", mode: "monomial-product" }, [
    S("Multiply the numbers: 3 × 4 = 12.", "সংখ্যাগুলো গুণ করি: ৩ × ৪ = ১২।", { coefficient: 12 }),
    S("Add the powers: x² · x³ = x⁵, so the product is 12x⁵.", "সূচক যোগ: x² · x³ = x⁵, তাই গুণফল ১২x⁵।", { product: "12x^5" }),
  ]),
  V("c7-algebra-distributive", "c7.04", "Distributive law", "বণ্টন নিয়ম", "algebra-stepper", "algebraStepper", { expression: "2x(3x+4)", mode: "distributive" }, [
    S("Multiply 2x by each term inside the bracket.", "বন্ধনীর প্রতিটি পদকে 2x দিয়ে গুণ করি।", { terms: ["6x^2", "8x"] }),
    S("2x(3x + 4) = 6x² + 8x.", "২x(৩x + ৪) = ৬x² + ৮x।", { expanded: "6x^2 + 8x" }),
  ]),
  V("c7-algebra-binomial-product", "c7.04", "Multiply two binomials", "দুই দ্বিপদীর গুণ", "algebra-stepper", "algebraStepper", { expression: "(x+3)(x+2)", mode: "binomial" }, [
    S("Multiply each term: x² + 2x + 3x + 6.", "প্রতিটি পদ গুণ: x² + ২x + ৩x + ৬।", { step: "x^2 + 2x + 3x + 6" }),
    S("Combine like terms to get x² + 5x + 6.", "সদৃশ পদ মিলিয়ে x² + ৫x + ৬।", { expanded: "x^2 + 5x + 6" }),
  ]),
  V("c7-algebra-divide-monomial", "c7.04", "Divide by a monomial", "একপদী দিয়ে ভাগ", "algebra-stepper", "algebraStepper", { dividend: "12x^5", divisor: "4x^2", mode: "monomial-divide" }, [
    S("Divide the numbers: 12 ÷ 4 = 3.", "সংখ্যা ভাগ: ১২ ÷ ৪ = ৩।", { coefficient: 3 }),
    S("Subtract the powers: x⁵ ÷ x² = x³, so the answer is 3x³.", "সূচক বিয়োগ: x⁵ ÷ x² = x³, তাই উত্তর ৩x³।", { quotient: "3x^3" }),
  ]),
  V("c7-algebra-sign-misconception", "c7.04", "Sign errors when expanding", "বিস্তারে চিহ্নের ভুল", "algebra-stepper", "algebraStepper", { wrong: "(x-3)(x+2)=x^2-6", correct: "x^2-x-6", mode: "sign" }, [
    S("Do not drop the middle term when expanding.", "বিস্তার করার সময় মধ্যের পদ বাদ দিও না।", { middle: "-x" }),
    S("(x − 3)(x + 2) = x² − x − 6.", "(x − ৩)(x + ২) = x² − x − ৬।", { expanded: "x^2 - x - 6" }),
  ]),
  V("c7-algebra-area-model", "c7.04", "Area model for expansion", "বিস্তারের ক্ষেত্রফল মডেল", "array-grid", "arrayGrid", { expression: "(x+3)(x+2)", split: [3, 2], mode: "algebra-area" }, [
    S("The large square is x², and the strips are 2x and 3x.", "বড় বর্গ x², আর পাতিগুলো ২x ও ৩x।", { pieces: ["x^2", "2x", "3x"] }),
    S("The small corner is 6, so the total area is x² + 5x + 6.", "ছোট কোণা ৬, তাই মোট ক্ষেত্রফল x² + ৫x + ৬।", { area: "x^2 + 5x + 6" }),
  ]),

  V("c7-algebra-fraction-simplify", "c7.05", "Simplify an algebraic fraction", "বীজগাণিতিক ভগ্নাংশ সরলীকরণ", "algebra-stepper", "algebraStepper", { expression: "(x^2-9)/(x-3)", mode: "simplify" }, [
    S("Factor the numerator: x² − 9 = (x − 3)(x + 3).", "লব উৎপাদকে: x² − ৯ = (x − ৩)(x + ৩)।", { factored: "(x-3)(x+3)" }),
    S("Cancel (x − 3) to get x + 3, with x ≠ 3.", "(x − ৩) বাদ দিলে x + ৩, তবে x ≠ ৩।", { simplified: "x+3" }),
  ]),
  V("c7-algebra-fraction-common-denominator", "c7.05", "Find a common denominator", "সাধারণ হর নির্ণয়", "algebra-stepper", "algebraStepper", { a: "1/x", b: "1/y", mode: "common-denominator" }, [
    S("The common denominator is xy.", "সাধারণ হর হলো xy।", { lcd: "xy" }),
    S("1/x + 1/y = (y + x)/xy.", "১/x + ১/y = (y + x)/xy।", { sum: "(x+y)/xy" }),
  ]),
  V("c7-algebra-fraction-add-subtract", "c7.05", "Add and subtract algebraic fractions", "বীজগাণিতিক ভগ্নাংশের যোগ-বিয়োগ", "algebra-stepper", "algebraStepper", { expression: "1/(x+1)+1/(x-1)", mode: "add-subtract" }, [
    S("Use (x + 1)(x − 1) = x² − 1 as the common denominator.", "সাধারণ হর (x + ১)(x − ১) = x² − ১ নিই।", { lcd: "x^2-1" }),
    S("The sum is (x − 1 + x + 1)/(x² − 1) = 2x/(x² − 1).", "যোগফল (x − ১ + x + ১)/(x² − ১) = ২x/(x² − ১)।", { sum: "2x/(x^2-1)" }),
  ]),
  V("c7-algebra-fraction-multiply-divide", "c7.05", "Multiply and divide algebraic fractions", "বীজগাণিতিক ভগ্নাংশের গুণ-ভাগ", "algebra-stepper", "algebraStepper", { expression: "(x/2)*(4/x)", mode: "multiply-divide" }, [
    S("Multiply numerators and denominators: (x · 4)/(2 · x).", "লব ও হর গুণ: (x · ৪)/(২ · x)।", { product: "4x/2x" }),
    S("Cancel x and simplify: 4/2 = 2.", "x বাদ দিয়ে সরল করি: ৪/২ = ২।", { answer: 2 }),
  ]),
  V("c7-algebra-fraction-misconception", "c7.05", "Cancel factors, not terms", "পদ নয়, উৎপাদক বাদ দাও", "algebra-stepper", "algebraStepper", { wrong: "(x+3)/3=x", correct: "x/3+1", mode: "cancel" }, [
    S("You cannot cancel 3 inside a sum like x + 3.", "x + ৩-এর ভেতরের ৩ বাদ দেওয়া যায় না।", { cannotCancel: true }),
    S("(x + 3)/3 = x/3 + 1, not x.", "(x + ৩)/৩ = x/৩ + ১, x নয়।", { correct: "x/3 + 1" }),
  ]),
  V("c7-algebra-fraction-real-life", "c7.05", "Speed as an algebraic fraction", "গতি একটি বীজগাণিতিক ভগ্নাংশ", "story-scene", "storyScene", { distance: "d", time: "t", speed: "d/t", mode: "speed" }, [
    S("Speed is distance divided by time, d/t.", "গতি = দূরত্ব ÷ সময় = d/t।", { formula: "d/t" }),
    S("If d = 120 km and t = 3 h, speed = 120/3 = 40 km/h.", "d = ১২০ কিমি, t = ৩ ঘণ্টা হলে গতি = ১২০/৩ = ৪০ কিমি/ঘণ্টা।", { speed: 40 }),
  ]),

  V("c7-equation-balance", "c7.06", "Balance a simple equation", "সরল সমীকরণের ভারসাম্য", "balance-scale", "balanceScale", { left: "x+7", right: 12, mode: "one-step" }, [
    S("Subtract 7 from both sides: x + 7 − 7 = 12 − 7.", "দুই পাশ থেকে ৭ বিয়োগ: x + ৭ − ৭ = ১২ − ৭।", { step: "x = 5" }),
    S("x = 5. Check: 5 + 7 = 12.", "x = ৫। যাচাই: ৫ + ৭ = ১২।", { check: "5+7=12" }),
  ]),
  V("c7-equation-two-step", "c7.06", "Solve a two-step equation", "দুই ধাপের সমীকরণ সমাধান", "balance-scale", "balanceScale", { left: "4x-3", right: 17, mode: "two-step" }, [
    S("Add 3 to both sides: 4x = 20.", "দুই পাশে ৩ যোগ: ৪x = ২০।", { step: "4x=20" }),
    S("Divide both sides by 4: x = 5.", "দুই পাশ ৪ দিয়ে ভাগ: x = ৫।", { answer: 5 }),
  ]),
  V("c7-equation-variable-both-sides", "c7.06", "Variable on both sides", "দুই পাশে চলক", "algebra-stepper", "algebraStepper", { equation: "5x+2=3x+10", mode: "both-sides" }, [
    S("Subtract 3x from both sides: 2x + 2 = 10.", "দুই পাশ থেকে ৩x বিয়োগ: ২x + ২ = ১০।", { step: "2x+2=10" }),
    S("Subtract 2 and divide by 2: x = 4.", "২ বিয়োগ করে ২ দিয়ে ভাগ: x = ৪।", { answer: 4 }),
  ]),
  V("c7-equation-misconception", "c7.06", "Do the same to both sides", "দুই পাশে একই কাজ করো", "balance-scale", "balanceScale", { equation: "x+5=9", wrong: "x=9+5", correct: 4, mode: "same-both-sides" }, [
    S("Whatever you do to one side, do to the other side too.", "এক পাশে যা করো, অন্য পাশেও তা করো।", { sameOperation: true }),
    S("Subtract 5 from both sides: x = 9 − 5 = 4.", "দুই পাশ থেকে ৫ বিয়োগ: x = ৯ − ৫ = ৪।", { answer: 4 }),
  ]),
  V("c7-equation-word-problem", "c7.06", "Age word problem", "বয়স সংক্রান্ত শব্দ সমস্যা", "story-scene", "storyScene", { story: "Father is 3 times the son's age. Together 40.", equation: "x+3x=40", mode: "age" }, [
    S("Let the son be x. The father is 3x, so x + 3x = 40.", "পুত্রের বয়স x, পিতার ৩x, তাই x + ৩x = ৪০।", { equation: "4x=40" }),
    S("4x = 40 gives x = 10, so the father is 30.", "৪x = ৪০ তাই x = ১০, পিতার বয়স ৩০।", { son: 10, father: 30 }),
  ]),
  V("c7-equation-practice", "c7.06", "Equation practice ladder", "সমীকরণ অনুশীলন", "number-grid", "numberGrid", { mode: "practice", questions: ["2x+5=13", "3x-4=11"] }, [
    S("2x + 5 = 13 gives 2x = 8, so x = 4.", "২x + ৫ = ১৩ তাই ২x = ৮, x = ৪।", { answer: 4 }),
    S("3x − 4 = 11 gives 3x = 15, so x = 5.", "৩x − ৪ = ১১ তাই ৩x = ১৫, x = ৫।", { answer: 5 }),
  ]),

  V("c7-set-roster-builder", "c7.07", "Roster and set-builder form", "তালিকা ও সেট গঠন পদ্ধতি", "venn-set", "vennSet", { mode: "roster", set: "{2,4,6,8}" }, [
    S("List each element once inside braces: {2, 4, 6, 8}.", "প্রতিটি উপাদান একবার করে বন্ধনীতে লেখি: {২, ৪, ৬, ৮}।", { roster: "{2,4,6,8}" }),
    S("In set-builder form this is {x : x even, 2 ≤ x ≤ 8}.", "সেট গঠন পদ্ধতিতে {x : x জোড়, ২ ≤ x ≤ ৮}।", { builder: "{x: x even, 2<=x<=8}" }),
  ]),
  V("c7-set-union-intersection", "c7.07", "Union and intersection", "সংযোগ ও ছেদ", "venn-set", "vennSet", { a: [1, 2, 3, 4], b: [3, 4, 5], mode: "union-intersection" }, [
    S("A ∪ B keeps every element in A or B: {1,2,3,4,5}.", "A ∪ B-তে A বা B-এর সব উপাদান: {১,২,৩,৪,৫}।", { union: [1, 2, 3, 4, 5] }),
    S("A ∩ B keeps only the common elements: {3,4}.", "A ∩ B-তে শুধু সাধারণ উপাদান: {৩,৪}।", { intersection: [3, 4] }),
  ]),
  V("c7-set-complement", "c7.07", "Complement in the universal set", "সার্বিক সেটে পূরক", "venn-set", "vennSet", { universal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], a: [2, 4, 6, 8], mode: "complement" }, [
    S("The complement A′ holds elements of U that are not in A.", "A′ হলো U-এর যেসব উপাদান A-তে নেই।", { inA: [2, 4, 6, 8] }),
    S("A′ = {1,3,5,7,9,10}.", "A′ = {১,৩,৫,৭,৯,১০}।", { complement: [1, 3, 5, 7, 9, 10] }),
  ]),
  V("c7-set-subset", "c7.07", "Subsets and the empty set", "উপসেট ও শূন্য সেট", "number-grid", "numberGrid", { a: [2, 4], b: [1, 2, 3, 4], mode: "subset" }, [
    S("Every element of A = {2,4} is also in B = {1,2,3,4}.", "A = {২,৪}-এর প্রতিটি উপাদান B = {১,২,৩,৪}-এ আছে।", { subset: true }),
    S("So A ⊂ B. The empty set { } is a subset of every set.", "তাই A ⊂ B। শূন্য সেট { } প্রতিটি সেটের উপসেট।", { emptySubset: true }),
  ]),
  V("c7-set-misconception", "c7.07", "Order and repeats do not matter", "ক্রম ও পুনরাবৃত্তি গুরুত্বপূর্ণ নয়", "venn-set", "vennSet", { wrong: "{1,2,2,3} != {1,2,3}", mode: "order-repeat" }, [
    S("Repeats are ignored: {1,2,2,3} is the same as {1,2,3}.", "পুনরাবৃত্তি বাদ যায়: {১,২,২,৩} = {১,২,৩}।", { repeatIgnored: true }),
    S("Order also does not matter: {1,2} = {2,1}.", "ক্রমও গুরুত্বপূর্ণ নয়: {১,২} = {২,১}।", { orderIgnored: true }),
  ]),
  V("c7-set-survey-word-problem", "c7.07", "Survey with two sets", "দুই সেটের জরিপ সমস্যা", "venn-set", "vennSet", { total: 30, cricket: 18, football: 14, both: 6, mode: "survey" }, [
    S("Students liking at least one game = 18 + 14 − 6 = 26.", "অন্তত একটি খেলা পছন্দ করে ১৮ + ১৪ − ৬ = ২৬ জন।", { union: 26 }),
    S("Neither game = 30 − 26 = 4 students.", "দুটি খেলাই পছন্দ করে না ৩০ − ২৬ = ৪ জন।", { neither: 4 }),
  ]),

  V("c7-quadrilateral-angle-sum", "c7.08", "Angle sum of a quadrilateral", "চতুর্ভুজের কোণসমষ্টি", "geometry-board", "geometryBoard", { mode: "angle-sum", sides: 4 }, [
    S("Draw a diagonal to split the quadrilateral into two triangles.", "একটি কর্ণ আঁকলে চতুর্ভুজ দুই ত্রিভুজে ভাগ হয়।", { triangles: 2 }),
    S("Each triangle has 180°, so the angles add to 360°.", "প্রতিটি ত্রিভুজে ১৮০°, তাই কোণগুলোর যোগফল ৩৬০°।", { sum: 360 }),
  ]),
  V("c7-parallelogram-properties", "c7.08", "Parallelogram properties", "সামান্তরিকের ধর্ম", "geometry-board", "geometryBoard", { shape: "parallelogram", mode: "properties" }, [
    S("Opposite sides of a parallelogram are equal and parallel.", "সামান্তরিকের বিপরীত বাহু সমান ও সমান্তরাল।", { oppositeSides: true }),
    S("Opposite angles are equal, and each pair adds to 180°.", "বিপরীত কোণ সমান, এবং পাশাপাশি কোণদের যোগফল ১৮০°।", { oppositeAngles: true }),
  ]),
  V("c7-quadrilateral-family", "c7.08", "Rectangle, rhombus and square", "আয়তক্ষেত্র, রম্বস ও বর্গক্ষেত্র", "geometry-board", "geometryBoard", { mode: "family", shapes: ["rectangle", "rhombus", "square"] }, [
    S("A square is a rectangle with all sides equal.", "বর্গক্ষেত্র এমন আয়তক্ষেত্র যার সব বাহু সমান।", { squareIsRectangle: true }),
    S("A square is also a rhombus with four right angles.", "বর্গক্ষেত্র এমন রম্বসও যার চার কোণ সমকোণ।", { squareIsRhombus: true }),
  ]),
  V("c7-quadrilateral-diagonals", "c7.08", "Diagonals of quadrilaterals", "চতুর্ভুজের কর্ণ", "geometry-board", "geometryBoard", { shape: "rhombus", mode: "diagonals" }, [
    S("The diagonals of a parallelogram bisect each other.", "সামান্তরিকের কর্ণদ্বয় পরস্পরকে সমদ্বিখণ্ডিত করে।", { bisect: true }),
    S("In a rhombus the diagonals also meet at 90°.", "রম্বসে কর্ণদ্বয় ৯০° কোণে মেলে।", { perpendicular: true }),
  ]),
  V("c7-quadrilateral-misconception", "c7.08", "Every rhombus is not a square", "প্রতিটি রম্বস বর্গ নয়", "geometry-board", "geometryBoard", { shape: "rhombus", angles: [60, 120], mode: "rhombus-square" }, [
    S("A rhombus has four equal sides but not always right angles.", "রম্বসের চার বাহু সমান, তবে কোণ সবসময় সমকোণ নয়।", { sidesEqual: true }),
    S("With angles 60° and 120° it is a rhombus, not a square.", "৬০° ও ১২০° কোণ থাকলে এটি রম্বস, বর্গ নয়।", { isSquare: false }),
  ]),
  V("c7-quadrilateral-real-life", "c7.08", "Find the missing angle", "অজানা কোণ নির্ণয়", "geometry-board", "geometryBoard", { angles: [85, 95, 100], missing: 80, mode: "missing-angle" }, [
    S("Three angles are 85°, 95° and 100°, whose sum is 280°.", "তিনটি কোণ ৮৫°, ৯৫° ও ১০০°, যোগফল ২৮০°।", { sum: 280 }),
    S("The fourth angle is 360° − 280° = 80°.", "চতুর্থ কোণ ৩৬০° − ২৮০° = ৮০°।", { missing: 80 }),
  ]),

  V("c7-pythagoras-theorem", "c7.09", "Squares on the sides", "বাহুগুলোর উপর বর্গ", "geometry-board", "geometryBoard", { a: 3, b: 4, c: 5, mode: "squares" }, [
    S("Draw squares on the two shorter sides: areas 9 and 16.", "ছোট দুই বাহুর উপর বর্গ আঁকি: ক্ষেত্রফল ৯ ও ১৬।", { areas: [9, 16] }),
    S("The square on the hypotenuse has area 25, so c = 5.", "অতিভুজের বর্গের ক্ষেত্রফল ২৫, তাই c = ৫।", { hypotenuse: 5 }),
  ]),
  V("c7-pythagoras-hypotenuse", "c7.09", "Find the hypotenuse", "অতিভুজ নির্ণয়", "algebra-stepper", "algebraStepper", { a: 6, b: 8, mode: "hypotenuse" }, [
    S("Use a² + b² = c²: 6² + 8² = 36 + 64.", "a² + b² = c²: ৬² + ৮² = ৩৬ + ৬৪।", { sum: 100 }),
    S("c² = 100, so c = 10.", "c² = ১০০, তাই c = ১০।", { hypotenuse: 10 }),
  ]),
  V("c7-pythagoras-leg", "c7.09", "Find a missing leg", "অজানা বাহু নির্ণয়", "algebra-stepper", "algebraStepper", { c: 13, a: 5, mode: "leg" }, [
    S("Use b² = c² − a² = 13² − 5² = 169 − 25.", "b² = c² − a² = ১৩² − ৫² = ১৬৯ − ২৫।", { difference: 144 }),
    S("b² = 144, so b = 12.", "b² = ১৪৪, তাই b = ১২।", { leg: 12 }),
  ]),
  V("c7-pythagoras-triples", "c7.09", "Pythagorean triples", "পিথাগোরীয় ত্রয়ী", "number-grid", "numberGrid", { triples: [[3, 4, 5], [6, 8, 10], [5, 12, 13]], mode: "triples" }, [
    S("3-4-5 works because 3² + 4² = 9 + 16 = 25 = 5².", "৩-৪-৫ সত্য, কারণ ৩² + ৪² = ৯ + ১৬ = ২৫ = ৫²।", { check: true }),
    S("Multiplying a triple by 2 gives another: 6-8-10.", "ত্রয়ীকে ২ দিয়ে গুণলে আরেকটি: ৬-৮-১০।", { triple: [6, 8, 10] }),
  ]),
  V("c7-pythagoras-misconception", "c7.09", "The hypotenuse is the longest side", "অতিভুজ সর্বদা দীর্ঘতম বাহু", "geometry-board", "geometryBoard", { sides: [5, 12, 13], mode: "longest-side" }, [
    S("The hypotenuse is always the longest side, opposite the right angle.", "অতিভুজ সবসময় দীর্ঘতম বাহু, সমকোণের বিপরীতে।", { hypotenuse: 13 }),
    S("So c = 13, and 5² + 12² = 25 + 144 = 169 = 13².", "তাই c = ১৩, এবং ৫² + ১২² = ২৫ + ১৪৪ = ১৬৯ = ১৩²।", { check: true }),
  ]),
  V("c7-pythagoras-real-life", "c7.09", "Ladder against a wall", "দেয়ালে হেলানো মই", "story-scene", "storyScene", { ladder: 5, base: 3, height: 4, mode: "ladder" }, [
    S("The ladder, wall and ground form a right triangle.", "মই, দেয়াল ও মাটি মিলে সমকোণী ত্রিভুজ হয়।", { hypotenuse: 5 }),
    S("Height = √(5² − 3²) = √(25 − 9) = √16 = 4 m.", "উচ্চতা = √(৫² − ৩²) = √(২৫ − ৯) = √১৬ = ৪ মি।", { height: 4 }),
  ]),

  V("c7-circle-parts", "c7.10", "Radius, diameter and chord", "ব্যাসার্ধ, ব্যাস ও জ্যা", "geometry-board", "geometryBoard", { radius: 5, mode: "parts" }, [
    S("The diameter is twice the radius: d = 2 × 5 = 10.", "ব্যাস = ২ × ব্যাসার্ধ = ২ × ৫ = ১০।", { diameter: 10 }),
    S("A chord joins two points on the circle but need not pass the centre.", "জ্যা বৃত্তের দুই বিন্দু যোগ করে, তবে কেন্দ্র দিয়ে যেতে হয় না।", { chord: true }),
  ]),
  V("c7-circle-circumference", "c7.10", "Circumference and pi", "পরিধি ও পাই", "geometry-board", "geometryBoard", { radius: 7, pi: "22/7", mode: "circumference" }, [
    S("Circumference = 2πr = 2 × 22/7 × 7.", "পরিধি = ২πr = ২ × ২২/৭ × ৭।", { expression: "2*pi*7" }),
    S("So the circumference is 44 units.", "তাই পরিধি ৪৪ একক।", { circumference: 44 }),
  ]),
  V("c7-circle-area", "c7.10", "Area of a circle", "বৃত্তের ক্ষেত্রফল", "geometry-board", "geometryBoard", { radius: 7, pi: "22/7", mode: "area" }, [
    S("Area = πr² = 22/7 × 7 × 7.", "ক্ষেত্রফল = πr² = ২২/৭ × ৭ × ৭।", { expression: "pi*7^2" }),
    S("Area = 22 × 7 = 154 square units.", "ক্ষেত্রফল = ২২ × ৭ = ১৫৪ বর্গ একক।", { area: 154 }),
  ]),
  V("c7-circle-semicircle-angle", "c7.10", "Angle in a semicircle", "অর্ধবৃত্তে কোণ", "geometry-board", "geometryBoard", { mode: "semicircle", angle: 90 }, [
    S("An angle drawn in a semicircle stands on a diameter.", "অর্ধবৃত্তে আঁকা কোণ ব্যাসের উপর দাঁড়ায়।", { onDiameter: true }),
    S("The angle in a semicircle is always 90°.", "অর্ধবৃত্তে কোণ সবসময় ৯০°।", { angle: 90 }),
  ]),
  V("c7-circle-tangent-radius", "c7.10", "Tangent and radius", "স্পর্শক ও ব্যাসার্ধ", "geometry-board", "geometryBoard", { mode: "tangent", radius: 4 }, [
    S("A tangent touches the circle at exactly one point.", "স্পর্শক বৃত্তকে ঠিক এক বিন্দুতে স্পর্শ করে।", { touchPoints: 1 }),
    S("The radius to that point is perpendicular to the tangent.", "সেই বিন্দুতে ব্যাসার্ধ স্পর্শকের উপর লম্ব।", { perpendicular: true }),
  ]),
  V("c7-circle-misconception", "c7.10", "Diameter and radius mix-up", "ব্যাস ও ব্যাসার্ধের গোলমাল", "story-scene", "storyScene", { diameter: 10, mode: "diameter-radius" }, [
    S("If the diameter is 10, the radius is 5, not 10.", "ব্যাস ১০ হলে ব্যাসার্ধ ৫, ১০ নয়।", { radius: 5 }),
    S("Area = πr² = π × 25, not π × 100.", "ক্ষেত্রফল = πr² = π × ২৫, π × ১০০ নয়।", { area: "25*pi" }),
  ]),

  V("c7-data-frequency-table", "c7.11", "Frequency table", "পরিসংখ্যা সারণি", "chart", "chart", { mode: "frequency", values: [1, 2, 2, 3, 3, 3] }, [
    S("Tally how often each value appears.", "প্রতিটি মান কতবার আছে তা ট্যালি করি।", { tally: true }),
    S("Frequencies: 1 appears 1 time, 2 twice, 3 three times.", "পরিসংখ্যা: ১ একবার, ২ দুইবার, ৩ তিনবার।", { frequency: [1, 2, 3] }),
  ]),
  V("c7-data-bar-chart", "c7.11", "Read a bar graph", "বার গ্রাফ পড়া", "chart", "chart", { categories: ["A", "B", "C"], values: [14, 20, 11], mode: "bar" }, [
    S("Bar height shows the frequency of each category.", "বারের উচ্চতা প্রতিটি শ্রেণির পরিসংখ্যা দেখায়।", { values: [14, 20, 11] }),
    S("B is tallest, so category B is most frequent.", "B সবচেয়ে উঁচু, তাই B-এর পরিসংখ্যা সর্বোচ্চ।", { max: "B" }),
  ]),
  V("c7-data-mean", "c7.11", "Mean of a data set", "উপাত্তের গড়", "chart", "chart", { values: [4, 6, 8, 10], mode: "mean" }, [
    S("Add the values: 4 + 6 + 8 + 10 = 28.", "মান যোগ: ৪ + ৬ + ৮ + ১০ = ২৮।", { total: 28 }),
    S("Divide by 4: mean = 28 ÷ 4 = 7.", "৪ দিয়ে ভাগ: গড় = ২৮ ÷ ৪ = ৭।", { mean: 7 }),
  ]),
  V("c7-data-median-mode", "c7.11", "Median and mode", "মধ্যক ও সংখ্যাগুরু", "chart", "chart", { values: [3, 5, 5, 7, 10], mode: "median-mode" }, [
    S("Arrange the data and take the middle value: median = 5.", "তথ্য সাজিয়ে মধ্যম মান: মধ্যক = ৫।", { median: 5 }),
    S("The value appearing most often is 5, so mode = 5.", "সবচেয়ে বেশিবার আসা মান ৫, তাই সংখ্যাগুরু = ৫।", { mode: 5 }),
  ]),
  V("c7-data-misconception", "c7.11", "Mean is not always typical", "গড় সবসময় সাধারণ মান নয়", "chart", "chart", { values: [2, 3, 4, 11], mode: "outlier" }, [
    S("The mean is (2 + 3 + 4 + 11) ÷ 4 = 5.", "গড় = (২ + ৩ + ৪ + ১১) ÷ ৪ = ৫।", { mean: 5 }),
    S("But the outlier 11 is far from the others, so the mean is not typical.", "কিন্তু ১১ চরম মান, তাই গড়টি সাধারণ মান নয়।", { outlier: 11 }),
  ]),
  V("c7-data-real-life", "c7.11", "Survey and interpret data", "জরিপ ও উপাত্ত ব্যাখ্যা", "story-scene", "storyScene", { survey: "favourite fruit", counts: { mango: 8, banana: 5, apple: 7 }, mode: "survey" }, [
    S("Count the choices: mango 8, banana 5, apple 7.", "পছন্দ গণনা: আম ৮, কলা ৫, আপেল ৭।", { counts: [8, 5, 7] }),
    S("Total responses = 8 + 5 + 7 = 20, and mango is most popular.", "মোট উত্তর = ৮ + ৫ + ৭ = ২০, এবং আম সবচেয়ে জনপ্রিয়।", { total: 20, max: "mango" }),
  ]),
];
