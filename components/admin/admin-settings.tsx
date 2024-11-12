'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

export function AdminSettings() {
  const { toast } = useToast();
  const [autoApproval, setAutoApproval] = useState(false);
  const [scheduleApproval, setScheduleApproval] = useState(false);

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your admin settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Admin Settings</h2>
          <p className="text-muted-foreground">Configure system-wide settings</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="signup">Signup Fields</TabsTrigger>
          <TabsTrigger value="listing">Listing Settings</TabsTrigger>
          <TabsTrigger value="approval">Approval Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>User Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new user registrations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Required Signup Fields</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Phone Number</Label>
                  <p className="text-sm text-muted-foreground">
                    Require phone number during signup
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">
                    Make WhatsApp field mandatory
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Telegram</Label>
                  <p className="text-sm text-muted-foreground">
                    Make Telegram field mandatory
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="listing" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Listing Display Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Domain Authority</Label>
                  <p className="text-sm text-muted-foreground">
                    Display DA score on listings
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Traffic Stats</Label>
                  <p className="text-sm text-muted-foreground">
                    Display traffic information
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Contact Info</Label>
                  <p className="text-sm text-muted-foreground">
                    Display contact details on listings
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Listing Approval Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve new listings
                  </p>
                </div>
                <Switch
                  checked={autoApproval}
                  onCheckedChange={setAutoApproval}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Scheduled Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Schedule listing approvals
                  </p>
                </div>
                <Switch
                  checked={scheduleApproval}
                  onCheckedChange={setScheduleApproval}
                />
              </div>

              {scheduleApproval && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Approval Time</Label>
                    <p className="text-sm text-muted-foreground">
                      Set when to process approvals
                    </p>
                  </div>
                  <input
                    type="time"
                    className="px-3 py-2 rounded-md border"
                    defaultValue="09:00"
                  />
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}