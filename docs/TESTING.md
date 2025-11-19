# Testing Strategy

## Backend
- Runner: native `node --test` (see `package.json`)
- Command: `cd backend && npm run test`
- Current coverage:
  - `rewardService` reward math + streak handling
- Suggested additions:
  - Controllers with `supertest`
  - Integration tests using in-memory MongoDB (mongodb-memory-server)
  - Queue / lottery job unit tests

## Frontend
- Runner: `vitest` + `@testing-library/react`
- Command: `cd frontend && npm run test`
- Current coverage:
  - `authSlice` reducers
  - `reportSlice` offline queue logic
- Suggested additions:
  - Component tests for `ReportForm`, `MapView`, `NotificationsPanel`
  - Hook tests for `useReports` (mock React Query)

## Manual QA Checklist
- Auth: register/login/Web3Auth placeholder
- Map: verify markers appear once reports exist
- Report submission: confirm photo upload + offline queue badge
- Admin panel: status transitions update notifications
- Rewards page: ledger totals update after submissions
- Notifications: unread badge increments, mark-as-read clears

## CI Suggestions
- GitHub Actions workflow:
  - Install dependencies
  - `npm run lint` (backend + frontend)
  - `npm run test` for both packages
  - Hardhat compile

