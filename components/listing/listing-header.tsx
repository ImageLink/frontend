import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, BarChart3, Clock, Activity, Link2, BadgeCheck } from "lucide-react";
import { Listing } from "@/lib/data";
import Image from "next/image";

interface ListingHeaderProps {
  listing: Listing;
  compact?: boolean;
}

export function ListingHeader({ listing, compact = false }: ListingHeaderProps) {
  return (
    <CardHeader className={compact ? "p-4" : "p-6"}>
      <div className="space-y-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={listing.image}
            alt={`Guest posting opportunity website screenshot for ${listing.domain}`}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <Badge variant="outline" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
            ${listing.price}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className={`font-bold ${compact ? "text-lg" : "text-2xl"}`}>
              {listing.domain}
            </h2>
            {listing.isPremium && (
              <BadgeCheck className="h-5 w-5 text-blue-500" />
            )}
          </div>

          {!compact && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Domain Authority</div>
                <div className="text-xl font-bold">{listing.da}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Domain Rating</div>
                <div className="text-xl font-bold">{listing.dr}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Trust Flow</div>
                <div className="text-xl font-bold">{listing.seoMetrics?.majestic?.tf ?? 'N/A'}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Citation Flow</div>
                <div className="text-xl font-bold">{listing.seoMetrics?.majestic?.cf ?? 'N/A'}</div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{listing.domain}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>{listing.seoMetrics?.semrush?.traffic ?? listing.traffic} Monthly Traffic</span>
            </div>
            <div className="flex items-center gap-1">
              <Link2 className="h-4 w-4" />
              <span>
                {(listing.seoMetrics?.ahrefs?.backlinks ?? 0).toLocaleString()} Backlinks
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>TAT: {listing.turnaround}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {listing.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </CardHeader>
  );
}