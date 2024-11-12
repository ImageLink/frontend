'use client';

import { User } from '@/lib/types/user';
import { Listing } from '@/lib/types/listing';
import { useToast } from '@/components/ui/use-toast';

export class AdminService {
  static async getUsers(search?: string): Promise<{ users: User[]; error: Error | null }> {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);

      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { users: data.users, error: null };
    } catch (error: any) {
      return { users: [], error };
    }
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<{ user: User | null; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { user: data.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  }

  static async getListings(filters: any = {}): Promise<{ listings: Listing[]; error: Error | null }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });

      const response = await fetch(`/api/admin/listings?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { listings: data.listings, error: null };
    } catch (error: any) {
      return { listings: [], error };
    }
  }

  static async updateListing(id: string, updates: Partial<Listing>): Promise<{ listing: Listing | null; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { listing: data.listing, error: null };
    } catch (error: any) {
      return { listing: null, error };
    }
  }

  static async deleteListing(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/listings/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error };
    }
  }

  static async getStats(): Promise<{ stats: any; error: Error | null }> {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { stats: data.stats, error: null };
    } catch (error: any) {
      return { stats: null, error };
    }
  }

  static async getReports(filters: any = {}): Promise<{ reports: any[]; error: Error | null }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });

      const response = await fetch(`/api/admin/reports?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { reports: data.reports, error: null };
    } catch (error: any) {
      return { reports: [], error };
    }
  }

  static async updateReport(id: string, updates: any): Promise<{ report: any; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { report: data.report, error: null };
    } catch (error: any) {
      return { report: null, error };
    }
  }

  static async getMessages(filters: any = {}): Promise<{ messages: any[]; error: Error | null }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });

      const response = await fetch(`/api/admin/messages?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { messages: data.messages, error: null };
    } catch (error: any) {
      return { messages: [], error };
    }
  }

  static async replyToMessage(messageId: string, content: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error };
    }
  }

  static async getCategories(): Promise<{ categories: any[]; error: Error | null }> {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { categories: data.categories, error: null };
    } catch (error: any) {
      return { categories: [], error };
    }
  }

  static async createCategory(categoryData: any): Promise<{ category: any; error: Error | null }> {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { category: data.category, error: null };
    } catch (error: any) {
      return { category: null, error };
    }
  }

  static async updateCategory(id: string, updates: any): Promise<{ category: any; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { category: data.category, error: null };
    } catch (error: any) {
      return { category: null, error };
    }
  }

  static async deleteCategory(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error };
    }
  }
}