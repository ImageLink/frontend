'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, Activity, BarChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RequirementForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [da, setDa] = useState('');
  const [traffic, setTraffic] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const categories = [
    'Technology',
    'Marketing',
    'Health',
    'Finance',
    'Travel',
    'Lifestyle',
    'Business',
    'Education',
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Korean',
  ];

  const turnaroundTimes = [
    '1-2 days',
    '3-5 days',
    '1 week',
    '2 weeks',
    'Flexible',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (description.split(' ').length < 50) {
      toast({
        title: "Description Too Short",
        description: "Please provide a detailed description of at least 50 words.",
        variant: "destructive",
      });
      return;
    }

    if (!budget || parseFloat(budget) <= 0) {
      toast({
        title: "Invalid Budget",
        description: "Please enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }

    if (!da || parseInt(da) < 0 || parseInt(da) > 100) {
      toast({
        title: "Invalid DA",
        description: "Please enter a valid Domain Authority value (0-100).",
        variant: "destructive",
      });
      return;
    }

    if (!selectedLanguage) {
      toast({
        title: "Language Required",
        description: "Please select a content language.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Requirement Submitted",
      description: "Your requirement has been submitted successfully.",
    });

    // Redirect to requirements page after submission
    router.push('/requirements');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language">Content Language</Label>
          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language.toLowerCase()}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="da">Required Domain Authority (DA)</Label>
            <div className="relative">
              <BarChart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="da"
                type="number"
                min="0"
                max="100"
                placeholder="Enter minimum DA (0-100)"
                value={da}
                onChange={(e) => setDa(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="traffic">Required Monthly Traffic</Label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="traffic"
                type="text"
                placeholder="e.g., 10K, 100K, 1M"
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="turnaround">Expected Turnaround Time</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select turnaround time" />
            </SelectTrigger>
            <SelectContent>
              {turnaroundTimes.map((tat) => (
                <SelectItem key={tat} value={tat.toLowerCase()}>
                  {tat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (USD)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="budget"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="pl-8"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="description">Detailed Requirements</Label>
            <span className="text-sm text-muted-foreground">
              {description.split(' ').length} / 50 words minimum
            </span>
          </div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your requirements in detail. Include information about your target audience, content type, specific topics, and any other preferences."
            className="h-32"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90"
      >
        Submit Requirement
      </Button>
    </form>
  );
}