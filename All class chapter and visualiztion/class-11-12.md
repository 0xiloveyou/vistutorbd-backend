# Visualizations: Classes 11 and 12 (Maximum Depth)

Band `C11_12`. This is the **ceiling** of the catalog. Each chapter has many visualizations, including **T4 (Max)** items: proofs, generalisations, parameter sweeps, edge cases and exam-hard problems.

Style: brief explanation, KaTeX formulas, sound per step, parameter sliders, "predict then reveal", step-by-step proofs. Companion optional. If enabled, an opt-in cartoon slapstick reaction is allowed on wrong quiz answers (never inside explanatory visualizations).

Every chapter should provide:
- a **concept build** (T1–T2),
- a **derivation / proof stepper** (T3),
- a **parameter lab** (T2–T4),
- a **misconception** viz,
- a **real-world** link,
- a **T4 challenge** set.

Tiers: T1 Basic · T2 Medium · T3 Hard · T4 Max.

Format: `slug` `renderer` | what it shows | controls | tiers | notes

---

### c11_12.01 Real Numbers and Inequalities
- **real-line-intervals** `number-line` | Open, closed, half-open intervals; union and intersection | drag endpoints | T1–T3 | notation toggle
- **linear-inequality-solver** `number-line` | Solve and shade | slider | T1–T3 | flip sign when × by a negative
- **sign-flip-misconception** `number-line` | Multiplying by a negative | drag | T2–T3 | misconception
- **modulus-distance** `number-line` | |x − a| < r as an interval | slider | T2–T4 | link to distance
- **modulus-equation-cases** `function-graph` | |x−a| = b by cases, graph V-shape | slider | T3–T4 | steps
- **quadratic-inequality-sign-chart** `function-graph` | Parabola above or below the axis | slider | T2–T4 | sign chart sync
- **rational-inequality-sign-chart** `function-graph` | Critical points and asymptotes | slider | T3–T4 | misconception: multiplying across by an unknown sign
- **inequality-region-2d** `coordinate-plane` | ax + by ≥ c as shaded half-planes | slider | T2–T3 | link to LP
- **am-gm-visual** `geometry-board` | Semicircle proof of AM ≥ GM | drag | T3–T4 | proof
- **am-gm-optimization-lab** `function-graph` | Min/max by AM–GM | slider | T4 | challenge
- **triangle-inequality-abs** `number-line` | |a+b| ≤ |a|+|b| | slider | T3–T4 | proof
- **completeness-zoom** `number-line` | Rationals vs reals, gaps | slider | T4 | conceptual

### c11_12.02 Linear Programming
- **feasible-region-builder** `coordinate-plane` | Add constraints one by one; the region shrinks | slider | T1–T3 | sound per constraint
- **corner-point-finder** `coordinate-plane` | Intersections of constraint lines | drag | T2–T3 | steps
- **objective-sweep** `coordinate-plane` | Slide the iso-profit line; see where it leaves the region | slider | T2–T4 | key intuition
- **optimal-at-a-vertex** `coordinate-plane` | Why the optimum is at a corner | drag | T3–T4 | proof sketch
- **unbounded-and-infeasible** `coordinate-plane` | No bounded region or none at all | slider | T3–T4 | misconception
- **multiple-optimal-solutions** `coordinate-plane` | Objective parallel to an edge | slider | T3–T4 | edge case
- **word-to-model-wizard** `story-scene` | Factory, diet, transport problems to inequalities | tap | T2–T4 | real-world
- **sensitivity-lab** `coordinate-plane` | Change constraints; watch the optimum move | slider | T4 | challenge
- **integer-vs-continuous** `coordinate-plane` | Lattice points in the region | drag | T4 | optional

