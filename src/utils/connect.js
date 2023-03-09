import mongoose from 'mongoose';
import '../models/nft.model.js';

export async function connect() {
  mongoose.set('strictQuery', false);
  const db = process.env.MONGO_URI;

  try {
    await mongoose.connect(db);
    console.log('DB Connected');
  } catch (error) {
    console.error(error);
  }
}
