import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const AuthPage = () => {
  const { login, register, web3SignIn, web3Loading } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mode === 'login') {
      await login({ email: form.email, password: form.password });
    } else {
      await register(form);
    }
  };

  const handleWeb3Auth = async () => {
    const fakeIdToken = `fake-token-${Date.now()}`;
    await web3SignIn(fakeIdToken);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 text-white backdrop-blur">
        <h1 className="text-2xl font-semibold">
          {mode === 'login' ? 'Welcome back 👋' : 'Create an account'}
        </h1>
        <p className="text-sm text-slate-300">
          Earn RWT for every verified waste report.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input
                className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
          )}
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-white/90 py-3 font-semibold text-slate-900"
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleWeb3Auth}
            className="w-full rounded-2xl border border-white/30 py-3 font-semibold"
          >
            {web3Loading ? 'Connecting…' : 'Sign in with Web3Auth'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-300">
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
          <button
            className="font-semibold text-white underline"
            onClick={() => setMode((prev) => (prev === 'login' ? 'register' : 'login'))}
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

