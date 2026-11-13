# Topics API

Mount: `/api/v1/topics`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/` | optional | Paginated published topics |
| GET | `/:slug` | optional | Full topic (lesson, viz summaries, progress, bookmark) |
| POST | `/` | editor | Create |
| PUT | `/:id` | editor | Update |
| DELETE | `/:id` | admin | Delete |

## List topics

```http
GET /api/v1/topics?chapterId=...&categoryId=...&classLevelId=...&classBandId=...&page=1&limit=20
```

`data` is an array of topic summaries. `meta` has `page`, `limit`, `total`, `totalPages`. Reader-level filters:

- `includeUnpublished` is only enabled for editors with `?all=true`.
- Topics are ordered by `difficulty`, then `createdAt`.

Summary fields: `id`, `slug`, `title`, `summary`, `chapterId`, `categoryId`, `classLevelId`, `classBandId`, `difficulty`, `visualizationIds`, `knowledgeStatus`, `status`, `updatedAt`.

## Get topic by slug

`optionalAuth` is used. When the request carries a session, the response adds `progress` and `bookmarked`.

```json
{
  "id": "665f...",
  "slug": "counting-to-ten",
  "chapterId": "...",
  "categoryId": "...",
  "classLevelId": "play",
  "classBandId": "PLAY_NURSERY",
  "title": { "en": "Counting to ten", "bn": "দশ পর্যন্ত গণনা" },
  "summary": { "en": "...", "bn": "..." },
  "lesson": [],
  "visualizationIds": ["viz.play.numbers.counting.v1"],
  "visualizations": [
    {
      "vizId": "viz.play.numbers.counting.v1",
      "kind": "STEPPER",
      "renderer": "number-line",
      "title": { "en": "Counting train", "bn": "গণনার ট্রেন" }
    }
  ],
  "difficulty": 1,
  "status": "PUBLISHED",
  "knowledgeStatus": "READY",
  "progress": { "isRead": false, "lastStepIndex": 0 },
  "bookmarked": false,
  "chapter": { "...": "..." },
  "category": { "...": "..." },
  "classLevel": { "...": "..." },
  "classBand": { "...": "..." }
}
```

Unpublished topics are hidden from readers (`404`).

## Create / update topic

```json
{
  "chapterId": "665f...",
  "slug": "counting-to-ten",
  "title": { "en": "Counting to ten", "bn": "দশ পর্যন্ত গণনা" },
  "summary": { "en": "One more each time.", "bn": "প্রতিবার এক বেশি।" },
  "lesson": [
    {
      "type": "text",
      "order": 0,
      "body": { "en": "Look at $1, 2, 3$.", "bn": "$১, ২, ৩$ দেখুন।" }
    }
  ],
  "visualizationIds": ["viz.play.numbers.counting.v1"],
  "difficulty": 1,
  "status": "PUBLISHED"
}
```

`categoryId`, `classLevelId` and `classBandId` are derived from the chapter. Creating or publishing a topic resets `knowledgeStatus` to `PENDING` so the knowledge indexer can pick it up.

Lesson blocks may contain `$inline$` and `$$block$$` LaTeX; the frontend renders them with KaTeX.