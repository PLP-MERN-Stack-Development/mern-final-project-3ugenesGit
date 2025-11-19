import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { RewardsPage } from '@/pages/RewardsPage';
import { MapPage } from '@/pages/MapPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { AuthPage } from '@/pages/AuthPage';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="admin" element={<AdminPanelPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

