import { WifiIcon } from '@heroicons/react/24/outline';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';

export const OfflineIndicator = () => {
  const { offlineQueue } = useOfflineQueue();
  const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

  if (!isOffline && !offlineQueue.length) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-amber-200 bg-white px-4 py-2 shadow-lg flex items-center gap-2 text-sm text-amber-700">
      <WifiIcon className="h-4 w-4" />
      <span>
        Offline mode active. {offlineQueue.length ? `${offlineQueue.length} report(s) queued.` : 'Changes will sync automatically.'}
      </span>
    </div>
  );
};

