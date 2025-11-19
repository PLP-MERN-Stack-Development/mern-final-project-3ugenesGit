import cron from 'node-cron';
import * as lotteryService from '../services/lotteryService.js';
import logger from '../config/logger.js';

let task;

export const startLotteryJob = () => {
  if (task) {
    return task;
  }

  task = cron.schedule(
    '0 0 * * 1',
    async () => {
      try {
        const winners = await lotteryService.pickWinners({});
        logger.info({ winners: winners.map((winner) => winner.user) }, 'Weekly lottery executed');
      } catch (error) {
        logger.error({ err: error }, 'Weekly lottery job failed');
      }
    },
    { scheduled: true, timezone: 'UTC' }
  );

  return task;
};


