import { Card } from "@/components/ui/card";
import { Listing } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface SeoMetricsDisplayProps {
  listing: Listing;
}

export function SeoMetricsDisplay({ listing }: SeoMetricsDisplayProps) {
  const getSpamScoreColor = (score: number) => {
    if (score <= 2) return "text-green-500";
    if (score <= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const getSiteScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Overall Score */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Site Score</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Overall Score</span>
            <span className={`text-2xl font-bold ${getSiteScoreColor(listing.siteScore || 0)}`}>
              {listing.siteScore}/100
            </span>
          </div>
        </div>
      </Card>

      {/* Moz Metrics */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Moz Metrics</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Domain Authority</span>
            <span className="font-medium">{listing.seoMetrics.moz.da}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Page Authority</span>
            <span className="font-medium">{listing.seoMetrics.moz.pa}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Moz Rank</span>
            <span className="font-medium">{listing.seoMetrics.moz.mozRank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Spam Score</span>
            <span className={`font-medium ${getSpamScoreColor(listing.seoMetrics.moz.spamScore)}`}>
              {listing.seoMetrics.moz.spamScore}/10
            </span>
          </div>
        </div>
      </Card>

      {/* SEMrush Metrics */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">SEMrush Metrics</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rank</span>
            <span className="font-medium">{listing.seoMetrics.semrush.rank.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Keywords</span>
            <span className="font-medium">{listing.seoMetrics.semrush.keywords.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Traffic Cost</span>
            <span className="font-medium">{listing.seoMetrics.semrush.trafficCost}</span>
          </div>
        </div>
      </Card>

      {/* Ahrefs Metrics */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Ahrefs Metrics</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Domain Rating</span>
            <span className="font-medium">{listing.seoMetrics.ahrefs.dr}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Referring Domains</span>
            <span className="font-medium">{listing.seoMetrics.ahrefs.referringDomains.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Backlinks</span>
            <span className="font-medium">{listing.seoMetrics.ahrefs.backlinks.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Majestic Metrics */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Majestic Metrics</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Trust Flow</span>
            <span className="font-medium">{listing.seoMetrics.majestic.tf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Citation Flow</span>
            <span className="font-medium">{listing.seoMetrics.majestic.cf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Referring Domains</span>
            <span className="font-medium">{listing.seoMetrics.majestic.referringDomains.toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}