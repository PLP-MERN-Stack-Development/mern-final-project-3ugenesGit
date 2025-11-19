# WasteWise API Reference
Base URL: `/api`

## Auth
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | `{ email, password, name }` |
| POST | `/auth/login` | `{ email, password }` |
| POST | `/auth/web3auth` | `{ idToken }` from Web3Auth |

Returns `{ user, token }`. Include `Authorization: Bearer <token>` for subsequent calls.

## Reports
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/reports/feed` | Public/verified reports for map (no auth required) |
| GET | `/reports/mine` | Authenticated user’s reports |
| GET | `/reports` | Admin only — accepts `status`, `category` query params |
| POST | `/reports` | Create report (multipart: `category`, `quantity`, `location`, `photo?`, `notes?`) |
| PATCH | `/reports/:id/status` | Admin update; body `{ status, collector? }` |

Request payload:
```txt
location = JSON string: { "coordinates": [lng, lat], "address": "..." }
photo = file (optional)
notes = optional text
```

Response: `{ report, reward: { reward, ledger, streak } }`

## Rewards
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/rewards/summary` | Returns `{ overview, ledgers }` |
| POST | `/rewards/lottery/run` | Admin-only weekly draw trigger |

## Notifications
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/notifications` | Fetch latest notifications |
| POST | `/notifications/:id/read` | Mark as read |

## Admin
Admin-only routes live under `/admin` and mirror report management:
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/admin/reports` | List reports (filters allowed) |
| PATCH | `/admin/reports/:id/status` | Update status/collector |

## Error Shape
```
{
  "message": "Human readable",
  "stack": "🥞" // hidden in production
}
```

## Rate Limiting & Security
- Global rate limit (default 120 req / 15 min) via `express-rate-limit`
- Helmet + CORS configured per `APP_URL`
- JWT + Web3Auth supported
- Lit Protocol encryption + IPFS storage (falls back to local mock if keys missing for dev)
- Sign Protocol attestations with mocked IDs for dev

