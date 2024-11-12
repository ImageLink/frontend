'use client';

import { useState, useEffect } from 'react';
import { Listing } from '@/lib/types/listing';
import { useToast } from '@/components/ui/use-toast';

interface UseListingsOptions {
  userId?: string;
  category?: string;
  minDa?: number;
  maxDa?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

export function useListings(options: UseListingsOptions = {}) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, [options]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (options.userId) params.set('userId', options.userId);
      if (options.category) params.set('category', options.category);
      if (options.minDa) params.set('minDa', options.minDa.toString());
      if (options.maxDa) params.set('maxDa', options.maxDa.toString());
      if (options.minPrice) params.set('minPrice', options.minPrice.toString());
      if (options.maxPrice) params.set('maxPrice', options.maxPrice.toString());
      if (options.status) params.set('status', options.status);

      const response = await fetch(`/api/listings?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setListings(data.listings);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setListings(prev => [data.listing, ...prev]);
      toast({
        title: "Success",
        description: "Listing created successfully",
      });

      return { success: true, listing: data.listing };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateListing = async (id: string, updates: Partial<Listing>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setListings(prev => 
        prev.map(listing => 
          listing.id === id ? { ...listing, ...data.listing } : listing
        )
      );

      toast({
        title: "Success",
        description: "Listing updated successfully",
      });

      return { success: true, listing: data.listing };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setListings(prev => prev.filter(listing => listing.id !== id));
      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    listings,
    loading,
    error,
    createListing,
    updateListing,
    deleteListing,
    refreshListings: fetchListings,
  };
}