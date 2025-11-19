import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('waste-auth-token');
const userFromStorage = localStorage.getItem('waste-auth-user');

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  status: 'idle',
  error: null,
  dailyStreak: 0,
  level: 1,
  totalRewards: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth(state) {
      state.status = 'loading';
      state.error = null;
    },
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.status = 'succeeded';
      localStorage.setItem('waste-auth-token', token);
      localStorage.setItem('waste-auth-user', JSON.stringify(user));
    },
    authFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload || 'Something went wrong';
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      localStorage.removeItem('waste-auth-token');
      localStorage.removeItem('waste-auth-user');
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('waste-auth-user', JSON.stringify(state.user));
    },
    updateProgress(state, action) {
      const { streak, level, totalRewards } = action.payload;
      if (typeof streak === 'number') state.dailyStreak = streak;
      if (typeof level === 'number') state.level = level;
      if (typeof totalRewards === 'number') state.totalRewards = totalRewards;
    },
  },
});

export const {
  startAuth,
  setCredentials,
  authFailed,
  logout,
  updateProfile,
  updateProgress,
} = authSlice.actions;

export default authSlice.reducer;

