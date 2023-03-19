import { Schema, model } from 'mongoose';

const nftSchema = new Schema(
  {
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    software: { type: String },
    size: { type: String },
    nft_format: { type: String, default: 'png' },
    marketplace_url: { type: String, required: true },
  },
  { timestamps: true },
);

export const nftModel = model('Nft', nftSchema);
