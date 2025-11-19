import apiClient from './apiClient';

export const fetchReports = async (params = {}) => {
  const { data } = await apiClient.get('/reports', { params });
  return data;
};

export const fetchPublicReports = async () => {
  const { data } = await apiClient.get('/reports/feed');
  return data;
};

export const fetchMyReports = async () => {
  const { data } = await apiClient.get('/reports/mine');
  return data;
};

export const createReport = async (payload) => {
  let body = payload;
  let config;

  if (payload instanceof FormData) {
    config = { headers: { 'Content-Type': 'multipart/form-data' } };
  } else if (payload?.photo instanceof File) {
    const formData = new FormData();
    formData.append('category', payload.category);
    formData.append('quantity', payload.quantity);
    if (payload.notes) formData.append('notes', payload.notes);
    formData.append('location', JSON.stringify(payload.location));
    formData.append('photo', payload.photo);
    if (payload.photoDataUrl) {
      formData.append('photoDataUrl', payload.photoDataUrl);
    }
    body = formData;
    config = { headers: { 'Content-Type': 'multipart/form-data' } };
  }

  const { data } = await apiClient.post('/reports', body, config);
  return data;
};

export const updateReportStatus = async ({ id, status, collector }) => {
  const { data } = await apiClient.patch(`/reports/${id}/status`, { status, collector });
  return data;
};

