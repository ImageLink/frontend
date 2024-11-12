'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmbedDialogProps {
  listing: {
    id: string;
    domain: string;
    price: number;
    da: number;
    dr: number;
    traffic: string;
    categories: string[];
    turnaround: string;
    siteScore?: number;
    seoMetrics: {
      semrush: {
        rank: number;
        keywords: number;
        trafficCost: string;
      };
      majestic: {
        tf: number;
        cf: number;
        referringDomains: number;
      };
      ahrefs: {
        rank: number;
        backlinks: number;
        referringDomains: number;
      };
    };
  };
}

interface EmbedOptions {
  showPrice: boolean;
  showMetrics: boolean;
  showTraffic: boolean;
  showCategories: boolean;
  showTAT: boolean;
  showSiteScore: boolean;
  showSemrush: boolean;
  showMajestic: boolean;
  showAhrefs: boolean;
  style: 'minimal' | 'standard' | 'detailed';
}

export function EmbedDialog({ listing }: EmbedDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<EmbedOptions>({
    showPrice: true,
    showMetrics: false,
    showTraffic: false,
    showCategories: false,
    showTAT: false,
    showSiteScore: false,
    showSemrush: false,
    showMajestic: false,
    showAhrefs: false,
    style: 'standard'
  });

  const generateEmbedCode = () => {
    let content = '';
    let styles = '';

    switch (options.style) {
      case 'minimal':
        styles = `
          display:inline-block;
          padding:8px 16px;
          background:linear-gradient(to right, #7C3AED, #EC4899);
          color:white;
          text-decoration:none;
          border-radius:6px;
          font-family:system-ui,-apple-system,sans-serif;
        `;
        content = `Guest Post on ${listing.domain}${options.showPrice ? ` - $${listing.price}` : ''}`;
        break;

      case 'standard':
        styles = `
          display:inline-block;
          padding:12px 20px;
          background:linear-gradient(to right, #7C3AED, #EC4899);
          color:white;
          text-decoration:none;
          border-radius:8px;
          font-family:system-ui,-apple-system,sans-serif;
          min-width:250px;
        `;
        content = `
          <div style="font-weight:600;margin-bottom:4px;">Guest Post on ${listing.domain}</div>
          ${options.showPrice ? `<div style="font-size:0.875rem;">Price: $${listing.price}</div>` : ''}
          ${options.showMetrics ? `<div style="font-size:0.875rem;">DA: ${listing.da} | DR: ${listing.dr}</div>` : ''}
          ${options.showTAT ? `<div style="font-size:0.875rem;">Turnaround: ${listing.turnaround}</div>` : ''}
          ${options.showSiteScore && listing.siteScore ? `<div style="font-size:0.875rem;">Site Score: ${listing.siteScore}</div>` : ''}
        `;
        break;

      case 'detailed':
        styles = `
          display:inline-block;
          padding:16px 24px;
          background:linear-gradient(to right, #7C3AED, #EC4899);
          color:white;
          text-decoration:none;
          border-radius:10px;
          font-family:system-ui,-apple-system,sans-serif;
          min-width:300px;
        `;
        content = `
          <div style="font-weight:600;font-size:1.125rem;margin-bottom:8px;">Guest Post on ${listing.domain}</div>
          ${options.showPrice ? `<div style="margin-bottom:4px;">Price: $${listing.price}</div>` : ''}
          ${options.showMetrics ? `<div style="margin-bottom:4px;">DA: ${listing.da} | DR: ${listing.dr}</div>` : ''}
          ${options.showTraffic ? `<div style="margin-bottom:4px;">Traffic: ${listing.traffic}</div>` : ''}
          ${options.showTAT ? `<div style="margin-bottom:4px;">Turnaround: ${listing.turnaround}</div>` : ''}
          ${options.showSiteScore && listing.siteScore ? `<div style="margin-bottom:4px;">Site Score: ${listing.siteScore}</div>` : ''}
          ${options.showCategories ? `<div style="margin-bottom:4px;font-size:0.875rem;">${listing.categories.join(', ')}</div>` : ''}
          ${options.showSemrush ? `
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.2);">
              <div style="font-weight:600;margin-bottom:4px;">SEMrush Metrics</div>
              <div style="font-size:0.875rem;">Rank: ${listing.seoMetrics.semrush.rank}</div>
              <div style="font-size:0.875rem;">Keywords: ${listing.seoMetrics.semrush.keywords}</div>
              <div style="font-size:0.875rem;">Traffic Cost: ${listing.seoMetrics.semrush.trafficCost}</div>
            </div>
          ` : ''}
          ${options.showMajestic ? `
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.2);">
              <div style="font-weight:600;margin-bottom:4px;">Majestic Metrics</div>
              <div style="font-size:0.875rem;">TF: ${listing.seoMetrics.majestic.tf} | CF: ${listing.seoMetrics.majestic.cf}</div>
              <div style="font-size:0.875rem;">Referring Domains: ${listing.seoMetrics.majestic.referringDomains}</div>
            </div>
          ` : ''}
          ${options.showAhrefs ? `
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.2);">
              <div style="font-weight:600;margin-bottom:4px;">Ahrefs Metrics</div>
              <div style="font-size:0.875rem;">Rank: ${listing.seoMetrics.ahrefs.rank}</div>
              <div style="font-size:0.875rem;">Backlinks: ${listing.seoMetrics.ahrefs.backlinks}</div>
              <div style="font-size:0.875rem;">Referring Domains: ${listing.seoMetrics.ahrefs.referringDomains}</div>
            </div>
          ` : ''}
        `;
        break;
    }

    return `<a href="${typeof window !== 'undefined' ? window.location.origin : ''}/listing/${listing.id}" 
  style="${styles.replace(/\s+/g, ' ').trim()}">
  ${content.replace(/\s+/g, ' ').trim()}
</a>`;
  };

  const embedCode = generateEmbedCode();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: 'Code Copied',
        description: 'The embed code has been copied to your clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy code to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex-1"
      >
        <Code className="h-4 w-4 mr-2" />
        Embed
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Embed Listing</DialogTitle>
            <DialogDescription>
              Customize and add this listing button to your website
            </DialogDescription>
          </DialogHeader>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Increase the chances of link posts by placing this embed code on your website's contact or advertise page
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="customize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="code">Get Code</TabsTrigger>
            </TabsList>
            <TabsContent value="customize" className="space-y-4 py-4">
              <div className="space-y-4">
                <div>
                  <Label>Button Style</Label>
                  <Select
                    value={options.style}
                    onValueChange={(value: 'minimal' | 'standard' | 'detailed') => 
                      setOptions({ ...options, style: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Basic Information</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-price"
                        checked={options.showPrice}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showPrice: checked as boolean })
                        }
                      />
                      <label htmlFor="show-price">Show Price</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-metrics"
                        checked={options.showMetrics}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showMetrics: checked as boolean })
                        }
                      />
                      <label htmlFor="show-metrics">Show Metrics (DA/DR)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-traffic"
                        checked={options.showTraffic}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showTraffic: checked as boolean })
                        }
                      />
                      <label htmlFor="show-traffic">Show Traffic</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-tat"
                        checked={options.showTAT}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showTAT: checked as boolean })
                        }
                      />
                      <label htmlFor="show-tat">Show Turnaround Time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-categories"
                        checked={options.showCategories}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showCategories: checked as boolean })
                        }
                      />
                      <label htmlFor="show-categories">Show Categories</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-site-score"
                        checked={options.showSiteScore}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showSiteScore: checked as boolean })
                        }
                      />
                      <label htmlFor="show-site-score">Show Site Score</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Advanced Metrics</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-semrush"
                        checked={options.showSemrush}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showSemrush: checked as boolean })
                        }
                      />
                      <label htmlFor="show-semrush">Show SEMrush Metrics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-majestic"
                        checked={options.showMajestic}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showMajestic: checked as boolean })
                        }
                      />
                      <label htmlFor="show-majestic">Show Majestic Metrics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-ahrefs"
                        checked={options.showAhrefs}
                        onCheckedChange={(checked) => 
                          setOptions({ ...options, showAhrefs: checked as boolean })
                        }
                      />
                      <label htmlFor="show-ahrefs">Show Ahrefs Metrics</label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 bg-secondary/50 rounded-lg flex justify-center">
                    <div dangerouslySetInnerHTML={{ __html: embedCode }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Embed Code</Label>
                  <Textarea
                    readOnly
                    value={embedCode}
                    className="font-mono text-sm"
                    rows={6}
                  />
                </div>
                <Button onClick={copyToClipboard} className="w-full">
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}