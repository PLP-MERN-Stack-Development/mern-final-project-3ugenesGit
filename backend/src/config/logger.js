import pino from 'pino';
import pretty from 'pino-pretty';
import config from './env.js';

const stream = config.nodeEnv === 'development'
  ? pretty({
      colorize: true,
      translateTime: true,
    })
  : undefined;

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    redact: ['req.headers.authorization', 'password', 'token'],
  },
  stream
);

export default logger;

