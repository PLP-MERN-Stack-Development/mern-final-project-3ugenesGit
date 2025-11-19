import mongoose from 'mongoose';

const lotteryEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weekOf: { type: Date, required: true },
    weight: { type: Number, default: 1 },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteReport' },
    status: {
      type: String,
      enum: ['pending', 'winner', 'lost'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

lotteryEntrySchema.index({ user: 1, weekOf: 1 }, { unique: false });

export default mongoose.model('LotteryEntry', lotteryEntrySchema);

