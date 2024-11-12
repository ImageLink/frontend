export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'message' | 'listing' | 'system';
  read: boolean;
  createdAt: string;
  updatedAt: string;
  relatedId?: string;
  relatedType?: 'message' | 'listing';
}