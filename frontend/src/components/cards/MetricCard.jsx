export const MetricCard = ({ label, value, delta, icon: Icon, accent = 'primary' }) => {
  const accentClass = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
  }[accent];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        {Icon && (
          <span className={`rounded-full p-2 ${accentClass}`}>
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        {delta && <span className="text-xs text-emerald-500">{delta}</span>}
      </div>
    </div>
  );
};

