const LotteryEntry = require('../models/LotteryEntry');
const RewardLedger = require('../models/RewardLedger');

const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day;
  d.setUTCDate(diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

exports.createEntry = async ({ userId, reportId, weight }) => {
  const weekOf = getWeekStart();
  return LotteryEntry.create({ user: userId, report: reportId, weekOf, weight });
};

exports.pickWinners = async ({ weekOf = getWeekStart(), winners = 3 }) => {
  const entries = await LotteryEntry.find({ weekOf });
  if (!entries.length) return [];

  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  const selected = [];

  for (let i = 0; i < winners && entries.length; i += 1) {
    let rand = Math.random() * totalWeight;
    for (const entry of entries) {
      rand -= entry.weight;
      if (rand <= 0) {
        selected.push(entry);
        break;
      }
    }
  }

  await Promise.all(
    selected.map(async (entry) => {
      entry.status = 'winner';
      await entry.save();
      await RewardLedger.create({
        user: entry.user,
        report: entry.report,
        type: 'lottery',
        amount: 100,
      });
    })
  );

  return selected;
};

