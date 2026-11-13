# Users API

Mount: `/api/v1/user` — **ADMIN only**.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Paginated user list |
| PATCH | `/:id` | Update name, role or status |
| DELETE | `/:id` | Soft-delete a user |

## List users

```http
GET /api/v1/user?page=1&limit=20&search=ada&role=USER
```

`data` is an array of users without passwords. `meta` contains `page`, `limit`, `total`, `totalPages`. Soft-deleted users (`isDeleted: true`) are excluded.

## Update user

```json
{ "name": "Ada L.", "role": "MODERATOR", "status": "ACTIVE" }
```

Roles: `ADMIN`, `MODERATOR`, `USER`. Statuses: `ACTIVE`, `BLOCKED`, `DELETED`.

## Delete user

Soft delete: sets `isDeleted: true`, `status: "DELETED"` and `deletedAt`. The acting admin cannot delete their own account (`400`).