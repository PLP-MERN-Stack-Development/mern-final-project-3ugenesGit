import apiClient from './apiClient';

export const emailLogin = async (payload) => {
  const { data } = await apiClient.post('/auth/login', payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await apiClient.post('/auth/register', payload);
  return data;
};

export const web3AuthLogin = async (payload) => {
  const { data } = await apiClient.post('/auth/web3auth', payload);
  return data;
};

