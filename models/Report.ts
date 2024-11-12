import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  reporterId: mongoose.Types.ObjectId;
  reportedId: mongoose.Types.ObjectId;
  messageId?: mongoose.Types.ObjectId;
  reason: string;
  status: 'open' | 'in_progress' | 'resolved';
  notes?: string[];
  createdAt: Date;
  resolvedAt?: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>({
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
    enum: ['open', 'in_progress', 'resolved'],
    default: 'open',
  },
  notes: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
reportSchema.index({ reporterId: 1 });
reportSchema.index({ reportedId: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ createdAt: 1 });

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);