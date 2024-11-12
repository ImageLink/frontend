'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Layers, Plus, Save, Eye } from 'lucide-react';

export function PageBuilder() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');

  const handleSave = () => {
    toast({
      title: 'Page Saved',
      description: 'The page has been saved successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Page Builder</h2>
          <p className="text-muted-foreground">Create and manage custom pages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Page
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="settings">Page Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <Card className="p-4">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Label>Select Page</Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a page to edit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="about">About Us</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-6">
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </div>

            <div className="grid gap-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label>URL Slug</Label>
                <Input
                  value={pageSlug}
                  onChange={(e) => setPageSlug(e.target.value)}
                  placeholder="enter-url-slug"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Page Components</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Hero Section</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
              </div>

              {/* Add more component placeholders here */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Page Settings</h3>
            <div className="space-y-4">
              <div>
                <Label>Meta Title</Label>
                <Input placeholder="Enter meta title" />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Input placeholder="Enter meta description" />
              </div>
              <div>
                <Label>Featured Image</Label>
                <Input type="file" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}