import {
  L,
  S,
  callout,
  text,
  vizBlock,
  type PlayCategoryDef,
  type PlayStep,
  type PlayVisualizationDef,
} from "../play/play.types";
import { CLASS5_CATALOG_VISUALIZATIONS } from "./catalog";

const DIFF = 3;

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
  difficulty: DIFF,
  data,
  steps,
  aiContext: `${chapterCode}: ${en}`,
});

const T = (
  order: number,
  slug: string,
  en: string,
  bn: string,
  icon: string,
  vizSlugs: string[],
  law?: [string, string],
): PlayCategoryDef => ({
  slug,
  title: L(en, bn),
  summary: L(en, bn),
  icon,
  order,
  chapter: {
    slug,
    title: L(en, bn),
    summary: L(en, bn),
    order,
    topics: [
      {
        slug,
        title: L(en, bn),
        summary: L(en, bn),
        difficulty: DIFF,
        lesson: [
          text(en, bn),
          ...(law ? [callout(law[0], law[1])] : []),
          ...vizSlugs.map(vizBlock),
        ],
        vizSlugs,
      },
    ],
  },
});

export const CLASS5_VISUALIZATIONS: PlayVisualizationDef[] = [
  ...CLASS5_CATALOG_VISUALIZATIONS,
  V("area-model-5", "c5.01", "Area model of multiplication", "গুণের ক্ষেত্রফল মডেল", "array-grid", "arrayGrid", { rows: 23, cols: 14, mode: "area" }, [
    S("Split 23 into 20 + 3 and 14 into 10 + 4.", "২৩-কে ২০ + ৩ আর ১৪-কে ১০ + ৪ করি।", { split: [20, 3, 10, 4] }),
    S("Partial products: 200, 80, 30, 12. Add to get 322.", "আংশিক গুণফল: ২০০, ৮০, ৩০, ১২। যোগে ৩২২।", { product: 322 }),
  ]),
  V("long-division-5", "c5.01", "Long division", "দীর্ঘ ভাগ", "algebra-stepper", "algebraStepper", { dividend: 96, divisor: 4, mode: "long-division" }, [
    S("9 ÷ 4 = 2 remainder 1. Bring down 6 to make 16.", "৯ ÷ ৪ = ২ ভাগশেষ ১। ৬ নামিয়ে ১৬ করি।", { quotientPart: 2 }),
    S("16 ÷ 4 = 4, so 96 ÷ 4 = 24.", "১৬ ÷ ৪ = ৪, তাই ৯৬ ÷ ৪ = ২৪।", { quotient: 24 }),
  ]),
  V("equation-balance-5", "c5.02", "Balance an equation", "সমীকরণের ভারসাম্য", "balance-scale", "balanceScale", { left: "? + 5", right: 12, mode: "equation" }, [
    S("? + 5 = 12. Take 5 from both sides.", "? + ৫ = ১২। দুই পাশ থেকে ৫ সরাও।", { unknown: 7 }),
    S("? = 7. Check: 7 + 5 = 12.", "? = ৭। মিলাও: ৭ + ৫ = ১২।", { expression: "7 + 5 = 12" }),
  ]),
  V("prime-factor-tree-5", "c5.03", "Prime factor tree", "মৌলিক উৎপাদক গাছ", "tree-diagram", "treeDiagram", { number: 36, mode: "factor-tree" }, [
    S("36 = 4 × 9.", "৩৬ = ৪ × ৯।", { split: [4, 9] }),
    S("4 = 2 × 2 and 9 = 3 × 3, so 36 = 2² × 3².", "৪ = ২ × ২ আর ৯ = ৩ × ৩, তাই ৩৬ = ২² × ৩²।", { primeFactors: "2^2 \\times 3^2" }),
  ]),
  V("hcf-lcm-5", "c5.03", "HCF and LCM", "গসাগু ও লসাগু", "venn-set", "vennSet", { a: 12, b: 18, mode: "hcf-lcm" }, [
    S("Factors of 12 and 18 overlap at 1, 2, 3, 6. HCF = 6.", "১২ আর ১৮-এর সাধারণ গুণনীয়ক ১, ২, ৩, ৬। গসাগু = ৬।", { hcf: 6 }),
    S("Multiples overlap first at 36. LCM = 36.", "গুণিতক প্রথমে ৩৬-এ মেলে। লসাগু = ৩৬।", { lcm: 36 }),
  ]),
  V("fraction-add-5", "c5.04", "Add fractions", "ভগ্নাংশ যোগ", "fraction-bar", "fractionBar", { a: "1/5", b: "2/5", mode: "add" }, [
    S("The denominators match: 1/5 + 2/5.", "হর একই: ১/৫ + ২/৫।", { denominator: 5 }),
    S("Add the numerators: 3/5.", "লব যোগ: ৩/৫।", { expression: "\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}" }),
  ]),
  V("fraction-multiply-5", "c5.04", "Multiply fractions", "ভগ্নাংশ গুণ", "fraction-bar", "fractionBar", { a: "2/3", b: "3/4", mode: "multiply" }, [
    S("Multiply numerators and denominators: 2×3 over 3×4.", "লব × লব, হর × হর: ২×৩ / ৩×৪।", { expression: "\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12}" }),
    S("Simplify 6/12 to 1/2.", "৬/১২ সরল করলে ১/২।", { simplified: "1/2" }),
  ]),
  V("decimal-grid-5", "c5.05", "Decimal grid", "দশমিক গ্রিড", "fraction-bar", "fractionBar", { parts: 10, shaded: 3, mode: "tenths" }, [
    S("3 of 10 equal parts is 3/10 = 0.3.", "১০ সমান ভাগের ৩ ভাগ = ৩/১০ = ০.৩।", { decimal: 0.3 }),
    S("35 of 100 parts is 35/100 = 0.35.", "১০০ ভাগের ৩৫ ভাগ = ৩৫/১০০ = ০.৩৫।", { decimal: 0.35 }),
  ]),
  V("decimal-add-5", "c5.05", "Add decimals", "দশমিক যোগ", "algebra-stepper", "algebraStepper", { a: 3.6, b: 2.45, mode: "decimal-add" }, [
    S("Align 3.60 and 2.45 at the decimal point.", "৩.৬০ আর ২.৪৫ দশমিক বিন্দুতে সাজাও।", { aligned: true }),
    S("Add: 3.60 + 2.45 = 6.05.", "যোগ: ৩.৬০ + ২.৪৫ = ৬.০৫।", { sum: 6.05 }),
  ]),
  V("percent-grid-5", "c5.06", "Percentage grid", "শতকরা গ্রিড", "fraction-bar", "fractionBar", { parts: 100, shaded: 35, mode: "percent" }, [
    S("35 out of 100 squares is 35%.", "১০০ ঘরের ৩৫ ঘর হলো ৩৫%।", { percent: 35 }),
    S("35% = 35/100 = 0.35.", "৩৫% = ৩৫/১০০ = ০.৩৫।", { decimal: 0.35 }),
  ]),
  V("percent-of-5", "c5.06", "Percent of a number", "সংখ্যার শতকরা", "algebra-stepper", "algebraStepper", { percent: 20, value: 250, mode: "percent-of" }, [
    S("20% of 250 = (20/100) × 250.", "২৫০-এর ২০% = (২০/১০০) × ২৫০।", { expression: "\\frac{20}{100} \\times 250" }),
    S("= 0.2 × 250 = 50.", "= ০.২ × ২৫০ = ৫০।", { answer: 50 }),
  ]),
  V("average-bars-5", "c5.07", "Average by levelling", "সমান করে গড়", "chart", "chart", { values: [4, 6, 8], mode: "mean" }, [
    S("Add the values: 4 + 6 + 8 = 18.", "মান যোগ: ৪ + ৬ + ৮ = ১৮।", { total: 18 }),
    S("Divide by 3: 18 ÷ 3 = 6. The average is 6.", "৩ দিয়ে ভাগ: ১৮ ÷ ৩ = ৬। গড় ৬।", { mean: 6 }),
  ]),
  V("unit-convert-5", "c5.08", "Convert units", "একক রূপান্তর", "number-line", "numberLine", { chain: ["km", "m", "cm", "mm"], mode: "convert-length" }, [
    S("1 km = 1000 m and 1 m = 100 cm.", "১ কিমি = ১০০০ মি আর ১ মি = ১০০ সেমি।", { expression: "1 km = 1000 m" }),
    S("2 km 50 m = 2000 + 50 = 2050 m.", "২ কিমি ৫০ মি = ২০০০ + ৫০ = ২০৫০ মি।", { metres: 2050 }),
  ]),
  V("area-volume-5", "c5.08", "Area and volume", "ক্ষেত্রফল ও আয়তন", "shape-canvas", "shapeCanvas", { shape: "cuboid", width: 5, height: 3, depth: 4, mode: "area-volume" }, [
    S("Area of the base = 5 × 3 = 15 square units.", "ভূমির ক্ষেত্রফল = ৫ × ৩ = ১৫ বর্গ একক।", { area: 15 }),
    S("Volume = base area × depth = 15 × 4 = 60 cubic units.", "আয়তন = ভূমির ক্ষেত্রফল × গভীরতা = ১৫ × ৪ = ৬০ ঘন একক।", { volume: 60 }),
  ]),
  V("angle-types-5", "c5.09", "Angles", "কোণ", "geometry-board", "geometryBoard", { mode: "angle-types", degrees: 120 }, [
    S("Acute < 90°, right = 90°, obtuse > 90°.", "সূক্ষ্ম < ৯০°, সমকোণ = ৯০°, স্থূল > ৯০°।", { degrees: 120 }),
    S("A straight angle is 180°.", "সরল কোণ ১৮০°।", { degrees: 180 }),
  ]),
  V("solid-nets-5", "c5.09", "Solids and nets", "ঘনবস্তু ও জাল", "solid-3d", "solid3d", { shape: "cube", mode: "net" }, [
    S("A cube has 6 square faces, 12 edges and 8 vertices.", "ঘনকের ৬টি বর্গাকার তল, ১২টি প্রান্ত আর ৮টি শীর্ষ।", { faces: 6, edges: 12, vertices: 8 }),
    S("Its net unfolds into 6 connected squares.", "এর জাল ৬টি যুক্ত বর্গে খুলে যায়।", { net: 6 }),
  ]),
  V("bar-graph-5", "c5.10", "Bar graph", "বার গ্রাফ", "chart", "chart", { categories: ["football", "cricket", "chess"], values: [8, 12, 4], mode: "bar" }, [
    S("Draw bars with heights 8, 12 and 4.", "৮, ১২ আর ৪ উচ্চতার বার আঁকো।", { values: [8, 12, 4] }),
    S("Cricket is the most popular choice.", "ক্রিকেট সবচেয়ে জনপ্রিয়।", { max: "cricket" }),
  ]),
];

