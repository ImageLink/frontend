'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
}

interface CategoryFormData {
  name: string;
  slug: string;
  subcategories: { name: string }[];
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || '',
    slug: category?.slug || '',
    subcategories: category?.subcategories || [],
  });
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.slug) {
      toast({
        title: "Validation Error",
        description: "Name and slug are required",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const addSubcategory = () => {
    if (!newSubcategory.trim()) return;
    if (formData.subcategories.some(sub => sub.name === newSubcategory)) {
      toast({
        title: "Validation Error",
        description: "Subcategory already exists",
        variant: "destructive",
      });
      return;
    }
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { name: newSubcategory }],
    });
    setNewSubcategory('');
  };

  const removeSubcategory = (name: string) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter(sub => sub.name !== name),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Subcategories</Label>
        <div className="flex gap-2">
          <Input
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Add subcategory"
          />
          <Button type="button" onClick={addSubcategory}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.subcategories.map((sub) => (
            <Badge key={sub.name} variant="secondary" className="flex items-center gap-1">
              {sub.name}
              <button
                type="button"
                onClick={() => removeSubcategory(sub.name)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Category</Button>
      </div>
    </form>
  );
}