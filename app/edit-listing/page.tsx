'use client';

import { Card } from '@/components/ui/card';
import { UserListings } from '@/components/edit-listing/user-listings';

export default function EditListingPage() {
  return (
    <div className="min-h-screen hero-gradient py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
              Manage Your Listings
            </h1>
            <p className="text-muted-foreground mt-2">
              Edit or remove your website listings
            </p>
          </div>

          <Card className="p-6 gradient-border">
            <UserListings />
          </Card>
        </div>
      </div>
    </div>
  );
}