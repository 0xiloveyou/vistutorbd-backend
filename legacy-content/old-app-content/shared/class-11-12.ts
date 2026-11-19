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

const DIFF = 5;

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

export const CLASS_11_12_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("interval-1112", "c11_12.01", "Real number intervals", "বাস্তব সংখ্যার ব্যবধি", "number-line", "numberLine", { mode: "interval", min: -10, max: 10 }, [
    S("Solve an inequality like an equation, but flip the sign when multiplying or dividing by a negative.", "অসমতা সমীকরণের মতো সমাধান করো, তবে ঋণাত্মক দিয়ে গুণ/ভাগে চিহ্ন উল্টাও।", { flip: true }),
    S("The solution is a shaded interval on the number line.", "সমাধান সংখ্যারেখায় ছায়াযুক্ত ব্যবধি।", { interval: "x < 3" }),
    S("|x − a| < r means the distance from a is less than r.", "|x − a| < r মানে a থেকে দূরত্ব r-এর কম।", { modulus: "(a-r, a+r)" }),
  ]),
  V("feasible-region-1112", "c11_12.02", "Linear programming", "রৈখিক প্রোগ্রামিং", "coordinate-plane", "coordinatePlane", { mode: "feasible-region", constraints: ["x+y<=4", "x>=0", "y>=0"] }, [
    S("Each inequality shades a half-plane.", "প্রতিটি অসমতা একটি অর্ধতল ছায়া করে।", { halfPlanes: 3 }),
    S("Overlapping shaded regions form the feasible region.", "ছায়াযুক্ত অংশের সাধারণ অঞ্চলই সম্ভাব্য অঞ্চল।", { feasible: true }),
    S("The optimum of a linear objective occurs at a vertex.", "রৈখিক উদ্দেশ্যের সর্বোচ্চ/সর্বনিম্ন শীর্ষবিন্দুতে ঘটে।", { optimumAtVertex: true }),
  ]),
  V("complex-plane-1112", "c11_12.03", "Complex numbers", "জটিল সংখ্যা", "coordinate-plane", "coordinatePlane", { mode: "complex", real: 3, imaginary: 4 }, [
    S("A complex number a + bi is the point (a, b).", "জটিল সংখ্যা a + bi হলো বিন্দু (a, b)।", { point: [3, 4] }),
    S("Its modulus is √(a² + b²) = √(9 + 16) = 5.", "এর মডুলাস √(a² + b²) = √(৯ + ১৬) = ৫।", { modulus: 5 }),
    S("Its argument is the angle from the positive real axis.", "এর আর্গুমেন্ট ধনাত্মক বাস্তব অক্ষ থেকে কোণ।", { argument: "tan^{-1}(4/3)" }),
  ]),
  V("polynomial-1112", "c11_12.04", "Polynomials", "বহুপদী", "function-graph", "functionGraph", { mode: "polynomial", expression: "x^3 - 3x + 1" }, [
    S("The degree tells the maximum number of real roots.", "ঘাত সর্বোচ্চ কতটি বাস্তব মূল হতে পারে তা বলে।", { degree: 3 }),
    S("A root makes the polynomial equal to zero.", "মূল বসালে বহুপদী শূন্য হয়।", { root: true }),
    S("The graph crosses or touches the x-axis at each real root.", "প্রতিটি বাস্তব মূলে গ্রাফ x-অক্ষ ছেদ বা স্পর্শ করে।", { intercepts: "depends on multiplicity" }),
  ]),
  V("pascal-1112", "c11_12.05", "Binomial expansion", "দ্বিপদী বিস্তার", "number-grid", "numberGrid", { mode: "pascal", rows: 5 }, [
    S("Each row of Pascal's triangle gives the binomial coefficients.", "প্যাসকেলের ত্রিভুজের প্রতিটি সারি দ্বিপদী সহগ দেয়।", { row: [1, 4, 6, 4, 1] }),
    S("(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.", "(a + b)⁴ = a⁴ + ৪a³b + ৬a²b² + ৪ab³ + b⁴।", { formula: "(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4" }),
  ]),
  V("conic-1112", "c11_12.06", "Conic sections", "কনিক", "coordinate-plane", "coordinatePlane", { mode: "conic", type: "parabola" }, [
    S("A parabola is the set of points equidistant from a focus and a directrix.", "পরাবৃত্ত হলো ফোকাস ও দিকরেখা থেকে সমদূরবর্তী বিন্দুর সেট।", { focus: true }),
    S("The standard form y² = 4ax opens to the right.", "প্রামাণ্য রূপ y² = 4ax ডানে খোলে।", { formula: "y^2 = 4ax" }),
  ]),
  V("inverse-trig-1112", "c11_12.07", "Inverse trigonometric functions", "বিপরীত ত্রিকোণমিতিক ফাংশন", "unit-circle", "unitCircle", { mode: "inverse-trig", value: 0.5 }, [
    S("sin⁻¹(0.5) asks for the angle whose sine is 0.5.", "sin⁻¹(০.৫) হলো যে কোণের sine ০.৫।", { angle: 30 }),
    S("The principal value lies in [−90°, 90°].", "প্রধান মান [−৯০°, ৯০°]-এর মধ্যে।", { range: "[-90, 90]" }),
  ]),
  V("force-1112", "c11_12.08", "Statics", "স্থিতিবিদ্যা", "geometry-board", "geometryBoard", { mode: "forces", forces: [5, 12] }, [
    S("Resolve forces into perpendicular components.", "বলকে লম্ব উপাংশে ভাগ করো।", { components: true }),
    S("Equilibrium needs zero resultant force and zero moment.", "ভারসাম্যের জন্য ফল বল ও ঘূর্ণনশীল ভ্রামক শূন্য হতে হবে।", { equilibrium: true }),
  ]),
  V("projectile-1112", "c11_12.09", "Motion in a plane", "তলে গতিশীল কণা", "coordinate-plane", "coordinatePlane", { mode: "projectile", speed: 20, angle: 45 }, [
    S("Horizontal and vertical motions are independent.", "অনুভূমিক ও উল্লম্ব গতি স্বাধীন।", { independent: true }),
    S("Range R = v² sin 2θ / g is maximum at 45°.", "পাল্লা R = v² sin 2θ / g, ৪৫°-এ সর্বোচ্চ।", { formula: "R = \\frac{v^2 \\sin 2\\theta}{g}" }),
  ]),
  V("probability-tree-1112", "c11_12.10", "Probability", "সম্ভাবনা", "tree-diagram", "treeDiagram", { mode: "probability-tree", p: 0.5 }, [
    S("Multiply along a branch and add across branches.", "শাখা ধরে গুণ করো আর শাখাগুলো যোগ করো।", { rule: "multiply-add" }),
    S("For two fair coins, P(two heads) = ½ × ½ = ¼.", "দুই ন্যায্য মুদ্রায় P(দুই হেড) = ½ × ½ = ¼।", { probability: 0.25 }),
    S("The probabilities of all outcomes add to 1.", "সব ফলাফলের সম্ভাবনার যোগফল ১।", { total: 1 }),
  ]),
  V("vector-1112", "c11_12.11", "Vectors", "ভেক্টর", "coordinate-plane", "coordinatePlane", { mode: "vector", a: [3, 4], b: [1, 2] }, [
    S("Add vectors component by component.", "উপাংশ ধরে ধরে ভেক্টর যোগ করো।", { sum: [4, 6] }),
    S("The magnitude of (3, 4) is √(9 + 16) = 5.", "যুগল (৩, ৪)-এর মান √(৯ + ১৬) = ৫।", { magnitude: 5 }),
    S("The dot product measures alignment: a·b = |a||b|cos θ.", "ডট গুণ সাদৃশ্য মাপে: a·b = |a||b|cos θ।", { formula: "\\vec{a}\\cdot\\vec{b} = |a||b|\\cos\\theta" }),
  ]),
  V("line-equation-1112", "c11_12.12", "Straight lines", "সরলরেখা", "coordinate-plane", "coordinatePlane", { mode: "line", slope: 2, intercept: 1 }, [
    S("Slope m = (y₂ − y₁)/(x₂ − x₁).", "ঢাল m = (y₂ − y₁)/(x₂ − x₁)।", { formula: "m = \\frac{y_2-y_1}{x_2-x_1}" }),
    S("Point-slope form: y − y₁ = m(x − x₁).", "বিন্দু-ঢাল রূপ: y − y₁ = m(x − x₁)।", { formula: "y - y_1 = m(x - x_1)" }),
    S("Parallel lines have equal slopes; perpendicular slopes multiply to −1.", "সমান্তরাল রেখার ঢাল সমান; লম্ব রেখার ঢালের গুণফল −১।", { perpendicular: -1 }),
  ]),
  V("circle-1112", "c11_12.13", "Circle", "বৃত্ত", "coordinate-plane", "coordinatePlane", { mode: "circle", centre: [0, 0], radius: 5 }, [
    S("Circle with centre (h, k) and radius r: (x − h)² + (y − k)² = r².", "কেন্দ্র (h, k) ও ব্যাসার্ধ r হলে বৃত্ত: (x − h)² + (y − k)² = r²।", { formula: "(x-h)^2 + (y-k)^2 = r^2" }),
    S("For centre (0, 0) and r = 5: x² + y² = 25.", "কেন্দ্র (০, ০) ও r = ৫ হলে: x² + y² = ২৫।", { equation: "x^2 + y^2 = 25" }),
  ]),
  V("permutations-1112", "c11_12.14", "Permutations and combinations", "বিন্যাস ও সমাবেশ", "number-grid", "numberGrid", { mode: "permutation", n: 5, r: 3 }, [
    S("Permutations count order: nPr = n!/(n − r)!.", "বিন্যাস ক্রম গোনে: nPr = n!/(n − r)!।", { formula: "{}^nP_r = \\frac{n!}{(n-r)!}" }),
    S("Combinations ignore order: nCr = nPr/r!.", "সমাবেশ ক্রম গোনে না: nCr = nPr/r!।", { formula: "{}^nC_r = \\frac{n!}{r!(n-r)!}" }),
    S("5P3 = 60 and 5C3 = 10.", "৫P৩ = ৬০ আর ৫C৩ = ১০।", { p: 60, c: 10 }),
  ]),
  V("trig-ratio-1112", "c11_12.15", "Trigonometric ratios", "ত্রিকোণমিতিক অনুপাত", "unit-circle", "unitCircle", { mode: "trig-ratio", angle: 60 }, [
    S("sin 60° = √3/2 and cos 60° = 1/2.", "sin ৬০° = √৩/২ আর cos ৬০° = ১/২।", { sin: "\\sqrt{3}/2", cos: "1/2" }),
    S("tan 60° = sin 60° / cos 60° = √3.", "tan ৬০° = sin ৬০° / cos ৬০° = √৩।", { tan: "\\sqrt{3}" }),
  ]),
  V("compound-angle-1112", "c11_12.16", "Compound angles", "যৌগিক কোণ", "unit-circle", "unitCircle", { mode: "compound-angle", a: 45, b: 30 }, [
    S("sin(A + B) = sin A cos B + cos A sin B.", "sin(A + B) = sin A cos B + cos A sin B।", { formula: "\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B" }),
    S("sin 75° = sin(45° + 30°) = (√6 + √2)/4.", "sin ৭৫° = sin(৪৫° + ৩০°) = (√৬ + √২)/৪।", { value: "\\frac{\\sqrt{6}+\\sqrt{2}}{4}" }),
    S("cos 2A = cos²A − sin²A.", "cos 2A = cos²A − sin²A।", { formula: "\\cos 2A = \\cos^2 A - \\sin^2 A" }),
  ]),
  V("function-graph-1112", "c11_12.17", "Functions and graphs", "ফাংশন ও গ্রাফ", "function-graph", "functionGraph", { mode: "function", expression: "x^2" }, [
    S("A function maps each input to exactly one output.", "ফাংশন প্রতিটি ইনপুটকে ঠিক একটি আউটপুটে পাঠায়।", { function: true }),
    S("The graph of y = x² is a parabola with vertex at the origin.", "y = x²-এর গ্রাফ পরাবৃত্ত, শীর্ষ মূলবিন্দুতে।", { vertex: [0, 0] }),
    S("Domain is the set of inputs; range is the set of outputs.", "ডোমেইন ইনপুটের সেট; রেঞ্জ আউটপুটের সেট।", { domain: "all reals" }),
  ]),
  V("derivative-1112", "c11_12.18", "Differentiation", "অন্তরীকরণ", "function-graph", "functionGraph", { mode: "derivative", expression: "x^2" }, [
    S("The derivative is the slope of the tangent line.", "অন্তরজ হলো স্পর্শকের ঢাল।", { derivative: "2x" }),
    S("For y = x², dy/dx = 2x.", "y = x² হলে, dy/dx = ২x।", { formula: "\\frac{dy}{dx} = 2x" }),
    S("At x = 3, the slope is 6.", "x = ৩-এ ঢাল ৬।", { slope: 6 }),
  ]),
  V("integral-area-1112", "c11_12.19", "Integration", "সমাকলন", "function-graph", "functionGraph", { mode: "integral", expression: "x^2", from: 0, to: 3 }, [
    S("The definite integral gives the area under the curve.", "নির্দিষ্ট সমাকলন বক্রের নিচের ক্ষেত্রফল দেয়।", { area: true }),
    S("∫₀³ x² dx = [x³/3]₀³ = 27/3 = 9.", "∫₀³ x² dx = [x³/৩]₀³ = ২৭/৩ = ৯।", { formula: "\\int_0^3 x^2 dx = 9" }),
  ]),
  V("real-line-intervals", "c11_12.01", "Real line intervals", "বাস্তব রেখার ব্যবধি", "number-line", "numberLine", { mode: "interval-set", lower: -2, upper: 4, includeLower: true, includeUpper: false }, [
    S("[−2, 4) includes −2 but not 4.", "[−২, ৪) ব্যবধিতে −২ আছে কিন্তু ৪ নেই।", { interval: "[-2, 4)" }),
    S("The union of (−∞, 4) and [−2, ∞) is the whole line.", "(−∞, ৪) ও [−২, ∞)-এর সংযোগ পুরো রেখা।", { union: "(-inf, inf)" }),
  ]),
  V("linear-inequality-solver", "c11_12.01", "Linear inequality solver", "রৈখিক অসমতা সমাধান", "number-line", "numberLine", { mode: "linear-inequality", a: 2, b: 3, c: 11 }, [
    S("2x + 3 < 11 gives 2x < 8.", "২x + ৩ < ১১ হলে ২x < ৮।", { step: "2x < 8" }),
    S("Divide by positive 2: x < 4.", "ধনাত্মক ২ দিয়ে ভাগ: x < ৪।", { solution: "x < 4" }),
  ]),
  V("sign-flip-misconception", "c11_12.01", "Sign flip misconception", "চিহ্ন উল্টানোর ভুল ধারণা", "number-line", "numberLine", { mode: "sign-flip", inequality: "-3x < 9" }, [
    S("Dividing by −3 reverses the inequality sign.", "−৩ দিয়ে ভাগ করলে অসমতার চিহ্ন উল্টায়।", { flip: true }),
    S("The answer is x > −3, not x < −3.", "উত্তর x > −৩, x < −৩ নয়।", { solution: "x > -3" }),
  ]),
  V("modulus-distance", "c11_12.01", "Modulus as distance", "দূরত্ব হিসেবে মডুলাস", "number-line", "numberLine", { mode: "modulus", center: 2, radius: 3 }, [
    S("|x − 2| < 3 means the distance from 2 is less than 3.", "|x − ২| < ৩ মানে ২ থেকে দূরত্ব ৩-এর কম।", { center: 2, radius: 3 }),
    S("So −1 < x < 5.", "তাই −১ < x < ৫।", { interval: "(-1, 5)" }),
  ]),
  V("modulus-equation-cases", "c11_12.01", "Modulus equation by cases", "শর্তভেদে মডুলাস সমীকরণ", "function-graph", "functionGraph", { mode: "modulus-equation", center: 1, distance: 3 }, [
    S("|x − 1| = 3 gives x − 1 = 3 or x − 1 = −3.", "|x − ১| = ৩ হলে x − ১ = ৩ বা x − ১ = −৩।", { cases: [4, -2] }),
    S("The V-shaped graph meets y = 3 at x = 4 and x = −2.", "V-আকৃতির গ্রাফ y = ৩-কে x = ৪ ও x = −২-এ ছেদ করে।", { roots: [4, -2] }),
  ]),
  V("quadratic-inequality-sign-chart", "c11_12.01", "Quadratic inequality sign chart", "দ্বিঘাত অসমতার চিহ্ন ছক", "function-graph", "functionGraph", { mode: "quadratic-inequality", expression: "x^2 - x - 6" }, [
    S("x² − x − 6 = (x − 3)(x + 2).", "x² − x − ৬ = (x − ৩)(x + ২)।", { roots: [-2, 3] }),
    S("It is non-negative outside the roots: x ≤ −2 or x ≥ 3.", "মূলের বাইরে এটি অঋণাত্মক: x ≤ −২ বা x ≥ ৩।", { solution: "x <= -2 or x >= 3" }),
  ]),
  V("rational-inequality-sign-chart", "c11_12.01", "Rational inequality sign chart", "মূলদ অসমতার চিহ্ন ছক", "function-graph", "functionGraph", { mode: "rational-inequality", expression: "(x-1)/(x+2) >= 0" }, [
    S("Critical points are x = 1 and x = −2, with x = −2 excluded.", "ক্রান্তি বিন্দু x = ১ ও x = −২, যেখানে x = −২ বর্জিত।", { critical: [-2, 1] }),
    S("The sign chart gives x < −2 or x ≥ 1.", "চিহ্ন ছক দেয় x < −২ বা x ≥ ১।", { solution: "x < -2 or x >= 1" }),
  ]),
  V("inequality-region-2d", "c11_12.01", "Inequality region in 2D", "দ্বিমাত্রায় অসমতার অঞ্চল", "coordinate-plane", "coordinatePlane", { mode: "half-plane", a: 2, b: 3, c: 6 }, [
    S("The line 2x + 3y = 6 is the boundary.", "রেখা ২x + ৩y = ৬ হলো সীমানা।", { boundary: "2x+3y=6" }),
    S("Testing (0,0) gives 0 < 6, so shade the origin side for ≤.", "পরীক্ষা (০,০) দিলে ০ < ৬, তাই ≤-এ মূলবিন্দুর দিক ছায়া করো।", { halfPlane: "origin side" }),
  ]),
  V("am-gm-visual", "c11_12.01", "AM–GM semicircle proof", "সমান্তর–গুণোত্তর মধ্যক অর্ধবৃত্ত প্রমাণ", "geometry-board", "geometryBoard", { mode: "am-gm", a: 4, b: 9 }, [
    S("On a semicircle with segments 4 and 9, the radius is (4+9)/2 = 6.5.", "৪ ও ৯ অংশের অর্ধবৃত্তে ব্যাসার্ধ (৪+৯)/২ = ৬.৫।", { am: 6.5 }),
    S("The half-chord is √(4×9) = 6, and 6 ≤ 6.5.", "অর্ধ-জ্যা √(৪×৯) = ৬, আর ৬ ≤ ৬.৫।", { gm: 6 }),
  ]),
  V("am-gm-optimization-lab", "c11_12.01", "AM–GM optimization lab", "AM–GM অনুকূলন পরীক্ষা", "function-graph", "functionGraph", { mode: "am-gm-optimization", sum: 20 }, [
    S("For x + y = 20, the product is largest when x = y = 10.", "x + y = ২০ হলে x = y = ১০-এ গুণফল সর্বোচ্চ।", { x: 10, y: 10 }),
    S("The maximum product is 10 × 10 = 100.", "সর্বোচ্চ গুণফল ১০ × ১০ = ১০০।", { maximum: 100 }),
  ]),
  V("triangle-inequality-abs", "c11_12.01", "Triangle inequality for modulus", "মডুলাসের ত্রিভুজ অসমতা", "number-line", "numberLine", { mode: "triangle-inequality", a: -3, b: 5 }, [
    S("|a + b| = |−3 + 5| = 2.", "|a + b| = |−৩ + ৫| = ২।", { left: 2 }),
    S("|a| + |b| = 3 + 5 = 8, so 2 ≤ 8.", "|a| + |b| = ৩ + ৫ = ৮, তাই ২ ≤ ৮।", { right: 8 }),
  ]),
  V("completeness-zoom", "c11_12.01", "Completeness of the reals", "বাস্তব সংখ্যার পূর্ণতা", "number-line", "numberLine", { mode: "completeness", point: "sqrt(2)" }, [
    S("√2 ≈ 1.4142 is irrational.", "√২ ≈ ১.৪১৪২ অমূলদ।", { value: "sqrt(2)" }),
    S("Rationals leave a gap that a real number fills.", "মূলদ সংখ্যা একটি ফাঁক রাখে, যা বাস্তব সংখ্যা পূরণ করে।", { gap: true }),
  ]),
  V("feasible-region-builder", "c11_12.02", "Feasible region builder", "সম্ভাব্য অঞ্চল নির্মাণ", "coordinate-plane", "coordinatePlane", { mode: "feasible-region-builder", constraints: ["x+y<=4", "x>=0", "y>=0"] }, [
    S("Add x + y ≤ 4, x ≥ 0 and y ≥ 0 one at a time.", "একটি একটি করে x + y ≤ ৪, x ≥ ০ ও y ≥ ০ যোগ করো।", { constraints: 3 }),
    S("The overlap is the triangle (0,0), (4,0), (0,4).", "সাধারণ অংশ ত্রিভুজ (০,০), (৪,০), (০,৪)।", { vertices: [[0, 0], [4, 0], [0, 4]] }),
  ]),
  V("corner-point-finder", "c11_12.02", "Corner point finder", "কোণ বিন্দু নির্ণয়", "coordinate-plane", "coordinatePlane", { mode: "corner-points", lines: ["x+y=4", "x+3y=6"] }, [
    S("Solve x + y = 4 and x + 3y = 6 together.", "x + y = ৪ ও x + ৩y = ৬ একসাথে সমাধান করো।", { system: true }),
    S("Subtracting gives 2y = 2, so y = 1 and x = 3.", "বিয়োগে ২y = ২, তাই y = ১ ও x = ৩।", { corner: [3, 1] }),
  ]),
  V("objective-sweep", "c11_12.02", "Objective sweep", "উদ্দেশ্য রেখা সরানো", "coordinate-plane", "coordinatePlane", { mode: "objective-sweep", objective: "3x+2y", constraints: ["x+y<=4", "x>=0", "y>=0"] }, [
    S("Slide the line 3x + 2y = k outward.", "রেখা ৩x + ২y = k বাইরের দিকে সরাও।", { objective: "3x+2y" }),
    S("It last touches the region at (4,0), giving k = 12.", "শেষে (৪,০)-এ অঞ্চল স্পর্শ করে, k = ১২।", { optimum: [4, 0], value: 12 }),
  ]),
  V("optimal-at-a-vertex", "c11_12.02", "Optimum at a vertex", "শীর্ষবিন্দুতে সর্বোত্তম", "coordinate-plane", "coordinatePlane", { mode: "vertex-optimum", vertices: [[0, 0], [4, 0], [0, 4]] }, [
    S("A linear objective cannot peak in the interior.", "রৈখিক উদ্দেশ্য ভেতরে সর্বোচ্চ হতে পারে না।", { interior: false }),
    S("Values 0, 12 and 8 mean the best is 12 at (4,0).", "মান ০, ১২ ও ৮ মানে (৪,০)-এ সর্বোত্তম ১২।", { best: 12 }),
  ]),
  V("unbounded-and-infeasible", "c11_12.02", "Unbounded and infeasible", "অসীম ও অসম্ভব অঞ্চল", "coordinate-plane", "coordinatePlane", { mode: "unbounded-infeasible", constraints: ["x+y>=2", "x>=0", "y>=0"] }, [
    S("x + y ≥ 2 with x, y ≥ 0 is unbounded.", "x, y ≥ ০ সহ x + y ≥ ২ অপরিবদ্ধ।", { status: "unbounded" }),
    S("Adding x + y ≤ 1 would make it infeasible.", "x + y ≤ ১ যোগ করলে তা অসম্ভব হয়ে যায়।", { status: "infeasible" }),
  ]),
  V("multiple-optimal-solutions", "c11_12.02", "Multiple optimal solutions", "একাধিক সর্বোত্তম সমাধান", "coordinate-plane", "coordinatePlane", { mode: "multiple-optima", objective: "x+y", edge: [[1, 3], [3, 1]] }, [
    S("If the objective is parallel to an edge, two vertices tie.", "উদ্দেশ্য কোনো বাহুর সমান্তরাল হলে দুই শীর্ষ সমান হয়।", { parallel: true }),
    S("Here x + y = 4 at both (1,3) and (3,1).", "এখানে (১,৩) ও (৩,১) উভয়েই x + y = ৪।", { value: 4 }),
  ]),
  V("word-to-model-wizard", "c11_12.02", "Word to model wizard", "শব্দ থেকে মডেলে", "story-scene", "storyScene", { mode: "word-to-model", story: "A factory makes chairs and tables" }, [
    S("Let x = chairs and y = tables, then write time and material limits.", "ধরি x = চেয়ার ও y = টেবিল, তারপর সময় ও উপকরণের সীমা লেখো।", { variables: ["x", "y"] }),
    S("Profit P = 30x + 50y is the objective to maximise.", "মুনাফা P = ৩০x + ৫০y হলো সর্বোচ্চ করার উদ্দেশ্য।", { objective: "P = 30x + 50y" }),
  ]),
  V("sensitivity-lab", "c11_12.02", "Sensitivity lab", "সংবেদনশীলতা পরীক্ষা", "coordinate-plane", "coordinatePlane", { mode: "sensitivity", constraints: ["x+y<=4", "2x+y<=6"] }, [
    S("Tighten x + y ≤ 4 to x + y ≤ 3.", "x + y ≤ ৪-কে x + y ≤ ৩ করো।", { old: 4, new: 3 }),
    S("The optimum moves from (2,2) to (3,0).", "সর্বোত্তম (২,২) থেকে (৩,০)-এ সরে।", { optimum: [3, 0] }),
  ]),
  V("integer-vs-continuous", "c11_12.02", "Integer vs continuous", "পূর্ণসংখ্যা বনাম অবিচ্ছিন্ন", "coordinate-plane", "coordinatePlane", { mode: "integer-feasible", constraints: ["x+y<=4", "x>=0", "y>=0"] }, [
    S("The continuous region has infinitely many points.", "অবিচ্ছিন্ন অঞ্চলে অসীম সংখ্যক বিন্দু আছে।", { continuous: true }),
    S("Integer solutions are the 15 lattice points with x + y ≤ 4.", "পূর্ণসংখ্যা সমাধান x + y ≤ ৪ সহ ১৫টি জালি বিন্দু।", { lattice: 15 }),
  ]),
  V("argand-plane", "c11_12.03", "Argand plane", "আর্গন্ড সমতল", "complex-plane", "complexPlane", { mode: "argand", re: 3, im: 4 }, [
    S("Plot 3 + 4i at the point (3,4).", "৩ + ৪i বিন্দু (৩,৪)-এ বসাও।", { point: [3, 4] }),
    S("|z| = √(9+16) = 5 and arg z = tan⁻¹(4/3).", "|z| = √(৯+১৬) = ৫ এবং arg z = tan⁻¹(৪/৩)।", { modulus: 5 }),
  ]),
  V("add-subtract-vectors", "c11_12.03", "Add and subtract complex numbers", "জটিল সংখ্যার যোগ ও বিয়োগ", "complex-plane", "complexPlane", { mode: "add-subtract", z1: [2, 1], z2: [1, 2] }, [
    S("Add real and imaginary parts: (2+i)+(1+2i)=3+3i.", "বাস্তব ও কাল্পনিক অংশ যোগ: (২+i)+(১+২i)=৩+৩i।", { sum: [3, 3] }),
    S("The sum is the fourth vertex of a parallelogram.", "যোগফল সামান্তরিকের চতুর্থ শীর্ষবিন্দু।", { parallelogram: true }),
  ]),
  V("multiply-rotate-scale", "c11_12.03", "Multiply: rotate and scale", "গুণ: ঘূর্ণন ও স্কেল", "complex-plane", "complexPlane", { mode: "multiply", r1: 2, a1: 30, r2: 3, a2: 40 }, [
    S("Multiply the moduli: 2 × 3 = 6.", "মডুলাস গুণ করো: ২ × ৩ = ৬।", { modulus: 6 }),
    S("Add the arguments: 30° + 40° = 70°.", "আর্গুমেন্ট যোগ করো: ৩০° + ৪০° = ৭০°।", { argument: 70 }),
  ]),
  V("conjugate-reflection", "c11_12.03", "Conjugate reflection", "অনুবন্ধী প্রতিফলন", "complex-plane", "complexPlane", { mode: "conjugate", re: 3, im: 4 }, [
    S("The conjugate of 3 + 4i is 3 − 4i.", "৩ + ৪i-এর অনুবন্ধী ৩ − ৪i।", { conjugate: [3, -4] }),
    S("It is the mirror image across the real axis.", "এটি বাস্তব অক্ষ বরাবর প্রতিফলন।", { mirror: "real axis" }),
  ]),
  V("division-and-reciprocal", "c11_12.03", "Division and reciprocal", "ভাগ ও বিপরীত", "complex-plane", "complexPlane", { mode: "reciprocal", re: 3, im: 4 }, [
    S("1/(3+4i) = (3−4i)/(3²+4²).", "১/(৩+৪i) = (৩−৪i)/(৩²+৪²)।", { step: "rationalise" }),
    S("= (3−4i)/25, with modulus 1/5.", "= (৩−৪i)/২৫, মডুলাস ১/৫।", { reciprocal: [0.12, -0.16] }),
  ]),
  V("polar-form-converter", "c11_12.03", "Polar form converter", "পোলার রূপ রূপান্তর", "complex-plane", "complexPlane", { mode: "polar", re: 1, im: 1 }, [
    S("r = √(1²+1²) = √2.", "r = √(১²+১²) = √২।", { r: "sqrt(2)" }),
    S("θ = 45°, so z = √2(cos 45° + i sin 45°).", "θ = ৪৫°, তাই z = √২(cos ৪৫° + i sin ৪৫°)।", { angle: 45 }),
  ]),
  V("de-moivre-lab", "c11_12.03", "De Moivre lab", "দ্য মোইভার পরীক্ষা", "complex-plane", "complexPlane", { mode: "de-moivre", r: 2, angle: 30, n: 3 }, [
    S("(2∠30°)³ = 2³∠(3×30°).", "(২∠৩০°)³ = ২³∠(৩×৩০°)।", { power: 3 }),
    S("= 8∠90° = 8i.", "= ৮∠৯০° = ৮i।", { result: [0, 8] }),
  ]),
  V("roots-of-unity", "c11_12.03", "Roots of unity", "একের মূলসমূহ", "complex-plane", "complexPlane", { mode: "roots-of-unity", n: 5 }, [
    S("The 5th roots are spaced by 360°/5 = 72°.", "৫ম মূলগুলো ৩৬০°/৫ = ৭২° অন্তরে।", { spacing: 72 }),
    S("They form a regular pentagon on the unit circle.", "তারা একক বৃত্তে সুষম পঞ্চভুজ গঠন করে।", { polygon: 5 }),
  ]),
  V("cube-roots-of-unity", "c11_12.03", "Cube roots of unity", "একের ঘনমূল", "complex-plane", "complexPlane", { mode: "cube-roots", n: 3 }, [
    S("1, ω = (−1+i√3)/2 and ω² = (−1−i√3)/2.", "১, ω = (−১+i√৩)/২ এবং ω² = (−১−i√৩)/২।", { roots: 3 }),
    S("1 + ω + ω² = 0.", "১ + ω + ω² = ০।", { sum: 0 }),
  ]),
  V("quadratic-complex-roots", "c11_12.03", "Quadratic complex roots", "দ্বিঘাতের জটিল মূল", "function-graph", "functionGraph", { mode: "complex-roots", expression: "x^2 + 4" }, [
    S("x² + 4 = 0 has discriminant −16 < 0.", "x² + ৪ = ০-এর নিশ্চায়ক −১৬ < ০।", { discriminant: -16 }),
    S("The roots are ±2i and the parabola misses the x-axis.", "মূল ±২i এবং পরাবৃত্ত x-অক্ষ এড়িয়ে যায়।", { roots: ["2i", "-2i"] }),
  ]),
  V("locus-in-argand", "c11_12.03", "Locus in the Argand plane", "আর্গন্ড সমতলে সঞ্চারপথ", "complex-plane", "complexPlane", { mode: "locus", center: [1, 2], radius: 3 }, [
    S("|z − (1 + 2i)| = 3 is a circle centred at (1,2).", "|z − (১ + ২i)| = ৩ কেন্দ্র (১,২) বিশিষ্ট বৃত্ত।", { circle: true }),
    S("arg z = 45° is a ray from the origin.", "arg z = ৪৫° মূলবিন্দু থেকে একটি রশ্মি।", { ray: 45 }),
  ]),
  V("euler-formula-bridge", "c11_12.03", "Euler formula bridge", "অয়লার সূত্র সেতু", "complex-plane", "complexPlane", { mode: "euler", angle: 60 }, [
    S("e^{iθ} = cos θ + i sin θ.", "e^{iθ} = cos θ + i sin θ।", { formula: true }),
    S("At θ = 60°, e^{i60°} = 1/2 + i√3/2.", "θ = ৬০°-এ, e^{i৬০°} = ১/২ + i√৩/২।", { value: [0.5, "sqrt(3)/2"] }),
  ]),
  V("i-powers-cycle", "c11_12.03", "Powers of i cycle", "i-এর ঘাত চক্র", "complex-plane", "complexPlane", { mode: "i-powers", n: 4 }, [
    S("i¹ = i, i² = −1, i³ = −i, i⁴ = 1.", "i¹ = i, i² = −১, i³ = −i, i⁴ = ১।", { cycle: ["i", "-1", "-i", "1"] }),
    S("The pattern repeats every 4 powers.", "ধাঁচ প্রতি ৪ ঘাতে পুনরাবৃত্ত হয়।", { period: 4 }),
  ]),
  V("polynomial-graph-lab", "c11_12.04", "Polynomial graph lab", "বহুপদী গ্রাফ পরীক্ষা", "function-graph", "functionGraph", { mode: "polynomial", coefficients: [1, 0, -3, 1] }, [
    S("The coefficients give y = x³ − 3x + 1.", "সহগগুলো y = x³ − ৩x + ১ দেয়।", { degree: 3 }),
    S("Odd degree means the two ends go opposite ways.", "বিজোড় ঘাতে দুই প্রান্ত বিপরীত দিকে যায়।", { endBehaviour: "opposite" }),
  ]),
  V("long-division-stepper", "c11_12.04", "Polynomial long division", "বহুপদীর দীর্ঘ ভাগ", "algebra-stepper", "algebraStepper", { mode: "long-division", dividend: "x^3 - 2x^2 + 4x - 3", divisor: "x - 1" }, [
    S("x³ ÷ x = x²; subtract x²(x−1).", "x³ ÷ x = x²; x²(x−১) বিয়োগ করো।", { term: "x^2" }),
    S("The remainder is 0 and the quotient is x² − x + 3.", "ভাগশেষ ০ এবং ভাগফল x² − x + ৩।", { quotient: "x^2 - x + 3" }),
  ]),
  V("synthetic-division", "c11_12.04", "Synthetic division", "সংশ্লেষ বিভাজন", "algebra-stepper", "algebraStepper", { mode: "synthetic", coefficients: [1, -2, 4, -3], root: 1 }, [
    S("Bring down 1, multiply by 1 and add each time.", "১ নামাও, ১ দিয়ে গুণ করে প্রতিবার যোগ করো।", { root: 1 }),
    S("The quotient coefficients are 1, −1, 3 with remainder 0.", "ভাগফল সহগ ১, −১, ৩ এবং ভাগশেষ ০।", { quotient: [1, -1, 3] }),
  ]),
  V("remainder-theorem-graph", "c11_12.04", "Remainder theorem", "ভাগশেষ উপপাদ্য", "function-graph", "functionGraph", { mode: "remainder-theorem", expression: "x^3 - 2x^2 + 4x - 3", a: 2 }, [
    S("f(2) = 8 − 8 + 8 − 3 = 5.", "f(২) = ৮ − ৮ + ৮ − ৩ = ৫।", { value: 5 }),
    S("So dividing by x − 2 leaves remainder 5.", "তাই x − ২ দিয়ে ভাগে ভাগশেষ ৫।", { remainder: 5 }),
  ]),
  V("factor-theorem-roots", "c11_12.04", "Factor theorem and roots", "উৎপাদক উপপাদ্য ও মূল", "function-graph", "functionGraph", { mode: "factor-theorem", expression: "x^2 - 3x + 2" }, [
    S("f(1) = 0, so x − 1 is a factor.", "f(১) = ০, তাই x − ১ একটি উৎপাদক।", { factor: "x-1" }),
    S("x² − 3x + 2 = (x − 1)(x − 2).", "x² − ৩x + ২ = (x − ১)(x − ২)।", { roots: [1, 2] }),
  ]),
  V("rational-root-test", "c11_12.04", "Rational root test", "মূলদ মূল পরীক্ষা", "algebra-stepper", "algebraStepper", { mode: "rational-roots", expression: "2x^3 - 3x^2 - 8x + 12" }, [
    S("Candidates are ±1, ±2, ±3, ±4, ±6, ±12 over ±1, ±2.", "প্রার্থী ±১, ±২, ±৩, ±৪, ±৬, ±১২ এবং ±১, ±২।", { candidates: true }),
    S("Testing shows x = 2 is a root.", "পরীক্ষায় x = ২ একটি মূল।", { root: 2 }),
  ]),
  V("vieta-relations", "c11_12.04", "Vieta relations", "ভিয়েতার সম্পর্ক", "algebra-stepper", "algebraStepper", { mode: "vieta", coefficients: [1, -5, 6] }, [
    S("For x² − 5x + 6 = 0 the sum of roots is 5.", "x² − ৫x + ৬ = ০-এ মূলের যোগফল ৫।", { sum: 5 }),
    S("The product is 6, and the roots are 2 and 3.", "গুণফল ৬, মূল ২ ও ৩।", { product: 6 }),
  ]),
  V("cubic-roots-and-graph", "c11_12.04", "Cubic roots and graph", "ঘনমূল ও গ্রাফ", "function-graph", "functionGraph", { mode: "cubic-roots", expression: "x^3 - x" }, [
    S("x³ − x = x(x − 1)(x + 1) has three real roots.", "x³ − x = x(x − ১)(x + ১)-এর তিনটি বাস্তব মূল।", { roots: [-1, 0, 1] }),
    S("Changing to (x−1)³ gives one repeated root.", "(x−১)³ করলে একটি পুনরাবৃত্ত মূল হয়।", { repeated: true }),
  ]),
  V("multiplicity-of-roots", "c11_12.04", "Multiplicity of roots", "মূলের গুণিতকতা", "function-graph", "functionGraph", { mode: "multiplicity", expression: "(x-1)^2(x+2)" }, [
    S("At x = 1 the factor is squared, so the graph touches.", "x = ১-এ উৎপাদক বর্গ, তাই গ্রাফ স্পর্শ করে।", { touch: 1 }),
    S("At x = −2 the factor is single, so the graph crosses.", "x = −২-এ উৎপাদক একক, তাই গ্রাফ ছেদ করে।", { cross: -2 }),
  ]),
  V("complex-conjugate-root-pairs", "c11_12.04", "Complex conjugate root pairs", "জটিল অনুবন্ধী মূল জোড়া", "complex-plane", "complexPlane", { mode: "conjugate-roots", polynomial: "x^2 + 2x + 5" }, [
    S("The discriminant is 4 − 20 = −16.", "নিশ্চায়ক ৪ − ২০ = −১৬।", { discriminant: -16 }),
    S("Roots are −1 ± 2i, a conjugate pair.", "মূল −১ ± ২i, এক জোড়া অনুবন্ধী।", { roots: ["-1+2i", "-1-2i"] }),
  ]),
  V("solve-by-substitution", "c11_12.04", "Solve by substitution", "প্রতিস্থাপনে সমাধান", "algebra-stepper", "algebraStepper", { mode: "substitution", equation: "x^4 - 5x^2 + 4 = 0" }, [
    S("Let u = x², giving u² − 5u + 4 = 0.", "ধরি u = x², ফলে u² − ৫u + ৪ = ০।", { substitution: "u=x^2" }),
    S("u = 1 or 4, so x = ±1 or ±2.", "u = ১ বা ৪, তাই x = ±১ বা ±২।", { roots: [-2, -1, 1, 2] }),
  ]),
  V("polynomial-word-problems", "c11_12.04", "Polynomial word problems", "বহুপদীর শব্দ সমস্যা", "story-scene", "storyScene", { mode: "box-volume", length: "x", width: "x+2", height: "x-1" }, [
    S("Volume = x(x + 2)(x − 1).", "আয়তন = x(x + ২)(x − ১)।", { expression: "x(x+2)(x-1)" }),
    S("Expanding gives x³ + x² − 2x.", "বিস্তার করলে x³ + x² − ২x।", { expanded: "x^3 + x^2 - 2x" }),
  ]),
  V("pascals-triangle-builder", "c11_12.05", "Pascal triangle builder", "প্যাসকেল ত্রিভুজ নির্মাণ", "number-grid", "numberGrid", { mode: "pascal", rows: 6 }, [
    S("Row 6 is 1, 5, 10, 10, 5, 1.", "৬ষ্ঠ সারি ১, ৫, ১০, ১০, ৫, ১।", { row: [1, 5, 10, 10, 5, 1] }),
    S("Its sum is 2⁵ = 32.", "এর যোগফল ২⁵ = ৩২।", { sum: 32 }),
  ]),
  V("expand-binomial-stepper", "c11_12.05", "Expand a binomial", "দ্বিপদী বিস্তার", "algebra-stepper", "algebraStepper", { mode: "binomial-expand", n: 3 }, [
    S("(a+b)³ = a³ + 3a²b + 3ab² + b³.", "(a+b)³ = a³ + ৩a²b + ৩ab² + b³।", { expansion: true }),
    S("The coefficients 1, 3, 3, 1 come from Pascal row 3.", "সহগ ১, ৩, ৩, ১ প্যাসকেল সারি ৩ থেকে আসে।", { row: [1, 3, 3, 1] }),
  ]),
  V("combinatorial-meaning", "c11_12.05", "Combinatorial meaning", "সমাবেশগত অর্থ", "tree-diagram", "treeDiagram", { mode: "combination-tree", n: 4, r: 2 }, [
    S("Choosing 2 of 4 gives C(4,2) = 6.", "৪-এর মধ্যে ২ নির্বাচন C(৪,২) = ৬।", { combinations: 6 }),
    S("Each term a^{n−r}b^r marks one choice.", "প্রতিটি পদ a^{n−r}b^r একটি নির্বাচন নির্দেশ করে।", { term: true }),
  ]),
  V("general-term-finder", "c11_12.05", "General term finder", "সাধারণ পদ নির্ণয়", "algebra-stepper", "algebraStepper", { mode: "general-term", n: 6 }, [
    S("T_{r+1} = C(6,r) a^{6−r} b^r.", "T_{r+১} = C(৬,r) a^{৬−r} b^r।", { formula: true }),
    S("For r = 2 the coefficient is C(6,2) = 15.", "r = ২ হলে সহগ C(৬,২) = ১৫।", { coefficient: 15 }),
  ]),
  V("middle-and-independent-term", "c11_12.05", "Middle and independent term", "মধ্যপদ ও স্বাধীন পদ", "algebra-stepper", "algebraStepper", { mode: "middle-term", n: 6 }, [
    S("For (x + 1/x)^6 the middle term has r = 3.", "(x + ১/x)^৬-এর মধ্যপদে r = ৩।", { r: 3 }),
    S("Its coefficient is C(6,3) = 20.", "এর সহগ C(৬,৩) = ২০।", { coefficient: 20 }),
  ]),
  V("greatest-term-lab", "c11_12.05", "Greatest term lab", "বৃহত্তম পদ পরীক্ষা", "chart", "chart", { mode: "greatest-term", n: 8, p: 0.5 }, [
    S("Compare consecutive terms by their ratio.", "পরপর পদের অনুপাত দিয়ে তুলনা করো।", { compare: true }),
    S("The largest coefficient is C(8,4) = 70.", "সর্বোচ্চ সহগ C(৮,৪) = ৭০।", { greatest: 70 }),
  ]),
  V("negative-fractional-index", "c11_12.05", "Negative and fractional index", "ঋণাত্মক ও ভগ্নাংশ ঘাত", "algebra-stepper", "algebraStepper", { mode: "negative-index", exponent: -1, terms: 3 }, [
    S("(1 + x)^{−1} = 1 − x + x² − …", "(১ + x)^{−১} = ১ − x + x² − …", { series: true }),
    S("It converges only when |x| < 1.", "এটি কেবল |x| < ১ হলে অভিসৃত হয়।", { condition: "|x| < 1" }),
  ]),
  V("approximation-with-binomial", "c11_12.05", "Approximation with binomial", "দ্বিপদীতে আনুমানিক হিসাব", "chart", "chart", { mode: "binomial-approx", base: 1.01, power: 10 }, [
    S("(1 + 0.01)^10 ≈ 1 + 10(0.01) = 1.1.", "(১ + ০.০১)^১০ ≈ ১ + ১০(০.০১) = ১.১।", { firstOrder: 1.1 }),
    S("Including more terms gives about 1.1046.", "আরও পদ নিলে প্রায় ১.১০৪৬।", { value: 1.1046 }),
  ]),
  V("coefficient-sum-tricks", "c11_12.05", "Coefficient sum tricks", "সহগ যোগের কৌশল", "algebra-stepper", "algebraStepper", { mode: "coefficient-sum", expression: "(1+x)^5" }, [
    S("Put x = 1: the coefficient sum is 2⁵ = 32.", "x = ১ বসাও: সহগের যোগফল ২⁵ = ৩২।", { sum: 32 }),
    S("Put x = −1: the alternating sum is 0.", "x = −১ বসাও: একান্তর যোগফল ০।", { alternating: 0 }),
  ]),
  V("binomial-misconception", "c11_12.05", "Binomial misconception", "দ্বিপদীর ভুল ধারণা", "algebra-stepper", "algebraStepper", { mode: "misconception", a: 2, b: 3, n: 2 }, [
    S("(2+3)² = 25, not 2² + 3² = 13.", "(২+৩)² = ২৫, ২² + ৩² = ১৩ নয়।", { wrong: 13, correct: 25 }),
    S("Correct: (a+b)² = a² + 2ab + b².", "সঠিক: (a+b)² = a² + ২ab + b²।", { formula: true }),
  ]),
  V("cone-slice-explorer", "c11_12.06", "Cone slice explorer", "কোণ কাটা পরীক্ষা", "solid-3d", "solid3d", { mode: "cone-slice", angle: 0 }, [
    S("A horizontal slice of a cone gives a circle.", "কোণের অনুভূমিক কাটা বৃত্ত দেয়।", { conic: "circle" }),
    S("Tilting the cut gives ellipse, parabola, then hyperbola.", "কাটা হেলালে উপবৃত্ত, পরাবৃত্ত, তারপর অধিবৃত্ত।", { sequence: ["ellipse", "parabola", "hyperbola"] }),
  ]),
  V("circle-lab", "c11_12.06", "Circle lab", "বৃত্ত পরীক্ষা", "function-graph", "functionGraph", { mode: "circle", h: 2, k: -1, r: 3 }, [
    S("The equation is (x − 2)² + (y + 1)² = 9.", "সমীকরণ (x − ২)² + (y + ১)² = ৯।", { equation: true }),
    S("Centre (2, −1), radius 3.", "কেন্দ্র (২, −১), ব্যাসার্ধ ৩।", { centre: [2, -1], radius: 3 }),
  ]),
  V("parabola-focus-directrix", "c11_12.06", "Parabola focus and directrix", "পরাবৃত্তের ফোকাস ও দিকরেখা", "function-graph", "functionGraph", { mode: "parabola-definition", a: 1 }, [
    S("A parabola is equidistant from focus and directrix.", "পরাবৃত্ত ফোকাস ও দিকরেখা থেকে সমদূরবর্তী।", { definition: true }),
    S("For y² = 4ax, focus (a,0) and directrix x = −a.", "y² = ৪ax-এ ফোকাস (a,০) ও দিকরেখা x = −a।", { focus: [1, 0] }),
  ]),
  V("parabola-standard-forms", "c11_12.06", "Parabola standard forms", "পরাবৃত্তের প্রামাণ্য রূপ", "function-graph", "functionGraph", { mode: "parabola-forms", a: 2 }, [
    S("y² = 8x has focus (2,0).", "y² = ৮x-এর ফোকাস (২,০)।", { focus: [2, 0] }),
    S("The latus rectum length is 4a = 8.", "নাভিলম্বের দৈর্ঘ্য ৪a = ৮।", { latusRectum: 8 }),
  ]),
  V("ellipse-two-foci-string", "c11_12.06", "Ellipse two-foci string", "উপবৃত্তের দুই ফোকাস সুতা", "function-graph", "functionGraph", { mode: "ellipse-string", a: 5, b: 3 }, [
    S("The string keeps PF₁ + PF₂ constant at 2a = 10.", "সুতা PF₁ + PF₂ = ২a = ১০ স্থির রাখে।", { constant: 10 }),
    S("Here b² = a² − c² = 25 − 16 = 9.", "এখানে b² = a² − c² = ২৫ − ১৬ = ৯।", { b: 3 }),
  ]),
  V("ellipse-eccentricity", "c11_12.06", "Ellipse eccentricity", "উপবৃত্তের উৎকেন্দ্রতা", "function-graph", "functionGraph", { mode: "eccentricity", a: 5, c: 3 }, [
    S("e = c/a = 3/5 = 0.6.", "e = c/a = ৩/৫ = ০.৬।", { e: 0.6 }),
    S("As e → 0 it becomes a circle; as e → 1 it flattens.", "e → ০ হলে বৃত্ত; e → ১ হলে চ্যাপ্টা হয়।", { limits: [0, 1] }),
  ]),
  V("hyperbola-difference-of-distances", "c11_12.06", "Hyperbola difference of distances", "অধিবৃত্তের দূরত্বের পার্থক্য", "function-graph", "functionGraph", { mode: "hyperbola", a: 3, b: 4 }, [
    S("|PF₁ − PF₂| = 2a = 6.", "|PF₁ − PF₂| = ২a = ৬।", { constant: 6 }),
    S("The asymptotes are y = ±(b/a)x = ±(4/3)x.", "অনুস্পর্শক y = ±(b/a)x = ±(৪/৩)x।", { asymptotes: "4/3" }),
  ]),
  V("eccentricity-unifier", "c11_12.06", "Eccentricity unifier", "উৎকেন্দ্রতা একীকরণ", "function-graph", "functionGraph", { mode: "conic-e", e: 1 }, [
    S("e < 1 ellipse, e = 1 parabola, e > 1 hyperbola.", "e < ১ উপবৃত্ত, e = ১ পরাবৃত্ত, e > ১ অধিবৃত্ত।", { cases: true }),
    S("One slider moves through all three conic types.", "একটি স্লাইডার তিন কনিক ধরনের মধ্য দিয়ে যায়।", { slider: true }),
  ]),
  V("tangent-and-normal", "c11_12.06", "Tangent and normal", "স্পর্শক ও অভিলম্ব", "function-graph", "functionGraph", { mode: "tangent-normal", expression: "x^2", x: 1 }, [
    S("At (1,1) the slope is 2, so the tangent is y = 2x − 1.", "(১,১)-এ ঢাল ২, তাই স্পর্শক y = ২x − ১।", { tangent: "y=2x-1" }),
    S("The normal has slope −1/2.", "অভিলম্বের ঢাল −১/২।", { normalSlope: -0.5 }),
  ]),
  V("reflective-property", "c11_12.06", "Reflective property", "প্রতিফলন ধর্ম", "physics-scene", "physicsScene", { mode: "focus-reflection", shape: "parabola" }, [
    S("Rays from the focus reflect parallel to the axis.", "ফোকাস থেকে রশ্মি অক্ষের সমান্তরালে প্রতিফলিত হয়।", { focus: true }),
    S("This is used in headlights and satellite dishes.", "এটি হেডলাইট ও স্যাটেলাইট ডিশে ব্যবহৃত হয়।", { application: "headlights" }),
  ]),
  V("parametric-form", "c11_12.06", "Conic parametric form", "কনিকের পরামিতিক রূপ", "parametric-polar", "parametricPolar", { mode: "conic-parametric", a: 2 }, [
    S("For y² = 4ax the point is (at², 2at).", "y² = ৪ax-এর বিন্দু (at², ২at)।", { parametric: true }),
    S("From a = 2, t = 2, we get the point (8,8).", "a = ২, t = ২ হলে বিন্দু (৮,৮)।", { point: [8, 8] }),
  ]),
  V("general-conic-classifier", "c11_12.06", "General conic classifier", "সাধারণ কনিক শ্রেণিবিন্যাস", "function-graph", "functionGraph", { mode: "conic-classifier", A: 1, B: 0, C: -1 }, [
    S("The discriminant is B² − 4AC = 0 + 4 = 4.", "নিশ্চায়ক B² − ৪AC = ০ + ৪ = ৪।", { discriminant: 4 }),
    S("Since it is positive, the conic is a hyperbola.", "যেহেতু ধনাত্মক, কনিকটি অধিবৃত্ত।", { conic: "hyperbola" }),
  ]),
  V("conic-real-world", "c11_12.06", "Conics in the real world", "বাস্তব জগতে কনিক", "story-scene", "storyScene", { mode: "conic-world" }, [
    S("Planetary orbits are ellipses.", "গ্রহের কক্ষপথ উপবৃত্ত।", { orbit: "ellipse" }),
    S("Parabolic mirrors focus light and sound.", "পরাবৃত্তীয় দর্পণ আলো ও শব্দ কেন্দ্রীভূত করে।", { mirror: "parabola" }),
  ]),
  V("restricting-the-domain", "c11_12.07", "Restricting the domain", "ডোমেইন সীমিত করা", "function-graph", "functionGraph", { mode: "restrict-domain", fn: "sin" }, [
    S("sin is many-to-one, so restrict it to [−π/2, π/2].", "sin বহু-এক, তাই [−π/২, π/২]-এ সীমিত করো।", { domain: "[-pi/2, pi/2]" }),
    S("On that interval it is one-to-one and invertible.", "সেই ব্যবধিতে এটি এক-এক ও বিপরীতযোগ্য।", { invertible: true }),
  ]),
  V("inverse-function-mirror", "c11_12.07", "Inverse function mirror", "বিপরীত ফাংশনের দর্পণ", "function-graph", "functionGraph", { mode: "inverse-mirror", fn: "sin" }, [
    S("Reflect y = sin x in the line y = x.", "y = sin x-কে y = x রেখায় প্রতিফলিত করো।", { reflection: true }),
    S("The result y = sin⁻¹ x has range [−π/2, π/2].", "ফল y = sin⁻¹ x, রেঞ্জ [−π/২, π/২]।", { range: "[-pi/2, pi/2]" }),
  ]),
  V("principal-value-ranges", "c11_12.07", "Principal value ranges", "প্রধান মানের রেঞ্জ", "function-graph", "functionGraph", { mode: "principal-ranges" }, [
    S("sin⁻¹ has range [−π/2, π/2]; cos⁻¹ has [0, π].", "sin⁻¹-এর রেঞ্জ [−π/২, π/২]; cos⁻¹-এর [০, π]।", { sin: "[-pi/2, pi/2]", cos: "[0, pi]" }),
    S("tan⁻¹ has range (−π/2, π/2).", "tan⁻¹-এর রেঞ্জ (−π/২, π/২)।", { tan: "(-pi/2, pi/2)" }),
  ]),
  V("inverse-identities", "c11_12.07", "Inverse identities", "বিপরীত অভেদ", "parametric-polar", "parametricPolar", { mode: "inverse-identity", value: 0.5 }, [
    S("sin⁻¹ x + cos⁻¹ x = π/2 for −1 ≤ x ≤ 1.", "−১ ≤ x ≤ ১-এ sin⁻¹ x + cos⁻¹ x = π/২।", { formula: true }),
    S("For x = 0.5: 30° + 60° = 90°.", "x = ০.৫ হলে: ৩০° + ৬০° = ৯০°।", { sum: 90 }),
  ]),
  V("tan-inverse-addition", "c11_12.07", "tan inverse addition", "tan বিপরীতের যোগ", "geometry-board", "geometryBoard", { mode: "tan-addition", a: 0.5, b: 0.5 }, [
    S("tan⁻¹a + tan⁻¹b = tan⁻¹((a+b)/(1−ab)).", "tan⁻¹a + tan⁻¹b = tan⁻¹((a+b)/(১−ab))।", { formula: true }),
    S("Here (0.5+0.5)/(1−0.25) = 4/3.", "এখানে (০.৫+০.৫)/(১−০.২৫) = ৪/৩।", { value: "4/3" }),
  ]),
  V("trig-equation-unit-circle", "c11_12.07", "Trig equations on the unit circle", "একক বৃত্তে ত্রিকোণ সমীকরণ", "parametric-polar", "parametricPolar", { mode: "trig-equation", fn: "sin", value: 0.5 }, [
    S("sin θ = 0.5 has reference angle 30°.", "sin θ = ০.৫-এর প্রসঙ্গ কোণ ৩০°।", { reference: 30 }),
    S("Solutions in [0, 2π) are 30° and 150°.", "[০, ২π)-এ সমাধান ৩০° ও ১৫০°।", { solutions: [30, 150] }),
  ]),
  V("general-solution-generator", "c11_12.07", "General solution generator", "সাধারণ সমাধান নির্মাণ", "parametric-polar", "parametricPolar", { mode: "general-solution", fn: "sin", value: 0.5 }, [
    S("General solution: θ = nπ + (−1)ⁿ(π/6).", "সাধারণ সমাধান: θ = nπ + (−১)ⁿ(π/৬)।", { formula: true }),
    S("This captures 30°, 150°, 390°, …", "এতে ৩০°, ১৫০°, ৩৯০°, … ধরা পড়ে।", { family: true }),
  ]),
  V("graph-intersection-method", "c11_12.07", "Graph intersection method", "গ্রাফ ছেদ পদ্ধতি", "function-graph", "functionGraph", { mode: "graph-intersection", lhs: "sin x", rhs: "0.5" }, [
    S("Graph y = sin x and y = 0.5.", "y = sin x ও y = ০.৫ আঁকো।", { graphs: true }),
    S("Each intersection point is a solution.", "প্রতিটি ছেদবিন্দু একটি সমাধান।", { solution: true }),
  ]),
  V("equation-types-stepper", "c11_12.07", "Equation types stepper", "সমীকরণের ধরন ধাপে ধাপে", "algebra-stepper", "algebraStepper", { mode: "trig-equation-types", equation: "2cos^2 x - cos x = 0" }, [
    S("Factor: cos x(2cos x − 1) = 0.", "উৎপাদকে ভাঙো: cos x(২cos x − ১) = ০।", { factor: true }),
    S("So cos x = 0 or cos x = 1/2.", "তাই cos x = ০ বা cos x = ১/২।", { cases: [0, 0.5] }),
  ]),
  V("extraneous-solutions", "c11_12.07", "Extraneous solutions", "অতিরিক্ত সমাধান", "algebra-stepper", "algebraStepper", { mode: "extraneous", equation: "sqrt(2x+3) = x" }, [
    S("Squaring gives 2x + 3 = x².", "বর্গ করলে ২x + ৩ = x²।", { squared: true }),
    S("x = 3 works, but x = −1 is extraneous.", "x = ৩ কাজ করে, কিন্তু x = −১ অতিরিক্ত।", { valid: 3, extraneous: -1 }),
  ]),
  V("real-world-waves", "c11_12.07", "Real-world waves", "বাস্তব জগতের তরঙ্গ", "physics-scene", "physicsScene", { mode: "wave", amplitude: 1, frequency: 2 }, [
    S("Tides repeat about every 12 hours.", "জোয়ার প্রায় প্রতি ১২ ঘণ্টায় পুনরাবৃত্ত হয়।", { period: 12 }),
    S("Sound is a sine wave with fixed frequency and amplitude.", "শব্দ একটি সাইন তরঙ্গ, নির্দিষ্ট কম্পাঙ্ক ও বিস্তার।", { wave: true }),
  ]),
  V("force-as-vector", "c11_12.08", "Force as a vector", "বল ভেক্টর হিসেবে", "vector-field", "vectorField", { mode: "force-vector", forces: [[5, 0], [0, 12]] }, [
    S("Forces add as vectors.", "বল ভেক্টরের মতো যোগ হয়।", { vectors: true }),
    S("The resultant of (5,0) and (0,12) has magnitude 13.", "(৫,০) ও (০,১২)-এর লব্ধির মান ১৩।", { magnitude: 13 }),
  ]),
  V("parallelogram-triangle-law", "c11_12.08", "Parallelogram and triangle law", "সামান্তরিক ও ত্রিভুজ নিয়ম", "vector-field", "vectorField", { mode: "parallelogram-law", a: [3, 1], b: [1, 2] }, [
    S("Complete the parallelogram; the diagonal is the resultant.", "সামান্তরিক সম্পূর্ণ করো; কর্ণই লব্ধি।", { diagonal: true }),
    S("Resultant = (3+1, 1+2) = (4,3).", "লব্ধি = (৩+১, ১+২) = (৪,৩)।", { resultant: [4, 3] }),
  ]),
  V("resolve-components", "c11_12.08", "Resolve into components", "উপাংশে বিভাজন", "vector-field", "vectorField", { mode: "resolve", magnitude: 10, angle: 30 }, [
    S("Horizontal component = 10 cos 30° = 5√3.", "অনুভূমিক উপাংশ = ১০ cos ৩০° = ৫√৩।", { horizontal: "5sqrt(3)" }),
    S("Vertical component = 10 sin 30° = 5.", "উল্লম্ব উপাংশ = ১০ sin ৩০° = ৫।", { vertical: 5 }),
  ]),
  V("equilibrium-of-particle", "c11_12.08", "Equilibrium of a particle", "কণার ভারসাম্য", "physics-scene", "physicsScene", { mode: "equilibrium", forces: [[3, 0], [-3, 0], [0, 4], [0, -4]] }, [
    S("Equilibrium needs zero net force.", "ভারসাম্যে মোট বল শূন্য হতে হবে।", { net: [0, 0] }),
    S("The upward and downward forces cancel here.", "এখানে ওপর ও নিচের বল পরস্পর বাতিল হয়।", { cancel: true }),
  ]),
  V("lami-theorem", "c11_12.08", "Lami theorem", "লামির উপপাদ্য", "vector-field", "vectorField", { mode: "lami", angles: [120, 120, 120] }, [
    S("Lami: P/sin α = Q/sin β = R/sin γ.", "লামি: P/sin α = Q/sin β = R/sin γ।", { formula: true }),
    S("For three equal forces at 120°, the ratios match.", "১২০°-এ তিনটি সমান বলে অনুপাতগুলো সমান।", { equal: true }),
  ]),
  V("friction-and-limiting", "c11_12.08", "Friction and limiting", "ঘর্ষণ ও সীমা", "physics-scene", "physicsScene", { mode: "friction", mu: 0.4, normal: 50 }, [
    S("Limiting friction = μN = 0.4 × 50 = 20 N.", "সীমা ঘর্ষণ = μN = ০.৪ × ৫০ = ২০ N।", { friction: 20 }),
    S("The angle of friction has tan θ = μ.", "ঘর্ষণ কোণে tan θ = μ।", { tan: 0.4 }),
  ]),
  V("inclined-plane-lab", "c11_12.08", "Inclined plane lab", "হেলানো তল পরীক্ষা", "physics-scene", "physicsScene", { mode: "incline", angle: 30, mass: 2 }, [
    S("Component down the slope = mg sin 30°.", "ঢাল বরাবর উপাংশ = mg sin ৩০°।", { component: "mg sin 30" }),
    S("With m = 2 and g = 10, it is 10 N.", "m = ২ ও g = ১০ হলে তা ১০ N।", { force: 10 }),
  ]),
  V("moment-of-force", "c11_12.08", "Moment of a force", "বলের ভ্রামক", "physics-scene", "physicsScene", { mode: "moment", force: 10, distance: 3 }, [
    S("Moment = force × perpendicular distance.", "ভ্রামক = বল × লম্ব দূরত্ব।", { formula: true }),
    S("Here the moment is 10 × 3 = 30 N·m.", "এখানে ভ্রামক ১০ × ৩ = ৩০ N·m।", { moment: 30 }),
  ]),
  V("parallel-forces-and-couple", "c11_12.08", "Parallel forces and couple", "সমান্তরাল বল ও যুগল", "physics-scene", "physicsScene", { mode: "couple", force: 8, distance: 2 }, [
    S("A couple is two equal, opposite, parallel forces.", "যুগল হলো দুইটি সমান, বিপরীত, সমান্তরাল বল।", { couple: true }),
    S("Its moment is 8 × 2 = 16 N·m.", "এর ভ্রামক ৮ × ২ = ১৬ N·m।", { moment: 16 }),
  ]),
  V("rigid-body-equilibrium", "c11_12.08", "Rigid body equilibrium", "দৃঢ় বস্তুর ভারসাম্য", "physics-scene", "physicsScene", { mode: "ladder", length: 5, angle: 60 }, [
    S("A ladder needs force and moment balance.", "মইয়ের জন্য বল ও ভ্রামকের ভারসাম্য দরকার।", { balance: true }),
    S("Taking moments about the foot removes the ground reaction.", "পাদবিন্দু সম্পর্কে ভ্রামক নিলে ভূমির প্রতিক্রিয়া বাদ পড়ে।", { about: "foot" }),
  ]),
  V("centre-of-gravity", "c11_12.08", "Centre of gravity", "মাধ্যাকর্ষণ কেন্দ্র", "physics-scene", "physicsScene", { mode: "centre-of-gravity", parts: [[2, 1], [3, 1]] }, [
    S("Treat composite bodies as point masses at their centres.", "যৌগিক বস্তুকে তাদের কেন্দ্রে বিন্দু ভর ধরো।", { composite: true }),
    S("The centroid is the mass-weighted average position.", "ভরকেন্দ্র হলো ভর-ভারযুক্ত গড় অবস্থান।", { centroid: true }),
  ]),
  V("free-body-diagram-trainer", "c11_12.08", "Free body diagram trainer", "মুক্ত বস্তু চিত্র প্রশিক্ষণ", "physics-scene", "physicsScene", { mode: "free-body", surface: "incline" }, [
    S("Show weight, normal, friction and any applied force.", "ওজন, অভিলম্ব, ঘর্ষণ ও প্রযুক্ত বল দেখাও।", { forces: true }),
    S("A missing normal force is a common mistake.", "অভিলম্ব বল বাদ পড়া একটি সাধারণ ভুল।", { misconception: true }),
  ]),
  V("position-velocity-acceleration", "c11_12.09", "Position, velocity, acceleration", "অবস্থান, বেগ, ত্বরণ", "physics-scene", "physicsScene", { mode: "kinematics", r: [2, 3] }, [
    S("Velocity is the derivative of position.", "বেগ হলো অবস্থানের অন্তরজ।", { derivative: "v=dr/dt" }),
    S("Acceleration is the derivative of velocity.", "ত্বরণ হলো বেগের অন্তরজ।", { derivative: "a=dv/dt" }),
  ]),
  V("projectile-lab", "c11_12.09", "Projectile lab", "প্রক্ষিপ্ত পরীক্ষা", "physics-scene", "physicsScene", { mode: "projectile", speed: 20, angle: 45 }, [
    S("Resolve the launch velocity into x and y components.", "নিক্ষেপ বেগকে x ও y উপাংশে ভাগ করো।", { components: true }),
    S("Range R = v² sin 2θ / g ≈ 40 m.", "পাল্লা R = v² sin ২θ / g ≈ ৪০ m।", { range: 40 }),
  ]),
  V("projectile-components", "c11_12.09", "Projectile components", "প্রক্ষিপ্তের উপাংশ", "physics-scene", "physicsScene", { mode: "projectile-components", speed: 20, angle: 45 }, [
    S("v_x = 20 cos 45° ≈ 14.1 m/s.", "v_x = ২০ cos ৪৫° ≈ ১৪.১ m/s।", { vx: 14.1 }),
    S("v_y = 20 sin 45° ≈ 14.1 m/s.", "v_y = ২০ sin ৪৫° ≈ ১৪.১ m/s।", { vy: 14.1 }),
  ]),
  V("range-height-time-of-flight", "c11_12.09", "Range, height and time of flight", "পাল্লা, উচ্চতা ও উড্ডয়নকাল", "function-graph", "functionGraph", { mode: "projectile-formulas", speed: 20, angle: 45 }, [
    S("Time of flight T = 2v sin θ / g = 2√2 s.", "উড্ডয়নকাল T = ২v sin θ / g = ২√২ s।", { T: "2sqrt(2)" }),
    S("Maximum height H = v² sin²θ / (2g) = 10 m.", "সর্বোচ্চ উচ্চতা H = v² sin²θ / (২g) = ১০ m।", { H: 10 }),
  ]),
  V("maximum-range-45", "c11_12.09", "Maximum range at 45 degrees", "৪৫ ডিগ্রিতে সর্বোচ্চ পাল্লা", "function-graph", "functionGraph", { mode: "range-angle", speed: 20 }, [
    S("On level ground the range is largest at 45°.", "সমতল ভূমিতে ৪৫°-এ পাল্লা সর্বোচ্চ।", { angle: 45 }),
    S("This is because sin 2θ = 1 at θ = 45°.", "কারণ θ = ৪৫°-এ sin ২θ = ১।", { sin2theta: 1 }),
  ]),
  V("projectile-on-incline", "c11_12.09", "Projectile on an incline", "ঢালে প্রক্ষিপ্ত", "physics-scene", "physicsScene", { mode: "projectile-incline", angle: 30 }, [
    S("Use axes along and perpendicular to the slope.", "ঢাল বরাবর ও লম্ব অক্ষ ব্যবহার করো।", { axes: true }),
    S("The range formula changes on a slope.", "ঢালে পাল্লার সূত্র বদলে যায়।", { range: "changes" }),
  ]),
  V("relative-velocity-river", "c11_12.09", "Relative velocity: river", "আপেক্ষিক বেগ: নদী", "physics-scene", "physicsScene", { mode: "river-crossing", boat: 4, river: 3 }, [
    S("Aim upstream so the drift cancels.", "স্রোতের বিপরীতে লক্ষ্য রাখলে অপসারণ বাতিল হয়।", { aim: "upstream" }),
    S("The crossing speed is √(4² − 3²) = √7.", "পার হওয়ার গতি √(৪² − ৩²) = √৭।", { speed: "sqrt(7)" }),
  ]),
  V("relative-velocity-rain", "c11_12.09", "Relative velocity: rain", "আপেক্ষিক বেগ: বৃষ্টি", "physics-scene", "physicsScene", { mode: "rain-person", rain: 5, walk: 3 }, [
    S("Rain relative to the walker = rain velocity − walker velocity.", "চলন্ত ব্যক্তির সাপেক্ষে বৃষ্টি = বৃষ্টির বেগ − ব্যক্তির বেগ।", { relative: true }),
    S("The relative speed is √(5² + 3²) = √34.", "আপেক্ষিক গতি √(৫² + ৩²) = √৩৪।", { speed: "sqrt(34)" }),
  ]),
  V("equations-of-motion", "c11_12.09", "Equations of motion", "গতির সমীকরণ", "chart", "chart", { mode: "motion-graphs", u: 0, a: 2, t: 5 }, [
    S("v = u + at = 0 + 2 × 5 = 10 m/s.", "v = u + at = ০ + ২ × ৫ = ১০ m/s।", { v: 10 }),
    S("s = ut + ½at² = 0 + ½ × 2 × 25 = 25 m.", "s = ut + ½at² = ০ + ½ × ২ × ২৫ = ২৫ m।", { s: 25 }),
  ]),
  V("variable-acceleration-integration", "c11_12.09", "Variable acceleration by integration", "সমাকলনে পরিবর্তনশীল ত্বরণ", "function-graph", "functionGraph", { mode: "variable-acceleration", a: "6t" }, [
    S("v = ∫a dt = ∫6t dt = 3t² + C.", "v = ∫a dt = ∫৬t dt = ৩t² + C।", { velocity: "3t^2 + C" }),
    S("With u = 0, v = 3t².", "u = ০ হলে v = ৩t²।", { velocity: "3t^2" }),
  ]),
  V("collision-and-interception", "c11_12.09", "Collision and interception", "সংঘর্ষ ও অভিগমন", "physics-scene", "physicsScene", { mode: "interception", v1: 5, v2: 3 }, [
    S("Set the positions equal to find the meeting time.", "মিলনের সময় পেতে অবস্থান সমান করো।", { method: "equate" }),
    S("They meet when 5t = 20 + 3t, so t = 10 s.", "৫t = ২০ + ৩t হলে t = ১০ s।", { time: 10 }),
  ]),
  V("free-fall-and-vertical-motion", "c11_12.09", "Free fall and vertical motion", "মুক্ত পতন ও উল্লম্ব গতি", "physics-scene", "physicsScene", { mode: "free-fall", u: 20, g: 10 }, [
    S("Time to the top: v = u − gt = 0, so t = 2 s.", "শীর্ষে যেতে: v = u − gt = ০, তাই t = ২ s।", { time: 2 }),
    S("Height reached = u²/(2g) = 400/20 = 20 m.", "উচ্চতা = u²/(২g) = ৪০০/২০ = ২০ m।", { height: 20 }),
  ]),
  V("range-iqr-lab", "c11_12.10", "Range and IQR lab", "পরিসর ও IQR পরীক্ষা", "chart", "chart", { mode: "range-iqr", values: [4, 7, 8, 9, 12, 15, 18] }, [
    S("Range = max − min = 18 − 4 = 14.", "পরিসর = সর্বোচ্চ − সর্বনিম্ন = ১৮ − ৪ = ১৪।", { range: 14 }),
    S("Q1 = 7 and Q3 = 15, so IQR = 8.", "Q১ = ৭ ও Q৩ = ১৫, তাই IQR = ৮।", { iqr: 8 }),
  ]),
  V("variance-standard-deviation", "c11_12.10", "Variance and standard deviation", "বিচরণ ও আদর্শ বিচ্যুতি", "chart", "chart", { mode: "variance", values: [2, 4, 4, 4, 5, 5, 7, 9] }, [
    S("Mean = 40/8 = 5.", "গড় = ৪০/৮ = ৫।", { mean: 5 }),
    S("Variance = 32/8 = 4, so SD = 2.", "বিচরণ = ৩২/৮ = ৪, তাই SD = ২।", { variance: 4, sd: 2 }),
  ]),
  V("mean-deviation-vs-sd", "c11_12.10", "Mean deviation vs SD", "গড় বিচ্যুতি বনাম SD", "chart", "chart", { mode: "mean-deviation", values: [2, 4, 6, 8] }, [
    S("Mean deviation uses |x − mean|.", "গড় বিচ্যুতি |x − গড়| ব্যবহার করে।", { meanDeviation: true }),
    S("SD uses squares, so large deviations weigh more.", "SD বর্গ ব্যবহার করে, তাই বড় বিচ্যুতির ভার বেশি।", { sd: true }),
  ]),
  V("grouped-data-dispersion", "c11_12.10", "Grouped data dispersion", "শ্রেণিবদ্ধ উপাত্তের বিচ্ছুরণ", "chart", "chart", { mode: "grouped-dispersion", classes: [[0, 10], [10, 20], [20, 30]], freq: [2, 5, 3] }, [
    S("Use class midpoints 5, 15 and 25.", "শ্রেণি মধ্যবিন্দু ৫, ১৫ ও ২৫ ব্যবহার করো।", { midpoints: [5, 15, 25] }),
    S("Weighted mean = (10+75+75)/10 = 16.", "ভারযুক্ত গড় = (১০+৭৫+৭৫)/১০ = ১৬।", { mean: 16 }),
  ]),
  V("coefficient-of-variation", "c11_12.10", "Coefficient of variation", "বিচরণের সহগ", "chart", "chart", { mode: "cv", mean1: 50, sd1: 5, mean2: 80, sd2: 10 }, [
    S("CV = SD/mean × 100.", "CV = SD/গড় × ১০০।", { formula: true }),
    S("Set 1 is 10%, set 2 is 12.5%, so set 1 is more consistent.", "১ম সেট ১০%, ২য় ১২.৫%, তাই ১ম বেশি স্থিতিশীল।", { cv1: 10, cv2: 12.5 }),
  ]),
  V("sample-space-builder", "c11_12.10", "Sample space builder", "নমুনা স্থান নির্মাণ", "tree-diagram", "treeDiagram", { mode: "sample-space", coins: 2 }, [
    S("Two coins give HH, HT, TH and TT.", "দুই মুদ্রায় HH, HT, TH ও TT।", { outcomes: 4 }),
    S("There are 2² = 4 equally likely outcomes.", "২² = ৪টি সমসম্ভাব্য ফলাফল।", { total: 4 }),
  ]),
  V("dice-coins-simulator", "c11_12.10", "Dice and coins simulator", "ছক্কা ও মুদ্রা সিমুলেটর", "prob-sim", "probSim", { mode: "dice-coins", trials: 100 }, [
    S("Theoretical P(head) = 1/2.", "তাত্ত্বিক P(হেড) = ১/২।", { theoretical: 0.5 }),
    S("More trials bring the experimental ratio near 1/2.", "পরীক্ষা বাড়লে পরীক্ষালব্ধ অনুপাত ১/২-এর কাছে আসে।", { law: "large numbers" }),
  ]),
  V("conditional-probability-tree", "c11_12.10", "Conditional probability tree", "শর্তাধীন সম্ভাবনার বৃক্ষ", "tree-diagram", "treeDiagram", { mode: "conditional", pA: 0.5, pBgivenA: 0.4 }, [
    S("P(A ∩ B) = P(A) × P(B|A).", "P(A ∩ B) = P(A) × P(B|A)।", { formula: true }),
    S("= 0.5 × 0.4 = 0.2.", "= ০.৫ × ০.৪ = ০.২।", { probability: 0.2 }),
  ]),
  V("bayes-theorem-lab", "c11_12.10", "Bayes theorem lab", "বেইস উপপাদ্য পরীক্ষা", "tree-diagram", "treeDiagram", { mode: "bayes", prevalence: 0.01, sensitivity: 0.9, falsePositive: 0.05 }, [
    S("P(disease|positive) = P(pos|disease)P(disease)/P(pos).", "P(রোগ|পজিটিভ) = P(পজিটিভ|রোগ)P(রোগ)/P(পজিটিভ)।", { formula: true }),
    S("= 0.009/(0.009+0.0495) ≈ 0.154.", "= ০.০০৯/(০.০০৯+০.০৪৯৫) ≈ ০.১৫৪।", { posterior: 0.154 }),
  ]),
  V("independent-vs-mutually-exclusive", "c11_12.10", "Independent vs mutually exclusive", "স্বাধীন বনাম পারস্পরিক একচেটিয়া", "venn-set", "vennSet", { mode: "independent-exclusive", pA: 0.4, pB: 0.5 }, [
    S("Mutually exclusive means P(A ∩ B) = 0.", "পারস্পরিক একচেটিয়া মানে P(A ∩ B) = ০।", { exclusive: 0 }),
    S("Independent means P(A ∩ B) = P(A)P(B) = 0.2.", "স্বাধীন মানে P(A ∩ B) = P(A)P(B) = ০.২।", { independent: 0.2 }),
  ]),
  V("addition-and-multiplication-rule", "c11_12.10", "Addition and multiplication rule", "যোগ ও গুণের নিয়ম", "venn-set", "vennSet", { mode: "addition-rule", pA: 0.4, pB: 0.5, pBoth: 0.2 }, [
    S("P(A ∪ B) = P(A) + P(B) − P(A ∩ B).", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)।", { formula: true }),
    S("= 0.4 + 0.5 − 0.2 = 0.7.", "= ০.৪ + ০.৫ − ০.২ = ০.৭।", { union: 0.7 }),
  ]),
  V("random-variable-distribution", "c11_12.10", "Random variable distribution", "দৈব চলকের বণ্টন", "chart", "chart", { mode: "random-variable", values: [0, 1, 2], probs: [0.25, 0.5, 0.25] }, [
    S("E(X) = Σ x P(x) = 0 + 0.5 + 0.5 = 1.", "E(X) = Σ x P(x) = ০ + ০.৫ + ০.৫ = ১।", { expectation: 1 }),
    S("The expectation is the balance point.", "প্রত্যাশা হলো ভারসাম্য বিন্দু।", { balance: true }),
  ]),
  V("binomial-distribution-lab", "c11_12.10", "Binomial distribution lab", "দ্বিপদী বণ্টন পরীক্ষা", "prob-sim", "probSim", { mode: "binomial", n: 10, p: 0.5 }, [
    S("P(X = k) = C(n,k) p^k (1−p)^{n−k}.", "P(X = k) = C(n,k) p^k (১−p)^{n−k}।", { formula: true }),
    S("The mean is np = 10 × 0.5 = 5.", "গড় np = ১০ × ০.৫ = ৫।", { mean: 5 }),
  ]),
  V("birthday-problem", "c11_12.10", "Birthday problem", "জন্মদিনের সমস্যা", "prob-sim", "probSim", { mode: "birthday", people: 23 }, [
    S("P(shared) = 1 − 365×364×…/365ⁿ.", "P(একই জন্মদিন) = ১ − ৩৬৫×৩৬৪×…/৩৬৫ⁿ।", { formula: true }),
    S("With 23 people it is about 50.7%.", "২৩ জনে এটি প্রায় ৫০.৭%।", { probability: 0.507 }),
  ]),
  V("gambler-fallacy", "c11_12.10", "Gambler fallacy", "জুয়ারির ভ্রান্তি", "prob-sim", "probSim", { mode: "gambler", flips: 10 }, [
    S("Independent tosses have no memory.", "স্বাধীন টসের কোনো স্মৃতি নেই।", { independent: true }),
    S("After five heads, P(head) is still 1/2.", "পাঁচ হেডের পরেও P(হেড) এখনো ১/২।", { probability: 0.5 }),
  ]),
  V("vector-basics-2d", "c11_12.11", "Vector basics in 2D", "দ্বিমাত্রায় ভেক্টরের মূল বিষয়", "vector-field", "vectorField", { mode: "vector-basics", a: [3, 4] }, [
    S("Magnitude |a| = √(3²+4²) = 5.", "মান |a| = √(৩²+৪²) = ৫।", { magnitude: 5 }),
    S("Unit vector = (3/5, 4/5).", "একক ভেক্টর = (৩/৫, ৪/৫)।", { unit: [0.6, 0.8] }),
  ]),
  V("addition-subtraction-scalar", "c11_12.11", "Addition, subtraction and scalar", "যোগ, বিয়োগ ও স্কেলার", "vector-field", "vectorField", { mode: "vector-add", a: [3, 1], b: [1, 2] }, [
    S("a + b = (4,3).", "a + b = (৪,৩)।", { sum: [4, 3] }),
    S("a − b = (2,−1).", "a − b = (২,−১)।", { difference: [2, -1] }),
  ]),
  V("position-vector-section-formula", "c11_12.11", "Section formula", "বিভাজন সূত্র", "vector-field", "vectorField", { mode: "section-formula", a: [0, 0], b: [6, 3], ratio: [1, 2] }, [
    S("Use (m b + n a)/(m + n) for internal division.", "অন্তর্বিভাজনে (m b + n a)/(m + n) ব্যবহার করো।", { formula: true }),
    S("With ratio 1:2 the point is (2,1).", "অনুপাত ১:২ হলে বিন্দু (২,১)।", { point: [2, 1] }),
  ]),
  V("dot-product-projection", "c11_12.11", "Dot product and projection", "ডট গুণ ও অভিক্ষেপ", "vector-field", "vectorField", { mode: "dot-product", a: [3, 4], b: [1, 0] }, [
    S("a·b = 3×1 + 4×0 = 3.", "a·b = ৩×১ + ৪×০ = ৩।", { dot: 3 }),
    S("Projection length of a on b is a·b/|b| = 3.", "b-এর উপর a-এর অভিক্ষেপের দৈর্ঘ্য a·b/|b| = ৩।", { projection: 3 }),
  ]),
  V("dot-product-zero-perpendicular", "c11_12.11", "Zero dot product means perpendicular", "ডট গুণ শূন্য মানে লম্ব", "vector-field", "vectorField", { mode: "perpendicular", a: [3, 4], b: [4, -3] }, [
    S("a·b = 12 − 12 = 0.", "a·b = ১২ − ১২ = ০।", { dot: 0 }),
    S("Zero dot product means the vectors are perpendicular.", "ডট গুণ শূন্য মানে ভেক্টরদ্বয় লম্ব।", { perpendicular: true }),
  ]),
  V("cross-product-3d", "c11_12.11", "Cross product in 3D", "ত্রিমাত্রায় ক্রস গুণ", "solid-3d", "solid3d", { mode: "cross-product", a: [1, 0, 0], b: [0, 1, 0] }, [
    S("By the right-hand rule, a × b = (0,0,1).", "ডান-হাত নিয়মে, a × b = (০,০,১)।", { cross: [0, 0, 1] }),
    S("Its magnitude 1 is the area of the unit square.", "এর মান ১ একক বর্গের ক্ষেত্রফল।", { area: 1 }),
  ]),
  V("scalar-triple-product-volume", "c11_12.11", "Scalar triple product volume", "স্কেলার ত্রিগুণফল আয়তন", "solid-3d", "solid3d", { mode: "triple-product", a: [1, 0, 0], b: [0, 1, 0], c: [0, 0, 1] }, [
    S("[a b c] = a·(b × c) = 1.", "[a b c] = a·(b × c) = ১।", { triple: 1 }),
    S("The parallelepiped volume is 1 cubic unit.", "সমান্তরালকটির আয়তন ১ ঘন একক।", { volume: 1 }),
  ]),
  V("vector-equation-of-line", "c11_12.11", "Vector equation of a line", "রেখার ভেক্টর সমীকরণ", "solid-3d", "solid3d", { mode: "line-3d", point: [1, 2, 3], direction: [2, 1, -1] }, [
    S("r = a + tb = (1,2,3) + t(2,1,−1).", "r = a + tb = (১,২,৩) + t(২,১,−১)।", { line: true }),
    S("At t = 1 the point is (3,3,2).", "t = ১ হলে বিন্দু (৩,৩,২)।", { point: [3, 3, 2] }),
  ]),
  V("vector-equation-of-plane", "c11_12.11", "Vector equation of a plane", "সমতলের ভেক্টর সমীকরণ", "solid-3d", "solid3d", { mode: "plane-3d", normal: [1, 2, 2], d: 6 }, [
    S("r·n = d gives x + 2y + 2z = 6.", "r·n = d হলে x + ২y + ২z = ৬।", { plane: true }),
    S("The distance from the origin is 6/|n| = 2.", "মূলবিন্দু থেকে দূরত্ব ৬/|n| = ২।", { distance: 2 }),
  ]),
  V("work-and-force", "c11_12.11", "Work and force", "কাজ ও বল", "physics-scene", "physicsScene", { mode: "work", force: 10, displacement: 3, angle: 0 }, [
    S("Work = F·d = Fd cos θ.", "কাজ = F·d = Fd cos θ।", { formula: true }),
    S("Here W = 10 × 3 × 1 = 30 J.", "এখানে W = ১০ × ৩ × ১ = ৩০ J।", { work: 30 }),
  ]),
  V("vector-proofs-geometry", "c11_12.11", "Vector proofs in geometry", "জ্যামিতিতে ভেক্টর প্রমাণ", "geometry-board", "geometryBoard", { mode: "vector-proof", shape: "parallelogram" }, [
    S("The diagonals of a parallelogram bisect each other.", "সামান্তরিকের কর্ণদ্বয় পরস্পরকে সমদ্বিখণ্ডিত করে।", { theorem: true }),
    S("Write both midpoints as (a + b)/2 to prove it.", "উভয় মধ্যবিন্দু (a + b)/২ লিখে প্রমাণ করো।", { midpoint: "(a+b)/2" }),
  ]),
  V("dot-vs-cross-misconception", "c11_12.11", "Dot vs cross misconception", "ডট বনাম ক্রস ভুল ধারণা", "vector-field", "vectorField", { mode: "dot-cross", a: [2, 0], b: [0, 3] }, [
    S("The dot product is a scalar: a·b = 0.", "ডট গুণ একটি স্কেলার: a·b = ০।", { dot: 0 }),
    S("The cross product is a vector: a × b = (0,0,6).", "ক্রস গুণ একটি ভেক্টর: a × b = (০,০,৬)।", { cross: [0, 0, 6] }),
  ]),
  V("slope-intercept-lab", "c11_12.12", "Slope intercept lab", "ঢাল-ছেদ পরীক্ষা", "coordinate-plane", "coordinatePlane", { mode: "slope-intercept", m: 2, c: 1 }, [
    S("y = 2x + 1 has slope 2 and y-intercept 1.", "y = ২x + ১-এর ঢাল ২ ও y-ছেদ ১।", { slope: 2, intercept: 1 }),
    S("From (0,1), move 1 right and 2 up to (1,3).", "(০,১) থেকে ১ ডানে ও ২ ওপরে (১,৩)।", { next: [1, 3] }),
  ]),
  V("line-forms-converter", "c11_12.12", "Line forms converter", "রেখার রূপ রূপান্তর", "algebra-stepper", "algebraStepper", { mode: "line-forms", point: [1, 2], slope: 3 }, [
    S("Slope-point form: y − 2 = 3(x − 1).", "ঢাল-বিন্দু রূপ: y − ২ = ৩(x − ১)।", { form: true }),
    S("General form: 3x − y − 1 = 0.", "সাধারণ রূপ: ৩x − y − ১ = ০।", { general: true }),
  ]),
  V("parallel-perpendicular-slopes", "c11_12.12", "Parallel and perpendicular slopes", "সমান্তরাল ও লম্ব ঢাল", "coordinate-plane", "coordinatePlane", { mode: "slopes", m1: 2, m2: -0.5 }, [
    S("Parallel lines have equal slopes.", "সমান্তরাল রেখার ঢাল সমান।", { parallel: true }),
    S("Perpendicular slopes multiply to −1: 2 × (−0.5) = −1.", "লম্ব ঢালের গুণফল −১: ২ × (−০.৫) = −১।", { product: -1 }),
  ]),
  V("angle-between-two-lines", "c11_12.12", "Angle between two lines", "দুই রেখার মধ্যবর্তী কোণ", "coordinate-plane", "coordinatePlane", { mode: "angle-lines", m1: 1, m2: 2 }, [
    S("tan θ = |(m₂ − m₁)/(1 + m₁m₂)|.", "tan θ = |(m₂ − m₁)/(১ + m₁m₂)|।", { formula: true }),
    S("= |(2−1)/(1+2)| = 1/3, so θ ≈ 18.4°.", "= |(২−১)/(১+২)| = ১/৩, তাই θ ≈ ১৮.৪°।", { angle: 18.4 }),
  ]),
  V("distance-point-to-line", "c11_12.12", "Distance from point to line", "বিন্দু থেকে রেখার দূরত্ব", "coordinate-plane", "coordinatePlane", { mode: "point-line-distance", point: [0, 0], line: [3, 4, -10] }, [
    S("Distance = |ax₀ + by₀ + c|/√(a²+b²).", "দূরত্ব = |ax₀ + by₀ + c|/√(a²+b²)।", { formula: true }),
    S("= |0 + 0 − 10|/5 = 2.", "= |০ + ০ − ১০|/৫ = ২।", { distance: 2 }),
  ]),
  V("distance-between-parallels", "c11_12.12", "Distance between parallel lines", "সমান্তরাল রেখার দূরত্ব", "coordinate-plane", "coordinatePlane", { mode: "parallel-distance", line1: [3, 4, -5], line2: [3, 4, -15] }, [
    S("Distance = |c₁ − c₂|/√(a²+b²).", "দূরত্ব = |c₁ − c₂|/√(a²+b²)।", { formula: true }),
    S("= |−5 + 15|/5 = 2.", "= |−৫ + ১৫|/৫ = ২।", { distance: 2 }),
  ]),
  V("concurrency-of-lines", "c11_12.12", "Concurrency of lines", "রেখার সমবিন্দুতা", "coordinate-plane", "coordinatePlane", { mode: "concurrency", lines: ["x+y=4", "x-y=0", "2x+y=6"] }, [
    S("Solve x + y = 4 and x − y = 0.", "x + y = ৪ ও x − y = ০ সমাধান করো।", { system: true }),
    S("x = y = 2, and (2,2) also satisfies 2x + y = 6.", "x = y = ২, এবং (২,২) ২x + y = ৬-ও সন্তুষ্ট করে।", { point: [2, 2] }),
  ]),
  V("family-of-lines", "c11_12.12", "Family of lines", "রেখার পরিবার", "coordinate-plane", "coordinatePlane", { mode: "family-lines", line1: [1, 1, -4], line2: [1, -1, 0], lambda: 2 }, [
    S("L₁ + λL₂ = 0 is a pencil through their intersection.", "L₁ + λL₂ = ০ তাদের ছেদবিন্দুগামী রেখাগুচ্ছ।", { pencil: true }),
    S("With λ = 2: (x+y−4)+2(x−y)=0 gives 3x − y − 4 = 0.", "λ = ২ হলে: (x+y−৪)+২(x−y)=০ থেকে ৩x − y − ৪ = ০।", { result: "3x-y-4=0" }),
  ]),
  V("section-and-centroid", "c11_12.12", "Section and centroid", "বিভাজন ও ভরকেন্দ্র", "coordinate-plane", "coordinatePlane", { mode: "section-centroid", points: [[0, 0], [6, 0], [0, 6]] }, [
    S("The centroid is the average of the vertices.", "ভরকেন্দ্র শীর্ষবিন্দুগুলোর গড়।", { average: true }),
    S("((0+6+0)/3, (0+0+6)/3) = (2,2).", "((০+৬+০)/৩, (০+০+৬)/৩) = (২,২)।", { centroid: [2, 2] }),
  ]),
  V("area-of-triangle-coordinates", "c11_12.12", "Area of triangle by coordinates", "স্থানাঙ্কে ত্রিভুজের ক্ষেত্রফল", "coordinate-plane", "coordinatePlane", { mode: "triangle-area", points: [[0, 0], [4, 0], [0, 3]] }, [
    S("Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|.", "ক্ষেত্রফল = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|।", { formula: true }),
    S("= ½|0 + 4(3−0) + 0| = 6 square units.", "= ½|০ + ৪(৩−০) + ০| = ৬ বর্গ একক।", { area: 6 }),
  ]),
  V("locus-of-a-moving-point", "c11_12.12", "Locus of a moving point", "চলমান বিন্দুর সঞ্চারপথ", "coordinate-plane", "coordinatePlane", { mode: "locus", condition: "distance to (0,0) = 3" }, [
    S("A point always 3 units from the origin traces a circle.", "মূলবিন্দু থেকে সর্বদা ৩ একক দূরের বিন্দু বৃত্ত আঁকে।", { shape: "circle" }),
    S("Its locus is x² + y² = 9.", "এর সঞ্চারপথ x² + y² = ৯।", { equation: true }),
  ]),
  V("transformation-of-axes", "c11_12.12", "Transformation of axes", "অক্ষের রূপান্তর", "coordinate-plane", "coordinatePlane", { mode: "axes-transform", shift: [2, 1], angle: 30 }, [
    S("Translate by (h,k): x = X + h, y = Y + k.", "স্থানান্তর (h,k): x = X + h, y = Y + k।", { translation: true }),
    S("Rotation by θ uses X = x cos θ + y sin θ.", "θ ঘূর্ণনে X = x cos θ + y sin θ।", { rotation: true }),
  ]),
  V("line-slope-misconception", "c11_12.12", "Vertical line slope misconception", "উল্লম্ব রেখার ঢাল ভুল ধারণা", "coordinate-plane", "coordinatePlane", { mode: "vertical-line", x: 3 }, [
    S("A vertical line x = 3 has undefined slope.", "উল্লম্ব রেখা x = ৩-এর ঢাল অসংজ্ঞায়িত।", { undefined: true }),
    S("Its run is zero, so Δy/Δx divides by zero.", "এর অনুভূমিক পরিবর্তন শূন্য, তাই Δy/Δx শূন্য দিয়ে ভাগ।", { run: 0 }),
  ]),
  V("image-of-point-in-line", "c11_12.12", "Image of a point in a line", "রেখায় বিন্দুর প্রতিবিম্ব", "coordinate-plane", "coordinatePlane", { mode: "reflection-line", point: [4, 1], line: [1, -1, 0] }, [
    S("Reflect (4,1) in the line x − y = 0 (y = x).", "(৪,১)-কে x − y = ০ (y = x) রেখায় প্রতিফলিত করো।", { mirror: "y=x" }),
    S("The image is (1,4).", "প্রতিবিম্ব (১,৪)।", { image: [1, 4] }),
  ]),
  V("circle-equation-lab", "c11_12.13", "Circle equation lab", "বৃত্তের সমীকরণ পরীক্ষা", "function-graph", "functionGraph", { mode: "circle", h: 1, k: 2, r: 3 }, [
    S("The equation is (x − 1)² + (y − 2)² = 9.", "সমীকরণ (x − ১)² + (y − ২)² = ৯।", { equation: true }),
    S("Centre (1,2) and radius 3.", "কেন্দ্র (১,২) ও ব্যাসার্ধ ৩।", { centre: [1, 2], radius: 3 }),
  ]),
  V("general-form-to-standard", "c11_12.13", "General form to standard", "সাধারণ রূপ থেকে প্রামাণ্য রূপ", "algebra-stepper", "algebraStepper", { mode: "complete-square", equation: "x^2 + y^2 - 4x - 6y + 9 = 0" }, [
    S("Group: (x² − 4x) + (y² − 6y) = −9.", "গ্রুপ: (x² − ৪x) + (y² − ৬y) = −৯।", { group: true }),
    S("(x−2)² + (y−3)² = 4, centre (2,3), radius 2.", "(x−২)² + (y−৩)² = ৪, কেন্দ্র (২,৩), ব্যাসার্ধ ২।", { centre: [2, 3], radius: 2 }),
  ]),
  V("circle-through-three-points", "c11_12.13", "Circle through three points", "তিন বিন্দুগামী বৃত্ত", "geometry-board", "geometryBoard", { mode: "circumcircle", points: [[0, 0], [4, 0], [0, 3]] }, [
    S("The centre is equidistant from all three points.", "কেন্দ্র তিনটি বিন্দু থেকে সমদূরবর্তী।", { equidistant: true }),
    S("The circumcentre is (2,1.5) with radius 2.5.", "পরিকেন্দ্র (২,১.৫), ব্যাসার্ধ ২.৫।", { centre: [2, 1.5], radius: 2.5 }),
  ]),
  V("tangent-at-point", "c11_12.13", "Tangent at a point", "বিন্দুতে স্পর্শক", "geometry-board", "geometryBoard", { mode: "tangent-circle", centre: [0, 0], radius: 5, point: [3, 4] }, [
    S("The radius to (3,4) has slope 4/3.", "(৩,৪)-এ ব্যাসার্ধের ঢাল ৪/৩।", { slope: "4/3" }),
    S("The perpendicular tangent is 3x + 4y = 25.", "লম্ব স্পর্শক ৩x + ৪y = ২৫।", { tangent: "3x+4y=25" }),
  ]),
  V("tangent-from-external-point", "c11_12.13", "Tangent from an external point", "বহিঃস্থ বিন্দু থেকে স্পর্শক", "geometry-board", "geometryBoard", { mode: "external-tangent", centre: [0, 0], radius: 3, point: [5, 0] }, [
    S("Tangent length = √(d² − r²).", "স্পর্শকের দৈর্ঘ্য = √(d² − r²)।", { formula: true }),
    S("= √(25 − 9) = 4.", "= √(২৫ − ৯) = ৪।", { length: 4 }),
  ]),
  V("line-circle-position", "c11_12.13", "Line and circle position", "রেখা ও বৃত্তের অবস্থান", "function-graph", "functionGraph", { mode: "line-circle", centre: [0, 0], radius: 3, line: [1, 0, -4] }, [
    S("Compare the perpendicular distance with the radius.", "লম্ব দূরত্বকে ব্যাসার্ধের সাথে তুলনা করো।", { compare: true }),
    S("Distance 4 > radius 3, so the line misses the circle.", "দূরত্ব ৪ > ব্যাসার্ধ ৩, তাই রেখা বৃত্ত এড়িয়ে যায়।", { position: "miss" }),
  ]),
  V("chord-of-contact", "c11_12.13", "Chord of contact", "স্পর্শ-জ্যা", "geometry-board", "geometryBoard", { mode: "chord-of-contact", centre: [0, 0], radius: 5, point: [3, 4] }, [
    S("The chord of contact from (3,4) is the polar line.", "(৩,৪) থেকে স্পর্শ-জ্যা হলো পোলার রেখা।", { polar: true }),
    S("Its equation is 3x + 4y = 25.", "এর সমীকরণ ৩x + ৪y = ২৫।", { chord: "3x+4y=25" }),
  ]),
  V("two-circles-relations", "c11_12.13", "Two circles relations", "দুই বৃত্তের সম্পর্ক", "geometry-board", "geometryBoard", { mode: "two-circles", r1: 3, r2: 2, d: 1 }, [
    S("Compare d with r₁ + r₂ and |r₁ − r₂|.", "d-কে r₁ + r₂ ও |r₁ − r₂|-এর সাথে তুলনা করো।", { compare: true }),
    S("Here d = 1 = |3−2|, so they touch internally.", "এখানে d = ১ = |৩−২|, তাই অন্তঃস্পর্শী।", { relation: "internal touch" }),
  ]),
  V("radical-axis", "c11_12.13", "Radical axis", "মূল অক্ষ", "geometry-board", "geometryBoard", { mode: "radical-axis", s1: [1, -4, 0, 0], s2: [1, 0, 0, -9] }, [
    S("Subtract the equations to remove x² and y².", "x² ও y² বাদ দিতে সমীকরণ বিয়োগ করো।", { subtract: true }),
    S("The radical axis is −4x + 9 = 0, so x = 2.25.", "মূল অক্ষ −৪x + ৯ = ০, তাই x = ২.২৫।", { axis: "x=2.25" }),
  ]),
  V("family-of-circles", "c11_12.13", "Family of circles", "বৃত্তের পরিবার", "function-graph", "functionGraph", { mode: "family-circles", s1: [1, 0, 0, -4], s2: [1, 0, 0, -9], lambda: 2 }, [
    S("S₁ + λS₂ = 0 gives a family through common points.", "S₁ + λS₂ = ০ সাধারণ বিন্দুগামী পরিবার দেয়।", { family: true }),
    S("With λ = 2: 3x² + 3y² − 22 = 0.", "λ = ২ হলে: ৩x² + ৩y² − ২২ = ০।", { equation: true }),
  ]),
  V("orthogonal-circles", "c11_12.13", "Orthogonal circles", "লম্ব বৃত্ত", "geometry-board", "geometryBoard", { mode: "orthogonal", r1: 3, r2: 4, d: 5 }, [
    S("Orthogonal circles satisfy d² = r₁² + r₂².", "লম্ব বৃত্তে d² = r₁² + r₂²।", { formula: true }),
    S("25 = 9 + 16, so they are orthogonal.", "২৫ = ৯ + ১৬, তাই তারা লম্ব।", { orthogonal: true }),
  ]),
  V("parametric-circle", "c11_12.13", "Parametric circle", "পরামিতিক বৃত্ত", "parametric-polar", "parametricPolar", { mode: "circle-parametric", h: 1, k: 2, r: 3 }, [
    S("x = h + r cos θ = 1 + 3cos θ.", "x = h + r cos θ = ১ + ৩cos θ।", { x: true }),
    S("y = k + r sin θ = 2 + 3sin θ.", "y = k + r sin θ = ২ + ৩sin θ।", { y: true }),
  ]),
  V("fundamental-counting-tree", "c11_12.14", "Fundamental counting tree", "মৌলিক গণনা বৃক্ষ", "tree-diagram", "treeDiagram", { mode: "counting-tree", choices: [3, 2] }, [
    S("Choices of 3 then 2 give 3 × 2 routes.", "৩ তারপর ২টি বিকল্পে ৩ × ২ পথ।", { product: 6 }),
    S("There are 6 routes in the tree.", "বৃক্ষে ৬টি পথ আছে।", { routes: 6 }),
  ]),
  V("permutation-slots", "c11_12.14", "Permutation slots", "বিন্যাসের ঘর", "tree-diagram", "treeDiagram", { mode: "permutation-slots", n: 5, r: 3 }, [
    S("Fill 3 slots from 5: 5 × 4 × 3.", "৫ থেকে ৩ ঘর পূরণ: ৫ × ৪ × ৩।", { slots: [5, 4, 3] }),
    S("= 60 = ⁵P₃.", "= ৬০ = ⁵P₃।", { value: 60 }),
  ]),
  V("factorial-growth", "c11_12.14", "Factorial growth", "ফ্যাক্টরিয়ালের বৃদ্ধি", "chart", "chart", { mode: "factorial", n: 5 }, [
    S("5! = 5 × 4 × 3 × 2 × 1 = 120.", "৫! = ৫ × ৪ × ৩ × ২ × ১ = ১২০।", { value: 120 }),
    S("Factorials grow faster than powers.", "ফ্যাক্টরিয়াল ঘাতের চেয়ে দ্রুত বাড়ে।", { growth: "fast" }),
  ]),
  V("combination-vs-permutation", "c11_12.14", "Combination vs permutation", "সমাবেশ বনাম বিন্যাস", "tree-diagram", "treeDiagram", { mode: "comb-vs-perm", n: 4, r: 2 }, [
    S("Order matters for permutations, not for combinations.", "বিন্যাসে ক্রম গুরুত্বপূর্ণ, সমাবেশে নয়।", { order: true }),
    S("⁴P₂ = 12, but ⁴C₂ = 6.", "⁴P₂ = ১২, কিন্তু ⁴C₂ = ৬।", { p: 12, c: 6 }),
  ]),
  V("nCr-derivation", "c11_12.14", "nCr derivation", "nCr নির্ণয়", "algebra-stepper", "algebraStepper", { mode: "ncr-derivation", n: 5, r: 2 }, [
    S("Start with nPr and divide by r! to remove order.", "nPr দিয়ে শুরু করে ক্রম বাদে r! দিয়ে ভাগ করো।", { step: true }),
    S("⁵C₂ = ⁵P₂/2! = 20/2 = 10.", "⁵C₂ = ⁵P₂/২! = ২০/২ = ১০।", { value: 10 }),
  ]),
  V("pascal-identity-visual", "c11_12.14", "Pascal identity visual", "প্যাসকেল অভেদ চিত্র", "number-grid", "numberGrid", { mode: "pascal-identity", n: 5, r: 2 }, [
    S("⁵C₂ = ⁴C₁ + ⁴C₂.", "⁵C₂ = ⁴C₁ + ⁴C₂।", { identity: true }),
    S("= 4 + 6 = 10.", "= ৪ + ৬ = ১০।", { value: 10 }),
  ]),
  V("circular-arrangements", "c11_12.14", "Circular arrangements", "বৃত্তাকার বিন্যাস", "shape-canvas", "shapeCanvas", { mode: "circular", n: 5 }, [
    S("Fix one person, then arrange the rest.", "একজনকে স্থির রেখে বাকিদের সাজাও।", { fix: true }),
    S("The count is (n−1)! = 4! = 24.", "গণনা (n−১)! = ৪! = ২৪।", { arrangements: 24 }),
  ]),
  V("repeated-elements", "c11_12.14", "Repeated elements", "পুনরাবৃত্ত উপাদান", "algebra-stepper", "algebraStepper", { mode: "repeated", word: "MISSISSIPPI" }, [
    S("MISSISSIPPI has 11 letters with repeats 4, 4, 2.", "MISSISSIPPI-তে ১১ অক্ষর, পুনরাবৃত্তি ৪, ৪, ২।", { repeats: [4, 4, 2] }),
    S("Arrangements = 11!/(4!4!2!) = 34650.", "বিন্যাস = ১১!/(৪!৪!২!) = ৩৪৬৫০।", { total: 34650 }),
  ]),
  V("restrictions-and-together", "c11_12.14", "Restrictions and together", "শর্ত ও একসাথে", "tree-diagram", "treeDiagram", { mode: "together", n: 5 }, [
    S("Treat the together pair as one block.", "একসাথে থাকা জোড়াকে একটি ব্লক ধরো।", { block: true }),
    S("Then 4 blocks give 4! × 2 = 48.", "তারপর ৪ ব্লকে ৪! × ২ = ৪৮।", { total: 48 }),
  ]),
  V("committee-selection", "c11_12.14", "Committee selection", "কমিটি নির্বাচন", "story-scene", "storyScene", { mode: "committee", total: 7, choose: 3 }, [
    S("Select 3 from 7: ⁷C₃.", "৭ থেকে ৩ নির্বাচন: ⁷C₃।", { combination: true }),
    S("= 35 committees.", "= ৩৫টি কমিটি।", { total: 35 }),
  ]),
  V("derangements", "c11_12.14", "Derangements", "বিন্যস্ত-বিচ্যুতি", "tree-diagram", "treeDiagram", { mode: "derangement", n: 4 }, [
    S("D₄ = 4!(1 − 1/1! + 1/2! − 1/3! + 1/4!).", "D₄ = ৪!(১ − ১/১! + ১/২! − ১/৩! + ১/৪!)।", { formula: true }),
    S("= 24(1 − 1 + 1/2 − 1/6 + 1/24) = 9.", "= ২৪(১ − ১ + ১/২ − ১/৬ + ১/২৪) = ৯।", { value: 9 }),
  ]),
  V("inclusion-exclusion", "c11_12.14", "Inclusion exclusion", "অন্তর্ভুক্তি-বর্জন", "venn-set", "vennSet", { mode: "inclusion-exclusion", pA: 20, pB: 15, pBoth: 5 }, [
    S("|A ∪ B| = |A| + |B| − |A ∩ B|.", "|A ∪ B| = |A| + |B| − |A ∩ B|।", { formula: true }),
    S("= 20 + 15 − 5 = 30.", "= ২০ + ১৫ − ৫ = ৩০।", { union: 30 }),
  ]),
  V("distribution-balls-boxes", "c11_12.14", "Distribution: balls and boxes", "বণ্টন: বল ও বাক্স", "tree-diagram", "treeDiagram", { mode: "stars-bars", balls: 5, boxes: 3 }, [
    S("Distribute 5 identical balls into 3 boxes.", "৫টি অভিন্ন বল ৩টি বাক্সে বণ্টন করো।", { balls: 5, boxes: 3 }),
    S("Stars and bars: C(7,2) = 21.", "স্টার ও বার: C(৭,২) = ২১।", { ways: 21 }),
  ]),
  V("unit-circle-master", "c11_12.15", "Unit circle master", "একক বৃত্ত মাস্টার", "parametric-polar", "parametricPolar", { mode: "unit-circle", angle: 150 }, [
    S("At 150° the reference angle is 30°.", "১৫০°-এ প্রসঙ্গ কোণ ৩০°।", { reference: 30 }),
    S("sin 150° = 1/2 and cos 150° = −√3/2.", "sin ১৫০° = ১/২ এবং cos ১৫০° = −√৩/২।", { sin: 0.5 }),
  ]),
  V("radians-vs-degrees", "c11_12.15", "Radians vs degrees", "রেডিয়ান বনাম ডিগ্রি", "parametric-polar", "parametricPolar", { mode: "radians", angle: 60 }, [
    S("180° = π radians.", "১৮০° = π রেডিয়ান।", { conversion: true }),
    S("60° = π/3 radians, and arc length = rθ.", "৬০° = π/৩ রেডিয়ান, এবং চাপ = rθ।", { arc: true }),
  ]),
  V("cast-rule-quadrants", "c11_12.15", "CAST rule quadrants", "CAST নিয়মের চতুর্ভাগ", "parametric-polar", "parametricPolar", { mode: "cast", quadrant: 2 }, [
    S("In quadrant II, sin is positive; cos and tan are negative.", "২য় চতুর্ভাগে sin ধনাত্মক; cos ও tan ঋণাত্মক।", { quadrant: 2 }),
    S("CAST: All, Sin, Tan, Cos are positive in I–IV.", "CAST: I–IV-এ যথাক্রমে All, Sin, Tan, Cos ধনাত্মক।", { rule: "CAST" }),
  ]),
  V("reference-angle-lab", "c11_12.15", "Reference angle lab", "প্রসঙ্গ কোণ পরীক্ষা", "parametric-polar", "parametricPolar", { mode: "reference-angle", angle: 210 }, [
    S("210° lies in quadrant III.", "২১০° ৩য় চতুর্ভাগে।", { quadrant: 3 }),
    S("Reference angle = 210° − 180° = 30°.", "প্রসঙ্গ কোণ = ২১০° − ১৮০° = ৩০°।", { reference: 30 }),
  ]),
  V("graph-of-six-functions", "c11_12.15", "Graphs of six functions", "ছয় ফাংশনের গ্রাফ", "function-graph", "functionGraph", { mode: "trig-graphs", fn: "sin", amplitude: 1, period: 360 }, [
    S("y = sin x has amplitude 1 and period 360°.", "y = sin x-এর বিস্তার ১ ও পর্যায় ৩৬০°।", { amplitude: 1, period: 360 }),
    S("y = tan x has period 180° and asymptotes.", "y = tan x-এর পর্যায় ১৮০° ও অসীমস্পর্শী।", { period: 180 }),
  ]),
  V("pythagorean-identities", "c11_12.15", "Pythagorean identities", "পিথাগোরীয় অভেদ", "parametric-polar", "parametricPolar", { mode: "pythagorean", angle: 30 }, [
    S("sin²θ + cos²θ = 1.", "sin²θ + cos²θ = ১।", { identity: true }),
    S("Dividing by cos²θ gives 1 + tan²θ = sec²θ.", "cos²θ দিয়ে ভাগ করলে ১ + tan²θ = sec²θ।", { derived: true }),
  ]),
  V("trig-identity-prover", "c11_12.15", "Trig identity prover", "ত্রিকোণ অভেদ প্রমাণ", "algebra-stepper", "algebraStepper", { mode: "identity-proof", identity: "sin^2 + cos^2 = 1" }, [
    S("Start from the unit circle x² + y² = 1.", "একক বৃত্ত x² + y² = ১ থেকে শুরু।", { start: true }),
    S("Substitute x = cos θ and y = sin θ.", "x = cos θ ও y = sin θ বসাও।", { substitution: true }),
  ]),
  V("fundamental-vs-derived", "c11_12.15", "Fundamental vs derived identities", "মৌলিক বনাম উদ্ভূত অভেদ", "algebra-stepper", "algebraStepper", { mode: "identity-map" }, [
    S("Three fundamental identities generate the rest.", "তিনটি মূল অভেদ বাকিগুলো তৈরি করে।", { fundamental: 3 }),
    S("Derived forms come from dividing or rearranging.", "ভাগ বা পুনর্বিন্যাসে উদ্ভূত রূপ আসে।", { derived: true }),
  ]),
  V("special-angles-exact", "c11_12.15", "Exact special angles", "বিশেষ কোণের সঠিক মান", "geometry-board", "geometryBoard", { mode: "special-angles", angles: [0, 30, 45, 60, 90] }, [
    S("sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2.", "sin ৩০° = ১/২, sin ৪৫° = ১/√২, sin ৬০° = √৩/২।", { values: true }),
    S("These come from 30–60–90 and 45–45–90 triangles.", "এগুলো ৩০–৬০–৯০ ও ৪৫–৪৫–৯০ ত্রিভুজ থেকে আসে।", { triangles: true }),
  ]),
  V("domain-range-of-trig", "c11_12.15", "Domain and range of trig", "ত্রিকোণমিতির ডোমেইন ও রেঞ্জ", "function-graph", "functionGraph", { mode: "trig-domain", fn: "tan" }, [
    S("tan x is undefined at 90° + n·180°.", "৯০° + n·১৮০°-এ tan x অসংজ্ঞায়িত।", { undefined: true }),
    S("sec x has the same asymptotes.", "sec x-এরও একই অসীমস্পর্শী।", { same: true }),
  ]),
  V("trig-in-real-life", "c11_12.15", "Trigonometry in real life", "বাস্তব জীবনে ত্রিকোণমিতি", "physics-scene", "physicsScene", { mode: "trig-real", type: "wave" }, [
    S("Heights and distances use sine and cosine.", "উচ্চতা ও দূরত্বে sine ও cosine ব্যবহৃত হয়।", { application: "height" }),
    S("Slopes are measured by tan of an angle.", "ঢাল কোণের tan দিয়ে মাপা হয়।", { application: "slope" }),
  ]),
  V("degrees-vs-radians-trap", "c11_12.15", "Degrees vs radians trap", "ডিগ্রি বনাম রেডিয়ান ফাঁদ", "algebra-stepper", "algebraStepper", { mode: "mode-error", value: "sin(30)" }, [
    S("Radian mode gives sin 30 ≈ −0.988.", "রেডিয়ান মোডে sin ৩০ ≈ −০.৯৮৮।", { radian: -0.988 }),
    S("Degree mode gives 0.5; always check the mode.", "ডিগ্রি মোডে ০.৫; মোড সবসময় দেখো।", { degree: 0.5 }),
  ]),
  V("associated-angles-90-180-270", "c11_12.16", "Associated angles", "সংযুক্ত কোণ", "parametric-polar", "parametricPolar", { mode: "associated-angles", angle: 30 }, [
    S("sin(90° + θ) = cos θ.", "sin(৯০° + θ) = cos θ।", { identity: true }),
    S("cos(180° − θ) = −cos θ.", "cos(১৮০° − θ) = −cos θ।", { identity: true }),
  ]),
  V("compound-angle-sum-proof", "c11_12.16", "Compound angle sum proof", "যৌগিক কোণ যোগ প্রমাণ", "geometry-board", "geometryBoard", { mode: "compound-proof", a: 45, b: 30 }, [
    S("Draw a rectangle split to show sin(A+B).", "sin(A+B) দেখাতে আয়তক্ষেত্র ভাগ করো।", { construction: true }),
    S("Area comparison gives sin(A+B) = sinA cosB + cosA sinB.", "ক্ষেত্রফল তুলনায় sin(A+B) = sinA cosB + cosA sinB।", { formula: true }),
  ]),
  V("compound-angle-rotation-proof", "c11_12.16", "Compound angle rotation proof", "যৌগিক কোণ ঘূর্ণন প্রমাণ", "parametric-polar", "parametricPolar", { mode: "rotation-proof", a: 30, b: 45 }, [
    S("Rotating by A then B adds the angles.", "A তারপর B ঘোরালে কোণ যোগ হয়।", { rotation: true }),
    S("Matrix multiplication gives the cos(A+B) formula.", "ম্যাট্রিক্স গুণে cos(A+B) সূত্র পাওয়া যায়।", { matrix: true }),
  ]),
  V("tan-sum-difference", "c11_12.16", "tan sum and difference", "tan যোগ ও বিয়োগ", "algebra-stepper", "algebraStepper", { mode: "tan-sum", a: 45, b: 30 }, [
    S("tan(A+B) = (tanA + tanB)/(1 − tanA tanB).", "tan(A+B) = (tanA + tanB)/(১ − tanA tanB)।", { formula: true }),
    S("= (1 + 1/√3)/(1 − 1/√3) = 2 + √3.", "= (১ + ১/√৩)/(১ − ১/√৩) = ২ + √৩।", { value: "2+sqrt(3)" }),
  ]),
  V("double-angle-formulas", "c11_12.16", "Double angle formulas", "দ্বিগুণ কোণ সূত্র", "parametric-polar", "parametricPolar", { mode: "double-angle", angle: 30 }, [
    S("sin 2A = 2 sinA cosA.", "sin ২A = ২ sinA cosA।", { formula: true }),
    S("At A = 30°: sin 60° = 2 × ½ × √3/2 = √3/2.", "A = ৩০°-এ: sin ৬০° = ২ × ½ × √৩/২ = √৩/২।", { value: "sqrt(3)/2" }),
  ]),
  V("half-angle-formulas", "c11_12.16", "Half angle formulas", "অর্ধকোণ সূত্র", "algebra-stepper", "algebraStepper", { mode: "half-angle", angle: 60 }, [
    S("cos A = 1 − 2sin²(A/2).", "cos A = ১ − ২sin²(A/২)।", { formula: true }),
    S("So sin 30° = √((1 − cos 60°)/2) = 1/2.", "তাই sin ৩০° = √((১ − cos ৬০°)/২) = ১/২।", { value: 0.5 }),
  ]),
  V("triple-angle-formulas", "c11_12.16", "Triple angle formulas", "ত্রিগুণ কোণ সূত্র", "algebra-stepper", "algebraStepper", { mode: "triple-angle", angle: 30 }, [
    S("sin 3A = 3sinA − 4sin³A.", "sin ৩A = ৩sinA − ৪sin³A।", { formula: true }),
    S("At 30°: 3/2 − 4/8 = 1.", "৩০°-এ: ৩/২ − ৪/৮ = ১।", { value: 1 }),
  ]),
  V("product-to-sum-and-back", "c11_12.16", "Product to sum and back", "গুণফল থেকে যোগ ও ফিরে", "algebra-stepper", "algebraStepper", { mode: "product-to-sum", a: 60, b: 30 }, [
    S("sinA cosB = ½[sin(A+B) + sin(A−B)].", "sinA cosB = ½[sin(A+B) + sin(A−B)]।", { formula: true }),
    S("= ½[sin 90° + sin 30°] = ½(1 + ½) = 3/4.", "= ½[sin ৯০° + sin ৩০°] = ½(১ + ½) = ৩/৪।", { value: 0.75 }),
  ]),
  V("sum-of-sines-wave-addition", "c11_12.16", "Sum of sines wave addition", "সাইন তরঙ্গের যোগ", "function-graph", "functionGraph", { mode: "wave-addition", f1: 1, f2: 1.1 }, [
    S("Adding two nearby frequencies creates beats.", "কাছাকাছি দুটি কম্পাঙ্ক যোগে বীট তৈরি হয়।", { beats: true }),
    S("The beat frequency is |f₁ − f₂|.", "বীট কম্পাঙ্ক = |f₁ − f₂|।", { beatFrequency: 0.1 }),
  ]),
  V("harmonic-form-r-sin", "c11_12.16", "Harmonic form R sin", "হারমোনিক রূপ R sin", "function-graph", "functionGraph", { mode: "harmonic", a: 3, b: 4 }, [
    S("R = √(a²+b²) = √(9+16) = 5.", "R = √(a²+b²) = √(৯+১৬) = ৫।", { R: 5 }),
    S("α = tan⁻¹(b/a) = tan⁻¹(4/3).", "α = tan⁻¹(b/a) = tan⁻¹(৪/৩)।", { alpha: "tan^-1(4/3)" }),
  ]),
  V("conditional-identities", "c11_12.16", "Conditional identities", "শর্তাধীন অভেদ", "algebra-stepper", "algebraStepper", { mode: "conditional-identity", A: 60, B: 60, C: 60 }, [
    S("If A + B + C = π, then sin2A + sin2B + sin2C = 4 sinA sinB sinC.", "A + B + C = π হলে sin২A + sin২B + sin২C = ৪ sinA sinB sinC।", { formula: true }),
    S("For A = B = C = 60°, both sides equal 3√3/2.", "A = B = C = ৬০° হলে দুই পক্ষই ৩√৩/২।", { value: "3sqrt(3)/2" }),
  ]),
  V("compound-misconception", "c11_12.16", "Compound angle misconception", "যৌগিক কোণের ভুল ধারণা", "algebra-stepper", "algebraStepper", { mode: "misconception", A: 30, B: 60 }, [
    S("sin(30° + 60°) = sin 90° = 1.", "sin(৩০° + ৬০°) = sin ৯০° = ১।", { left: 1 }),
    S("But sin30° + sin60° ≈ 1.366, so they differ.", "কিন্তু sin৩০° + sin৬০° ≈ ১.৩৬৬, তাই ভিন্ন।", { right: 1.366 }),
  ]),
  V("max-min-of-expressions", "c11_12.16", "Max and min of expressions", "রাশির সর্বোচ্চ ও সর্বনিম্ন", "function-graph", "functionGraph", { mode: "max-min", a: 3, b: 4 }, [
    S("3sinθ + 4cosθ lies between −R and R.", "৩sinθ + ৪cosθ −R থেকে R-এর মধ্যে।", { bounds: true }),
    S("R = √(9+16) = 5, so the range is [−5,5].", "R = √(৯+১৬) = ৫, তাই রেঞ্জ [−৫,৫]।", { range: [-5, 5] }),
  ]),
  V("function-machine-intro", "c11_12.17", "Function machine intro", "ফাংশন মেশিন পরিচিতি", "story-scene", "storyScene", { mode: "function-machine", rule: "x+3" }, [
    S("Input 5 into x + 3.", "x + ৩-এ ৫ ইনপুট দাও।", { input: 5 }),
    S("The output is 8.", "আউটপুট ৮।", { output: 8 }),
  ]),
  V("domain-range-explorer", "c11_12.17", "Domain and range explorer", "ডোমেইন ও রেঞ্জ অন্বেষণ", "function-graph", "functionGraph", { mode: "domain-range", expression: "sqrt(x)" }, [
    S("√x needs x ≥ 0, so the domain is [0, ∞).", "√x-এর জন্য x ≥ ০, তাই ডোমেইন [০, ∞)।", { domain: "[0, inf)" }),
    S("The range is also [0, ∞).", "রেঞ্জও [০, ∞)।", { range: "[0, inf)" }),
  ]),
  V("vertical-line-test", "c11_12.17", "Vertical line test", "উল্লম্ব রেখা পরীক্ষা", "function-graph", "functionGraph", { mode: "vertical-line", expression: "x^2+y^2=9" }, [
    S("A vertical line meets x² + y² = 9 twice.", "উল্লম্ব রেখা x² + y² = ৯-কে দুইবার ছেদ করে।", { intersections: 2 }),
    S("So this circle is not a function y = f(x).", "তাই এই বৃত্ত y = f(x) ফাংশন নয়।", { function: false }),
  ]),
  V("one-one-onto", "c11_12.17", "One-one and onto", "এক-এক ও উপরিচ্ছন্ন", "venn-set", "vennSet", { mode: "one-one-onto", n: 2 }, [
    S("One-one means different inputs give different outputs.", "এক-এক মানে ভিন্ন ইনপুটে ভিন্ন আউটপুট।", { injective: true }),
    S("Onto means every output is used; both make it bijective.", "উপরিচ্ছন্ন মানে প্রতিটি আউটপুট ব্যবহৃত; দুটোই থাকলে দ্বৈত।", { surjective: true }),
  ]),
  V("horizontal-line-test", "c11_12.17", "Horizontal line test", "অনুভূমিক রেখা পরীক্ষা", "function-graph", "functionGraph", { mode: "horizontal-line", expression: "x^2" }, [
    S("A horizontal line meets y = x² twice.", "অনুভূমিক রেখা y = x²-কে দুইবার ছেদ করে।", { intersections: 2 }),
    S("So y = x² is not invertible on all reals.", "তাই সব বাস্তবে y = x² বিপরীতযোগ্য নয়।", { invertible: false }),
  ]),
  V("graph-transformations-lab", "c11_12.17", "Graph transformations lab", "গ্রাফ রূপান্তর পরীক্ষা", "function-graph", "functionGraph", { mode: "transformations", a: 2, b: 1, h: 1, k: -2 }, [
    S("y = 2f(x − 1) − 2 stretches and shifts the graph.", "y = ২f(x − ১) − ২ গ্রাফকে প্রসারিত ও সরায়।", { transform: true }),
    S("Order: horizontal shift, stretch, then vertical shift.", "ক্রম: অনুভূমিক সরণ, প্রসারণ, তারপর উল্লম্ব সরণ।", { order: true }),
  ]),
  V("absolute-value-and-floor", "c11_12.17", "Absolute value and floor", "পরম মান ও ফ্লোর", "function-graph", "functionGraph", { mode: "abs-floor", expression: "|x|" }, [
    S("|x| is V-shaped and never negative.", "|x| V-আকৃতির এবং কখনো ঋণাত্মক নয়।", { absolute: true }),
    S("⌊x⌋ is a step function with jumps at integers.", "⌊x⌋ ধাপ ফাংশন, পূর্ণসংখ্যায় লাফ দেয়।", { floor: true }),
  ]),
  V("even-odd-symmetry", "c11_12.17", "Even and odd symmetry", "যুগ্ম ও অযুগ্ম প্রতিসাম্য", "function-graph", "functionGraph", { mode: "symmetry", fn: "x^3" }, [
    S("f(−x) = −f(x) means odd symmetry.", "f(−x) = −f(x) মানে অযুগ্ম প্রতিসাম্য।", { odd: true }),
    S("x³ is odd; x² is even about the y-axis.", "x³ অযুগ্ম; x² y-অক্ষ সম্পর্কে যুগ্ম।", { examples: true }),
  ]),
  V("composition-visualizer", "c11_12.17", "Composition visualizer", "সংযোজন দৃশ্যমান", "function-graph", "functionGraph", { mode: "composition", f: "x+1", g: "x^2" }, [
    S("g(f(x)) = (x + 1)².", "g(f(x)) = (x + ১)²।", { composition: true }),
    S("At x = 2: f(2) = 3, then g(3) = 9.", "x = ২-এ: f(২) = ৩, তারপর g(৩) = ৯।", { value: 9 }),
  ]),
  V("inverse-reflection", "c11_12.17", "Inverse reflection", "বিপরীত প্রতিফলন", "function-graph", "functionGraph", { mode: "inverse-reflection", fn: "x^2" }, [
    S("Reflecting y = x² (x ≥ 0) in y = x gives y = √x.", "y = x² (x ≥ ০)-কে y = x-এ প্রতিফলিত করলে y = √x।", { inverse: "sqrt(x)" }),
    S("The domain and range swap.", "ডোমেইন ও রেঞ্জ বদলায়।", { swap: true }),
  ]),
  V("piecewise-builder", "c11_12.17", "Piecewise builder", "খণ্ডিত ফাংশন নির্মাণ", "function-graph", "functionGraph", { mode: "piecewise", pieces: ["x", "x^2"] }, [
    S("Different rules apply on different intervals.", "ভিন্ন ব্যবধিতে ভিন্ন নিয়ম প্রযোজ্য।", { pieces: 2 }),
    S("Check continuity at the join point.", "সংযোগ বিন্দুতে অবিচ্ছিন্নতা দেখো।", { continuity: true }),
  ]),
  V("polynomial-rational-exp-log-gallery", "c11_12.17", "Function family gallery", "ফাংশন পরিবার গ্যালারি", "function-graph", "functionGraph", { mode: "gallery", family: "all" }, [
    S("Each family has its own shape and asymptotes.", "প্রতিটি পরিবারের নিজস্ব আকৃতি ও অসীমস্পর্শী।", { families: true }),
    S("Exponential grows fastest; log grows slowest.", "সূচকীয় দ্রুততম বাড়ে; লগ ধীরতম।", { growth: true }),
  ]),
  V("asymptotes-explorer", "c11_12.17", "Asymptotes explorer", "অসীমস্পর্শী অন্বেষণ", "function-graph", "functionGraph", { mode: "asymptotes", expression: "(x+1)/(x-2)" }, [
    S("The denominator is zero at x = 2, a vertical asymptote.", "x = ২-এ হর শূন্য, উল্লম্ব অসীমস্পর্শী।", { vertical: 2 }),
    S("As x → ∞, y → 1, a horizontal asymptote.", "x → ∞ হলে y → ১, অনুভূমিক অসীমস্পর্শী।", { horizontal: 1 }),
  ]),
  V("periodic-and-bounded", "c11_12.17", "Periodic and bounded", "পর্যায়বৃত্ত ও সীমাবদ্ধ", "function-graph", "functionGraph", { mode: "periodic", expression: "sin x" }, [
    S("A function is periodic if f(x+T) = f(x).", "f(x+T) = f(x) হলে ফাংশন পর্যায়বৃত্ত।", { definition: true }),
    S("sin x has period 2π and is bounded by ±1.", "sin x-এর পর্যায় ২π এবং ±১ দ্বারা সীমাবদ্ধ।", { period: "2pi" }),
  ]),
  V("graph-sketching-checklist", "c11_12.17", "Graph sketching checklist", "গ্রাফ আঁকার চেকলিস্ট", "function-graph", "functionGraph", { mode: "sketch-checklist", expression: "x^3-3x" }, [
    S("Find intercepts, symmetry, asymptotes and turning points.", "ছেদ, প্রতিসাম্য, অসীমস্পর্শী ও বাঁক বিন্দু খোঁজো।", { checklist: true }),
    S("x³ − 3x has turning points at x = ±1.", "x³ − ৩x-এর বাঁক বিন্দু x = ±১।", { turning: [-1, 1] }),
  ]),
  V("function-misconception", "c11_12.17", "Function shift misconception", "ফাংশন সরণের ভুল ধারণা", "function-graph", "functionGraph", { mode: "shift", expression: "f(x+1)" }, [
    S("f(x + 1) shifts the graph left by 1.", "f(x + ১) গ্রাফকে ১ একক বাঁয়ে সরায়।", { shift: "left" }),
    S("Inside the bracket, plus means left, not right.", "বন্ধনীর ভেতরে যোগ মানে বাঁয়ে, ডানে নয়।", { plus: "left" }),
  ]),
  V("average-to-instantaneous", "c11_12.18", "Average to instantaneous", "গড় থেকে তাৎক্ষণিক", "function-graph", "functionGraph", { mode: "secant-tangent", expression: "x^2", point: 2 }, [
    S("The secant slope over [2, 2+h] is 4 + h.", "[২, ২+h]-এ ছেদক ঢাল ৪ + h।", { secant: "4+h" }),
    S("As h → 0, the tangent slope is 4.", "h → ০ হলে স্পর্শক ঢাল ৪।", { tangent: 4 }),
  ]),
  V("limit-zoom", "c11_12.18", "Limit zoom", "সীমা জুম", "function-graph", "functionGraph", { mode: "limit-zoom", expression: "sin x / x", point: 0 }, [
    S("sin x / x is 0/0 at x = 0.", "x = ০-এ sin x / x হলো ০/০।", { form: "0/0" }),
    S("Zooming shows the value approaches 1.", "জুম করলে মান ১-এর দিকে যায়।", { limit: 1 }),
  ]),
  V("limit-laws-and-forms", "c11_12.18", "Limit laws and forms", "সীমার নিয়ম ও রূপ", "algebra-stepper", "algebraStepper", { mode: "limit-forms", expression: "(x^2-1)/(x-1)" }, [
    S("Factor: (x² − 1)/(x − 1) = x + 1.", "উৎপাদক: (x² − ১)/(x − ১) = x + ১।", { factor: true }),
    S("So the limit as x → 1 is 2.", "তাই x → ১ হলে সীমা ২।", { limit: 2 }),
  ]),
  V("derivative-from-first-principles", "c11_12.18", "Derivative from first principles", "প্রথম নীতি থেকে অন্তরজ", "algebra-stepper", "algebraStepper", { mode: "first-principles", expression: "x^2" }, [
    S("f'(x) = lim [f(x+h) − f(x)]/h.", "f'(x) = lim [f(x+h) − f(x)]/h।", { definition: true }),
    S("For x²: [(x+h)² − x²]/h = 2x + h → 2x.", "x²-এর জন্য: [(x+h)² − x²]/h = ২x + h → ২x।", { derivative: "2x" }),
  ]),
  V("tangent-slope-and-derivative-graph", "c11_12.18", "Tangent slope and derivative graph", "স্পর্শক ঢাল ও অন্তরজ গ্রাফ", "function-graph", "functionGraph", { mode: "derivative-graph", expression: "x^2", point: 1 }, [
    S("The upper graph shows f and its tangent.", "উপরের গ্রাফ f ও তার স্পর্শক দেখায়।", { upper: "f" }),
    S("The lower graph plots f'(x) = 2x.", "নিচের গ্রাফ f'(x) = ২x আঁকে।", { lower: "2x" }),
  ]),
  V("power-product-quotient-rules", "c11_12.18", "Power, product, quotient rules", "ঘাত, গুণ ও ভাগের নিয়ম", "algebra-stepper", "algebraStepper", { mode: "rules", expression: "x^2 sin x" }, [
    S("Product rule: (uv)' = u'v + uv'.", "গুণন নিয়ম: (uv)' = u'v + uv'।", { rule: true }),
    S("= 2x sin x + x² cos x.", "= ২x sin x + x² cos x।", { derivative: true }),
  ]),
  V("chain-rule-gears", "c11_12.18", "Chain rule gears", "শৃঙ্খল নিয়মের গিয়ার", "story-scene", "storyScene", { mode: "chain-rule", outer: "u^2", inner: "3x+1" }, [
    S("Let u = 3x + 1, so y = u².", "ধরি u = ৩x + ১, তাই y = u²।", { inner: "3x+1" }),
    S("dy/dx = 2u × 3 = 6(3x + 1).", "dy/dx = ২u × ৩ = ৬(৩x + ১)।", { derivative: "6(3x+1)" }),
  ]),
  V("implicit-and-parametric-diff", "c11_12.18", "Implicit and parametric differentiation", "অস্পষ্ট ও পরামিতিক অন্তরীকরণ", "function-graph", "functionGraph", { mode: "implicit", expression: "x^2+y^2=25" }, [
    S("Differentiate both sides: 2x + 2y y' = 0.", "দুই পক্ষ অন্তরীকরণ: ২x + ২y y' = ০।", { implicit: true }),
    S("So y' = −x/y.", "তাই y' = −x/y।", { derivative: "-x/y" }),
  ]),
  V("tangent-normal-equations", "c11_12.18", "Tangent and normal equations", "স্পর্শক ও অভিলম্বের সমীকরণ", "function-graph", "functionGraph", { mode: "tangent-normal", expression: "x^2", point: 1 }, [
    S("At (1,1) the tangent slope is 2.", "(১,১)-এ স্পর্শক ঢাল ২।", { slope: 2 }),
    S("Tangent y = 2x − 1; normal y = −½x + 3/2.", "স্পর্শক y = ২x − ১; অভিলম্ব y = −½x + ৩/২।", { tangent: "y=2x-1" }),
  ]),
  V("increasing-decreasing-sign-chart", "c11_12.18", "Increasing-decreasing sign chart", "বর্ধমান-হ্রাসমান চিহ্ন ছক", "function-graph", "functionGraph", { mode: "sign-chart", expression: "x^3-3x" }, [
    S("f'(x) = 3x² − 3 = 3(x−1)(x+1).", "f'(x) = ৩x² − ৩ = ৩(x−১)(x+১)।", { derivative: true }),
    S("f increases on (−∞,−1) and (1,∞), and decreases between.", "f (−∞,−১) ও (১,∞)-এ বাড়ে, মাঝে কমে।", { intervals: true }),
  ]),
  V("maxima-minima-first-second", "c11_12.18", "Maxima and minima", "সর্বোচ্চ ও সর্বনিম্ন", "function-graph", "functionGraph", { mode: "max-min", expression: "x^3-3x" }, [
    S("Critical points are at x = ±1.", "ক্রান্তি বিন্দু x = ±১।", { critical: [-1, 1] }),
    S("f''(x) = 6x: x = 1 is a minimum, x = −1 a maximum.", "f''(x) = ৬x: x = ১ সর্বনিম্ন, x = −১ সর্বোচ্চ।", { min: 1, max: -1 }),
  ]),
  V("optimization-box-fence", "c11_12.18", "Optimization: box and fence", "অনুকূলন: বাক্স ও বেড়া", "story-scene", "storyScene", { mode: "box-optimization", perimeter: 20 }, [
    S("For a square of perimeter 20, the side is 5.", "পরিসীমা ২০ হলে বর্গের বাহু ৫।", { side: 5 }),
    S("Maximum area = 5² = 25.", "সর্বোচ্চ ক্ষেত্রফল = ৫² = ২৫।", { area: 25 }),
  ]),
  V("related-rates-ladder", "c11_12.18", "Related rates: ladder", "সম্পর্কিত হার: মই", "physics-scene", "physicsScene", { mode: "ladder-rate", length: 5, x: 3 }, [
    S("x² + y² = 25, so 2x dx/dt + 2y dy/dt = 0.", "x² + y² = ২৫, তাই ২x dx/dt + ২y dy/dt = ০।", { equation: true }),
    S("With x = 3, y = 4: dy/dt = −(3/4) dx/dt.", "x = ৩, y = ৪ হলে: dy/dt = −(৩/৪) dx/dt।", { rate: "-3/4" }),
  ]),
  V("concavity-inflection", "c11_12.18", "Concavity and inflection", "অবতলতা ও প্রতিবর্ত", "function-graph", "functionGraph", { mode: "concavity", expression: "x^3" }, [
    S("f''(x) > 0 means concave up.", "f''(x) > ০ মানে ঊর্ধ্বমুখী অবতল।", { concaveUp: true }),
    S("x³ changes concavity at x = 0, an inflection point.", "x³ x = ০-এ অবতলতা বদলায়, যা প্রতিবর্ত বিন্দু।", { inflection: 0 }),
  ]),
  V("mean-value-theorem", "c11_12.18", "Mean value theorem", "মধ্যমান উপপাদ্য", "function-graph", "functionGraph", { mode: "mvt", expression: "x^2", a: 0, b: 2 }, [
    S("Some c has f'(c) = (f(b) − f(a))/(b − a).", "কোনো c-তে f'(c) = (f(b) − f(a))/(b − a)।", { formula: true }),
    S("Here (4−0)/2 = 2, so 2c = 2 and c = 1.", "এখানে (৪−০)/২ = ২, তাই ২c = ২ ও c = ১।", { c: 1 }),
  ]),
  V("differentiability-vs-continuity", "c11_12.18", "Differentiability vs continuity", "অন্তরকলনযোগ্যতা বনাম অবিচ্ছিন্নতা", "function-graph", "functionGraph", { mode: "abs-continuity", expression: "|x|" }, [
    S("|x| is continuous at 0.", "|x| ০-এ অবিচ্ছিন্ন।", { continuous: true }),
    S("Its slope jumps from −1 to 1, so it is not differentiable there.", "এর ঢাল −১ থেকে ১-এ লাফ দেয়, তাই সেখানে অন্তরকলনযোগ্য নয়।", { differentiable: false }),
  ]),
  V("derivative-of-inverse-trig-log-exp", "c11_12.18", "Derivatives of inverse trig, log and exp", "বিপরীত ত্রিকোণ, লগ ও সূচকের অন্তরজ", "algebra-stepper", "algebraStepper", { mode: "derivative-library", fn: "sin^-1" }, [
    S("d/dx sin⁻¹x = 1/√(1 − x²).", "d/dx sin⁻¹x = ১/√(১ − x²)।", { formula: true }),
    S("d/dx ln x = 1/x and d/dx eˣ = eˣ.", "d/dx ln x = ১/x এবং d/dx eˣ = eˣ।", { formulas: true }),
  ]),
  V("curve-sketching-with-derivatives", "c11_12.18", "Curve sketching with derivatives", "অন্তরজ দিয়ে বক্র আঁকা", "function-graph", "functionGraph", { mode: "full-sketch", expression: "x^3-3x" }, [
    S("Use f for intercepts and f' for turning points.", "ছেদে f, বাঁক বিন্দুতে f' ব্যবহার করো।", { f: true }),
    S("Use f'' for concavity and inflection.", "অবতলতা ও প্রতিবর্তে f'' ব্যবহার করো।", { second: true }),
  ]),
  V("area-under-curve-riemann", "c11_12.19", "Area under curve: Riemann", "বক্রের নিচের ক্ষেত্রফল: রিমান", "function-graph", "functionGraph", { mode: "riemann", expression: "x^2", from: 0, to: 2, n: 4 }, [
    S("Use n rectangles of width Δx = (b − a)/n.", "n আয়তক্ষেত্রে প্রস্থ Δx = (b − a)/n।", { width: 0.5 }),
    S("As n → ∞ the sum tends to ∫₀² x² dx = 8/3.", "n → ∞ হলে যোগফল ∫₀² x² dx = ৮/৩-এ যায়।", { area: "8/3" }),
  ]),
  V("left-right-midpoint-trapezoid", "c11_12.19", "Left, right, midpoint, trapezoid", "বাম, ডান, মধ্যবিন্দু, ট্রাপিজয়েড", "function-graph", "functionGraph", { mode: "riemann-types", expression: "x^2", from: 0, to: 2, n: 4 }, [
    S("Left, right and midpoint sums bracket the exact area.", "বাম, ডান ও মধ্যবিন্দু যোগফল সঠিক ক্ষেত্রফল ঘিরে রাখে।", { bracket: true }),
    S("The trapezoid rule averages the left and right sums.", "ট্রাপিজিয়েড নিয়ম বাম ও ডান যোগফলের গড় নেয়।", { trapezoid: true }),
  ]),
  V("fundamental-theorem-link", "c11_12.19", "Fundamental theorem link", "মৌলিক উপপাদ্যের সংযোগ", "function-graph", "functionGraph", { mode: "ftc", expression: "x^2", from: 0 }, [
    S("Let A(x) = ∫₀ˣ f(t) dt.", "ধরি A(x) = ∫₀ˣ f(t) dt।", { areaFunction: true }),
    S("Then A'(x) = f(x), linking area and slope.", "তাহলে A'(x) = f(x), ক্ষেত্রফল ও ঢাল যুক্ত হয়।", { derivative: true }),
  ]),
  V("antiderivative-slope-field", "c11_12.19", "Antiderivative slope field", "প্রতিঅন্তরজ ঢাল ক্ষেত্র", "vector-field", "vectorField", { mode: "slope-field", expression: "2x" }, [
    S("The slope field shows y' = 2x.", "ঢাল ক্ষেত্র y' = ২x দেখায়।", { field: true }),
    S("Every solution is x² + C; the constant shifts the curve.", "প্রতিটি সমাধান x² + C; ধ্রুবক বক্রকে সরায়।", { family: "x^2 + C" }),
  ]),
  V("basic-integrals-stepper", "c11_12.19", "Basic integrals stepper", "মৌলিক সমাকলন ধাপে ধাপে", "algebra-stepper", "algebraStepper", { mode: "basic-integrals", fn: "x^3" }, [
    S("∫x³ dx = x⁴/4 + C.", "∫x³ dx = x⁴/৪ + C।", { integral: true }),
    S("Check: d/dx(x⁴/4) = x³.", "যাচাই: d/dx(x⁴/৪) = x³।", { check: true }),
  ]),
  V("substitution-stepper", "c11_12.19", "Substitution stepper", "প্রতিস্থাপন ধাপে ধাপে", "algebra-stepper", "algebraStepper", { mode: "substitution", integrand: "2x cos(x^2)" }, [
    S("Let u = x², then du = 2x dx.", "ধরি u = x², তাহলে du = ২x dx।", { substitution: "u=x^2" }),
    S("∫2x cos(x²) dx = sin(x²) + C.", "∫২x cos(x²) dx = sin(x²) + C।", { result: true }),
  ]),
  V("integration-by-parts", "c11_12.19", "Integration by parts", "আংশিক সমাকলন", "algebra-stepper", "algebraStepper", { mode: "by-parts", integrand: "x e^x" }, [
    S("Choose u = x and dv = eˣ dx.", "u = x ও dv = eˣ dx নির্বাচন করো।", { choose: true }),
    S("∫x eˣ dx = x eˣ − eˣ + C.", "∫x eˣ dx = x eˣ − eˣ + C।", { result: true }),
  ]),
  V("partial-fractions-stepper", "c11_12.19", "Partial fractions stepper", "আংশিক ভগ্নাংশ ধাপে ধাপে", "algebra-stepper", "algebraStepper", { mode: "partial-fractions", integrand: "1/(x^2-1)" }, [
    S("1/(x² − 1) = ½[1/(x−1) − 1/(x+1)].", "১/(x² − ১) = ½[১/(x−১) − ১/(x+১)]।", { decomposition: true }),
    S("Integrating gives ½ ln|(x−1)/(x+1)| + C.", "সমাকলনে ½ ln|(x−১)/(x+১)| + C।", { result: true }),
  ]),
  V("definite-integral-properties", "c11_12.19", "Definite integral properties", "নির্দিষ্ট সমাকলনের ধর্ম", "function-graph", "functionGraph", { mode: "definite-properties", expression: "x^2", a: 0, b: 2 }, [
    S("∫ₐᵇ = −∫ᵦᵃ and ∫ₐᵇ = ∫ₐᶜ + ∫ᶜᵇ.", "∫ₐᵇ = −∫ᵦᵃ এবং ∫ₐᵇ = ∫ₐᶜ + ∫ᶜᵇ।", { properties: true }),
    S("Symmetry simplifies integrals over [−a, a].", "প্রতিসাম্য [−a, a]-এ সমাকলন সহজ করে।", { symmetry: true }),
  ]),
  V("even-odd-symmetry-integrals", "c11_12.19", "Even-odd symmetry integrals", "যুগ্ম-অযুগ্ম প্রতিসাম্য সমাকলন", "function-graph", "functionGraph", { mode: "even-odd-integral", expression: "x^3", a: -2, b: 2 }, [
    S("For odd f, ∫₋ₐᵃ f(x) dx = 0.", "অযুগ্ম f-এর জন্য, ∫₋ₐᵃ f(x) dx = ০।", { odd: 0 }),
    S("For even f, it is 2∫₀ᵃ f(x) dx.", "যুগ্ম f-এর জন্য, তা ২∫₀ᵃ f(x) dx।", { even: true }),
  ]),
  V("area-between-curves", "c11_12.19", "Area between curves", "বক্রদ্বয়ের মধ্যবর্তী ক্ষেত্রফল", "function-graph", "functionGraph", { mode: "area-between", top: "x", bottom: "x^2", a: 0, b: 1 }, [
    S("Area = ∫(top − bottom) dx.", "ক্ষেত্রফল = ∫(উপর − নিচ) dx।", { formula: true }),
    S("= ∫₀¹ (x − x²) dx = ½ − ⅓ = 1/6.", "= ∫₀¹ (x − x²) dx = ½ − ⅓ = ১/৬।", { area: "1/6" }),
  ]),
  V("area-signed-vs-total", "c11_12.19", "Signed vs total area", "লব্ধ বনাম মোট ক্ষেত্রফল", "function-graph", "functionGraph", { mode: "signed-area", expression: "x", a: -1, b: 1 }, [
    S("Signed area counts below the axis as negative.", "লব্ধ ক্ষেত্রফলে অক্ষের নিচের অংশ ঋণাত্মক।", { signed: true }),
    S("∫₋₁¹ x dx = 0, but the total area is 1.", "∫₋₁¹ x dx = ০, কিন্তু মোট ক্ষেত্রফল ১।", { total: 1 }),
  ]),
  V("volume-of-revolution", "c11_12.19", "Volume of revolution", "ঘূর্ণনের আয়তন", "solid-3d", "solid3d", { mode: "revolution", expression: "x^2", a: 0, b: 1 }, [
    S("Disc method: V = π∫y² dx.", "ডিস্ক পদ্ধতি: V = π∫y² dx।", { method: true }),
    S("V = π∫₀¹ x⁴ dx = π/5.", "V = π∫₀¹ x⁴ dx = π/৫।", { volume: "pi/5" }),
  ]),
  V("arc-length-and-surface", "c11_12.19", "Arc length and surface", "চাপ দৈর্ঘ্য ও পৃষ্ঠ", "solid-3d", "solid3d", { mode: "arc-length", expression: "x^2", a: 0, b: 1 }, [
    S("Arc length = ∫√(1 + (dy/dx)²) dx.", "চাপের দৈর্ঘ্য = ∫√(১ + (dy/dx)²) dx।", { formula: true }),
    S("For y = x², it is ∫₀¹√(1 + 4x²) dx.", "y = x²-এর জন্য, তা ∫₀¹√(১ + ৪x²) dx।", { integral: true }),
  ]),
  V("motion-from-acceleration", "c11_12.19", "Motion from acceleration", "ত্বরণ থেকে গতি", "physics-scene", "physicsScene", { mode: "motion-integration", a: "6t", u: 0 }, [
    S("v = ∫6t dt = 3t² + C.", "v = ∫৬t dt = ৩t² + C।", { velocity: true }),
    S("With v(0) = 0, v = 3t² and s = t³.", "v(০) = ০ হলে v = ৩t² এবং s = t³।", { displacement: "t^3" }),
  ]),
  V("differential-equations-intro", "c11_12.19", "Differential equations intro", "অন্তরক সমীকরণ পরিচিতি", "vector-field", "vectorField", { mode: "separable-ode", expression: "dy/dx = y" }, [
    S("Separate: dy/y = dx.", "পৃথক করো: dy/y = dx।", { separable: true }),
    S("Integrating gives y = Ceˣ.", "সমাকলনে y = Ceˣ।", { solution: "Ce^x" }),
  ]),
  V("integral-misconception", "c11_12.19", "Integral misconception", "সমাকলনের ভুল ধারণা", "algebra-stepper", "algebraStepper", { mode: "integral-misconception", f: "x", g: "x^2" }, [
    S("∫f·g dx is not (∫f dx)(∫g dx).", "∫f·g dx = (∫f dx)(∫g dx) নয়।", { wrong: true }),
    S("∫x³ dx = x⁴/4 + C, not (x²/2)(x³/3).", "∫x³ dx = x⁴/৪ + C, (x²/২)(x³/৩) নয়।", { correct: true }),
  ]),
  V("trapezoid-simpson-numerical", "c11_12.19", "Trapezoid and Simpson numerical", "ট্রাপিজয়েড ও সিম্পসন সংখ্যাগত", "function-graph", "functionGraph", { mode: "simpson", expression: "x^2", from: 0, to: 2, n: 4 }, [
    S("Simpson uses parabolic arcs through three points.", "সিম্পসন তিন বিন্দু দিয়ে পরাবৃত্তীয় চাপ ব্যবহার করে।", { simpson: true }),
    S("For x² on [0,2], Simpson gives the exact 8/3.", "x²-এর জন্য, সিম্পসন সঠিক ৮/৩ দেয়।", { exact: "8/3" }),
  ]),
];

