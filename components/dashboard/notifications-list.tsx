'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';

export function NotificationsList() {
  const notifications = [
    {
      id: 1,
      title: 'New Message Received',
      message: 'You have a new message from John Doe regarding your tech blog listing.',
      type: 'message',
      date: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Listing Approved',
      message: 'Your website "Tech Blog" has been approved and is now live.',
      type: 'success',
      date: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Profile Update Required',
      message: 'Please update your profile information to improve your visibility.',
      type: 'alert',
      date: '2 days ago',
      unread: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <div className="flex gap-4">
              {getIcon(notification.type)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {notification.unread && <Badge>New</Badge>}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {notification.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}