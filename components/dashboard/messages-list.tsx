'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function MessagesList() {
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Guest Post Inquiry',
      message: 'I would like to write a guest post for your tech blog...',
      date: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      subject: 'Content Collaboration',
      message: 'Would you be interested in a content exchange...',
      date: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      subject: 'Website Review',
      message: 'I reviewed your requirements and would like to...',
      date: '2 days ago',
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search messages..." />
          </div>
          <Button className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90">
            Compose
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{message.sender}</h3>
                  {message.unread && <Badge>New</Badge>}
                </div>
                <p className="font-medium">{message.subject}</p>
                <p className="text-sm text-muted-foreground">{message.message}</p>
              </div>
              <span className="text-sm text-muted-foreground">{message.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}