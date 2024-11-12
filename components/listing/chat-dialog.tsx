'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth';
import { Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Listing } from '@/lib/data';
import Link from 'next/link';

interface ChatDialogProps {
  listing: Listing;
}

export function ChatDialog({ listing }: ChatDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a message',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Here you would typically make an API call to send the message
      // For now, we'll just show a success toast
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent to the publisher.',
      });
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Button 
        className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] hover:opacity-90 transition-opacity text-white"
        size="lg"
        asChild
      >
        <Link href="/login">
          <Mail className="mr-2 h-5 w-5" />
          Login to Contact Publisher
        </Link>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] hover:opacity-90 transition-opacity text-white"
          size="lg"
        >
          <Mail className="mr-2 h-5 w-5" />
          Chat with Publisher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Message to Publisher</DialogTitle>
          <DialogDescription>
            Discuss your guest posting requirements for {listing.domain}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px]"
            />
            <p className="text-sm text-muted-foreground">
              Be specific about your content idea and requirements
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}