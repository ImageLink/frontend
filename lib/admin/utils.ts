import { User } from '@/lib/auth/types';

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const requireAdmin = (user: User | null): void => {
  if (!isAdmin(user)) {
    throw new Error('Admin access required');
  }
};

export const formatStats = (stats: any) => {
  return {
    users: {
      total: stats.totalUsers,
      label: 'Total Users',
      change: '+12%',
    },
    listings: {
      active: stats.activeListings,
      pending: stats.pendingListings,
      label: 'Active Listings',
      change: '+8%',
    },
    reports: {
      open: stats.openReports,
      label: 'Open Reports',
      change: '-5%',
    },
    messages: {
      unread: stats.unreadMessages,
      label: 'Unread Messages',
      change: '+15%',
    },
  };
};

export const validateAdminAction = (action: string, data: any): string | null => {
  switch (action) {
    case 'updateUser':
      if (!data.id) return 'User ID is required';
      break;
    case 'updateListing':
      if (!data.id) return 'Listing ID is required';
      if (data.status && !['pending', 'active', 'rejected'].includes(data.status)) {
        return 'Invalid listing status';
      }
      break;
    case 'updateReport':
      if (!data.id) return 'Report ID is required';
      if (data.status && !['open', 'in_progress', 'resolved'].includes(data.status)) {
        return 'Invalid report status';
      }
      break;
    default:
      return 'Invalid admin action';
  }
  return null;
};