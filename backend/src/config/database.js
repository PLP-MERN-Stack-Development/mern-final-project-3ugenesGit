import mongoose from 'mongoose';
import config from './env.js';

mongoose.set('strictQuery', true);

export const connectDatabase = async () => {
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


