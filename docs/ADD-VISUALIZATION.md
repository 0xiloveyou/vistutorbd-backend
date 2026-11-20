# Publish a new visualization

1. Add the approved HTML file to `content-library/generated-visualizations/<class>/`. Use the matching chapter filename described in `content-library/art-rules/RULES.md`.
2. From `vistutorbd-backend`, run:

   ```bash
   bun run content:validate
   bun run library:sync
   ```

   The sync reads your local HTML and writes it to MongoDB using `DATABASE_URL` in the backend `.env`.

3. Confirm that `DATABASE_URL` points to the same Atlas database used by the deployed Vercel backend. The deployed frontend must use that backend's URL in `NEXT_PUBLIC_API_BASE_URL`.
4. Open Learn and select the chapter. The new visualization should load from the library API; no Learn button change is needed.

Running `bun run dev` only starts the backend locally. It does not deploy code to Vercel. For file based visualizations, the sync command publishes the HTML to MongoDB; changing the HTML in your local folder alone does not update the database.
