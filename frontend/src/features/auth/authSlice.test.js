import { describe, it, expect } from 'vitest';
import reducer, { setCredentials, logout } from './authSlice';

describe('authSlice', () => {
  it('updates credentials and token on login', () => {
    const user = { name: 'Eco', email: 'eco@example.com' };
    const token = 'abc123';
    const state = reducer(undefined, setCredentials({ user, token }));
    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
    expect(state.status).toBe('succeeded');
  });

  it('clears state on logout', () => {
    const initial = { user: { name: 'Test' }, token: 'xyz', status: 'succeeded' };
    const state = reducer(initial, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.status).toBe('idle');
  });
});

