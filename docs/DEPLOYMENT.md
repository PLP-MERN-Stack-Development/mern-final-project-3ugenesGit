# Deployment Playbook

## Backend (Render / Railway / AWS)
1. Create MongoDB Atlas + Redis (Upstash/Redis Cloud)
2. Provision Node 18 service
3. Set environment variables from `env.example`
4. Build command: `npm install && npm run build` (although Express uses runtime only)
5. Start command: `npm run start`
6. Configure health check `/health`

### Production Notes
- Provide real credentials for Web3Auth, Lit, Sign Protocol, AWS/S3
- Set `NODE_ENV=production`
- `APP_URL` should match deployed frontend origin
- Attach persistent logging (pino logs to stdout)

## Frontend (Vercel / Netlify)
1. `npm install`
2. Build: `npm run build`
3. Output: `dist`
4. Environment variables:
   - `VITE_API_URL=https://<backend-domain>/api`
   - `VITE_MAPBOX_TOKEN=<mapbox_token>`

## Contracts (Hardhat + Sepolia)
1. `cd contracts`
2. `cp env.example .env` and fill RPC URL, private key, Etherscan key
3. `npx hardhat compile`
4. `npm run deploy:sepolia`
5. Update `REWARD_TOKEN_ADDRESS` in backend env

## IPFS / S3
- In production, provide Infura IPFS credentials (already handled in config)
- Optional S3 storage for media: configure bucket + IAM keys

## Domain & HTTPS
- Frontend + backend should both be served via HTTPS
- Update `APP_URL` and `VITE_API_URL` accordingly

## Monitoring
- Suggested: Render metrics, Logtail, or Datadog for backend
- Mapbox usage monitoring via Mapbox dashboard
- Weekly cron job (lottery) runs via `node-cron`; ensure single instance or external scheduler

