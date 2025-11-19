import { MapView } from '@/components/map/MapView';
import { useReports } from '@/hooks/useReports';

const mockHotspots = [
  { coordinates: [103.8198, 1.3521], label: 'Singapore river plastics' },
  { coordinates: [139.6917, 35.6895], label: 'Tokyo bay fishing nets' },
];

export const MapPage = () => {
  const { data: reports = [] } = useReports();

  return (
    <div className="p-4">
      <div className="rounded-2xl border border-slate-100 bg-white p-3">
        <div className="h-[75vh]">
          <MapView reports={reports} hotspots={mockHotspots} />
        </div>
      </div>
    </div>
  );
};

