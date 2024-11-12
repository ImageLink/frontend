import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { listings } from '@/lib/data';

export function FeaturedListings() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
            Featured Opportunities
          </h2>
          <Button variant="outline" className="glass-effect" asChild>
            <Link href="/marketplace">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="card-hover gradient-border overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={listing.image}
                  alt={`Featured guest post opportunity on ${listing.domain}`}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
                  ${listing.price}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{listing.domain}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-[hsl(var(--chart-1))]" />
                      <span>{listing.domain}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-[hsl(var(--chart-2))]" />
                      <span>DA: {listing.da}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listing.categories.map((category) => (
                      <Badge key={category} variant="outline" className="gradient-border">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Traffic: {listing.traffic}
                  </p>
                  <Button className="w-full gradient-border" asChild>
                    <Link href={`/listing/${listing.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}