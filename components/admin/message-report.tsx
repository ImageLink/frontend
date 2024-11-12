'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Ban, Flag, CheckCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MessageReport() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for all conversations
  const allConversations = [
    {
      id: 1,
      participants: 'John Doe & Jane Smith',
      lastMessage: 'Thanks for the information',
      status: 'Normal',
      date: '2024-02-15',
      messages: [
        {
          sender: 'John Doe',
          content: 'Hi, I\'m interested in guest posting on your site',
          time: '10:00 AM',
        },
        {
          sender: 'Jane Smith',
          content: 'Sure, our rates start from $100',
          time: '10:05 AM',
        },
        {
          sender: 'John Doe',
          content: 'Thanks for the information',
          time: '10:07 AM',
        },
      ],
    },
    // ... more conversations
  ];

  // Mock data for reported conversations
  const reportedConversations = [
    {
      id: 101,
      participants: 'Mike Brown & Sarah Wilson',
      lastMessage: 'This is unacceptable behavior',
      reportReason: 'Abusive Language',
      status: 'Flagged',
      reportedBy: 'Sarah Wilson',
      date: '2024-02-14',
      messages: [
        {
          sender: 'Mike Brown',
          content: 'Your prices are ridiculous!',
          time: '2:00 PM',
        },
        {
          sender: 'Sarah Wilson',
          content: 'Please maintain professional communication',
          time: '2:05 PM',
        },
        {
          sender: 'Mike Brown',
          content: 'This is unacceptable behavior',
          time: '2:07 PM',
        },
      ],
    },
    // ... more reported conversations
  ];

  const handleAction = (conversationId: number, action: string) => {
    toast({
      title: 'Conversation Updated',
      description: `Conversation has been marked as ${action}.`,
    });
  };

  const filteredAllConversations = allConversations.filter(conv =>
    conv.participants.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReportedConversations = reportedConversations.filter(conv =>
    conv.participants.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.reportReason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Message Monitoring</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="reported">Reported Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participants</TableHead>
                  <TableHead>Last Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAllConversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-medium">
                      {conversation.participants}
                    </TableCell>
                    <TableCell>{conversation.lastMessage}</TableCell>
                    <TableCell>{conversation.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-yellow-500 hover:text-yellow-600"
                          onClick={() => handleAction(conversation.id, 'flagged')}
                        >
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="reported">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participants</TableHead>
                  <TableHead>Report Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReportedConversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-medium">
                      {conversation.participants}
                    </TableCell>
                    <TableCell>{conversation.reportReason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          conversation.status === 'Flagged'
                            ? 'destructive'
                            : conversation.status === 'Resolved'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {conversation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{conversation.reportedBy}</TableCell>
                    <TableCell>{conversation.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleAction(conversation.id, 'banned')}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => handleAction(conversation.id, 'resolved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Conversation Details</DialogTitle>
            <DialogDescription>
              Between {selectedConversation?.participants}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedConversation?.reportReason && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Report Reason:</p>
                <p className="text-sm text-muted-foreground">{selectedConversation.reportReason}</p>
              </div>
            )}
            <div className="space-y-4">
              {selectedConversation?.messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.sender === selectedConversation.reportedBy
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === selectedConversation.reportedBy
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm font-medium">{message.sender}</p>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedConversation(null)}>
              Close
            </Button>
            {selectedConversation?.status === 'Flagged' && (
              <Button
                variant="destructive"
                onClick={() => {
                  handleAction(selectedConversation?.id, 'banned');
                  setSelectedConversation(null);
                }}
              >
                Ban User
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}