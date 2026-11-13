# Visualizations API

Mount: `/api/v1/visualizations`

Visualizations are **spec data**. The frontend player (`src/viz/VizPlayer.jsx`) consumes the `spec` and chooses a renderer by `renderer`. The skeleton ships a `placeholder` renderer; real renderers are added in the visualization phase.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/` | public | Paginated list (`?tag=`, `?band=`, `?kind=`, `?q=`, `?all=true` for editors) |
| GET | `/:vizId` | public | Full spec (`?all=true` for editors) |
| POST | `/` | editor | Create |
| PUT | `/:vizId` | editor | Update |
| DELETE | `/:vizId` | admin | Delete |

## Visualization id

`viz.<band>.<subject>.<chapter>.<topic>.<variant>.v<version>`

Example: `viz.c1_5.numbers.addition.carrying.basic.v1`

## Payload

```json
{
  "vizId": "viz.play.numbers.counting.basic.v1",
  "kind": "STEPPER",
  "renderer": "number-line",
  "engine": "countingSteps",
  "title": { "en": "Counting one by one", "bn": "এক এক করে গণনা" },
  "summary": { "en": "A number line that walks to ten.", "bn": "দশ পর্যন্ত হাঁটা সংখ্যারেখা।" },
  "inputs": { "max": 10 },
  "spec": {
    "steps": [
      {
        "narration": { "en": "Start at 1.", "bn": "১ থেকে শুরু।" },
        "formula": "1",
        "highlight": [{ "target": "1", "state": "active" }]
      }
    ]
  },
  "tags": ["counting", "play"],
  "concepts": ["cardinality"],
  "prerequisites": [],
  "difficulty": 1,
  "classBandIds": ["PLAY_NURSERY"],
  "version": 1,
  "aiContext": "Counting is one-to-one correspondence.",
  "status": "PUBLISHED"
}
```

## Player contract

The player expects:

- `title` / `summary` as localized text.
- `steps` inside `spec` (array).
- Each step may carry `narration` (localized), `formula` (LaTeX) and `highlight` (`[{ target, state }]`).
- `kind` and `renderer` are displayed to the learner as badges.

Unknown renderers fall back to the placeholder renderer. Step progress is saved through `/user-state/progress/:topicId`.