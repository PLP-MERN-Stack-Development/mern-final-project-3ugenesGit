import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import config from './config/env.js';
import { connectDatabase } from './config/database.js';
import logger from './config/logger.js';
import { startLotteryJob } from './jobs/lotteryJob.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  logger.info({ id: socket.id }, 'Socket connected');
});

const start = async () => {
  await connectDatabase();
  startLotteryJob();
  server.listen(config.port, () => {
    logger.info(`🚀 Server running on port ${config.port}`);
  });
};

start();

