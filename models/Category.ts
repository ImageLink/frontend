import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  subcategories: Array<{ name: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
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
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ 'subcategories.name': 1 });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);