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
import { CLASS7_CATALOG_VISUALIZATIONS } from "./catalog";

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

export const CLASS7_VISUALIZATIONS: PlayVisualizationDef[] = [
  ...CLASS7_CATALOG_VISUALIZATIONS,
  V("integer-line-7", "c7.01", "Operations on integers", "পূর্ণসংখ্যার কাজ", "number-line", "numberLine", { mode: "integers", min: -20, max: 20 }, [
    S("Adding a negative moves left: 6 + (−9) = −3.", "ঋণাত্মক যোগে বামে যাও: ৬ + (−৯) = −৩।", { result: -3 }),
    S("Subtracting a negative moves right: −3 − (−5) = 2.", "ঋণাত্মক বিয়োগে ডানে যাও: −৩ − (−৫) = ২।", { result: 2 }),
    S("−2 × 3 = −6, but −2 × −3 = 6.", "−২ × ৩ = −৬, কিন্তু −২ × −৩ = ৬।", { expression: "(-2)(-3) = 6" }),
  ]),
  V("rational-irrational-7", "c7.02", "Rational and irrational numbers", "মূলদ ও অমূলদ সংখ্যা", "number-line", "numberLine", { mode: "rational-irrational" }, [
    S("Rational numbers can be written as a fraction p/q.", "মূলদ সংখ্যা p/q ভগ্নাংশে লেখা যায়।", { example: "3/4" }),
    S("√2 cannot be written as a fraction, so it is irrational.", "√২ ভগ্নাংশে লেখা যায় না, তাই এটি অমূলদ।", { example: "\\sqrt{2}" }),
    S("Decimals of irrationals neither end nor repeat.", "অমূলদের দশমিক না শেষ হয় না পুনরাবৃত্ত হয়।", { nonRepeating: true }),
  ]),
  V("congruence-7", "c7.03", "Congruence and similarity", "সর্বসমতা ও সদৃশতা", "geometry-board", "geometryBoard", { mode: "congruence" }, [
    S("Congruent figures match exactly in shape and size.", "সর্বসম আকৃতি আকার ও মাপে হুবহু মেলে।", { congruent: true }),
    S("Similar figures have the same shape but may differ in size.", "সদৃশ আকৃতির আকার এক, মাপ ভিন্ন হতে পারে।", { scale: 2 }),
    S("Corresponding angles of similar figures are equal.", "সদৃশ আকৃতির অনুরূপ কোণ সমান।", { angles: "equal" }),
  ]),
  V("algebra-multiply-7", "c7.04", "Multiply algebraic expressions", "বীজগাণিতিক রাশি গুণ", "algebra-stepper", "algebraStepper", { mode: "algebra-multiply", expression: "(x + 3)(x + 2)" }, [
    S("Use the distributive law: x(x + 2) + 3(x + 2).", "বণ্টন নিয়ম: x(x + 2) + ৩(x + 2)।", { step: "x^2 + 2x + 3x + 6" }),
    S("Combine like terms: x² + 5x + 6.", "সদৃশ পদ যোগ: x² + ৫x + ৬।", { expanded: "x^2 + 5x + 6" }),
  ]),
  V("algebra-fraction-7", "c7.05", "Algebraic fractions", "বীজগাণিতিক ভগ্নাংশ", "algebra-stepper", "algebraStepper", { mode: "algebra-fraction", expression: "(x^2 - 9)/(x - 3)" }, [
    S("Factor the numerator: x² − 9 = (x − 3)(x + 3).", "লব উৎপাদকে: x² − ৯ = (x − ৩)(x + ৩)।", { factored: "(x-3)(x+3)" }),
    S("Cancel x − 3: the result is x + 3, provided x ≠ 3.", "x − ৩ বাদ দাও: ফল x + ৩, তবে x ≠ ৩।", { simplified: "x + 3" }),
  ]),
  V("equation-balance-7", "c7.06", "Solve equations", "সমীকরণ সমাধান", "balance-scale", "balanceScale", { left: "4x - 3", right: 17, mode: "equation" }, [
    S("Add 3 to both sides: 4x = 20.", "দুই পাশে ৩ যোগ: 4x = ২০।", { step: "4x = 20" }),
    S("Divide by 4: x = 5.", "৪ দিয়ে ভাগ: x = ৫।", { answer: 5 }),
  ]),
  V("venn-7", "c7.07", "Sets and Venn diagrams", "সেট ও ভেন চিত্র", "venn-set", "vennSet", { a: "A", b: "B", mode: "venn" }, [
    S("A ∪ B contains everything in A or B.", "A ∪ B-তে A বা B-এর সবকিছু থাকে।", { union: true }),
    S("A ∩ B contains only what is in both.", "A ∩ B-তে শুধু দুইটিতেই থাকা উপাদান থাকে।", { intersection: true }),
  ]),
  V("quadrilateral-7", "c7.08", "Quadrilaterals", "চতুর্ভুজ", "shape-canvas", "shapeCanvas", { mode: "quadrilateral", shape: "parallelogram" }, [
    S("A quadrilateral has 4 sides and 4 angles.", "চতুর্ভুজের ৪ বাহু আর ৪ কোণ।", { sides: 4, angles: 4 }),
    S("The angles of a quadrilateral add to 360°.", "চতুর্ভুজের কোণগুলোর যোগফল ৩৬০°।", { sum: 360 }),
  ]),
  V("pythagoras-7", "c7.09", "Pythagoras theorem", "পিথাগোরাসের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "pythagoras", a: 3, b: 4 }, [
    S("In a right triangle, a² + b² = c².", "সমকোণী ত্রিভুজে a² + b² = c²।", { expression: "3^2 + 4^2 = c^2" }),
    S("9 + 16 = 25, so c = 5.", "৯ + ১৬ = ২৫, তাই c = ৫।", { hypotenuse: 5 }),
  ]),
  V("circle-7", "c7.10", "Circle theorems", "বৃত্তের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "circle", radius: 5 }, [
    S("A radius drawn to the tangent is perpendicular to it.", "স্পর্শবিন্দুতে আঁকা ব্যাসার্ধ স্পর্শকের উপর লম্ব।", { tangent: true }),
    S("The angle in a semicircle is 90°.", "অর্ধবৃত্তে কোণ ৯০°।", { angle: 90 }),
  ]),
  V("chart-7", "c7.11", "Interpret data", "তথ্য ব্যাখ্যা", "chart", "chart", { categories: ["A", "B", "C"], values: [14, 20, 11], mode: "bar" }, [
    S("Compare bar heights to find most and least.", "সবচেয়ে বেশি-কম পেতে বারের উচ্চতা তুলনা করো।", { max: "B", min: "C" }),
    S("Total = 14 + 20 + 11 = 45.", "মোট = ১৪ + ২০ + ১১ = ৪৫।", { total: 45 }),
  ]),
];

