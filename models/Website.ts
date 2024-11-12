import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsite extends Document {
  userId: mongoose.Types.ObjectId;
  url: string;
  title: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  da: number;
  traffic: string;
  price: number;
  showPrice: boolean;
  linkType: 'dofollow' | 'nofollow' | 'both';
  status: 'pending' | 'active' | 'rejected';
  turnaround: string;
  guidelines: string[];
  isPremium: boolean;
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

const websiteSchema = new Schema<IWebsite>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  da: {
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
  linkType: {
    type: String,
    enum: ['dofollow', 'nofollow', 'both'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending',
  },
  turnaround: {
    type: String,
    required: true,
  },
  guidelines: [{
    type: String,
    required: true,
  }],
  isPremium: {
    type: Boolean,
    default: false,
  },
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
websiteSchema.index({ userId: 1 });
websiteSchema.index({ categoryId: 1 });
websiteSchema.index({ status: 1 });
websiteSchema.index({ da: 1 });
websiteSchema.index({ price: 1 });
websiteSchema.index({ isPremium: 1 });

export default mongoose.models.Website || mongoose.model<IWebsite>('Website', websiteSchema);