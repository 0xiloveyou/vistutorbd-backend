# Learner state API

Mount: `/api/v1/user-state` — **signed in**.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/bookmarks` | List the user's bookmarks with topic summaries |
| POST | `/bookmarks` | Bookmark a published topic |
| DELETE | `/bookmarks/:topicId` | Remove a bookmark |
| GET | `/progress` | Reading progress (`?chapterId=` optional) |
| PUT | `/progress/:topicId` | Upsert progress for a topic |
| PATCH | `/preferences` | Update learner preferences |

## Bookmarks

```json
// POST /bookmarks
{ "topicId": "665f..." }
```

List items contain the bookmark record plus a `topic` summary (`id`, `slug`, `title`, `summary`, `classBandId`, `classLevelId`, `chapterId`, `difficulty`, `status`). Unpublished topics are filtered out.

Deleting a missing bookmark returns `404`.

## Progress

```json
// PUT /progress/:topicId
{
  "isRead": true,
  "lastVizId": "viz.play.numbers.counting.v1",
  "lastStepIndex": 3
}
```

All fields are optional. The service upserts on `(userId, topicId)`.

`GET /progress` returns `Progress` rows with an embedded `topic` summary. Pass `?chapterId=` to narrow the list.

## Preferences

```json
{
  "name": "Ada L.",
  "preferredLang": "bn",
  "preferredTheme": "emerald",
  "classBandId": "C1_5",
  "classLevelId": "class-3",
  "companionEnabled": true,
  "soundEnabled": false
}
```

`classBandId`/`classLevelId` may be `null`. Unknown ids return `400`. The response omits `password`.