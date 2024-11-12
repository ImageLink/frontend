import { z } from 'zod';

// User validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

// Listing validation schemas
export const listingSchema = z.object({
  domain: z
    .string()
    .url('Invalid domain URL')
    .regex(/^https?:\/\//, 'URL must start with http:// or https://'),
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(100, 'Description must be at least 100 characters'),
  price: z.number().min(20, 'Minimum price is $20'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  guidelines: z.array(z.string()).min(1, 'Add at least one guideline'),
});

// Message validation schema
export const messageSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  content: z.string().min(20, 'Message must be at least 20 characters'),
});

// Requirement validation schema
export const requirementSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  budget: z.number().min(20, 'Minimum budget is $20'),
  minDA: z.number().min(0).max(100, 'DA must be between 0 and 100'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});