import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/services/notificationService';

export const useNotifications = (options = {}) => {
  const { enabled = false, ...rest } = options;
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
    enabled,
    ...rest,
  });
};

