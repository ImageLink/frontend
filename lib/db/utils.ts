import { Types } from 'mongoose';

export function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export function toObjectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}

export function sanitizeQuery(query: any): any {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function buildSearchQuery(search: string, fields: string[]): any {
  if (!search) return {};

  return {
    $or: fields.map(field => ({
      [field]: { $regex: search, $options: 'i' }
    }))
  };
}

export function buildDateRangeQuery(
  startDate?: string,
  endDate?: string,
  field: string = 'createdAt'
): any {
  const query: any = {};

  if (startDate || endDate) {
    query[field] = {};
    if (startDate) query[field].$gte = new Date(startDate);
    if (endDate) query[field].$lte = new Date(endDate);
  }

  return query;
}

export function buildPaginationOptions(
  page: number = 1,
  limit: number = 10
): { skip: number; limit: number } {
  return {
    skip: (page - 1) * limit,
    limit,
  };
}