'use client';

import { Card } from '@/components/ui/card';
import { ListWebsiteForm } from '@/components/list-website/form';
import Header from '@/components/header';

export default function ListWebsitePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen hero-gradient py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
                List Your Website
              </h1>
              <p className="text-muted-foreground mt-2">
                Share your platform with our community of content creators
              </p>
            </div>

            <Card className="p-6 gradient-border">
              <ListWebsiteForm />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}