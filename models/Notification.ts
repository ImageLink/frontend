import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  read: boolean;
  type: 'message' | 'listing' | 'report' | 'system';
  relatedId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
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
  read: {
    type: Boolean,
    default: false,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
notificationSchema.index({ userId: 1 });
notificationSchema.index({ read: 1 });
notificationSchema.index({ createdAt: 1 });
notificationSchema.index({ type: 1 });

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);