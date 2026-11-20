# Backend progress

## Demo account setup — 2026-11-20

- Set backend `.env` demo identities/passwords to match `/demo-user` and `/demo-admin` in the frontend.
- Updated `.env.example` and setup notes with matching showcase-only credentials and a production rotation reminder.
- Changed automatic seeding to check for missing configured users on populated databases; existing accounts remain untouched.
- Ran `npm run seed`, but the configured MongoDB host could not resolve from this environment (`os error 10051`, network unreachable). Seeding must complete after backend database connectivity is available; restart the backend or run `npm run seed` then.

_Last updated: Content-library reset — old content archived and purged from MongoDB, new manifest sync and library API, `/learn` rebuilt around a floating chapter menu._

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
| Chat + RAG | ✅ | Grounded context, OpenRouter rewrite, free auto-router fallback, image transcription, free TTS, sessions, rate limit |
| Knowledge | ✅ | Ingest, local cosine search, topic reindex, chunk admin |
| Learner state | ✅ | Bookmarks, progress, preferences |
| Forum | ✅ | Posts/comments/tags/Ask AI; 10 starter posts with comments seeded when the collection is empty |
| Moderation | ✅ | Public report submission, editor queue + status updates |
| Users | ✅ | Admin list/update/soft-delete |
| Health | ✅ | Mongo ping + optional service status |
| Visitor analytics | ✅ | `visits` collection, hydrated visitor id, unique-visitor/page-view summary |
| Visitor report | ✅ | Cron every 6 hours emails admin + moderators today’s visitors at `REPORT_TIMEZONE` |
| Contact | ✅ | Public contact form API → SMTP email with `Reply-To` |
| Search | ✅ | `GET /topics?q=` across English/Bangla titles, summaries and slugs, with class filter + pagination |
| Seed | ✅ | 5 bands, 14 levels, companion, 2 templates, admin/moderator/demo users |
| Learn carousels | ✅ | Generic explanation carousel + Class 9–10 visual lab seeded from `content/carousels/` into MongoDB; served at `/api/v1/learn/*` |
| Next-plan content bank | OK | Folder 1+2+3 merged into `content/next-plan/`: 75 concept cards, 148 idea rows, 15 activities (5 games, 5 visuals, 5 Q&A) generated into carousel HTML |
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
| Content library | ✅ | Manifest sync publishes 163 chapters across 14 classes; `library_visualizations` stays empty until approved HTML is added |
| Library API | ✅ | `/api/v1/library/classes`, `/classes/:classId/chapters`, `/chapters/:chapterId`, `/chapters/:chapterId/visualization` |
| Legacy archive | ✅ | Old app content, root HTML and seeds under `legacy-content/`; old MongoDB content backed up then purged |
| Tests | OK | Unit tests for the math engine and generators (`npm test`) |
| Docs | ✅ | `README.md`, `docs/api/*`, `content-library/README.md`, `legacy-content/README.md` |

> **Legacy notice.** The class-content, Learn carousel and next-plan rows below describe the archived pre-library pipeline. Those files now live under `legacy-content/` and are no longer seeded or served.

## Latest update

### Content-library reset and new Learn pipeline

