import apiClient from './apiClient';

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return { granted: false, message: 'Notifications not supported' };
  }
  const permission = await Notification.requestPermission();
  return { granted: permission === 'granted' };
};

export const showLocalNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
};

export const fetchNotifications = async () => {
  const { data } = await apiClient.get('/notifications');
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await apiClient.post(`/notifications/${id}/read`);
  return data;
};

