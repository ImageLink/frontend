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
import { Edit2, Plus, Eye, Trash2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export function BlogManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editorContent, setEditorContent] = useState('');

  const posts = [
    {
      id: 1,
      title: 'How to Choose the Right Guest Posting Site',
      author: 'John Doe',
      status: 'Published',
      category: 'Guide',
      date: '2024-02-15',
      featured: true,
      content: '<p>This is a sample blog post content...</p>',
    },
    {
      id: 2,
      title: 'SEO Best Practices for Guest Posts',
      author: 'Jane Smith',
      status: 'Draft',
      category: 'SEO',
      date: '2024-02-14',
      featured: false,
      content: '<p>Another sample blog post content...</p>',
    },
  ];

  const handleSave = () => {
    toast({
      title: 'Post Saved',
      description: 'The blog post has been saved successfully.',
    });
    setEditingPost(null);
  };

  const handleDelete = (postId: number) => {
    toast({
      title: 'Post Deleted',
      description: 'The blog post has been deleted successfully.',
    });
  };

  const openEditor = (post?: any) => {
    setEditingPost(post || {
      title: '',
      category: '',
      featured: false,
      content: '',
      status: 'Draft',
    });
    setEditorContent(post?.content || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <Button onClick={() => openEditor()}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={post.status === 'Published' ? 'default' : 'secondary'}
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {post.featured && (
                    <Badge className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditor(post)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(post.id)}
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

      {editingPost && (
        <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {editingPost.id ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter post title"
                    defaultValue={editingPost.title}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={editingPost.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Editor
                  value={editorContent}
                  onEditorChange={(content) => setEditorContent(content)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                      'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                      'fullscreen', 'insertdatetime', 'media', 'table', 'code',
                      'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
                    readonly: false,
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  defaultChecked={editingPost.featured}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingPost.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}