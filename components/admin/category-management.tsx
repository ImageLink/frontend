'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit2, Plus, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Category {
  id: string;
  name: string;
  slug: string;
  listingsCount: number;
  languages: string[];
}

export function CategoryManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Technology',
      slug: 'technology',
      listingsCount: 156,
      languages: ['English', 'Spanish'],
    },
    {
      id: '2',
      name: 'Marketing',
      slug: 'marketing',
      listingsCount: 89,
      languages: ['English', 'French'],
    },
    {
      id: '3',
      name: 'Health',
      slug: 'health',
      listingsCount: 124,
      languages: ['English', 'German'],
    },
  ]);

  const handleSave = () => {
    toast({
      title: 'Category Updated',
      description: 'The category has been updated successfully.',
    });
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-muted-foreground">Manage categories and languages</p>
        </div>
        <Dialog>
          <Button asChild>
            <DialogContent>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </DialogContent>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input placeholder="Enter category name" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input placeholder="category-slug" />
              </div>
              <div className="space-y-2">
                <Label>Languages</Label>
                <Input placeholder="Add languages (comma separated)" />
              </div>
              <Button className="w-full" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Listings</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.listingsCount}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {category.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input defaultValue={editingCategory.name} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input defaultValue={editingCategory.slug} />
              </div>
              <div className="space-y-2">
                <Label>Languages</Label>
                <Input defaultValue={editingCategory.languages.join(', ')} />
              </div>
              <Button className="w-full" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}