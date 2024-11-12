'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Save, GripVertical, Trash2, Eye, Undo } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'internal' | 'external';
  parent?: string;
}

interface FooterSection {
  id: string;
  title: string;
  links: {
    id: string;
    label: string;
    url: string;
  }[];
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export function NavigationManagement() {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', label: 'Home', url: '/', type: 'internal' },
    { id: '2', label: 'Marketplace', url: '/marketplace', type: 'internal' },
    { id: '3', label: 'About', url: '/about', type: 'internal' },
  ]);

  const [footerSections, setFooterSections] = useState<FooterSection[]>([
    {
      id: '1',
      title: 'Quick Links',
      links: [
        { id: '1', label: 'Home', url: '/' },
        { id: '2', label: 'About', url: '/about' },
      ],
    },
    {
      id: '2',
      title: 'Resources',
      links: [
        { id: '1', label: 'Blog', url: '/blog' },
        { id: '2', label: 'FAQ', url: '/faq' },
      ],
    },
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  ]);

  const [copyrightText, setCopyrightText] = useState('© 2024 PostMarket. All rights reserved.');
  const [showPreview, setShowPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(menuItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMenuItems(items);
    setHasChanges(true);
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, { ...item, id: Date.now().toString() }]);
    setHasChanges(true);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    setHasChanges(true);
  };

  const addFooterSection = (title: string) => {
    setFooterSections([
      ...footerSections,
      { id: Date.now().toString(), title, links: [] },
    ]);
    setHasChanges(true);
  };

  const addSocialLink = (link: SocialLink) => {
    setSocialLinks([...socialLinks, { ...link, id: Date.now().toString() }]);
    setHasChanges(true);
  };

  const handlePublish = () => {
    // Here you would typically save to your backend
    toast({
      title: 'Changes Published',
      description: 'Your navigation and footer changes have been published.',
    });
    setHasChanges(false);
  };

  const handleRevert = () => {
    // Here you would typically fetch the last published version from your backend
    toast({
      title: 'Changes Reverted',
      description: 'Your changes have been reverted to the last published version.',
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Navigation Management</h2>
          <p className="text-muted-foreground">Manage website navigation and footer content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleRevert}>
                <Undo className="h-4 w-4 mr-2" />
                Revert
              </Button>
              <Button onClick={handlePublish}>
                <Save className="h-4 w-4 mr-2" />
                Publish Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="main-menu" className="space-y-4">
        <TabsList>
          <TabsTrigger value="main-menu">Main Menu</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="main-menu" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Menu Items</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input placeholder="Enter menu item label" />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input placeholder="Enter URL" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select link type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Link</SelectItem>
                        <SelectItem value="external">External Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={() => {}}>Add Item</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="menu-items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {menuItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-2 p-3 bg-card border rounded-lg"
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.url}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMenuItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Footer Sections</h3>
                <Button onClick={() => {}}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {footerSections.map((section) => (
                  <Card key={section.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{section.title}</h4>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {section.links.map((link) => (
                          <div key={link.id} className="flex items-center gap-2">
                            <Input value={link.label} className="flex-1" />
                            <Input value={link.url} className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input
                  value={copyrightText}
                  onChange={(e) => {
                    setCopyrightText(e.target.value);
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <Button onClick={() => {}}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Social Link
                </Button>
              </div>

              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-4">
                    <Select defaultValue={link.platform}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input value={link.url} className="flex-1" />
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {showPreview && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-medium mb-2">Main Navigation</h4>
              <nav className="flex gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-medium mb-2">Footer</h4>
              <div className="grid gap-8 md:grid-cols-4">
                {footerSections.map((section) => (
                  <div key={section.id}>
                    <h5 className="font-medium mb-2">{section.title}</h5>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.url}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                {copyrightText}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}