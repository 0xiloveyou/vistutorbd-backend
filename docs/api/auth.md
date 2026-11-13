# Auth API

Mount: `/api/v1/auth`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/register` | public | Start registration and email an OTP |
| POST | `/verify-email` | public | Verify OTP, create the user, set cookies |
| POST | `/resend-verification-otp` | public | Resend registration OTP (once per minute) |
| POST | `/login` | public | Email/password login |
| GET | `/me` | signed in | Current profile |
| POST | `/refresh-token` | refresh cookie | Rotate tokens |
| POST | `/google` | public | Verify a Google ID token |
| GET | `/google/start` | public | Build a Google authorization URL |
| POST | `/google/callback` | public | Exchange a Google authorization code |
| POST | `/forgot-password` | public | Email a reset OTP |
| POST | `/resend-forgot-password-otp` | public | Resend password reset OTP (once per minute) |
| POST | `/reset-password` | public | Set a new password |
| POST | `/logout` | public | Clear auth cookies |

## Password rules

At least 8 characters, with a lowercase letter, an uppercase letter, a number and a special character.

## Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "VisTutor@123"
}
```

Returns `201` with `data: null`. The OTP is stored in Redis (or memory) and emailed. In development it is also printed to the backend console.

## Verify email

```json
{ "email": "ada@example.com", "otp": "123456" }
```

Sets the access/refresh cookies and returns the token pair plus the created user.

## Login

```json
{ "email": "ada@example.com", "password": "VisTutor@123" }
```

Returns:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

Cookies are set by the response. Blocked or deleted accounts return `403`/`401`.

## Me

```http
GET /api/v1/auth/me
```

Returns the user without `password`, including preferences (`preferredLang`, `preferredTheme`, `classBandId`, `classLevelId`, `companionEnabled`, `soundEnabled`).

## Google

### ID-token flow (frontend button)

```json
{ "idToken": "<credential from Google Identity Services>" }
```

### Authorization-code flow

1. `GET /auth/google/start?state=...` → `data.url`.
2. Redirect the browser to that URL.
3. Google redirects to `GOOGLE_REDIRECT_URI` (default `http://localhost:3000/auth/google/callback?code=...`).
4. The frontend posts `{ "code": "..." }` to `POST /auth/google/callback`.

Both flows set cookies. Google-only accounts have `password: null` and must use Google login.

## Forgot / reset password

```json
// POST /forgot-password
{ "email": "ada@example.com" }

// POST /reset-password
{ "email": "ada@example.com", "otp": "123456", "newPassword": "NewMath@123" }
```

## Logout

```http
POST /api/v1/auth/logout
```

Clears both cookies. Safe to call without a session.
