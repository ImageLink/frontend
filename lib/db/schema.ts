import { Schema } from 'mongoose';
import { USER_ROLES, USER_STATUS, LISTING_STATUS, MESSAGE_STATUS, REPORT_STATUS } from './constants';

// Base schema with timestamps
const baseSchema = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
};

// User Schema
export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  whatsapp: String,
  telegram: String,
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  },
  status: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
}, baseSchema);

// Listing Schema
export const listingSchema = new Schema({
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
    enum: Object.values(LISTING_STATUS),
    default: LISTING_STATUS.PENDING,
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
}, baseSchema);

// Message Schema
export const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  listingId: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(MESSAGE_STATUS),
    default: MESSAGE_STATUS.UNREAD,
  },
  replies: [{
    content: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, baseSchema);

// Report Schema
export const reportSchema = new Schema({
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(REPORT_STATUS),
    default: REPORT_STATUS.OPEN,
  },
  notes: [{
    type: String,
  }],
  resolvedAt: Date,
}, baseSchema);

// Category Schema
export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [{
    name: {
      type: String,
      required: true,
    }
  }],
}, baseSchema);

// Notification Schema
export const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['message', 'listing', 'report', 'system'],
    required: true,
  },
  relatedId: {
    type: Schema.Types.ObjectId,
    refPath: 'type',
  },
  read: {
    type: Boolean,
    default: false,
  },
}, baseSchema);

// Requirement Schema
export const requirementSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  minDa: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  minTraffic: String,
  turnaround: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed'],
    default: 'open',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, baseSchema);