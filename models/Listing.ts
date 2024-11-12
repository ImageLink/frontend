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
  seoMetrics: {
    moz: {
      da: number;
      pa: number;
      mozRank: number;
      links: number;
      spamScore: number;
    };
    semrush: {
      rank: number;
      keywords: number;
      traffic: string;
      trafficCost: string;
    };
    ahrefs: {
      rank: number;
      dr: number;
      backlinks: number;
      referringDomains: number;
    };
    majestic: {
      tf: number;
      cf: number;
      backlinks: number;
      referringDomains: number;
    };
  };
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
  seoMetrics: {
    moz: {
      da: Number,
      pa: Number,
      mozRank: Number,
      links: Number,
      spamScore: Number,
    },
    semrush: {
      rank: Number,
      keywords: Number,
      traffic: String,
      trafficCost: String,
    },
    ahrefs: {
      rank: Number,
      dr: Number,
      backlinks: Number,
      referringDomains: Number,
    },
    majestic: {
      tf: Number,
      cf: Number,
      backlinks: Number,
      referringDomains: Number,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
listingSchema.index({ userId: 1 });
listingSchema.index({ domain: 1 }, { unique: true });
listingSchema.index({ categories: 1 });
listingSchema.index({ status: 1 });
listingSchema.index({ da: 1 });
listingSchema.index({ dr: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ isPremium: 1 });

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', listingSchema);