### c11_12.03 Complex Numbers
- **argand-plane** `complex-plane` | Plot z = a + bi; modulus and argument | drag | T1–T3 | sound
- **add-subtract-vectors** `complex-plane` | Parallelogram law | drag | T1–T2 | companion
- **multiply-rotate-scale** `complex-plane` | Multiplying rotates by arg and scales by modulus | slider | T2–T4 | key intuition
- **conjugate-reflection** `complex-plane` | z̄ is a reflection | drag | T1–T3 | steps
- **division-and-reciprocal** `complex-plane` | 1/z geometry | drag | T3–T4 | steps
- **polar-form-converter** `complex-plane` | r(cosθ + i sinθ) | slider | T2–T3 | voice
- **de-moivre-lab** `complex-plane` | zⁿ as repeated rotation | slider | T3–T4 | proof
- **roots-of-unity** `complex-plane` | nth roots as a regular polygon | slider | T3–T4 | sound
- **cube-roots-of-unity** `complex-plane` | 1, ω, ω² and 1 + ω + ω² = 0 | drag | T2–T4 | exam favourite
- **quadratic-complex-roots** `function-graph` | Parabola missing the axis, roots in the plane | slider | T2–T3 | link to discriminant
- **locus-in-argand** `complex-plane` | |z − a| = r, arg z = θ | slider | T3–T4 | steps
- **euler-formula-bridge** `complex-plane` | e^{iθ} on the unit circle | slider | T4 | challenge
- **i-powers-cycle** `complex-plane` | i, −1, −i, 1 cycle | tap | T1–T2 | misconception: √(ab) = √a√b for negatives

### c11_12.04 Polynomials and Polynomial Equations
- **polynomial-graph-lab** `function-graph` | Edit coefficients; see degree, end behaviour, turning points | slider | T1–T4 | sound
- **long-division-stepper** `algebra-stepper` | Divide polynomials | next | T2–T3 | steps
- **synthetic-division** `algebra-stepper` | Compact method | next | T2–T3 | voice
- **remainder-theorem-graph** `function-graph` | f(a) equals the remainder | slider | T2–T3 | proof
- **factor-theorem-roots** `function-graph` | Roots and factors | slider | T3 | link to graph
- **rational-root-test** `algebra-stepper` | Candidates p/q | next | T3–T4 | steps
- **vieta-relations** `algebra-stepper` | Sum and product of roots | slider | T3–T4 | derivation
- **cubic-roots-and-graph** `function-graph` | Three roots, repeated root, one real root | slider | T3–T4 | edge cases
- **multiplicity-of-roots** `function-graph` | Cross vs touch the axis | slider | T3–T4 | misconception
- **complex-conjugate-root-pairs** `complex-plane` | Real polynomials have conjugate roots | drag | T4 | challenge
- **solve-by-substitution** `algebra-stepper` | Reducible quartics | next | T4 | challenge
- **polynomial-word-problems** `story-scene` | Box volume | slider | T2–T3 | real-world

### c11_12.05 Binomial Expansion
- **pascals-triangle-builder** `number-grid` | Rows with patterns (Fibonacci, powers of 2) | slider | T1–T3 | sound
- **expand-binomial-stepper** `algebra-stepper` | (a+b)ⁿ term by term | slider | T1–T3 | voice
- **combinatorial-meaning** `tree-diagram` | Why C(n,r) counts terms | drag | T3–T4 | link to combinations
- **general-term-finder** `algebra-stepper` | Tr+1 = C(n,r) aⁿ⁻ʳ bʳ | slider | T2–T4 | steps
- **middle-and-independent-term** `algebra-stepper` | Find a specific term | next | T3–T4 | exam
- **greatest-term-lab** `chart` | Term sizes as r varies | slider | T4 | challenge
- **negative-fractional-index** `algebra-stepper` | Infinite series and the |x| < 1 condition | slider | T4 | convergence
- **approximation-with-binomial** `chart` | (1.01)^10 approximations | slider | T3–T4 | real-world
- **coefficient-sum-tricks** `algebra-stepper` | x = 1 and x = −1 substitutions | tap | T3–T4 | steps
- **binomial-misconception** `algebra-stepper` | (a+b)ⁿ ≠ aⁿ+bⁿ | tap | T1–T2 | misconception

