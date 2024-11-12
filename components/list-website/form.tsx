'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, X, Calculator } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WebsiteVerification } from './verification';
import { useListings } from '@/hooks/use-listings';
import { ListingFormData } from '@/lib/types/listing';

export function ListWebsiteForm() {
  const { toast } = useToast();
  const { createListing } = useListings();
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState<ListingFormData>({
    domain: '',
    description: '',
    categories: [],
    price: 20,
    showPrice: true,
    requirements: [''],
    turnaround: '3-5',
    linkType: 'dofollow',
    languages: [],
  });

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

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        requirements: newRequirements
      });
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const toggleCategory = (category: string) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    setFormData({
      ...formData,
      categories: newCategories
    });
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    setFormData({
      ...formData,
      languages: newLanguages
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your website ownership first.",
        variant: "destructive",
      });
      return;
    }

    if (formData.description.split(' ').length < 70) {
      toast({
        title: "Description Too Short",
        description: "Please provide a description with at least 70 words.",
        variant: "destructive",
      });
      return;
    }

    if (formData.categories.length === 0) {
      toast({
        title: "Categories Required",
        description: "Please select at least one category.",
        variant: "destructive",
      });
      return;
    }

    if (formData.languages.length === 0) {
      toast({
        title: "Language Required",
        description: "Please select at least one language.",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => form.append(`${key}[]`, item));
      } else {
        form.append(key, value.toString());
      }
    });

    const result = await createListing(form);
    if (result.success) {
      // Reset form
      setFormData({
        domain: '',
        description: '',
        categories: [],
        price: 20,
        showPrice: true,
        requirements: [''],
        turnaround: '3-5',
        linkType: 'dofollow',
        languages: [],
      });
      setIsVerified(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Website URL</Label>
          <Input
            id="domain"
            type="url"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            placeholder="https://example.com"
            required
          />
        </div>

        {formData.domain && !isVerified && (
          <WebsiteVerification
            websiteUrl={formData.domain}
            onVerificationComplete={() => setIsVerified(true)}
          />
        )}

        {isVerified && (
          <>
            <div className="space-y-2">
              <Label>Categories (Select up to 3)</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant={formData.languages.includes(language) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (minimum 70 words)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                required
              />
              <div className="text-sm text-muted-foreground">
                {formData.description.split(' ').length} words
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="20"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Minimum price: $20 USD
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-price"
                checked={formData.showPrice}
                onCheckedChange={(checked) => setFormData({ ...formData, showPrice: checked })}
              />
              <Label htmlFor="show-price">Show Price Publicly</Label>
            </div>

            <div className="space-y-2">
              <Label>Link Type</Label>
              <Select
                value={formData.linkType}
                onValueChange={(value: 'dofollow' | 'nofollow' | 'both') => 
                  setFormData({ ...formData, linkType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select link type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dofollow">Dofollow</SelectItem>
                  <SelectItem value="nofollow">Nofollow</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Turnaround Time</Label>
              <Select
                value={formData.turnaround}
                onValueChange={(value) => setFormData({ ...formData, turnaround: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select turnaround time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 days</SelectItem>
                  <SelectItem value="3-5">3-5 days</SelectItem>
                  <SelectItem value="5-7">5-7 days</SelectItem>
                  <SelectItem value="7-10">7-10 days</SelectItem>
                  <SelectItem value="10+">10+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Content Requirements</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    required
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90"
        disabled={!isVerified}
      >
        Submit Website
      </Button>
    </form>
  );
}