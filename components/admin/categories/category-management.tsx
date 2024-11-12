'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CategoryList } from './category-list';
import { CategoryForm } from './category-form';

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: { name: string }[];
}

export function CategoryManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Technology',
      slug: 'technology',
      subcategories: [
        { name: 'Web Development' },
        { name: 'Mobile Apps' },
        { name: 'AI & Machine Learning' },
      ],
    },
    {
      id: '2',
      name: 'Marketing',
      slug: 'marketing',
      subcategories: [
        { name: 'Digital Marketing' },
        { name: 'Content Marketing' },
        { name: 'SEO' },
      ],
    },
  ]);

  const handleSave = (formData: any) => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } else {
      // Add new category
      setCategories([...categories, {
        id: Date.now().toString(),
        ...formData,
      }]);
      toast({
        title: "Success",
        description: "Category created successfully",
      });
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-muted-foreground">Manage categories and subcategories</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <CategoryList
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            category={editingCategory || undefined}
            onSubmit={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingCategory(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}