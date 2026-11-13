# Moderation API

Mount: `/api/v1/moderation`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/reports` | optional | Submit a report (guests allowed) |
| GET | `/reports` | editor | Queue (`?status=OPEN` etc.) |
| PATCH | `/reports/:id` | editor | Change status |

## Create report

```json
{
  "targetType": "chat_message",
  "targetId": "665f...",
  "reason": "Answer includes unsafe content",
  "details": "The message suggested a dangerous experiment."
}
```

`targetType` is one of `chat_message`, `topic`, `visualization`, `question`. `reason` is 3–200 chars; `details` up to 2000. If the reporter is signed in, `reportedBy` is filled automatically.

## List reports

```http
GET /api/v1/moderation/reports?status=OPEN
```

Returns up to 100 reports, newest first. Without `status`, all statuses are returned.

## Update status

```json
{ "status": "RESOLVED" }
```

Allowed: `OPEN`, `REVIEWING`, `RESOLVED`, `DISMISSED`. The acting editor is stored in `reviewedBy`. Missing report → `404`.