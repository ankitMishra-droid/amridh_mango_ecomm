import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectDB = async () => {
  try {
    if (!env.mongoUri) {
      throw new Error('MongoDB URI is not defined in the environment variables.');
    }
    
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
