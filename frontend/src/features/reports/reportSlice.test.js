import { describe, it, expect } from 'vitest';
import reducer, {
  queueOfflineReport,
  removeOfflineReport,
  clearOfflineQueue,
} from './reportSlice';

describe('reportSlice offline queue', () => {
  it('adds offline reports to queue', () => {
    const payload = { category: 'plastic', quantity: 2 };
    const state = reducer(undefined, queueOfflineReport(payload));
    expect(state.offlineQueue).toHaveLength(1);
    expect(state.offlineQueue[0].payload).toEqual(payload);
  });

  it('removes queued report by id', () => {
    const action = queueOfflineReport({ category: 'glass' });
    let state = reducer(undefined, action);
    state = reducer(state, removeOfflineReport(state.offlineQueue[0].id));
    expect(state.offlineQueue).toHaveLength(0);
  });

  it('clears queue', () => {
    let state = reducer(undefined, queueOfflineReport({ category: 'metal' }));
    state = reducer(state, clearOfflineQueue());
    expect(state.offlineQueue).toHaveLength(0);
  });
});

