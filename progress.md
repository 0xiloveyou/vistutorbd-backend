# Backend progress

_Last updated: content folders per class; Play + Nursery + Classes 1–12 authored (Class 7 provisional; 9–10 and 11–12 shared books)._

## Status

| Area | State | Notes |
| --- | --- | --- |
| Express app + env config | ✅ | `src/app.ts`, `src/app/config/index.ts`; typed env with defaults |
| Prisma schema | ✅ | Prisma 6.19 + MongoDB; users, taxonomy, topics, visualizations, knowledge, quiz, chat, moderation |
| Auth | ✅ | Register/OTP verify/login/logout/refresh/me, forgot/reset, Google ID token + code callback |
| Roles + guards | ✅ | `auth(...roles)`, `optionalAuth`, `RoleGuard` consumers in the client |
| Mail / Redis | ✅ | SMTP with console fallback; Redis with in-memory fallback |
| Taxonomy | ✅ | Bands, levels, categories, chapters (CRUD + public reads) |
| Topics | ✅ | Published reads, optional-auth progress/bookmark, CRUD with derived ids |
| Visualizations | ✅ | Spec CRUD + public reads; renderer lives in the frontend |
| Quiz | ✅ | Config, deterministic generation, numeric verification, attempts, template list |
| Chat + RAG | ✅ | Grounded context, OpenRouter rewrite, fallback, image transcription, sessions, rate limit |
| Knowledge | ✅ | Ingest, local cosine search, topic reindex, chunk admin |
| Learner state | ✅ | Bookmarks, progress, preferences |
| Moderation | ✅ | Public report submission, editor queue + status updates |
| Users | ✅ | Admin list/update/soft-delete |
| Health | ✅ | Mongo ping + optional service status |
| Seed | ✅ | 5 bands, 14 levels, companion, 2 templates, admin/moderator/demo users |
| Content layout | ✅ | One folder per class: `src/app/content/play`, `nursery`, `class-1` … `class-12`; shared books live in `content/shared/` |
| Play content | ✅ | 5 chapters, 15 topics, 33 visualizations (moved into `content/play/`) |
| Nursery content | ✅ | 14 chapters, 28 topics, 44 visualizations (`content/nursery/`) |
| Class 1 content | ✅ | 18 chapters, 36 topics, 36 visualizations (`content/class-1/`) |
| Class 2 content | ✅ | 7 units, 22 topics, 24 visualizations (`content/class-2/`) |
| Class 3 content | ✅ | 13 chapters, 14 topics, 35 visualizations (`content/class-3/`) |
| Class 4 content | ✅ | 11 chapters, 11 topics, 32 visualizations (`content/class-4/`) |
| Class 5 content | ✅ | 10 chapters, 10 topics, 17 visualizations (`content/class-5/`) |
| Class 6 content | ✅ | 8 chapters, 8 topics, 10 visualizations (`content/class-6/`) |
| Class 7 content | ✅ | 11 chapters, 11 topics, 11 visualizations (`content/class-7/`) — provisional chapter list, source list missing |
| Class 8 content | ✅ | 11 chapters, 11 topics, 11 visualizations (`content/class-8/`) |
| Class 9 content | ✅ | 17 chapters, 17 topics, 17 visualizations (`content/class-9/` + shared book) |
| Class 10 content | ✅ | 17 chapters, 17 topics, 17 visualizations (`content/class-10/` + shared book) |
| Class 11 content | ✅ | 19 chapters, 19 topics, 19 visualizations (`content/class-11/` + shared book) |
| Class 12 content | ✅ | 19 chapters, 19 topics, 19 visualizations (`content/class-12/` + shared book) |
| Tests | ✅ | 12 unit tests for math engine + generators (`npm test`) |
| Docs | ✅ | `README.md`, `docs/api/*` |

## Verification

```bash
bun x tsc --noEmit                # clean
bun test src/app/lib/__tests__    # 12 pass
bun x tsup                        # bundle succeeds
```

> Verified with Bun because `node`/`npx` are not on PATH in this shell. A content audit over `CONTENT_PACKS` found 14 packs, 180 chapters, 238 topics and 325 visualizations with no duplicate topic slugs or unresolved visualization references.

## Content authoring rules

- Every class owns a folder: `content/<class>/`. Small classes may keep both arrays in a single `index.ts`; large classes split into `categories.ts` + `visualizations.ts` + `index.ts`.
- A visualization is written as a stepper (`steps[]`) with bilingual narration and structured `data` so complex ideas run step by step:
  - trigonometry → `geometry-board` / `parametric-polar` line art and unit circle,
  - probability → `tree-diagram` / `prob-sim` probability trees,
  - matrices → `matrix-grid` row/column cells,
  - algebra → `algebra-stepper` equation steps.
