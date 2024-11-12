'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, MailOpen, Reply } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'replied';
  date: string;
  replies?: {
    content: string;
    date: string;
  }[];
}

export function MessagesManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Mock messages data
  const messages: Message[] = [
    {
      id: 1,
      sender: 'John Doe',
      email: 'john@example.com',
      subject: 'Question about guest posting',
      content: 'I would like to know more about your guest posting opportunities...',
      status: 'unread',
      date: '2024-02-15T10:00:00Z',
    },
    {
      id: 2,
      sender: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Technical Support',
      content: 'Having issues with the payment system...',
      status: 'read',
      date: '2024-02-14T15:30:00Z',
      replies: [
        {
          content: 'Thank you for reaching out. Our team is looking into this issue...',
          date: '2024-02-14T16:00:00Z',
        }
      ]
    },
  ];

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      // Update message status to read
      // In a real app, make an API call here
      toast({
        title: 'Message marked as read',
        description: 'The message has been marked as read.',
      });
    }
  };

  const handleSendReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a reply message',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, make an API call to send the reply
    toast({
      title: 'Reply Sent',
      description: 'Your reply has been sent successfully.',
    });

    setReplyContent('');
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Messages Management</h2>
          <p className="text-muted-foreground">View and respond to user messages</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <Badge
                    variant={
                      message.status === 'unread'
                        ? 'destructive'
                        : message.status === 'replied'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{message.sender}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(message.date), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewMessage(message)}
                    >
                      {message.status === 'unread' ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedMessage(message);
                        setReplyContent('');
                      }}
                    >
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{selectedMessage?.sender}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage?.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedMessage && formatDistanceToNow(new Date(selectedMessage.date), { addSuffix: true })}
                </p>
              </div>
              <p className="font-medium">{selectedMessage?.subject}</p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{selectedMessage?.content}</p>
              </div>
            </div>

            {selectedMessage?.replies?.map((reply, index) => (
              <div key={index} className="ml-6 space-y-2">
                <div className="flex justify-between">
                  <p className="font-semibold">Admin Reply</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.date), { addSuffix: true })}
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{reply.content}</p>
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <h4 className="font-medium">Reply</h4>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              <Button onClick={handleSendReply}>
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}