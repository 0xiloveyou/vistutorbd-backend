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
  difficulty: 4,
  data,
  steps,
  aiContext: `${chapterCode}: ${en}`,
});

export const CLASS8_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("sequence-explorer", "c8.01", "Sequence explorer", "ধারার অন্বেষণ", "number-grid", "numberGrid", { sequence: [3, 7, 11, 15], difference: 4 }, [
    S("The terms 3, 7, 11, 15 grow by 4 each time.", "পদগুলো ৩, ৭, ১১, ১৫ প্রতিবার ৪ করে বাড়ে।", { difference: 4 }),
    S("Start at 3 and add 4: the rule is 4n − 1.", "৩ থেকে শুরু করে ৪ যোগ: নিয়ম ৪n − ১।", { nthTerm: "4n - 1" }),
  ]),
  V("nth-term-builder", "c8.01", "Build the nth term", "n-তম পদ তৈরি", "algebra-stepper", "algebraStepper", { first: 5, difference: 3, nth: "3n + 2" }, [
    S("The first term is 5 and the common difference is 3.", "প্রথম পদ ৫ এবং সাধারণ অন্তর ৩।", { first: 5, difference: 3 }),
    S("nth term = 3n + 2; check n = 4 gives 14.", "n-তম পদ = ৩n + ২; n = ৪ হলে ১৪।", { nth: "3n + 2" }),
  ]),
  V("figurate-numbers", "c8.01", "Figurate numbers", "আকৃতি সংখ্যা", "shape-canvas", "shapeCanvas", { mode: "figurate", triangular: [1, 3, 6, 10], square: [1, 4, 9, 16] }, [
    S("Triangular numbers add 2, 3, 4, ...: 1, 3, 6, 10.", "ত্রিভুজ সংখ্যায় ২, ৩, ৪, ... যোগ হয়: ১, ৩, ৬, ১০।", { triangular: [1, 3, 6, 10] }),
    S("Square numbers are 1, 4, 9, 16, ...", "বর্গ সংখ্যা: ১, ৪, ৯, ১৬, ...", { square: [1, 4, 9, 16] }),
  ]),
  V("arithmetic-vs-geometric", "c8.01", "Arithmetic vs geometric growth", "সমান্তর বনাম গুণোত্তর বৃদ্ধি", "chart", "chart", { arithmetic: [2, 5, 8, 11], geometric: [2, 6, 18, 54] }, [
    S("Arithmetic adds 3 each step: 2, 5, 8, 11.", "সমান্তর ধারায় প্রতি ধাপে ৩ যোগ: ২, ৫, ৮, ১১।", { difference: 3 }),
    S("Geometric multiplies by 3: 2, 6, 18, 54.", "গুণোত্তর ধারায় ৩ দিয়ে গুণ: ২, ৬, ১৮, ৫৪।", { ratio: 3 }),
  ]),
  V("fibonacci-spiral", "c8.01", "Fibonacci spiral", "ফিবোনাচি সর্পিল", "shape-canvas", "shapeCanvas", { mode: "fibonacci", terms: [1, 1, 2, 3, 5, 8, 13] }, [
    S("Each term is the sum of the two before it.", "প্রতিটি পদ আগের দুই পদের যোগফল।", { rule: "a_n = a_{n-1} + a_{n-2}" }),
    S("1, 1, 2, 3, 5, 8, 13, ...", "১, ১, ২, ৩, ৫, ৮, ১৩, ...", { terms: [1, 1, 2, 3, 5, 8, 13] }),
  ]),
  V("pattern-misconception", "c8.01", "A pattern that changes", "যে ধারা বদলে যায়", "shape-canvas", "shapeCanvas", { first: [1, 2, 4, 8, 16], next: 31, mode: "misconception" }, [
    S("The first five terms double, so 16 is tempting.", "প্রথম পাঁচ পদ দ্বিগুণ হয়, তাই ১৬ স্বাভাবিক মনে হয়।", { sequence: [1, 2, 4, 8, 16] }),
    S("The rule changes: the next term is 31, not 32.", "নিয়ম বদলায়: পরের পদ ৩২ নয়, ৩১।", { next: 31 }),
  ]),

  V("cost-price-selling-price", "c8.02", "Cost price and selling price", "ক্রয়মূল্য ও বিক্রয়মূল্য", "money-shop", "moneyShop", { cost: 250, selling: 300, mode: "profit" }, [
    S("Profit = 300 − 250 = 50 taka.", "লাভ = ৩০০ − ২৫০ = ৫০ টাকা।", { profit: 50 }),
    S("The selling price is above cost, so it is a profit.", "বিক্রয়মূল্য ক্রয়মূল্যের বেশি, তাই লাভ।", { type: "profit" }),
  ]),
  V("profit-percent", "c8.02", "Profit percent", "শতকরা লাভ", "tape-diagram", "tapeDiagram", { cost: 250, profit: 50, mode: "profit-percent" }, [
    S("Profit percent is taken on the cost price.", "শতকরা লাভ ক্রয়মূল্যের উপর হিসাব হয়।", { base: 250 }),
    S("50/250 × 100 = 20%.", "৫০/২৫০ × ১০০ = ২০%।", { percent: 20 }),
  ]),
  V("discount-and-markup", "c8.02", "Discount and markup", "ছাড় ও মূল্যবৃদ্ধি", "money-shop", "moneyShop", { marked: 500, discount: 10, mode: "discount-markup" }, [
    S("Discount = 10% of 500 = 50.", "ছাড় = ৫০০-এর ১০% = ৫০।", { discount: 50 }),
    S("Sale price = 500 − 50 = 450 taka.", "বিক্রয়মূল্য = ৫০০ − ৫০ = ৪৫০ টাকা।", { salePrice: 450 }),
  ]),
  V("profit-loss-misconception", "c8.02", "Percent on cost or on selling", "ক্রয় না বিক্রয়মূল্যের শতাংশ", "chart", "chart", { cost: 400, selling: 500, mode: "misconception" }, [
    S("Profit 100 on cost 400 is 25%.", "ক্রয়মূল্য ৪০০-এ লাভ ১০০ হলে ২৫%।", { onCost: 25 }),
    S("On selling price 500 it would be only 20%, not 25%.", "বিক্রয়মূল্য ৫০০-এর উপর হলে ২০%, ২৫% নয়।", { onSelling: 20 }),
  ]),
  V("simple-interest", "c8.02", "Simple interest", "সরল সুদ", "chart", "chart", { principal: 1000, rate: 5, time: 2, mode: "simple-interest" }, [
    S("I = P × r × t / 100.", "I = P × r × t / ১০০।", { formula: "I = \\frac{Prt}{100}" }),
    S("I = 1000 × 5 × 2 / 100 = 100 taka.", "I = ১০০০ × ৫ × ২ / ১০০ = ১০০ টাকা।", { interest: 100 }),
  ]),
  V("compound-interest-intro", "c8.02", "Introduction to compound interest", "চক্রবৃদ্ধি সুদের ভূমিকা", "chart", "chart", { principal: 1000, rate: 10, time: 2, mode: "compound-interest" }, [
    S("Year 1: 1000 × 1.10 = 1100.", "১ম বছর: ১০০০ × ১.১০ = ১১০০।", { year1: 1100 }),
    S("Year 2: 1100 × 1.10 = 1210, interest 210.", "২য় বছর: ১১০০ × ১.১০ = ১২১০, সুদ ২১০।", { amount: 1210, interest: 210 }),
  ]),
  V("shop-simulation", "c8.02", "Mini shop simulation", "ক্ষুদ্র দোকানের অনুকরণ", "story-scene", "storyScene", { story: "A shop buys 40 pens at 12 taka and sells at 15 taka.", cost: 480, revenue: 600, mode: "shop" }, [
    S("Cost = 40 × 12 = 480 taka.", "ক্রয়মূল্য = ৪০ × ১২ = ৪৮০ টাকা।", { cost: 480 }),
    S("Revenue = 40 × 15 = 600, so profit = 120 taka.", "আয় = ৪০ × ১৫ = ৬০০, তাই লাভ = ১২০ টাকা।", { profit: 120 }),
  ]),

  V("area-perimeter-polygons", "c8.03", "Area and perimeter of polygons", "বহুভুজের ক্ষেত্রফল ও পরিসীমা", "geometry-board", "geometryBoard", { shapes: ["rectangle", "triangle", "parallelogram"], mode: "area-perimeter" }, [
    S("Rectangle area = length × width.", "আয়তক্ষেত্রের ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ।", { formula: "A = l \\times w" }),
    S("Triangle area = ½ × base × height.", "ত্রিভুজের ক্ষেত্রফল = ½ × ভূমি × উচ্চতা।", { formula: "A = \\frac{1}{2}bh" }),
  ]),
  V("trapezium-area-derivation", "c8.03", "Derive the trapezium area", "ট্রাপিজিয়ামের ক্ষেত্রফল নির্ণয়", "geometry-board", "geometryBoard", { a: 8, b: 4, h: 5, mode: "trapezium" }, [
    S("Two copies make a parallelogram with base a + b.", "দুই কপি মিলে ভূমি a + b বিশিষ্ট সামান্তরিক হয়।", { base: "a + b" }),
    S("Area = ½ × (8 + 4) × 5 = 30 square units.", "ক্ষেত্রফল = ½ × (৮ + ৪) × ৫ = ৩০ বর্গ একক।", { area: 30 }),
  ]),
  V("circle-circumference-pi", "c8.03", "Circumference and pi", "পরিধি ও পাই", "geometry-board", "geometryBoard", { radius: 7, mode: "circumference" }, [
    S("Circumference = 2πr.", "পরিধি = ২πr।", { formula: "C = 2\\pi r" }),
    S("C = 2 × π × 7 ≈ 44 units.", "C = ২ × π × ৭ ≈ ৪৪ একক।", { circumference: 44 }),
  ]),
  V("circle-area-slices", "c8.03", "Circle area from slices", "টুকরো থেকে বৃত্তের ক্ষেত্রফল", "geometry-board", "geometryBoard", { radius: 7, mode: "circle-area" }, [
    S("Cut the circle into many thin slices.", "বৃত্তকে অনেক সরু টুকরোয় কাটি।", { slices: 16 }),
    S("They form a rectangle: area = πr² ≈ 154 square units.", "সেগুলো আয়তক্ষেত্র গঠন করে: ক্ষেত্রফল = πr² ≈ ১৫৪ বর্গ একক।", { area: 154 }),
  ]),
  V("volume-prism-cylinder", "c8.03", "Volume of prisms and cylinders", "প্রিজম ও সিলিন্ডারের আয়তন", "solid-3d", "solid3d", { radius: 3, height: 10, mode: "cylinder-volume" }, [
    S("Base area = πr² = π × 3² ≈ 28.3.", "ভূমির ক্ষেত্রফল = πr² = π × ৩² ≈ ২৮.৩।", { base: 28.3 }),
    S("Volume = base × height ≈ 28.3 × 10 = 283 cubic units.", "আয়তন = ভূমি × উচ্চতা ≈ ২৮.৩ × ১০ = ২৮৩ ঘন একক।", { volume: 283 }),
  ]),
  V("surface-area-nets", "c8.03", "Surface area from nets", "জাল থেকে পৃষ্ঠতলের ক্ষেত্রফল", "solid-3d", "solid3d", { shape: "cuboid", length: 5, width: 4, height: 3, mode: "surface-area" }, [
    S("A cuboid has 3 pairs of equal faces.", "আয়তঘনকের ৩ জোড়া সমান তল আছে।", { pairs: 3 }),
    S("Surface area = 2(5×4 + 4×3 + 5×3) = 94 square units.", "পৃষ্ঠতলের ক্ষেত্রফল = ২(৫×৪ + ৪×৩ + ৫×৩) = ৯৪ বর্গ একক।", { area: 94 }),
  ]),
  V("unit-conversion-area-volume", "c8.03", "Convert area and volume units", "ক্ষেত্রফল ও আয়তনের একক রূপান্তর", "number-line", "numberLine", { mode: "area-volume-conversion", factor: 100 }, [
    S("1 m = 100 cm, so 1 m² = 10,000 cm².", "১ মি = ১০০ সেমি, তাই ১ বর্গমি = ১০,০০০ বর্গসেমি।", { areaFactor: 10000 }),
    S("1 m³ = 1,000,000 cm³.", "১ ঘনমি = ১০,০০,০০০ ঘনসেমি।", { volumeFactor: 1000000 }),
  ]),

  V("square-of-sum-area", "c8.04", "Square of a sum as area", "সমষ্টির বর্গ ক্ষেত্রফলরূপে", "array-grid", "arrayGrid", { a: 4, b: 3, mode: "square-sum" }, [
    S("(a + b)² is a square of side a + b.", "(a + b)² হলো বাহু a + b বিশিষ্ট বর্গ।", { formula: "(a+b)^2 = a^2 + 2ab + b^2" }),
    S("With a = 4, b = 3: 16 + 24 + 9 = 49.", "a = ৪, b = ৩ হলে: ১৬ + ২৪ + ৯ = ৪৯।", { value: 49 }),
  ]),
  V("difference-of-squares", "c8.04", "Difference of squares", "বর্গের অন্তর", "geometry-board", "geometryBoard", { a: 7, b: 3, mode: "difference-squares" }, [
    S("a² − b² = (a − b)(a + b).", "a² − b² = (a − b)(a + b)।", { formula: "a^2 - b^2 = (a-b)(a+b)" }),
    S("7² − 3² = 49 − 9 = 40 = 4 × 10.", "৭² − ৩² = ৪৯ − ৯ = ৪০ = ৪ × ১০।", { value: 40 }),
  ]),
  V("cube-identities", "c8.04", "Cube identities with blocks", "ব্লকে ঘন সূত্র", "solid-3d", "solid3d", { a: 2, b: 1, mode: "cube-identity" }, [
    S("(a + b)³ = a³ + 3a²b + 3ab² + b³.", "(a + b)³ = a³ + ৩a²b + ৩ab² + b³।", { formula: "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3" }),
    S("2 + 1 = 3, and 3³ = 27.", "২ + ১ = ৩, আর ৩³ = ২৭।", { value: 27 }),
  ]),
  V("factorization-stepper", "c8.04", "Factorisation step by step", "ধাপে ধাপে উৎপাদক", "algebra-stepper", "algebraStepper", { expression: "2x^2 + 4x", mode: "factorise" }, [
    S("The common factor is 2x.", "সাধারণ উৎপাদক ২x।", { common: "2x" }),
    S("2x² + 4x = 2x(x + 2).", "২x² + ৪x = ২x(x + ২)।", { factored: "2x(x + 2)" }),
  ]),
  V("identity-checker", "c8.04", "Check an identity", "সূত্র যাচাই", "algebra-stepper", "algebraStepper", { identity: "(a+b)^2", a: 5, b: 2, mode: "identity-check" }, [
    S("Left side: (5 + 2)² = 49.", "বামপক্ষ: (৫ + ২)² = ৪৯।", { left: 49 }),
    S("Right side: 25 + 20 + 4 = 49. They match.", "ডানপক্ষ: ২৫ + ২০ + ৪ = ৪৯। দুটো মেলে।", { right: 49 }),
  ]),
  V("formula-in-numbers", "c8.04", "Use identities for mental math", "মানসিক গণিতে সূত্রের ব্যবহার", "algebra-stepper", "algebraStepper", { expression: "98^2", identity: "(100-2)^2", mode: "mental-math" }, [
    S("Write 98 as 100 − 2.", "৯৮-কে ১০০ − ২ লিখি।", { split: [100, -2] }),
    S("(100 − 2)² = 10000 − 400 + 4 = 9604.", "(১০০ − ২)² = ১০০০০ − ৪০০ + ৪ = ৯৬০৪।", { value: 9604 }),
  ]),
  V("identity-misconception", "c8.04", "The missing middle term", "বাদ পড়া মধ্য পদ", "algebra-stepper", "algebraStepper", { wrong: "(a+b)^2 = a^2 + b^2", correct: "a^2 + 2ab + b^2", mode: "misconception" }, [
    S("(a + b)² is not a² + b².", "(a + b)² কখনো a² + b² নয়।", { wrong: "a^2 + b^2" }),
    S("With a = 3, b = 4 it is 49, not 25.", "a = ৩, b = ৪ হলে ৪৯, ২৫ নয়।", { correct: 49 }),
  ]),

  V("simplify-algebraic-fraction", "c8.05", "Simplify an algebraic fraction", "বীজগাণিতিক ভগ্নাংশ সরল", "algebra-stepper", "algebraStepper", { expression: "(x^2 - 9)/(x + 3)", mode: "simplify" }, [
    S("Factor: x² − 9 = (x − 3)(x + 3).", "উৎপাদক: x² − ৯ = (x − ৩)(x + ৩)।", { factored: "(x-3)(x+3)" }),
    S("Cancel x + 3 to get x − 3, x ≠ −3.", "x + ৩ বাদ দিলে x − ৩, x ≠ −৩।", { simplified: "x - 3" }),
  ]),
  V("lcm-of-expressions", "c8.05", "LCM of expressions", "রাশির লসাগু", "algebra-stepper", "algebraStepper", { denominators: ["(x+1)", "(x+2)"], lcm: "(x+1)(x+2)", mode: "lcm-expressions" }, [
    S("The denominators share no common factor.", "হরগুলোতে সাধারণ উৎপাদক নেই।", { common: "none" }),
    S("The LCM is (x + 1)(x + 2).", "লসাগু (x + ১)(x + ২)।", { lcm: "(x+1)(x+2)" }),
  ]),
  V("add-subtract-algebraic-fractions", "c8.05", "Add algebraic fractions", "বীজগাণিতিক ভগ্নাংশ যোগ", "algebra-stepper", "algebraStepper", { a: "1/(x+1)", b: "1/(x+2)", mode: "add" }, [
    S("Use the common denominator (x + 1)(x + 2).", "সাধারণ হর (x + ১)(x + ২) নিই।", { lcd: "(x+1)(x+2)" }),
    S("Numerator: (x + 2) + (x + 1) = 2x + 3.", "লব: (x + ২) + (x + ১) = ২x + ৩।", { numerator: "2x + 3" }),
  ]),
  V("multiply-divide-algebraic-fractions", "c8.05", "Multiply algebraic fractions", "বীজগাণিতিক ভগ্নাংশ গুণ", "algebra-stepper", "algebraStepper", { a: "(x^2-1)/(x+2)", b: "(x+2)/(x-1)", mode: "multiply" }, [
    S("Factor: x² − 1 = (x − 1)(x + 1).", "উৎপাদক: x² − ১ = (x − ১)(x + ১)।", { factored: "(x-1)(x+1)" }),
    S("Cancel (x − 1) and (x + 2) to get x + 1.", "(x − ১) ও (x + ২) বাদ দিলে x + ১।", { simplified: "x + 1" }),
  ]),
  V("cancel-misconception", "c8.05", "Cancelling terms vs factors", "পদ বনাম উৎপাদক বাতিল", "algebra-stepper", "algebraStepper", { wrong: "(x+2)/2 = x", correct: "x/2 + 1", mode: "misconception" }, [
    S("You cannot cancel 2 with a term; 2 is not a factor of x + 2.", "x + ২-এর প্রতিটি পদে ২ উৎপাদক নয়, তাই বাতিল করা যায় না।", { wrong: "x" }),
    S("Split instead: (x + 2)/2 = x/2 + 1.", "আলাদা করি: (x + ২)/২ = x/২ + ১।", { correct: "x/2 + 1" }),
  ]),
  V("domain-hazard", "c8.05", "Where the denominator is zero", "যেখানে হর শূন্য", "function-graph", "functionGraph", { expression: "1/(x-2)", zeroAt: 2, mode: "domain" }, [
    S("The denominator x − 2 must not be zero.", "হর x − ২ শূন্য হতে পারবে না।", { exclude: 2 }),
    S("So x ≠ 2; the graph has a vertical asymptote there.", "তাই x ≠ ২; সেখানে গ্রাফের উল্লম্ব অ্যাসিম্পটোট।", { asymptote: 2 }),
  ]),

  V("two-lines-intersect", "c8.06", "Two lines intersect", "দুই রেখার ছেদ", "coordinate-plane", "coordinatePlane", { equations: ["x + y = 7", "x - y = 1"], solution: [4, 3], mode: "intersection" }, [
    S("Each equation is a straight line.", "প্রতিটি সমীকরণ একটি সরলরেখা।", { lines: 2 }),
    S("The lines meet at (4, 3), the solution.", "রেখাদ্বয় (৪, ৩)-এ মেলে, যা সমাধান।", { solution: [4, 3] }),
  ]),
  V("substitution-stepper", "c8.06", "Solve by substitution", "প্রতিস্থাপন পদ্ধতিতে সমাধান", "algebra-stepper", "algebraStepper", { equations: ["y = x + 2", "2x + y = 11"], mode: "substitution" }, [
    S("Substitute y = x + 2 into 2x + y = 11.", "y = x + ২ কে ২x + y = ১১-তে বসাই।", { substituted: "2x + x + 2 = 11" }),
    S("3x = 9, so x = 3 and y = 5.", "৩x = ৯, তাই x = ৩ এবং y = ৫।", { solution: [3, 5] }),
  ]),
  V("elimination-stepper", "c8.06", "Solve by elimination", "নির্মূল পদ্ধতিতে সমাধান", "algebra-stepper", "algebraStepper", { equations: ["2x + y = 12", "x - y = 3"], mode: "elimination" }, [
    S("Add the equations to remove y: 3x = 15.", "y বাদ দিতে সমীকরণ যোগ: ৩x = ১৫।", { added: "3x = 15" }),
    S("x = 5, then 5 − y = 3 gives y = 2.", "x = ৫, তখন ৫ − y = ৩ থেকে y = ২।", { solution: [5, 2] }),
  ]),
  V("no-solution-infinite", "c8.06", "No solution or infinite solutions", "সমাধান নেই বা অসংখ্য সমাধান", "coordinate-plane", "coordinatePlane", { sameSlope: 2, intercepts: [1, 4], mode: "no-infinite" }, [
    S("Lines like y = 2x + 1 and y = 2x + 4 are parallel.", "y = ২x + ১ ও y = ২x + ৪ রেখা সমান্তরাল।", { parallel: true }),
    S("Parallel lines never meet, so there is no solution.", "সমান্তরাল রেখা কখনো মেলে না, তাই সমাধান নেই।", { solution: "none" }),
  ]),
  V("word-problem-systems", "c8.06", "Systems in word problems", "শব্দ সমস্যায় সহসমীকরণ", "story-scene", "storyScene", { story: "3 pens and 2 pencils cost 80; 1 pen and 2 pencils cost 40.", equations: ["3p + 2q = 80", "p + 2q = 40"], mode: "word-system" }, [
    S("Subtract: 2p = 40, so a pen costs 20.", "বিয়োগ: ২p = ৪০, তাই একটি কলমের দাম ২০।", { pen: 20 }),
    S("Then 20 + 2q = 40, so a pencil costs 10.", "তাহলে ২০ + ২q = ৪০, তাই পেন্সিলের দাম ১০।", { pencil: 10 }),
  ]),
  V("method-choice-advisor", "c8.06", "Choose the easier method", "সহজ পদ্ধতি বেছে নাও", "algebra-stepper", "algebraStepper", { equations: ["x + y = 10", "x - y = 4"], mode: "method-choice" }, [
    S("Adding removes y quickly, so elimination is easier.", "যোগ করলে y বাদ পড়ে, তাই নির্মূল পদ্ধতি সহজ।", { method: "elimination" }),
    S("2x = 14 gives x = 7 and y = 3.", "২x = ১৪ থেকে x = ৭ এবং y = ৩।", { solution: [7, 3] }),
  ]),

  V("venn-builder", "c8.07", "Build a Venn diagram", "ভেন চিত্র তৈরি", "venn-set", "vennSet", { a: [1, 2, 3, 4], b: [3, 4, 5, 6], mode: "builder" }, [
    S("Place common elements 3 and 4 in the overlap.", "সাধারণ উপাদান ৩ ও ৪ ছেদ অংশে রাখি।", { common: [3, 4] }),
    S("Only in A: 1, 2. Only in B: 5, 6.", "শুধু A-তে: ১, ২। শুধু B-তে: ৫, ৬।", { onlyA: [1, 2], onlyB: [5, 6] }),
  ]),
  V("union-intersection-difference", "c8.07", "Union, intersection and difference", "সংযোগ, ছেদ ও অন্তর", "venn-set", "vennSet", { a: [1, 2, 3, 4], b: [3, 4, 5, 6], mode: "operations" }, [
    S("A ∪ B = {1, 2, 3, 4, 5, 6}.", "A ∪ B = {১, ২, ৩, ৪, ৫, ৬}।", { union: [1, 2, 3, 4, 5, 6] }),
    S("A ∩ B = {3, 4} and A − B = {1, 2}.", "A ∩ B = {৩, ৪} এবং A − B = {১, ২}।", { intersection: [3, 4] }),
  ]),
  V("complement-universal", "c8.07", "Complement and universal set", "পূরক ও সার্বিক সেট", "venn-set", "vennSet", { universal: [1, 2, 3, 4, 5, 6, 7, 8], a: [2, 4, 6, 8], mode: "complement" }, [
    S("The universal set has 8 elements.", "সার্বিক সেটে ৮টি উপাদান।", { universal: 8 }),
    S("A' = {1, 3, 5, 7}, the elements outside A.", "A' = {১, ৩, ৫, ৭}, A-এর বাইরের উপাদান।", { complement: [1, 3, 5, 7] }),
  ]),
  V("subset-power-set", "c8.07", "Subsets and the power set", "উপসেট ও পাওয়ার সেট", "venn-set", "vennSet", { set: ["a", "b", "c"], subsets: 8, mode: "power-set" }, [
    S("A set with 3 elements has 2³ subsets.", "৩ উপাদানের সেটে ২³ উপসেট হয়।", { formula: "2^3" }),
    S("2³ = 8 subsets, including the empty set.", "২³ = ৮টি উপসেট, ফাঁকা সেটসহ।", { subsets: 8 }),
  ]),
  V("set-notation-reader", "c8.07", "Read set notation", "সেট প্রতীক পড়া", "algebra-stepper", "algebraStepper", { symbols: ["∈", "∉", "⊂", "∪", "∩", "'"], mode: "notation" }, [
    S("∈ means 'is an element of'; ∉ means 'is not'.", "∈ মানে 'উপাদান'; ∉ মানে 'উপাদান নয়'।", { meaning: "element" }),
    S("⊂ is subset, ∪ union, ∩ intersection, ' complement.", "⊂ উপসেট, ∪ সংযোগ, ∩ ছেদ, ' পূরক।", { meaning: "operations" }),
  ]),
  V("survey-venn-problem", "c8.07", "A survey with a Venn diagram", "ভেন চিত্রে জরিপ সমস্যা", "venn-set", "vennSet", { total: 30, tea: 18, coffee: 12, both: 5, mode: "survey" }, [
    S("Tea only = 18 − 5 = 13 and coffee only = 12 − 5 = 7.", "শুধু চা = ১৮ − ৫ = ১৩, শুধু কফি = ১২ − ৫ = ৭।", { teaOnly: 13, coffeeOnly: 7 }),
    S("Neither = 30 − (13 + 5 + 7) = 5.", "কোনোটিই নয় = ৩০ − (১৩ + ৫ + ৭) = ৫।", { neither: 5 }),
  ]),

  V("quadrilateral-explorer", "c8.08", "Explore quadrilaterals", "চতুর্ভুজ অন্বেষণ", "geometry-board", "geometryBoard", { shape: "quadrilateral", mode: "explorer" }, [
    S("A quadrilateral has 4 sides and 4 vertices.", "চতুর্ভুজের ৪টি বাহু ও ৪টি শীর্ষবিন্দু।", { sides: 4 }),
    S("Moving one vertex changes the type: square, rhombus, kite.", "একটি শীর্ষ সরালে ধরন বদলায়: বর্গ, রম্বস, ঘুড়ি।", { families: 3 }),
  ]),
  V("angle-sum-quad", "c8.08", "Angle sum of a quadrilateral", "চতুর্ভুজের কোণসমষ্টি", "geometry-board", "geometryBoard", { angles: [80, 100, 90, 90], mode: "angle-sum-quad" }, [
    S("A diagonal splits the quadrilateral into 2 triangles.", "কর্ণ চতুর্ভুজকে ২টি ত্রিভুজে ভাগ করে।", { triangles: 2 }),
    S("2 × 180° = 360°, so the angles sum to 360°.", "২ × ১৮০° = ৩৬০°, তাই কোণগুলোর সমষ্টি ৩৬০°।", { sum: 360 }),
  ]),
  V("parallelogram-properties", "c8.08", "Parallelogram properties", "সামান্তরিকের ধর্ম", "geometry-board", "geometryBoard", { shape: "parallelogram", mode: "diagonals" }, [
    S("Opposite sides are equal and parallel.", "বিপরীত বাহু সমান ও সমান্তরাল।", { opposite: true }),
    S("The diagonals bisect each other.", "কর্ণদ্বয় পরস্পরকে সমদ্বিখণ্ডিত করে।", { diagonals: true }),
  ]),
  V("rectangle-rhombus-square", "c8.08", "Rectangle, rhombus and square", "আয়ত, রম্বস ও বর্গ", "geometry-board", "geometryBoard", { shapes: ["rectangle", "rhombus", "square"], mode: "compare" }, [
    S("A rectangle has four right angles.", "আয়তক্ষেত্রের চারটি কোণ সমকোণ।", { rightAngles: 4 }),
    S("A square is both a rectangle and a rhombus.", "বর্গ একইসাথে আয়তক্ষেত্র ও রম্বস।", { both: true }),
  ]),
  V("trapezium-kite", "c8.08", "Trapezium and kite", "ট্রাপিজিয়াম ও ঘুড়ি", "geometry-board", "geometryBoard", { shapes: ["trapezium", "kite"], mode: "compare" }, [
    S("A trapezium has one pair of parallel sides.", "ট্রাপিজিয়ামের এক জোড়া সমান্তরাল বাহু।", { parallelPairs: 1 }),
    S("A kite has two pairs of equal adjacent sides.", "ঘুড়ির দুই জোড়া সমান সন্নিহিত বাহু।", { adjacentPairs: 2 }),
  ]),
  V("proof-with-congruence", "c8.08", "Prove with congruence", "সর্বসমতা দিয়ে প্রমাণ", "geometry-board", "geometryBoard", { shape: "parallelogram", mode: "proof" }, [
    S("Draw diagonal AC; triangles ABC and CDA share AC.", "কর্ণ AC আঁকি; ত্রিভুজ ABC ও CDA একই AC ভাগ করে।", { shared: "AC" }),
    S("Alternate angles are equal, so the triangles are congruent.", "একান্তর কোণ সমান, তাই ত্রিভুজ দুটি সর্বসম।", { congruence: "ASA" }),
  ]),
  V("mid-point-theorem-intro", "c8.08", "Mid-point theorem intro", "মধ্যবিন্দু উপপাদ্যের ভূমিকা", "geometry-board", "geometryBoard", { triangle: true, mode: "midpoint" }, [
    S("Join the midpoints of two sides of a triangle.", "ত্রিভুজের দুই বাহুর মধ্যবিন্দু যোগ করি।", { midpoints: 2 }),
    S("That segment is parallel to the third side and half its length.", "সেই রেখাংশ তৃতীয় বাহুর সমান্তরাল ও তার অর্ধেক।", { ratio: "1:2" }),
  ]),

  V("squares-on-sides", "c8.09", "Squares on the sides", "বাহুগুলোর উপর বর্গ", "geometry-board", "geometryBoard", { a: 3, b: 4, c: 5, mode: "squares" }, [
    S("Draw squares on the two legs: areas 9 and 16.", "দুই বাহুতে বর্গ আঁকি: ক্ষেত্রফল ৯ ও ১৬।", { areas: [9, 16] }),
    S("They add to 25, the square on the hypotenuse.", "যোগফল ২৫, যা অতিভুজের বর্গ।", { hypotenuseSquare: 25 }),
  ]),
  V("proof-by-rearrangement", "c8.09", "Proof by rearrangement", "পুনর্বিন্যাসে প্রমাণ", "geometry-board", "geometryBoard", { a: 3, b: 4, c: 5, mode: "dissection" }, [
    S("Rearrange four right triangles inside a big square.", "বড় বর্গের ভিতরে চারটি সমকোণী ত্রিভুজ সাজাই।", { triangles: 4 }),
    S("The uncovered square has area c² = a² + b².", "অনাবৃত বর্গের ক্ষেত্রফল c² = a² + b²।", { formula: "c^2 = a^2 + b^2" }),
  ]),
  V("find-the-side", "c8.09", "Find the missing side", "অজানা বাহু নির্ণয়", "algebra-stepper", "algebraStepper", { a: 6, b: 8, mode: "hypotenuse" }, [
    S("c² = 6² + 8² = 36 + 64 = 100.", "c² = ৬² + ৮² = ৩৬ + ৬৪ = ১০০।", { square: 100 }),
    S("So c = √100 = 10.", "তাই c = √১০০ = ১০।", { c: 10 }),
  ]),
  V("pythagorean-triples", "c8.09", "Pythagorean triples", "পিথাগোরীয় ত্রয়ী", "number-grid", "numberGrid", { triples: [[3, 4, 5], [5, 12, 13], [8, 15, 17]], mode: "triples" }, [
    S("3-4-5 is the smallest whole-number triple.", "৩-৪-৫ ক্ষুদ্রতম পূর্ণসংখ্যার ত্রয়ী।", { triple: [3, 4, 5] }),
    S("Each multiple works too: 6-8-10, 9-12-15.", "প্রতিটি গুণিতকও কাজ করে: ৬-৮-১০, ৯-১২-১৫।", { multiples: true }),
  ]),
  V("real-life-ladder", "c8.09", "The ladder problem", "মইয়ের সমস্যা", "story-scene", "storyScene", { wall: 12, base: 5, ladder: 13, mode: "ladder" }, [
    S("The ladder, wall and ground form a right triangle.", "মই, দেয়াল ও মাটি সমকোণী ত্রিভুজ গঠন করে।", { triangle: "right" }),
    S("12² + 5² = 144 + 25 = 169, so the ladder is 13 m.", "১২² + ৫² = ১৪৪ + ২৫ = ১৬৯, তাই মই ১৩ মি।", { ladder: 13 }),
  ]),
  V("converse-test", "c8.09", "Converse of Pythagoras", "পিথাগোরাসের বিপরীত", "geometry-board", "geometryBoard", { sides: [7, 24, 25], mode: "converse" }, [
    S("Check the largest side: 25² = 625.", "বড় বাহু যাচাই: ২৫² = ৬২৫।", { largestSquare: 625 }),
    S("7² + 24² = 49 + 576 = 625, so it is right-angled.", "৭² + ২৪² = ৪৯ + ৫৭৬ = ৬২৫, তাই সমকোণী।", { right: true }),
  ]),

  V("chord-arc-explorer", "c8.10", "Chords and arcs", "জ্যা ও চাপ", "geometry-board", "geometryBoard", { radius: 7, chord: 10, mode: "chord-arc" }, [
    S("A chord joins two points on the circle.", "জ্যা বৃত্তের দুই বিন্দুকে যোগ করে।", { chord: true }),
    S("The chord cuts off a minor arc and a major arc.", "জ্যা একটি ক্ষুদ্র চাপ ও একটি বৃহৎ চাপ তৈরি করে।", { arcs: 2 }),
  ]),
  V("perpendicular-from-centre", "c8.10", "Perpendicular from the centre", "কেন্দ্র থেকে লম্ব", "geometry-board", "geometryBoard", { radius: 5, chord: 8, halfChord: 4, mode: "perpendicular" }, [
    S("A perpendicular from the centre bisects the chord.", "কেন্দ্র থেকে লম্ব জ্যা-কে সমদ্বিখণ্ডিত করে।", { half: 4 }),
    S("Distance from centre = √(5² − 4²) = 3.", "কেন্দ্র থেকে দূরত্ব = √(৫² − ৪²) = ৩।", { distance: 3 }),
  ]),
  V("angle-in-semicircle", "c8.10", "Angle in a semicircle", "অর্ধবৃত্তস্থ কোণ", "geometry-board", "geometryBoard", { diameter: true, angle: 90, mode: "semicircle" }, [
    S("An angle in a semicircle stands on a diameter.", "অর্ধবৃত্তস্থ কোণ ব্যাসের উপর দাঁড়ায়।", { diameter: true }),
    S("That angle is always 90°.", "সেই কোণ সর্বদা ৯০°।", { angle: 90 }),
  ]),
  V("central-vs-inscribed", "c8.10", "Central vs inscribed angle", "কেন্দ্রস্থ বনাম পরিধিস্থ কোণ", "geometry-board", "geometryBoard", { central: 120, inscribed: 60, mode: "central-inscribed" }, [
    S("Both angles stand on the same arc.", "দুটি কোণ একই চাপের উপর দাঁড়ায়।", { sameArc: true }),
    S("The central angle is double the inscribed: 120° = 2 × 60°.", "কেন্দ্রস্থ কোণ পরিধিস্থ কোণের দ্বিগুণ: ১২০° = ২ × ৬০°।", { central: 120 }),
  ]),
  V("tangent-radius", "c8.10", "Tangent and radius", "স্পর্শক ও ব্যাসার্ধ", "geometry-board", "geometryBoard", { radius: 5, tangent: true, mode: "tangent-radius" }, [
    S("A tangent touches the circle at exactly one point.", "স্পর্শক বৃত্তকে ঠিক এক বিন্দুতে স্পর্শ করে।", { touchPoints: 1 }),
    S("The tangent is perpendicular to the radius there.", "স্পর্শবিন্দুতে স্পর্শক ব্যাসার্ধের উপর লম্ব।", { angle: 90 }),
  ]),
  V("equal-chords", "c8.10", "Equal chords", "সমান জ্যা", "geometry-board", "geometryBoard", { radius: 5, chord: 6, mode: "equal-chords" }, [
    S("Equal chords are equally far from the centre.", "সমান জ্যা কেন্দ্র থেকে সমান দূরে।", { equalDistance: true }),
    S("Distance = √(5² − 3²) = 4 units.", "দূরত্ব = √(৫² − ৩²) = ৪ একক।", { distance: 4 }),
  ]),

  V("grouped-frequency-table", "c8.11", "Grouped frequency table", "শ্রেণিবদ্ধ গণসংখ্যা সারণি", "chart", "chart", { classes: ["0-10", "10-20", "20-30"], frequencies: [4, 7, 9], mode: "grouped-table" }, [
    S("Group data into class intervals.", "উপাত্তগুলো শ্রেণি ব্যবধানে সাজাই।", { classes: 3 }),
    S("Count the frequency in each class.", "প্রতি শ্রেণিতে গণসংখ্যা গুনি।", { frequencies: [4, 7, 9] }),
  ]),
  V("histogram-builder", "c8.11", "Build a histogram", "হিস্টোগ্রাম তৈরি", "chart", "chart", { classes: ["0-10", "10-20", "20-30"], frequencies: [4, 7, 9], mode: "histogram" }, [
    S("Each bar covers one class interval.", "প্রতিটি বার একটি শ্রেণি ব্যবধান ঢাকে।", { bars: 3 }),
    S("Bar height shows the frequency.", "বারের উচ্চতা গণসংখ্যা দেখায়।", { heights: [4, 7, 9] }),
  ]),
  V("pie-chart-angles", "c8.11", "Pie chart angles", "পাই চার্টের কোণ", "chart", "chart", { parts: [30, 50, 20], mode: "pie-angles" }, [
    S("Each part becomes part of 360°.", "প্রতিটি অংশ ৩৬০°-এর অংশ হয়।", { total: 360 }),
    S("30%, 50%, 20% → 108°, 180°, 72°.", "৩০%, ৫০%, ২০% → ১০৮°, ১৮০°, ৭২°।", { degrees: [108, 180, 72] }),
  ]),
  V("mean-median-mode-grouped", "c8.11", "Mean, median and mode", "গড়, মধ্যমা ও সংখ্যাগুরু", "chart", "chart", { values: [5, 7, 7, 9, 12], mode: "mean-median-mode" }, [
    S("Mean = 40 ÷ 5 = 8.", "গড় = ৪০ ÷ ৫ = ৮।", { mean: 8 }),
    S("Median = 7 and mode = 7.", "মধ্যমা = ৭ এবং সংখ্যাগুরু = ৭।", { median: 7, mode: 7 }),
  ]),
  V("compare-datasets", "c8.11", "Compare two datasets", "দুই উপাত্তসমষ্টি তুলনা", "chart", "chart", { classA: [10, 12, 14], classB: [8, 15, 19], mode: "compare" }, [
    S("Class A mean = 36 ÷ 3 = 12.", "শ্রেণি A-এর গড় = ৩৬ ÷ ৩ = ১২।", { meanA: 12 }),
    S("Class B mean = 42 ÷ 3 = 14, but its spread is wider.", "শ্রেণি B-এর গড় = ৪২ ÷ ৩ = ১৪, তবে বিস্তার বেশি।", { meanB: 14 }),
  ]),
  V("misleading-statistics", "c8.11", "Misleading statistics", "বিভ্রান্তিকর পরিসংখ্যান", "chart", "chart", { values: [10, 11, 60], average: 27, mode: "misleading" }, [
    S("One large value pulls the mean up to 27.", "একটি বড় মান গড়কে ২৭-এ টেনে নেয়।", { mean: 27 }),
    S("The typical value is closer to 11, so the mean misleads.", "সাধারণ মান ১১-এর কাছাকাছি, তাই গড় বিভ্রান্ত করে।", { typical: 11 }),
  ]),
];
