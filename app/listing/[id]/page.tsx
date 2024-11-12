import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingHeader } from "@/components/listing/listing-header";
import { ListingContent } from "@/components/listing/listing-content";
import { listings } from "@/lib/data";
import { ChatDialog } from '@/components/listing/chat-dialog';
import { ShareDialog } from '@/components/listing/share-dialog';
import { EmbedDialog } from '@/components/listing/embed-dialog';
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { Globe, Mail, MessageSquare, Share2, Code } from 'lucide-react';

interface ListingPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return listings.map((listing) => ({
    id: listing.id.toString(),
  }));
}

export default function ListingPage({ params }: ListingPageProps) {
  const listing = listings.find(l => l.id === params.id);

  if (!listing) {
    notFound();
  }

  // Mock owner data - in real app this would come from your database
  const owner = {
    username: "JohnDoe",
    joinDate: "2024-01-15",
    avatarUrl: null,
    totalListings: 5,
    responseRate: "98%",
    avgResponseTime: "2 hours"
  };

  return (
    <>
      <div className="hero-gradient py-16">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto gradient-border">
            <ListingHeader listing={listing} />
            <ListingContent listing={listing} />
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <ChatDialog listing={listing} />
                  <ShareDialog listing={listing} />
                  <EmbedDialog listing={listing} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Average response time: {listing.turnaround}
                </p>
              </div>
            </div>
            
            {/* Owner Details Section */}
            <div className="px-6 pb-6 border-t">
              <h3 className="text-lg font-semibold mt-6 mb-4">About the Publisher</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={owner.avatarUrl || undefined} alt={owner.username} />
                    <AvatarFallback className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white text-xl">
                      {owner.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">{owner.username}</h4>
                    <p className="text-sm text-muted-foreground">
                      Member since {formatDistanceToNow(new Date(owner.joinDate), { addSuffix: true })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{owner.totalListings} active listings</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-medium">{owner.responseRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Response Time</span>
                    <span className="font-medium">{owner.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Usually responds within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}