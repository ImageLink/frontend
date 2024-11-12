'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full group">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search by niche, domain authority, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 pl-6 pr-14 text-lg rounded-full border-2 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-[hsl(var(--primary))] purple-glow"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 rounded-full bg-gradient-to-r from-[hsl(var(--chart-1))] via-[hsl(var(--chart-2))] to-[hsl(var(--chart-3))] hover:opacity-90 transition-opacity"
        >
          <Search className="h-4 w-4 text-white" />
        </Button>
      </div>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl bg-gradient-to-r from-[hsl(var(--chart-1))/0.3] via-[hsl(var(--chart-2))/0.3] to-[hsl(var(--chart-3))/0.3]" />
    </form>
  );
}