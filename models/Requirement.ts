import mongoose, { Schema, Document } from 'mongoose';

export interface IRequirement extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  language: string;
  description: string;
  budget: number;
  minDa: number;
  minTraffic?: string;
  turnaround: string;
  status: 'open' | 'in_progress' | 'completed';
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const requirementSchema = new Schema<IRequirement>({
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
requirementSchema.index({ userId: 1 });
requirementSchema.index({ category: 1 });
requirementSchema.index({ status: 1 });
requirementSchema.index({ budget: 1 });
requirementSchema.index({ minDa: 1 });
requirementSchema.index({ language: 1 });

export default mongoose.models.Requirement || mongoose.model<IRequirement>('Requirement', requirementSchema);