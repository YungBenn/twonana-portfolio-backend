import { Schema, model } from 'mongoose';

const nftSchema = new Schema(
  {
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    software: { type: String, required: true },
    size: { type: String, default: '6000px x 4000px' },
    format_nft: { type: String, default: 'png' },
    marketplace_url: { type: String, required: true },
  },
  { timestamps: true },
);

export const nftModel = model('Nft', nftSchema);
