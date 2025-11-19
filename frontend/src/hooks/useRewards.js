import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRewardSummary } from '@/services/rewardApi';
import { useDispatch } from 'react-redux';
import { setLedger, setRewardSummary } from '@/features/rewards/rewardSlice';

export const useRewards = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ['rewards', 'summary'],
    queryFn: fetchRewardSummary,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setRewardSummary(query.data.overview || {}));
      dispatch(setLedger(query.data.ledgers || []));
    }
  }, [dispatch, query.data]);

  return query;
};

