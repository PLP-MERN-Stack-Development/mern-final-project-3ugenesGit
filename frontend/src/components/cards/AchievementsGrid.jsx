const mockAchievements = [
  { id: 'rookie', label: 'Rookie Recycler', unlocked: true },
  { id: 'guardian', label: 'Planet Guardian', unlocked: true },
  { id: 'legend', label: 'Zero Waste Legend', unlocked: false },
];

export const AchievementsGrid = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
    <div className="mt-4 grid grid-cols-3 gap-3">
      {mockAchievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`rounded-xl border px-3 py-4 text-center text-xs font-semibold ${
            achievement.unlocked ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-400'
          }`}
        >
          {achievement.label}
        </div>
      ))}
    </div>
  </div>
);

