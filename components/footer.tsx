'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <PenSquare className="h-6 w-6" />
              <span className="text-xl font-bold">ImageLink</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect with top publishers and grow your online presence through quality image backlinks.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="hover:underline">Browse Opportunities</Link>
              </li>
              <li>
                <Link href="/list-website" className="hover:underline">List Your Website</Link>
              </li>
              <li>
                <Link href="/submit-requirement" className="hover:underline">Submit Requirement</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin" className="text-primary hover:underline">Admin Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">Blog</Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:underline">Guidelines</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ImageLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}