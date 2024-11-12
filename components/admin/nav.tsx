import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Globe,
  Palette,
  Layers,
  BookOpen,
  FolderTree,
  Sliders,
  MessageSquare,
  Upload,
  Menu,
  BadgeCheck,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Layers,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Listings',
    href: '/admin/listings',
    icon: Globe,
  },
  {
    title: 'Premium Badges',
    href: '/admin/premium-badges',
    icon: BadgeCheck,
  },
  {
    title: 'Bulk Listings',
    href: '/admin/bulk-listings',
    icon: Upload,
  },
  {
    title: 'Navigation',
    href: '/admin/navigation',
    icon: Menu,
  },
  {
    title: 'Page Builder',
    href: '/admin/page-builder',
    icon: Layers,
  },
  {
    title: 'Blog',
    href: '/admin/blog',
    icon: BookOpen,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: MessageSquare,
  },
  {
    title: 'Message Reports',
    href: '/admin/message-report',
    icon: MessageSquare,
  },
  {
    title: 'Customization',
    href: '/admin/customization',
    icon: Palette,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Sliders,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary',
            pathname === item.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}