### c11_12.06 Conics
- **cone-slice-explorer** `solid-3d` | Slice a double cone; circle, ellipse, parabola, hyperbola | slider | T1–T3 | sound
- **circle-lab** `function-graph` | Centre (h,k), radius r | slider | T1–T3 | link to c11_12.13
- **parabola-focus-directrix** `function-graph` | Equal distance to focus and directrix | drag | T2–T4 | definition
- **parabola-standard-forms** `function-graph` | y² = 4ax and variants; latus rectum | slider | T2–T4 | steps
- **ellipse-two-foci-string** `function-graph` | Sum of distances constant (the pins-and-string method) | drag | T2–T4 | key intuition
- **ellipse-eccentricity** `function-graph` | e from 0 (circle) to near 1 | slider | T3–T4 | sound
- **hyperbola-difference-of-distances** `function-graph` | |PF₁ − PF₂| constant | drag | T2–T4 | asymptotes
- **eccentricity-unifier** `function-graph` | One slider e runs through ellipse, parabola, hyperbola | slider | T4 | challenge
- **tangent-and-normal** `function-graph` | Tangent at a point | drag | T3–T4 | steps
- **reflective-property** `physics-scene` | Light from the focus of a parabola/ellipse | drag | T3–T4 | real-world (headlights, dishes)
- **parametric-form** `parametric-polar` | (at², 2at), (a cosθ, b sinθ) | slider | T3–T4 | steps
- **general-conic-classifier** `function-graph` | ax²+bxy+cy²+… discriminant test | slider | T4 | challenge
- **conic-real-world** `story-scene` | Orbits, bridges, satellite dishes | tap | T2–T3 | real-world

### c11_12.07 Inverse Trigonometric Functions and Trigonometric Equations
- **restricting-the-domain** `function-graph` | Why sin needs [−π/2, π/2] | slider | T2–T4 | key idea
- **inverse-function-mirror** `function-graph` | sin⁻¹ as a reflection in y = x | slider | T2–T3 | sound
- **principal-value-ranges** `function-graph` | All six inverse functions | tap | T2–T3 | table sync
- **inverse-identities** `parametric-polar` | sin⁻¹x + cos⁻¹x = π/2 | slider | T3–T4 | proof
- **tan-inverse-addition** `geometry-board` | tan⁻¹a + tan⁻¹b formula | slider | T3–T4 | derivation
- **trig-equation-unit-circle** `parametric-polar` | All solutions in [0, 2π) | slider | T1–T3 | steps
- **general-solution-generator** `parametric-polar` | Add 2nπ, nπ + (−1)ⁿα | slider | T3–T4 | misconception: missing solutions
- **graph-intersection-method** `function-graph` | Solutions as intersections | slider | T2–T3 | link to graphs
- **equation-types-stepper** `algebra-stepper` | Factoring, sin–cos mix, squares | next | T3–T4 | steps
- **extraneous-solutions** `algebra-stepper` | Squaring introduces extras | tap | T4 | misconception
- **real-world-waves** `physics-scene` | Tides, sound | slider | T2–T3 | real-world

### c11_12.08 Statics
- **force-as-vector** `vector-field` | Draw forces, resultants | drag | T1–T3 | sound
- **parallelogram-triangle-law** `vector-field` | Resultant | drag | T1–T3 | steps
- **resolve-components** `vector-field` | Horizontal and vertical components | slider | T2–T3 | voice
- **equilibrium-of-particle** `physics-scene` | Net force zero | drag | T2–T3 | sound
- **lami-theorem** `vector-field` | Three concurrent forces in equilibrium | drag | T3–T4 | proof
- **friction-and-limiting** `physics-scene` | Block on a plane; angle of friction | slider | T3–T4 | key idea
- **inclined-plane-lab** `physics-scene` | Forces on a slope | slider | T2–T4 | steps
- **moment-of-force** `physics-scene` | Turning effect | drag | T3–T4 | sound
- **parallel-forces-and-couple** `physics-scene` | Resultant and couple | drag | T4 | challenge
- **rigid-body-equilibrium** `physics-scene` | Ladder against a wall with friction | slider | T4 | classic exam
- **centre-of-gravity** `physics-scene` | Composite bodies | drag | T4 | challenge
- **free-body-diagram-trainer** `physics-scene` | Draw all forces | drag | T2–T4 | misconception: a missing normal force

