export const ReportList = ({ reports = [] }) => {
  if (!reports.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        No reports yet. Be the first to submit a waste hotspot!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div
          key={report._id || report.createdAt}
          className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase text-slate-400">{report.category}</p>
              <h4 className="text-lg font-semibold text-slate-900">{report.notes || 'No notes'}</h4>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                report.status === 'verified'
                  ? 'bg-emerald-50 text-emerald-600'
                  : report.status === 'rejected'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {report.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>{report.quantity} kg</span>
            <span>Reward: {report.rewardValue || 'TBD'} RWT</span>
            <span>Updated {new Date(report.updatedAt || report.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

