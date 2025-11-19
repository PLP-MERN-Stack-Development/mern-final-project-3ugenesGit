const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateReward, updateStreak } = require('../src/services/rewardService');

test('calculateReward boosts hazardous waste and streak multipliers', () => {
  const base = calculateReward({ quantity: 5, category: 'plastic', streak: { current: 1 } });
  const hazardous = calculateReward({
    quantity: 5,
    category: 'hazardous',
    streak: { current: 8 },
  });

  assert.ok(hazardous > base, 'Hazardous reward should be greater than base reward');
});

test('updateStreak increments and resets correctly', () => {
  const first = updateStreak(undefined, new Date('2024-01-01T00:00:00Z'));
  assert.equal(first.current, 1);

  const second = updateStreak(first, new Date('2024-01-02T00:00:00Z'));
  assert.equal(second.current, 2);

  const reset = updateStreak(second, new Date('2024-01-05T00:00:00Z'));
  assert.equal(reset.current, 1, 'Streak should reset after a gap');
});

