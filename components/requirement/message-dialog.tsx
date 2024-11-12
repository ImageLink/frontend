'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Requirement {
  id: string;
  title: string;
  category: string;
  budget: number;
  description: string;
}

interface MessageDialogProps {
  requirement: Requirement | null;
  onClose: () => void;
}

export function RequirementMessageDialog({ requirement, onClose }: MessageDialogProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a message',
        variant: 'destructive',
      });
      return;
    }

    // Here you would typically send the message to your backend
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent successfully.',
    });
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={!!requirement} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Requirement Owner</DialogTitle>
          <DialogDescription>
            Send a message regarding "{requirement?.title}"
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
              Be specific about how you can meet their requirements
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
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