'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function HomepageFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [daRange, setDaRange] = useState([0, 100]);
  const [paRange, setPaRange] = useState([0, 100]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [tat, setTat] = useState<string>('');
  const [traffic, setTraffic] = useState({ min: '', max: '' });

  const categories = [
    {
      id: '1',
      name: 'Technology',
      subcategories: [
        { id: '1-1', name: 'Web Development' },
        { id: '1-2', name: 'Mobile Apps' },
        { id: '1-3', name: 'AI & Machine Learning' },
      ],
    },
    {
      id: '2',
      name: 'Marketing',
      subcategories: [
        { id: '2-1', name: 'Digital Marketing' },
        { id: '2-2', name: 'Content Marketing' },
        { id: '2-3', name: 'SEO' },
      ],
    },
    // Add more categories as needed
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

  const handleSubcategoryToggle = (subcategoryId: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const handleReset = () => {
    setDaRange([0, 100]);
    setPaRange([0, 100]);
    setPriceRange([0, 500]);
    setSelectedCategory('');
    setSelectedSubcategories([]);
    setSelectedLanguage('');
    setTat('');
    setTraffic({ min: '', max: '' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="p-6 mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <div>
                  <Label>Domain Authority (DA)</Label>
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
                  <Label>Page Authority (PA)</Label>
                  <Slider
                    value={paRange}
                    onValueChange={setPaRange}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{paRange[0]}</span>
                    <span>{paRange[1]}</span>
                  </div>
                </div>

                <div>
                  <Label>Price Range ($)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Monthly Traffic</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input
                      placeholder="Min (e.g., 10K)"
                      value={traffic.min}
                      onChange={(e) => setTraffic({ ...traffic, min: e.target.value })}
                    />
                    <Input
                      placeholder="Max (e.g., 1M)"
                      value={traffic.max}
                      onChange={(e) => setTraffic({ ...traffic, max: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div>
                    <Label>Subcategories</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories
                        .find(c => c.id === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <Badge
                            key={sub.id}
                            variant={selectedSubcategories.includes(sub.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleSubcategoryToggle(sub.id)}
                          >
                            {sub.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select language" />
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

                <div>
                  <Label>Turnaround Time (TAT)</Label>
                  <Select value={tat} onValueChange={setTat}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select TAT" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={handleReset}>
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90">
                Apply Filters
              </Button>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}