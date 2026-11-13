# Math Learning Platform â€” Backend

Express 5 + TypeScript REST API for **VisTutorBd**, a visualization-first math platform covering Play, Nursery and Class 1â€“12 in English and Bangla.

The backend owns accounts and roles, the class taxonomy, topics and lesson blocks, visualization specs, deterministic question generation, quiz attempts, learner state, the grounded AI chat, the RAG knowledge base and moderation. The Next.js client lives in `../frontend`.

> **Skeleton phase.** The API surface, data model, auth, quiz engine, chat shell and docs are complete. Content (real chapters, topics and visualization specs) is added in the content phase.

## Stack

- Express 5, TypeScript, tsup, tsx, Biome
- Prisma ORM **6.19** + MongoDB (`prisma`/`@prisma/client` pinned: Prisma 7 has no stable MongoDB connector)
- JWT access/refresh tokens in httpOnly cookies
- bcryptjs password hashing
- Google Identity Services (ID token) and OAuth authorization-code callback
- Nodemailer SMTP with a console fallback in development
- Optional Redis with an in-memory fallback
- OpenRouter for chat and embeddings, with a deterministic local embedding stub
- mathjs answer verification and seeded question generators
- node-cron maintenance jobs

## Setup

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL and secrets
npx prisma generate
npm run db:push           # MongoDB has no migrations
npm run seed              # bands, levels, templates, demo accounts
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | `tsx watch src/server.ts` |
| `npm run build` | Bundle with tsup into `dist/` |
| `npm start` | Run `dist/server.js` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests for the math engine and question generators |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push the schema to MongoDB |
| `npm run db:studio` | Open Prisma Studio |
| `npm run seed` | Idempotent configuration seed |
| `npm run lint:check` / `lint:fix` | Biome lint |
| `npm run format:check` / `format:fix` | Biome format |

## Environment

All variables live in `.env.example`; `.env` is intentionally left for the operator to fill.

| Group | Variables |
| --- | --- |
| Core | `NODE_ENV`, `PORT`, `BACKEND_URL`, `FRONTEND_URL`, `AUTO_SEED` |
| Database | `DATABASE_URL` |
| Auth | `BCRYPT_SALT_ROUNDS`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` |
| Google | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` |
| Mail | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` |
| Redis | `REDIS_URL` or `REDIS_USER`/`REDIS_PASSWORD`/`REDIS_HOST`/`REDIS_PORT` |
| OpenRouter | `OPENROUTER_API_KEY`, `OPENROUTER_CHAT_MODELS`, `OPENROUTER_FALLBACK_CHAT_MODELS`, `OPENROUTER_VISION_MODEL`, `OPENROUTER_EMBEDDING_MODEL` |
| Embeddings | `EMBEDDING_PROVIDER` (`openrouter` \| `local` \| `stub`), `EMBEDDING_MODEL`, `EMBEDDING_DIMENSIONS` |
| Chat | `CHAT_RATE_LIMIT_PER_HOUR` |
| Seeds | `ADMIN_*`, `MODERATOR_*`, `USER_*`, `LEGACY_JSON_DIR` |

Optional services degrade gracefully:

- **SMTP missing** â†’ OTPs are printed to the backend console.
- **Redis missing** â†’ OTP/session/rate-limit state uses an in-memory store.
- **OpenRouter missing** â†’ chat returns a grounded extract from the knowledge base (`provider: "grounded-fallback"`).
- **Google missing** â†’ credential login still works; Google buttons are hidden by the frontend.

## Project structure

```text
prisma/schema.prisma              Users, taxonomy, topics, visualizations, knowledge, quiz, chat, moderation
src/server.ts                     Connect services, optional seed, cron, listen
src/app.ts                        Express app and /api/v1 route mounting
src/app/config/                   Typed env parsing
src/app/lib/                      prisma, redis, mail, google, jwt, cookies, openrouter, embeddings,
                                  mathEngine, questionGenerator, taxonomy, cron
src/app/middleware/               checkAuth (auth/optionalAuth), validateRequest, rateLimit, errors
src/app/module/<feature>/         route â†’ controller â†’ service â†’ validation
src/app/scripts/seed.ts           Configuration seed entry point
src/app/templates/                EJS email templates
reference-data/                    Reference material only, never served at runtime
  legacy-json/                     Old JSON lessons kept only as format reference
  examples/                        Old AI/ML JSON reading list
  legacy-site/                     Original Express/static site
  static-visualization-notes/      Prompt + skill notes for visualizations
docs/api/                          API reference
```

## Roles

| Role | Capabilities |
| --- | --- |
| Guest | Read published taxonomy/topics/visualizations, generate quizzes, ask the chat (rate-limited) |
| `USER` | Everything a guest can do, plus bookmarks, progress, saved quiz config, attempts, knowledge search |
| `MODERATOR` | Author taxonomy/topics/visualizations/knowledge, read the moderation queue and quiz templates |
| `ADMIN` | Everything a moderator can do, plus user management, deletes and knowledge reindexing |

## Response envelope

Successful responses:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Topics fetched.",
  "data": {},
  "meta": {}
}
```

Errors:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Topic not found.",
  "error": {}
}
```

Auth uses httpOnly `accessToken` and `refreshToken` cookies. Browser requests must send `credentials: "include"`.

## API

Base path: `/api/v1`. Health is also available at `/health`.

| Module | Mount | Docs |
| --- | --- | --- |
| Auth | `/auth` | [docs/api/auth.md](docs/api/auth.md) |
| Users | `/user` | [docs/api/users.md](docs/api/users.md) |
| Learner state | `/user-state` | [docs/api/user-state.md](docs/api/user-state.md) |
| Taxonomy | `/taxonomy` | [docs/api/taxonomy.md](docs/api/taxonomy.md) |
| Topics | `/topics` | [docs/api/topics.md](docs/api/topics.md) |
| Visualizations | `/visualizations` | [docs/api/visualizations.md](docs/api/visualizations.md) |
| Quiz | `/quiz` | [docs/api/quiz.md](docs/api/quiz.md) |
| Chat | `/chat` | [docs/api/chat.md](docs/api/chat.md) |
| Knowledge | `/knowledge` | [docs/api/knowledge.md](docs/api/knowledge.md) |
| Moderation | `/moderation` | [docs/api/moderation.md](docs/api/moderation.md) |
| Health | `/health` | [docs/api/health.md](docs/api/health.md) |

See [docs/api/README.md](docs/api/README.md) for conventions, enums and role rules.

## Seed data

`npm run seed` is idempotent and creates **configuration only**:

1. 5 class bands: `PLAY_NURSERY`, `C1_5`, `C6_8`, `C9_10`, `C11_12`.
2. 14 class levels: `play`, `nursery`, `class-1` â€¦ `class-12`.
3. The default companion personality.
4. Two question templates: `addition.singleDigit` (Play/Nursery) and `addition.twoDigit` (Class 1â€“5).
5. `ADMIN`, `MODERATOR` and demo `USER` accounts from env.

No categories, chapters, topics or visualizations are seeded. On startup `AUTO_SEED=true` only fills empty collections and never overwrites edited data.

## Notes

- MongoDB has no migration files; use `db:push`.
- Reference ids (`chapterId`, `topicId`, `userId`, â€¦) are plain strings with no Prisma relations, matching the existing MongoDB style.
- Google-only accounts have no password and must use Google login.
- The chat model never computes quiz answers: generated answers are verified by `lib/mathEngine.ts`.
- `dist/` and `.env` are build/operator artifacts; commit `.env.example` only.
