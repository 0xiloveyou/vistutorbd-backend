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
import { CLASS8_CATALOG_VISUALIZATIONS } from "./catalog";

const DIFF = 4;

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

export const CLASS8_VISUALIZATIONS: PlayVisualizationDef[] = [
  ...CLASS8_CATALOG_VISUALIZATIONS,
  V("pattern-8", "c8.01", "Number patterns", "সংখ্যার ধারা", "number-grid", "numberGrid", { mode: "pattern", start: 2, step: 3 }, [
    S("Find the difference between consecutive terms.", "পরপর পদগুলোর পার্থক্য বের করো।", { difference: 3 }),
    S("2, 5, 8, 11, ... The nth term is 3n − 1.", "২, ৫, ৮, ১১, ... n-তম পদ ৩n − ১।", { nthTerm: "3n - 1" }),
  ]),
  V("profit-8", "c8.02", "Profit and loss", "লাভ ও ক্ষতি", "tape-diagram", "tapeDiagram", { cost: 80, selling: 100, mode: "profit" }, [
    S("Profit = selling price − cost price = 100 − 80 = 20.", "লাভ = বিক্রয়মূল্য − ক্রয়মূল্য = ১০০ − ৮০ = ২০।", { profit: 20 }),
    S("Profit percent = 20/80 × 100% = 25%.", "শতকরা লাভ = ২০/৮০ × ১০০% = ২৫%।", { percent: 25 }),
  ]),
  V("measurement-8", "c8.03", "Area and volume", "ক্ষেত্রফল ও আয়তন", "shape-canvas", "shapeCanvas", { shape: "cylinder", radius: 7, height: 10, mode: "mensuration" }, [
    S("Volume of a cylinder = πr²h.", "সিলিন্ডারের আয়তন = πr²h।", { formula: "V = \\pi r^2 h" }),
    S("= π × 7² × 10 ≈ 1540 cubic units.", "= π × ৭² × ১০ ≈ ১৫৪০ ঘন একক।", { volume: 1540 }),
  ]),
  V("identities-8", "c8.04", "Algebraic identities", "বীজগাণিতিক সূত্র", "array-grid", "arrayGrid", { mode: "identity", a: 4, b: 3, expression: "(a+b)^2" }, [
    S("(a + b)² = a² + 2ab + b².", "(a + b)² = a² + ২ab + b²।", { formula: "(a+b)^2 = a^2 + 2ab + b^2" }),
    S("With a = 4 and b = 3: 16 + 24 + 9 = 49.", "a = ৪, b = ৩ হলে: ১৬ + ২৪ + ৯ = ৪৯।", { value: 49 }),
  ]),
  V("algebra-fraction-8", "c8.05", "Simplify algebraic fractions", "বীজগাণিতিক ভগ্নাংশ সরল", "algebra-stepper", "algebraStepper", { mode: "algebra-fraction", expression: "(x^2 - 4)/(x + 2)" }, [
    S("Factor: x² − 4 = (x − 2)(x + 2).", "উৎপাদক: x² − ৪ = (x − ২)(x + ২)।", { factored: "(x-2)(x+2)" }),
    S("Cancel x + 2: the result is x − 2, x ≠ −2.", "x + ২ বাদ: ফল x − ২, x ≠ −২।", { simplified: "x - 2" }),
  ]),
  V("simultaneous-8", "c8.06", "Simultaneous equations", "সহসমীকরণ", "algebra-stepper", "algebraStepper", { mode: "simultaneous", equations: ["x + y = 7", "x - y = 1"] }, [
    S("Add the equations: 2x = 8, so x = 4.", "সমীকরণ যোগ: 2x = ৮, তাই x = ৪।", { x: 4 }),
    S("Substitute: 4 + y = 7, so y = 3.", "প্রতিস্থাপন: ৪ + y = ৭, তাই y = ৩।", { y: 3 }),
  ]),
  V("venn-8", "c8.07", "Sets", "সেট", "venn-set", "vennSet", { mode: "venn", a: "A", b: "B" }, [
    S("The union A ∪ B combines both sets.", "সংযোগ A ∪ B দুই সেট একত্র করে।", { union: true }),
    S("The intersection A ∩ B keeps common elements only.", "ছেদ A ∩ B শুধু সাধারণ উপাদান রাখে।", { intersection: true }),
  ]),
  V("quadrilateral-8", "c8.08", "Quadrilaterals", "চতুর্ভুজ", "shape-canvas", "shapeCanvas", { mode: "quadrilateral", shape: "trapezium" }, [
    S("A trapezium has one pair of parallel sides.", "ট্রাপিজিয়ামের এক জোড়া সমান্তরাল বাহু থাকে।", { parallelPairs: 1 }),
    S("Its area = ½ × (sum of parallel sides) × height.", "এর ক্ষেত্রফল = ½ × (সমান্তরাল বাহুর যোগফল) × উচ্চতা।", { formula: "A = \\frac{1}{2}(a+b)h" }),
  ]),
  V("pythagoras-8", "c8.09", "Pythagoras theorem", "পিথাগোরাসের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "pythagoras", a: 5, b: 12 }, [
    S("a² + b² = c².", "a² + b² = c²।", { formula: "5^2 + 12^2 = c^2" }),
    S("25 + 144 = 169, so c = 13.", "২৫ + ১৪৪ = ১৬৯, তাই c = ১৩।", { hypotenuse: 13 }),
  ]),
  V("circle-8", "c8.10", "Circle theorems", "বৃত্তের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "circle-theorem", angle: 90 }, [
    S("The angle in a semicircle is a right angle.", "অর্ধবৃত্তস্থ কোণ সমকোণ।", { angle: 90 }),
    S("Perpendicular from the centre bisects a chord.", "কেন্দ্র থেকে লম্ব জ্যা-কে সমদ্বিখণ্ডিত করে।", { bisects: true }),
  ]),
  V("data-8", "c8.11", "Statistics", "পরিসংখ্যান", "chart", "chart", { values: [12, 15, 18, 20, 25], mode: "histogram" }, [
    S("Mean = sum ÷ count.", "গড় = যোগফল ÷ সংখ্যা।", { mode: "mean" }),
    S("Median is the middle value when ordered.", "মধ্যমা সাজানো অবস্থায় মধ্যবর্তী মান।", { median: 18 }),
  ]),
];

