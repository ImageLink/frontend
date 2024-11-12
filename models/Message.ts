import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  listingId?: mongoose.Types.ObjectId;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'archived';
  replies?: Array<{
    content: string;
    senderId: mongoose.Types.ObjectId;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
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
    enum: ['unread', 'read', 'archived'],
    default: 'unread',
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
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ createdAt: 1 });
messageSchema.index({ listingId: 1 });

// Update timestamps on reply
messageSchema.pre('save', function(next) {
  if (this.isModified('replies')) {
    this.updatedAt = new Date();
  }
  next();
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);