export const CLASS5_CATEGORIES: PlayCategoryDef[] = [
  T(1, "c5-01-multiplication-division", "Multiplication and Division", "গুণ ও ভাগ", "✖️", ["area-model-5", "long-division-5", "area-model-large", "column-multiply-stepper", "long-division-stepper", "estimate-first", "multiply-divide-inverse", "division-remainder-meaning", "word-problem-scenes"], ["∴ quotient × divisor + remainder = dividend (division algorithm) → Class 5, Ch. 1.", "∴ ভাগফল × ভাজক + ভাগশেষ = ভাজ্য (ভাগের নিয়ম) → পঞ্চম শ্রেণি, অধ্যায় ১।"]),
  T(2, "c5-02-mathematical-sentences", "Mathematical Sentences", "গাণিতিক বাক্য", "⚖️", ["equation-balance-5", "equation-balance", "order-of-operations-bodmas", "write-sentence-from-story", "solve-by-inverse", "inequality-intro"]),
  T(3, "c5-03-multiples-factors", "Multiples and Factors", "গুণিতক ও গুণনীয়ক", "🧮", ["prime-factor-tree-5", "hcf-lcm-5", "hcf-venn-factors", "lcm-multiples-lines", "prime-factor-tree", "hcf-lcm-ladder", "real-life-lcm", "divisibility-lab"], ["∴ HCF × LCM = a × b (for two positive integers) → Class 5, Ch. 3.", "∴ গসাগু × লসাগু = a × b (দুই ধনাত্মক পূর্ণসংখ্যার জন্য) → পঞ্চম শ্রেণি, অধ্যায় ৩।"]),
  T(4, "c5-04-common-fractions", "Common Fractions", "সাধারণ ভগ্নাংশ", "🍕", ["fraction-add-5", "fraction-multiply-5", "fraction-ops-bars", "lcd-finder", "multiply-fractions-area", "divide-fractions-visual", "mixed-number-ops", "fraction-word-problems", "fraction-misconceptions"], ["∴ a/b × c/d = ac/bd (fraction multiplication law) → Class 5, Ch. 4.", "∴ a/b × c/d = ac/bd (ভগ্নাংশ গুণের নিয়ম) → পঞ্চম শ্রেণি, অধ্যায় ৪।"]),
  T(5, "c5-05-decimal-fractions", "Decimal Fractions", "দশমিক ভগ্নাংশ", "🔟", ["decimal-grid-5", "decimal-add-5", "decimal-grid-ops", "decimal-multiply-area", "decimal-divide-bars", "decimal-fraction-converter", "decimal-point-shift", "recurring-decimal-peek"]),
  T(6, "c5-06-percentage", "Percentage", "শতকরা", "％", ["percent-grid-5", "percent-of-5", "hundred-grid-percent", "fraction-decimal-percent-triangle", "percent-of-quantity", "discount-and-profit-intro", "percent-increase-decrease", "percent-vs-percentage-points"]),
  T(7, "c5-07-average", "Average", "গড়", "📊", ["average-bars-5", "levelling-bars", "average-calculator-step", "average-vs-extreme", "missing-value-average", "average-real-life"], ["∴ average = sum ÷ count (mean formula) → Class 5, Ch. 7.", "∴ গড় = যোগফল ÷ সংখ্যা (গড়ের সূত্র) → পঞ্চম শ্রেণি, অধ্যায় ৭।"]),
  T(8, "c5-08-measurement", "Measurement", "পরিমাপ", "📏", ["unit-convert-5", "area-volume-5", "area-perimeter-explorer", "area-composite-shapes", "volume-cuboid-layers", "unit-conversion-ladder", "time-zone-and-duration", "measurement-misconception"]),
  T(9, "c5-09-geometry", "Geometry", "জ্যামিতি", "📐", ["angle-types-5", "solid-nets-5", "angle-explorer", "triangle-angle-sum", "quadrilateral-properties", "circle-explorer", "symmetry-lines", "solid-nets-and-views", "coordinates-intro"]),
  T(10, "c5-10-data-arrangement", "Data Arrangement", "তথ্য সাজানো", "📈", ["bar-graph-5", "bar-graph-pro", "pie-chart-intro", "line-graph-trend", "mean-median-mode-intro", "misleading-graphs"]),
];
