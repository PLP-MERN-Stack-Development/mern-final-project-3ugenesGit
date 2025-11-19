# WasteWise ♻️ – MERN Waste Management Platform

WasteWise is a full MERN-stack experience for reporting waste hotspots, rewarding community clean-ups, and providing admins a live command center. It combines Web3Auth, Lit Protocol encryption, IPFS storage, Mapbox visualizations, and a gamified reward system powered by the on-chain RWT (Reward Token).

## Highlights
- **Secure Auth**: Email/password + Web3Auth (id token verification).
- **Encrypted Reports**: Payloads encrypted with Lit Protocol and pinned to IPFS (with mock fallback for local dev).
- **Map Intelligence**: Mapbox map displaying hotspots, community submissions, and status filters.
- **Rewards Engine**: Dynamic RWT calculations, daily streaks, XP-based leveling, and weekly lottery draws (cron job + Sign Protocol attestations).
- **Realtime UX**: Notifications drawer, offline queue with auto-sync, push-permission prompts, leaderboard, achievements, QR scan flow for collectors, dark mode, and multi-language (EN/FR/ES).
- **Admin Ops**: Verify/reject reports, assign collectors, track analytics/logs, trigger lotteries.
- **Smart Contracts**: Hardhat project with ERC-20-style RewardToken + scripts.
- **Testing**: Node built-in tests (reward logic) + Vitest for Redux slices.

## Project Structure
```
backend/   # Express API, Mongo models, services (Lit, IPFS, Sign, rewards, notifications)
frontend/  # React + Vite + Tailwind, Redux store, React Query hooks, Mapbox UI
contracts/ # Hardhat project + RewardToken.sol and deploy script
docs/      # Setup, API reference, deployment + testing guides
env.example
```

## Quick Start
```bash
# Backend
cd backend
cp ../env.example .env.development
npm install
npm run dev

# Frontend
cd frontend
cp ../env.example .env
npm install
npm run dev
```
Visit `http://localhost:5173` (API proxied to `http://localhost:5000/api`).

For detailed setup, deployment, and testing instructions see:
- [`docs/SETUP.md`](docs/SETUP.md)
- [`docs/API.md`](docs/API.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`docs/TESTING.md`](docs/TESTING.md)

## Testing
```bash
cd backend && npm run test   # node --test suite
cd frontend && npm run test  # vitest
```

## Smart Contract Deployment
```bash
cd contracts
cp env.example .env
npm install
npm run deploy:sepolia
```
Update `REWARD_TOKEN_ADDRESS` after deployment.

## Future Enhancements
- Production-grade push notifications (FCM/Web Push)
- Collector mobile/PWA for QR verification
- Detailed analytics dashboards + exports
- Expanded test coverage (controllers, hooks, UI)