# Legacy content archive

`old-resource/` contains five standalone visual lesson carousels. The backend
`library:sync` command stores them in MongoDB as class-aware `LearnCarousel`
records; the homepage hero and `/learn` legacy menu read those records through
the Learn API.

Archived source and database backups here are not used as chapter content.
New chapter visualizations belong in `content-library/generated-visualizations/`
and must follow `content-library/art-rules/RULES.md`.
