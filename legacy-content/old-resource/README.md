# Archived standalone lesson carousels

These HTML files were moved from the project-root `old resource/` folder into
the backend archive. `bun run library:sync` stores the five standalone lesson
carousels in MongoDB as class-aware `LearnCarousel` records for the home hero
and the `/learn` legacy lessons menu. They remain separate from chapter
visualizations, which belong in `content-library/generated-visualizations/`
and must follow `content-library/art-rules/RULES.md`.

The Class 1–5 carousel needs its local `axes()` drawing helper; it is present
in the archived file so its lesson script completes initialization. The
Class 9–10 carousel's malformed object properties are corrected as well.
