const pino = require('pino');
const pretty = require('pino-pretty');
const config = require('./env');

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

module.exports = logger;