### c11_12.09 Motion of a Particle in a Plane
- **position-velocity-acceleration** `physics-scene` | Vectors over time | slider | T1–T3 | sound
- **projectile-lab** `physics-scene` | Launch angle and speed | slider | T2–T4 | key
- **projectile-components** `physics-scene` | Independent x and y motions | slider | T2–T3 | steps
- **range-height-time-of-flight** `function-graph` | Formula derivation | slider | T3–T4 | proof
- **maximum-range-45** `function-graph` | Range vs angle | slider | T3–T4 | misconception: 45° always best (not on slopes)
- **projectile-on-incline** `physics-scene` | Launch up or down a slope | slider | T4 | challenge
- **relative-velocity-river** `physics-scene` | River crossing | slider | T3–T4 | real-world
- **relative-velocity-rain** `physics-scene` | Rain on a moving person | slider | T3–T4 | steps
- **equations-of-motion** `chart` | s–t, v–t, a–t graphs | slider | T1–T3 | sound
- **variable-acceleration-integration** `function-graph` | Velocity from acceleration by integration | slider | T4 | link to calculus
- **collision-and-interception** `physics-scene` | Two moving particles | slider | T4 | challenge
- **free-fall-and-vertical-motion** `physics-scene` | Up and down motion | slider | T1–T3 | sound

### c11_12.10 Measures of Dispersion and Probability
- **range-iqr-lab** `chart` | Edit data; watch the spread | drag | T1–T3 | sound
- **variance-standard-deviation** `chart` | Deviations drawn as squares | slider | T2–T4 | key intuition
- **mean-deviation-vs-sd** `chart` | Compare | slider | T3–T4 | steps
- **grouped-data-dispersion** `chart` | Class intervals | slider | T3–T4 | formula sync
- **coefficient-of-variation** `chart` | Compare two sets | slider | T3–T4 | real-world
- **sample-space-builder** `tree-diagram` | Tree and table | drag | T1–T3 | voice
- **dice-coins-simulator** `prob-sim` | Experimental vs theoretical | slider | T1–T3 | law of large numbers
- **conditional-probability-tree** `tree-diagram` | P(A|B) | drag | T3–T4 | steps
- **bayes-theorem-lab** `tree-diagram` | Test accuracy and base rates | slider | T4 | challenge
- **independent-vs-mutually-exclusive** `venn-set` | Common confusion | drag | T3 | misconception
- **addition-and-multiplication-rule** `venn-set` | Regions | drag | T2–T3 | sound
- **random-variable-distribution** `chart` | Expectation as a balance point | slider | T3–T4 | link to mean
- **binomial-distribution-lab** `prob-sim` | n and p sliders | slider | T4 | challenge
- **birthday-problem** `prob-sim` | Surprising probability | slider | T3–T4 | real-world
- **gambler-fallacy** `prob-sim` | Streaks | slider | T3 | misconception

### c11_12.11 Vectors
- **vector-basics-2d** `vector-field` | Magnitude, direction, unit vector | drag | T1–T3 | sound
- **addition-subtraction-scalar** `vector-field` | Triangle and parallelogram laws | drag | T1–T3 | steps
- **position-vector-section-formula** `vector-field` | Internal and external division | slider | T2–T4 | steps
- **dot-product-projection** `vector-field` | a·b as a projection; angle between vectors | drag | T2–T4 | sound
- **dot-product-zero-perpendicular** `vector-field` | Orthogonality test | drag | T2–T3 | companion
- **cross-product-3d** `solid-3d` | Right-hand rule; area of the parallelogram | drag | T3–T4 | key
- **scalar-triple-product-volume** `solid-3d` | Volume of a parallelepiped | drag | T4 | challenge
- **vector-equation-of-line** `solid-3d` | r = a + tb | slider | T3–T4 | steps
- **vector-equation-of-plane** `solid-3d` | Normal form | slider | T4 | challenge
- **work-and-force** `physics-scene` | Work = F·d | slider | T2–T3 | real-world
- **vector-proofs-geometry** `geometry-board` | Midpoint theorem, diagonals of a parallelogram | drag | T3–T4 | proof
- **dot-vs-cross-misconception** `vector-field` | Scalar vs vector results | tap | T2–T3 | misconception

