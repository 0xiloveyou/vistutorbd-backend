# Next-plan content bank

This folder merges the three planning documents from `vistutorbd-backend/public/next plan/` into one typed, reproducible content bank, then generates the first activity cycle for `/learn`.

## Sources

| Folder | Original | Purpose |
| --- | --- | --- |
| `/1` | `game.html` + games plan | Game loop, Bolt companion, robot styles |
| `/2` | concept map | 75 concept cards and their links/checks |
| `/3` | idea bank | 148 idea rows, 32 game ideas, 14 interaction templates |

The readable copies live in `source/`. `merge-sources.mjs` turns them into `catalog.generated.json`; `catalog.ts` exposes typed helpers over that file.

## Files

```text
source/                     Copied source documents + the two HTML examples
catalog.generated.json      Parsed merge output (75 concepts, 148 ideas, 32 games, 14 templates)
catalog.ts                  Typed accessors for the merged catalogue
types.ts                    Bilingual, coach, activity and manifest types
groups.ts                   Five groups + their LearnCarousel class/band ids
activities/
  games.ts                  Cycle 1: one game per group
  visuals.ts                Cycle 2: one visual explanation per group
  questions.ts              Cycle 3: one Q&A set per group
  helpers.ts                b(en, bn) + coach() helpers
  index.ts                  NEXT_PLAN_ACTIVITIES (games + visuals + questions)
carousels.ts                LearnCarousel seed metadata for the 15 files
generate.ts                 Writes the standalone HTML documents + manifest
manifest.generated.json     Generated: slug, file, kind, group, cycle, title
runtime/
  engine.js                 Shared behaviour for every activity
  engine.css                Shared styles, including Bolt
  robot.svg                 The cute Bolt robot from the folder-1 game
```

## Build

```bash
cd vistutorbd-backend
npm run content:next-plan
npm run typecheck
npm test
npm run seed          # needs MongoDB/Atlas
```

`generate.ts` writes 15 files into `../carousels/`:

- `next-game-{play-nursery,class-1-5,class-6-8,class-9-10,class-11-12}.html`
- `next-visual-{...}.html`
- `next-question-{...}.html`

Every document injects `window.__NEXT_PLAN__ = { activity, groupLabel, kindLabel }` and then loads the shared runtime inline. The runtime supports:

- robot / line-art / text styles (robot is mandatory in Play & Nursery)
- English and Bangla UI and speech
- Check, Show me how, hint ladder, “I didn’t understand”, sound and restart
- stage-specific SVG scenes, sliders, tap targets and question options

## Learn page

`carousels.ts` maps activities to `LearnCarousel` seeds:

- `VISUAL` → `EXPLANATION`
- `GAME` and `QUESTION` → `QUESTION`
- `order = 100 + cycle * 10 + order / 10`, so each class receives game → visual → Q&A

`src/app/utils/seed-learn-carousels.ts` appends `NEXT_PLAN_CAROUSEL_SEEDS` to the original list, upserts each document by slug and content hash, and the frontend embeds it with `SecureCarouselFrame`.
