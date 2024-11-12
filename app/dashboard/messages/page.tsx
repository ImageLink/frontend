'use client';

import { Card } from '@/components/ui/card';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { MessagesList } from '@/components/dashboard/messages-list';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container px-4 py-6 grid gap-6 md:grid-cols-[240px_1fr]">
        <DashboardNav />
        <main className="space-y-6">
          <Card className="p-6 gradient-border">
            <MessagesList />
          </Card>
        </main>
      </div>
    </div>
  );
}