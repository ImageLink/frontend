'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Laptop, Heart, Briefcase, BookOpen, Camera, Coffee, DollarSign, Plane,
  Palette, Music, Dumbbell, Home, ShoppingBag, Utensils, Globe, Gamepad,
  Leaf, Book, Codesandbox, ChevronRight, Users, Newspaper
} from 'lucide-react';
import Link from 'next/link';

export function Categories() {
  const categories = [
    { icon: Laptop, name: 'Technology', count: 234 },
    { icon: Heart, name: 'Health', count: 156 },
    { icon: Briefcase, name: 'Business', count: 189 },
    { icon: BookOpen, name: 'Education', count: 145 },
    { icon: Camera, name: 'Photography', count: 98 },
    { icon: Coffee, name: 'Lifestyle', count: 167 },
    { icon: DollarSign, name: 'Finance', count: 178 },
    { icon: Plane, name: 'Travel', count: 134 },
    { icon: Palette, name: 'Art & Design', count: 112 },
    { icon: Music, name: 'Music', count: 89 },
    { icon: Dumbbell, name: 'Fitness', count: 145 },
    { icon: Home, name: 'Real Estate', count: 78 },
    { icon: ShoppingBag, name: 'E-commerce', count: 167 },
    { icon: Utensils, name: 'Food & Cooking', count: 198 },
    { icon: Globe, name: 'Environment', count: 87 },
    { icon: Gamepad, name: 'Gaming', count: 156 },
    { icon: Leaf, name: 'Sustainability', count: 92 },
    { icon: Book, name: 'Literature', count: 76 },
    { icon: Codesandbox, name: 'Software', count: 189 },
    { icon: Users, name: 'Social Media', count: 234 },
    { icon: Newspaper, name: 'News', count: 167 },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
          Popular Categories
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, name, count }) => (
            <Link key={name} href={`/category/${name.toLowerCase()}`}>
              <Card className="card-hover gradient-border">
                <CardContent className="flex items-center p-6">
                  <Icon className="h-8 w-8 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-lg p-1.5 text-white mr-4" />
                  <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {count} opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90">
            <Link href="/categories">
              View All Categories
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}