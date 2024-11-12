import { Card } from "@/components/ui/card";

interface SeoMetricsProps {
  metrics: {
    pa: number;
    tf: number;
    cf: number;
    rd: number;
    backlinks: number;
  };
}

export function SeoMetricsDisplay({ metrics }: SeoMetricsProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">SEO Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Page Authority</div>
          <div className="text-lg font-semibold">{metrics.pa}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Trust Flow</div>
          <div className="text-lg font-semibold">{metrics.tf}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Citation Flow</div>
          <div className="text-lg font-semibold">{metrics.cf}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Referring Domains</div>
          <div className="text-lg font-semibold">{metrics.rd.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Total Backlinks</div>
          <div className="text-lg font-semibold">{metrics.backlinks.toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}