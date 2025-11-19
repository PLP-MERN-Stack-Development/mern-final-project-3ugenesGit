const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    code: String,
    unlockedAt: Date,
  },
  { _id: false }
);

const streakSchema = new mongoose.Schema(
  {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastSubmittedAt: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    walletAddress: { type: String },
    picture: String,
    role: { type: String, enum: ['user', 'collector', 'admin'], default: 'user' },
    rewards: {
      total: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      xp: { type: Number, default: 0 },
      streak: { type: streakSchema, default: () => ({ current: 0, longest: 0 }) },
    },
    achievements: [achievementSchema],
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      language: { type: String, default: 'en' },
      notifications: { type: Boolean, default: true },
    },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

