const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config/env');
const { connectDatabase } = require('./config/database');
const logger = require('./config/logger');
const { startLotteryJob } = require('./jobs/lotteryJob');

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

