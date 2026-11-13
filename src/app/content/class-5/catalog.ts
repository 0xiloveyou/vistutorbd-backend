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

export const CLASS5_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("area-model-large", "c5.01", "Area model: 3-digit by 2-digit", "ক্ষেত্রফল মডেল: ৩ অঙ্ক × ২ অঙ্ক", "array-grid", "arrayGrid", { rows: 123, cols: 24, mode: "area" }, [
    S("Split 123 into 100 + 20 + 3 and 24 into 20 + 4.", "১২৩ = ১০০ + ২০ + ৩ এবং ২৪ = ২০ + ৪।", { split: [100, 20, 3, 20, 4] }),
    S("Add the partial products to get 2952.", "আংশিক গুণফল যোগ করলে ২৯৫২ পাওয়া যায়।", { product: 2952 }, "123 \\times 24 = 2952"),
  ]),
  V("column-multiply-stepper", "c5.01", "Column multiplication", "স্তম্ভ গুণ", "algebra-stepper", "algebraStepper", { a: 123, b: 24, mode: "column-multiply" }, [
    S("Multiply 123 by the 4 ones: 492.", "১২৩-কে ৪ একক দিয়ে গুণ: ৪৯২।", { partial: 492 }),
    S("Multiply 123 by the 2 tens: 2460. Add: 2952.", "১২৩-কে ২ দশক দিয়ে গুণ: ২৪৬০। যোগ: ২৯৫২।", { product: 2952 }),
  ]),
  V("long-division-stepper", "c5.01", "Long division with a 2-digit divisor", "দুই অঙ্কের ভাজক দিয়ে দীর্ঘ ভাগ", "algebra-stepper", "algebraStepper", { dividend: 987, divisor: 21, mode: "long-division" }, [
    S("21 × 40 = 840. Subtract from 987 to get 147.", "২১ × ৪০ = ৮৪০। ৯৮৭ থেকে বিয়োগে ১৪৭।", { quotientPart: 40 }),
    S("21 × 7 = 147, so 987 ÷ 21 = 47.", "২১ × ৭ = ১৪৭, তাই ৯৮৭ ÷ ২১ = ৪৭।", { quotient: 47 }),
  ]),
  V("estimate-first", "c5.01", "Estimate before multiplying", "গুণের আগে আনুমানিক হিসাব", "number-line", "numberLine", { expression: "123 × 24", rounded: "100 × 20", estimate: 2000, exact: 2952, mode: "estimate" }, [
    S("Round 123 to 100 and 24 to 20.", "১২৩-কে ১০০ এবং ২৪-কে ২০ ধরি।", { rounded: [100, 20] }),
    S("100 × 20 = 2000. The exact answer 2952 is close.", "১০০ × ২০ = ২০০০। সঠিক উত্তর ২৯৫২ কাছাকাছি।", { estimate: 2000, exact: 2952 }),
  ]),
  V("multiply-divide-inverse", "c5.01", "Multiplication and division are inverse", "গুণ ও ভাগ পরস্পর বিপরীত", "tape-diagram", "tapeDiagram", { product: 2952, factor: 24, quotient: 123, mode: "inverse" }, [
    S("24 × 123 = 2952.", "২৪ × ১২৩ = ২৯৫২।", { product: 2952 }),
    S("So 2952 ÷ 24 = 123. Division undoes multiplication.", "তাই ২৯৫২ ÷ ২৪ = ১২৩। ভাগ গুণকে পূর্বাবস্থায় ফেরায়।", { quotient: 123 }),
  ]),
  V("division-remainder-meaning", "c5.01", "What a remainder means", "ভাগশেষের অর্থ", "object-counting", "objectCounting", { total: 47, group: 5, quotient: 9, remainder: 2, mode: "remainder" }, [
    S("Share 47 sweets among 5 children: 9 each.", "৫ জন শিশুর মধ্যে ৪৭টি মিষ্টি ভাগ করলে প্রত্যেকে ৯টি পায়।", { quotient: 9 }),
    S("2 sweets remain, so the remainder is 2.", "২টি মিষ্টি বাকি থাকে, তাই ভাগশেষ ২।", { remainder: 2 }),
  ]),
  V("word-problem-scenes", "c5.01", "Multi-step word problem", "বহু ধাপের শব্দ সমস্যা", "story-scene", "storyScene", { story: "A shop has 24 boxes with 123 pencils each.", expression: "24 × 123", answer: 2952, mode: "multiply" }, [
    S("Each box has 123 pencils and there are 24 boxes.", "প্রতিটি বাক্সে ১২৩টি পেন্সিল এবং বাক্স আছে ২৪টি।", { groups: 24, each: 123 }),
    S("24 × 123 = 2952 pencils in all.", "মোট ২৪ × ১২৩ = ২৯৫২টি পেন্সিল।", { answer: 2952 }),
  ]),

  V("equation-balance", "c5.02", "Balance an equation", "সমীকরণের ভারসাম্য", "balance-scale", "balanceScale", { left: "x + 17", right: 42, mode: "equation" }, [
    S("x + 17 = 42. Subtract 17 from both sides.", "x + ১৭ = ৪২। দুই পাশ থেকে ১৭ বিয়োগ করি।", { unknown: 25 }),
    S("x = 25. Check: 25 + 17 = 42.", "x = ২৫। যাচাই: ২৫ + ১৭ = ৪২।", { expression: "25 + 17 = 42" }),
  ]),
  V("order-of-operations-bodmas", "c5.02", "Order of operations (BODMAS)", "ক্রমের নিয়ম (BODMAS)", "algebra-stepper", "algebraStepper", { expression: "6 + 2 × (5 + 3)", mode: "bodmas" }, [
    S("Brackets first: 5 + 3 = 8.", "প্রথমে বন্ধনী: ৫ + ৩ = ৮।", { brackets: 8 }),
    S("Then 2 × 8 = 16 and 6 + 16 = 22.", "তারপর ২ × ৮ = ১৬ এবং ৬ + ১৬ = ২২।", { answer: 22 }),
  ]),
  V("write-sentence-from-story", "c5.02", "Write a sentence from a story", "গল্প থেকে বাক্য গঠন", "story-scene", "storyScene", { story: "Rima had 15 marbles and found 8 more.", equation: "15 + 8 = 23", mode: "sentence" }, [
    S("The story joins two groups, so use addition.", "গল্পে দুই দল যুক্ত হয়, তাই যোগ হবে।", { operation: "+" }),
    S("The number sentence is 15 + 8 = 23.", "গাণিতিক বাক্য: ১৫ + ৮ = ২৩।", { equation: "15 + 8 = 23" }),
  ]),
  V("solve-by-inverse", "c5.02", "Solve by using the inverse", "বিপরীত ক্রিয়া দিয়ে সমাধান", "algebra-stepper", "algebraStepper", { equation: "4x = 36", inverse: "36 ÷ 4", answer: 9, mode: "inverse" }, [
    S("4x means 4 times x. Undo it with division.", "4x মানে ৪ গুণ x। ভাগ দিয়ে পূর্বাবস্থায় ফেরাই।", { operation: "÷" }),
    S("x = 36 ÷ 4 = 9.", "x = ৩৬ ÷ ৪ = ৯।", { answer: 9 }),
  ]),
  V("inequality-intro", "c5.02", "Introduction to inequalities", "অসমতার ভূমিকা", "number-line", "numberLine", { inequality: "x > 3", boundary: 3, direction: "right", mode: "inequality" }, [
    S("x > 3 means every number greater than 3.", "x > ৩ মানে ৩-এর চেয়ে বড় সব সংখ্যা।", { boundary: 3 }),
    S("The open circle shows that 3 itself is not included.", "খোলা বৃত্ত দেখায় ৩ নিজে অন্তর্ভুক্ত নয়।", { open: true }),
  ]),

  V("hcf-venn-factors", "c5.03", "HCF with a Venn diagram", "ভেন চিত্রে গসাগু", "venn-set", "vennSet", { a: 24, b: 36, mode: "hcf" }, [
    S("Common factors of 24 and 36 are 1, 2, 3, 4, 6, 12.", "২৪ ও ৩৬-এর সাধারণ গুণনীয়ক: ১, ২, ৩, ৪, ৬, ১২।", { common: [1, 2, 3, 4, 6, 12] }),
    S("The greatest common factor is 12.", "সর্বোচ্চ সাধারণ গুণনীয়ক ১২।", { hcf: 12 }),
  ]),
  V("lcm-multiples-lines", "c5.03", "LCM on two number lines", "দুই সংখ্যারেখায় লসাগু", "number-line", "numberLine", { a: 6, b: 8, mode: "lcm", lcm: 24 }, [
    S("Skip-count by 6 and by 8.", "৬ ও ৮-এর গুণিতকগুলো লাফিয়ে গণনা করি।", { multiples: [6, 12, 18, 24] }),
    S("The first common stop is 24, so LCM = 24.", "প্রথম সাধারণ ঘর ২৪, তাই লসাগু = ২৪।", { lcm: 24 }),
  ]),
  V("prime-factor-tree", "c5.03", "Prime factor tree", "মৌলিক গুণনীয়ক বৃক্ষ", "algebra-stepper", "algebraStepper", { number: 84, mode: "factor-tree" }, [
    S("84 = 4 × 21.", "৮৪ = ৪ × ২১।", { split: [4, 21] }),
    S("4 = 2 × 2 and 21 = 3 × 7, so 84 = 2² × 3 × 7.", "৪ = ২ × ২, ২১ = ৩ × ৭, তাই ৮৪ = ২² × ৩ × ৭।", { factors: "2^2 \\times 3 \\times 7" }),
  ]),
  V("hcf-lcm-ladder", "c5.03", "HCF and LCM by the ladder method", "মই পদ্ধতিতে গসাগু ও লসাগু", "algebra-stepper", "algebraStepper", { a: 48, b: 60, mode: "ladder" }, [
    S("Divide both numbers by common prime factors.", "দুই সংখ্যাকে সাধারণ মৌলিক উৎপাদক দিয়ে ভাগ করি।", { primes: [2, 2, 3] }),
    S("HCF = 2 × 2 × 3 = 12 and LCM = 12 × 4 × 5 = 240.", "গসাগু = ২ × ২ × ৩ = ১২, লসাগু = ১২ × ৪ × ৫ = ২৪০।", { hcf: 12, lcm: 240 }),
  ]),
  V("real-life-lcm", "c5.03", "LCM in real life", "বাস্তব জীবনে লসাগু", "story-scene", "storyScene", { story: "Bus A comes every 6 minutes, Bus B every 8 minutes.", lcm: 24, mode: "lcm" }, [
    S("Find the first time both buses arrive together.", "দুটি বাস কখন একসাথে আসবে তা খুঁজি।", { every: [6, 8] }),
    S("LCM(6, 8) = 24, so they meet after 24 minutes.", "লসাগু(৬, ৮) = ২৪, তাই ২৪ মিনিট পরে মিলিত হবে।", { lcm: 24 }),
  ]),
  V("divisibility-lab", "c5.03", "Divisibility tests", "বিভাজ্যতার পরীক্ষা", "algebra-stepper", "algebraStepper", { number: 1260, tests: [2, 3, 4, 5, 6, 9, 10], mode: "divisibility" }, [
    S("1260 is even and ends in 0, so it is divisible by 2, 5 and 10.", "১২৬০ জোড় ও ০-এ শেষ, তাই ২, ৫ ও ১০ দিয়ে বিভাজ্য।", { by: [2, 5, 10] }),
    S("Digit sum is 9 and the last two digits are 60, so it is divisible by 3, 9 and 4.", "অঙ্কসমষ্টি ৯ ও শেষ দুই অঙ্ক ৬০, তাই ৩, ৯ ও ৪ দিয়ে বিভাজ্য।", { by: [3, 9, 4] }),
  ]),

  V("fraction-ops-bars", "c5.04", "Add fractions with unlike denominators", "অসম হর ভগ্নাংশের যোগ", "fraction-bar", "fractionBar", { a: "1/2", b: "1/3", mode: "add-unlike" }, [
    S("Use a common denominator: 1/2 = 3/6 and 1/3 = 2/6.", "সাধারণ হর নিই: ১/২ = ৩/৬ এবং ১/৩ = ২/৬।", { lcd: 6 }),
    S("3/6 + 2/6 = 5/6.", "৩/৬ + ২/৬ = ৫/৬।", { sum: "5/6" }, "\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}"),
  ]),
  V("lcd-finder", "c5.04", "Find the least common denominator", "লঘিষ্ঠ সাধারণ হর নির্ণয়", "algebra-stepper", "algebraStepper", { denominators: [4, 6], lcd: 12, mode: "lcd" }, [
    S("List multiples of 4 and 6.", "৪ ও ৬-এর গুণিতক তালিকা করি।", { multiples: [4, 8, 12] }),
    S("The least common denominator is 12.", "লঘিষ্ঠ সাধারণ হর ১২।", { lcd: 12 }),
  ]),
  V("multiply-fractions-area", "c5.04", "Multiply fractions by area", "ক্ষেত্রফল মডেলে ভগ্নাংশের গুণ", "array-grid", "arrayGrid", { a: "2/3", b: "3/4", mode: "fraction-area" }, [
    S("Shade 2/3 across and 3/4 down.", "আড়াআড়ি ২/৩ এবং লম্বালম্বি ৩/৪ ছায়া করি।", { overlap: "6/12" }),
    S("The overlap is 6/12 = 1/2.", "ছেদ অংশ ৬/১২ = ১/২।", { product: "1/2" }, "\\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{2}"),
  ]),
  V("divide-fractions-visual", "c5.04", "Divide fractions visually", "ভগ্নাংশের ভাগ চিত্রে", "fraction-bar", "fractionBar", { dividend: "3/4", divisor: "1/4", mode: "divide" }, [
    S("How many 1/4 pieces fit in 3/4?", "৩/৪-এর মধ্যে কতটি ১/৪ অংশ আছে?", { pieces: 3 }),
    S("There are 3 pieces, so 3/4 ÷ 1/4 = 3.", "৩টি অংশ আছে, তাই ৩/৪ ÷ ১/৪ = ৩।", { quotient: 3 }),
  ]),
  V("mixed-number-ops", "c5.04", "Mixed numbers and improper fractions", "মিশ্র সংখ্যা ও অপ্রকৃত ভগ্নাংশ", "fraction-bar", "fractionBar", { mixed: "2 1/3", improper: "7/3", mode: "convert" }, [
    S("2 1/3 = 2 + 1/3 = 6/3 + 1/3.", "২ ১/৩ = ২ + ১/৩ = ৬/৩ + ১/৩।", { whole: 2 }),
    S("So 2 1/3 = 7/3.", "তাই ২ ১/৩ = ৭/৩।", { improper: "7/3" }),
  ]),
  V("fraction-word-problems", "c5.04", "Fraction word problem", "ভগ্নাংশের শব্দ সমস্যা", "story-scene", "storyScene", { story: "A baker used 2/5 of a bag, then 1/5 more.", expression: "2/5 + 1/5", answer: "3/5", mode: "fraction" }, [
    S("The denominators match, so add the numerators.", "হর একই, তাই লব যোগ করি।", { denominators: 5 }),
    S("2/5 + 1/5 = 3/5 of the bag.", "ব্যাগের ২/৫ + ১/৫ = ৩/৫ অংশ।", { answer: "3/5" }),
  ]),
  V("fraction-misconceptions", "c5.04", "Do not add denominators", "হর যোগ করা যায় না", "fraction-bar", "fractionBar", { wrong: "1/2 + 1/3 = 2/5", correct: "5/6", mode: "misconception" }, [
    S("Do not add numerators and denominators directly.", "লব ও হর সরাসরি যোগ করা ভুল।", { wrong: "2/5" }),
    S("Use a common denominator: 3/6 + 2/6 = 5/6.", "সাধারণ হর নিই: ৩/৬ + ২/৬ = ৫/৬।", { correct: "5/6" }),
  ]),

  V("decimal-grid-ops", "c5.05", "Add decimals on a grid", "গ্রিডে দশমিকের যোগ", "array-grid", "arrayGrid", { a: 0.7, b: 0.25, mode: "decimal-add" }, [
    S("Write 0.7 as 0.70 and align the decimal points.", "০.৭-কে ০.৭০ লিখে দশমিক বিন্দু মিলাই।", { aligned: [0.7, 0.25] }),
    S("0.70 + 0.25 = 0.95.", "০.৭০ + ০.২৫ = ০.৯৫।", { sum: 0.95 }),
  ]),
  V("decimal-multiply-area", "c5.05", "Multiply decimals by area", "ক্ষেত্রফল মডেলে দশমিকের গুণ", "array-grid", "arrayGrid", { a: 0.3, b: 0.4, mode: "decimal-area" }, [
    S("A 10 × 10 grid shows tenths.", "১০ × ১০ গ্রিডে দশমাংশ দেখানো যায়।", { grid: 100 }),
    S("0.3 × 0.4 = 0.12.", "০.৩ × ০.৪ = ০.১২।", { product: 0.12 }),
  ]),
  V("decimal-divide-bars", "c5.05", "Divide a decimal by a whole number", "দশমিককে পূর্ণসংখ্যা দিয়ে ভাগ", "fraction-bar", "fractionBar", { dividend: 1.2, divisor: 4, mode: "decimal-divide" }, [
    S("Share 1.2 into 4 equal parts.", "১.২-কে ৪টি সমান অংশে ভাগ করি।", { parts: 4 }),
    S("1.2 ÷ 4 = 0.3.", "১.২ ÷ ৪ = ০.৩।", { quotient: 0.3 }),
  ]),
  V("decimal-fraction-converter", "c5.05", "Convert fractions and decimals", "ভগ্নাংশ ও দশমিকের রূপান্তর", "number-line", "numberLine", { fraction: "3/4", decimal: 0.75, mode: "convert" }, [
    S("3 ÷ 4 = 0.75.", "৩ ÷ ৪ = ০.৭৫।", { division: "3 ÷ 4" }),
    S("So 3/4 = 0.75.", "তাই ৩/৪ = ০.৭৫।", { decimal: 0.75 }),
  ]),
  V("decimal-point-shift", "c5.05", "Shift the decimal point", "দশমিক বিন্দু সরানো", "base-blocks", "baseBlocks", { number: 3.6, multiplier: 100, result: 360, mode: "point-shift" }, [
    S("Multiplying by 100 moves the point 2 places right.", "১০০ দিয়ে গুণ করলে বিন্দু ২ ঘর ডানে যায়।", { places: 2 }),
    S("3.6 × 100 = 360.", "৩.৬ × ১০০ = ৩৬০।", { result: 360 }),
  ]),
  V("recurring-decimal-peek", "c5.05", "Recurring decimals", "পুনরাবৃত্ত দশমিক", "number-line", "numberLine", { fraction: "1/3", decimal: "0.333...", mode: "recurring" }, [
    S("1 ÷ 3 never ends; the digit 3 repeats.", "১ ÷ ৩ শেষ হয় না; ৩ বারবার আসে।", { digit: 3 }),
    S("So 1/3 = 0.333...", "তাই ১/৩ = ০.৩৩৩...", { decimal: "0.333..." }),
  ]),

  V("hundred-grid-percent", "c5.06", "Percent on a hundred grid", "শতকরা গ্রিডে শতাংশ", "array-grid", "arrayGrid", { shaded: 25, total: 100, mode: "percent" }, [
    S("Shade 25 of 100 equal squares.", "১০০টি সমান ঘরের ২৫টি ছায়া করি।", { shaded: 25 }),
    S("25 out of 100 is 25%.", "১০০-এর মধ্যে ২৫ = ২৫%।", { percent: 25 }),
  ]),
  V("fraction-decimal-percent-triangle", "c5.06", "Fraction, decimal and percent", "ভগ্নাংশ, দশমিক ও শতাংশ", "number-line", "numberLine", { fraction: "1/4", decimal: 0.25, percent: 25, mode: "triangle" }, [
    S("1/4 = 0.25.", "১/৪ = ০.২৫।", { decimal: 0.25 }),
    S("0.25 = 25%.", "০.২৫ = ২৫%।", { percent: 25 }),
  ]),
  V("percent-of-quantity", "c5.06", "Percent of a quantity", "কোনো রাশির শতাংশ", "tape-diagram", "tapeDiagram", { percent: 20, value: 150, mode: "percent-of" }, [
    S("20% = 20/100 = 1/5.", "২০% = ২০/১০০ = ১/৫।", { fraction: "1/5" }),
    S("1/5 of 150 = 30.", "১৫০-এর ১/৫ = ৩০।", { answer: 30 }),
  ]),
  V("discount-and-profit-intro", "c5.06", "Discount and profit", "ছাড় ও লাভ", "money-shop", "moneyShop", { price: 500, discount: 20, mode: "discount" }, [
    S("20% of 500 = 100.", "৫০০-এর ২০% = ১০০।", { discount: 100 }),
    S("Sale price = 500 − 100 = 400 taka.", "বিক্রয়মূল্য = ৫০০ − ১০০ = ৪০০ টাকা।", { salePrice: 400 }),
  ]),
  V("percent-increase-decrease", "c5.06", "Percent increase and decrease", "শতকরা বৃদ্ধি ও হ্রাস", "chart", "chart", { before: 200, after: 250, mode: "increase" }, [
    S("Increase = 250 − 200 = 50.", "বৃদ্ধি = ২৫০ − ২০০ = ৫০।", { increase: 50 }),
    S("Percent increase = 50/200 × 100 = 25%.", "শতকরা বৃদ্ধি = ৫০/২০০ × ১০০ = ২৫%।", { percent: 25 }),
  ]),
  V("percent-vs-percentage-points", "c5.06", "Percent vs percentage points", "শতাংশ বনাম শতাংশ পয়েন্ট", "chart", "chart", { before: 20, after: 30, mode: "percentage-points" }, [
    S("The percentage rose from 20% to 30%.", "শতাংশ ২০% থেকে ৩০%-এ বাড়ে।", { points: 10 }),
    S("That is 10 percentage points, or a 50% increase.", "এটি ১০ শতাংশ পয়েন্ট, অর্থাৎ ৫০% বৃদ্ধি।", { increasePercent: 50 }),
  ]),

  V("levelling-bars", "c5.07", "Find the mean by levelling", "সমতল করে গড় নির্ণয়", "chart", "chart", { values: [5, 7, 9], mode: "mean-level" }, [
    S("Move 1 from the 9 bar to the 5 bar.", "৯-এর বার থেকে ১ নিয়ে ৫-এর বারে দিই।", { moved: 1 }),
    S("All bars become 7, so the mean is 7.", "সব বার ৭ হয়, তাই গড় ৭।", { mean: 7 }),
  ]),
  V("average-calculator-step", "c5.07", "Average step by step", "ধাপে ধাপে গড়", "algebra-stepper", "algebraStepper", { values: [12, 15, 18, 15], mode: "mean" }, [
    S("Add: 12 + 15 + 18 + 15 = 60.", "যোগ: ১২ + ১৫ + ১৮ + ১৫ = ৬০।", { total: 60 }),
    S("Divide by 4: 60 ÷ 4 = 15.", "৪ দিয়ে ভাগ: ৬০ ÷ ৪ = ১৫।", { mean: 15 }),
  ]),
  V("average-vs-extreme", "c5.07", "How an outlier changes the mean", "চরম মান গড়কে কীভাবে বদলায়", "chart", "chart", { values: [2, 3, 4, 11], mode: "outlier" }, [
    S("With all four values the mean is (2 + 3 + 4 + 11) ÷ 4 = 5.", "চারটি মানে গড় (২ + ৩ + ৪ + ১১) ÷ ৪ = ৫।", { mean: 5 }),
    S("Without 11 the mean is (2 + 3 + 4) ÷ 3 = 3.", "১১ বাদ দিলে গড় (২ + ৩ + ৪) ÷ ৩ = ৩।", { withoutOutlier: 3 }),
  ]),
  V("missing-value-average", "c5.07", "Find a missing value", "অজানা মান নির্ণয়", "tape-diagram", "tapeDiagram", { values: [8, 10, 12, null], mean: 11, mode: "missing" }, [
    S("Four values with mean 11 have total 44.", "চারটি মানের গড় ১১ হলে মোট ৪৪।", { total: 44 }),
    S("The missing value is 44 − (8 + 10 + 12) = 14.", "অজানা মান = ৪৪ − (৮ + ১০ + ১২) = ১৪।", { missing: 14 }),
  ]),
  V("average-real-life", "c5.07", "Average in daily life", "দৈনন্দিন জীবনে গড়", "story-scene", "storyScene", { story: "Daily temperatures: 30, 32, 34, 32 °C", mean: 32, mode: "mean" }, [
    S("Add the temperatures: 30 + 32 + 34 + 32 = 128.", "তাপমাত্রাগুলো যোগ: ৩০ + ৩২ + ৩৪ + ৩২ = ১২৮।", { total: 128 }),
    S("Divide by 4: 128 ÷ 4 = 32 °C.", "৪ দিয়ে ভাগ: ১২৮ ÷ ৪ = ৩২ °সে।", { mean: 32 }),
  ]),

  V("area-perimeter-explorer", "c5.08", "Area and perimeter", "ক্ষেত্রফল ও পরিসীমা", "shape-canvas", "shapeCanvas", { shape: "rectangle", width: 8, height: 5, mode: "area-perimeter" }, [
    S("Area = 8 × 5 = 40 square units.", "ক্ষেত্রফল = ৮ × ৫ = ৪০ বর্গ একক।", { area: 40 }),
    S("Perimeter = 2 × (8 + 5) = 26 units.", "পরিসীমা = ২ × (৮ + ৫) = ২৬ একক।", { perimeter: 26 }),
  ]),
  V("area-composite-shapes", "c5.08", "Area of composite shapes", "যৌগিক আকৃতির ক্ষেত্রফল", "shape-canvas", "shapeCanvas", { shape: "L", parts: [[8, 4], [3, 2]], mode: "composite-area" }, [
    S("Split the L-shape into two rectangles.", "L-আকৃতিকে দুইটি আয়তক্ষেত্রে ভাগ করি।", { parts: 2 }),
    S("Areas are 32 and 6, so the total is 38 square units.", "ক্ষেত্রফল ৩২ ও ৬, মোট ৩৮ বর্গ একক।", { area: 38 }),
  ]),
  V("volume-cuboid-layers", "c5.08", "Volume of a cuboid", "আয়তঘনকের আয়তন", "solid-3d", "solid3d", { length: 5, width: 4, height: 3, mode: "volume" }, [
    S("The base holds 5 × 4 = 20 unit cubes.", "তলায় ৫ × ৪ = ২০টি একক ঘনক ধরে।", { base: 20 }),
    S("With 3 layers, volume = 20 × 3 = 60 cubic units.", "৩ স্তরে আয়তন = ২০ × ৩ = ৬০ ঘন একক।", { volume: 60 }),
  ]),
  V("unit-conversion-ladder", "c5.08", "Unit conversion ladder", "একক রূপান্তরের মই", "number-line", "numberLine", { categories: ["length", "mass", "volume", "time"], mode: "conversion-ladder" }, [
    S("1 km = 1000 m, 1 kg = 1000 g, 1 L = 1000 mL.", "১ কিমি = ১০০০ মি, ১ কেজি = ১০০০ গ্রাম, ১ লিটার = ১০০০ মিলি।", { factor: 1000 }),
    S("1 hour = 60 minutes and 1 minute = 60 seconds.", "১ ঘণ্টা = ৬০ মিনিট, ১ মিনিট = ৬০ সেকেন্ড।", { time: [60, 60] }),
  ]),
  V("time-zone-and-duration", "c5.08", "Time duration", "সময়ের ব্যবধান", "clock", "clock", { start: "10:45", end: "13:20", mode: "duration" }, [
    S("From 10:45 to 11:45 is 1 hour.", "১০:৪৫ থেকে ১১:৪৫ = ১ ঘণ্টা।", { firstHour: 1 }),
    S("From 11:45 to 13:20 is another 1 hour 35 minutes.", "১১:৪৫ থেকে ১৩:২০ = আরও ১ ঘণ্টা ৩৫ মিনিট।", { duration: "2h 35m" }),
  ]),
  V("measurement-misconception", "c5.08", "Do not mix units", "একক মেশানো যাবে না", "shape-canvas", "shapeCanvas", { wrong: "3 m + 40 cm = 43 cm", correct: "340 cm", mode: "units" }, [
    S("Convert 3 m to 300 cm before adding.", "যোগের আগে ৩ মি = ৩০০ সেমি করি।", { converted: 300 }),
    S("300 cm + 40 cm = 340 cm.", "৩০০ সেমি + ৪০ সেমি = ৩৪০ সেমি।", { answer: 340 }),
  ]),

  V("angle-explorer", "c5.09", "Explore angles", "কোণ অন্বেষণ", "geometry-board", "geometryBoard", { mode: "angle", degrees: 135 }, [
    S("Place the protractor centre on the vertex.", "চাঁদার কেন্দ্র শীর্ষবিন্দুতে রাখি।", { vertex: true }),
    S("135° is greater than 90°, so it is obtuse.", "১৩৫° > ৯০°, তাই এটি স্থূলকোণ।", { type: "obtuse" }),
  ]),
  V("triangle-angle-sum", "c5.09", "Angles of a triangle", "ত্রিভুজের কোণ", "geometry-board", "geometryBoard", { angles: [50, 60, 70], mode: "angle-sum" }, [
    S("The three angles are 50°, 60° and 70°.", "তিনটি কোণ ৫০°, ৬০° ও ৭০°।", { angles: [50, 60, 70] }),
    S("Their sum is 180°.", "সমষ্টি ১৮০°।", { sum: 180 }),
  ]),
  V("quadrilateral-properties", "c5.09", "Properties of quadrilaterals", "চতুর্ভুজের ধর্ম", "geometry-board", "geometryBoard", { shape: "parallelogram", mode: "properties" }, [
    S("Opposite sides are parallel and equal.", "বিপরীত বাহুগুলো সমান্তরাল ও সমান।", { opposite: true }),
    S("The diagonals bisect each other.", "কর্ণদ্বয় পরস্পরকে সমদ্বিখণ্ডিত করে।", { diagonals: true }),
  ]),
  V("circle-explorer", "c5.09", "Parts of a circle", "বৃত্তের অংশ", "geometry-board", "geometryBoard", { radius: 7, mode: "circle" }, [
    S("Diameter = 2 × radius = 14 units.", "ব্যাস = ২ × ব্যাসার্ধ = ১৪ একক।", { diameter: 14 }),
    S("Circumference = 2πr ≈ 44 units.", "পরিধি = ২πr ≈ ৪৪ একক।", { circumference: 44 }),
  ]),
  V("symmetry-lines", "c5.09", "Lines of symmetry", "প্রতিসাম্যের অক্ষ", "shape-canvas", "shapeCanvas", { shape: "square", lines: 4, mode: "symmetry" }, [
    S("A square folds onto itself along 4 lines.", "বর্গক্ষেত্র ৪টি অক্ষ বরাবর নিজের উপর ভাঁজ হয়।", { lines: 4 }),
    S("Each fold gives two matching halves.", "প্রতিটি ভাঁজে দুইটি মিলিত অর্ধাংশ হয়।", { halves: 2 }),
  ]),
  V("solid-nets-and-views", "c5.09", "Nets and views of solids", "ঘনবস্তুর জাল ও দৃশ্য", "solid-3d", "solid3d", { shape: "cuboid", mode: "net-views" }, [
    S("Unfold the cuboid into 6 rectangles.", "আয়তঘনককে ৬টি আয়তক্ষেত্রে খুলি।", { faces: 6 }),
    S("The front, top and side views show different rectangles.", "সামনে, উপরে ও পাশের দৃশ্যে ভিন্ন আয়তক্ষেত্র দেখা যায়।", { views: 3 }),
  ]),
  V("coordinates-intro", "c5.09", "Coordinates in the first quadrant", "প্রথম চতুর্ভাগে স্থানাঙ্ক", "coordinate-plane", "coordinatePlane", { points: [[2, 3], [4, 1], [0, 5]], mode: "first-quadrant" }, [
    S("The first number is x: move right.", "প্রথম সংখ্যা x: ডানে যাই।", { axis: "x" }),
    S("The second number is y: move up.", "দ্বিতীয় সংখ্যা y: উপরে যাই।", { axis: "y" }),
  ]),

  V("bar-graph-pro", "c5.10", "Build a bar graph", "বার গ্রাফ তৈরি", "chart", "chart", { categories: ["A", "B", "C"], values: [12, 18, 9], mode: "bar" }, [
    S("Give the graph a title and label both axes.", "গ্রাফের শিরোনাম দিই এবং দুই অক্ষে লেবেল দিই।", { title: true }),
    S("Choose a scale and draw bars of heights 12, 18 and 9.", "স্কেল নিয়ে ১২, ১৮ ও ৯ উচ্চতার বার আঁকি।", { values: [12, 18, 9] }),
  ]),
  V("pie-chart-intro", "c5.10", "Introduction to pie charts", "পাই চার্টের ভূমিকা", "chart", "chart", { parts: [30, 50, 20], mode: "pie" }, [
    S("The parts add to 100%.", "অংশগুলো মিলে ১০০% হয়।", { total: 100 }),
    S("30%, 50% and 20% become 108°, 180° and 72° slices.", "৩০%, ৫০%, ২০% → ১০৮°, ১৮০°, ৭২° কোণ।", { degrees: [108, 180, 72] }),
  ]),
  V("line-graph-trend", "c5.10", "Line graph trends", "রেখা গ্রাফের প্রবণতা", "chart", "chart", { points: [5, 8, 6, 11, 14], mode: "line" }, [
    S("Plot the points and join them in order.", "বিন্দুগুলো বসিয়ে ক্রমানুসারে যোগ করি।", { points: 5 }),
    S("The line generally rises, so the trend is upward.", "রেখা সাধারণত ওপরে ওঠে, তাই প্রবণতা ঊর্ধ্বমুখী।", { trend: "up" }),
  ]),
  V("mean-median-mode-intro", "c5.10", "Mean, median and mode", "গড়, মধ্যক ও সংখ্যাগুরু", "chart", "chart", { values: [3, 5, 5, 7, 10], mode: "mean-median-mode" }, [
    S("Mean = (3 + 5 + 5 + 7 + 10) ÷ 5 = 6.", "গড় = (৩ + ৫ + ৫ + ৭ + ১০) ÷ ৫ = ৬।", { mean: 6 }),
    S("Median = 5 and mode = 5.", "মধ্যক = ৫ এবং সংখ্যাগুরু = ৫।", { median: 5, mode: 5 }),
  ]),
  V("misleading-graphs", "c5.10", "Misleading graphs", "বিভ্রান্তিকর গ্রাফ", "chart", "chart", { axisStart: 90, values: [95, 100], mode: "misleading" }, [
    S("The vertical axis starts at 90, not 0.", "উল্লম্ব অক্ষ ০ থেকে নয়, ৯০ থেকে শুরু।", { axisStart: 90 }),
    S("This makes a small difference look very large.", "এতে ছোট পার্থক্য অনেক বড় দেখায়।", { distorted: true }),
  ]),
];
