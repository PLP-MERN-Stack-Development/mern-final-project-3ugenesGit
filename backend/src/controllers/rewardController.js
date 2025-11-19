import RewardLedger from '../models/RewardLedger.js';
import * as lotteryService from '../services/lotteryService.js';

export const summary = async (req, res) => {
  const ledgers = await RewardLedger.find({ user: req.user._id }).sort('-createdAt');
  const ledgerTotal = ledgers.reduce((sum, entry) => sum + entry.amount, 0);
  const overview = {
    total: req.user.rewards?.total ?? ledgerTotal,
    level: req.user.rewards?.level ?? 1,
    dailyStreak: req.user.rewards?.streak?.current ?? 0,
    longestStreak: req.user.rewards?.streak?.longest ?? 0,
    xp: req.user.rewards?.xp ?? ledgerTotal,
  };
  res.json({ overview, ledgers });
};

export const pickWinners = async (req, res) => {
  const winners = await lotteryService.pickWinners({});
  res.json({ winners });
};