### c11_12.12 Straight Lines
- **slope-intercept-lab** `coordinate-plane` | m and c sliders | slider | T1–T2 | sound
- **line-forms-converter** `algebra-stepper` | Slope-point, two-point, intercept, normal, general | slider | T2–T3 | steps
- **parallel-perpendicular-slopes** `coordinate-plane` | m₁m₂ = −1 | slider | T2–T3 | companion
- **angle-between-two-lines** `coordinate-plane` | tan θ formula | slider | T3–T4 | derivation
- **distance-point-to-line** `coordinate-plane` | Perpendicular drop | drag | T3–T4 | proof
- **distance-between-parallels** `coordinate-plane` | Formula | slider | T3 | steps
- **concurrency-of-lines** `coordinate-plane` | Three lines meeting at a point | slider | T3–T4 | determinant link
- **family-of-lines** `coordinate-plane` | L₁ + λL₂ = 0 pencil | slider | T4 | challenge
- **section-and-centroid** `coordinate-plane` | Division of a segment | slider | T2–T3 | sound
- **area-of-triangle-coordinates** `coordinate-plane` | Shoelace formula | drag | T3 | steps
- **locus-of-a-moving-point** `coordinate-plane` | Trace the path | drag | T3–T4 | link to conics
- **transformation-of-axes** `coordinate-plane` | Shift and rotate axes | slider | T4 | challenge
- **line-slope-misconception** `coordinate-plane` | Vertical lines have undefined slope | tap | T2–T3 | misconception
- **image-of-point-in-line** `coordinate-plane` | Reflection in a line | drag | T4 | steps

### c11_12.13 Circle
- **circle-equation-lab** `function-graph` | (x−h)² + (y−k)² = r² | slider | T1–T3 | sound
- **general-form-to-standard** `algebra-stepper` | Complete the square | next | T2–T3 | steps
- **circle-through-three-points** `geometry-board` | Circumcircle | drag | T3–T4 | construction
- **tangent-at-point** `geometry-board` | Equation of the tangent | drag | T3–T4 | proof
- **tangent-from-external-point** `geometry-board` | Two tangents; length formula | drag | T3–T4 | steps
- **line-circle-position** `function-graph` | Secant, tangent, miss (discriminant) | slider | T3–T4 | sound
- **chord-of-contact** `geometry-board` | Polar of a point | drag | T4 | challenge
- **two-circles-relations** `geometry-board` | Separate, touching, intersecting, nested | slider | T3–T4 | misconception
- **radical-axis** `geometry-board` | Equal power | drag | T4 | challenge
- **family-of-circles** `function-graph` | S₁ + λS₂ = 0 | slider | T4 | steps
- **orthogonal-circles** `geometry-board` | Condition | slider | T4 | optional
- **parametric-circle** `parametric-polar` | (h + r cosθ, k + r sinθ) | slider | T3 | link to trig

### c11_12.14 Permutations and Combinations
- **fundamental-counting-tree** `tree-diagram` | Multiplication principle | drag | T1–T3 | voice
- **permutation-slots** `tree-diagram` | ⁿPᵣ with slots | slider | T2–T3 | sound
- **factorial-growth** `chart` | n! grows fast | slider | T1–T2 | steps
- **combination-vs-permutation** `tree-diagram` | Order matters or not | drag | T2–T3 | misconception
- **nCr-derivation** `algebra-stepper` | Divide out the order | next | T3 | proof
- **pascal-identity-visual** `number-grid` | ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ | tap | T3–T4 | steps
- **circular-arrangements** `shape-canvas` | Round table | drag | T3–T4 | key idea
- **repeated-elements** `algebra-stepper` | Arrangements of MISSISSIPPI-type words | slider | T3–T4 | steps
- **restrictions-and-together** `tree-diagram` | Always together, never together | drag | T3–T4 | exam
- **committee-selection** `story-scene` | Choose people with conditions | drag | T2–T4 | real-world
- **derangements** `tree-diagram` | Nobody in their own place | slider | T4 | challenge
- **inclusion-exclusion** `venn-set` | Counting with overlaps | drag | T4 | challenge
- **distribution-balls-boxes** `tree-diagram` | Stars and bars | drag | T4 | challenge

### c11_12.15 Trigonometric Ratios
- **unit-circle-master** `parametric-polar` | Sin, cos, tan for any angle; quadrant signs | slider | T1–T3 | sound
- **radians-vs-degrees** `parametric-polar` | Arc length equals the angle | slider | T2–T3 | key idea
- **cast-rule-quadrants** `parametric-polar` | Signs by quadrant | tap | T2–T3 | companion
- **reference-angle-lab** `parametric-polar` | Reduce to the first quadrant | slider | T2–T3 | steps
- **graph-of-six-functions** `function-graph` | Amplitude, period, phase | slider | T2–T4 | sound
- **pythagorean-identities** `parametric-polar` | sin²θ + cos²θ = 1; sec/tan and cosec/cot forms | slider | T2–T3 | proof
- **trig-identity-prover** `algebra-stepper` | Prove LHS = RHS step by step | next | T3–T4 | steps
- **fundamental-vs-derived** `algebra-stepper` | Map of identities | tap | T3 | overview
- **special-angles-exact** `geometry-board` | 0°, 30°, 45°, 60°, 90° | tap | T2–T3 | sound
- **domain-range-of-trig** `function-graph` | Where tan, sec are undefined | slider | T3–T4 | asymptotes
- **trig-in-real-life** `physics-scene` | Waves, height, slopes | slider | T2–T3 | real-world
- **degrees-vs-radians-trap** `algebra-stepper` | Calculator mode errors | tap | T2–T3 | misconception

