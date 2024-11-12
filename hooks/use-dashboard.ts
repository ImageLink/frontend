'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';
import { Listing } from '@/lib/types/listing';

interface DashboardStats {
  activeListings: number;
  pendingListings: number;
  totalViews: number;
  unreadMessages: number;
  unreadNotifications: number;
  recentActivity: {
    type: 'message' | 'listing' | 'notification';
    title: string;
    description: string;
    date: string;
    isNew?: boolean;
  }[];
}

export function useDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch listings
      const listingsRes = await fetch('/api/dashboard/listings');
      const listingsData = await listingsRes.json();
      if (listingsRes.ok) setListings(listingsData.listings);

      // Fetch messages
      const messagesRes = await fetch('/api/dashboard/messages');
      const messagesData = await messagesRes.json();
      if (messagesRes.ok) setMessages(messagesData.messages);

      // Fetch notifications
      const notificationsRes = await fetch('/api/dashboard/notifications');
      const notificationsData = await notificationsRes.json();
      if (notificationsRes.ok) setNotifications(notificationsData.notifications);

      // Calculate stats
      const activeListings = listingsData.listings.filter((l: Listing) => l.status === 'active').length;
      const pendingListings = listingsData.listings.filter((l: Listing) => l.status === 'pending').length;
      const unreadMessages = messagesData.messages.filter((m: any) => !m.read).length;
      const unreadNotifications = notificationsData.notifications.filter((n: any) => !n.read).length;

      setStats({
        activeListings,
        pendingListings,
        totalViews: 0, // This would come from analytics in a real app
        unreadMessages,
        unreadNotifications,
        recentActivity: [
          ...messagesData.messages.slice(0, 3).map((m: any) => ({
            type: 'message' as const,
            title: 'New Message',
            description: `From ${m.sender.username}`,
            date: m.createdAt,
            isNew: !m.read,
          })),
          ...notificationsData.notifications.slice(0, 3).map((n: any) => ({
            type: 'notification' as const,
            title: n.title,
            description: n.content,
            date: n.createdAt,
            isNew: !n.read,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markNotificationsAsRead = async (notificationIds: string[]) => {
    try {
      const response = await fetch('/api/dashboard/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds }),
      });

      if (!response.ok) throw new Error('Failed to update notifications');

      setNotifications(prev => 
        prev.map(notif => 
          notificationIds.includes(notif.id) 
            ? { ...notif, read: true }
            : notif
        )
      );

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          unreadNotifications: stats.unreadNotifications - notificationIds.length,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/dashboard/messages/${messageId}/read`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to update message');

      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, read: true }
            : msg
        )
      );

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          unreadMessages: stats.unreadMessages - 1,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  return {
    loading,
    stats,
    listings,
    messages,
    notifications,
    markNotificationsAsRead,
    markMessageAsRead,
    refreshData: fetchDashboardData,
  };
}