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
import { CLASS6_CATALOG_VISUALIZATIONS } from "./catalog";

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

export const CLASS6_VISUALIZATIONS: PlayVisualizationDef[] = [
  ...CLASS6_CATALOG_VISUALIZATIONS,
  V("number-line-fractions-6", "c6.01", "Fractions on a number line", "সংখ্যারেখায় ভগ্নাংশ", "number-line", "numberLine", { mode: "fractions", divisions: 6, max: 2 }, [
    S("Split each whole into 6 equal parts.", "প্রতিটি সম্পূর্ণকে ৬ সমান ভাগে ভাগ করো।", { divisions: 6 }),
    S("1/2 = 3/6, so both marks land together.", "১/২ = ৩/৬, তাই দুই দাগ একসাথে পড়ে।", { equivalent: true }),
  ]),
  V("fraction-ops-6", "c6.01", "Fraction operations", "ভগ্নাংশের কাজ", "fraction-bar", "fractionBar", { a: "2/3", b: "3/4", mode: "multiply" }, [
    S("2/3 × 3/4 = (2×3)/(3×4) = 6/12.", "২/৩ × ৩/৪ = (২×৩)/(৩×৪) = ৬/১২।", { expression: "\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12}" }),
    S("Simplify: 6/12 = 1/2.", "সরল করো: ৬/১২ = ১/২।", { simplified: "1/2" }),
  ]),
  V("ratio-bars-6", "c6.02", "Ratio bars", "অনুপাতের বার", "tape-diagram", "tapeDiagram", { parts: [2, 3], mode: "ratio" }, [
    S("A ratio 2:3 means 2 parts to 3 parts.", "২:৩ অনুপাত মানে ২ ভাগ বনাম ৩ ভাগ।", { parts: [2, 3] }),
    S("With 5 equal parts in total, each part is the whole ÷ 5.", "মোট ৫ সমান ভাগে প্রতিটি ভাগ = সম্পূর্ণ ÷ ৫।", { totalParts: 5 }),
  ]),
  V("percent-grid-6", "c6.02", "Percent and ratio", "শতকরা ও অনুপাত", "fraction-bar", "fractionBar", { parts: 100, shaded: 40, mode: "percent" }, [
    S("40 out of 100 is 40%, the ratio 40:100 = 2:5.", "১০০-এর ৪০ হলো ৪০%, অনুপাত ৪০:১০০ = ২:৫।", { percent: 40, ratio: "2:5" }),
    S("Percent is a ratio out of 100.", "শতকরা হলো ১০০-এর সাপেক্ষে অনুপাত।", { caption: L("Percent = per hundred", "শতকরা = প্রতি শত") }),
  ]),
  V("integer-line-6", "c6.03", "Integers on a number line", "সংখ্যারেখায় পূর্ণসংখ্যা", "number-line", "numberLine", { mode: "integers", min: -10, max: 10 }, [
    S("Move right for positive numbers and left for negative numbers.", "ধনাত্মক সংখ্যায় ডানে, ঋণাত্মক সংখ্যায় বামে যাও।", { start: -3, move: 8 }),
    S("-3 + 8 = 5.", "-৩ + ৮ = ৫।", { result: 5 }),
    S("5 + (-8) = -3.", "৫ + (−৮) = −৩।", { result: -3 }),
  ]),
  V("expression-builder-6", "c6.04", "Build algebraic expressions", "বীজগাণিতিক রাশি তৈরি", "algebra-stepper", "algebraStepper", { mode: "expression", terms: [3, "x", 5] }, [
    S("Three x's and five ones make 3x + 5.", "তিনটি x আর পাঁচটি একক মিলে 3x + 5।", { expression: "3x + 5" }),
    S("Like terms can be combined; 3x and 5 cannot.", "সদৃশ পদ যোগ হয়; 3x আর ৫ যোগ হয় না।", { likeTerms: false }),
  ]),
  V("equation-balance-6", "c6.05", "Solve a simple equation", "সরল সমীকরণ সমাধান", "balance-scale", "balanceScale", { left: "3x + 2", right: 14, mode: "equation" }, [
    S("Subtract 2 from both sides: 3x = 12.", "দুই পাশ থেকে ২ বিয়োগ: 3x = ১২।", { step: "3x = 12" }),
    S("Divide both sides by 3: x = 4.", "দুই পাশ ৩ দিয়ে ভাগ: x = ৪।", { answer: 4 }),
  ]),
  V("points-lines-angles-6", "c6.06", "Points, lines and angles", "বিন্দু, রেখা ও কোণ", "geometry-board", "geometryBoard", { mode: "lines-angles" }, [
    S("Two rays from one point form an angle.", "এক বিন্দু থেকে দুই রশ্মি কোণ তৈরি করে।", { vertex: true }),
    S("A straight angle is 180°; a full turn is 360°.", "সরল কোণ ১৮০°; পূর্ণ ঘূর্ণন ৩৬০°।", { straight: 180, full: 360 }),
  ]),
  V("construction-6", "c6.07", "Ruler and compass construction", "রুলার ও কম্পাসে অঙ্কন", "geometry-board", "geometryBoard", { mode: "construction", step: "bisect-angle" }, [
    S("Draw an arc from the angle's vertex.", "কোণের শীর্ষ থেকে চাপ আঁকো।", { step: 1 }),
    S("Mark equal arcs from both sides, then join the crossing point to the vertex.", "দুই পাশ থেকে সমান চাপ চিহ্নিত করে ছেদবিন্দুকে শীর্ষের সাথে যুক্ত করো।", { step: 2, result: "angle bisector" }),
  ]),
  V("chart-builder-6", "c6.08", "Data charts", "তথ্যের চার্ট", "chart", "chart", { categories: ["A", "B", "C"], values: [12, 18, 9], mode: "bar" }, [
    S("Add a title and label both axes.", "শিরোনাম দাও আর দুই অক্ষে লেবেল দাও।", { labelled: true }),
    S("Choose a scale that fits the largest value.", "সবচেয়ে বড় মানের সাথে মানানসই স্কেল বাছো।", { max: 18 }),
  ]),
];

