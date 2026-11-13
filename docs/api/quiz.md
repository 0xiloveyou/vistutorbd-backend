# Quiz API

Mount: `/api/v1/quiz`

Practice is generated from **seeded templates**, not stored questions. The same `(templateKey, seed, mode)` always produces the same question and answer, so attempts can be re-verified on the server.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/config` | signed in | Saved config for a chapter (`?chapterId=`) |
| PUT | `/config` | signed in | Upsert quiz config |
| POST | `/generate` | optional | Generate a question set |
| POST | `/attempts` | signed in | Check and store an attempt |
| GET | `/attempts` | signed in | Recent attempts (`?chapterId=`) |
| GET | `/templates` | editor | List templates (`?chapterId=`) |

## Time modes

| Mode | Seconds per question |
| --- | --- |
| `UNLIMITED` | 0 (no timer) |
| `BASIC` | 60 |
| `MEDIUM` | 30 |
| `HARD` | 15 |
| `CUSTOM` | `customSeconds` (5–3600) |

## Config

```json
// PUT /quiz/config
{
  "chapterId": "665f...",
  "timeMode": "MEDIUM",
  "customSeconds": 0,
  "answerMode": "MCQ",
  "difficulty": 3,
  "numberRange": { "min": 0, "max": 100 },
  "companionSlapstick": false
}
```

`customSeconds` is required when `timeMode` is `CUSTOM`. `GET /config` returns defaults (`timeMode: UNLIMITED`, `answerMode: MCQ`, `difficulty: 1`) when nothing is saved.

## Generate

```json
{
  "chapterId": "665f...",
  "count": 5,
  "mode": "MCQ",
  "difficulty": 2,
  "generator": "addition.singleDigit"
}
```

`count` is clamped to 1–30. `generator` is optional; the service picks the first matching template otherwise.

Template resolution order:

1. Templates attached to the chapter.
2. Templates attached to the chapter's class band.
3. Global templates (`chapterId: null`, `classBandId: null`).

Response:

```json
{
  "chapter": { "id": "...", "title": {}, "classBandId": "...", "classLevelId": "..." },
  "config": { "timeMode": "UNLIMITED", "answerMode": "MCQ", "difficulty": 2, "timerSeconds": 0 },
  "questions": [
    {
      "id": "addition.singleDigit-abc123",
      "templateKey": "addition.singleDigit",
      "prompt": { "en": "3 + 4 = ?", "bn": "3 + 4 = ?" },
      "answer": "7",
      "options": [
        { "id": "a", "label": { "en": "7", "bn": "7" }, "correct": true },
        { "id": "b", "label": { "en": "6", "bn": "6" }, "correct": false }
      ],
      "explanation": { "en": "Count on from 3: 4, 5, 6, 7.", "bn": "..." },
      "difficulty": 2,
      "mode": "MCQ",
      "seed": "chapterId-xxxx-0"
    }
  ]
}
```

`TYPED` questions return `options: []`.

Registered generators (skeleton): `addition.singleDigit`, `addition.twoDigit`, `multiplication.singleDigit`.

Guest generation is allowed so the practice page works before login. Signed-in generation also reads the saved config.

## Submit attempt

```json
{
  "chapterId": "665f...",
  "durationSec": 0,
  "answers": [
    { "templateKey": "addition.singleDigit", "seed": "chapterId-xxxx-0", "submitted": "7" }
  ]
}
```

The server regenerates each question from `templateKey + seed`, checks numbers with `lib/mathEngine.ts` (tolerance `1e-9`), stores the attempt (`configSnapshot`, `answers`, `score`, `total`) and returns:

```json
{
  "attempt": { "...": "..." },
  "score": 4,
  "total": 5,
  "results": [
    { "templateKey": "...", "seed": "...", "submitted": "7", "expected": "7", "correct": true }
  ]
}
```

The AI model is never trusted for arithmetic.