- Derived facts are written inline as `∴ ... (law name) → Class/Chapter where the law is taught`, for example:
  `∴ a·a = a² (index law) → Class 9–10, Ch. 4 Exponents and Logarithms`.
- `seedClassContent()` in `src/app/utils/seed-class-content.ts` seeds any class pack; `content/index.ts` lists the packs.

## Intentional skeleton limits

- **Content depth is broad but not exhaustive.** Play, Nursery and Classes 1–12 have seeds; most chapters have one topic and 1–4 visualizations. Class 7 uses a provisional standard chapter list because the source list was missing.
- **Two question templates only** (`addition.singleDigit`, `addition.twoDigit`). `multiplication.singleDigit` exists in the generator registry but has no seeded template.
- **Placeholder visualization renderer.** The backend stores specs; the frontend falls back to `PlaceholderRenderer` for unknown renderers.
- **Embeddings default to `stub`.** Search works without keys; switch `EMBEDDING_PROVIDER=openrouter` for production vectors.
- **Chat fallback.** Without `OPENROUTER_API_KEY`, answers are grounded extracts (`provider: "grounded-fallback"`).
- **`reference-data/legacy-json/`** keeps old blog JSON only as a format reference. It is **not** imported.

## Next phase

1. Expand each chapter from one topic to several topics and add the remaining catalog visualizations per chapter.
2. Implement reusable visualization engines/renderers and publish specs.
3. Expand the question-template registry per chapter and difficulty.
4. Run the knowledge indexer over published topics and validate retrieval quality.
5. Add integration tests for auth, taxonomy and quiz routes against a test database.
6. Add content import tooling if the legacy JSON is reused (new schema only).

<!-- BEGIN CONTENT INVENTORY -->
## Content inventory (generated)

Full per-chapter list: `src/app/content/CHAPTERS.md`. Each pack folder also has its own `CHAPTERS.md`.

| Pack | Level | Chapters | Topics | Viz |
| --- | --- | --- | --- | --- |
| Play | `play` | 5 | 15 | 33 |
| Nursery | `nursery` | 14 | 28 | 44 |
| Class 1 | `class-1` | 18 | 36 | 36 |
| Class 2 | `class-2` | 7 | 22 | 24 |
| Class 3 | `class-3` | 13 | 14 | 35 |
| Class 4 | `class-4` | 11 | 11 | 32 |
| Class 5 | `class-5` | 10 | 10 | 77 |
| Class 6 | `class-6` | 8 | 8 | 84 |
| Class 7 | `class-7` | 11 | 11 | 77 |
| Class 8 | `class-8` | 11 | 11 | 81 |
| Class 9 | `class-9` | 17 | 17 | 156 |
| Class 10 | `class-10` | 17 | 17 | 156 |
| Class 11 | `class-11` | 19 | 19 | 266 |
| Class 12 | `class-12` | 19 | 19 | 266 |

### New topics added (Classes 5–12)

### Class 5

- **Multiplication and Division** — 1 topic(s), 9 viz: `c5-01-multiplication-division`
- **Mathematical Sentences** — 1 topic(s), 6 viz: `c5-02-mathematical-sentences`
- **Multiples and Factors** — 1 topic(s), 8 viz: `c5-03-multiples-factors`
- **Common Fractions** — 1 topic(s), 9 viz: `c5-04-common-fractions`
- **Decimal Fractions** — 1 topic(s), 8 viz: `c5-05-decimal-fractions`
- **Percentage** — 1 topic(s), 8 viz: `c5-06-percentage`
- **Average** — 1 topic(s), 6 viz: `c5-07-average`
- **Measurement** — 1 topic(s), 8 viz: `c5-08-measurement`
- **Geometry** — 1 topic(s), 9 viz: `c5-09-geometry`
- **Data Arrangement** — 1 topic(s), 6 viz: `c5-10-data-arrangement`

### Class 6

- **Natural Numbers and Fractions** — 1 topic(s), 20 viz: `c6-01-natural-numbers-fractions`
- **Ratios and Percentages** — 1 topic(s), 13 viz: `c6-02-ratios-percentages`
- **Integers** — 1 topic(s), 9 viz: `c6-03-integers`
- **Algebraic Expressions** — 1 topic(s), 9 viz: `c6-04-algebraic-expressions`
- **Simple Equations** — 1 topic(s), 8 viz: `c6-05-simple-equations`
- **Basic Concepts of Geometry** — 1 topic(s), 11 viz: `c6-06-basic-geometry`
- **Practical Geometry** — 1 topic(s), 7 viz: `c6-07-practical-geometry`
- **Information and Data** — 1 topic(s), 7 viz: `c6-08-information-data`

### Class 7

