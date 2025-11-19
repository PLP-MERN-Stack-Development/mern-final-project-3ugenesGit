import { TrophyIcon, FireIcon, GiftIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

export const RewardSummary = () => {
  const { overview } = useSelector((state) => state.rewards);

  const items = [
    {
      icon: TrophyIcon,
      label: 'Total Rewards',
      value: `${overview.total} RWT`,
    },
    {
      icon: FireIcon,
      label: 'Daily streak',
      value: `${overview.dailyStreak || 0} days`,
    },
    {
      icon: GiftIcon,
      label: 'Level',
      value: overview.level || 1,
    },
    {
      icon: FireIcon,
      label: 'Longest streak',
      value: `${overview.longestStreak || 0} days`,
    },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-100 bg-gradient-to-br from-primary-50 to-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-slate-500">
            <item.icon className="h-5 w-5 text-primary-500" />
            <span>{item.label}</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

