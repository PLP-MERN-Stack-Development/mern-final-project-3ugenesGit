import { useReports } from '@/hooks/useReports';
import { ReportList } from '@/components/shared/ReportList';
import { MapView } from '@/components/map/MapView';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/features/reports/reportSlice';

const mockHotspots = [
  { coordinates: [2.1734, 41.3851], label: 'Barcelona beach plastic' },
  { coordinates: [-74.006, 40.7128], label: 'Battery Park overflow' },
];

export const ReportsPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.reports.filters);
  const { data: reports = [] } = useReports();

  return (
    <div className="grid gap-6 p-4 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Community reports</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <select
              value={filters.status}
              onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
              className="rounded-full border border-slate-200 px-3 py-1"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="collected">Collected</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
              className="rounded-full border border-slate-200 px-3 py-1"
            >
              <option value="all">All categories</option>
              <option value="plastic">Plastic</option>
              <option value="organic">Organic</option>
              <option value="metal">Metal</option>
              <option value="e-waste">E-waste</option>
            </select>
          </div>
        </div>
        <ReportList reports={reports} />
      </div>
      <div className="h-[600px] rounded-2xl border border-slate-100 bg-white p-3">
        <MapView reports={reports} hotspots={mockHotspots} />
      </div>
    </div>
  );
};

