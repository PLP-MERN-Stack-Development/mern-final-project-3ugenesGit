const Notification = require('../models/Notification');

exports.notifyUser = async ({ userId, title, body, category = 'system', metadata }) => {
  return Notification.create({
    user: userId,
    title,
    body,
    category,
    metadata,
  });
};

exports.listForUser = async (userId) => {
  return Notification.find({ user: userId }).sort('-createdAt').limit(50);
};

exports.markAsRead = async ({ userId, notificationId }) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true }
  );
  if (!notification) {
    throw new Error('Notification not found');
  }
  return notification;
};