export const CLASS7_CATEGORIES: PlayCategoryDef[] = [
  T(1, "c7-01-integers", "Integers", "পূর্ণসংখ্যা", "➕", ["integer-line-7", "c7-integers-number-line", "c7-integers-add-chips", "c7-integers-subtract-negative", "c7-integers-multiply-signs", "c7-integers-word-problem", "c7-integers-practice"]),
  T(2, "c7-02-rational-irrational", "Rational and Irrational Numbers", "মূলদ ও অমূলদ সংখ্যা", "√", ["rational-irrational-7", "c7-rational-number-line", "c7-rational-fraction-form", "c7-irrational-decimal", "c7-rational-vs-irrational", "c7-rational-word-problem", "c7-rational-misconception"]),
  T(3, "c7-03-congruence-similarity", "Congruence and Similarity", "সর্বসমতা ও সদৃশতা", "🔺", ["congruence-7", "c7-congruence-rigid-motion", "c7-congruence-corresponding-parts", "c7-similarity-scale-factor", "c7-similarity-perimeter-area", "c7-congruence-misconception", "c7-similarity-real-life"]),
  T(4, "c7-04-algebraic-multiplication", "Multiplication and Division of Algebraic Expressions", "বীজগাণিতিক রাশির গুণ ও ভাগ", "✖️", ["algebra-multiply-7", "c7-algebra-monomial-product", "c7-algebra-distributive", "c7-algebra-binomial-product", "c7-algebra-divide-monomial", "c7-algebra-sign-misconception", "c7-algebra-area-model"], ["∴ (x+a)(x+b) = x² + (a+b)x + ab (expansion law) → Class 7, Ch. 4.", "∴ (x+a)(x+b) = x² + (a+b)x + ab (বিস্তারের নিয়ম) → সপ্তম শ্রেণি, অধ্যায় ৪।"]),
  T(5, "c7-05-algebraic-fractions", "Algebraic Fractions", "বীজগাণিতিক ভগ্নাংশ", "➗", ["algebra-fraction-7", "c7-algebra-fraction-simplify", "c7-algebra-fraction-common-denominator", "c7-algebra-fraction-add-subtract", "c7-algebra-fraction-multiply-divide", "c7-algebra-fraction-misconception", "c7-algebra-fraction-real-life"]),
  T(6, "c7-06-simple-equations", "Simple Equations", "সরল সমীকরণ", "⚖️", ["equation-balance-7", "c7-equation-balance", "c7-equation-two-step", "c7-equation-variable-both-sides", "c7-equation-misconception", "c7-equation-word-problem", "c7-equation-practice"]),
  T(7, "c7-07-set", "Set", "সেট", "🔵", ["venn-7", "c7-set-roster-builder", "c7-set-union-intersection", "c7-set-complement", "c7-set-subset", "c7-set-misconception", "c7-set-survey-word-problem"]),
  T(8, "c7-08-quadrilateral", "Quadrilateral", "চতুর্ভুজ", "⬛", ["quadrilateral-7", "c7-quadrilateral-angle-sum", "c7-parallelogram-properties", "c7-quadrilateral-family", "c7-quadrilateral-diagonals", "c7-quadrilateral-misconception", "c7-quadrilateral-real-life"]),
  T(9, "c7-09-pythagoras", "Pythagoras Theorem", "পিথাগোরাসের উপপাদ্য", "📐", ["pythagoras-7", "c7-pythagoras-theorem", "c7-pythagoras-hypotenuse", "c7-pythagoras-leg", "c7-pythagoras-triples", "c7-pythagoras-misconception", "c7-pythagoras-real-life"], ["∴ a² + b² = c² for a right triangle (Pythagoras) → Class 7, Ch. 9.", "∴ সমকোণী ত্রিভুজে a² + b² = c² (পিথাগোরাস) → সপ্তম শ্রেণি, অধ্যায় ৯।"]),
  T(10, "c7-10-circle", "Circle", "বৃত্ত", "⭕", ["circle-7", "c7-circle-parts", "c7-circle-circumference", "c7-circle-area", "c7-circle-semicircle-angle", "c7-circle-tangent-radius", "c7-circle-misconception"]),
  T(11, "c7-11-information-data", "Information and Data", "তথ্য ও উপাত্ত", "📊", ["chart-7", "c7-data-frequency-table", "c7-data-bar-chart", "c7-data-mean", "c7-data-median-mode", "c7-data-misconception", "c7-data-real-life"]),
];