### c11_12.16 Trigonometric Ratios of Associated and Compound Angles
- **associated-angles-90-180-270** `parametric-polar` | sin(90°+θ), cos(180°−θ), etc. | slider | T2–T3 | steps
- **compound-angle-sum-proof** `geometry-board` | sin(A+B), cos(A+B) | drag | T3–T4 | proof
- **compound-angle-rotation-proof** `parametric-polar` | Rotation matrix proof | slider | T4 | alternative proof
- **tan-sum-difference** `algebra-stepper` | Derive from sin and cos | next | T3 | steps
- **double-angle-formulas** `parametric-polar` | sin2A, cos2A, tan2A | slider | T3 | sound
- **half-angle-formulas** `algebra-stepper` | Rearranged double angle | next | T3–T4 | steps
- **triple-angle-formulas** `algebra-stepper` | Derivation | next | T4 | challenge
- **product-to-sum-and-back** `algebra-stepper` | C and D formulas | next | T3–T4 | steps
- **sum-of-sines-wave-addition** `function-graph` | Adding two waves; beats | slider | T4 | real-world (sound)
- **harmonic-form-r-sin** `function-graph` | a sinx + b cosx = R sin(x + α) | slider | T4 | challenge
- **conditional-identities** `algebra-stepper` | If A + B + C = π, then... | next | T4 | exam
- **compound-misconception** `algebra-stepper` | sin(A+B) ≠ sinA + sinB | tap | T1–T3 | misconception
- **max-min-of-expressions** `function-graph` | Bound a sinθ + b cosθ | slider | T4 | challenge

### c11_12.17 Functions and Graphs of Functions
- **function-machine-intro** `story-scene` | Input, rule, output | slider | T1–T2 | companion
- **domain-range-explorer** `function-graph` | Shade the domain and range | slider | T1–T3 | sound
- **vertical-line-test** `function-graph` | Is it a function? | drag | T1–T2 | misconception
- **one-one-onto** `venn-set` | Injective, surjective, bijective | drag | T2–T3 | arrow diagrams
- **horizontal-line-test** `function-graph` | Invertibility | drag | T3 | steps
- **graph-transformations-lab** `function-graph` | a f(b(x − h)) + k with sliders | slider | T2–T4 | key
- **absolute-value-and-floor** `function-graph` | |f(x)|, ⌊x⌋ | slider | T3 | sound
- **even-odd-symmetry** `function-graph` | Symmetry tests | slider | T3 | steps
- **composition-visualizer** `function-graph` | f∘g chain | slider | T3–T4 | companion
- **inverse-reflection** `function-graph` | y = x mirror | slider | T3 | proof
- **piecewise-builder** `function-graph` | Define by cases | drag | T3–T4 | continuity link
- **polynomial-rational-exp-log-gallery** `function-graph` | Families | slider | T2–T4 | explore
- **asymptotes-explorer** `function-graph` | Vertical, horizontal, oblique | slider | T3–T4 | steps
- **periodic-and-bounded** `function-graph` | Period detection | slider | T3 | sound
- **graph-sketching-checklist** `function-graph` | Intercepts, symmetry, asymptotes, turning points | next | T4 | exam
- **function-misconception** `function-graph` | f(x+1) shifts left | tap | T2–T3 | misconception

