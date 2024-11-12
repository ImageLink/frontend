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
import { Search, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ContentManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const content = [
    {
      id: 1,
      title: 'SEO Best Practices',
      author: 'John Doe',
      website: 'Tech Blog Pro',
      status: 'Published',
      date: '2024-02-15',
    },
    {
      id: 2,
      title: 'Content Marketing Guide',
      author: 'Jane Smith',
      website: 'Marketing Hub',
      status: 'Under Review',
      date: '2024-02-14',
    },
    {
      id: 3,
      title: 'Digital Marketing Trends',
      author: 'Mike Johnson',
      website: 'Business Insider',
      status: 'Rejected',
      date: '2024-02-13',
    },
  ];

  const handleAction = (contentId: number, action: string) => {
    toast({
      title: 'Content Updated',
      description: `Content has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.website}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === 'Published'
                        ? 'default'
                        : item.status === 'Rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAction(item.id, 'viewed')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAction(item.id, 'edited')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {item.status === 'Under Review' && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => handleAction(item.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleAction(item.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleAction(item.id, 'deleted')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}