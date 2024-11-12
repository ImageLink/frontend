'use client';

import { Card, CardHeader } from '@/components/ui/card';

export function Header() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Edit Your Listing
        </h1>
        <p className="text-muted-foreground">
          Update your website listing information and settings
        </p>
      </CardHeader>
    </Card>
  );
}