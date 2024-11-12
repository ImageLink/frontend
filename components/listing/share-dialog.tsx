'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Share2, Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';

interface ShareDialogProps {
  listing: {
    id: string;
    domain: string;
    description: string;
  };
}

export function ShareDialog({ listing }: ShareDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/listing/${listing.id}`
    : '';

  const shareText = `Check out this guest posting opportunity on ${listing.domain}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Link Copied',
        description: 'The listing URL has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard.',
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
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Listing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => window.open(shareLinks.twitter, '_blank')}
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => window.open(shareLinks.facebook, '_blank')}
              >
                <Facebook className="h-5 w-5 text-[#4267B2]" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => window.open(shareLinks.linkedin, '_blank')}
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={copyToClipboard}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}