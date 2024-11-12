export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  sender: {
    username: string;
    email: string;
  };
  receiver: {
    username: string;
    email: string;
  };
}

export interface MessageThread {
  id: string;
  participants: {
    id: string;
    username: string;
  }[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}