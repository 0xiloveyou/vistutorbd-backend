# Legacy JSON reference data

These files are **format references only**. They are not imported by the MathPlay seed or runtime.

The old project stored blog-style lessons as JSON. The math platform uses a different model (`ClassBand → ClassLevel → Category → Chapter → Topic`, localized text, lesson blocks, visualization specs), so the files are kept only so content authors can reuse prose and structure where it makes sense.

## Layout

```text
legacy-json/
  legacy-posts/     JSON from the previous `legacy/public/posts/` site
  examples-posts/   JSON from `examples/posts/` (AI/ML reading list)
```

## Mapping when reusing content

| Legacy field | MathPlay target |
| --- | --- |
| `title` / `name` | `Topic.title: { en, bn }` |
| `description` / `summary` | `Topic.summary: { en, bn }` |
| `content` / body sections | `Topic.lesson[]` blocks (`text`, `formula`, `example`, `callout`) |
| code samples / demos | `Visualization.spec` (new spec required) |
| tags | `Topic` selection only; not a schema field |

Do **not** bulk-import. Author new bilingual content and use these files as a writing reference.

Set `LEGACY_JSON_DIR` in the backend `.env` to this folder if an import script is added later. The current seed does not read it.