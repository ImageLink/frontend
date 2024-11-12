'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { listings } from '@/lib/data';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(20),
  showPrice: z.boolean(),
  description: z.string().min(70),
  categories: z.array(z.string()).min(1),
  turnaround: z.string().min(1, "Turnaround time is required"),
  guidelines: z.array(z.string()).min(1, "At least one guideline is required"),
});

export function EditListingForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [guidelines, setGuidelines] = useState<string[]>([]);

  // Find existing listing data
  const listing = listings.find(l => l.id === id);

  const categories = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Marketing' },
    { id: '3', name: 'Health' },
    { id: '4', name: 'Finance' },
    { id: '5', name: 'Travel' },
    { id: '6', name: 'Lifestyle' },
    { id: '7', name: 'Business' },
    { id: '8', name: 'Education' },
  ];

  const turnaroundOptions = [
    { value: '1-2', label: '1-2 days' },
    { value: '3-5', label: '3-5 days' },
    { value: '5-7', label: '5-7 days' },
    { value: '7-10', label: '7-10 days' },
    { value: '10+', label: '10+ days' },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: listing?.domain || '',
      price: listing?.price || 50,
      showPrice: true,
      description: listing?.description || '',
      categories: [],
      turnaround: listing?.turnaround || '3-5',
      guidelines: listing?.requirements || [''],
    },
  });

  // Initialize selected categories and guidelines from listing data
  useEffect(() => {
    if (listing) {
      const categoryIds = listing.categories.map(cat => 
        categories.find(c => c.name === cat)?.id || ''
      ).filter(id => id !== '');
      setSelectedCategories(categoryIds);
      setGuidelines(listing.requirements || ['']);
    }
  }, [listing]);

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategories.length >= 3 && !selectedCategories.includes(categoryId)) {
      toast({
        title: "Category Limit Reached",
        description: "You can only select up to 3 categories.",
        variant: "destructive",
      });
      return;
    }

    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addGuideline = () => {
    setGuidelines([...guidelines, '']);
  };

  const removeGuideline = (index: number) => {
    if (guidelines.length > 1) {
      const newGuidelines = guidelines.filter((_, i) => i !== index);
      setGuidelines(newGuidelines);
      form.setValue('guidelines', newGuidelines);
    }
  };

  const updateGuideline = (index: number, value: string) => {
    const newGuidelines = [...guidelines];
    newGuidelines[index] = value;
    setGuidelines(newGuidelines);
    form.setValue('guidelines', newGuidelines);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (selectedCategories.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please select at least one category.',
          variant: 'destructive',
        });
        return;
      }

      if (guidelines.some(g => !g.trim())) {
        toast({
          title: 'Validation Error',
          description: 'All guidelines must have content.',
          variant: 'destructive',
        });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'Your listing has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update listing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Website Title</Label>
            <Input
              id="title"
              {...form.register('title')}
              placeholder="Enter your website title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <div className="relative">
              <input
                id="price"
                type="number"
                min="20"
                {...form.register('price', { valueAsNumber: true })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <p className="text-sm text-muted-foreground">Minimum price: $20 USD</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showPrice"
              checked={form.watch('showPrice')}
              onCheckedChange={value =>
                form.setValue('showPrice', value, { shouldValidate: true })
              }
            />
            <Label htmlFor="showPrice">Show Price Publicly</Label>
          </div>

          <div className="space-y-2">
            <Label>Categories (Select up to 3)</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedCategories.length}/3 categories selected
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="turnaround">Turnaround Time</Label>
            <Select 
              value={form.watch('turnaround')} 
              onValueChange={(value) => form.setValue('turnaround', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select turnaround time" />
              </SelectTrigger>
              <SelectContent>
                {turnaroundOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (minimum 70 words)</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              rows={5}
              placeholder="Describe your website, target audience, and guest posting guidelines..."
            />
            <p className="text-sm text-muted-foreground">
              {form.watch('description').split(' ').length} words
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Content Guidelines</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGuideline}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Guideline
              </Button>
            </div>
            <div className="space-y-3">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={guideline}
                    onChange={(e) => updateGuideline(index, e.target.value)}
                    placeholder={`Guideline ${index + 1}`}
                  />
                  {guidelines.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeGuideline(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90" 
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}