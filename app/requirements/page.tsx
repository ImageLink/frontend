'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { RequirementFilters } from '@/components/requirement/filters';
import { RequirementMessageDialog } from '@/components/requirement/message-dialog';
import { useState } from 'react';

interface Requirement {
  id: string;
  title: string;
  category: string;
  language: string;
  budget: number;
  da: number;
  traffic: string;
  turnaround: string;
  description: string;
  date: string;
  status: 'open' | 'in_progress' | 'completed';
}

const mockRequirements: Requirement[] = [
  {
    id: '1',
    title: 'Tech Blog Guest Post',
    category: 'Technology',
    language: 'English',
    budget: 200,
    da: 40,
    traffic: '50K',
    turnaround: '5-7 days',
    description: 'Looking for in-depth technical articles about web development and cloud computing.',
    date: '2024-02-15',
    status: 'open',
  },
  {
    id: '2',
    title: 'Health and Wellness Content',
    category: 'Health',
    language: 'Spanish',
    budget: 150,
    da: 35,
    traffic: '30K',
    turnaround: '3-5 days',
    description: 'Need articles about nutrition and mental health.',
    date: '2024-02-14',
    status: 'in_progress',
  },
];

export default function RequirementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/10 text-green-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'completed':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
              Guest Post Requirements
            </h1>
            <p className="text-muted-foreground">
              Browse and respond to guest posting requirements from potential clients
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <RequirementFilters />

            <div className="space-y-4">
              {mockRequirements.map((requirement) => (
                <Card key={requirement.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{requirement.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{requirement.category}</Badge>
                          <Badge variant="outline">{requirement.language}</Badge>
                          <Badge className={getStatusColor(requirement.status)}>
                            {requirement.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setSelectedRequirement(requirement)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>

                    <p className="text-muted-foreground">{requirement.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Budget: ${requirement.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">DA {requirement.da}+</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{requirement.traffic} Traffic</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{requirement.turnaround}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RequirementMessageDialog
        requirement={selectedRequirement}
        onClose={() => setSelectedRequirement(null)}
      />
    </div>
  );
}