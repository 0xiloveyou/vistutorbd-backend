# Legacy content (archived, never served)

Everything in this folder is kept for reference only. It is not imported by the
application, not seeded and not served by the API.

| Folder | What it is |
| --- | --- |
| `old-app-content/` | The previous `src/app/content` tree: old class/topic/visualization definitions and the old carousels. |
| `old-seed/` | The old class-content and learn-carousel seed helpers. |
| `old-scripts/` | The old `seed-learn`, `content-inventory` and next-plan test scripts. |
| `old-all-class-chapter-and-visualization/` | The old planning documents that used to sit in the backend root. |
| `old-root-content-html/` | The old standalone HTML visual explanations from the project root. |
| `old-public-next-plan/` | The old next-plan source that used to sit in `public/next plan/`; byte-identical to `old-app-content/next-plan/source/`. |
| `mongodb-backup/` | Timestamped JSON exports of the old MongoDB collections removed from the live database. |

The live database no longer contains the old `categories`, `chapters`, `topics`,
`visualizations`, `learn_carousels`, `knowledge_chunks`, `questions`,
`quiz_configs`, `quiz_attempts`, `progress` or `bookmarks` records. New content
comes only from `content-library/`.

To create a fresh backup without deleting anything, run from the backend folder:

```bash
npm run content:archive -- --keep
```

To archive and remove the old collections again, run:

```bash
npm run content:archive
```
