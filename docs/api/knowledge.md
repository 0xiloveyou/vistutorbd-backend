# Knowledge API

Mount: `/api/v1/knowledge`

The knowledge base stores embedded text chunks used by the chat companion. Chunks are built from topic summaries, lesson blocks and visualization steps.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/search` | signed in | Semantic search (`?q=` required) |
| GET | `/chunks` | editor | List chunks (`?topicId=`, `?chapterId=`, `?categoryId=`, `?classBandId=`, `?limit=`) |
| POST | `/chunks` | editor | Ingest one chunk |
| POST | `/reindex/topic/:topicId` | admin | Rebuild a topic's chunks |
| DELETE | `/chunks/:id` | admin | Delete a chunk |

## Search

```http
GET /api/v1/knowledge/search?q=carrying+in+addition&classBandId=C1_5&lang=en&limit=5
```

Optional filters: `topicId`, `chapterId`, `classBandId`, `lang`, `kind`, `limit`.

Response:

```json
{
  "model": "stub:hash-384",
  "results": [
    {
      "id": "665f...",
      "topicId": "...",
      "chapterId": "...",
      "vizId": "...",
      "stepIndex": 2,
      "lang": "en",
      "kind": "STEP",
      "text": "Carry the ten to the next column.",
      "score": 0.83
    }
  ]
}
```

Search is **local cosine similarity** over active chunks, not Atlas `$vectorSearch`. With `EMBEDDING_PROVIDER=stub` the vectors are deterministic hashes, so search works without keys. Set `EMBEDDING_PROVIDER=openrouter` and `OPENROUTER_EMBEDDING_MODEL` for real embeddings.

## Ingest

```json
{
  "topicId": "665f...",
  "chapterId": "...",
  "classBandId": "C1_5",
  "vizId": "viz.c1_5.numbers.addition.basic.v1",
  "stepIndex": 1,
  "lang": "en",
  "kind": "CONCEPT",
  "text": "When the ones add to ten or more, carry one ten."
}
```

`text` is 5–8000 chars. The embedding model/provider are recorded on the chunk (`embeddingModel`, `contentHash`).

## Reindex

`POST /reindex/topic/:topicId` deletes the topic's existing chunks and rebuilds them from its summary, lesson blocks and referenced visualization steps. Returns `{ "chunks": 7 }`.

## Index status

Topics expose `knowledgeStatus`:

| Value | Meaning |
| --- | --- |
| `PENDING` | Waiting for indexing |
| `INDEXING` | Indexing in progress |
| `READY` | Chunks available |
| `FAILED` | Indexing failed |