# Visualization Catalog: How to Read and Use It

This folder replaces the one-line "visualization idea" column in `curriculum.md`. Each chapter now has a **full set** of visualizations covering everything the chapter teaches. Class 11–12 go to the maximum depth.

Files:
- `play-nursery.md`: Play, Nursery
- `class-1-5.md`: Classes 1–5
- `class-6-8.md`: Classes 6–8
- `class-9-10.md`: Classes 9–10
- `class-11-12.md`: Classes 11–12 (maximum difficulty)

> Still a **planning catalog**. Do not build these yet. During the skeleton phase build only the player, the renderer registry and one or two samples.

---

## 1. Coverage Rule: Every Chapter Must Have These 7 Kinds

| # | Kind | Purpose |
|---|---|---|
| 1 | **Intro / meaning** | What is this idea? Picture or story first |
| 2 | **Step-through (stepper)** | The method shown one step at a time, with narration, sound, back/forward |
| 3 | **Explore (sandbox)** | Learner changes inputs or sliders and sees results live |
| 4 | **Misconception** | Shows the common wrong way, then why it fails |
| 5 | **Real-world link** | The idea inside a real situation (market, cricket, bus, river, etc.) |
| 6 | **Practice visual** | Visual used inside quiz hints and answer explanations |
| 7 | **Challenge** | Hardest tier of the chapter, optional |

A chapter is **not complete** unless it has at least kinds 1, 2, 3, 4 and 6. Higher classes should have all 7, usually more than one of each.

## 2. Difficulty Tiers (used inside each visualization)

| Tier | Name | Meaning |
|---|---|---|
| T1 | Basic | Small numbers, one idea, heavy hints |
| T2 | Medium | Larger numbers, two ideas combined |
| T3 | Hard | Multi-step, exam-style, fewer hints |
| T4 | Max | Class 11–12 only: proofs, generalizations, parameters, edge cases |

Each visualization lists the tiers it supports as `T1–T3` etc. Tier changes the **inputs, the number of steps, the hints and the narration depth**, never the renderer.

## 3. Entry Format

```
- **slug** `renderer` | what it shows | controls | tiers | notes (sound / companion / AI)
```

- Full `vizId` = `viz.<band>.<chapterId>.<slug>.v1`, e.g. `viz.c11_12.c11_12.18.tangent-slope.v1`.
- `companion` means the companion character acts (points, walks, reacts) at steps.
- `voice` means spoken narration is expected (mandatory for Play/Nursery, Class 1–2).
- `sim` means a simulation with randomness or physics.
- Every entry also needs bilingual narration, per-step `aiContext`, and 2+ knowledge chunks (see `requirements.md` §6 and §8).

## 4. Renderer Registry (shared building blocks)

One renderer serves many visualizations. Build these once, reuse everywhere.

| Renderer | Used for |
|---|---|
| `object-counting` | Tap/count animals, fruit, birds; arrow or companion points |
| `finger-hands` | Two hands, each finger lights, with a spoken number |
| `number-line` | Jumps, intervals, fractions, integers, inequalities |
| `number-grid` | 1–100 and larger grids, skip-counting, patterns |
| `ten-frame` / `base-blocks` | Place value, regrouping, carry and borrow |
| `balance-scale` | Comparison, equations, algebra |
| `array-grid` | Multiplication, area, factors |
| `fraction-bar` / `pie` | Fractions, decimals, percent |
| `clock` / `calendar` | Time |
| `money-shop` | Currency, change, profit/loss |
| `shape-canvas` | Shape recognition, building, sorting, symmetry |
| `geometry-board` | Dynamic geometry (points, lines, circles, constructions, theorems) |
| `solid-3d` | 3D solids, nets, cross sections, vectors in 3D |
| `coordinate-plane` | Points, lines, regions, transformations |
| `function-graph` | Functions with sliders, limits, derivatives, integrals |
| `parametric-polar` | Parametric and polar curves, conics, unit circle |
| `complex-plane` | Argand plane, roots, rotations |
| `chart` | Bar, pie, line, histogram, box plot, scatter |
| `prob-sim` | Coins, dice, spinners, trees, distributions |
| `venn-set` | Sets and logic |
| `algebra-stepper` | Symbolic step-by-step (expand, factor, solve, simplify) |
| `tape-diagram` | Word problems, ratio, percent |
| `vector-field` | Vectors, forces, motion |
| `physics-scene` | Statics, projectile, relative motion |
| `matrix-grid` | Matrices (the existing Matrix Multiplication example) |
| `compass-construct` | Ruler and compass constructions |
| `story-scene` | Illustrated word problems with the companion |

## 5. Shared Interaction Patterns (apply everywhere)

- **Predict-then-reveal:** ask the learner for the next step before showing it (T2+).
- **Tap-a-step-to-jump:** each written step links to a frame.
- **Error injection:** a "find the mistake" mode that plants a classic error.
- **Verify with the math engine:** every number shown is checked by code, never by the LLM.
- **"I didn't understand" button:** sends `vizId + stepIndex + params` to the chatbot.
- **Sound toggle, language toggle (BN/EN), reduced-motion mode.**
- **Export state:** a visualization can be reopened with the same params (shareable link).
