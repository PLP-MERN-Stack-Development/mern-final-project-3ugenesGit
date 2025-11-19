import { createSlice, nanoid } from '@reduxjs/toolkit';

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    filters: {
      status: 'all',
      category: 'all',
      search: '',
    },
    selectedReport: null,
    offlineQueue: [],
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    selectReport(state, action) {
      state.selectedReport = action.payload;
    },
    queueOfflineReport(state, action) {
      state.offlineQueue.push({
        id: nanoid(),
        payload: action.payload,
        createdAt: Date.now(),
      });
    },
    removeOfflineReport(state, action) {
      state.offlineQueue = state.offlineQueue.filter((item) => item.id !== action.payload);
    },
    clearOfflineQueue(state) {
      state.offlineQueue = [];
    },
  },
});

export const {
  setFilters,
  selectReport,
  queueOfflineReport,
  removeOfflineReport,
  clearOfflineQueue,
} = reportSlice.actions;

export default reportSlice.reducer;

