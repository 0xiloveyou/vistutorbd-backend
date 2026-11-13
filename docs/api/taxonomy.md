# Taxonomy API

Mount: `/api/v1/taxonomy`

The taxonomy is `ClassBand → ClassLevel → Category → Chapter`. Topic content lives in the [topics API](topics.md).

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/bands` | public | Bands with nested levels |
| GET | `/levels` | public | Class levels (`?bandId=`) |
| GET | `/levels/:id` | public | One class level |
| GET | `/categories` | public | Categories (`?classLevelId=`, `?parentId=`) |
| GET | `/categories/:id` | public | One category |
| POST | `/categories` | editor | Create |
| PUT | `/categories/:id` | editor | Update |
| DELETE | `/categories/:id` | admin | Delete (must have no chapters) |
| GET | `/chapters` | public | Published chapters (`?categoryId=`, `?classLevelId=`, `?classBandId=`) |
| GET | `/chapters/:id` | public | One chapter |
| POST | `/chapters` | editor | Create |
| PUT | `/chapters/:id` | editor | Update |
| DELETE | `/chapters/:id` | admin | Delete (must have no topics) |

## Bands

```json
[
  {
    "id": "PLAY_NURSERY",
    "name": { "en": "Play & Nursery", "bn": "প্লে ও নার্সারি" },
    "style": { "companionRequired": true, "defaultDifficulty": 1 },
    "order": 0,
    "levels": [
      { "id": "play", "bandId": "PLAY_NURSERY", "name": { "en": "Play", "bn": "প্লে" } }
    ]
  }
]
```

`style` is free-form JSON used by the client for tone/companion hints.

## Category

```json
{
  "classLevelId": "class-3",
  "parentId": null,
  "slug": "numbers",
  "title": { "en": "Numbers", "bn": "সংখ্যা" },
  "summary": { "en": "Place value and operations", "bn": "স্থানীয় মান ও ক্রিয়া" },
  "icon": "🔢",
  "order": 0,
  "isActive": true
}
```

A category slug is unique per class level. Deletion is blocked while chapters reference it.

## Chapter

```json
{
  "categoryId": "665f...",
  "slug": "addition",
  "title": { "en": "Addition", "bn": "যোগ" },
  "summary": { "en": "Joining groups", "bn": "দল মিলিয়ে যোগ" },
  "order": 0,
  "prerequisites": ["counting"],
  "status": "PUBLISHED"
}
```

`classLevelId` and `classBandId` are derived from the parent category/level by the service. Public chapter lists only return `PUBLISHED` chapters; editors can include drafts on the topic endpoints with `?all=true` (and on visualization lists). Deletion is blocked while topics reference the chapter.