'use client';

import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface CategoryFiltersProps {
  availableLanguages: string[];
  subcategories: {
    id: string;
    name: string;
  }[];
}

export function CategoryFilters({ availableLanguages, subcategories }: CategoryFiltersProps) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minTraffic, setMinTraffic] = useState('');
  const [maxTraffic, setMaxTraffic] = useState('');
  const [daRange, setDaRange] = useState([0, 100]);
  const [paRange, setPaRange] = useState([0, 100]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const toggleSubcategory = (id: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handlePriceChange = (value: string, type: 'min' | 'max') => {
    const numberValue = value.replace(/[^0-9]/g, '');
    if (type === 'min') {
      setMinPrice(numberValue);
    } else {
      setMaxPrice(numberValue);
    }
  };

  return (
    <Card className="p-6 space-y-6 h-fit gradient-border">
      <div className="space-y-4">
        <h3 className="font-semibold">Price Range ($)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price">Min Price</Label>
            <Input
              id="min-price"
              type="text"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => handlePriceChange(e.target.value, 'min')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price">Max Price</Label>
            <Input
              id="max-price"
              type="text"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => handlePriceChange(e.target.value, 'max')}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Monthly Traffic</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-traffic">Min Traffic</Label>
            <Input
              id="min-traffic"
              type="text"
              placeholder="e.g., 10K"
              value={minTraffic}
              onChange={(e) => setMinTraffic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-traffic">Max Traffic</Label>
            <Input
              id="max-traffic"
              type="text"
              placeholder="e.g., 1M"
              value={maxTraffic}
              onChange={(e) => setMaxTraffic(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Domain Authority (DA)</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={daRange}
          onValueChange={setDaRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{daRange[0]}</span>
          <span>{daRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Page Authority (PA)</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={paRange}
          onValueChange={setPaRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{paRange[0]}</span>
          <span>{paRange[1]}</span>
        </div>
      </div>

      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Subcategories</h3>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <Badge
                key={sub.id}
                variant={selectedSubcategories.includes(sub.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => toggleSubcategory(sub.id)}
              >
                {sub.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-4">Languages</h3>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map((language) => (
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
        </ScrollArea>
      </div>

      <Button className="w-full gradient-border">Apply Filters</Button>
    </Card>
  );
}