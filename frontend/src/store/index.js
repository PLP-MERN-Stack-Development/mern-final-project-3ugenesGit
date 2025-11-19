import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import reportReducer from '@/features/reports/reportSlice';
import rewardReducer from '@/features/rewards/rewardSlice';
import uiReducer from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer,
    rewards: rewardReducer,
    ui: uiReducer,
  },
});

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectReports = (state) => state.reports;
export const selectRewards = (state) => state.rewards;
export const selectUi = (state) => state.ui;