export const CLASS8_CATEGORIES: PlayCategoryDef[] = [
  T(1, "c8-01-patterns", "Patterns", "নকশা / ধারা", "🔁", ["pattern-8", "sequence-explorer", "nth-term-builder", "figurate-numbers", "arithmetic-vs-geometric", "fibonacci-spiral", "pattern-misconception"]),
  T(2, "c8-02-profits", "Profits", "লাভ-ক্ষতি", "💰", ["profit-8", "cost-price-selling-price", "profit-percent", "discount-and-markup", "profit-loss-misconception", "simple-interest", "compound-interest-intro", "shop-simulation"], ["∴ profit = SP − CP and profit% = profit/CP × 100 (profit law) → Class 8, Ch. 2.", "∴ লাভ = বিক্রয়মূল্য − ক্রয়মূল্য এবং লাভ% = লাভ/ক্রয়মূল্য × ১০০ (লাভের নিয়ম) → অষ্টম শ্রেণি, অধ্যায় ২।"]),
  T(3, "c8-03-measurement", "Measurement", "পরিমাপ", "📏", ["measurement-8", "area-perimeter-polygons", "trapezium-area-derivation", "circle-circumference-pi", "circle-area-slices", "volume-prism-cylinder", "surface-area-nets", "unit-conversion-area-volume"]),
  T(4, "c8-04-algebraic-formulae", "Algebraic Formulae and Applications", "বীজগাণিতিক সূত্র ও প্রয়োগ", "🧮", ["identities-8", "square-of-sum-area", "difference-of-squares", "cube-identities", "factorization-stepper", "identity-checker", "formula-in-numbers", "identity-misconception"], ["∴ (a+b)² = a² + 2ab + b² (square identity) → Class 8, Ch. 4.", "∴ (a+b)² = a² + 2ab + b² (বর্গের সূত্র) → অষ্টম শ্রেণি, অধ্যায় ৪।"]),
  T(5, "c8-05-algebraic-fractions", "Algebraic Fractions", "বীজগাণিতিক ভগ্নাংশ", "➗", ["algebra-fraction-8", "simplify-algebraic-fraction", "lcm-of-expressions", "add-subtract-algebraic-fractions", "multiply-divide-algebraic-fractions", "cancel-misconception", "domain-hazard"]),
  T(6, "c8-06-simultaneous-equations", "Simple Simultaneous Equations", "সরল সহসমীকরণ", "⚖️", ["simultaneous-8", "two-lines-intersect", "substitution-stepper", "elimination-stepper", "no-solution-infinite", "word-problem-systems", "method-choice-advisor"]),
  T(7, "c8-07-set", "Set", "সেট", "🔵", ["venn-8", "venn-builder", "union-intersection-difference", "complement-universal", "subset-power-set", "set-notation-reader", "survey-venn-problem"]),
  T(8, "c8-08-quadrilateral", "Quadrilateral", "চতুর্ভুজ", "⬛", ["quadrilateral-8", "quadrilateral-explorer", "angle-sum-quad", "parallelogram-properties", "rectangle-rhombus-square", "trapezium-kite", "proof-with-congruence", "mid-point-theorem-intro"]),
  T(9, "c8-09-pythagoras", "Pythagoras Theorem", "পিথাগোরাসের উপপাদ্য", "📐", ["pythagoras-8", "squares-on-sides", "proof-by-rearrangement", "find-the-side", "pythagorean-triples", "real-life-ladder", "converse-test"], ["∴ a² + b² = c² for a right triangle (Pythagoras) → Class 8, Ch. 9.", "∴ সমকোণী ত্রিভুজে a² + b² = c² (পিথাগোরাস) → অষ্টম শ্রেণি, অধ্যায় ৯।"]),
  T(10, "c8-10-circle", "Circle", "বৃত্ত", "⭕", ["circle-8", "chord-arc-explorer", "perpendicular-from-centre", "angle-in-semicircle", "central-vs-inscribed", "tangent-radius", "equal-chords"]),
  T(11, "c8-11-information-data", "Information and Data", "তথ্য ও উপাত্ত", "📊", ["data-8", "grouped-frequency-table", "histogram-builder", "pie-chart-angles", "mean-median-mode-grouped", "compare-datasets", "misleading-statistics"]),
];
