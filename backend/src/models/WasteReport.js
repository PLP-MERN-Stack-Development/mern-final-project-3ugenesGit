const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    coordinates: {
      type: [Number], // [lng, lat]
      index: '2dsphere',
      required: true,
    },
    address: String,
  },
  { _id: false }
);

const mediaSchema = new mongoose.Schema(
  {
    cid: String,
    url: String,
    encryptionKey: String,
    mimeType: String,
    size: Number,
  },
  { _id: false }
);

const wasteReportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    notes: String,
    location: locationSchema,
    encryptedPayloadCid: { type: String, required: true },
    litResourceId: { type: String, required: true },
    mapboxFeatureId: String,
    status: {
      type: String,
      enum: ['pending', 'verified', 'assigned', 'collected', 'rejected'],
      default: 'pending',
    },
    rewardValue: { type: Number, default: 0 },
    collector: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    media: [mediaSchema],
    attestations: [
      {
        hash: String,
        protocolId: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WasteReport', wasteReportSchema);

