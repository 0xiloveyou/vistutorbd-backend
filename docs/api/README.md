# VisTutorBd API reference

Base URL: `http://localhost:5000/api/v1` (configurable through the backend env and the frontend `NEXT_PUBLIC_API_BASE_URL`).

Health is available at both `/health` and `/api/v1/health`.

## Response envelope

Success:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Topics fetched.",
  "data": [],
  "meta": { "page": 1, "limit": 20, "total": 0, "totalPages": 1 }
}
```

Failure:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Topic not found.",
  "error": {}
}
```

`meta` is only present on paginated lists.

## Authentication

- Access and refresh JWTs are set as **httpOnly cookies** (`accessToken`, `refreshToken`).
- Browser clients must send `credentials: "include"`.
- `Authorization: Bearer <accessToken>` is also accepted by the auth middleware.
- `POST /auth/refresh-token` rotates both cookies.
- `POST /auth/logout` clears both cookies.

Access levels used below:

| Level | Meaning |
| --- | --- |
| public | No session required |
| optional | Works for guests; signed-in users get extra fields (progress, bookmark, drafts for editors) |
| signed in | Any `USER`, `MODERATOR` or `ADMIN` |
| editor | `ADMIN` or `MODERATOR` |
| admin | `ADMIN` only |

## Shared shapes

### Localized text

```json
{ "en": "Counting to ten", "bn": "দশ পর্যন্ত গণনা" }
```

Both keys are required when creating content. Readers should fall back to `en` when `bn` is missing.

### Lesson block

```json
{
  "id": "block-1",
  "type": "text",
  "order": 0,
  "title": { "en": "Idea", "bn": "ধারণা" },
  "body": { "en": "Text with $x^2$ math.", "bn": "গণিতসহ লেখা।" },
  "formula": "x^2 + y^2 = z^2",
  "vizId": "viz.play.numbers.counting.v1",
  "audioText": { "en": "", "bn": "" },
  "companion": "point"
}
```

`type` is one of `text`, `formula`, `example`, `visualization`, `callout`, `quiz`.

### Slugs and ids

- Slugs match `^[a-z0-9]+(?:-[a-z0-9]+)*$`, 2–80 chars.
- Visualization ids match `viz.<band>.<subject>.<chapter>.<topic>.<variant>.v<version>`.
- Class level ids are readable strings: `play`, `nursery`, `class-1` … `class-12`.
- Class band ids: `PLAY_NURSERY`, `C1_5`, `C6_8`, `C9_10`, `C11_12`.

## Enums

| Enum | Values |
| --- | --- |
| `Role` | `ADMIN`, `MODERATOR`, `USER` |
| `UserStatus` | `ACTIVE`, `BLOCKED`, `DELETED` |
| `AuthProvider` | `GOOGLE`, `CREDENTIAL` |
| `ContentStatus` | `DRAFT`, `REVIEW`, `PUBLISHED`, `ARCHIVED` |
| `VisualizationKind` | `STATIC`, `ANIMATED`, `STEPPER`, `SLIDER_GRAPH`, `SCENE` |
| `KnowledgeKind` | `CONCEPT`, `WORKED_EXAMPLE`, `MISCONCEPTION`, `FORMULA`, `HINT`, `GLOSSARY`, `STEP` |
| `QuestionMode` | `MCQ`, `TYPED` |
| `TimeMode` | `UNLIMITED`, `BASIC`, `MEDIUM`, `HARD`, `CUSTOM` |
| `ChatRole` | `SYSTEM`, `USER`, `ASSISTANT` |
| `ReportStatus` | `OPEN`, `REVIEWING`, `RESOLVED`, `DISMISSED` |

## Endpoint index

| Module | Docs |
| --- | --- |
| Auth | [auth.md](auth.md) |
| Users | [users.md](users.md) |
| Learner state | [user-state.md](user-state.md) |
| Taxonomy | [taxonomy.md](taxonomy.md) |
| Topics | [topics.md](topics.md) |
| Visualizations | [visualizations.md](visualizations.md) |
| Quiz | [quiz.md](quiz.md) |
| Chat | [chat.md](chat.md) |
| Knowledge | [knowledge.md](knowledge.md) |
| Moderation | [moderation.md](moderation.md) |
| Health | [health.md](health.md) |

## Status codes

| Code | Meaning |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 400 | Validation error or bad request |
| 401 | Missing/invalid session |
| 403 | Authenticated but wrong role |
| 404 | Resource not found |
| 409 | Conflict (duplicate email/slug, non-empty delete) |
| 422 | Zod validation failure |
| 429 | Rate limit exceeded (chat, OTP) |
| 503 | A required service or template is unavailable |
