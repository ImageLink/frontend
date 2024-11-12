'use client';

import { AdminHeader } from '@/components/admin/header';
import { AdminNav } from '@/components/admin/nav';
import { CategoryManagement } from '@/components/admin/categories/category-management';
import { Card } from '@/components/ui/card';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container px-4 py-6 grid gap-6 md:grid-cols-[240px_1fr]">
        <AdminNav />
        <main className="space-y-6">
          <Card className="p-6 gradient-border">
            <CategoryManagement />
          </Card>
        </main>
      </div>
    </div>
  );
}