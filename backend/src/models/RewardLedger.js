const mongoose = require('mongoose');

const rewardLedgerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteReport' },
    type: {
      type: String,
      enum: ['report', 'streak', 'lottery', 'bonus', 'admin'],
      required: true,
    },
    amount: { type: Number, required: true },
    metadata: mongoose.Schema.Types.Mixed,
    transactionHash: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RewardLedger', rewardLedgerSchema);

