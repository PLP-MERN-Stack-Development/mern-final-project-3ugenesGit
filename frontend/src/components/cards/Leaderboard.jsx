const mockLeaders = [
  { id: 1, name: 'EcoNova', reports: 32, rewards: 640 },
  { id: 2, name: 'WasteBuster', reports: 27, rewards: 540 },
  { id: 3, name: 'GreenPulse', reports: 21, rewards: 410 },
];

export const Leaderboard = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900">Leaderboard</h3>
      <p className="text-xs text-slate-400">Updated hourly</p>
    </div>
    <div className="mt-4 space-y-3">
      {mockLeaders.map((leader, index) => (
        <div key={leader.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">#{index + 1}</span>
            <div>
              <p className="font-semibold text-slate-800">{leader.name}</p>
              <p className="text-xs text-slate-500">{leader.reports} reports</p>
            </div>
          </div>
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
            {leader.rewards} RWT
          </span>
        </div>
      ))}
    </div>
  </div>
);

