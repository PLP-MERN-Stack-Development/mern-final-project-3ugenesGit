import { useSelector } from 'react-redux';
import { QrScanner } from '@/components/shared/QrScanner';

export const ProfilePage = () => {
  const { user, dailyStreak, level } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6 p-4">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase text-slate-400">Profile</p>
          <h2 className="text-2xl font-semibold text-slate-900">{user?.name}</h2>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-xs uppercase text-slate-400">Level</p>
            <p className="text-2xl font-semibold text-slate-900">{level}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">Streak</p>
            <p className="text-2xl font-semibold text-slate-900">{dailyStreak} days</p>
          </div>
        </div>
      </div>
      <QrScanner />
    </div>
  );
};

