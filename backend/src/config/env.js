import path from 'path';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const requiredKeys = [
  'PORT',
  'MONGODB_URI',
 'JWT_SECRET',
  'WEB3AUTH_CLIENT_ID',
  'LIT_NETWORK',
  'IPFS_PROJECT_ID',
  'IPFS_PROJECT_SECRET',
  'SIGN_PROTOCOL_API_KEY',
  'REDIS_URL',
  'AWS_S3_BUCKET',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'MAPBOX_TOKEN',
  'REWARD_TOKEN_ADDRESS',
  'APP_URL',
];

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  appUrl: process.env.APP_URL || 'http://localhost:5173',
  web3AuthClientId: process.env.WEB3AUTH_CLIENT_ID,
  litNetwork: process.env.LIT_NETWORK || 'cayenne',
  ipfsProjectId: process.env.IPFS_PROJECT_ID,
  ipfsProjectSecret: process.env.IPFS_PROJECT_SECRET,
  signProtocolApiKey: process.env.SIGN_PROTOCOL_API_KEY,
  redisUrl: process.env.REDIS_URL,
  aws: {
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  mapboxToken: process.env.MAPBOX_TOKEN,
  rewardTokenAddress: process.env.REWARD_TOKEN_ADDRESS,
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || `${15 * 60 * 1000}`, 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
};

for (const key of requiredKeys) {
  if (!process.env[key]) {
    console.warn(`⚠️  Missing environment variable: ${key}`);
  }
}

export default config;

