import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  userId: mongoose.Types.ObjectId;
  domain: string;
  description: string;
  categories: string[];
  da: number;
  dr: number;
  traffic: string;
  price: number;
  showPrice: boolean;
  requirements: string[];
  turnaround: string;
  linkType: 'dofollow' | 'nofollow' | 'both';
  status: 'pending' | 'active' | 'rejected';
  isPremium: boolean;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
    required: true,
  }],
  da: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  dr: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  traffic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 20,
  },
  showPrice: {
    type: Boolean,
    default: true,
  },
  requirements: [{
    type: String,
    required: true,
  }],
  turnaround: {
    type: String,
    required: true,
  },
  linkType: {
    type: String,
    enum: ['dofollow', 'nofollow', 'both'],
    default: 'dofollow',
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending',
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  languages: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', listingSchema);