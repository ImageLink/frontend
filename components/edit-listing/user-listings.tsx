'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Globe, DollarSign } from 'lucide-react';
import { listings } from '@/lib/data';

interface EditableListingState {
  id: string | null;
  description: string;
  price: number;
  showPrice: boolean;
}

export function UserListings() {
  const { toast } = useToast();
  const [editState, setEditState] = useState<EditableListingState>({
    id: null,
    description: '',
    price: 0,
    showPrice: true,
  });

  const startEditing = (listing: any) => {
    setEditState({
      id: listing.id,
      description: listing.description,
      price: listing.price,
      showPrice: true,
    });
  };

  const cancelEditing = () => {
    setEditState({
      id: null,
      description: '',
      price: 0,
      showPrice: true,
    });
  };

  const handleSave = (id: string) => {
    if (editState.description.split(' ').length < 70) {
      toast({
        title: 'Validation Error',
        description: 'Description must be at least 70 words.',
        variant: 'destructive',
      });
      return;
    }

    if (editState.price < 20) {
      toast({
        title: 'Validation Error',
        description: 'Minimum price must be $20 USD.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Your listing has been updated successfully.',
    });
    cancelEditing();
  };

  const handleDelete = (id: string) => {
    toast({
      title: 'Success',
      description: 'Your listing has been deleted successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="p-6 rounded-lg border bg-card text-card-foreground gradient-border"
        >
          {editState.id === listing.id ? (
            // Edit Mode
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave(listing.id)}
                    className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{listing.domain}</span>
              </div>

              <div className="space-y-2">
                <Label>Description (minimum 70 words)</Label>
                <Textarea
                  value={editState.description}
                  onChange={(e) => setEditState({ ...editState, description: e.target.value })}
                  rows={4}
                />
                <div className="text-sm text-muted-foreground">
                  {editState.description.split(' ').length} words
                </div>
              </div>

              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    min="20"
                    value={editState.price}
                    onChange={(e) => setEditState({ ...editState, price: Number(e.target.value) })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`show-price-${listing.id}`}
                  checked={editState.showPrice}
                  onCheckedChange={(checked) => setEditState({ ...editState, showPrice: checked })}
                />
                <Label htmlFor={`show-price-${listing.id}`}>Show Price Publicly</Label>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEditing(listing)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this listing? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(listing.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{listing.domain}</span>
              </div>

              <p className="text-muted-foreground">{listing.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${listing.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Price is {editState.showPrice ? 'visible' : 'hidden'} to public
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {listings.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>You haven't listed any websites yet.</p>
          <Button className="mt-4" asChild>
            <a href="/list-website">List Your First Website</a>
          </Button>
        </div>
      )}
    </div>
  );
}