- **Integers** — 1 topic(s), 7 viz: `c7-01-integers`
- **Rational and Irrational Numbers** — 1 topic(s), 7 viz: `c7-02-rational-irrational`
- **Congruence and Similarity** — 1 topic(s), 7 viz: `c7-03-congruence-similarity`
- **Multiplication and Division of Algebraic Expressions** — 1 topic(s), 7 viz: `c7-04-algebraic-multiplication`
- **Algebraic Fractions** — 1 topic(s), 7 viz: `c7-05-algebraic-fractions`
- **Simple Equations** — 1 topic(s), 7 viz: `c7-06-simple-equations`
- **Set** — 1 topic(s), 7 viz: `c7-07-set`
- **Quadrilateral** — 1 topic(s), 7 viz: `c7-08-quadrilateral`
- **Pythagoras Theorem** — 1 topic(s), 7 viz: `c7-09-pythagoras`
- **Circle** — 1 topic(s), 7 viz: `c7-10-circle`
- **Information and Data** — 1 topic(s), 7 viz: `c7-11-information-data`

### Class 8

- **Patterns** — 1 topic(s), 7 viz: `c8-01-patterns`
- **Profits** — 1 topic(s), 8 viz: `c8-02-profits`
- **Measurement** — 1 topic(s), 8 viz: `c8-03-measurement`
- **Algebraic Formulae and Applications** — 1 topic(s), 8 viz: `c8-04-algebraic-formulae`
- **Algebraic Fractions** — 1 topic(s), 7 viz: `c8-05-algebraic-fractions`
- **Simple Simultaneous Equations** — 1 topic(s), 7 viz: `c8-06-simultaneous-equations`
- **Set** — 1 topic(s), 7 viz: `c8-07-set`
- **Quadrilateral** — 1 topic(s), 8 viz: `c8-08-quadrilateral`
- **Pythagoras Theorem** — 1 topic(s), 7 viz: `c8-09-pythagoras`
- **Circle** — 1 topic(s), 7 viz: `c8-10-circle`
- **Information and Data** — 1 topic(s), 7 viz: `c8-11-information-data`

### Class 9

- **Real Numbers** — 1 topic(s), 9 viz: `c9-01-real-numbers`
- **Sets and Functions** — 1 topic(s), 11 viz: `c9-02-sets-functions`
- **Algebraic Expressions** — 1 topic(s), 10 viz: `c9-03-algebraic-expressions`
- **Exponents and Logarithms** — 1 topic(s), 11 viz: `c9-04-exponents-logarithms`
- **Equations in One Variable** — 1 topic(s), 10 viz: `c9-05-equations-one-variable`
- **Lines, Angles and Triangles** — 1 topic(s), 11 viz: `c9-06-lines-angles-triangles`
- **Practical Geometry** — 1 topic(s), 7 viz: `c9-07-practical-geometry`
- **Circle** — 1 topic(s), 10 viz: `c9-08-circle`
- **Trigonometric Ratio** — 1 topic(s), 10 viz: `c9-09-trigonometric-ratio`
- **Distance and Elevation** — 1 topic(s), 7 viz: `c9-10-distance-elevation`
- **Algebraic Ratio and Proportion** — 1 topic(s), 7 viz: `c9-11-algebraic-ratio-proportion`
- **Simple Simultaneous Equations in Two Variables** — 1 topic(s), 8 viz: `c9-12-simultaneous-equations`
- **Finite Series** — 1 topic(s), 9 viz: `c9-13-finite-series`
- **Ratio, Similarity and Symmetry** — 1 topic(s), 9 viz: `c9-14-ratio-similarity-symmetry`
- **Area Related Theorems and Constructions** — 1 topic(s), 7 viz: `c9-15-area-theorems`
- **Mensuration** — 1 topic(s), 11 viz: `c9-16-mensuration`
- **Statistics** — 1 topic(s), 9 viz: `c9-17-statistics`

### Class 10

- **Real Numbers** — 1 topic(s), 9 viz: `c10-01-real-numbers`
- **Sets and Functions** — 1 topic(s), 11 viz: `c10-02-sets-functions`
- **Algebraic Expressions** — 1 topic(s), 10 viz: `c10-03-algebraic-expressions`
- **Exponents and Logarithms** — 1 topic(s), 11 viz: `c10-04-exponents-logarithms`
- **Equations in One Variable** — 1 topic(s), 10 viz: `c10-05-equations-one-variable`
- **Lines, Angles and Triangles** — 1 topic(s), 11 viz: `c10-06-lines-angles-triangles`
- **Practical Geometry** — 1 topic(s), 7 viz: `c10-07-practical-geometry`
- **Circle** — 1 topic(s), 10 viz: `c10-08-circle`
- **Trigonometric Ratio** — 1 topic(s), 10 viz: `c10-09-trigonometric-ratio`
- **Distance and Elevation** — 1 topic(s), 7 viz: `c10-10-distance-elevation`
- **Algebraic Ratio and Proportion** — 1 topic(s), 7 viz: `c10-11-algebraic-ratio-proportion`
- **Simple Simultaneous Equations in Two Variables** — 1 topic(s), 8 viz: `c10-12-simultaneous-equations`
- **Finite Series** — 1 topic(s), 9 viz: `c10-13-finite-series`
- **Ratio, Similarity and Symmetry** — 1 topic(s), 9 viz: `c10-14-ratio-similarity-symmetry`
- **Area Related Theorems and Constructions** — 1 topic(s), 7 viz: `c10-15-area-theorems`
- **Mensuration** — 1 topic(s), 11 viz: `c10-16-mensuration`
- **Statistics** — 1 topic(s), 9 viz: `c10-17-statistics`

