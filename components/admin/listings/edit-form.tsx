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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditFormProps {
  listing: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function EditForm({ listing, onSave, onCancel }: EditFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    domain: listing.domain,
    description: listing.description || '',
    price: listing.price,
    showPrice: listing.showPrice ?? true,
    da: listing.da,
    dr: listing.dr || 0,
    traffic: listing.traffic,
    categories: listing.categories || [],
    requirements: listing.requirements || [''],
    turnaround: listing.turnaround || '',
    linkType: listing.linkType || 'dofollow',
    isPremium: listing.isPremium || false,
    languages: listing.languages || [],
    siteScore: listing.siteScore || 0,
    seoMetrics: listing.seoMetrics || {
      moz: {
        mozRank: 0,
      }
    }
  });

  const [newCategory, setNewCategory] = useState('');

  const categories = [
    'Technology', 'Marketing', 'Health', 'Finance', 'Travel',
    'Lifestyle', 'Business', 'Education', 'Art & Design', 'Music',
    'Fitness', 'Real Estate', 'E-commerce', 'Food & Cooking',
    'Environment', 'Gaming', 'Sustainability', 'Literature',
    'Software', 'Social Media', 'News'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian',
    'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean'
  ];

  const calculateSiteScore = () => {
    // Formula: mozRank * 10 + 8
    const mozRank = formData.seoMetrics.moz.mozRank;
    const calculatedScore = Math.round(mozRank * 10 + 8);
    setFormData({
      ...formData,
      siteScore: calculatedScore
    });
    toast({
      title: "Site Score Updated",
      description: `Site score has been calculated: ${calculatedScore}`,
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requirements: newRequirements
    });
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

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            min="20"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="da">Domain Authority</Label>
          <Input
            id="da"
            type="number"
            min="0"
            max="100"
            value={formData.da}
            onChange={(e) => setFormData({ ...formData, da: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dr">Domain Rating</Label>
          <Input
            id="dr"
            type="number"
            min="0"
            max="100"
            value={formData.dr}
            onChange={(e) => setFormData({ ...formData, dr: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="traffic">Monthly Traffic</Label>
          <Input
            id="traffic"
            value={formData.traffic}
            onChange={(e) => setFormData({ ...formData, traffic: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mozRank">Moz Rank</Label>
          <Input
            id="mozRank"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.seoMetrics.moz.mozRank}
            onChange={(e) => setFormData({
              ...formData,
              seoMetrics: {
                ...formData.seoMetrics,
                moz: {
                  ...formData.seoMetrics.moz,
                  mozRank: Number(e.target.value)
                }
              }
            })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="siteScore">Site Score</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={calculateSiteScore}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Formula: mozRank * 10 + 8</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="siteScore"
            type="number"
            min="0"
            max="100"
            value={formData.siteScore}
            onChange={(e) => setFormData({ ...formData, siteScore: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
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
        <Label>Content Requirements</Label>
        {formData.requirements.map((requirement, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={requirement}
              onChange={(e) => updateRequirement(index, e.target.value)}
              placeholder={`Requirement ${index + 1}`}
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
        <Button
          type="button"
          variant="outline"
          onClick={addRequirement}
          className="w-full mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Requirement
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="turnaround">Turnaround Time</Label>
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

      <div className="space-y-2">
        <Label htmlFor="linkType">Link Type</Label>
        <Select
          value={formData.linkType}
          onValueChange={(value) => setFormData({ ...formData, linkType: value })}
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

      <div className="flex items-center space-x-2">
        <Switch
          id="show-price"
          checked={formData.showPrice}
          onCheckedChange={(checked) => setFormData({ ...formData, showPrice: checked })}
        />
        <Label htmlFor="show-price">Show Price Publicly</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is-premium"
          checked={formData.isPremium}
          onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
        />
        <Label htmlFor="is-premium">Premium Listing</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}