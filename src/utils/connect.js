import mongoose from 'mongoose';
import '../models/nft.model.js';
import '../models/admin.model.js';

async function connect() {
  mongoose.set('strictQuery', false);
  const db = process.env.MONGO_URI;

  try {
    await mongoose.connect(db);
    console.log('DB Connected');
  } catch (error) {
    console.error(error);
  }
}

export default connect;