### c11_12.18 Differentiation
- **average-to-instantaneous** `function-graph` | Secant lines approach the tangent | slider | T1–T3 | key intuition
- **limit-zoom** `function-graph` | Zoom in on a point; see h → 0 | slider | T2–T4 | foundations
- **limit-laws-and-forms** `algebra-stepper` | 0/0, ∞/∞ forms; standard limits sinx/x | next | T3–T4 | steps
- **derivative-from-first-principles** `algebra-stepper` | xⁿ, sin x, eˣ | next | T3–T4 | proof
- **tangent-slope-and-derivative-graph** `function-graph` | f above, f′ below, moving point | drag | T2–T4 | key
- **power-product-quotient-rules** `algebra-stepper` | Derive each | next | T2–T3 | steps
- **chain-rule-gears** `story-scene` | Nested rates | slider | T3–T4 | intuition
- **implicit-and-parametric-diff** `function-graph` | Circle, curves | drag | T4 | steps
- **tangent-normal-equations** `function-graph` | Lines at a point | drag | T3 | link to straight lines
- **increasing-decreasing-sign-chart** `function-graph` | f′ sign chart | slider | T2–T4 | sound
- **maxima-minima-first-second** `function-graph` | Turning points and concavity | drag | T3–T4 | steps
- **optimization-box-fence** `story-scene` | Max volume, min cost | slider | T3–T4 | real-world
- **related-rates-ladder** `physics-scene` | Sliding ladder | slider | T4 | classic
- **concavity-inflection** `function-graph` | f″ and curvature | slider | T4 | steps
- **mean-value-theorem** `function-graph` | A tangent parallel to a secant | slider | T4 | proof
- **differentiability-vs-continuity** `function-graph` | |x| at 0 | slider | T3–T4 | misconception
- **derivative-of-inverse-trig-log-exp** `algebra-stepper` | Derivations | next | T4 | challenge
- **curve-sketching-with-derivatives** `function-graph` | Full analysis | next | T4 | challenge

### c11_12.19 Integration
- **area-under-curve-riemann** `function-graph` | Rectangles to the exact area; n slider | slider | T1–T4 | key intuition
- **left-right-midpoint-trapezoid** `function-graph` | Compare approximations | slider | T3 | error shown
- **fundamental-theorem-link** `function-graph` | Accumulated area and derivative link | drag | T3–T4 | key
- **antiderivative-slope-field** `vector-field` | Direction field and the constant C | slider | T3–T4 | why +C
- **basic-integrals-stepper** `algebra-stepper` | Power, trig, exponential | next | T1–T3 | steps
- **substitution-stepper** `algebra-stepper` | u-substitution | next | T3–T4 | chain-rule link
- **integration-by-parts** `algebra-stepper` | ∫u dv; choosing u (LIATE) | next | T4 | steps
- **partial-fractions-stepper** `algebra-stepper` | Rational functions | next | T4 | challenge
- **definite-integral-properties** `function-graph` | Additivity, symmetry, reversing limits | slider | T3–T4 | proof
- **even-odd-symmetry-integrals** `function-graph` | ∫₋ₐᵃ shortcuts | slider | T4 | exam
- **area-between-curves** `function-graph` | Top minus bottom | drag | T3–T4 | steps
- **area-signed-vs-total** `function-graph` | Negative areas | slider | T3 | misconception
- **volume-of-revolution** `solid-3d` | Discs and washers | slider | T4 | key
- **arc-length-and-surface** `solid-3d` | Optional extension | slider | T4 | optional
- **motion-from-acceleration** `physics-scene` | Velocity and displacement by integration | slider | T3–T4 | link to c11_12.09
- **differential-equations-intro** `vector-field` | Separable ODE, slope field | slider | T4 | challenge
- **integral-misconception** `algebra-stepper` | ∫f·g ≠ ∫f · ∫g | tap | T3 | misconception
- **trapezoid-simpson-numerical** `function-graph` | Numerical integration accuracy | slider | T4 | optional

---

## Cross-Chapter Capstone Visualizations (T4)
These link several chapters. Build them late.
- **conic-calculus-link** `function-graph` | Area and tangent of a conic by integration and differentiation | slider | T4
- **complex-trig-calculus-bridge** `complex-plane` | e^{iθ}, De Moivre, trig identities, derivatives of sin/cos as rotation | slider | T4
- **vector-physics-sandbox** `physics-scene` | Forces, projectile and relative motion in one scene | slider | T4
- **probability-statistics-lab** `prob-sim` | Dispersion, binomial, sampling | slider | T4
- **graph-gallery-all-functions** `function-graph` | Every function family with a sketching checklist | slider | T4
