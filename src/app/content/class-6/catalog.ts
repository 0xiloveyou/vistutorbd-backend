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

export const CLASS6_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("number-system-map", "c6.01", "Natural and whole numbers", "স্বাভাবিক ও পূর্ণ সংখ্যা", "venn-set", "vennSet", { natural: [1, 2, 3], whole: [0, 1, 2, 3], mode: "number-system" }, [
    S("Natural numbers are 1, 2, 3, ... and whole numbers add 0.", "স্বাভাবিক সংখ্যা ১, ২, ৩, ... আর পূর্ণ সংখ্যায় ০ যোগ হয়।", { natural: [1, 2, 3], whole: [0, 1, 2, 3] }),
    S("Every natural number is whole, but 0 is whole and not natural.", "প্রতিটি স্বাভাবিক সংখ্যা পূর্ণ, কিন্তু ০ পূর্ণ হলেও স্বাভাবিক নয়।", { zeroNatural: false }),
  ]),
  V("place-value-to-crore", "c6.01", "Place value up to crore", "কোটি পর্যন্ত স্থানীয় মান", "base-blocks", "baseBlocks", { number: 12345678, groups: ["crore", "lakh", "thousand", "hundred"], mode: "place-value" }, [
    S("Group the digits from the right: 1,23,45,678.", "ডান থেকে অঙ্ক সাজাই: ১,২৩,৪৫,৬৭৮।", { groups: [1, 23, 45, 678] }),
    S("That is 1 crore + 23 lakh + 45 thousand + 678.", "অর্থাৎ ১ কোটি + ২৩ লক্ষ + ৪৫ হাজার + ৬৭৮।", { expanded: "1,23,45,678" }),
  ]),
  V("number-line-zoom", "c6.01", "Zoom on a number line", "সংখ্যারেখায় জুম", "number-line", "numberLine", { min: 0, max: 1, divisions: 10, mode: "zoom" }, [
    S("Zoom between 0 and 1 to see tenths.", "০ ও ১-এর মধ্যে জুম করে দশমাংশ দেখি।", { min: 0, max: 1 }),
    S("Zoom again to see hundredths between 0.1 and 0.2.", "আবার জুম করে ০.১ ও ০.২-এর মধ্যে শতাংশ দেখি।", { decimals: true }),
  ]),
  V("four-operations-stepper", "c6.01", "Order of operations with brackets", "বন্ধনীসহ ক্রমের নিয়ম", "algebra-stepper", "algebraStepper", { expression: "18 ÷ 3 + 2 × (7 − 4)", mode: "order-of-operations" }, [
    S("Brackets first: 7 − 4 = 3. Then multiply: 2 × 3 = 6.", "প্রথমে বন্ধনী: ৭ − ৪ = ৩। তারপর গুণ: ২ × ৩ = ৬।", { brackets: 3, product: 6 }),
    S("Divide 18 ÷ 3 = 6, then add 6 + 6 = 12.", "ভাগ ১৮ ÷ ৩ = ৬, তারপর যোগ ৬ + ৬ = ১২।", { answer: 12 }),
  ]),
  V("factors-multiples-lab", "c6.01", "Common factors and multiples", "সাধারণ গুণনীয়ক ও গুণিতক", "venn-set", "vennSet", { a: 18, b: 24, mode: "factors-multiples" }, [
    S("Common factors of 18 and 24 are 1, 2, 3, 6; HCF = 6.", "১৮ ও ২৪-এর সাধারণ গুণনীয়ক ১, ২, ৩, ৬; গসাগু = ৬।", { common: [1, 2, 3, 6], hcf: 6 }),
    S("Common multiples start at 72, so LCM = 72.", "সাধারণ গুণিতক ৭২ থেকে শুরু, তাই লসাগু = ৭২।", { lcm: 72 }),
  ]),
  V("prime-sieve", "c6.01", "The sieve of Eratosthenes", "ইরাটোস্থেনিসের চালনী", "number-grid", "numberGrid", { limit: 50, mode: "sieve" }, [
    S("Cross out multiples of 2, then 3, 5 and 7.", "২-এর গুণিতক, তারপর ৩, ৫ ও ৭-এর গুণিতক কাটি।", { cross: [2, 3, 5, 7] }),
    S("The 15 numbers left are the primes up to 50.", "বাকি ১৫টি সংখ্যাই ৫০ পর্যন্ত মৌলিক সংখ্যা।", { primes: 15 }),
  ]),
  V("prime-factor-tree", "c6.01", "Prime factor tree", "মৌলিক উৎপাদক বৃক্ষ", "algebra-stepper", "algebraStepper", { number: 60, mode: "factor-tree" }, [
    S("60 = 6 × 10.", "৬০ = ৬ × ১০।", { split: [6, 10] }),
    S("6 = 2 × 3 and 10 = 2 × 5, so 60 = 2² × 3 × 5.", "৬ = ২ × ৩, ১০ = ২ × ৫, তাই ৬০ = ২² × ৩ × ৫।", { factors: "2^2 \\times 3 \\times 5" }),
  ]),
  V("hcf-lcm-methods", "c6.01", "HCF and LCM methods", "গসাগু ও লসাগুর পদ্ধতি", "algebra-stepper", "algebraStepper", { a: 36, b: 48, mode: "hcf-lcm-methods" }, [
    S("Prime factors: 36 = 2² × 3² and 48 = 2⁴ × 3.", "মৌলিক উৎপাদক: ৩৬ = ২² × ৩² এবং ৪৮ = ২⁴ × ৩।", { a: "2^2 \\times 3^2", b: "2^4 \\times 3" }),
    S("HCF = 2² × 3 = 12 and LCM = 2⁴ × 3² = 144.", "গসাগু = ২² × ৩ = ১২, লসাগু = ২⁴ × ৩² = ১৪৪।", { hcf: 12, lcm: 144 }),
  ]),
  V("divisibility-rules", "c6.01", "Divisibility rules", "বিভাজ্যতার নিয়ম", "algebra-stepper", "algebraStepper", { number: 2376, tests: [2, 3, 4, 5, 6, 9, 10, 11], mode: "divisibility" }, [
    S("2376 is even, its digit sum is 18, and its last two digits are 76.", "২৩৭৬ জোড়, অঙ্কসমষ্টি ১৮, শেষ দুই অঙ্ক ৭৬।", { by: [2, 3, 4, 9] }),
    S("Alternating sum 6 − 7 + 3 − 2 = 0, so it is divisible by 11.", "একান্তর যোগফল ৬ − ৭ + ৩ − ২ = ০, তাই ১১ দিয়ে বিভাজ্য।", { by11: true }),
  ]),
  V("fraction-types", "c6.01", "Proper, improper and mixed fractions", "প্রকৃত, অপ্রকৃত ও মিশ্র ভগ্নাংশ", "fraction-bar", "fractionBar", { proper: "3/5", improper: "7/4", mixed: "1 3/4", mode: "fraction-types" }, [
    S("In 3/5 the numerator is smaller, so it is a proper fraction.", "৩/৫-এ লব ছোট, তাই এটি প্রকৃত ভগ্নাংশ।", { proper: "3/5" }),
    S("In 7/4 the numerator is larger; 7/4 = 1 3/4 is improper and mixed.", "৭/৪-এ লব বড়; ৭/৪ = ১ ৩/৪ অপ্রকৃত ও মিশ্র।", { improper: "7/4", mixed: "1 3/4" }),
  ]),
  V("equivalent-fractions-wall", "c6.01", "Equivalent fractions wall", "সমতুল্য ভগ্নাংশের দেয়াল", "fraction-bar", "fractionBar", { fraction: "1/2", equivalents: ["2/4", "3/6", "4/8"], mode: "equivalent-wall" }, [
    S("1/2 lines up with 2/4, 3/6 and 4/8.", "১/২ একই সারিতে মেলে ২/৪, ৩/৬ ও ৪/৮-এর সাথে।", { equivalents: ["2/4", "3/6", "4/8"] }),
    S("Multiply the top and bottom by the same number to get equivalents.", "লব ও হরকে একই সংখ্যা দিয়ে গুণ করলে সমতুল্য ভগ্নাংশ পাওয়া যায়।", { sameFactor: true }),
  ]),
  V("simplify-fractions", "c6.01", "Simplify fractions with the HCF", "গসাগু দিয়ে ভগ্নাংশ সরল করা", "algebra-stepper", "algebraStepper", { numerator: 18, denominator: 24, hcf: 6, mode: "simplify" }, [
    S("The HCF of 18 and 24 is 6.", "১৮ ও ২৪-এর গসাগু ৬।", { hcf: 6 }),
    S("18/24 = (18 ÷ 6)/(24 ÷ 6) = 3/4.", "১৮/২৪ = (১৮ ÷ ৬)/(২৪ ÷ ৬) = ৩/৪।", { simplified: "3/4" }),
  ]),
  V("compare-order-fractions", "c6.01", "Compare and order fractions", "ভগ্নাংশ তুলনা ও সাজানো", "number-line", "numberLine", { fractions: ["2/3", "3/5", "1/2"], mode: "compare" }, [
    S("Place each fraction on the number line: 0.5, 0.6 and 0.667.", "প্রতিটি ভগ্নাংশ সংখ্যারেখায় বসাই: ০.৫, ০.৬ ও ০.৬৬৭।", { decimals: [0.5, 0.6, 0.667] }),
    S("So 1/2 < 3/5 < 2/3.", "তাই ১/২ < ৩/৫ < ২/৩।", { order: ["1/2", "3/5", "2/3"] }),
  ]),
  V("add-subtract-fractions", "c6.01", "Add fractions with unlike denominators", "অসম হর ভগ্নাংশের যোগ", "fraction-bar", "fractionBar", { a: "1/3", b: "1/4", mode: "add-unlike" }, [
    S("LCD of 3 and 4 is 12: 1/3 = 4/12 and 1/4 = 3/12.", "৩ ও ৪-এর লসাগু ১২: ১/৩ = ৪/১২, ১/৪ = ৩/১২।", { lcd: 12 }),
    S("4/12 + 3/12 = 7/12.", "৪/১২ + ৩/১২ = ৭/১২।", { sum: "7/12" }, "\\frac{1}{3} + \\frac{1}{4} = \\frac{7}{12}"),
  ]),
  V("multiply-fractions-area", "c6.01", "Multiply fractions by area", "ক্ষেত্রফল মডেলে ভগ্নাংশের গুণ", "array-grid", "arrayGrid", { a: "2/3", b: "3/5", mode: "fraction-area" }, [
    S("Shade 2/3 across and 3/5 down; the overlap is 6/15.", "আড়াআড়ি ২/৩ ও লম্বালম্বি ৩/৫ ছায়া করি; ছেদ ৬/১৫।", { overlap: "6/15" }),
    S("Simplify 6/15 = 2/5.", "সরল করলে ৬/১৫ = ২/৫।", { product: "2/5" }, "\\frac{2}{3} \\times \\frac{3}{5} = \\frac{2}{5}"),
  ]),
  V("divide-fractions-reciprocal", "c6.01", "Divide fractions by the reciprocal", "ভগ্নাংশের ভাগ: বিপরীত ভগ্নাংশ", "fraction-bar", "fractionBar", { dividend: "3/4", divisor: "2/3", mode: "divide-reciprocal" }, [
    S("Dividing by 2/3 is the same as multiplying by 3/2.", "২/৩ দিয়ে ভাগ মানে ৩/২ দিয়ে গুণ।", { reciprocal: "3/2" }),
    S("3/4 × 3/2 = 9/8 = 1 1/8.", "৩/৪ × ৩/২ = ৯/৮ = ১ ১/৮।", { quotient: "9/8" }, "\\frac{3}{4} \\div \\frac{2}{3} = \\frac{9}{8}"),
  ]),
  V("fraction-word-problems", "c6.01", "Fraction of a quantity", "রাশির ভগ্নাংশ", "tape-diagram", "tapeDiagram", { story: "A tank is 3/5 full with 60 litres.", whole: 100, mode: "fraction-of-quantity" }, [
    S("3/5 of the tank is 60 litres, so 1/5 is 60 ÷ 3 = 20 litres.", "ট্যাঙ্কের ৩/৫ = ৬০ লিটার, তাই ১/৫ = ৬০ ÷ ৩ = ২০ লিটার।", { oneFifth: 20 }),
    S("The whole tank holds 5 × 20 = 100 litres.", "পুরো ট্যাঙ্কে ধরে ৫ × ২০ = ১০০ লিটার।", { whole: 100 }),
  ]),
  V("decimal-fraction-bridge", "c6.01", "From fraction to decimal", "ভগ্নাংশ থেকে দশমিকে", "number-line", "numberLine", { fraction: "3/8", decimal: 0.375, mode: "fraction-decimal" }, [
    S("Divide the numerator by the denominator: 3 ÷ 8 = 0.375.", "লবকে হর দিয়ে ভাগ করি: ৩ ÷ ৮ = ০.৩৭৫।", { division: "3 ÷ 8" }),
    S("So 3/8 = 0.375.", "তাই ৩/৮ = ০.৩৭৫।", { decimal: 0.375 }),
  ]),

  V("ratio-bars", "c6.02", "Ratio as bars", "অনুপাতের বার", "tape-diagram", "tapeDiagram", { parts: [3, 5], mode: "ratio" }, [
    S("The ratio 3 : 5 means 3 parts to 5 parts, so 8 parts in all.", "৩ : ৫ অনুপাত মানে ৩ ভাগ বনাম ৫ ভাগ, মোট ৮ ভাগ।", { parts: [3, 5], totalParts: 8 }),
    S("Each part is the whole divided by 8.", "প্রতিটি ভাগ = সম্পূর্ণ ÷ ৮।", { totalParts: 8 }),
  ]),
  V("equivalent-ratios-table", "c6.02", "Equivalent ratios", "সমতুল্য অনুপাত", "algebra-stepper", "algebraStepper", { ratio: "2:3", scale: [2, 3, 4], mode: "equivalent-ratios" }, [
    S("Multiply both terms by 2: 2 : 3 = 4 : 6.", "দুই পদকে ২ দিয়ে গুণ: ২ : ৩ = ৪ : ৬।", { times2: "4:6" }),
    S("By 3 and 4 we also get 6 : 9 and 8 : 12.", "৩ ও ৪ দিয়ে পাই ৬ : ৯ এবং ৮ : ১২।", { equivalents: ["6:9", "8:12"] }),
  ]),
  V("ratio-sharing", "c6.02", "Sharing in a ratio", "অনুপাতে ভাগ", "tape-diagram", "tapeDiagram", { total: 120, ratio: [2, 3], mode: "share" }, [
    S("2 + 3 = 5 parts, so each part is 120 ÷ 5 = 24.", "২ + ৩ = ৫ ভাগ, তাই প্রতিটি ভাগ ১২০ ÷ ৫ = ২৪।", { part: 24 }),
    S("The shares are 2 × 24 = 48 and 3 × 24 = 72.", "ভাগগুলো ২ × ২৪ = ৪৮ এবং ৩ × ২৪ = ৭২।", { shares: [48, 72] }),
  ]),
  V("ratio-vs-fraction", "c6.02", "Ratio versus fraction", "অনুপাত বনাম ভগ্নাংশ", "fraction-bar", "fractionBar", { ratio: [2, 3], partWhole: "2/5", mode: "ratio-vs-fraction" }, [
    S("2 : 3 compares one part to another part.", "২ : ৩ এক অংশকে অন্য অংশের সাথে তুলনা করে।", { partToPart: "2:3" }),
    S("The same 2 out of 5 is the fraction 2/5, part to whole.", "একই ৫-এর মধ্যে ২ হলো ভগ্নাংশ ২/৫, অংশ বনাম সম্পূর্ণ।", { partToWhole: "2/5" }),
  ]),
  V("proportion-lab", "c6.02", "Scaling a recipe", "রেসিপি মাপ বাড়ানো", "chart", "chart", { recipe: { flour: 2, sugar: 1 }, batches: 4, mode: "proportion" }, [
    S("One batch uses 2 cups of flour and 1 cup of sugar.", "এক ব্যাচে ২ কাপ আটা ও ১ কাপ চিনি লাগে।", { batch: [2, 1] }),
    S("For 4 batches multiply by 4: 8 cups flour and 4 cups sugar.", "৪ ব্যাচে ৪ দিয়ে গুণ: ৮ কাপ আটা ও ৪ কাপ চিনি।", { scaled: [8, 4] }),
  ]),
  V("unitary-method", "c6.02", "The unitary method", "একক পদ্ধতি", "tape-diagram", "tapeDiagram", { items: 5, cost: 40, mode: "unitary" }, [
    S("5 items cost 40 taka, so 1 item costs 40 ÷ 5 = 8 taka.", "৫টি জিনিসের দাম ৪০ টাকা, তাই ১টির দাম ৪০ ÷ ৫ = ৮ টাকা।", { unit: 8 }),
    S("12 items cost 12 × 8 = 96 taka.", "১২টি জিনিসের দাম ১২ × ৮ = ৯৬ টাকা।", { cost12: 96 }),
  ]),
  V("percent-grid", "c6.02", "Percent on a hundred grid", "শতকরা গ্রিডে শতাংশ", "array-grid", "arrayGrid", { shaded: 35, total: 100, mode: "percent" }, [
    S("Shade 35 of 100 equal squares.", "১০০টি সমান ঘরের ৩৫টি ছায়া করি।", { shaded: 35 }),
    S("35 out of 100 is 35%.", "১০০-এর মধ্যে ৩৫ = ৩৫%।", { percent: 35 }),
  ]),
  V("percent-fraction-decimal", "c6.02", "Percent, fraction and decimal", "শতাংশ, ভগ্নাংশ ও দশমিক", "number-line", "numberLine", { fraction: "3/5", decimal: 0.6, percent: 60, mode: "percent-convert" }, [
    S("3/5 = 3 ÷ 5 = 0.6.", "৩/৫ = ৩ ÷ ৫ = ০.৬।", { decimal: 0.6 }),
    S("0.6 = 60%.", "০.৬ = ৬০%।", { percent: 60 }),
  ]),
  V("percent-of-quantity", "c6.02", "Percent of a quantity", "রাশির শতাংশ", "tape-diagram", "tapeDiagram", { percent: 25, value: 240, mode: "percent-of" }, [
    S("25% = 25/100 = 1/4.", "২৫% = ২৫/১০০ = ১/৪।", { fraction: "1/4" }),
    S("1/4 of 240 = 60.", "২৪০-এর ১/৪ = ৬০।", { answer: 60 }),
  ]),
  V("discount-and-vat", "c6.02", "Discount and VAT", "ছাড় ও ভ্যাট", "money-shop", "moneyShop", { price: 800, discount: 15, vat: 5, mode: "discount-vat" }, [
    S("Discount 15% of 800 = 120, so the price becomes 680.", "৮০০-এর ১৫% = ১২০ ছাড়, তাই দাম হয় ৬৮০।", { discount: 120, afterDiscount: 680 }),
    S("VAT 5% of 680 = 34, so the final price is 714 taka.", "৬৮০-এর ৫% ভ্যাট = ৩৪, তাই চূড়ান্ত দাম ৭১৪ টাকা।", { vat: 34, final: 714 }),
  ]),
  V("percent-change", "c6.02", "Percent increase and decrease", "শতকরা বৃদ্ধি ও হ্রাস", "chart", "chart", { before: 400, after: 500, mode: "percent-change" }, [
    S("The change is 500 − 400 = 100.", "পরিবর্তন = ৫০০ − ৪০০ = ১০০।", { change: 100 }),
    S("Percent change = 100/400 × 100 = 25%.", "শতকরা পরিবর্তন = ১০০/৪০০ × ১০০ = ২৫%।", { percent: 25 }),
  ]),

  V("integer-number-line", "c6.03", "Adding integers on a number line", "সংখ্যারেখায় পূর্ণসংখ্যার যোগ", "number-line", "numberLine", { min: -10, max: 10, mode: "integer-add" }, [
    S("Start at −4 and move 7 steps to the right.", "−৪ থেকে শুরু করে ৭ ধাপ ডানে যাই।", { start: -4, move: 7 }),
    S("−4 + 7 = 3.", "−৪ + ৭ = ৩।", { result: 3 }),
  ]),
  V("temperature-thermometer", "c6.03", "Negative numbers in weather", "আবহাওয়ায় ঋণাত্মক সংখ্যা", "story-scene", "storyScene", { story: "The temperature was −3°C and rose 8°C.", start: -3, change: 8, mode: "temperature" }, [
    S("Start at −3°C on the thermometer.", "থার্মোমিটারে −৩°সে থেকে শুরু করি।", { start: -3 }),
    S("Rising 8°C gives −3 + 8 = 5°C.", "৮°সে বাড়লে −৩ + ৮ = ৫°সে।", { result: 5 }),
  ]),
  V("debt-and-money", "c6.03", "Debt as a negative number", "ঋণকে ঋণাত্মক সংখ্যা", "money-shop", "moneyShop", { debt: 50, cash: 30, mode: "debt" }, [
    S("Owing 50 taka is written as −50.", "৫০ টাকা ঋণকে −৫০ লিখি।", { debt: -50 }),
    S("Paying 30 taka leaves −50 + 30 = −20 taka.", "৩০ টাকা পরিশোধে থাকে −৫০ + ৩০ = −২০ টাকা।", { net: -20 }),
  ]),
  V("absolute-value-distance", "c6.03", "Absolute value as distance", "পরম মান = দূরত্ব", "number-line", "numberLine", { a: -4, b: 3, mode: "absolute-distance" }, [
    S("|−4| = 4 is the distance from −4 to 0.", "|−৪| = ৪ হলো −৪ থেকে ০ পর্যন্ত দূরত্ব।", { abs: 4 }),
    S("Distance from −4 to 3 is |3 − (−4)| = 7.", "−৪ থেকে ৩ পর্যন্ত দূরত্ব |৩ − (−৪)| = ৭।", { distance: 7 }),
  ]),
  V("add-integers-chips", "c6.03", "Adding integers with chips", "চিপ দিয়ে পূর্ণসংখ্যার যোগ", "balance-scale", "balanceScale", { positive: 5, negative: 3, mode: "zero-pairs" }, [
    S("Pair each negative chip with a positive chip: 3 zero pairs.", "প্রতিটি ঋণাত্মক চিপকে ধনাত্মক চিপের সাথে মিলাই: ৩টি শূন্য জোড়া।", { zeroPairs: 3 }),
    S("2 positive chips remain, so 5 + (−3) = 2.", "২টি ধনাত্মক চিপ বাকি, তাই ৫ + (−৩) = ২।", { result: 2 }),
  ]),
  V("subtract-as-add-opposite", "c6.03", "Subtract by adding the opposite", "বিপরীত যোগ করে বিয়োগ", "number-line", "numberLine", { a: 2, b: 5, mode: "subtract-opposite" }, [
    S("Subtracting 5 is the same as adding −5.", "৫ বিয়োগ মানে −৫ যোগ করা।", { expression: "2 + (−5)" }),
    S("2 + (−5) = −3.", "২ + (−৫) = −৩।", { result: -3 }),
  ]),
  V("multiply-integers-patterns", "c6.03", "Sign rules for multiplication", "গুণের চিহ্নের নিয়ম", "number-grid", "numberGrid", { mode: "sign-rules" }, [
    S("A negative times a negative gives a positive.", "ঋণাত্মক × ঋণাত্মক = ধনাত্মক।", { sign: "+" }),
    S("A positive times a negative gives a negative.", "ধনাত্মক × ঋণাত্মক = ঋণাত্মক।", { sign: "-" }),
  ]),
  V("compare-order-integers", "c6.03", "Compare and order integers", "পূর্ণসংখ্যা তুলনা ও সাজানো", "number-line", "numberLine", { numbers: [-9, -2, 0, 4], mode: "order" }, [
    S("On a number line, the further left a number is, the smaller it is.", "সংখ্যারেখায় যত বামে, সংখ্যা তত ছোট।", { axis: true }),
    S("So −9 < −2 < 0 < 4.", "তাই −৯ < −২ < ০ < ৪।", { order: [-9, -2, 0, 4] }),
  ]),

  V("variable-box", "c6.04", "A variable as a mystery box", "অজানা বাক্স হিসেবে চলক", "balance-scale", "balanceScale", { box: "x", value: 7, mode: "variable" }, [
    S("A letter like x stands for a mystery number.", "x-এর মতো অক্ষর একটি অজানা সংখ্যা বোঝায়।", { symbol: "x" }),
    S("If x = 7, then x + 3 = 10.", "যদি x = ৭, তবে x + ৩ = ১০।", { value: 7, expression: "7 + 3 = 10" }),
  ]),
  V("expression-builder", "c6.04", "Words to expressions", "কথা থেকে রাশি", "algebra-stepper", "algebraStepper", { words: "5 more than three times a number", terms: [3, "x", 5], mode: "words-to-expression" }, [
    S("'Three times a number' is 3x.", "'একটি সংখ্যার তিন গুণ' হলো 3x।", { term: "3x" }),
    S("'5 more' adds 5, giving 3x + 5.", "'৫ বেশি' যোগ করলে 3x + ৫ হয়।", { expression: "3x + 5" }),
  ]),
  V("substitution-machine", "c6.04", "Substitution machine", "প্রতিস্থাপন যন্ত্র", "algebra-stepper", "algebraStepper", { expression: "3x + 2", x: 4, mode: "substitution" }, [
    S("Replace x with 4: 3 × 4 + 2.", "x-এর জায়গায় ৪ বসাই: ৩ × ৪ + ২।", { substituted: "3 × 4 + 2" }),
    S("3 × 4 + 2 = 14.", "৩ × ৪ + ২ = ১৪।", { value: 14 }),
  ]),
  V("like-terms-sort", "c6.04", "Collect like terms", "সদৃশ পদ সংগ্রহ", "algebra-stepper", "algebraStepper", { terms: ["4x", "3", "2x", "5"], mode: "like-terms" }, [
    S("Group like terms: 4x + 2x and 3 + 5.", "সদৃশ পদ একসাথে: 4x + 2x এবং ৩ + ৫।", { groups: [["4x", "2x"], ["3", "5"]] }),
    S("4x + 2x = 6x and 3 + 5 = 8, so the sum is 6x + 8.", "4x + 2x = 6x, ৩ + ৫ = ৮, তাই যোগফল 6x + ৮।", { simplified: "6x + 8" }),
  ]),
  V("algebra-tiles-add", "c6.04", "Add expressions with tiles", "টাইল দিয়ে রাশি যোগ", "algebra-stepper", "algebraStepper", { xTiles: 2, unitTiles: 3, add: [1, 4], mode: "tiles-add" }, [
    S("Combine x tiles: 2x + x = 3x.", "x টাইল যোগ: 2x + x = 3x।", { xTiles: 3 }),
    S("Combine unit tiles: 3 + 4 = 7, so the result is 3x + 7.", "একক টাইল যোগ: ৩ + ৪ = ৭, তাই ফল 3x + ৭।", { result: "3x + 7" }),
  ]),
  V("expand-brackets-area", "c6.04", "Expand brackets with area", "ক্ষেত্রফল মডেলে বন্ধনী খোলা", "array-grid", "arrayGrid", { expression: "3(x + 4)", mode: "distribute-area" }, [
    S("A rectangle of width 3 and length x + 4 splits into two parts.", "প্রস্থ ৩ ও দৈর্ঘ্য x + ৪ আয়তক্ষেত্র দুই অংশে ভাগ হয়।", { width: 3 }),
    S("3 × x = 3x and 3 × 4 = 12, so 3(x + 4) = 3x + 12.", "৩ × x = 3x, ৩ × ৪ = ১২, তাই ৩(x + ৪) = 3x + ১২।", { expanded: "3x + 12" }),
  ]),
  V("pattern-to-expression", "c6.04", "From pattern to expression", "প্যাটার্ন থেকে রাশি", "shape-canvas", "shapeCanvas", { shape: "matchsticks", term: 5, formula: "3n + 1", mode: "pattern" }, [
    S("Each new square adds 3 matchsticks, starting from 4.", "প্রতিটি নতুন বর্গে ৩টি কাঠি যোগ হয়, শুরু ৪ থেকে।", { step: 3, start: 4 }),
    S("The rule is 3n + 1; for n = 5 that is 16 matchsticks.", "নিয়ম 3n + ১; n = ৫ হলে ১৬টি কাঠি।", { expression: "3n + 1", value: 16 }),
  ]),
  V("formula-from-shapes", "c6.04", "Formula from shapes", "আকৃতি থেকে সূত্র", "shape-canvas", "shapeCanvas", { shape: "rectangle", width: "l", height: "w", mode: "formula" }, [
    S("Perimeter adds the four sides: l + w + l + w = 2(l + w).", "পরিসীমা চার বাহুর যোগ: l + w + l + w = ২(l + w)।", { perimeter: "2(l + w)" }),
    S("Area multiplies length by width: A = lw.", "ক্ষেত্রফল দৈর্ঘ্য × প্রস্থ: A = lw।", { area: "lw" }),
  ]),

  V("balance-solve", "c6.05", "Solve by balancing", "ভারসাম্য রেখে সমাধান", "balance-scale", "balanceScale", { left: "2x + 3", right: 11, mode: "solve" }, [
    S("Subtract 3 from both sides: 2x = 8.", "দুই পাশ থেকে ৩ বিয়োগ: 2x = ৮।", { step: "2x = 8" }),
    S("Divide both sides by 2: x = 4.", "দুই পাশ ২ দিয়ে ভাগ: x = ৪।", { answer: 4 }),
  ]),
  V("inverse-operations-stepper", "c6.05", "Undo with inverse operations", "বিপরীত ক্রিয়ায় সমাধান", "algebra-stepper", "algebraStepper", { equation: "x + 9 = 15", inverse: "−9", mode: "inverse" }, [
    S("Adding 9 is undone by subtracting 9.", "৯ যোগ করার বিপরীত হলো ৯ বিয়োগ।", { operation: "−9" }),
    S("x = 15 − 9 = 6.", "x = ১৫ − ৯ = ৬।", { answer: 6 }),
  ]),
  V("two-step-equations", "c6.05", "Two-step equations", "দুই ধাপের সমীকরণ", "algebra-stepper", "algebraStepper", { equation: "4x − 5 = 19", mode: "two-step" }, [
    S("Add 5 to both sides: 4x = 24.", "দুই পাশে ৫ যোগ: 4x = ২৪।", { step: "4x = 24" }),
    S("Divide by 4: x = 6.", "৪ দিয়ে ভাগ: x = ৬।", { answer: 6 }),
  ]),
  V("equation-from-story", "c6.05", "Equation from a story", "গল্প থেকে সমীকরণ", "story-scene", "storyScene", { story: "Three notebooks and 5 taka cost 35 taka.", equation: "3n + 5 = 35", mode: "story" }, [
    S("Let each notebook cost n taka: 3n + 5 = 35.", "প্রতিটি খাতার দাম n টাকা: 3n + ৫ = ৩৫।", { equation: "3n + 5 = 35" }),
    S("Subtract 5 and divide by 3: n = 10 taka.", "৫ বিয়োগ করে ৩ দিয়ে ভাগ: n = ১০ টাকা।", { answer: 10 }),
  ]),
  V("check-by-substitution", "c6.05", "Check by substitution", "প্রতিস্থাপনে যাচাই", "algebra-stepper", "algebraStepper", { equation: "2x + 7 = 15", solution: 4, mode: "check" }, [
    S("Put x = 4 into 2x + 7: 2 × 4 + 7.", "x = ৪ বসাই 2x + ৭-এ: ২ × ৪ + ৭।", { substituted: "2 × 4 + 7" }),
    S("2 × 4 + 7 = 15, so the solution is correct.", "২ × ৪ + ৭ = ১৫, তাই সমাধানটি সঠিক।", { verified: true }),
  ]),
  V("bar-model-equation", "c6.05", "Bar model for an equation", "সমীকরণের বার মডেল", "tape-diagram", "tapeDiagram", { equation: "x + 6 = 14", mode: "bar-model" }, [
    S("A bar of x plus a bar of 6 makes 14.", "একটি x বার আর একটি ৬ বার মিলে ১৪ হয়।", { total: 14, known: 6 }),
    S("x = 14 − 6 = 8.", "x = ১৪ − ৬ = ৮।", { answer: 8 }),
  ]),
  V("equation-error-hunt", "c6.05", "Find the equation mistake", "সমীকরণের ভুল খোঁজা", "algebra-stepper", "algebraStepper", { wrong: "3x + 4 = 16 → 3x = 20", correct: "3x = 12, x = 4", mode: "error-hunt" }, [
    S("The mistake is adding 4 instead of subtracting it.", "ভুলটি হলো ৪ বিয়োগ না করে যোগ করা।", { step: "3x = 12" }),
    S("Subtract 4 from both sides: 3x = 12, so x = 4.", "দুই পাশ থেকে ৪ বিয়োগ: 3x = ১২, তাই x = ৪।", { answer: 4 }),
  ]),

  V("point-line-ray-segment", "c6.06", "Points, lines, rays and segments", "বিন্দু, রেখা, রশ্মি ও রেখাংশ", "geometry-board", "geometryBoard", { mode: "point-line-ray-segment" }, [
    S("A point is a position; a line segment has two end points.", "বিন্দু একটি অবস্থান; রেখাংশের দুই প্রান্তবিন্দু থাকে।", { segment: true }),
    S("A ray starts at one point and goes on forever in one direction.", "রশ্মি এক বিন্দু থেকে শুরু হয়ে এক দিকে অনন্ত চলে।", { ray: true }),
  ]),
  V("angle-builder", "c6.06", "Build and measure an angle", "কোণ তৈরি ও পরিমাপ", "geometry-board", "geometryBoard", { degrees: 55, mode: "angle-builder" }, [
    S("Two rays from a common vertex make an angle.", "একটি সাধারণ শীর্ষ থেকে দুই রশ্মি কোণ তৈরি করে।", { vertex: true }),
    S("This angle measures 55°, which is acute.", "এই কোণের মাপ ৫৫°, যা সূক্ষ্মকোণ।", { degrees: 55, type: "acute" }),
  ]),
  V("angle-types-protractor", "c6.06", "Reading the protractor", "চাঁদা পড়া", "geometry-board", "geometryBoard", { degrees: 120, mode: "protractor" }, [
    S("Line up the protractor centre and the zero line.", "চাঁদার কেন্দ্র ও শূন্য রেখা মিলাই।", { aligned: true }),
    S("120° is obtuse because it is more than 90°.", "১২০° স্থূলকোণ, কারণ এটি ৯০°-এর বেশি।", { degrees: 120, type: "obtuse" }),
  ]),
  V("complementary-supplementary", "c6.06", "Complementary and supplementary angles", "পূরক ও সম্পূরক কোণ", "geometry-board", "geometryBoard", { a: 35, mode: "complement-supplement" }, [
    S("Complementary angles add to 90°: 35° + 55° = 90°.", "পূরক কোণ মিলে ৯০°: ৩৫° + ৫৫° = ৯০°।", { complement: 55 }),
    S("Supplementary angles add to 180°: 35° + 145° = 180°.", "সম্পূরক কোণ মিলে ১৮০°: ৩৫° + ১৪৫° = ১৮০°।", { supplement: 145 }),
  ]),
  V("vertical-angles", "c6.06", "Vertical angles", "বিপ্রতীপ কোণ", "geometry-board", "geometryBoard", { angle: 65, mode: "vertical" }, [
    S("Vertical angles are opposite each other and equal.", "বিপ্রতীপ কোণ পরস্পর বিপরীতে থাকে ও সমান।", { equal: 65 }),
    S("Each neighbouring angle is 180° − 65° = 115°.", "প্রতিটি সন্নিহিত কোণ ১৮০° − ৬৫° = ১১৫°।", { adjacent: 115 }),
  ]),
  V("parallel-lines-transversal", "c6.06", "Parallel lines and a transversal", "সমান্তরাল রেখা ও ছেদক", "geometry-board", "geometryBoard", { angle: 70, mode: "transversal" }, [
    S("Corresponding and alternate angles are equal: 70°.", "অনুরূপ ও একান্তর কোণ সমান: ৭০°।", { equal: 70 }),
    S("Co-interior angles add to 180°, so the other is 110°.", "সমপার্শ্বস্থ কোণ মিলে ১৮০°, তাই অন্যটি ১১০°।", { coInterior: 110 }),
  ]),
  V("triangle-types-explorer", "c6.06", "Types of triangles", "ত্রিভুজের প্রকার", "geometry-board", "geometryBoard", { sides: [5, 5, 8], angles: [50, 50, 80], mode: "triangle-types" }, [
    S("Two equal sides make an isosceles triangle.", "দুই সমান বাহু থাকলে সমদ্বিবাহু ত্রিভুজ হয়।", { equalSides: 2 }),
    S("The two base angles are equal at 50°, and the angles sum to 180°.", "দুই ভূমিকোণ সমান ৫০°, কোণগুলোর যোগ ১৮০°।", { angles: [50, 50, 80] }),
  ]),
  V("triangle-angle-sum", "c6.06", "Angle sum of a triangle", "ত্রিভুজের কোণের সমষ্টি", "geometry-board", "geometryBoard", { angles: [45, 60, 75], mode: "angle-sum" }, [
    S("Tear off the three corners and place them together.", "তিনটি কোণা ছিঁড়ে একসাথে রাখি।", { arrange: true }),
    S("They form a straight line: 45° + 60° + 75° = 180°.", "তারা সরলরেখা তৈরি করে: ৪৫° + ৬০° + ৭৫° = ১৮০°।", { sum: 180 }),
  ]),
  V("quadrilateral-family-tree", "c6.06", "The quadrilateral family", "চতুর্ভুজের পরিবার", "geometry-board", "geometryBoard", { mode: "quadrilateral-tree" }, [
    S("A quadrilateral has four sides; a trapezium has one pair of parallel sides.", "চতুর্ভুজের চার বাহু; ট্রাপিজিয়ামে এক জোড়া সমান্তরাল বাহু।", { sides: 4 }),
    S("A parallelogram has two pairs; rectangles, rhombuses and squares are special cases.", "সামান্তরিকের দুই জোড়া; আয়ত, রম্বস ও বর্গ বিশেষ রূপ।", { parallelPairs: 2 }),
  ]),
  V("circle-parts", "c6.06", "Parts of a circle", "বৃত্তের অংশ", "geometry-board", "geometryBoard", { radius: 6, mode: "circle-parts" }, [
    S("The radius is 6, so the diameter is 2 × 6 = 12.", "ব্যাসার্ধ ৬, তাই ব্যাস ২ × ৬ = ১২।", { diameter: 12 }),
    S("A chord joins two points on the circle; an arc is part of the circle.", "জ্যা বৃত্তের দুই বিন্দু যোগ করে; চাপ বৃত্তের অংশ।", { chord: true, arc: true }),
  ]),

  V("compass-and-ruler", "c6.07", "Compass and ruler tools", "কম্পাস ও রুলার", "compass-construct", "compassConstruct", { mode: "tools" }, [
    S("Use the ruler for straight lines and the compass for circles and arcs.", "সরল রেখায় রুলার, বৃত্ত ও চাপে কম্পাস ব্যবহার করি।", { ruler: true, compass: true }),
    S("Keep the compass opening fixed to copy a length.", "দৈর্ঘ্য কপি করতে কম্পাসের ফাঁক অপরিবর্তিত রাখি।", { fixedRadius: true }),
  ]),
  V("draw-a-segment-bisector", "c6.07", "Perpendicular bisector of a segment", "রেখাংশের লম্ব সমদ্বিখণ্ডক", "compass-construct", "compassConstruct", { segment: "AB", mode: "perpendicular-bisector" }, [
    S("Draw arcs from A and B with the same radius.", "A ও B থেকে সমান ব্যাসার্ধে চাপ আঁকি।", { equalArcs: true }),
    S("Join the two crossing points to get the perpendicular bisector.", "দুই ছেদবিন্দু যোগ করলে লম্ব সমদ্বিখণ্ডক পাওয়া যায়।", { result: "perpendicular bisector" }),
  ]),
  V("angle-bisector", "c6.07", "Bisect an angle", "কোণ সমদ্বিখণ্ডিত করা", "compass-construct", "compassConstruct", { mode: "angle-bisector" }, [
    S("Draw an arc across both arms from the vertex.", "শীর্ষ থেকে দুই বাহু জুড়ে একটি চাপ আঁকি।", { step: 1 }),
    S("From those two marks, draw crossing arcs and join to the vertex.", "ঐ দুই দাগ থেকে ছেদকারী চাপ এঁকে শীর্ষের সাথে যোগ করি।", { result: "angle bisector" }),
  ]),
  V("construct-angles-60-90", "c6.07", "Construct 60° and 90° angles", "৬০° ও ৯০° কোণ অঙ্কন", "compass-construct", "compassConstruct", { angles: [60, 90], mode: "construct-angle" }, [
    S("An equilateral triangle gives a 60° angle.", "সমবাহু ত্রিভুজ ৬০° কোণ দেয়।", { angle60: true }),
    S("Bisecting 60° and adding the parts gives 90°.", "৬০° সমদ্বিখণ্ডিত করে যোগ করলে ৯০° পাওয়া যায়।", { angle90: true }),
  ]),
  V("construct-triangles", "c6.07", "Construct triangles (SSS, SAS)", "ত্রিভুজ অঙ্কন (SSS, SAS)", "compass-construct", "compassConstruct", { method: "SSS", sides: [4, 5, 6], mode: "triangle" }, [
    S("SSS: draw the base, then arcs with the other two side lengths.", "SSS: ভূমি এঁকে অন্য দুই বাহুর দৈর্ঘ্যে চাপ আঁকি।", { method: "SSS" }),
    S("SAS: use two sides and the angle between them.", "SAS: দুই বাহু ও তাদের মধ্যবর্তী কোণ ব্যবহার করি।", { method2: "SAS" }),
  ]),
  V("why-it-works", "c6.07", "Why the construction works", "অঙ্কন কেন কাজ করে", "geometry-board", "geometryBoard", { mode: "congruence-proof" }, [
    S("The two arcs create congruent triangles.", "দুই চাপ সর্বসম ত্রিভুজ তৈরি করে।", { congruent: true }),
    S("Equal triangles give equal angles, which proves the construction.", "সমান ত্রিভুজ সমান কোণ দেয়, যা অঙ্কন প্রমাণ করে।", { proof: true }),
  ]),

  V("data-collection-lab", "c6.08", "Collect and organise data", "তথ্য সংগ্রহ ও সাজানো", "chart", "chart", { categories: ["cricket", "football", "chess"], counts: [12, 8, 5], mode: "collect" }, [
    S("Ask each student and record a tally.", "প্রতিটি শিক্ষার্থীকে জিজ্ঞেস করে ট্যালি লিখি।", { tally: true }),
    S("Count the tallies: cricket 12, football 8 and chess 5.", "ট্যালি গণনা: ক্রিকেট ১২, ফুটবল ৮ ও দাবা ৫।", { counts: [12, 8, 5] }),
  ]),
  V("frequency-table-to-bar", "c6.08", "From frequency table to bar graph", "পরিসংখ্যান সারণি থেকে বার গ্রাফ", "chart", "chart", { table: { A: 6, B: 9, C: 4 }, mode: "frequency-bar" }, [
    S("A frequency table lists each value with its count.", "পরিসংখ্যান সারণিতে প্রতিটি মান ও তার সংখ্যা থাকে।", { table: true }),
    S("Draw bars of heights 6, 9 and 4 for A, B and C.", "A, B ও C-এর জন্য ৬, ৯ ও ৪ উচ্চতার বার আঁকি।", { values: [6, 9, 4] }),
  ]),
  V("pie-chart-builder", "c6.08", "Build a pie chart", "পাই চার্ট তৈরি", "chart", "chart", { parts: [40, 35, 25], mode: "pie" }, [
    S("The parts add to 100%.", "অংশগুলো মিলে ১০০% হয়।", { total: 100 }),
    S("Multiply each by 3.6: 40% → 144°, 35% → 126° and 25% → 90°.", "প্রতিটিকে ৩.৬ দিয়ে গুণ: ৪০% → ১৪৪°, ৩৫% → ১২৬°, ২৫% → ৯০°।", { degrees: [144, 126, 90] }),
  ]),
  V("mean-median-mode-lab", "c6.08", "Mean, median and mode", "গড়, মধ্যক ও সংখ্যাগুরু", "chart", "chart", { values: [4, 6, 6, 8, 11], mode: "mean-median-mode" }, [
    S("Mean = (4 + 6 + 6 + 8 + 11) ÷ 5 = 7.", "গড় = (৪ + ৬ + ৬ + ৮ + ১১) ÷ ৫ = ৭।", { mean: 7 }),
    S("Median = 6 and mode = 6.", "মধ্যক = ৬ এবং সংখ্যাগুরু = ৬।", { median: 6, mode: 6 }),
  ]),
  V("outlier-effect", "c6.08", "How an outlier moves the mean", "চরম মান গড়কে কীভাবে বদলায়", "chart", "chart", { values: [5, 6, 7, 8], outlier: 30, mode: "outlier" }, [
    S("The mean of 5, 6, 7 and 8 is 26 ÷ 4 = 6.5.", "৫, ৬, ৭ ও ৮-এর গড় ২৬ ÷ ৪ = ৬.৫।", { mean: 6.5 }),
    S("Adding 30 raises the mean to 56 ÷ 5 = 11.2.", "৩০ যোগ করলে গড় বেড়ে ৫৬ ÷ ৫ = ১১.২ হয়।", { newMean: 11.2 }),
  ]),
  V("misleading-graph-spotter", "c6.08", "Spot a misleading graph", "বিভ্রান্তিকর গ্রাফ চেনা", "chart", "chart", { axisStart: 90, values: [95, 100], mode: "misleading" }, [
    S("The vertical axis starts at 90 instead of 0.", "উল্লম্ব অক্ষ ০ থেকে নয়, ৯০ থেকে শুরু।", { axisStart: 90 }),
    S("A small rise from 95 to 100 now looks like a huge jump.", "৯৫ থেকে ১০০-এর ছোট বৃদ্ধি এখন বিশাল লাফ দেখায়।", { distorted: true }),
  ]),
];
