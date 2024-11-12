'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

export function CustomizationSettings() {
  const { toast } = useToast();
  const [primaryColor, setPrimaryColor] = useState('#7C3AED');
  const [secondaryColor, setSecondaryColor] = useState('#EC4899');
  const [fontFamily, setFontFamily] = useState('Inter');

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your customization settings have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customization</h2>
          <p className="text-muted-foreground">Customize your website appearance</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="colors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
            <div className="grid gap-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>
            <div className="space-y-4">
              <div>
                <Label>Primary Font</Label>
                <Input
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  placeholder="Enter font family"
                />
              </div>

              <div>
                <Label>Font Size Scale</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Base Size</Label>
                    <Input type="number" defaultValue="16" min="12" max="24" />
                  </div>
                  <div>
                    <Label className="text-sm">Scale Ratio</Label>
                    <Input type="number" defaultValue="1.25" step="0.05" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Layout Settings</h3>
            <div className="space-y-4">
              <div>
                <Label>Container Width</Label>
                <Input type="number" defaultValue="1200" step="10" />
              </div>

              <div>
                <Label>Grid Columns</Label>
                <Input type="number" defaultValue="12" min="6" max="24" />
              </div>

              <div>
                <Label>Spacing Scale</Label>
                <Input type="number" defaultValue="4" min="2" max="8" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}