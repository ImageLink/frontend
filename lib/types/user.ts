export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  role: 'admin' | 'user';
  status: 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  totalReports: number;
  openReports: number;
  resolvedReports: number;
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    total: number;
  };
  growth: {
    users: string;
    listings: string;
    revenue: string;
  };
}