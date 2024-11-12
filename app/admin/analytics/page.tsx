'use client';

import { AdminHeader } from '@/components/admin/header';
import { AdminNav } from '@/components/admin/nav';
import { AnalyticsDashboard } from '@/components/admin/analytics-dashboard';
import { Card } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container px-4 py-6 grid gap-6 md:grid-cols-[240px_1fr]">
        <AdminNav />
        <main className="space-y-6">
          <Card className="p-6 gradient-border">
            <AnalyticsDashboard />
          </Card>
        </main>
      </div>
    </div>
  );
}