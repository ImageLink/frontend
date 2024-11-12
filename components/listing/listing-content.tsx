import { CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Listing } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { SeoMetricsDisplay } from "./seo-metrics";

interface ListingContentProps {
  listing: Listing;
  compact?: boolean;
}

export function ListingContent({ listing, compact = false }: ListingContentProps) {
  return (
    <CardContent className={compact ? "p-4 pt-0" : "p-6 pt-0"}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          {compact
            ? `${listing.description.slice(0, 100)}...`
            : listing.description}
        </p>

        {!compact && (
          <>
            <SeoMetricsDisplay listing={listing} />

            <div className="space-y-2">
              <h3 className="font-semibold">Requirements</h3>
              <ul className="grid gap-2">
                {listing.requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </CardContent>
  );
}