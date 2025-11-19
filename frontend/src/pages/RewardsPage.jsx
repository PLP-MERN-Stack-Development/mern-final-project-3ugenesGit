import { RewardSummary } from '@/components/cards/RewardSummary';
import { useRewards } from '@/hooks/useRewards';
import { useSelector } from 'react-redux';

export const RewardsPage = () => {
  useRewards();
  const { ledger } = useSelector((state) => state.rewards);

  return (
    <div className="space-y-6 p-4">
      <RewardSummary />
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Reward ledger</h3>
          <p className="text-xs text-slate-400">On-chain attestations synced</p>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {ledger.map((entry) => (
            <div key={entry._id} className="py-3 text-sm flex justify-between">
              <div>
                <p className="font-semibold text-slate-800 capitalize">{entry.type}</p>
                <p className="text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-emerald-600">+{entry.amount} RWT</p>
                <p className="text-xs text-slate-400">{entry.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

