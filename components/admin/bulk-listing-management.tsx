'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface BulkData {
  domains: string;
  descriptions: string;
  guidelines: string;
  prices: string;
  categories: string;
  defaultCategory: string;
  languages: string[];
}

export function BulkListingManagement() {
  const { toast } = useToast();
  const [bulkData, setBulkData] = useState<BulkData>({
    domains: '',
    descriptions: '',
    guidelines: '',
    prices: '',
    categories: '',
    defaultCategory: '',
    languages: [],
  });

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

  const availableCategories = [
    'Technology',
    'Marketing',
    'Health',
    'Finance',
    'Travel',
    'Lifestyle',
    'Business',
    'Education',
  ];

  const addLanguage = (language: string) => {
    if (!bulkData.languages.includes(language)) {
      setBulkData({ ...bulkData, languages: [...bulkData.languages, language] });
    }
  };

  const removeLanguage = (language: string) => {
    setBulkData({
      ...bulkData,
      languages: bulkData.languages.filter(l => l !== language),
    });
  };

  const processBulkData = () => {
    const domainCount = bulkData.domains.split('\n').filter(line => line.trim()).length;
    const descriptionCount = bulkData.descriptions.split('\n').filter(line => line.trim()).length;
    const guidelineCount = bulkData.guidelines.split('\n').filter(line => line.trim()).length;
    const priceCount = bulkData.prices.split('\n').filter(line => line.trim()).length;
    const categoryCount = bulkData.categories.split('\n').filter(line => line.trim()).length;

    // If categories are provided, check if they match other fields count
    if (bulkData.categories.trim() && categoryCount !== domainCount) {
      toast({
        title: 'Validation Error',
        description: 'Number of categories must match number of domains.',
        variant: 'destructive',
      });
      return;
    }

    if (![domainCount, descriptionCount, guidelineCount, priceCount].every(count => count === domainCount)) {
      toast({
        title: 'Validation Error',
        description: 'All fields must have the same number of lines.',
        variant: 'destructive',
      });
      return;
    }

    // If no categories provided, check for default category
    if (!bulkData.categories.trim() && !bulkData.defaultCategory) {
      toast({
        title: 'Validation Error',
        description: 'Please either provide categories for each listing or select a default category.',
        variant: 'destructive',
      });
      return;
    }

    if (bulkData.languages.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one language.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `${domainCount} listings have been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bulk Listing Management</h2>
          <p className="text-muted-foreground">Add multiple listings at once</p>
        </div>
        <Button onClick={processBulkData}>
          <Save className="h-4 w-4 mr-2" />
          Process All Listings
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label>Default Category (Optional)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Used when individual categories are not specified
              </p>
              <Select
                value={bulkData.defaultCategory}
                onValueChange={(value) => setBulkData({ ...bulkData, defaultCategory: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select default category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <Select onValueChange={addLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Add languages" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language.toLowerCase()}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {bulkData.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="flex items-center gap-1">
                    {language}
                    <button
                      onClick={() => removeLanguage(language)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <Label>Domains (one per line)</Label>
            <Textarea
              value={bulkData.domains}
              onChange={(e) => setBulkData({ ...bulkData, domains: e.target.value })}
              placeholder="example1.com&#10;example2.com&#10;example3.com"
              rows={5}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <Label>Categories (one per line)</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Optional if default category is selected
            </p>
            <Textarea
              value={bulkData.categories}
              onChange={(e) => setBulkData({ ...bulkData, categories: e.target.value })}
              placeholder="technology&#10;marketing&#10;health"
              rows={5}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <Label>Descriptions (one per line)</Label>
            <Textarea
              value={bulkData.descriptions}
              onChange={(e) => setBulkData({ ...bulkData, descriptions: e.target.value })}
              placeholder="Description for website 1&#10;Description for website 2&#10;Description for website 3"
              rows={5}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <Label>Content Guidelines (one per line)</Label>
            <Textarea
              value={bulkData.guidelines}
              onChange={(e) => setBulkData({ ...bulkData, guidelines: e.target.value })}
              placeholder="Guidelines for website 1&#10;Guidelines for website 2&#10;Guidelines for website 3"
              rows={5}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <Label>Prices in USD (one per line)</Label>
            <Textarea
              value={bulkData.prices}
              onChange={(e) => setBulkData({ ...bulkData, prices: e.target.value })}
              placeholder="150&#10;200&#10;250"
              rows={5}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}