### Class 11

- **Real Numbers and Inequalities** — 1 topic(s), 13 viz: `c11-01-real-numbers-inequalities`
- **Linear Programming** — 1 topic(s), 10 viz: `c11-02-linear-programming`
- **Complex Numbers** — 1 topic(s), 14 viz: `c11-03-complex-numbers`
- **Polynomials and Polynomial Equations** — 1 topic(s), 13 viz: `c11-04-polynomials`
- **Binomial Expansion** — 1 topic(s), 11 viz: `c11-05-binomial-expansion`
- **Conics** — 1 topic(s), 14 viz: `c11-06-conics`
- **Inverse Trigonometric Functions and Trigonometric Equations** — 1 topic(s), 12 viz: `c11-07-inverse-trig`
- **Statics** — 1 topic(s), 13 viz: `c11-08-statics`
- **Motion of a Particle in a Plane** — 1 topic(s), 13 viz: `c11-09-motion-plane`
- **Measures of Dispersion and Probability** — 1 topic(s), 16 viz: `c11-10-dispersion-probability`
- **Vectors** — 1 topic(s), 13 viz: `c11-11-vectors`
- **Straight Lines** — 1 topic(s), 15 viz: `c11-12-straight-lines`
- **Circle** — 1 topic(s), 13 viz: `c11-13-circle`
- **Permutations and Combinations** — 1 topic(s), 14 viz: `c11-14-permutations-combinations`
- **Trigonometric Ratios** — 1 topic(s), 13 viz: `c11-15-trigonometric-ratios`
- **Trigonometric Ratios of Associated and Compound Angles** — 1 topic(s), 14 viz: `c11-16-compound-angles`
- **Functions and Graphs of Functions** — 1 topic(s), 17 viz: `c11-17-functions-graphs`
- **Differentiation** — 1 topic(s), 19 viz: `c11-18-differentiation`
- **Integration** — 1 topic(s), 19 viz: `c11-19-integration`

### Class 12

- **Real Numbers and Inequalities** — 1 topic(s), 13 viz: `c12-01-real-numbers-inequalities`
- **Linear Programming** — 1 topic(s), 10 viz: `c12-02-linear-programming`
- **Complex Numbers** — 1 topic(s), 14 viz: `c12-03-complex-numbers`
- **Polynomials and Polynomial Equations** — 1 topic(s), 13 viz: `c12-04-polynomials`
- **Binomial Expansion** — 1 topic(s), 11 viz: `c12-05-binomial-expansion`
- **Conics** — 1 topic(s), 14 viz: `c12-06-conics`
- **Inverse Trigonometric Functions and Trigonometric Equations** — 1 topic(s), 12 viz: `c12-07-inverse-trig`
- **Statics** — 1 topic(s), 13 viz: `c12-08-statics`
- **Motion of a Particle in a Plane** — 1 topic(s), 13 viz: `c12-09-motion-plane`
- **Measures of Dispersion and Probability** — 1 topic(s), 16 viz: `c12-10-dispersion-probability`
- **Vectors** — 1 topic(s), 13 viz: `c12-11-vectors`
- **Straight Lines** — 1 topic(s), 15 viz: `c12-12-straight-lines`
- **Circle** — 1 topic(s), 13 viz: `c12-13-circle`
- **Permutations and Combinations** — 1 topic(s), 14 viz: `c12-14-permutations-combinations`
- **Trigonometric Ratios** — 1 topic(s), 13 viz: `c12-15-trigonometric-ratios`
- **Trigonometric Ratios of Associated and Compound Angles** — 1 topic(s), 14 viz: `c12-16-compound-angles`
- **Functions and Graphs of Functions** — 1 topic(s), 17 viz: `c12-17-functions-graphs`
- **Differentiation** — 1 topic(s), 19 viz: `c12-18-differentiation`
- **Integration** — 1 topic(s), 19 viz: `c12-19-integration`

<!-- END CONTENT INVENTORY -->
