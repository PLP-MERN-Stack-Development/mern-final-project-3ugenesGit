const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    body: String,
    category: {
      type: String,
      enum: ['reward', 'report', 'system', 'lottery'],
      default: 'system',
    },
    read: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);