- Adopted `content-library/all-class-content-new/` as the only chapter source and `content-library/art-rules/RULES.md` (`Example.html`) as the mandatory visualization contract. `content-library/generated-visualizations/` is the only accepted HTML output folder.
- Moved the old app content, backend-root class/chapter/visualization docs, project-root `content/` HTML, old seed scripts and old scripts into `legacy-content/` with a README map. The leftover `public/next plan/` source (byte-identical to the already-archived next-plan sources) is now `legacy-content/old-public-next-plan/`, so the active `public/` folder holds only the companion and logo assets.
- Added `LibraryChapter` (`library_chapters`) and `LibraryVisualization` (`library_visualizations`) to Prisma; ran `prisma generate` and `db push`.
- Added `src/app/module/library/` and mounted `/api/v1/library/*`.
- Added `src/app/utils/library-sync.ts` plus `library:sync`, `content:validate` and `content:archive` scripts. Sync reads `site-manifest.json`, validates HTML against the art rules, reports height, injects the height bridge and autoplay/loop support, then upserts chapters/visualizations.
- Removed old content/carousel seeding from `seed.ts`; the seed now calls `syncLibraryChapters()`.
- Ran the library sync: **163 chapters, 0 visualizations** (no approved HTML exists yet).
- Ran the archive script: old categories, chapters, topics, visualizations and learn carousels were backed up under `legacy-content/mongodb-backup/2026-11-18T09-19-42-114Z/` and deleted. Users, forum posts and chat data were kept.
- Verified the database now holds 0 legacy content rows and 163 library chapters.
- Frontend `/learn` now uses the library API with a class picker, floating hamburger chapter drawer and a `SecureCarouselFrame` player. A missing visualization renders a "being prepared" panel.

### Next-plan merge and the first game/visual/Q&A cycle

- Merged the three source documents into a typed bank under `src/app/content/next-plan/`. `merge-sources.mjs` parses the copies in `next-plan/source/` into `catalog.generated.json`: **75 concept cards**, **148 idea-bank rows**, **32 game ideas**, **14 interaction templates** and **4 worked examples**.
- Added the shared runtime in `next-plan/runtime/` (`engine.js`, `engine.css`, `robot.svg`). It keeps the folder-1 game pattern (meet → see → try → play → check → reward → review) and the cute Bolt robot, including speech bubbles, flying, pointing, moods, Bangla/English speech and reduced-motion handling.
- Built the first cycle as **one game + one visual + one Q&A set per group**: Play & Nursery, Class 1–5, Class 6–8, Class 9–10 and Class 11–12. Games cover counting mangoes, fraction pizza, an integer elevator, parabola hoop shots and a secant-slope tracker; visuals cover shapes, an equivalent-fraction wall, Pythagoras squares, the parabola family and secant→tangent; Q&A sets cover the core ideas of each band with picture scenes and per-question explanations.
- Added `generate.ts` and `npm run content:next-plan`. It injects each activity as `window.__NEXT_PLAN__`, uses `defaultStyle: "robot"` everywhere, and writes 15 standalone files (`next-game-*`, `next-visual-*`, `next-question-*`) plus `manifest.generated.json` into `content/carousels/`. The Play & Nursery document hides the style switch so Bolt is mandatory there.
- Registered the 15 documents in `seed-learn-carousels.ts` through `next-plan/carousels.ts`. Visuals seed as `EXPLANATION`; games and Q&A seed as `QUESTION`; class levels and bands come from `next-plan/groups.ts`. Ordering is cycle-based (`100 + cycle*10 + order/10`), so the new visual sorts after the original explanation carousels and the new game/Q&A sort after the original question carousels.

