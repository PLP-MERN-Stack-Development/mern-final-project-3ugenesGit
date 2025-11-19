import RewardLedger from '../models/RewardLedger.js';
import User from '../models/User.js';
import WasteReport from '../models/WasteReport.js';
import * as lotteryService from './lotteryService.js';

const BASE_REWARD = 10;

const calculateReward = ({ quantity, category, streak }) => {
  let reward = BASE_REWARD + quantity * 2;
  if (['e-waste', 'hazardous'].includes(category)) {
    reward *= 1.5;
  }
  if (streak?.current >= 7) {
    reward *= 1.2;
  }
  return Math.round(reward);
};

const updateStreak = (streak = {}, submittedAt = new Date()) => {
  const current = { ...streak };
  const last = streak?.lastSubmittedAt ? new Date(streak.lastSubmittedAt) : null;
  const diffInDays = last ? Math.floor((submittedAt - last) / (1000 * 60 * 60 * 24)) : null;

  if (diffInDays === 0) {
    current.current = streak.current || 1;
  } else if (diffInDays === 1 || diffInDays === null) {
    current.current = (streak.current || 0) + 1;
  } else if (diffInDays > 1) {
    current.current = 1;
  } else {
    current.current = 1;
  }

  current.longest = Math.max(current.longest || 0, current.current);
  current.lastSubmittedAt = submittedAt;
  return current;
};

export const awardReport = async ({ userId, reportId }) => {
  const user = await User.findById(userId);
  const report = await WasteReport.findById(reportId);
  const reward = calculateReward({
    quantity: report.quantity,
    category: report.category,
    streak: user.rewards?.streak,
  });

  const ledger = await RewardLedger.create({
    user: userId,
    report: reportId,
    type: 'report',
    amount: reward,
  });

  user.rewards.total += reward;
  user.rewards.xp += reward;
  user.rewards.level = Math.floor(user.rewards.xp / 500) + 1;
  user.rewards.streak = updateStreak(user.rewards.streak, new Date());
  await user.save();

  await lotteryService.createEntry({ userId, reportId, weight: Math.ceil(reward / 10) });

  return { reward, ledger, streak: user.rewards.streak };
};

export { calculateReward, updateStreak };

