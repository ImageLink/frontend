'use client';

import { useState, useEffect } from 'react';
import { Message, MessageThread } from '@/lib/types/message';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth';

export function useMessages() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<MessageThread[]>([]);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/messages');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessages(data.messages);
      
      // Group messages into threads
      const threadMap = new Map<string, MessageThread>();
      
      data.messages.forEach((message: Message) => {
        const otherParticipant = message.senderId === user?.id ? message.receiver : message.sender;
        const threadId = [message.senderId, message.receiverId].sort().join('-');
        
        if (!threadMap.has(threadId)) {
          threadMap.set(threadId, {
            id: threadId,
            participants: [
              { id: message.senderId, username: message.sender.username },
              { id: message.receiverId, username: message.receiver.username }
            ],
            messages: [],
            lastMessage: message,
            unreadCount: message.senderId !== user?.id && !message.read ? 1 : 0
          });
        } else {
          const thread = threadMap.get(threadId)!;
          if (message.senderId !== user?.id && !message.read) {
            thread.unreadCount++;
          }
          if (new Date(message.createdAt) > new Date(thread.lastMessage.createdAt)) {
            thread.lastMessage = message;
          }
        }
        
        threadMap.get(threadId)!.messages.push(message);
      });
      
      setThreads(Array.from(threadMap.values()));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (receiverId: string, subject: string, content: string) => {
    try {
      const response = await fetch('/api/dashboard/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId, subject, content }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Update messages and threads
      setMessages(prev => [data.message, ...prev]);
      
      const threadId = [data.message.senderId, data.message.receiverId].sort().join('-');
      setThreads(prev => {
        const existingThread = prev.find(t => t.id === threadId);
        if (existingThread) {
          return prev.map(thread => 
            thread.id === threadId
              ? {
                  ...thread,
                  messages: [...thread.messages, data.message],
                  lastMessage: data.message,
                }
              : thread
          );
        } else {
          return [{
            id: threadId,
            participants: [
              { id: data.message.senderId, username: data.message.sender.username },
              { id: data.message.receiverId, username: data.message.receiver.username }
            ],
            messages: [data.message],
            lastMessage: data.message,
            unreadCount: 0
          }, ...prev];
        }
      });

      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/dashboard/messages/${messageId}/read`, {
        method: 'PUT',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Update messages
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );

      // Update threads
      setThreads(prev =>
        prev.map(thread => {
          const message = thread.messages.find(m => m.id === messageId);
          if (message && message.senderId !== user?.id && !message.read) {
            return {
              ...thread,
              messages: thread.messages.map(m =>
                m.id === messageId ? { ...m, read: true } : m
              ),
              unreadCount: Math.max(0, thread.unreadCount - 1)
            };
          }
          return thread;
        })
      );

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  return {
    loading,
    messages,
    threads,
    sendMessage,
    markAsRead,
    refreshMessages: fetchMessages,
  };
}