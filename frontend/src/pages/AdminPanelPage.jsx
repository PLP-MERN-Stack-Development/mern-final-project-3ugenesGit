import { useReports } from '@/hooks/useReports';
import { updateReportStatus } from '@/services/reportApi';
import { useState } from 'react';

export const AdminPanelPage = () => {
  const { data: reports = [], refetch } = useReports();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatus = async (reportId, status) => {
    setUpdatingId(reportId);
    await updateReportStatus({ id: reportId, status });
    setUpdatingId(null);
    refetch();
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Admin control center</h2>
      <div className="rounded-2xl border border-slate-100 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Reporter</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Quantity</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="px-4 py-3">{report.user?.name || 'Anonymous'}</td>
                <td className="px-4 py-3 capitalize">{report.category}</td>
                <td className="px-4 py-3">{report.quantity} kg</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{report.status}</span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white"
                    onClick={() => handleStatus(report._id, 'verified')}
                    disabled={updatingId === report._id}
                  >
                    Verify
                  </button>
                  <button
                    className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white"
                    onClick={() => handleStatus(report._id, 'rejected')}
                    disabled={updatingId === report._id}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

