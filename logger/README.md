# Backend log files

The backend writes one JSON record per line to this folder while it is running. The folder is resolved from the backend process working directory (`backend/`). It is created automatically if it does not exist. Files are split by category and UTC date, for example `error-2026-11-12.txt`.

## Files

- `success-YYYY-MM-DD.txt` — successful HTTP requests (status codes below 400) and successful startup events.
- `error-YYYY-MM-DD.txt` — HTTP requests with status codes 400 and above, request exceptions, and startup failures.
- `info-YYYY-MM-DD.txt` — informational events such as server shutdown.
- `combined-YYYY-MM-DD.txt` — every record written to the category files above.

Each record includes an ISO timestamp and an `event` name. HTTP request records also include a request ID, method, path, response status, duration in milliseconds, and client IP. When authenticated, the actor's ID and role are included. Query strings are omitted from logged paths. Sensitive fields such as passwords, tokens, cookies, authorization headers, and API keys are redacted. Old daily files are removed after 14 days.

Example:

```json
{"timestamp":"2026-11-12T14:00:00.000Z","level":"success","event":"http_request","requestId":"...","method":"GET","path":"/api/v1/health","statusCode":200,"durationMs":8,"ip":"127.0.0.1"}
```

## Progress

- Added a shared structured logger that writes to stdout and daily category files.
- Added global HTTP request logging with a response request ID.
- Added exception and server lifecycle logging.
- Added basic redaction for sensitive keys and credential-like text.
- Added a protected `/api/v1/moderation/logs` endpoint and log tabs in the admin and moderator dashboards. It returns at most 500 recent entries per request.
- Logs remain outside MongoDB: routine request logs can grow quickly and are operational events, while databases are better reserved for business records and deliberate audit events. Production should collect stdout in the hosting platform; local daily files are retained for 14 days and are ignored by Git.

Log files are created on the first matching event, so this folder may contain only this README before the backend runs.
