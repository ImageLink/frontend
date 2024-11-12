'use client';

import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Laptop, Heart, Briefcase, BookOpen, Camera, Coffee, DollarSign, Plane } from 'lucide-react';

export function MarketplaceFilters() {
  const categories = [
    { icon: Laptop, name: 'Technology' },
    { icon: Heart, name: 'Health' },
    { icon: Briefcase, name: 'Business' },
    { icon: BookOpen, name: 'Education' },
    { icon: Camera, name: 'Photography' },
    { icon: Coffee, name: 'Lifestyle' },
    { icon: DollarSign, name: 'Finance' },
    { icon: Plane, name: 'Travel' },
  ];

  return (
    <Card className="p-6 space-y-6 h-fit gradient-border">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Domain Authority</h3>
        <Slider
          defaultValue={[30, 100]}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(({ name }) => (
            <div key={name} className="flex items-center space-x-2">
              <Checkbox id={name} />
              <label htmlFor={name} className="text-sm cursor-pointer">
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full gradient-border">Apply Filters</Button>
    </Card>
  );
}