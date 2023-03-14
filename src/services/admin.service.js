import { adminModel } from '../models/admin.model.js';

export async function findAdminByUsername(username) {
  return await adminModel.findOne({ username });
}
