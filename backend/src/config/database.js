const mongoose = require('mongoose');
const config = require('./env');

mongoose.set('strictQuery', true);

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      autoIndex: config.nodeEnv !== 'production',
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };

