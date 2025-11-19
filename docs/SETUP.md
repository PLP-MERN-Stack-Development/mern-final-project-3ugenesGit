# WasteWise Setup Guide

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB 6+ (local or Atlas)
- Redis (for future queue + rate limiting)
- Mapbox account + API token
- Web3Auth, Lit Protocol, Sign Protocol credentials
- AWS S3 bucket (or leave blank to use IPFS-only dev mode)

## 1. Clone & Install
```bash
git clone <repo>
cd mern-final-project-3ugenesGit
```

### Backend
```bash
cd backend
cp ../env.example .env.development
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp ../env.example .env
npm install
npm run dev
```

### Contracts
```bash
cd contracts
cp env.example .env
npm install
npx hardhat compile
```

## 2. Environment Variables
- Backend reads `.env.<NODE_ENV>` (defaults to `.env.development`)
- Frontend reads `.env` with `VITE_*` keys
- Contracts read `contracts/.env`
- Reference `env.example` for all required keys. Missing values trigger console warnings but fall back to mocked integrations for local development (Lit, Sign, IPFS).

## 3. Running the stack
1. Start MongoDB & Redis
2. `npm run dev` inside `backend`
3. `npm run dev` inside `frontend`
4. Visit `http://localhost:5173`

## 4. Optional Services
- **Push notifications**: currently browser-based (Notification API). For production, integrate a push gateway (e.g., Firebase).
- **S3 uploads**: add bucket + IAM keys; set `AWS_*` envs.
- **Mapbox**: set `MAPBOX_TOKEN` + `VITE_MAPBOX_TOKEN`.
- **Web3**: deploy RewardToken (see `docs/DEPLOYMENT.md`) and update `REWARD_TOKEN_ADDRESS`.

