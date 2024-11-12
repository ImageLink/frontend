'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ListingRow } from '@/components/admin/listings/listing-row';
import { EditForm } from '@/components/admin/listings/edit-form';

interface Listing {
  id: string;
  domain: string;
  owner: string;
  da: number;
  dr: number;
  traffic: string;
  status: string;
  price: number;
  showPrice: boolean;
  categories: string[];
  requirements: string[];
  turnaround: string;
  description: string;
  linkType: string;
  isPremium: boolean;
  languages: string[];
  date: string;
}

export function ListingsManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/admin/listings');
      if (!response.ok) throw new Error('Failed to fetch listings');
      const data = await response.json();
      setListings(data.listings);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (listingId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast({
        title: "Success",
        description: `Listing ${status === 'active' ? 'approved' : 'rejected'}`,
      });

      fetchListings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete listing');

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });

      fetchListings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const response = await fetch(`/api/admin/listings/${selectedListing?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update listing');

      toast({
        title: "Success",
        description: "Listing updated successfully",
      });

      setSelectedListing(null);
      fetchListings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing",
        variant: "destructive",
      });
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Listings Management</h2>
          <p className="text-muted-foreground">Manage website listings and details</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Metrics</TableHead>
              <TableHead>Traffic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                onEdit={setSelectedListing}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          {selectedListing && (
            <EditForm
              listing={selectedListing}
              onSave={handleSave}
              onCancel={() => setSelectedListing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}