- Added `src/app/content/carousels/class-9-10.html`: a featured hero plus **14** lessons (11 robot explainers, 3 explore/line-art lessons) with live controls for base, central angle, observer distance, scale factor, series terms/ratio and radius. Topics span real numbers, sets/functions, exponents and logarithms, linear equations, exterior and inscribed angles, trig waves, elevation, similar triangles, simultaneous equations, geometric series, mensuration, ogives and Heron's formula.
- Registered `explanation-class-9-10` in `seed-learn-carousels.ts` with `kind: "EXPLANATION"`, `classLevelIds: ["class-9", "class-10"]`, `classBandIds: ["C9_10"]`, and `order: 1`. `npm run seed` and `AUTO_SEED=true` upsert it by slug and content hash.
- `/api/v1/learn/carousels?classLevelId=class-9&kind=EXPLANATION` now returns the generic carousel plus the Class 9–10 lab; the frontend prefers the class-specific document.
- Added `seedForumPosts()` to `src/app/utils/seed.ts`. It counts `forum_posts`, exits when at least one post exists, and otherwise creates **10 starter maths questions** (matrix multiplication, trig identity, quadratic, statistics, circle area, limits, integration, probability, Pythagoras, algebraic simplification) plus their starter comments. `$...$` maths in the bodies exercises the frontend KaTeX path.
- Wired `seedForumPosts()` into both `seedDatabase()` (`npm run seed`) and `seedDatabaseIfEmpty()` (startup `AUTO_SEED=true`), outside the user/taxonomy/content checks so the forum seeds even when the rest of the database is already populated. The helper is idempotent and never overwrites edited posts.
- Added `Visit` analytics: `POST /analytics/visit` records one page view per browser id/path (five-minute de-dupe), and `GET /analytics/visitors` returns unique visitors, page views, signed-in visitors and top pages.
- Added `scheduleVisitorReport()`: `VISITOR_REPORT_CRON` (default `0 */6 * * *`) emails the admin and every moderator the current day’s visitor count in `REPORT_TIMEZONE` (default `Asia/Dhaka`) plus a rolling six-hour count. `POST /analytics/visitors/report` sends it on demand (admin).
- Added the public `POST /contact` endpoint and `contact-message.ejs` email template.
- Added full-text-style topic search via `GET /topics?q=…&classLevelId=…&page=…&limit=…`; both English and Bangla titles/summaries are matched, and the response keeps the pagination envelope.
- Startup is now resilient: the HTTP server starts before seeding, `AUTO_SEED` retries with an actionable Atlas message instead of crashing, and `seedDatabaseIfEmpty()` no longer double-queries with `Promise.all` or re-seeds users that already exist.
- Cron job added to `startCronJobs()`; no changes are required in the frontend for the email report.
- Chat reliability: the model chain now always appends `openrouter/free` (disable with `OPENROUTER_FREE_ROUTER_FALLBACK=false`) and enforces a 75-second total budget, so a broken free model cannot hold the request for several minutes.
- Added free voice output at `POST /api/v1/chat/speech`: OpenRouter’s `/audio/speech` with `fish-audio/s2.1-pro-free:free` (fallback `heygen/heygen-voice-1-turbo:free`), returning raw `audio/mpeg`. Text is stripped of Markdown/LaTeX first. Bangla returns `422` because the client uses the free browser `bn-BD` voice instead of the silent free-model output.
- Added `OPENROUTER_TTS_MODELS`, `OPENROUTER_FALLBACK_TTS_MODELS`, `OPENROUTER_TTS_VOICE` and `OPENROUTER_FREE_ROUTER_FALLBACK`; health now reports `voice: configured`. Fixed a stray non-Bangla word in the Bangla photo-confirmation copy.
- `npm run dev` now watches `.env` (`tsx watch --include .env`). A rotated `OPENROUTER_API_KEY` used to leave the running process holding the old, revoked key, so every model returned `User not found.` and chat silently degraded to `grounded-fallback` until a manual restart.
- Diagnosed the live “Could not reach the server” report: several orphaned `tsx watch` / `next dev` instances were competing for ports 3000/3001/5000, so requests intermittently hit a restarting or half-bound process. Stopped the duplicates and left one backend (`5000`) and one frontend (`3000`).

## Verification

```bash
npm run typecheck                 # clean
npm test                          # 16 pass
npm run content:next-plan         # 15 activities + manifest
npm run build                     # tsup bundle succeeds
```

