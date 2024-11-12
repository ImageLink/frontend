import connectDB from './db';
import User from '@/models/User';
import Listing from '@/models/Listing';
import Message from '@/models/Message';
import { Types } from 'mongoose';

export class ApiService {
  static async createListing(listing: any): Promise<{ listing: any | null; error: Error | null }> {
    try {
      await connectDB();

      const newListing = await Listing.create(listing);

      return {
        listing: newListing,
        error: null
      };
    } catch (error) {
      return {
        listing: null,
        error: error as Error
      };
    }
  }

  static async getListings(filters: {
    category?: string;
    minDa?: number;
    maxDa?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
    userId?: string;
  } = {}): Promise<{ listings: any[]; error: Error | null }> {
    try {
      await connectDB();

      let query: any = { status: 'active' };

      if (filters.category) {
        query.categoryId = filters.category;
      }
      if (filters.minDa) {
        query.da = { $gte: filters.minDa };
      }
      if (filters.maxDa) {
        query.da = { ...query.da, $lte: filters.maxDa };
      }
      if (filters.minPrice) {
        query.price = { $gte: filters.minPrice };
      }
      if (filters.maxPrice) {
        query.price = { ...query.price, $lte: filters.maxPrice };
      }
      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.userId) {
        query.userId = filters.userId;
      }

      const listings = await Listing.find(query)
        .sort({ createdAt: -1 })
        .populate('userId', 'username');

      return {
        listings,
        error: null
      };
    } catch (error) {
      return {
        listings: [],
        error: error as Error
      };
    }
  }

  static async getListing(id: string): Promise<{ listing: any | null; error: Error | null }> {
    try {
      await connectDB();

      const listing = await Listing.findById(id)
        .populate('userId', 'username email');

      if (!listing) {
        return {
          listing: null,
          error: new Error('Listing not found')
        };
      }

      return {
        listing,
        error: null
      };
    } catch (error) {
      return {
        listing: null,
        error: error as Error
      };
    }
  }

  static async updateListing(id: string, updates: any): Promise<{ listing: any | null; error: Error | null }> {
    try {
      await connectDB();

      const listing = await Listing.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true }
      );

      if (!listing) {
        return {
          listing: null,
          error: new Error('Listing not found')
        };
      }

      return {
        listing,
        error: null
      };
    } catch (error) {
      return {
        listing: null,
        error: error as Error
      };
    }
  }

  static async deleteListing(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      await connectDB();

      const result = await Listing.findByIdAndDelete(id);

      if (!result) {
        return {
          success: false,
          error: new Error('Listing not found')
        };
      }

      return {
        success: true,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  static async sendMessage(message: any): Promise<{ message: any | null; error: Error | null }> {
    try {
      await connectDB();

      const newMessage = await Message.create(message);

      return {
        message: newMessage,
        error: null
      };
    } catch (error) {
      return {
        message: null,
        error: error as Error
      };
    }
  }

  static async getMessages(userId: string): Promise<{ messages: any[]; error: Error | null }> {
    try {
      await connectDB();

      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      })
        .sort({ createdAt: -1 })
        .populate('senderId', 'username')
        .populate('receiverId', 'username');

      return {
        messages,
        error: null
      };
    } catch (error) {
      return {
        messages: [],
        error: error as Error
      };
    }
  }

  static async markMessageAsRead(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      await connectDB();

      const result = await Message.updateOne(
        { _id: new Types.ObjectId(id) },
        { $set: { status: 'read' } }
      );

      return {
        success: result.modifiedCount > 0,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }
}