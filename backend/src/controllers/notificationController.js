import * as notificationService from '../services/notificationService.js';

export const list = async (req, res) => {
  const notifications = await notificationService.listForUser(req.user._id);
  res.json(notifications);
};

export const markRead = async (req, res) => {
  const notification = await notificationService.markAsRead({
    userId: req.user._id,
    notificationId: req.params.id,
  });
  res.json(notification);
};