const makeClass1112Categories = (prefix: "c11" | "c12"): PlayCategoryDef[] => [
  T(1, `${prefix}-01-real-numbers-inequalities`, "Real Numbers and Inequalities", "বাস্তব সংখ্যা ও অসমতা", "🔢", ["interval-1112", "real-line-intervals", "linear-inequality-solver", "sign-flip-misconception", "modulus-distance", "modulus-equation-cases", "quadratic-inequality-sign-chart", "rational-inequality-sign-chart", "inequality-region-2d", "am-gm-visual", "am-gm-optimization-lab", "triangle-inequality-abs", "completeness-zoom"]),
  T(2, `${prefix}-02-linear-programming`, "Linear Programming", "রৈখিক প্রোগ্রামিং", "📈", ["feasible-region-1112", "feasible-region-builder", "corner-point-finder", "objective-sweep", "optimal-at-a-vertex", "unbounded-and-infeasible", "multiple-optimal-solutions", "word-to-model-wizard", "sensitivity-lab", "integer-vs-continuous"]),
  T(3, `${prefix}-03-complex-numbers`, "Complex Numbers", "জটিল সংখ্যা", "🧮", ["complex-plane-1112", "argand-plane", "add-subtract-vectors", "multiply-rotate-scale", "conjugate-reflection", "division-and-reciprocal", "polar-form-converter", "de-moivre-lab", "roots-of-unity", "cube-roots-of-unity", "quadratic-complex-roots", "locus-in-argand", "euler-formula-bridge", "i-powers-cycle"]),
  T(4, `${prefix}-04-polynomials`, "Polynomials and Polynomial Equations", "বহুপদী ও বহুপদী সমীকরণ", "📉", ["polynomial-1112", "polynomial-graph-lab", "long-division-stepper", "synthetic-division", "remainder-theorem-graph", "factor-theorem-roots", "rational-root-test", "vieta-relations", "cubic-roots-and-graph", "multiplicity-of-roots", "complex-conjugate-root-pairs", "solve-by-substitution", "polynomial-word-problems"]),
  T(5, `${prefix}-05-binomial-expansion`, "Binomial Expansion", "দ্বিপদী বিস্তার", "🔺", ["pascal-1112", "pascals-triangle-builder", "expand-binomial-stepper", "combinatorial-meaning", "general-term-finder", "middle-and-independent-term", "greatest-term-lab", "negative-fractional-index", "approximation-with-binomial", "coefficient-sum-tricks", "binomial-misconception"], ["∴ (a+b)^n = Σ nCr a^(n−r) b^r (binomial theorem) → Class 11–12, Ch. 5.", "∴ (a+b)^n = Σ nCr a^(n−r) b^r (দ্বিপদী উপপাদ্য) → একাদশ–দ্বাদশ শ্রেণি, অধ্যায় ৫।"]),
  T(6, `${prefix}-06-conics`, "Conics", "কনিক", "⭕", ["conic-1112", "cone-slice-explorer", "circle-lab", "parabola-focus-directrix", "parabola-standard-forms", "ellipse-two-foci-string", "ellipse-eccentricity", "hyperbola-difference-of-distances", "eccentricity-unifier", "tangent-and-normal", "reflective-property", "parametric-form", "general-conic-classifier", "conic-real-world"]),
  T(7, `${prefix}-07-inverse-trig`, "Inverse Trigonometric Functions and Trigonometric Equations", "বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ", "📐", ["inverse-trig-1112", "restricting-the-domain", "inverse-function-mirror", "principal-value-ranges", "inverse-identities", "tan-inverse-addition", "trig-equation-unit-circle", "general-solution-generator", "graph-intersection-method", "equation-types-stepper", "extraneous-solutions", "real-world-waves"]),
  T(8, `${prefix}-08-statics`, "Statics", "স্থিতিবিদ্যা", "⚖️", ["force-1112", "force-as-vector", "parallelogram-triangle-law", "resolve-components", "equilibrium-of-particle", "lami-theorem", "friction-and-limiting", "inclined-plane-lab", "moment-of-force", "parallel-forces-and-couple", "rigid-body-equilibrium", "centre-of-gravity", "free-body-diagram-trainer"]),
  T(9, `${prefix}-09-motion-plane`, "Motion of a Particle in a Plane", "তলে কণার গতি", "🎯", ["projectile-1112", "position-velocity-acceleration", "projectile-lab", "projectile-components", "range-height-time-of-flight", "maximum-range-45", "projectile-on-incline", "relative-velocity-river", "relative-velocity-rain", "equations-of-motion", "variable-acceleration-integration", "collision-and-interception", "free-fall-and-vertical-motion"]),
  T(10, `${prefix}-10-dispersion-probability`, "Measures of Dispersion and Probability", "বিচ্ছুরণ ও সম্ভাবনা", "🎲", ["probability-tree-1112", "range-iqr-lab", "variance-standard-deviation", "mean-deviation-vs-sd", "grouped-data-dispersion", "coefficient-of-variation", "sample-space-builder", "dice-coins-simulator", "conditional-probability-tree", "bayes-theorem-lab", "independent-vs-mutually-exclusive", "addition-and-multiplication-rule", "random-variable-distribution", "binomial-distribution-lab", "birthday-problem", "gambler-fallacy"]),
  T(11, `${prefix}-11-vectors`, "Vectors", "ভেক্টর", "➡️", ["vector-1112", "vector-basics-2d", "addition-subtraction-scalar", "position-vector-section-formula", "dot-product-projection", "dot-product-zero-perpendicular", "cross-product-3d", "scalar-triple-product-volume", "vector-equation-of-line", "vector-equation-of-plane", "work-and-force", "vector-proofs-geometry", "dot-vs-cross-misconception"]),
  T(12, `${prefix}-12-straight-lines`, "Straight Lines", "সরলরেখা", "📏", ["line-equation-1112", "slope-intercept-lab", "line-forms-converter", "parallel-perpendicular-slopes", "angle-between-two-lines", "distance-point-to-line", "distance-between-parallels", "concurrency-of-lines", "family-of-lines", "section-and-centroid", "area-of-triangle-coordinates", "locus-of-a-moving-point", "transformation-of-axes", "line-slope-misconception", "image-of-point-in-line"]),
  T(13, `${prefix}-13-circle`, "Circle", "বৃত্ত", "⭕", ["circle-1112", "circle-equation-lab", "general-form-to-standard", "circle-through-three-points", "tangent-at-point", "tangent-from-external-point", "line-circle-position", "chord-of-contact", "two-circles-relations", "radical-axis", "family-of-circles", "orthogonal-circles", "parametric-circle"]),
  T(14, `${prefix}-14-permutations-combinations`, "Permutations and Combinations", "বিন্যাস ও সমাবেশ", "🔀", ["permutations-1112", "fundamental-counting-tree", "permutation-slots", "factorial-growth", "combination-vs-permutation", "nCr-derivation", "pascal-identity-visual", "circular-arrangements", "repeated-elements", "restrictions-and-together", "committee-selection", "derangements", "inclusion-exclusion", "distribution-balls-boxes"], ["∴ nPr = n!/(n−r)! and nCr = nPr/r! (counting laws) → Class 11–12, Ch. 14.", "∴ nPr = n!/(n−r)! এবং nCr = nPr/r! (গণনার নিয়ম) → একাদশ–দ্বাদশ শ্রেণি, অধ্যায় ১৪।"]),
  T(15, `${prefix}-15-trigonometric-ratios`, "Trigonometric Ratios", "ত্রিকোণমিতিক অনুপাত", "📐", ["trig-ratio-1112", "unit-circle-master", "radians-vs-degrees", "cast-rule-quadrants", "reference-angle-lab", "graph-of-six-functions", "pythagorean-identities", "trig-identity-prover", "fundamental-vs-derived", "special-angles-exact", "domain-range-of-trig", "trig-in-real-life", "degrees-vs-radians-trap"], ["∴ sin²θ + cos²θ = 1 (Pythagorean identity) → Class 11–12, Ch. 15.", "∴ sin²θ + cos²θ = ১ (পিথাগোরীয় অভেদ) → একাদশ–দ্বাদশ শ্রেণি, অধ্যায় ১৫।"]),
  T(16, `${prefix}-16-compound-angles`, "Trigonometric Ratios of Associated and Compound Angles", "সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত", "🔁", ["compound-angle-1112", "associated-angles-90-180-270", "compound-angle-sum-proof", "compound-angle-rotation-proof", "tan-sum-difference", "double-angle-formulas", "half-angle-formulas", "triple-angle-formulas", "product-to-sum-and-back", "sum-of-sines-wave-addition", "harmonic-form-r-sin", "conditional-identities", "compound-misconception", "max-min-of-expressions"]),
  T(17, `${prefix}-17-functions-graphs`, "Functions and Graphs of Functions", "ফাংশন ও ফাংশনের গ্রাফ", "📊", ["function-graph-1112", "function-machine-intro", "domain-range-explorer", "vertical-line-test", "one-one-onto", "horizontal-line-test", "graph-transformations-lab", "absolute-value-and-floor", "even-odd-symmetry", "composition-visualizer", "inverse-reflection", "piecewise-builder", "polynomial-rational-exp-log-gallery", "asymptotes-explorer", "periodic-and-bounded", "graph-sketching-checklist", "function-misconception"]),
  T(18, `${prefix}-18-differentiation`, "Differentiation", "অন্তরীকরণ", "📈", ["derivative-1112", "average-to-instantaneous", "limit-zoom", "limit-laws-and-forms", "derivative-from-first-principles", "tangent-slope-and-derivative-graph", "power-product-quotient-rules", "chain-rule-gears", "implicit-and-parametric-diff", "tangent-normal-equations", "increasing-decreasing-sign-chart", "maxima-minima-first-second", "optimization-box-fence", "related-rates-ladder", "concavity-inflection", "mean-value-theorem", "differentiability-vs-continuity", "derivative-of-inverse-trig-log-exp", "curve-sketching-with-derivatives"], ["∴ d/dx (x^n) = n x^(n−1) (power rule) → Class 11–12, Ch. 18.", "∴ d/dx (x^n) = n x^(n−1) (ঘাত নিয়ম) → একাদশ–দ্বাদশ শ্রেণি, অধ্যায় ১৮।"]),
  T(19, `${prefix}-19-integration`, "Integration", "সমাকলন", "∫", ["integral-area-1112", "area-under-curve-riemann", "left-right-midpoint-trapezoid", "fundamental-theorem-link", "antiderivative-slope-field", "basic-integrals-stepper", "substitution-stepper", "integration-by-parts", "partial-fractions-stepper", "definite-integral-properties", "even-odd-symmetry-integrals", "area-between-curves", "area-signed-vs-total", "volume-of-revolution", "arc-length-and-surface", "motion-from-acceleration", "differential-equations-intro", "integral-misconception", "trapezoid-simpson-numerical"], ["∴ ∫ x^n dx = x^(n+1)/(n+1) + C (power rule for integrals) → Class 11–12, Ch. 19.", "∴ ∫ x^n dx = x^(n+1)/(n+1) + C (সমাকলনের ঘাত নিয়ম) → একাদশ–দ্বাদশ শ্রেণি, অধ্যায় ১৯।"]),
];

export const CLASS_11_CATEGORIES = makeClass1112Categories("c11");
export const CLASS_12_CATEGORIES = makeClass1112Categories("c12");