- `POST /chat/speech` with `lang: "en"` → `200 audio/mpeg` (≈98 KB for a test sentence); `lang: "bn"` → `422` by design.
- `/health` reports `openrouter: configured`, `vision: configured`, `voice: configured`.
- `class-9-10.html` syntax check passes; the frame harness renders **14 visuals / 25 modes / 325 frames** with no errors and reports the robot-first order.
- All 15 `next-*` documents pass a script-extraction check: the injected `window.__NEXT_PLAN__` payload parses, the runtime body parses, and each file contains exactly one `#robot` and one `#rsvg`. A DOM-stub smoke test also initializes all 15 documents (title, stage and kind render) without errors.
- Headless-Chrome harness ran all 15 documents end to end: option → Check → Next in every Q&A set, `Show me how` narration in every game/visual, and the Bolt bubble/caption in robot and text modes. No unresolved `{placeholder}` tokens remain.
  - `roundVars()` returned early for visuals because they have no `rounds[]`, so `a² = {a2}`, `({h}, {k})` and `x = {a}` leaked into Pythagoras, parabola and secant narration; the visual branch now runs before the `rounds` guard.
  - `steps()` now interpolates `roundVarsForMessage()`, which fixed game steps such as `A is at x = {a}` and `It says {a}`.
  - The fraction-wall coach copy now matches its control (a line toggle, not a slider) and the toggle relabels between **Show the line** / **Hide the line**.
  - `main` bottom padding is `260px` (`240px` under 620px) so Bolt and the speech bubble clear the control row inside the `/learn` iframe.
- `npm run learn:seed` upserted **25** carousel documents. The 15 next-plan rows are active, contain Bolt and the height reporter, and carry the expected `classLevelIds`/`order` (visuals `121`, games `111`, Q&A `132`).
- Class-list queries match the `/learn` contract: Play and Class 1–5 get the new game + Q&A after their existing question carousel, and Class 6–12 now get game + Q&A rows where the question list was previously empty; every group gets its visual in the explanation list.
- The carousel seed ran successfully: `explanation-class-9-10` is active with `classLevelIds: ["class-9", "class-10"]` and `order: 1`; the collection returns both `explanation-all` and the Class 9–10 lab.
- `seedForumPosts()` creates 10 posts + comments only when `forum_posts` is empty; a second run prints the skip message and leaves the collection unchanged.

> `AUTO_SEED=true` seeds automatically on startup. If MongoDB Atlas is unreachable, whitelist the machine’s public IP under **Atlas → Network Access** and the retry loop seeds without a restart. The catalog audit still finds 14 packs, 180 chapters, 238 topics and 325 visualizations.

> **OpenRouter key rotation:** `npm run dev` watches `.env`, so saving a new key restarts the API automatically. If chat answers show `provider: "grounded-fallback"`, compare the key in `.env` with the running process — a revoked key produces `User not found.` for every model. The free tier allows 50 model requests per day (`GET /api/v1/key` shows the remaining count).

> **Multi-IP NAT fix (2026-11-13, resolved):** some ISPs route different destinations through different outbound IPs. On this machine `api.ipify.org` reported `103.51.53.36`, `ipinfo.io` reported `103.51.53.37`, and `icanhazip.com` reported `103.51.53.38`; Atlas only accepted the whitelisted one, so shard `-00-00` connected but the primary `-00-01` failed TLS with `InternalError`, producing `ReplicaSetNoPrimary` / `Server selection timeout`. Whitelisting `103.51.53.0/24` in **Atlas → Network Access** fixed all three shards. Verify with `Resolve-DnsName` and a direct `prisma.$runCommandRaw({ hello: 1 })` against each shard. Seed and `prisma db push` both complete now: 4 users, 5 bands, 14 levels, 180 chapters, 238 topics, 1533 visualizations.

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

- **Carousel chrome can cover Bolt.** The activities dock Bolt at the bottom-left of their own frame. On `/learn` the floating section pills sit in the same corner, so when a frame's bottom edge is near the viewport bottom the pills can cover the robot. The speech bubble still renders above the pills, and the site-wide Bolt sits bottom-right.
- **Activities open in English even when the site is Bangla.** The frame's `EN / বাংলা` button switches everything (labels, narration, Bengali digits) inside the activity, but the srcdoc frame does not inherit the parent page locale.

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

