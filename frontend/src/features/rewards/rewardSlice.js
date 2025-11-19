import { createSlice } from '@reduxjs/toolkit';

const rewardSlice = createSlice({
  name: 'rewards',
  initialState: {
    ledger: [],
    overview: {
      total: 0,
      weekly: 0,
      level: 1,
      dailyStreak: 0,
      longestStreak: 0,
      xp: 0,
    },
  },
  reducers: {
    setRewardSummary(state, action) {
      state.overview = { ...state.overview, ...action.payload };
    },
    setLedger(state, action) {
      state.ledger = action.payload;
    },
  },
});

export const { setRewardSummary, setLedger } = rewardSlice.actions;

export default rewardSlice.reducer;

