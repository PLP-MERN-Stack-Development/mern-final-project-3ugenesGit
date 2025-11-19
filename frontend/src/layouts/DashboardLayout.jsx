import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/shared/Sidebar';
import { Topbar } from '@/components/shared/Topbar';
import { NotificationsPanel } from '@/components/shared/NotificationsPanel';
import { OfflineIndicator } from '@/components/shared/OfflineIndicator';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>
      <NotificationsPanel />
      <OfflineIndicator />
    </div>
  );
};

