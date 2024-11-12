'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListings } from "@/hooks/use-listings";
import { useAuth } from "@/lib/auth";
import { Globe, MessageSquare, Bell, TrendingUp } from "lucide-react";
import Link from "next/link";

export function DashboardOverview() {
  const { user } = useAuth();
  const { listings, loading } = useListings({ userId: user?.id });

  const stats = {
    activeListings: listings.filter(l => l.status === 'active').length,
    pendingListings: listings.filter(l => l.status === 'pending').length,
    totalViews: 1234, // This would come from analytics in a real app
    inquiries: 56, // This would come from messages in a real app
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingListings} pending approval
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inquiries}</div>
            <p className="text-xs text-muted-foreground">
              8 unread messages
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 new notifications
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listings.slice(0, 3).map((listing) => (
                <div key={listing.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{listing.domain}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">DA {listing.da}</Badge>
                      <Badge variant="secondary">DR {listing.dr}</Badge>
                    </div>
                  </div>
                  <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                    {listing.status}
                  </Badge>
                </div>
              ))}
            </div>
            {listings.length > 3 && (
              <Button asChild variant="link" className="mt-4 w-full">
                <Link href="/dashboard/listings">View All Listings</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">New Message</p>
                  <p className="text-sm text-muted-foreground">
                    From John Doe regarding Tech Blog
                  </p>
                </div>
                <Badge>New</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Listing Approved</p>
                  <p className="text-sm text-muted-foreground">
                    Your website "Marketing Hub" is now live
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">New Inquiry</p>
                  <p className="text-sm text-muted-foreground">
                    Guest post request for Business Blog
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">5h ago</span>
              </div>
            </div>
            <Button asChild variant="link" className="mt-4 w-full">
              <Link href="/dashboard/notifications">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}