import { Document, Types } from 'mongoose';

export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface WithTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface WithUser {
  userId: Types.ObjectId;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchOptions extends PaginationOptions {
  search?: string;
  searchFields?: string[];
  startDate?: string;
  endDate?: string;
}

export interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}