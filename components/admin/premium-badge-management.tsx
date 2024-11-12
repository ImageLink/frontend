'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, BadgeCheck, Shield, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Website {
  id: string;
  domain: string;
  owner: string;
  da: number;
  traffic: string;
  isPremium: boolean;
  verifiedDate?: string;
}

export function PremiumBadgeManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [verificationNote, setVerificationNote] = useState('');

  // Mock data
  const websites: Website[] = [
    {
      id: '1',
      domain: 'techblog.com',
      owner: 'John Doe',
      da: 65,
      traffic: '500K',
      isPremium: true,
      verifiedDate: '2024-02-15',
    },
    {
      id: '2',
      domain: 'marketingpro.com',
      owner: 'Jane Smith',
      da: 55,
      traffic: '300K',
      isPremium: false,
    },
  ];

  const handleVerify = (website: Website) => {
    setSelectedWebsite(website);
    setVerificationNote('');
  };

  const handleConfirmVerification = () => {
    if (!verificationNote.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a verification note.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Premium Badge Updated',
      description: `Premium badge has been ${selectedWebsite?.isPremium ? 'removed from' : 'granted to'} ${selectedWebsite?.domain}`,
    });
    setSelectedWebsite(null);
  };

  const handleRevoke = (websiteId: string) => {
    toast({
      title: 'Premium Badge Revoked',
      description: 'The premium badge has been revoked successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Premium Badge Management</h2>
          <p className="text-muted-foreground">
            Manage premium verification badges for high-quality listings
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search websites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>DA</TableHead>
              <TableHead>Traffic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {website.domain}
                    {website.isPremium && (
                      <BadgeCheck className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{website.owner}</TableCell>
                <TableCell>{website.da}</TableCell>
                <TableCell>{website.traffic}</TableCell>
                <TableCell>
                  <Badge
                    variant={website.isPremium ? "default" : "secondary"}
                    className={website.isPremium ? "bg-blue-500" : ""}
                  >
                    {website.isPremium ? 'Premium' : 'Standard'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {website.verifiedDate || 'Not verified'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {website.isPremium ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevoke(website.id)}
                        className="text-red-500"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerify(website)}
                        className="text-blue-500"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedWebsite} onOpenChange={() => setSelectedWebsite(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Premium Status</DialogTitle>
            <DialogDescription>
              Grant premium badge to {selectedWebsite?.domain}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Verification Note</Label>
              <Textarea
                placeholder="Enter verification details and reasons..."
                value={verificationNote}
                onChange={(e) => setVerificationNote(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedWebsite(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmVerification}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <BadgeCheck className="h-4 w-4 mr-2" />
                Grant Premium Badge
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}