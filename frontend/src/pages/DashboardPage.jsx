import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MetricCard } from '@/components/cards/MetricCard';
import { RewardSummary } from '@/components/cards/RewardSummary';
import { Leaderboard } from '@/components/cards/Leaderboard';
import { AchievementsGrid } from '@/components/cards/AchievementsGrid';
import { ImpactTrendChart } from '@/components/charts/ImpactTrendChart';
import { ReportForm } from '@/components/shared/ReportForm';
import { ReportList } from '@/components/shared/ReportList';
import { useReports } from '@/hooks/useReports';
import { useRewards } from '@/hooks/useRewards';
import { requestNotificationPermission } from '@/services/notificationService';
import { TrophyIcon, FireIcon, MapIcon } from '@heroicons/react/24/outline';

export const DashboardPage = () => {
  const { data: myReports = [] } = useReports({ mine: true });
  useRewards();
  const { t } = useTranslation();
  const { overview } = useSelector((state) => state.rewards);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label={t('totalRewards')} value={`${overview.total} RWT`} icon={TrophyIcon} />
        <MetricCard label={t('streak')} value={`${overview.dailyStreak || 0} days`} icon={FireIcon} accent="success" />
        <MetricCard label="Reports" value={myReports.length} icon={MapIcon} accent="warning" />
      </div>
      <RewardSummary />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ReportForm />
          <ImpactTrendChart />
          <ReportList reports={myReports} />
        </div>
        <div className="space-y-6">
          <Leaderboard />
          <AchievementsGrid />
        </div>
      </div>
    </div>
  );
};