export const CLASS6_CATEGORIES: PlayCategoryDef[] = [
  T(1, "c6-01-natural-numbers-fractions", "Natural Numbers and Fractions", "স্বাভাবিক সংখ্যা ও ভগ্নাংশ", "🔢", ["number-line-fractions-6", "fraction-ops-6", "number-system-map", "place-value-to-crore", "number-line-zoom", "four-operations-stepper", "factors-multiples-lab", "prime-sieve", "prime-factor-tree", "hcf-lcm-methods", "divisibility-rules", "fraction-types", "equivalent-fractions-wall", "simplify-fractions", "compare-order-fractions", "add-subtract-fractions", "multiply-fractions-area", "divide-fractions-reciprocal", "fraction-word-problems", "decimal-fraction-bridge"], ["∴ a/b × c/d = ac/bd (fraction multiplication law) → Class 6, Ch. 1.", "∴ a/b × c/d = ac/bd (ভগ্নাংশ গুণের নিয়ম) → ষষ্ঠ শ্রেণি, অধ্যায় ১।"]),
  T(2, "c6-02-ratios-percentages", "Ratios and Percentages", "অনুপাত ও শতকরা", "％", ["ratio-bars-6", "percent-grid-6", "ratio-bars", "equivalent-ratios-table", "ratio-sharing", "ratio-vs-fraction", "proportion-lab", "unitary-method", "percent-grid", "percent-fraction-decimal", "percent-of-quantity", "discount-and-vat", "percent-change"]),
  T(3, "c6-03-integers", "Integers", "পূর্ণসংখ্যা", "➕", ["integer-line-6", "integer-number-line", "temperature-thermometer", "debt-and-money", "absolute-value-distance", "add-integers-chips", "subtract-as-add-opposite", "multiply-integers-patterns", "compare-order-integers"], ["∴ a + (−b) = a − b (integer addition law) → Class 6, Ch. 3.", "∴ a + (−b) = a − b (পূর্ণসংখ্যা যোগের নিয়ম) → ষষ্ঠ শ্রেণি, অধ্যায় ৩।"]),
  T(4, "c6-04-algebraic-expressions", "Algebraic Expressions", "বীজগাণিতিক রাশি", "🧮", ["expression-builder-6", "variable-box", "expression-builder", "substitution-machine", "like-terms-sort", "algebra-tiles-add", "expand-brackets-area", "pattern-to-expression", "formula-from-shapes"]),
  T(5, "c6-05-simple-equations", "Simple Equations", "সরল সমীকরণ", "⚖️", ["equation-balance-6", "balance-solve", "inverse-operations-stepper", "two-step-equations", "equation-from-story", "check-by-substitution", "bar-model-equation", "equation-error-hunt"], ["∴ same operation on both sides keeps equality (balance law) → Class 6, Ch. 5.", "∴ দুই পাশে একই কাজ করলে সমতা থাকে (ভারসাম্যের নিয়ম) → ষষ্ঠ শ্রেণি, অধ্যায় ৫।"]),
  T(6, "c6-06-basic-geometry", "Basic Concepts of Geometry", "জ্যামিতির মৌলিক ধারণা", "📐", ["points-lines-angles-6", "point-line-ray-segment", "angle-builder", "angle-types-protractor", "complementary-supplementary", "vertical-angles", "parallel-lines-transversal", "triangle-types-explorer", "triangle-angle-sum", "quadrilateral-family-tree", "circle-parts"]),
  T(7, "c6-07-practical-geometry", "Practical Geometry", "ব্যবহারিক জ্যামিতি", "🧭", ["construction-6", "compass-and-ruler", "draw-a-segment-bisector", "angle-bisector", "construct-angles-60-90", "construct-triangles", "why-it-works"]),
  T(8, "c6-08-information-data", "Information and Data", "তথ্য ও উপাত্ত", "📊", ["chart-builder-6", "data-collection-lab", "frequency-table-to-bar", "pie-chart-builder", "mean-median-mode-lab", "outlier-effect", "misleading-graph-spotter"]),
];
