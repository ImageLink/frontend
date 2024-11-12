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
import { Search, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ReportsManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 1,
      type: 'Content',
      reporter: 'John Doe',
      subject: 'Spam Content',
      status: 'Open',
      priority: 'High',
      date: '2024-02-15',
    },
    {
      id: 2,
      type: 'User',
      reporter: 'Jane Smith',
      subject: 'Inappropriate Behavior',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-02-14',
    },
    {
      id: 3,
      type: 'Technical',
      reporter: 'Mike Johnson',
      subject: 'Website Error',
      status: 'Resolved',
      priority: 'Low',
      date: '2024-02-13',
    },
  ];

  const handleAction = (reportId: number, action: string) => {
    toast({
      title: 'Report Updated',
      description: `Report has been ${action.toLowerCase()}.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports Management</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.subject}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === 'Resolved'
                        ? 'default'
                        : report.status === 'Open'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={getPriorityColor(report.priority)}>
                    {report.priority}
                  </span>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(report.id, 'viewed')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {report.status !== 'Resolved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-500 hover:text-green-600"
                        onClick={() => handleAction(report.id, 'resolved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                    )}
                    {report.status === 'Open' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => handleAction(report.id, 'flagged')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Flag
                      </Button>
                    )}
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