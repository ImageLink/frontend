'use client';

import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export function Filters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [daRange, setDaRange] = useState([0, 100]);
  const [paRange, setPaRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'Technology', 'Marketing', 'Health', 'Finance', 
    'Travel', 'Lifestyle', 'Business', 'Education',
    'Fashion', 'Food', 'Sports', 'Entertainment'
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="py-8 bg-secondary/30">
      <div className="container px-4">
        <Card className="p-6 gradient-border">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Domain Authority */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Domain Authority (DA)</h3>
              <Slider
                value={daRange}
                onValueChange={setDaRange}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{daRange[0]}</span>
                <span>{daRange[1]}</span>
              </div>
            </div>

            {/* Page Authority */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Page Authority (PA)</h3>
              <Slider
                value={paRange}
                onValueChange={setPaRange}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{paRange[0]}</span>
                <span>{paRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Categories</h3>
              <ScrollArea className="h-24 rounded-md border p-2">
                <div className="flex flex-wrap gap-2">
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
              </ScrollArea>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setPriceRange([0, 500]);
                setDaRange([0, 100]);
                setPaRange([0, 100]);
                setSelectedCategories([]);
              }}
            >
              Reset Filters
            </Button>
            <Button className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90">
              Apply Filters
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}