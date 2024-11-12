'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export function RequirementFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [daRange, setDaRange] = useState([0, 100]);
  const [budgetRange, setBudgetRange] = useState([0, 1000]);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  return (
    <Card className="p-6 space-y-6 h-fit">
      <div>
        <Label className="text-base">Categories</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base">Languages</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {languages.map((language) => (
            <Badge
              key={language}
              variant={selectedLanguages.includes(language) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => toggleLanguage(language)}
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base">Domain Authority (DA)</Label>
        <Slider
          value={daRange}
          onValueChange={setDaRange}
          max={100}
          step={1}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{daRange[0]}</span>
          <span>{daRange[1]}</span>
        </div>
      </div>

      <div>
        <Label className="text-base">Budget Range ($)</Label>
        <Slider
          value={budgetRange}
          onValueChange={setBudgetRange}
          max={1000}
          step={10}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>${budgetRange[0]}</span>
          <span>${budgetRange[1]}</span>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90">
        Apply Filters
      </Button>
    </Card>
  );
}