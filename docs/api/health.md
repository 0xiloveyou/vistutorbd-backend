# Health API

Mounts: `/health` and `/api/v1/health`

Public. Returns `200` when MongoDB responds, `503` otherwise.

```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": {
    "uptime": 128.4,
    "environment": "development",
    "services": {
      "database": "up",
      "redis": "disabled (in-memory fallback)",
      "smtp": "disabled (console mail)",
      "openrouter": "disabled",
      "embeddings": "stub",
      "vision": "disabled"
    }
  }
}
```

| Field | Meaning |
| --- | --- |
| `database` | `up` / `down` (MongoDB ping) |
| `redis` | `up` / `down` / `disabled (in-memory fallback)` |
| `smtp` | `configured` / `disabled (console mail)` |
| `openrouter` | `configured` / `disabled` |
| `embeddings` | active provider (`stub`, `local`, `openrouter`) |
| `vision` | `configured` / `disabled` |