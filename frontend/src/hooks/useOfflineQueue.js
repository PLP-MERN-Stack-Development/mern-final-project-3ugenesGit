import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOfflineQueue } from '@/features/reports/reportSlice';
import { createReport } from '@/services/reportApi';

export const useOfflineQueue = () => {
  const dispatch = useDispatch();
  const offlineQueue = useSelector((state) => state.reports.offlineQueue);

  const syncOffline = useCallback(async () => {
    if (!offlineQueue.length) return;
    await Promise.all(offlineQueue.map((item) => createReport(item.payload)));
    dispatch(clearOfflineQueue());
  }, [dispatch, offlineQueue]);

  useEffect(() => {
    const handler = () => {
      if (navigator.onLine) {
        syncOffline();
      }
    };
    window.addEventListener('online', handler);
    return () => window.removeEventListener('online', handler);
  }, [syncOffline]);

  return { offlineQueue, syncOffline };
};

