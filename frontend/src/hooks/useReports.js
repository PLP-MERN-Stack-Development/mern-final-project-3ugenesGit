import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReport, fetchMyReports, fetchReports, fetchPublicReports } from '@/services/reportApi';
import { useDispatch, useSelector } from 'react-redux';
import { queueOfflineReport, clearOfflineQueue } from '@/features/reports/reportSlice';

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const useReports = ({ mine = false } = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { offlineQueue, filters } = useSelector((state) => state.reports);
  const { user } = useSelector((state) => state.auth);

  const query = useQuery({
    queryKey: mine ? ['reports', 'mine'] : ['reports', filters, user?.role],
    queryFn: mine
      ? fetchMyReports
      : () => {
          if (user?.role === 'admin') {
            return fetchReports(filters);
          }
          return fetchPublicReports();
        },
  });

  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: async (_, variables) => {
      let offlinePayload = { ...variables };
      if (variables?.photo instanceof File) {
        offlinePayload = {
          ...offlinePayload,
          photoDataUrl: await fileToDataUrl(variables.photo),
        };
        delete offlinePayload.photo;
      }
      dispatch(queueOfflineReport(offlinePayload));
    },
  });

  const syncOffline = async () => {
    if (!offlineQueue.length) return;
    await Promise.all(offlineQueue.map((item) => createReport(item.payload)));
    dispatch(clearOfflineQueue());
    queryClient.invalidateQueries({ queryKey: ['reports'] });
  };

  return {
    ...query,
    submitReport: mutation.mutateAsync,
    syncing: mutation.isPending,
    syncOffline,
    offlineQueue,
  };
};

