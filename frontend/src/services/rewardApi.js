import apiClient from './apiClient';

export const fetchRewardSummary = async () => {
  const { data } = await apiClient.get('/rewards/summary');
  return data;
};

export const runLottery = async () => {
  const { data } = await apiClient.post('/rewards/lottery/run');
  return data;
};

