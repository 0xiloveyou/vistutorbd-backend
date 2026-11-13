# Chat API

Mount: `/api/v1/chat`

The companion answers from the platform's own knowledge base (RAG), then optionally rewrites the answer with OpenRouter. When OpenRouter is missing or fails, it returns a grounded extract with `provider: "grounded-fallback"`, so the UI works before `.env` is filled.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/messages` | optional | Ask a question |
| POST | `/image-problem` | optional | Read a photo of a problem |
| GET | `/sessions` | signed in | List the user's sessions |
| GET | `/sessions/:id` | signed in | Session with messages |

Both POST endpoints are rate limited per user/ IP (`CHAT_RATE_LIMIT_PER_HOUR`, default 30/hour). Image analysis uses about one third of that limit.

## Ask

```json
{
  "sessionId": "optional-existing-session",
  "question": "Why does 7 + 5 make 12?",
  "lang": "en",
  "classBandId": "C1_5",
  "classLevelId": "class-3",
  "vizId": "viz.c1_5.numbers.addition.basic.v1",
  "stepIndex": 2,
  "topicSlug": "addition-with-carry",
  "params": {}
}
```

`lang` is `en` or `bn`. `vizId` + `stepIndex` ground the answer in the current visualization step; `topicSlug` grounds it in a topic.

Response:

```json
{
  "sessionId": "665f...",
  "answer": "When you add 7 and 5, ...",
  "provider": "openrouter",
  "grounded": true,
  "sources": [
    { "label": "Addition with carry", "topicSlug": "addition-with-carry" },
    { "label": "Step 2", "vizId": "viz.c1_5.numbers.addition.basic.v1" }
  ]
}
```

- `provider`: `openrouter` or `grounded-fallback`.
- `grounded`: whether any platform context matched.
- `sources`: labels the frontend can show under the bubble.

When nothing matches, the response is still `200`, with `grounded: false` and a helpful fallback message.

Sessions are created automatically for both guests and signed-in users. Guest sessions are retained but not listed by `/sessions`.

## Image problem

```json
{
  "imageDataUrl": "data:image/png;base64,...",
  "lang": "bn",
  "classBandId": "C1_5"
}
```

PNG, JPEG or WebP; maximum encoded size 8 MB. Response:

```json
{
  "problem": "3x + 5 = 20",
  "confirmation": "Please confirm the problem text above. If it is correct, ask me to solve it."
}
```

The model is instructed to transcribe only, never to solve. Vision requires `OPENROUTER_VISION_MODEL`; without it the endpoint returns `503`.

## Sessions

`GET /chat/sessions` returns sessions ordered by most recent activity. `GET /chat/sessions/:id` returns `{ session, messages }` and only for the owner.