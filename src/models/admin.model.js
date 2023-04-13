import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const adminModel = model('admin', adminSchema);
