import { listings } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, BarChart3, Clock, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SeoMetricsDisplay } from '@/components/listing/seo-metrics';

export function MarketplaceGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {listings.map((listing) => (
        <Card key={listing.id} className="card-hover gradient-border overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={listing.image}
              alt={`Guest posting opportunity website preview for ${listing.domain}`}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
              ${listing.price}
            </Badge>
          </div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{listing.domain}</CardTitle>
              {listing.isPremium && (
                <BadgeCheck className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-[hsl(var(--chart-1))]" />
                  <span>{listing.domain}</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-[hsl(var(--chart-2))]" />
                  <span>DA: {listing.da}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[hsl(var(--chart-3))]" />
                  <span>TAT: {listing.turnaround}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Badge variant="outline">
                  DR {listing.seoMetrics.ahrefs.dr}
                </Badge>
                <Badge variant="outline">
                  TF {listing.seoMetrics.majestic.tf}
                </Badge>
                <Badge variant="outline">
                  CF {listing.seoMetrics.majestic.cf}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {listing.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="gradient-border">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Monthly Traffic:</span>
                  <span>{listing.seoMetrics.semrush.traffic}</span>
                </div>
                <div className="flex justify-between">
                  <span>Referring Domains:</span>
                  <span>{listing.seoMetrics.ahrefs.referringDomains.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full gradient-border" asChild>
                <Link href={`/listing/${listing.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}