'use client';

import { Card } from '@/components/ui/card';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { SettingsForm } from '@/components/dashboard/settings-form';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container px-4 py-6 grid gap-6 md:grid-cols-[240px_1fr]">
        <DashboardNav />
        <main className="space-y-6">
          <Card className="p-6 gradient-border">
            <SettingsForm />
          </Card>
        </main>
      </div>
    </div>
  );
}