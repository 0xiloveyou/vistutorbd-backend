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

export const CLASS_9_10_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("real-line-910", "c9_10.01", "Intervals on the real line", "বাস্তব রেখায় ব্যবধি", "number-line", "numberLine", { mode: "interval", min: -5, max: 5 }, [
    S("A closed interval [a, b] includes both endpoints.", "বদ্ধ ব্যবধি [a, b] দুই প্রান্তই অন্তর্ভুক্ত করে।", { interval: "[2, 4]", closed: true }),
    S("An open interval (a, b) excludes both endpoints.", "খোলা ব্যবধি (a, b) দুই প্রান্তই বাদ দেয়।", { interval: "(2, 4)", closed: false }),
    S("The union of intervals joins them; intersection keeps overlap.", "ব্যবধির সংযোগ জোড়া দেয়; ছেদ সাধারণ অংশ রাখে।", { union: true }),
  ]),
  V("venn-mapping-910", "c9_10.02", "Sets, relations and functions", "সেট, সম্পর্ক ও ফাংশন", "venn-set", "vennSet", { mode: "mapping", a: "A", b: "B" }, [
    S("A relation pairs elements of A with elements of B.", "সম্পর্ক A-এর উপাদানের সাথে B-এর উপাদান জোড়া করে।", { relation: true }),
    S("A function gives exactly one output for each input.", "ফাংশন প্রতিটি ইনপুটের জন্য ঠিক একটি আউটপুট দেয়।", { function: true }),
    S("Many-to-one is allowed; one-to-many is not a function.", "অনেক-থেকে-এক চলে; এক-থেকে-অনেক ফাংশন নয়।", { caption: L("One output per input", "প্রতি ইনপুটে এক আউটপুট") }),
  ]),
  V("identities-910", "c9_10.03", "Algebraic identities", "বীজগাণিতিক সূত্র", "algebra-stepper", "algebraStepper", { mode: "identity", expression: "a^3 + b^3" }, [
    S("a³ + b³ = (a + b)(a² − ab + b²).", "a³ + b³ = (a + b)(a² − ab + b²)।", { formula: "a^3 + b^3 = (a+b)(a^2 - ab + b^2)" }),
    S("Expand and cancel to check the identity.", "বিস্তার করে বাদ দিয়ে সূত্র মিলাও।", { verified: true }),
  ]),
  V("exp-log-910", "c9_10.04", "Exponents and logarithms", "সূচক ও লগারিদম", "function-graph", "functionGraph", { mode: "exponential", base: 2 }, [
    S("y = 2^x grows by a constant factor.", "y = ২^x একটি নির্দিষ্ট গুণক হারে বাড়ে।", { curve: "exponential" }),
    S("log₂ 8 = 3 because 2³ = 8.", "log₂ ৮ = ৩, কারণ ২³ = ৮।", { expression: "\\log_2 8 = 3" }),
    S("Logarithms undo exponentials.", "লগারিদম সূচককে আগের অবস্থায় ফেরায়।", { inverse: true }),
  ]),
  V("equation-graph-910", "c9_10.05", "Equations in one variable", "এক চলকবিশিষ্ট সমীকরণ", "function-graph", "functionGraph", { mode: "roots", expression: "x^2 - 5x + 6" }, [
    S("Set the expression to zero: x² − 5x + 6 = 0.", "রাশি শূন্য ধরি: x² − ৫x + ৬ = ০।", { equation: "x^2 - 5x + 6 = 0" }),
    S("Factor: (x − 2)(x − 3) = 0, so x = 2 or 3.", "উৎপাদক: (x − ২)(x − ৩) = ০, তাই x = ২ বা ৩।", { roots: [2, 3] }),
    S("The graph crosses the x-axis at 2 and 3.", "গ্রাফ x-অক্ষকে ২ ও ৩-এ ছেদ করে।", { intercepts: [2, 3] }),
  ]),
  V("triangle-angles-910", "c9_10.06", "Lines, angles and triangles", "রেখা, কোণ ও ত্রিভুজ", "geometry-board", "geometryBoard", { mode: "triangle-angles" }, [
    S("The angles of a triangle add to 180°.", "ত্রিভুজের কোণগুলোর যোগফল ১৮০°।", { sum: 180 }),
    S("An exterior angle equals the sum of the two opposite interior angles.", "বহিঃকোণ বিপরীত দুই অন্তঃকোণের যোগফলের সমান।", { exterior: true }),
  ]),
  V("construction-910", "c9_10.07", "Geometric constructions", "জ্যামিতিক অঙ্কন", "geometry-board", "geometryBoard", { mode: "construction", task: "perpendicular-bisector" }, [
    S("Draw equal arcs from both endpoints of a segment.", "রেখাংশের দুই প্রান্ত থেকে সমান চাপ আঁকো।", { step: 1 }),
    S("Join the two arc intersections to get the perpendicular bisector.", "দুই চাপের ছেদবিন্দু যোগ করলে লম্ব সমদ্বিখণ্ডক পাওয়া যায়।", { result: "perpendicular bisector" }),
  ]),
  V("circle-theorem-910", "c9_10.08", "Circle theorems", "বৃত্তের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "circle-theorem", angle: 90 }, [
    S("The angle in a semicircle is 90°.", "অর্ধবৃত্তস্থ কোণ ৯০°।", { angle: 90 }),
    S("The perpendicular from the centre bisects a chord.", "কেন্দ্র থেকে লম্ব জ্যা-কে সমদ্বিখণ্ডিত করে।", { bisects: true }),
    S("Equal chords are equidistant from the centre.", "সমান জ্যা কেন্দ্র থেকে সমদূরত্বে থাকে।", { equidistant: true }),
  ]),
  V("unit-circle-910", "c9_10.09", "Trigonometric ratios", "ত্রিকোণমিতিক অনুপাত", "unit-circle", "unitCircle", { mode: "unit-circle", angle: 30 }, [
    S("On the unit circle, sin θ is the y-coordinate and cos θ the x-coordinate.", "একক বৃত্তে sin θ হলো y-স্থানাঙ্ক আর cos θ হলো x-স্থানাঙ্ক।", { sin: 0.5, cos: 0.866 }),
    S("tan θ = sin θ / cos θ.", "tan θ = sin θ / cos θ।", { formula: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}" }),
    S("The hypotenuse is always 1 on the unit circle.", "একক বৃত্তে অতিভুজ সর্বদা ১।", { hypotenuse: 1 }),
  ]),
  V("elevation-910", "c9_10.10", "Angle of elevation", "উন্নতি কোণ", "geometry-board", "geometryBoard", { mode: "elevation", height: 10, distance: 10 }, [
    S("tan θ = opposite / adjacent = height / distance.", "tan θ = বিপরীত / সন্নিহিত = উচ্চতা / দূরত্ব।", { formula: "\\tan\\theta = \\frac{10}{10}" }),
    S("tan θ = 1, so θ = 45°.", "tan θ = ১, তাই θ = ৪৫°।", { angle: 45 }),
  ]),
  V("ratio-910", "c9_10.11", "Algebraic ratio and proportion", "বীজগাণিতিক অনুপাত ও সমানুপাত", "tape-diagram", "tapeDiagram", { mode: "proportion", a: 3, b: 4, c: 9 }, [
    S("If a : b = c : d then ad = bc.", "যদি a : b = c : d হয়, তবে ad = bc।", { formula: "ad = bc" }),
    S("With 3 : 4 = 9 : d, 3d = 36, so d = 12.", "৩ : ৪ = ৯ : d হলে 3d = ৩৬, তাই d = ১২।", { d: 12 }),
  ]),
  V("line-intersection-910", "c9_10.12", "Simultaneous equations", "সহসমীকরণ", "coordinate-plane", "coordinatePlane", { mode: "intersection", equations: ["x + y = 5", "x - y = 1"] }, [
    S("Each equation is a line; the solution is their intersection.", "প্রতিটি সমীকরণ একটি রেখা; সমাধান তাদের ছেদবিন্দু।", { lines: 2 }),
    S("Adding gives 2x = 6, so x = 3 and y = 2.", "যোগে 2x = ৬, তাই x = ৩ আর y = ২।", { solution: [3, 2] }),
  ]),
  V("series-sum-910", "c9_10.13", "Finite series", "সসীম ধারা", "number-grid", "numberGrid", { mode: "series", n: 10 }, [
    S("Sum of the first n natural numbers = n(n + 1)/2.", "প্রথম n স্বাভাবিক সংখ্যার যোগফল = n(n + 1)/2।", { formula: "S_n = \\frac{n(n+1)}{2}" }),
    S("For n = 10: 10 × 11 / 2 = 55.", "n = ১০ হলে: ১০ × ১১ / ২ = ৫৫।", { sum: 55 }),
  ]),
  V("similarity-910", "c9_10.14", "Similarity and symmetry", "সদৃশতা ও প্রতিসমতা", "geometry-board", "geometryBoard", { mode: "similarity", scale: 2 }, [
    S("Similar triangles have equal corresponding angles.", "সদৃশ ত্রিভুজের অনুরূপ কোণ সমান।", { angles: "equal" }),
    S("Corresponding sides are in the same ratio.", "অনুরূপ বাহু একই অনুপাতে থাকে।", { ratio: 2 }),
  ]),
  V("area-theorem-910", "c9_10.15", "Area-related theorems", "ক্ষেত্রফল সম্পর্কিত উপপাদ্য", "geometry-board", "geometryBoard", { mode: "area-theorem", shape: "parallelogram" }, [
    S("A parallelogram on the same base and between the same parallels has equal area to a rectangle.", "একই ভূমি ও সমান্তরাল রেখার মধ্যে অবস্থিত সামান্তরিকের ক্ষেত্রফল আয়তক্ষেত্রের সমান।", { equalArea: true }),
    S("Area = base × height.", "ক্ষেত্রফল = ভূমি × উচ্চতা।", { formula: "A = bh" }),
  ]),
  V("mensuration-910", "c9_10.16", "Mensuration", "পরিমিতি", "solid-3d", "solid3d", { mode: "mensuration", solids: ["cylinder", "cone", "sphere"] }, [
    S("Cylinder: V = πr²h; cone: V = ⅓πr²h.", "সিলিন্ডার: V = πr²h; কোণ: V = ⅓πr²h।", { formula: "V_{cone} = \\frac{1}{3}\\pi r^2 h" }),
    S("Sphere: V = 4/3 πr³.", "গোলক: V = ৪/৩ πr³।", { formula: "V_{sphere} = \\frac{4}{3}\\pi r^3" }),
  ]),
  V("histogram-910", "c9_10.17", "Statistics", "পরিসংখ্যান", "chart", "chart", { values: [4, 8, 12, 9, 6], mode: "histogram" }, [
    S("A histogram shows frequency by class interval.", "হিস্টোগ্রাম শ্রেণি ব্যবধি অনুযায়ী পরিসংখ্যান দেখায়।", { histogram: true }),
    S("Mean = Σfx / Σf.", "গড় = Σfx / Σf।", { formula: "\\bar{x} = \\frac{\\sum fx}{\\sum f}" }),
  ]),
  V("number-system-tree", "c9_10.01", "The number system tree", "সংখ্যা পদ্ধতির বৃক্ষ", "venn-set", "vennSet", { mode: "number-system", sets: ["N", "W", "Z", "Q", "R"], examples: [0, -3, "1/2", "√2"] }, [
    S("N ⊂ W ⊂ Z ⊂ Q ⊂ R: each set contains the one before.", "N ⊂ W ⊂ Z ⊂ Q ⊂ R: প্রতিটি সেট আগেরটিকে ধারণ করে।", { order: ["N", "W", "Z", "Q", "R"] }),
    S("√2 is real but not rational, so it lies in R \\ Q.", "√২ বাস্তব কিন্তু মূলদ নয়, তাই এটি R \\ Q-তে থাকে।", { irrational: "√2" }),
  ]),
  V("rational-as-decimal", "c9_10.01", "Terminating and recurring decimals", "সমাপ্ত ও পুনরাবৃত্ত দশমিক", "number-line", "numberLine", { mode: "decimal-expansion", fractions: ["1/4", "1/3"], terminating: "0.25", recurring: "0.333..." }, [
    S("1/4 = 0.25 terminates after two decimal places.", "১/৪ = ০.২৫, দুই দশমিক স্থানে শেষ হয়।", { value: 0.25 }),
    S("1/3 = 0.333… recurs forever.", "১/৩ = ০.৩৩৩… অনন্তকাল পুনরাবৃত্ত হয়।", { value: "0.333..." }),
  ]),
  V("recurring-to-fraction", "c9_10.01", "Recurring decimal to fraction", "পুনরাবৃত্ত দশমিক থেকে ভগ্নাংশ", "algebra-stepper", "algebraStepper", { mode: "recurring", decimal: "0.727272...", fraction: "8/11" }, [
    S("Let x = 0.727272…, then 100x = 72.727272…", "ধরি x = ০.৭২৭২৭২…, তাহলে ১০০x = ৭২.৭২৭২৭২…", { x: "0.7272...", hundredX: "72.7272..." }),
    S("Subtract: 99x = 72, so x = 72/99 = 8/11.", "বিয়োগ: ৯৯x = ৭২, তাই x = ৭২/৯৯ = ৮/১১।", { fraction: "8/11" }, "x = \\frac{72}{99} = \\frac{8}{11}"),
  ]),
  V("irrational-root-two", "c9_10.01", "√2 on the number line", "সংখ্যারেখায় √২", "geometry-board", "geometryBoard", { mode: "root-two", square: 1, diagonal: "√2" }, [
    S("A unit square has diagonal √(1² + 1²) = √2.", "একক বর্গের কর্ণ √(১² + ১²) = √২।", { diagonal: "\\sqrt{2}" }),
    S("Swing an arc of radius √2 to mark it on the number line.", "√২ ব্যাসার্ধের চাপ এঁকে সংখ্যারেখায় চিহ্নিত করি।", { arc: true, value: "1.414..." }),
  ]),
  V("spiral-of-roots", "c9_10.01", "Spiral of roots", "মূলের সর্পিল", "geometry-board", "geometryBoard", { mode: "spiral-roots", roots: [2, 3, 4, 5], start: 1 }, [
    S("Each new right triangle has a leg of length 1.", "প্রতিটি নতুন সমকোণী ত্রিভুজের একটি বাহু দৈর্ঘ্য ১।", { leg: 1 }),
    S("The hypotenuses are √2, √3, √4, …", "অতিভুজগুলো √২, √৩, √৪, …", { roots: ["√2", "√3", "√4"] }),
  ]),
  V("density-of-rationals", "c9_10.01", "Density of rationals", "মূলদ সংখ্যার ঘনত্ব", "number-line", "numberLine", { mode: "density", a: 0, b: 1, zoom: 3 }, [
    S("Between any two rationals there is another rational.", "যেকোনো দুই মূলদ সংখ্যার মধ্যে আরেকটি মূলদ আছে।", { midpoint: "1/2" }),
    S("Zoom in and new fractions keep appearing: 1/4, 1/8, …", "জুম করলে নতুন ভগ্নাংশ আসতেই থাকে: ১/৪, ১/৮, …", { zoom: true }),
  ]),
  V("surd-operations", "c9_10.01", "Simplify and rationalise surds", "করণির সরলীকরণ ও হরণ", "algebra-stepper", "algebraStepper", { mode: "surd", expression: "√8 + √18", simplified: "5√2", rationalise: "1/√3" }, [
    S("Simplify: √8 = 2√2 and √18 = 3√2.", "সরল করি: √৮ = ২√২ এবং √১৮ = ৩√২।", { terms: ["2√2", "3√2"] }),
    S("Add like surds: 2√2 + 3√2 = 5√2.", "সদৃশ করণি যোগ: ২√২ + ৩√২ = ৫√২।", { sum: "5√2" }),
  ]),
  V("number-line-order", "c9_10.01", "Order mixed real numbers", "মিশ্র বাস্তব সংখ্যার ক্রম", "number-line", "numberLine", { mode: "order", values: [-2, "√2", 1.5, "π/2"] }, [
    S("Compare mixed numbers by placing them on one line.", "মিশ্র সংখ্যাগুলো একই রেখায় বসিয়ে তুলনা করি।", { values: [-2, "√2", 1.5, "π/2"] }),
    S("Order: −2 < √2 < 1.5 < π/2.", "ক্রম: −২ < √২ < ১.৫ < π/২।", { order: [-2, "√2", 1.5, "π/2"] }),
  ]),
  V("venn-3-sets", "c9_10.02", "Three-set Venn diagram", "তিন সেটের ভেন চিত্র", "venn-set", "vennSet", { mode: "three-set", sets: ["A", "B", "C"], labels: ["Math", "Science", "Arts"] }, [
    S("Three overlapping circles make eight regions.", "তিনটি ছেদকারী বৃত্ত আটটি অঞ্চল তৈরি করে।", { regions: 8 }),
    S("Each region holds elements in exactly that combination of sets.", "প্রতিটি অঞ্চলে ঠিক সেই সেট-সংমিশ্রণের উপাদান থাকে।", { regions: 8 }),
  ]),
  V("set-operations-lab", "c9_10.02", "Set operations lab", "সেট ক্রিয়া পরীক্ষাগার", "venn-set", "vennSet", { mode: "operations", a: [1, 2, 3], b: [3, 4, 5] }, [
    S("A ∪ B collects every element from both sets.", "A ∪ B দুই সেটের সব উপাদান একত্র করে।", { union: [1, 2, 3, 4, 5] }),
    S("A ∩ B keeps only the common elements.", "A ∩ B শুধু সাধারণ উপাদান রাখে।", { intersection: [3] }),
  ]),
  V("de-morgan-visual", "c9_10.02", "De Morgan's laws", "ডি মরগানের সূত্র", "venn-set", "vennSet", { mode: "de-morgan", a: [1, 2], b: [2, 3], universe: [1, 2, 3, 4] }, [
    S("(A ∪ B)′ is everything outside both sets.", "(A ∪ B)′ হলো দুই সেটের বাইরের সবকিছু।", { complement: [4] }),
    S("This equals A′ ∩ B′, the region outside A and outside B.", "এটি A′ ∩ B′-এর সমান, অর্থাৎ A ও B উভয়ের বাইরের অঞ্চল।", { equal: true }),
  ]),
  V("power-set-tree", "c9_10.02", "Power set tree", "পাওয়ার সেট বৃক্ষ", "venn-set", "vennSet", { mode: "power-set", set: [1, 2, 3], subsets: 8 }, [
    S("A set with n elements has 2ⁿ subsets.", "n উপাদানবিশিষ্ট সেটের ২ⁿটি উপসেট থাকে।", { formula: "2^n" }),
    S("For {1, 2, 3}, n = 3, so there are 8 subsets.", "{১, ২, ৩}-এর জন্য n = ৩, তাই উপসেট ৮টি।", { subsets: 8 }),
  ]),
  V("cartesian-product-grid", "c9_10.02", "Cartesian product grid", "কার্তেসীয় গুণফল গ্রিড", "coordinate-plane", "coordinatePlane", { mode: "cartesian-product", a: [1, 2], b: [3, 4] }, [
    S("A × B pairs each element of A with each element of B.", "A × B, A-এর প্রতিটি উপাদানকে B-এর প্রতিটি উপাদানের সাথে জোড়া করে।", { pairs: 4 }),
    S("The four points are (1,3), (1,4), (2,3), (2,4).", "চারটি বিন্দু (১,৩), (১,৪), (২,৩), (২,৪)।", { points: [[1, 3], [1, 4], [2, 3], [2, 4]] }),
  ]),
  V("relation-mapping", "c9_10.02", "Relation mapping arrows", "সম্পর্কের তীরচিত্র", "venn-set", "vennSet", { mode: "mapping", domain: [1, 2, 3], range: [2, 4, 6] }, [
    S("An arrow diagram shows which inputs map to which outputs.", "তীরচিত্র দেখায় কোন ইনপুট কোন আউটপুটে যায়।", { arrows: 3 }),
    S("Domain is the set of inputs; range is the set of outputs used.", "ডোমেইন ইনপুটের সেট; রেঞ্জ ব্যবহৃত আউটপুটের সেট।", { domain: [1, 2, 3] }),
  ]),
  V("function-machine", "c9_10.02", "The function machine", "ফাংশন মেশিন", "story-scene", "storyScene", { mode: "function-machine", rule: "×2 + 1", input: 3, output: 7 }, [
    S("The machine applies the rule to each input.", "মেশিন প্রতিটি ইনপুটে নিয়ম প্রয়োগ করে।", { rule: "2x + 1" }),
    S("Input 3 gives 2 × 3 + 1 = 7.", "ইনপুট ৩ দিলে ২ × ৩ + ১ = ৭।", { output: 7 }),
  ]),
  V("function-or-not", "c9_10.02", "Function or not?", "ফাংশন কি না?", "venn-set", "vennSet", { mode: "vertical-line", pairs: [[1, 2], [1, 3], [2, 4]] }, [
    S("A function gives one output per input.", "ফাংশন প্রতি ইনপুটে একটি আউটপুট দেয়।", { rule: "one output" }),
    S("The pairs (1,2) and (1,3) share an input, so this is not a function.", "(১,২) ও (১,৩) একই ইনপুট ভাগ করে, তাই এটি ফাংশন নয়।", { function: false }),
  ]),
  V("function-graph-lab", "c9_10.02", "Families of function graphs", "ফাংশন গ্রাফের পরিবার", "function-graph", "functionGraph", { mode: "families", expressions: ["x", "x^2", "1/x"] }, [
    S("Linear, quadratic and reciprocal graphs have different shapes.", "রৈখিক, দ্বিঘাত ও বিপরীত গ্রাফের আকার ভিন্ন।", { family: ["linear", "quadratic", "reciprocal"] }),
    S("Domain restrictions exclude division by zero and negative square roots.", "ডোমেইনে শূন্য দিয়ে ভাগ ও ঋণাত্মক বর্গমূল বাদ যায়।", { domain: "restricted" }),
  ]),
  V("inverse-function-mirror", "c9_10.02", "Inverse function mirror", "বিপরীত ফাংশনের প্রতিফলন", "function-graph", "functionGraph", { mode: "inverse", expression: "2x + 1", inverse: "(x - 1)/2" }, [
    S("The inverse swaps inputs and outputs.", "বিপরীত ফাংশন ইনপুট ও আউটপুট বিনিময় করে।", { swap: true }),
    S("Its graph is the reflection in the line y = x.", "এর গ্রাফ y = x রেখায় প্রতিফলন।", { mirror: "y = x" }),
  ]),
  V("identity-area-models", "c9_10.03", "Identity area models", "সূত্রের ক্ষেত্রফল মডেল", "array-grid", "arrayGrid", { mode: "identity-area", a: 5, b: 3 }, [
    S("(a + b)² = a² + 2ab + b² as four rectangles.", "(a + b)² = a² + ২ab + b² চারটি আয়তক্ষেত্র হিসেবে।", { formula: "(a+b)^2 = a^2 + 2ab + b^2" }),
    S("With a = 5 and b = 3: 25 + 30 + 9 = 64 = 8².", "a = ৫, b = ৩ হলে: ২৫ + ৩০ + ৯ = ৬৪ = ৮²।", { total: 64 }),
  ]),
  V("cube-identity-solid", "c9_10.03", "Cube identity solids", "ঘন সূত্রের ঘনবস্তু", "solid-3d", "solid3d", { mode: "cube-identity", a: 3, b: 2 }, [
    S("(a + b)³ splits into eight blocks of sizes a³, 3a²b, 3ab², b³.", "(a + b)³ আটটি ব্লকে ভাগ হয়: a³, ৩a²b, ৩ab², b³।", { formula: "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3" }),
    S("With a = 3, b = 2: 27 + 54 + 36 + 8 = 125 = 5³.", "a = ৩, b = ২ হলে: ২৭ + ৫৪ + ৩৬ + ৮ = ১২৫ = ৫³।", { total: 125 }),
  ]),
  V("expand-stepper", "c9_10.03", "Multi-term expansion", "বহুপদী বিস্তার", "algebra-stepper", "algebraStepper", { mode: "expand", expression: "(x + 2)(x + 3)" }, [
    S("Multiply each term: x·x + x·3 + 2·x + 2·3.", "প্রতিটি পদ গুণ করি: x·x + x·৩ + ২·x + ২·৩।", { terms: ["x^2", "3x", "2x", "6"] }),
    S("Combine like terms: x² + 5x + 6.", "সদৃশ পদ মিলাই: x² + ৫x + ৬।", { result: "x^2 + 5x + 6" }),
  ]),
  V("factorisation-lab", "c9_10.03", "Factorisation lab", "উৎপাদকীকরণ পরীক্ষাগার", "algebra-stepper", "algebraStepper", { mode: "factorise", expression: "x^2 + 5x + 6" }, [
    S("Find two numbers with sum 5 and product 6.", "দুটি সংখ্যা খুঁজি যাদের যোগফল ৫ ও গুণফল ৬।", { pair: [2, 3] }),
    S("They are 2 and 3, so x² + 5x + 6 = (x + 2)(x + 3).", "সেগুলো ২ ও ৩, তাই x² + ৫x + ৬ = (x + ২)(x + ৩)।", { factors: ["x+2", "x+3"] }),
  ]),
  V("algebra-tiles-factor", "c9_10.03", "Factor with algebra tiles", "বীজগণিত টাইল দিয়ে উৎপাদক", "algebra-stepper", "algebraStepper", { mode: "tiles", expression: "x^2 + 4x + 3" }, [
    S("Arrange one x² tile, four x tiles and three unit tiles.", "একটি x² টাইল, চারটি x টাইল ও তিনটি একক টাইল সাজাই।", { tiles: [1, 4, 3] }),
    S("They form a rectangle (x + 1)(x + 3).", "তারা (x + ১)(x + ৩) আয়তক্ষেত্র গঠন করে।", { factors: ["x+1", "x+3"] }),
  ]),
  V("remainder-theorem", "c9_10.03", "Remainder theorem", "ভাগশেষ উপপাদ্য", "function-graph", "functionGraph", { mode: "remainder", expression: "x^3 - 2x + 4", a: 2 }, [
    S("The remainder of f(x) ÷ (x − a) is f(a).", "f(x) ÷ (x − a)-এর ভাগশেষ f(a)।", { formula: "remainder = f(a)" }),
    S("f(2) = 8 − 4 + 4 = 8, so the remainder is 8.", "f(২) = ৮ − ৪ + ৪ = ৮, তাই ভাগশেষ ৮।", { remainder: 8 }),
  ]),
  V("factor-theorem", "c9_10.03", "Factor theorem", "উৎপাদক উপপাদ্য", "function-graph", "functionGraph", { mode: "factor", expression: "x^2 - 3x + 2", root: 1 }, [
    S("If f(a) = 0, then (x − a) is a factor.", "যদি f(a) = ০ হয়, তবে (x − a) একটি উৎপাদক।", { rule: "f(a)=0 ⇒ factor" }),
    S("f(1) = 1 − 3 + 2 = 0, so (x − 1) is a factor.", "f(১) = ১ − ৩ + ২ = ০, তাই (x − ১) উৎপাদক।", { root: 1 }),
  ]),
  V("identity-test", "c9_10.03", "Test an identity", "সূত্র পরীক্ষা", "algebra-stepper", "algebraStepper", { mode: "identity-test", identity: "(a+b)^2", sample: [[2, 3]] }, [
    S("Test an identity with random values of a and b.", "a ও b-এর ইচ্ছামতো মান দিয়ে সূত্র পরীক্ষা করি।", { a: 2, b: 3 }),
    S("(2 + 3)² = 25 and 2² + 2·2·3 + 3² = 25, so it holds.", "(২ + ৩)² = ২৫ আর ২² + ২·২·৩ + ৩² = ২৫, তাই সত্য।", { left: 25, right: 25 }),
  ]),
  V("common-errors", "c9_10.03", "Common algebraic errors", "সাধারণ বীজগণিতীয় ভুল", "algebra-stepper", "algebraStepper", { mode: "misconception", wrong: "(a+b)^2 = a^2 + b^2", correct: "a^2 + 2ab + b^2" }, [
    S("(a + b)² is not a² + b².", "(a + b)² কখনো a² + b² নয়।", { wrong: "a^2 + b^2" }),
    S("The missing middle term is 2ab: (a + b)² = a² + 2ab + b².", "হারানো মাঝের পদ ২ab: (a + b)² = a² + ২ab + b²।", { correct: "a^2 + 2ab + b^2" }),
  ]),
  V("exponent-laws-blocks", "c9_10.04", "Exponent laws with blocks", "ব্লক দিয়ে সূচকের নিয়ম", "array-grid", "arrayGrid", { mode: "exponent-product", base: 2, m: 3, n: 2 }, [
    S("aᵐ · aⁿ means m + n copies of a multiplied together.", "aᵐ · aⁿ মানে a-এর m + nটি অনুলিপি একসাথে গুণ।", { factors: 5 }),
    S("2³ · 2² = (2·2·2)(2·2) = 2⁵ = 32.", "২³ · ২² = (২·২·২)(২·২) = ২⁵ = ৩২।", { result: 32 }),
  ]),
  V("zero-and-negative-exponents", "c9_10.04", "Zero and negative exponents", "শূন্য ও ঋণাত্মক সূচক", "algebra-stepper", "algebraStepper", { mode: "zero-negative", base: 3 }, [
    S("The pattern 3³, 3², 3¹ divides by 3 each time.", "৩³, ৩², ৩¹ ধারাটি প্রতিবার ৩ দিয়ে ভাগ হয়।", { sequence: [27, 9, 3] }),
    S("Continuing gives 3⁰ = 1 and 3⁻¹ = 1/3.", "চালিয়ে গেলে ৩⁰ = ১ ও ৩⁻¹ = ১/৩।", { zero: 1, negative: "1/3" }),
  ]),
  V("fractional-exponents", "c9_10.04", "Fractional exponents", "ভগ্নাংশ সূচক", "algebra-stepper", "algebraStepper", { mode: "fractional", base: 8, power: "1/3" }, [
    S("a^(1/n) is the nth root of a.", "a^(১/n) হলো a-এর n-তম মূল।", { rule: "a^{1/n} = \\sqrt[n]{a}" }),
    S("8^(1/3) = 2 because 2³ = 8.", "৮^(১/৩) = ২, কারণ ২³ = ৮।", { result: 2 }),
  ]),
  V("exponential-growth-lab", "c9_10.04", "Exponential growth lab", "সূচকীয় বৃদ্ধির পরীক্ষা", "function-graph", "functionGraph", { mode: "exponential", base: 3, expression: "3^x" }, [
    S("y = aˣ grows faster as the base a increases.", "y = aˣ, ভিত্তি a বাড়লে দ্রুততর বাড়ে।", { base: 3 }),
    S("At x = 2, y = 3² = 9; at x = 3, y = 27.", "x = ২ হলে y = ৩² = ৯; x = ৩ হলে y = ২৭।", { points: [[2, 9], [3, 27]] }),
  ]),
  V("doubling-story", "c9_10.04", "The chessboard rice story", "দাবাবোর্ডের চালের গল্প", "story-scene", "storyScene", { mode: "chessboard", squares: 64, grains: "2^63" }, [
    S("Each square doubles the rice on the previous square.", "প্রতিটি ঘরে আগের ঘরের দ্বিগুণ চাল রাখা হয়।", { factor: 2 }),
    S("The 64th square holds 2⁶³ grains, an enormous number.", "৬৪তম ঘরে ২⁶³ দানা, এক বিশাল সংখ্যা।", { grains: "2^63" }),
  ]),
  V("log-as-inverse", "c9_10.04", "Logarithm as inverse", "লগারিদম বিপরীত ফাংশন", "function-graph", "functionGraph", { mode: "log-inverse", base: 2, expression: "2^x", inverse: "log_2 x" }, [
    S("y = log₂ x is the reflection of y = 2ˣ in y = x.", "y = log₂ x হলো y = ২ˣ-এর y = x-এ প্রতিফলন।", { mirror: "y = x" }),
    S("2³ = 8 means log₂ 8 = 3.", "২³ = ৮ মানে log₂ ৮ = ৩।", { value: 3 }),
  ]),
  V("log-laws-stepper", "c9_10.04", "Logarithm laws", "লগারিদমের নিয়ম", "algebra-stepper", "algebraStepper", { mode: "log-laws", expression: "log(8) + log(125)" }, [
    S("log_a(mn) = log_a m + log_a n turns a product into a sum.", "log_a(mn) = log_a m + log_a n গুণফলকে যোগে বদলায়।", { law: "product" }),
    S("log 8 + log 125 = log(8 × 125) = log 1000 = 3.", "log ৮ + log ১২৫ = log(৮ × ১২৫) = log ১০০০ = ৩।", { result: 3 }),
  ]),
  V("log-scale-number-line", "c9_10.04", "Logarithmic scale", "লগারিদমিক স্কেল", "number-line", "numberLine", { mode: "log-scale", values: [1, 10, 100, 1000] }, [
    S("On a log scale equal distances mean equal factors of 10.", "লগ স্কেলে সমান দূরত্ব মানে ১০-এর সমান গুণক।", { factor: 10 }),
    S("1, 10, 100, 1000 sit at equally spaced marks.", "১, ১০, ১০০, ১০০০ সমান ব্যবধানে বসে।", { values: [1, 10, 100, 1000] }),
  ]),
  V("change-of-base", "c9_10.04", "Change of base", "ভিত্তি পরিবর্তন", "algebra-stepper", "algebraStepper", { mode: "change-of-base", expression: "log_2 10", base: 10 }, [
    S("log_a b = log b / log a lets you use any base.", "log_a b = log b / log a যেকোনো ভিত্তি ব্যবহার করতে দেয়।", { formula: "\\log_a b = \\frac{\\log b}{\\log a}" }),
    S("log₂ 10 = log 10 / log 2 ≈ 1 / 0.301 ≈ 3.32.", "log₂ ১০ = log ১০ / log ২ ≈ ১ / ০.৩০১ ≈ ৩.৩২।", { value: 3.32 }),
  ]),
  V("log-misconception", "c9_10.04", "Logarithm misconception", "লগারিদমের ভুল ধারণা", "algebra-stepper", "algebraStepper", { mode: "misconception", wrong: "log(a+b) = log a + log b", correct: "log(ab) = log a + log b" }, [
    S("log(a + b) is not log a + log b.", "log(a + b) কখনো log a + log b নয়।", { wrong: true }),
    S("The product law applies to a product: log(ab) = log a + log b.", "গুণের নিয়ম গুণফলে প্রযোজ্য: log(ab) = log a + log b।", { correct: true }),
  ]),
  V("balance-and-solve", "c9_10.05", "Balance and solve", "ভারসাম্য রেখে সমাধান", "balance-scale", "balanceScale", { left: "2x + 3", right: 11, mode: "solve" }, [
    S("Subtract 3 from both sides: 2x = 8.", "দুই পাশ থেকে ৩ বিয়োগ: ২x = ৮।", { step: "2x = 8" }),
    S("Divide both sides by 2: x = 4.", "দুই পাশকে ২ দিয়ে ভাগ: x = ৪।", { solution: 4 }),
  ]),
  V("linear-equation-stepper", "c9_10.05", "Multi-step linear equation", "বহু ধাপের রৈখিক সমীকরণ", "algebra-stepper", "algebraStepper", { mode: "linear", equation: "3(x - 2) = 12" }, [
    S("Expand: 3x − 6 = 12.", "বিস্তার: ৩x − ৬ = ১২।", { expanded: "3x - 6 = 12" }),
    S("Add 6, then divide by 3: x = 6.", "৬ যোগ করে ৩ দিয়ে ভাগ: x = ৬।", { solution: 6 }),
  ]),
  V("fractional-equation", "c9_10.05", "Fractional equation", "ভগ্নাংশ সমীকরণ", "algebra-stepper", "algebraStepper", { mode: "fractional", equation: "x/2 + x/3 = 5", lcd: 6 }, [
    S("Multiply every term by the LCD 6.", "প্রতিটি পদকে লসাগু ৬ দিয়ে গুণ করি।", { lcd: 6 }),
    S("3x + 2x = 30, so 5x = 30 and x = 6.", "৩x + ২x = ৩০, তাই ৫x = ৩০ ও x = ৬।", { solution: 6 }),
  ]),
  V("quadratic-by-factoring", "c9_10.05", "Quadratic by factoring", "উৎপাদকে দ্বিঘাত সমীকরণ", "function-graph", "functionGraph", { mode: "roots", expression: "x^2 - 7x + 12" }, [
    S("Factor: x² − 7x + 12 = (x − 3)(x − 4).", "উৎপাদক: x² − ৭x + ১২ = (x − ৩)(x − ৪)।", { factors: ["x-3", "x-4"] }),
    S("Roots are x = 3 and x = 4.", "মূল x = ৩ ও x = ৪।", { roots: [3, 4] }),
  ]),
  V("quadratic-formula-walk", "c9_10.05", "Quadratic formula walk", "দ্বিঘাত সূত্রের ধাপ", "algebra-stepper", "algebraStepper", { mode: "quadratic-formula", equation: "2x^2 + 5x - 3 = 0", a: 2, b: 5, c: -3 }, [
    S("Use x = (−b ± √(b² − 4ac)) / 2a.", "ব্যবহার করি x = (−b ± √(b² − ৪ac)) / ২a।", { formula: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" }),
    S("Here b² − 4ac = 25 + 24 = 49, so x = (−5 ± 7)/4 = 1/2 or −3.", "এখানে b² − ৪ac = ২৫ + ২৪ = ৪৯, তাই x = (−৫ ± ৭)/৪ = ১/২ বা −৩।", { roots: [0.5, -3] }),
  ]),
  V("completing-the-square-area", "c9_10.05", "Completing the square by area", "ক্ষেত্রফলে পূর্ণ বর্গ", "array-grid", "arrayGrid", { mode: "complete-square", a: 4, b: 6 }, [
    S("x² + 6x needs 9 to complete the square.", "x² + ৬x পূর্ণ বর্গ করতে ৯ দরকার।", { add: 9 }),
    S("x² + 6x + 9 = (x + 3)².", "x² + ৬x + ৯ = (x + ৩)²।", { result: "(x+3)^2" }),
  ]),
  V("discriminant-lab", "c9_10.05", "Discriminant lab", "নিশ্চায়ক পরীক্ষা", "function-graph", "functionGraph", { mode: "discriminant", a: 1, b: -4, c: 4 }, [
    S("The discriminant b² − 4ac decides the number of roots.", "নিশ্চায়ক b² − ৪ac মূলের সংখ্যা নির্ধারণ করে।", { formula: "D = b^2 - 4ac" }),
    S("Here D = 16 − 16 = 0, so there is one repeated root.", "এখানে D = ১৬ − ১৬ = ০, তাই একটি পুনরাবৃত্ত মূল।", { roots: 1 }),
  ]),
  V("word-problems-linear", "c9_10.05", "Linear word problems", "রৈখিক শব্দ সমস্যা", "story-scene", "storyScene", { mode: "age", story: "Father is 3 times his son. Together they are 48.", equation: "x + 3x = 48" }, [
    S("Let the son be x; the father is 3x.", "পুত্রের বয়স x; পিতার ৩x।", { son: "x", father: "3x" }),
    S("x + 3x = 48 gives x = 12, so the father is 36.", "x + ৩x = ৪৮ হলে x = ১২, তাই পিতার বয়স ৩৬।", { son: 12, father: 36 }),
  ]),
  V("extraneous-root", "c9_10.05", "Extraneous roots", "বহির্গত মূল", "algebra-stepper", "algebraStepper", { mode: "extraneous", equation: "√(x + 2) = x", candidates: [2, -1], valid: 2 }, [
    S("Square both sides: x + 2 = x².", "দুই পাশ বর্গ: x + ২ = x²।", { squared: true }),
    S("The solutions x = 2 and x = −1; checking shows only x = 2 works.", "সমাধান x = ২ ও x = −১; যাচাইয়ে কেবল x = ২ সঠিক।", { valid: 2, extraneous: -1 }),
  ]),
  V("angle-pairs", "c9_10.06", "Angle pairs", "কোণ জোড়া", "geometry-board", "geometryBoard", { mode: "angle-pairs", a: 40, b: 140 }, [
    S("A linear pair adds to 180°.", "রৈখিক জোড়ার যোগফল ১৮০°।", { sum: 180 }),
    S("Vertical angles are equal; 40° and its opposite are both 40°.", "বিপ্রতীপ কোণ সমান; ৪০° ও তার বিপরীত উভয়ই ৪০°।", { vertical: 40 }),
  ]),
  V("transversal-angles", "c9_10.06", "Transversal angles", "ছেদক রেখার কোণ", "geometry-board", "geometryBoard", { mode: "transversal", angle: 65 }, [
    S("Corresponding and alternate angles are equal on parallel lines.", "সমান্তরাল রেখায় অনুরূপ ও একান্তর কোণ সমান।", { equal: [65, 65] }),
    S("Co-interior angles add to 180°.", "সহ-অন্তঃস্থ কোণের যোগফল ১৮০°।", { coInterior: 115 }),
  ]),
  V("triangle-angle-sum-proof", "c9_10.06", "Triangle angle sum proof", "ত্রিভুজের কোণসমষ্টির প্রমাণ", "geometry-board", "geometryBoard", { mode: "angle-sum", angles: [50, 60, 70] }, [
    S("Draw a line parallel to one side through the opposite vertex.", "বিপরীত শীর্ষ দিয়ে এক বাহুর সমান্তরাল রেখা আঁকি।", { parallel: true }),
    S("Alternate angles give 50° + 60° + 70° = 180°.", "একান্তর কোণ থেকে ৫০° + ৬০° + ৭০° = ১৮০°।", { sum: 180 }),
  ]),
  V("exterior-angle-theorem", "c9_10.06", "Exterior angle theorem", "বহিঃকোণ উপপাদ্য", "geometry-board", "geometryBoard", { mode: "exterior-angle", interior: [50, 70], exterior: 120 }, [
    S("An exterior angle equals the sum of the two opposite interior angles.", "বহিঃকোণ বিপরীত দুই অন্তঃকোণের যোগফলের সমান।", { exterior: 120 }),
    S("50° + 70° = 120°.", "৫০° + ৭০° = ১২০°।", { sum: 120 }),
  ]),
  V("congruence-sss-sas-asa-rhs", "c9_10.06", "Congruence criteria", "সর্বসমতার শর্ত", "geometry-board", "geometryBoard", { mode: "congruence", cases: ["SSS", "SAS", "ASA", "RHS"] }, [
    S("Congruent triangles match exactly under the given conditions.", "প্রদত্ত শর্তে সর্বসম ত্রিভুজ হুবহু মেলে।", { cases: 4 }),
    S("SSS, SAS, ASA and RHS each guarantee congruence.", "SSS, SAS, ASA ও RHS প্রত্যেকটি সর্বসমতা নিশ্চিত করে।", { valid: ["SSS", "SAS", "ASA", "RHS"] }),
  ]),
  V("ambiguous-ssa", "c9_10.06", "The ambiguous SSA case", "দ্ব্যর্থক SSA ক্ষেত্র", "geometry-board", "geometryBoard", { mode: "ambiguous", angle: 30, sides: [5, 7] }, [
    S("SSA can give zero, one or two triangles.", "SSA শূন্য, এক বা দুইটি ত্রিভুজ দিতে পারে।", { triangles: [0, 1, 2] }),
    S("With angle 30° and sides 5 and 7, two different triangles fit.", "৩০° কোণ ও ৫, ৭ বাহুতে দুইটি ভিন্ন ত্রিভুজ সম্ভব।", { ambiguous: true }),
  ]),
  V("isosceles-theorems", "c9_10.06", "Isosceles triangle theorems", "সমদ্বিবাহু ত্রিভুজের উপপাদ্য", "geometry-board", "geometryBoard", { mode: "isosceles", base: 6, side: 5 }, [
    S("In an isosceles triangle the base angles are equal.", "সমদ্বিবাহু ত্রিভুজে ভূমি-সংলগ্ন কোণ সমান।", { baseAngles: "equal" }),
    S("The line from the apex to the midpoint of the base is perpendicular.", "শীর্ষ থেকে ভূমির মধ্যবিন্দুর রেখা লম্ব।", { perpendicular: true }),
  ]),
  V("triangle-inequality", "c9_10.06", "Triangle inequality", "ত্রিভুজ অসমতা", "geometry-board", "geometryBoard", { mode: "inequality", sides: [3, 4, 8] }, [
    S("Any two sides must add to more than the third.", "যেকোনো দুই বাহুর যোগফল তৃতীয়টির চেয়ে বড় হতে হবে।", { rule: "a + b > c" }),
    S("3 + 4 = 7 < 8, so these sides cannot form a triangle.", "৩ + ৪ = ৭ < ৮, তাই এই বাহুগুলো ত্রিভুজ গঠন করতে পারে না।", { valid: false }),
  ]),
  V("medians-altitudes-centres", "c9_10.06", "Medians, altitudes and centres", "মধ্যমা, লম্ব ও কেন্দ্র", "geometry-board", "geometryBoard", { mode: "centres", points: ["centroid", "orthocentre", "circumcentre", "incentre"] }, [
    S("Medians meet at the centroid and altitudes at the orthocentre.", "মধ্যমারা ভরকেন্দ্রে ও লম্বগুলো লম্ববিন্দুতে মেলে।", { centroid: true, orthocentre: true }),
    S("Perpendicular bisectors meet at the circumcentre and angle bisectors at the incentre.", "লম্ব সমদ্বিখণ্ডকরা পরিকেন্দ্রে ও কোণ সমদ্বিখণ্ডকরা অন্তঃকেন্দ্রে মেলে।", { circumcentre: true, incentre: true }),
  ]),
  V("proof-builder", "c9_10.06", "Statement–reason proof builder", "বিবৃতি–কারণ প্রমাণ", "algebra-stepper", "algebraStepper", { mode: "proof", theorem: "triangle angle sum", statements: ["draw parallel", "alternate angles", "sum to 180"] }, [
    S("Write each statement with a reason beside it.", "প্রতিটি বিবৃতির পাশে কারণ লেখো।", { columns: 2 }),
    S("Statement–reason pairs build a complete proof.", "বিবৃতি–কারণ জোড়া সম্পূর্ণ প্রমাণ গঠন করে।", { complete: true }),
  ]),
  V("construct-triangles-all-cases", "c9_10.07", "Construct triangles in all cases", "সব ক্ষেত্রে ত্রিভুজ অঙ্কন", "compass-construct", "compassConstruct", { mode: "triangle", cases: ["SSS", "SAS", "ASA", "RHS"] }, [
    S("Start with the given side or angle and draw arcs.", "প্রদত্ত বাহু বা কোণ থেকে শুরু করে চাপ আঁকি।", { arcs: true }),
    S("The intersection of the arcs fixes the third vertex.", "চাপগুলোর ছেদ তৃতীয় শীর্ষ নির্ধারণ করে।", { vertex: "intersection" }),
  ]),
  V("construct-quadrilaterals", "c9_10.07", "Construct quadrilaterals", "চতুর্ভুজ অঙ্কন", "compass-construct", "compassConstruct", { mode: "quadrilateral", sides: [4, 5, 6, 7], diagonal: 8 }, [
    S("Draw the diagonal to split the quadrilateral into two triangles.", "কর্ণ এঁকে চতুর্ভুজকে দুইটি ত্রিভুজে ভাগ করি।", { triangles: 2 }),
    S("Construct each triangle, then join the free vertices.", "প্রতিটি ত্রিভুজ অঙ্কন করে মুক্ত শীর্ষ যোগ করি।", { complete: true }),
  ]),
  V("construct-parallelogram", "c9_10.07", "Construct a parallelogram", "সামান্তরিক অঙ্কন", "compass-construct", "compassConstruct", { mode: "parallelogram", base: 6, side: 4, angle: 60 }, [
    S("Copy the base and side at the given angle.", "প্রদত্ত কোণে ভূমি ও বাহু অনুলিপি করি।", { angle: 60 }),
    S("Parallel copies of opposite sides complete the parallelogram.", "বিপরীত বাহুর সমান্তরাল অনুলিপি সামান্তরিক পূর্ণ করে।", { opposite: "parallel" }),
  ]),
  V("area-equivalence-construction", "c9_10.07", "Area-equivalence construction", "সম-ক্ষেত্রফল অঙ্কন", "compass-construct", "compassConstruct", { mode: "area-equivalence", from: "quadrilateral", to: "triangle" }, [
    S("Draw a diagonal and a parallel line to keep the same height.", "একই উচ্চতা রাখতে কর্ণ ও সমান্তরাল রেখা আঁকি।", { parallel: true }),
    S("The new triangle has the same area as the quadrilateral.", "নতুন ত্রিভুজের ক্ষেত্রফল চতুর্ভুজের সমান।", { equalArea: true }),
  ]),
  V("construct-tangents", "c9_10.07", "Construct tangents", "স্পর্শক অঙ্কন", "compass-construct", "compassConstruct", { mode: "tangents", external: "P", circleRadius: 4 }, [
    S("Join the external point P to the centre O.", "বহিঃস্থ বিন্দু P-কে কেন্দ্র O-এর সাথে যোগ করি।", { segment: "PO" }),
    S("Draw a circle on PO as diameter; its intersections give the tangent points.", "PO-কে ব্যাস ধরে বৃত্ত আঁকি; ছেদবিন্দুই স্পর্শবিন্দু।", { tangents: 2 }),
  ]),
  V("why-it-works", "c9_10.07", "Why the construction works", "অঙ্কন কেন কাজ করে", "geometry-board", "geometryBoard", { mode: "construction-proof", construction: "perpendicular bisector" }, [
    S("Every construction step has a reason from congruent triangles.", "প্রতিটি অঙ্কন ধাপের কারণ সর্বসম ত্রিভুজ থেকে আসে।", { reason: "congruence" }),
    S("Equal radii make the two triangles congruent, proving the result.", "সমান ব্যাসার্ধ দুই ত্রিভুজকে সর্বসম করে, ফলে ফল প্রমাণিত।", { proof: true }),
  ]),
  V("chord-and-centre", "c9_10.08", "Chord and centre", "জ্যা ও কেন্দ্র", "geometry-board", "geometryBoard", { mode: "chord", radius: 5, chord: 6 }, [
    S("The perpendicular from the centre bisects the chord.", "কেন্দ্র থেকে লম্ব জ্যা-কে সমদ্বিখণ্ডিত করে।", { bisects: true }),
    S("Half the chord is 3 and the radius is 5, so the distance is 4.", "জ্যার অর্ধেক ৩ ও ব্যাসার্ধ ৫, তাই দূরত্ব ৪।", { distance: 4 }),
  ]),
  V("equal-chords-equal-distance", "c9_10.08", "Equal chords, equal distance", "সমান জ্যা, সমান দূরত্ব", "geometry-board", "geometryBoard", { mode: "equal-chords", chord: 8, radius: 5 }, [
    S("Equal chords are equally distant from the centre.", "সমান জ্যা কেন্দ্র থেকে সমদূরত্বে থাকে।", { equal: true }),
    S("Distance = √(5² − 4²) = 3 for both chords.", "দূরত্ব = √(৫² − ৪²) = ৩, দুই জ্যার জন্যই।", { distance: 3 }),
  ]),
  V("angle-at-centre-vs-circumference", "c9_10.08", "Angle at centre vs circumference", "কেন্দ্রস্থ বনাম পরিধিস্থ কোণ", "geometry-board", "geometryBoard", { mode: "angle-centre", central: 80, inscribed: 40 }, [
    S("The angle at the centre is twice the angle at the circumference.", "কেন্দ্রস্থ কোণ পরিধিস্থ কোণের দ্বিগুণ।", { ratio: 2 }),
    S("An 80° central angle subtends a 40° inscribed angle.", "৮০° কেন্দ্রস্থ কোণ ৪০° পরিধিস্থ কোণ ধারণ করে।", { central: 80, inscribed: 40 }),
  ]),
  V("angles-in-same-segment", "c9_10.08", "Angles in the same segment", "একই বৃত্তাংশের কোণ", "geometry-board", "geometryBoard", { mode: "same-segment", angle: 55 }, [
    S("Angles in the same segment are equal.", "একই বৃত্তাংশে অবস্থিত কোণ সমান।", { equal: true }),
    S("Every point on the major arc sees the chord at 55°.", "বৃহৎ চাপের প্রতিটি বিন্দু জ্যা-কে ৫৫°-এ দেখে।", { angle: 55 }),
  ]),
  V("cyclic-quadrilateral", "c9_10.08", "Cyclic quadrilateral", "বৃত্তস্থ চতুর্ভুজ", "geometry-board", "geometryBoard", { mode: "cyclic", angles: [70, 110] }, [
    S("Opposite angles of a cyclic quadrilateral add to 180°.", "বৃত্তস্থ চতুর্ভুজের বিপরীত কোণের যোগফল ১৮০°।", { sum: 180 }),
    S("70° and 110° are opposite angles here.", "৭০° ও ১১০° এখানে বিপরীত কোণ।", { pair: [70, 110] }),
  ]),
  V("tangent-properties", "c9_10.08", "Tangent properties", "স্পর্শকের ধর্ম", "geometry-board", "geometryBoard", { mode: "tangent", radius: 5, tangent: 12 }, [
    S("A tangent is perpendicular to the radius at the point of contact.", "স্পর্শবিন্দুতে স্পর্শক ব্যাসার্ধের লম্ব।", { perpendicular: true }),
    S("Tangents from an external point are equal in length.", "বহিঃস্থ বিন্দু থেকে স্পর্শক দুইটি সমান দৈর্ঘ্যের।", { equal: true }),
  ]),
  V("alternate-segment-theorem", "c9_10.08", "Alternate segment theorem", "বিকল্প বৃত্তাংশ উপপাদ্য", "geometry-board", "geometryBoard", { mode: "alternate-segment", tangentAngle: 60 }, [
    S("The angle between a tangent and a chord equals the angle in the alternate segment.", "স্পর্শক ও জ্যার মধ্যবর্তী কোণ বিকল্প বৃত্তাংশের কোণের সমান।", { equal: true }),
    S("A 60° tangent–chord angle matches the 60° angle in the alternate segment.", "৬০° স্পর্শক–জ্যা কোণ বিকল্প বৃত্তাংশের ৬০° কোণের সমান।", { angle: 60 }),
  ]),
  V("arc-sector-segment", "c9_10.08", "Arc, sector and segment", "চাপ, বৃত্তকলা ও বৃত্তাংশ", "geometry-board", "geometryBoard", { mode: "arc-sector", radius: 6, angle: 60 }, [
    S("Arc length = (θ/360) × 2πr.", "চাপের দৈর্ঘ্য = (θ/৩৬০) × ২πr।", { formula: "\\frac{\\theta}{360}\\times 2\\pi r" }),
    S("Sector area = (60/360) × π × 6² = 6π.", "বৃত্তকলার ক্ষেত্রফল = (৬০/৩৬০) × π × ৬² = ৬π।", { area: "6π" }),
  ]),
  V("circle-theorem-quiz", "c9_10.08", "Circle theorem quiz", "বৃত্তের উপপাদ্য কুইজ", "geometry-board", "geometryBoard", { mode: "quiz", question: "Which theorem gives 2:1?", answer: "angle at centre" }, [
    S("Read the diagram and name the theorem that applies.", "চিত্র দেখে প্রযোজ্য উপপাদ্যের নাম বলো।", { quiz: true }),
    S("The 2:1 relation is the angle-at-centre theorem.", "২:১ সম্পর্কটি কেন্দ্রস্থ কোণের উপপাদ্য।", { answer: "angle at centre" }),
  ]),
  V("right-triangle-ratios", "c9_10.09", "Right triangle ratios", "সমকোণী ত্রিভুজের অনুপাত", "geometry-board", "geometryBoard", { mode: "ratios", opposite: 3, adjacent: 4, hypotenuse: 5 }, [
    S("sin θ = opposite/hypotenuse = 3/5.", "sin θ = বিপরীত/অতিভুজ = ৩/৫।", { sin: "3/5" }),
    S("cos θ = 4/5 and tan θ = 3/4.", "cos θ = ৪/৫ আর tan θ = ৩/৪।", { cos: "4/5", tan: "3/4" }),
  ]),
  V("similar-triangles-same-ratio", "c9_10.09", "The ratio does not change with size", "আকার বদলালেও অনুপাত একই", "geometry-board", "geometryBoard", { mode: "similar-ratio", scale: [1, 2, 3] }, [
    S("Scaling a right triangle keeps its angles the same.", "সমকোণী ত্রিভুজের মাপ বদলালেও কোণ একই থাকে।", { angles: "equal" }),
    S("Opposite/hypotenuse stays 3/5 at every size.", "বিপরীত/অতিভুজ প্রতিটি আকারে ৩/৫ থাকে।", { ratio: "3/5" }),
  ]),
  V("unit-circle-build", "c9_10.09", "Build the unit circle", "একক বৃত্ত নির্মাণ", "parametric-polar", "parametricPolar", { mode: "unit-circle", angle: 30 }, [
    S("A point on the unit circle is (cos θ, sin θ).", "একক বৃত্তের বিন্দু (cos θ, sin θ)।", { point: ["cosθ", "sinθ"] }),
    S("At 30°, cos 30° = √3/2 and sin 30° = 1/2.", "৩০°-এ cos ৩০° = √৩/২ আর sin ৩০° = ১/২।", { cos: "√3/2", sin: "1/2" }),
  ]),
  V("special-angles-table", "c9_10.09", "Special angles", "বিশেষ কোণ", "geometry-board", "geometryBoard", { mode: "special-angles", angles: [30, 45, 60] }, [
    S("30° and 60° come from a 1 : √3 : 2 triangle.", "৩০° ও ৬০° আসে ১ : √৩ : ২ ত্রিভুজ থেকে।", { triangle: [1, "√3", 2] }),
    S("45° comes from a 1 : 1 : √2 triangle.", "৪৫° আসে ১ : ১ : √২ ত্রিভুজ থেকে।", { triangle: [1, 1, "√2"] }),
  ]),
  V("identity-sin2-cos2", "c9_10.09", "sin²θ + cos²θ = 1", "sin²θ + cos²θ = ১", "parametric-polar", "parametricPolar", { mode: "identity", angle: 40 }, [
    S("On the unit circle, x² + y² = 1.", "একক বৃত্তে x² + y² = ১।", { equation: "x^2 + y^2 = 1" }),
    S("So sin²θ + cos²θ = 1 for every angle θ.", "তাই প্রতিটি কোণ θ-এর জন্য sin²θ + cos²θ = ১।", { identity: true }),
  ]),
  V("complementary-angles", "c9_10.09", "Complementary angles", "পূরক কোণ", "geometry-board", "geometryBoard", { mode: "complementary", angle: 35 }, [
    S("sin(90° − θ) = cos θ.", "sin(৯০° − θ) = cos θ।", { rule: true }),
    S("At θ = 35°: sin 55° = cos 35° = 0.819.", "θ = ৩৫°-এ: sin ৫৫° = cos ৩৫° = ০.৮১৯।", { value: 0.819 }),
  ]),
  V("graph-of-trig", "c9_10.09", "Graphs of trigonometric functions", "ত্রিকোণমিতিক ফাংশনের গ্রাফ", "function-graph", "functionGraph", { mode: "trig", functions: ["sin", "cos", "tan"], period: 360 }, [
    S("sin θ and cos θ repeat every 360°.", "sin θ ও cos θ প্রতি ৩৬০°-এ পুনরাবৃত্ত হয়।", { period: 360 }),
    S("tan θ has asymptotes where cos θ = 0.", "যেখানে cos θ = ০ সেখানে tan θ-এর অসীম স্পর্শক।", { asymptotes: [90, 270] }),
  ]),
  V("solve-triangle", "c9_10.09", "Solve a right triangle", "সমকোণী ত্রিভুজ সমাধান", "algebra-stepper", "algebraStepper", { mode: "solve-triangle", angle: 30, hypotenuse: 10 }, [
    S("sin 30° = opposite/10, so opposite = 10 sin 30°.", "sin ৩০° = বিপরীত/১০, তাই বিপরীত = ১০ sin ৩০°।", { formula: "10 \\sin 30^\\circ" }),
    S("Opposite = 10 × 1/2 = 5.", "বিপরীত = ১০ × ১/২ = ৫।", { side: 5 }),
  ]),
  V("calculator-mode-trap", "c9_10.09", "Degrees or radians?", "ডিগ্রি না রেডিয়ান?", "algebra-stepper", "algebraStepper", { mode: "mode", degrees: 90, radians: "π/2" }, [
    S("90° and π/2 radians are the same angle.", "৯০° ও π/২ রেডিয়ান একই কোণ।", { equal: true }),
    S("Sin 90° = 1, but sin(90 radians) is different: set the mode first.", "sin ৯০° = ১, কিন্তু sin(৯০ রেডিয়ান) ভিন্ন: আগে মোড ঠিক করো।", { degrees: 1, radians: 0.894 }),
  ]),
  V("angle-of-elevation-scene", "c9_10.10", "Angle of elevation scene", "উন্নতি কোণের দৃশ্য", "physics-scene", "physicsScene", { mode: "elevation", height: 15, distance: 15, angle: 45 }, [
    S("The observer looks up at the top of the tower.", "পর্যবেক্ষক মিনারের শীর্ষে ওপরে তাকায়।", { angle: 45 }),
    S("tan θ = height/distance = 15/15 = 1, so θ = 45°.", "tan θ = উচ্চতা/দূরত্ব = ১৫/১৫ = ১, তাই θ = ৪৫°।", { angle: 45 }),
  ]),
  V("angle-of-depression", "c9_10.10", "Angle of depression", "অবনমন কোণ", "physics-scene", "physicsScene", { mode: "depression", height: 20, distance: 20, angle: 45 }, [
    S("Looking down, the angle is measured below the horizontal.", "নিচে তাকালে কোণ অনুভূমিকের নিচে মাপা হয়।", { below: true }),
    S("The angle of depression equals the alternate angle of elevation.", "অবনমন কোণ বিকল্প উন্নতি কোণের সমান।", { equal: 45 }),
  ]),
  V("two-position-problem", "c9_10.10", "Two-position problem", "দুই অবস্থানের সমস্যা", "geometry-board", "geometryBoard", { mode: "two-position", near: 30, far: 60, height: 30 }, [
    S("From two positions, write two tangent equations.", "দুই অবস্থান থেকে দুইটি tan সমীকরণ লিখি।", { equations: 2 }),
    S("Subtracting the distances gives the height.", "দূরত্ব বিয়োগ করে উচ্চতা পাওয়া যায়।", { height: 30 }),
  ]),
  V("clinometer-lab", "c9_10.10", "Clinometer lab", "ক্লিনোমিটার পরীক্ষা", "story-scene", "storyScene", { mode: "clinometer", eyeHeight: 1.5, distance: 20, angle: 30 }, [
    S("A clinometer measures the angle to the top of an object.", "ক্লিনোমিটার দিয়ে বস্তুর শীর্ষের কোণ মাপা হয়।", { tool: "clinometer" }),
    S("Height above eye = 20 tan 30° ≈ 11.5 m.", "চোখের উচ্চতার উপরে = ২০ tan ৩০° ≈ ১১.৫ মি।", { height: 11.5 }),
  ]),
  V("diagram-first", "c9_10.10", "Diagram first", "আগে চিত্র আঁকো", "story-scene", "storyScene", { mode: "diagram", text: "From a point 40 m away the elevation is 30°." }, [
    S("Read the problem and sketch the right triangle first.", "সমস্যা পড়ে আগে সমকোণী ত্রিভুজের চিত্র আঁকি।", { sketch: true }),
    S("Label the known side and angle before choosing a ratio.", "অনুপাত বাছার আগে জানা বাহু ও কোণ চিহ্নিত করি।", { labels: ["40 m", "30°"] }),
  ]),
  V("elevation-depression-errors", "c9_10.10", "Elevation and depression errors", "উন্নতি ও অবনমনের ভুল", "geometry-board", "geometryBoard", { mode: "misconception", wrong: "elevation = depression", correct: "equal alternate angles" }, [
    S("Elevation is measured upward from the horizontal.", "উন্নতি কোণ অনুভূমিক থেকে ঊর্ধ্বে মাপা হয়।", { direction: "up" }),
    S("Depression is measured downward; do not swap them in a diagram.", "অবনমন কোণ নিচের দিকে মাপা হয়; চিত্রে এগুলো উল্টো নয়।", { direction: "down" }),
  ]),
  V("ratio-bars", "c9_10.11", "Ratio bars with algebra", "বীজগণিতসহ অনুপাতের বার", "tape-diagram", "tapeDiagram", { mode: "ratio", parts: [3, 5], total: 64 }, [
    S("The ratio 3 : 5 makes 8 equal parts.", "৩ : ৫ অনুপাতে মোট ৮টি সমান ভাগ।", { parts: 8 }),
    S("Each part is 64 ÷ 8 = 8, so the shares are 24 and 40.", "প্রতি ভাগ ৬৪ ÷ ৮ = ৮, তাই ভাগ ২৪ ও ৪০।", { shares: [24, 40] }),
  ]),
  V("proportion-cross-multiply", "c9_10.11", "Cross multiplication", "আড়গুণন", "algebra-stepper", "algebraStepper", { mode: "proportion", a: 3, b: 4, c: 9 }, [
    S("a : b = c : d means ad = bc.", "a : b = c : d মানে ad = bc।", { formula: "ad = bc" }),
    S("3 : 4 = 9 : d gives 3d = 36, so d = 12.", "৩ : ৪ = ৯ : d হলে ৩d = ৩৬, তাই d = ১২।", { d: 12 }),
  ]),
  V("componendo-dividendo", "c9_10.11", "Componendo and dividendo", "যোগ–বিয়োগ অনুপাত", "algebra-stepper", "algebraStepper", { mode: "componendo-dividendo", a: 3, b: 2 }, [
    S("If a/b = c/d, then (a + b)/(a − b) = (c + d)/(c − d).", "যদি a/b = c/d হয়, তবে (a + b)/(a − b) = (c + d)/(c − d)।", { rule: true }),
    S("With a = 3, b = 2: (3 + 2)/(3 − 2) = 5/1 = 5.", "a = ৩, b = ২ হলে: (৩ + ২)/(৩ − ২) = ৫/১ = ৫।", { value: 5 }),
  ]),
  V("direct-inverse-variation", "c9_10.11", "Direct and inverse variation", "সরাসরি ও বিপরীত ভেদ", "function-graph", "functionGraph", { mode: "variation", direct: "y = kx", inverse: "y = k/x" }, [
    S("Direct variation graphs as a straight line through the origin.", "সরাসরি ভেদের গ্রাফ মূলবিন্দুগামী সরলরেখা।", { direct: true }),
    S("Inverse variation graphs as a hyperbola.", "বিপরীত ভেদের গ্রাফ অধিবৃত্ত।", { inverse: true }),
  ]),
  V("mean-proportional", "c9_10.11", "Mean proportional", "মধ্য সমানুপাতী", "geometry-board", "geometryBoard", { mode: "mean-proportional", a: 4, b: 9 }, [
    S("The mean proportional between a and b is √(ab).", "a ও b-এর মধ্য সমানুপাতী √(ab)।", { formula: "\\sqrt{ab}" }),
    S("Between 4 and 9 it is √36 = 6.", "৪ ও ৯-এর মধ্যে এটি √৩৬ = ৬।", { value: 6 }),
  ]),
  V("recipe-scaling", "c9_10.11", "Recipe scaling", "রেসিপির মাপ বৃদ্ধি", "story-scene", "storyScene", { mode: "recipe", servings: 4, target: 10, factor: 2.5 }, [
    S("Scale every ingredient by the same factor.", "প্রতিটি উপাদান একই গুণকে মাপে বাড়াই।", { factor: 2.5 }),
    S("A recipe for 4 scaled to 10 uses 2.5 times each amount.", "৪ জনের রেসিপি ১০ জনে করতে প্রতিটি পরিমাণ ২.৫ গুণ।", { factor: 2.5 }),
  ]),
  V("intersecting-lines", "c9_10.12", "Intersecting lines", "ছেদকারী রেখা", "coordinate-plane", "coordinatePlane", { mode: "intersection", equations: ["2x + y = 7", "x - y = 2"] }, [
    S("Each linear equation is a straight line.", "প্রতিটি রৈখিক সমীকরণ একটি সরলরেখা।", { lines: 2 }),
    S("The lines meet at (3, 1), the common solution.", "রেখাদ্বয় (৩, ১)-এ মেলে, যা সাধারণ সমাধান।", { solution: [3, 1] }),
  ]),
  V("substitution-method", "c9_10.12", "Substitution method", "প্রতিস্থাপন পদ্ধতি", "algebra-stepper", "algebraStepper", { mode: "substitution", equations: ["y = x + 1", "2x + y = 7"] }, [
    S("Substitute y = x + 1 into the second equation.", "y = x + ১ দ্বিতীয় সমীকরণে বসাই।", { substituted: "2x + x + 1 = 7" }),
    S("3x = 6 gives x = 2, then y = 3.", "৩x = ৬ হলে x = ২, তারপর y = ৩।", { solution: [2, 3] }),
  ]),
  V("elimination-method", "c9_10.12", "Elimination method", "অপনয়ন পদ্ধতি", "algebra-stepper", "algebraStepper", { mode: "elimination", equations: ["x + y = 5", "x - y = 1"] }, [
    S("Add the equations to eliminate y: 2x = 6.", "y বাদ দিতে সমীকরণ যোগ: ২x = ৬।", { add: true }),
    S("x = 3 and y = 2.", "x = ৩ ও y = ২।", { solution: [3, 2] }),
  ]),
  V("cross-multiplication", "c9_10.12", "Cross-multiplication method", "আড়গুণন পদ্ধতি", "algebra-stepper", "algebraStepper", { mode: "cross-multiplication", equations: ["2x + 3y = 12", "x - y = 1"] }, [
    S("Write both equations as a₁x + b₁y = c₁ and a₂x + b₂y = c₂.", "দুই সমীকরণ a₁x + b₁y = c₁ ও a₂x + b₂y = c₂ আকারে লিখি।", { form: true }),
    S("The formula gives x = 3 and y = 2.", "সূত্র থেকে x = ৩ ও y = ২।", { solution: [3, 2] }),
  ]),
  V("consistency-types", "c9_10.12", "Consistency types", "সঙ্গতির ধরন", "coordinate-plane", "coordinatePlane", { mode: "consistency", types: ["unique", "none", "infinite"] }, [
    S("Different slopes give one intersection and a unique solution.", "ভিন্ন ঢালে একটি ছেদ ও একক সমাধান।", { unique: true }),
    S("Parallel lines have no solution; identical lines have infinitely many.", "সমান্তরাল রেখায় সমাধান নেই; অভিন্ন রেখায় অসীম সমাধান।", { parallel: true, coincident: true }),
  ]),
  V("word-problem-systems", "c9_10.12", "Systems in word problems", "শব্দ সমস্যায় সমীকরণ জোড়", "story-scene", "storyScene", { mode: "word-system", story: "3 pens and 2 pencils cost 80; 1 pen and 2 pencils cost 40.", equations: ["3p + 2q = 80", "p + 2q = 40"] }, [
    S("Let p and q be the prices of a pen and a pencil.", "p ও q যথাক্রমে একটি কলম ও পেন্সিলের দাম ধরি।", { variables: ["p", "q"] }),
    S("Subtracting gives 2p = 40, so p = 20 and q = 10.", "বিয়োগে ২p = ৪০, তাই p = ২০ ও q = ১০।", { solution: [20, 10] }),
  ]),
  V("non-linear-pair-intro", "c9_10.12", "A line and a curve", "রেখা ও বক্র", "function-graph", "functionGraph", { mode: "non-linear", conic: "circle", line: "y = x + 1" }, [
    S("A line can meet a circle at 0, 1 or 2 points.", "একটি রেখা বৃত্তকে ০, ১ বা ২ বিন্দুতে ছেদ করতে পারে।", { points: [0, 1, 2] }),
    S("Substitution turns the pair into a quadratic equation.", "প্রতিস্থাপনে জোড়াটি একটি দ্বিঘাত সমীকরণে পরিণত হয়।", { quadratic: true }),
  ]),
  V("arithmetic-sequence-stairs", "c9_10.13", "Arithmetic sequence stairs", "সমান্তর ধারার সিঁড়ি", "chart", "chart", { mode: "arithmetic", first: 2, difference: 3, n: 6 }, [
    S("Each step adds the common difference d.", "প্রতিটি ধাপে সাধারণ অন্তর d যোগ হয়।", { difference: 3 }),
    S("2, 5, 8, 11, 14, 17 uses d = 3.", "২, ৫, ৮, ১১, ১৪, ১৭-এ d = ৩।", { terms: [2, 5, 8, 11, 14, 17] }),
  ]),
  V("gauss-pairing-sum", "c9_10.13", "Gauss pairing sum", "গাউসের জোড়া যোগ", "array-grid", "arrayGrid", { mode: "gauss", n: 10, sum: 55 }, [
    S("Pair the first and last terms: 1 + 10 = 11.", "প্রথম ও শেষ পদ জোড়া করি: ১ + ১০ = ১১।", { pair: 11 }),
    S("There are 5 pairs, so the sum is 5 × 11 = 55.", "৫টি জোড়া, তাই যোগফল ৫ × ১১ = ৫৫।", { sum: 55 }),
  ]),
  V("arithmetic-series-formula", "c9_10.13", "Arithmetic series formula", "সমান্তর ধারার সূত্র", "algebra-stepper", "algebraStepper", { mode: "arithmetic-series", first: 2, difference: 3, n: 10 }, [
    S("Sₙ = n/2 [2a + (n − 1)d].", "Sₙ = n/২ [২a + (n − ১)d]।", { formula: "S_n = \\frac{n}{2}[2a + (n-1)d]" }),
    S("S₁₀ = 10/2 [4 + 27] = 5 × 31 = 155.", "S₁₀ = ১০/২ [৪ + ২৭] = ৫ × ৩১ = ১৫৫।", { sum: 155 }),
  ]),
  V("geometric-sequence-growth", "c9_10.13", "Geometric sequence growth", "গুণোত্তর ধারার বৃদ্ধি", "chart", "chart", { mode: "geometric", first: 3, ratio: 2, n: 5 }, [
    S("Each term multiplies by the common ratio r.", "প্রতিটি পদ সাধারণ অনুপাত r দিয়ে গুণ হয়।", { ratio: 2 }),
    S("3, 6, 12, 24, 48 doubles each time.", "৩, ৬, ১২, ২৪, ৪৮ প্রতিবার দ্বিগুণ হয়।", { terms: [3, 6, 12, 24, 48] }),
  ]),
  V("geometric-series-sum", "c9_10.13", "Geometric series sum", "গুণোত্তর ধারার সমষ্টি", "algebra-stepper", "algebraStepper", { mode: "geometric-series", first: 3, ratio: 2, n: 5 }, [
    S("Sₙ = a(rⁿ − 1)/(r − 1) for r ≠ 1.", "r ≠ ১ হলে Sₙ = a(rⁿ − ১)/(r − ১)।", { formula: "S_n = \\frac{a(r^n-1)}{r-1}" }),
    S("S₅ = 3(32 − 1)/(2 − 1) = 93.", "S₅ = ৩(৩২ − ১)/(২ − ১) = ৯৩।", { sum: 93 }),
  ]),
  V("sum-of-squares-blocks", "c9_10.13", "Sum of squares blocks", "বর্গের সমষ্টির ব্লক", "solid-3d", "solid3d", { mode: "sum-squares", n: 4, sum: 30 }, [
    S("Stack layers of 1², 2², 3², 4² blocks.", "১², ২², ৩², ৪² ব্লকের স্তর সাজাই।", { layers: [1, 4, 9, 16] }),
    S("1 + 4 + 9 + 16 = 30.", "১ + ৪ + ৯ + ১৬ = ৩০।", { sum: 30 }),
  ]),
  V("real-life-series", "c9_10.13", "Series in real life", "বাস্তব জীবনে ধারা", "story-scene", "storyScene", { mode: "savings", first: 100, difference: 50, months: 6 }, [
    S("Save 100 taka in month 1, then 50 more each month.", "১ম মাসে ১০০ টাকা, পরে প্রতি মাসে ৫০ টাকা বেশি জমাই।", { first: 100, difference: 50 }),
    S("After 6 months: 6/2 [200 + 250] = 1350 taka.", "৬ মাস পরে: ৬/২ [২০০ + ২৫০] = ১৩৫০ টাকা।", { total: 1350 }),
  ]),
  V("find-the-nth-term", "c9_10.13", "Find the nth term", "n-তম পদ নির্ণয়", "algebra-stepper", "algebraStepper", { mode: "nth-term", first: 5, difference: 4, n: 10 }, [
    S("aₙ = a + (n − 1)d.", "aₙ = a + (n − ১)d।", { formula: "a_n = a + (n-1)d" }),
    S("a₁₀ = 5 + 9 × 4 = 41.", "a₁₀ = ৫ + ৯ × ৪ = ৪১।", { term: 41 }),
  ]),
  V("similar-shapes-scale", "c9_10.14", "Similar shapes and scale", "সদৃশ আকৃতি ও স্কেল", "geometry-board", "geometryBoard", { mode: "similar-scale", factor: 2 }, [
    S("Corresponding angles stay equal under scaling.", "মাপ বদলালেও অনুরূপ কোণ সমান থাকে।", { angles: "equal" }),
    S("Every length is multiplied by the scale factor 2.", "প্রতিটি দৈর্ঘ্য স্কেল গুণক ২ দিয়ে গুণ হয়।", { factor: 2 }),
  ]),
  V("similar-triangles-aa", "c9_10.14", "Similar triangles (AA)", "সদৃশ ত্রিভুজ (AA)", "geometry-board", "geometryBoard", { mode: "aa", angles: [50, 60] }, [
    S("Two equal angles are enough for similarity (AA).", "দুইটি সমান কোণই সদৃশতার জন্য যথেষ্ট (AA)।", { condition: "AA" }),
    S("If two angles match, the third must match too.", "দুই কোণ মিললে তৃতীয়টিও মিলতে বাধ্য।", { third: 70 }),
  ]),
  V("area-ratio-scale-squared", "c9_10.14", "Area ratio is scale squared", "ক্ষেত্রফলের অনুপাত স্কেলের বর্গ", "geometry-board", "geometryBoard", { mode: "area-ratio", factor: 3 }, [
    S("Areas scale by the square of the scale factor.", "ক্ষেত্রফল স্কেল গুণকের বর্গ অনুপাতে বাড়ে।", { formula: "A ∝ k^2" }),
    S("A scale factor 3 gives 3² = 9 times the area.", "স্কেল গুণক ৩ হলে ক্ষেত্রফল ৩² = ৯ গুণ।", { ratio: 9 }),
  ]),
  V("basic-proportionality-theorem", "c9_10.14", "Basic proportionality theorem", "মূল সমানুপাতিকতা উপপাদ্য", "geometry-board", "geometryBoard", { mode: "bpt", ratio: 2 }, [
    S("A line parallel to one side divides the other two proportionally.", "এক বাহুর সমান্তরাল রেখা অন্য দুই বাহুকে সমানুপাতে ভাগ করে।", { parallel: true }),
    S("AD/DB = AE/EC.", "AD/DB = AE/EC।", { ratio: true }),
  ]),
  V("shadow-and-height", "c9_10.14", "Shadow and height", "ছায়া ও উচ্চতা", "physics-scene", "physicsScene", { mode: "shadow", personHeight: 1.5, personShadow: 2, treeShadow: 12 }, [
    S("Similar triangles link heights and shadows.", "সদৃশ ত্রিভুজ উচ্চতা ও ছায়া সংযুক্ত করে।", { similar: true }),
    S("Tree height = 1.5 × 12/2 = 9 m.", "গাছের উচ্চতা = ১.৫ × ১২/২ = ৯ মি।", { height: 9 }),
  ]),
  V("line-symmetry", "c9_10.14", "Line symmetry", "রেখা প্রতিসাম্য", "shape-canvas", "shapeCanvas", { mode: "line-symmetry", shape: "square", lines: 4 }, [
    S("A square has 4 axes of symmetry.", "বর্গক্ষেত্রের ৪টি প্রতিসাম্য অক্ষ আছে।", { lines: 4 }),
    S("Folding along any axis makes the halves coincide.", "যেকোনো অক্ষ বরাবর ভাঁজ করলে দুই অর্ধাংশ মেলে।", { coincide: true }),
  ]),
  V("rotational-symmetry", "c9_10.14", "Rotational symmetry", "ঘূর্ণন প্রতিসাম্য", "shape-canvas", "shapeCanvas", { mode: "rotational", shape: "square", order: 4 }, [
    S("A square looks the same after a 90° turn.", "বর্গক্ষেত্র ৯০° ঘোরালেও একই দেখায়।", { angle: 90 }),
    S("Its order of rotational symmetry is 4.", "এর ঘূর্ণন প্রতিসাম্যের ক্রম ৪।", { order: 4 }),
  ]),
  V("reflection-rotation-translation", "c9_10.14", "Reflection, rotation and translation", "প্রতিফলন, ঘূর্ণন ও সরণ", "coordinate-plane", "coordinatePlane", { mode: "transformations", shape: "triangle", operations: ["reflect", "rotate", "translate"] }, [
    S("Reflection flips, rotation turns and translation slides.", "প্রতিফলন উল্টায়, ঘূর্ণন ঘোরায় আর সরণ সরায়।", { operations: 3 }),
    S("A translation changes position but not shape or size.", "সরণ অবস্থান বদলায়, আকার বা মাপ নয়।", { invariant: true }),
  ]),
  V("parallelogram-same-base", "c9_10.15", "Parallelograms on the same base", "একই ভূমিতে সামান্তরিক", "geometry-board", "geometryBoard", { mode: "same-base", shape: "parallelogram", base: 6, height: 4 }, [
    S("Parallelograms on the same base and between the same parallels have equal area.", "একই ভূমি ও একই সমান্তরাল রেখার মধ্যে সামান্তরিকগুলোর ক্ষেত্রফল সমান।", { equalArea: true }),
    S("Area = base × height = 6 × 4 = 24.", "ক্ষেত্রফল = ভূমি × উচ্চতা = ৬ × ৪ = ২৪।", { area: 24 }),
  ]),
  V("triangle-same-base", "c9_10.15", "Triangles on the same base", "একই ভূমিতে ত্রিভুজ", "geometry-board", "geometryBoard", { mode: "same-base", shape: "triangle", base: 6, height: 4 }, [
    S("Triangles on the same base and between the same parallels have equal area.", "একই ভূমি ও সমান্তরাল রেখার মধ্যে ত্রিভুজগুলোর ক্ষেত্রফল সমান।", { equalArea: true }),
    S("Area = ½ × 6 × 4 = 12.", "ক্ষেত্রফল = ১/২ × ৬ × ৪ = ১২।", { area: 12 }),
  ]),
  V("median-bisects-area", "c9_10.15", "A median bisects the area", "মধ্যমা ক্ষেত্রফল সমদ্বিখণ্ডিত করে", "geometry-board", "geometryBoard", { mode: "median", base: 8, height: 5 }, [
    S("A median divides a triangle into two equal-area triangles.", "মধ্যমা ত্রিভুজকে দুইটি সমান ক্ষেত্রফলের ত্রিভুজে ভাগ করে।", { equal: true }),
    S("Each half has area ½ × (½ × 8 × 5) = 10.", "প্রতিটি অর্ধের ক্ষেত্রফল ১/২ × (১/২ × ৮ × ৫) = ১০।", { half: 10 }),
  ]),
  V("shear-transformation", "c9_10.15", "Shear transformation", "শিয়ার রূপান্তর", "geometry-board", "geometryBoard", { mode: "shear", base: 6, height: 4 }, [
    S("Sliding the top vertex along a parallel line keeps the height.", "শীর্ষবিন্দু সমান্তরাল রেখা ধরে সরালেও উচ্চতা একই থাকে।", { height: 4 }),
    S("The area stays ½ × 6 × 4 = 12.", "ক্ষেত্রফল ১/২ × ৬ × ৪ = ১২-ই থাকে।", { area: 12 }),
  ]),
  V("convert-polygon-to-triangle", "c9_10.15", "Convert a polygon to a triangle", "বহুভুজকে ত্রিভুজে রূপান্তর", "compass-construct", "compassConstruct", { mode: "area-preserving", from: "polygon", to: "triangle" }, [
    S("Draw parallels to move vertices without changing area.", "ক্ষেত্রফল না বদলে শীর্ষ সরাতে সমান্তরাল রেখা আঁকি।", { parallel: true }),
    S("The final triangle has the same area as the original polygon.", "শেষ ত্রিভুজের ক্ষেত্রফল মূল বহুভুজের সমান।", { equalArea: true }),
  ]),
  V("area-theorem-proofs", "c9_10.15", "Area theorem proofs", "ক্ষেত্রফল উপপাদ্যের প্রমাণ", "algebra-stepper", "algebraStepper", { mode: "proof", theorem: "same base, same parallels" }, [
    S("Write the statement and the reason for each step.", "প্রতিটি ধাপে বিবৃতি ও কারণ লেখো।", { columns: 2 }),
    S("The proof shows why equal base and height give equal area.", "প্রমাণ দেখায় কেন সমান ভূমি ও উচ্চতায় ক্ষেত্রফল সমান।", { proved: true }),
  ]),
  V("prism-volume-layers", "c9_10.16", "Prism volume by layers", "স্তরে স্তরে প্রিজমের আয়তন", "solid-3d", "solid3d", { mode: "prism", baseArea: 12, height: 5 }, [
    S("A prism is a stack of identical base layers.", "প্রিজম একই ভূমির স্তরের স্তূপ।", { layers: 5 }),
    S("V = base area × height = 12 × 5 = 60.", "V = ভূমির ক্ষেত্রফল × উচ্চতা = ১২ × ৫ = ৬০।", { volume: 60 }),
  ]),
  V("cylinder-cone-sphere", "c9_10.16", "Cylinder, cone and sphere", "সিলিন্ডার, শঙ্কু ও গোলক", "solid-3d", "solid3d", { mode: "solids", radius: 3, height: 4 }, [
    S("Cylinder volume = πr²h.", "সিলিন্ডারের আয়তন = πr²h।", { formula: "V = \\pi r^2 h" }),
    S("Cone = ⅓πr²h and sphere = 4/3 πr³.", "শঙ্কু = ১/৩πr²h আর গোলক = ৪/৩ πr³।", { cone: true, sphere: true }),
  ]),
  V("cone-cylinder-relation", "c9_10.16", "Cone and cylinder relation", "শঙ্কু ও সিলিন্ডারের সম্পর্ক", "solid-3d", "solid3d", { mode: "cone-cylinder", radius: 3, height: 6 }, [
    S("Three cones of water fill one cylinder of equal base and height.", "সমান ভূমি ও উচ্চতার একটি সিলিন্ডার ভরাতে তিনটি শঙ্কুর পানি লাগে।", { cones: 3 }),
    S("V(cone) = ⅓ V(cylinder).", "V(শঙ্কু) = ১/৩ V(সিলিন্ডার)।", { ratio: "1/3" }),
  ]),
  V("sphere-from-cylinder", "c9_10.16", "Sphere from a cylinder", "সিলিন্ডার থেকে গোলক", "solid-3d", "solid3d", { mode: "sphere-cylinder", radius: 3 }, [
    S("Archimedes showed a sphere fits inside a cylinder of the same radius and diameter.", "আর্কিমিডিস দেখান একই ব্যাসার্ধ ও ব্যাসের সিলিন্ডারের ভিতরে গোলক বসে।", { radius: 3 }),
    S("Sphere volume = 2/3 of that cylinder.", "গোলকের আয়তন সেই সিলিন্ডারের ২/৩।", { ratio: "2/3" }),
  ]),
  V("net-to-solid", "c9_10.16", "Net to solid", "জাল থেকে ঘনবস্তু", "solid-3d", "solid3d", { mode: "net", solid: "cube", faces: 6 }, [
    S("Unfold the solid into a flat net.", "ঘনবস্তুকে সমতল জালে খুলি।", { net: true }),
    S("A cube net has 6 squares.", "ঘনকের জালে ৬টি বর্গ থাকে।", { faces: 6 }),
  ]),
  V("composite-solids", "c9_10.16", "Composite solids", "যৌগিক ঘনবস্তু", "solid-3d", "solid3d", { mode: "composite", parts: ["hemisphere", "cylinder"], radius: 3, cylinderHeight: 5 }, [
    S("Split a composite solid into simple parts.", "যৌগিক ঘনবস্তুকে সরল অংশে ভাগ করি।", { parts: 2 }),
    S("Add the volumes of the hemisphere and cylinder.", "অর্ধগোলক ও সিলিন্ডারের আয়তন যোগ করি।", { add: true }),
  ]),
  V("frustum-slices", "c9_10.16", "Frustum slices", "ছিন্ন শঙ্কুর স্তর", "solid-3d", "solid3d", { mode: "frustum", topRadius: 2, bottomRadius: 4, height: 3 }, [
    S("Cutting the top off a cone leaves a frustum.", "শঙ্কুর উপরের অংশ কাটলে ছিন্ন শঙ্কু থাকে।", { frustum: true }),
    S("V = ⅓πh(R² + Rr + r²).", "V = ১/৩πh(R² + Rr + r²)।", { formula: "V = \\frac{1}{3}\\pi h(R^2+Rr+r^2)" }),
  ]),
  V("unit-conversion-volume", "c9_10.16", "Volume unit conversion", "আয়তনের একক রূপান্তর", "number-line", "numberLine", { mode: "volume-conversion", litres: 5 }, [
    S("1 litre = 1000 cm³.", "১ লিটার = ১০০০ সেমি³।", { factor: 1000 }),
    S("5 litres = 5000 cm³.", "৫ লিটার = ৫০০০ সেমি³।", { volume: 5000 }),
  ]),
  V("real-world-tanks", "c9_10.16", "Real-world tanks", "বাস্তব ট্যাংক", "story-scene", "storyScene", { mode: "tank", radius: 2, height: 10, litres: 125.6 }, [
    S("A cylindrical tank holds πr²h cubic units.", "নলাকার ট্যাংকে πr²h ঘন একক ধরে।", { formula: "\\pi r^2 h" }),
    S("With r = 2, h = 10: V = 40π ≈ 125.6 m³.", "r = ২, h = ১০ হলে: V = ৪০π ≈ ১২৫.৬ মি³।", { volume: 125.6 }),
  ]),
  V("plane-figures-area", "c9_10.16", "Areas of plane figures", "সমতল আকৃতির ক্ষেত্রফল", "geometry-board", "geometryBoard", { mode: "plane-areas", shapes: ["triangle", "trapezium", "circle", "sector"] }, [
    S("Use the correct formula for each plane figure.", "প্রতিটি সমতল আকৃতির জন্য সঠিক সূত্র ব্যবহার করি।", { shapes: 4 }),
    S("Triangle ½bh, trapezium ½(a+b)h, circle πr², sector (θ/360)πr².", "ত্রিভুজ ১/২bh, ট্রাপিজিয়াম ১/২(a+b)h, বৃত্ত πr², বৃত্তকলা (θ/৩৬০)πr²।", { formulas: 4 }),
  ]),
  V("frequency-histogram-polygon", "c9_10.17", "Histogram and frequency polygon", "হিস্টোগ্রাম ও কম্পাঙ্ক বহুভুজ", "chart", "chart", { mode: "histogram", intervals: [0, 10, 20, 30, 40], frequencies: [4, 8, 12, 9, 6] }, [
    S("Bars touch in a histogram because the classes are continuous.", "হিস্টোগ্রামে বারগুলো স্পর্শ করে, কারণ শ্রেণিগুলো ধারাবাহিক।", { continuous: true }),
    S("Joining the midpoints of the bars gives the frequency polygon.", "বারগুলোর মধ্যবিন্দু যোগ করলে কম্পাঙ্ক বহুভুজ পাওয়া যায়।", { polygon: true }),
  ]),
  V("cumulative-frequency-ogive", "c9_10.17", "Cumulative frequency ogive", "ক্রমযোজিত কম্পাঙ্ক অজিভ", "chart", "chart", { mode: "ogive", frequencies: [4, 8, 12, 9, 6], total: 39 }, [
    S("Add frequencies cumulatively to plot an ogive.", "কম্পাঙ্ক ক্রমান্বয়ে যোগ করে অজিভ আঁকি।", { cumulative: [4, 12, 24, 33, 39] }),
    S("The median is where the cumulative frequency reaches n/2 = 19.5.", "মধ্যক সেখানে যেখানে ক্রমযোজিত কম্পাঙ্ক n/২ = ১৯.৫ হয়।", { medianAt: 19.5 }),
  ]),
  V("mean-methods", "c9_10.17", "Mean methods", "গড় নির্ণয়ের পদ্ধতি", "algebra-stepper", "algebraStepper", { mode: "mean-methods", values: [10, 20, 30, 40], frequencies: [2, 3, 4, 1] }, [
    S("Direct method: mean = Σfx / Σf.", "সরাসরি পদ্ধতি: গড় = Σfx / Σf।", { formula: "\\bar{x} = \\frac{\\sum fx}{\\sum f}" }),
    S("Σfx = 20 + 60 + 120 + 40 = 240 and Σf = 10, so mean = 24.", "Σfx = ২০ + ৬০ + ১২০ + ৪০ = ২৪০ আর Σf = ১০, তাই গড় = ২৪।", { mean: 24 }),
  ]),
  V("median-mode-grouped", "c9_10.17", "Median and mode of grouped data", "শ্রেণিবদ্ধ উপাত্তের মধ্যক ও সংখ্যাগুরু", "chart", "chart", { mode: "median-mode", classWidth: 10, medianClass: "20-30", median: 25 }, [
    S("The median class is the one containing n/2.", "মধ্যক শ্রেণি হলো যেটিতে n/২ পড়ে।", { medianClass: "20-30" }),
    S("The grouped median formula uses l + ((n/2 − cf)/f) × h.", "শ্রেণিবদ্ধ মধ্যক সূত্র: l + ((n/২ − cf)/f) × h।", { formula: "l + \\frac{n/2-cf}{f}\\times h" }),
  ]),
  V("quartiles-box-plot", "c9_10.17", "Quartiles and box plot", "চতুর্থক ও বক্স প্লট", "chart", "chart", { mode: "quartiles", values: [3, 5, 7, 8, 10, 12, 15] }, [
    S("Q1, median and Q3 split the data into four parts.", "Q১, মধ্যক ও Q৩ উপাত্তকে চার ভাগে ভাগ করে।", { quartiles: 3 }),
    S("A box plot marks the quartiles and the extremes.", "বক্স প্লট কোয়ার্টাইল ও প্রান্তিক মান চিহ্নিত করে।", { boxPlot: true }),
  ]),
  V("dispersion-intro", "c9_10.17", "Introduction to dispersion", "বিচ্ছুরণের ভূমিকা", "chart", "chart", { mode: "dispersion", values: [5, 7, 9, 11, 13] }, [
    S("Range = largest − smallest = 13 − 5 = 8.", "পরিসর = সর্বোচ্চ − সর্বনিম্ন = ১৩ − ৫ = ৮।", { range: 8 }),
    S("Mean deviation averages the distances from the mean.", "গড় বিচ্যুতি গড় থেকে দূরত্বের গড়।", { meanDeviation: true }),
  ]),
  V("outlier-sensitivity", "c9_10.17", "Outlier sensitivity", "চরম মানের প্রভাব", "chart", "chart", { mode: "outlier", normal: [10, 11, 12, 13], outlier: 100 }, [
    S("The mean is pulled strongly by an outlier.", "গড় চরম মান দ্বারা জোরালোভাবে টান খায়।", { meanSensitive: true }),
    S("The median resists extreme values.", "মধ্যক চরম মান প্রতিরোধ করে।", { medianRobust: true }),
  ]),
  V("survey-to-report", "c9_10.17", "From survey to report", "জরিপ থেকে প্রতিবেদন", "story-scene", "storyScene", { mode: "survey-report", step: "survey → table → graph → conclusion" }, [
    S("Collect data, then organise it into a frequency table.", "উপাত্ত সংগ্রহ করে কম্পাঙ্ক সারণিতে সাজাই।", { table: true }),
    S("Draw a graph and state the conclusion in words.", "গ্রাফ এঁকে সিদ্ধান্ত কথায় প্রকাশ করি।", { report: true }),
  ]),
];

const makeClass910Categories = (prefix: "c9" | "c10"): PlayCategoryDef[] => [
  T(1, `${prefix}-01-real-numbers`, "Real Numbers", "বাস্তব সংখ্যা", "🔢", [
    "real-line-910",
    "number-system-tree",
    "rational-as-decimal",
    "recurring-to-fraction",
    "irrational-root-two",
    "spiral-of-roots",
    "density-of-rationals",
    "surd-operations",
    "number-line-order",
  ]),
  T(2, `${prefix}-02-sets-functions`, "Sets and Functions", "সেট ও ফাংশন", "🔵", [
    "venn-mapping-910",
    "venn-3-sets",
    "set-operations-lab",
    "de-morgan-visual",
    "power-set-tree",
    "cartesian-product-grid",
    "relation-mapping",
    "function-machine",
    "function-or-not",
    "function-graph-lab",
    "inverse-function-mirror",
  ]),
  T(3, `${prefix}-03-algebraic-expressions`, "Algebraic Expressions", "বীজগাণিতিক রাশি", "🧮", [
    "identities-910",
    "identity-area-models",
    "cube-identity-solid",
    "expand-stepper",
    "factorisation-lab",
    "algebra-tiles-factor",
    "remainder-theorem",
    "factor-theorem",
    "identity-test",
    "common-errors",
  ], ["∴ a³ + b³ = (a+b)(a²−ab+b²) (sum of cubes) → Class 9–10, Ch. 3.", "∴ a³ + b³ = (a+b)(a²−ab+b²) (ঘনফলের সমষ্টি) → নবম–দশম শ্রেণি, অধ্যায় ৩।"]),
  T(4, `${prefix}-04-exponents-logarithms`, "Exponents and Logarithms", "সূচক ও লগারিদম", "📈", [
    "exp-log-910",
    "exponent-laws-blocks",
    "zero-and-negative-exponents",
    "fractional-exponents",
    "exponential-growth-lab",
    "doubling-story",
    "log-as-inverse",
    "log-laws-stepper",
    "log-scale-number-line",
    "change-of-base",
    "log-misconception",
  ], ["∴ log_a (mn) = log_a m + log_a n (log product law) → Class 9–10, Ch. 4.", "∴ log_a (mn) = log_a m + log_a n (লগ গুণের নিয়ম) → নবম–দশম শ্রেণি, অধ্যায় ৪।"]),
  T(5, `${prefix}-05-equations-one-variable`, "Equations in One Variable", "এক চলকবিশিষ্ট সমীকরণ", "⚖️", [
    "equation-graph-910",
    "balance-and-solve",
    "linear-equation-stepper",
    "fractional-equation",
    "quadratic-by-factoring",
    "quadratic-formula-walk",
    "completing-the-square-area",
    "discriminant-lab",
    "word-problems-linear",
    "extraneous-root",
  ]),
  T(6, `${prefix}-06-lines-angles-triangles`, "Lines, Angles and Triangles", "রেখা, কোণ ও ত্রিভুজ", "📐", [
    "triangle-angles-910",
    "angle-pairs",
    "transversal-angles",
    "triangle-angle-sum-proof",
    "exterior-angle-theorem",
    "congruence-sss-sas-asa-rhs",
    "ambiguous-ssa",
    "isosceles-theorems",
    "triangle-inequality",
    "medians-altitudes-centres",
    "proof-builder",
  ]),
  T(7, `${prefix}-07-practical-geometry`, "Practical Geometry", "ব্যবহারিক জ্যামিতি", "🧭", [
    "construction-910",
    "construct-triangles-all-cases",
    "construct-quadrilaterals",
    "construct-parallelogram",
    "area-equivalence-construction",
    "construct-tangents",
    "why-it-works",
  ]),
  T(8, `${prefix}-08-circle`, "Circle", "বৃত্ত", "⭕", [
    "circle-theorem-910",
    "chord-and-centre",
    "equal-chords-equal-distance",
    "angle-at-centre-vs-circumference",
    "angles-in-same-segment",
    "cyclic-quadrilateral",
    "tangent-properties",
    "alternate-segment-theorem",
    "arc-sector-segment",
    "circle-theorem-quiz",
  ]),
  T(9, `${prefix}-09-trigonometric-ratio`, "Trigonometric Ratio", "ত্রিকোণমিতিক অনুপাত", "📐", [
    "unit-circle-910",
    "right-triangle-ratios",
    "similar-triangles-same-ratio",
    "unit-circle-build",
    "special-angles-table",
    "identity-sin2-cos2",
    "complementary-angles",
    "graph-of-trig",
    "solve-triangle",
    "calculator-mode-trap",
  ], ["∴ sin²θ + cos²θ = 1 (Pythagorean identity) → Class 9–10, Ch. 9.", "∴ sin²θ + cos²θ = ১ (পিথাগোরীয় অভেদ) → নবম–দশম শ্রেণি, অধ্যায় ৯।"]),
  T(10, `${prefix}-10-distance-elevation`, "Distance and Elevation", "দূরত্ব ও উন্নতি", "🗼", [
    "elevation-910",
    "angle-of-elevation-scene",
    "angle-of-depression",
    "two-position-problem",
    "clinometer-lab",
    "diagram-first",
    "elevation-depression-errors",
  ]),
  T(11, `${prefix}-11-algebraic-ratio-proportion`, "Algebraic Ratio and Proportion", "বীজগাণিতিক অনুপাত ও সমানুপাত", "➗", [
    "ratio-910",
    "ratio-bars",
    "proportion-cross-multiply",
    "componendo-dividendo",
    "direct-inverse-variation",
    "mean-proportional",
    "recipe-scaling",
  ]),
  T(12, `${prefix}-12-simultaneous-equations`, "Simple Simultaneous Equations in Two Variables", "দুই চলকবিশিষ্ট সরল সহসমীকরণ", "🧮", [
    "line-intersection-910",
    "intersecting-lines",
    "substitution-method",
    "elimination-method",
    "cross-multiplication",
    "consistency-types",
    "word-problem-systems",
    "non-linear-pair-intro",
  ]),
  T(13, `${prefix}-13-finite-series`, "Finite Series", "সসীম ধারা", "➕", [
    "series-sum-910",
    "arithmetic-sequence-stairs",
    "gauss-pairing-sum",
    "arithmetic-series-formula",
    "geometric-sequence-growth",
    "geometric-series-sum",
    "sum-of-squares-blocks",
    "real-life-series",
    "find-the-nth-term",
  ], ["∴ S_n = n(n+1)/2 (sum of first n natural numbers) → Class 9–10, Ch. 13.", "∴ S_n = n(n+1)/2 (প্রথম n স্বাভাবিক সংখ্যার যোগফল) → নবম–দশম শ্রেণি, অধ্যায় ১৩।"]),
  T(14, `${prefix}-14-ratio-similarity-symmetry`, "Ratio, Similarity and Symmetry", "অনুপাত, সদৃশতা ও প্রতিসমতা", "🔺", [
    "similarity-910",
    "similar-shapes-scale",
    "similar-triangles-aa",
    "area-ratio-scale-squared",
    "basic-proportionality-theorem",
    "shadow-and-height",
    "line-symmetry",
    "rotational-symmetry",
    "reflection-rotation-translation",
  ]),
  T(15, `${prefix}-15-area-theorems`, "Area Related Theorems and Constructions", "ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও অঙ্কন", "📏", [
    "area-theorem-910",
    "parallelogram-same-base",
    "triangle-same-base",
    "median-bisects-area",
    "shear-transformation",
    "convert-polygon-to-triangle",
    "area-theorem-proofs",
  ]),
  T(16, `${prefix}-16-mensuration`, "Mensuration", "পরিমিতি", "🧊", [
    "mensuration-910",
    "prism-volume-layers",
    "cylinder-cone-sphere",
    "cone-cylinder-relation",
    "sphere-from-cylinder",
    "net-to-solid",
    "composite-solids",
    "frustum-slices",
    "unit-conversion-volume",
    "real-world-tanks",
    "plane-figures-area",
  ]),
  T(17, `${prefix}-17-statistics`, "Statistics", "পরিসংখ্যান", "📊", [
    "histogram-910",
    "frequency-histogram-polygon",
    "cumulative-frequency-ogive",
    "mean-methods",
    "median-mode-grouped",
    "quartiles-box-plot",
    "dispersion-intro",
    "outlier-sensitivity",
    "survey-to-report",
  ]),
];

export const CLASS_9_CATEGORIES = makeClass910Categories("c9");
export const CLASS_10_CATEGORIES = makeClass910Categories("c10");
