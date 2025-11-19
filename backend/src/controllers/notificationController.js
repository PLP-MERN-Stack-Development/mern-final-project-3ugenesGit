const notificationService = require('../services/notificationService');

exports.list = async (req, res) => {
  const notifications = await notificationService.listForUser(req.user._id);
  res.json(notifications);
};

exports.markRead = async (req, res) => {
  const notification = await notificationService.markAsRead({
    userId: req.user._id,
    notificationId: req.params.id,
  });
  res.json(notification);
};

