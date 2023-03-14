import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  admin_id: { type: String, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const adminModel = model('admin', adminSchema);
