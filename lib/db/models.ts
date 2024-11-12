import mongoose from 'mongoose';
import {
  userSchema,
  listingSchema,
  messageSchema,
  reportSchema,
  categorySchema,
  notificationSchema,
  requirementSchema,
} from './schema';

// User Model
export const User = mongoose.models.User || mongoose.model('User', userSchema);

// Listing Model
export const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

// Message Model
export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// Report Model
export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

// Category Model
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Notification Model
export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

// Requirement Model
export const Requirement = mongoose.models.Requirement || mongoose.model('Requirement', requirementSchema);