import mongoose from 'mongoose';
import '../models/nft.model.js';
import '../models/admin.model.js';
import { logger } from './logger.js';

export async function connect() {
  mongoose.set('strictQuery', false);
  const db =
    process.env.MONGO_URI;

  try {
    await mongoose.connect(db);
    logger.info('DB Connected');
  } catch (error) {
    logger.error(error);
  }
}
