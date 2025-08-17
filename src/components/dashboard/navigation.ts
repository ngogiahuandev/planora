import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Calendar,
  Bell,
  CreditCard,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { SidebarNavGroup } from './types';

// Centralized sidebar navigation configuration
export const defaultSidebarNavigation: SidebarNavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
      },
      {
        title: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart3,
        badge: 'New',
      },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Users',
        href: '/dashboard/users',
        icon: Users,
        badge: 12,
      },
      {
        title: 'Projects',
        href: '/dashboard/projects',
        icon: FileText,
      },
      {
        title: 'Calendar',
        href: '/dashboard/calendar',
        icon: Calendar,
      },
      {
        title: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquare,
        badge: 3,
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        title: 'Notifications',
        href: '/dashboard/notifications',
        icon: Bell,
      },
      {
        title: 'Billing',
        href: '/dashboard/billing',
        icon: CreditCard,
      },
      {
        title: 'Integrations',
        href: '/dashboard/integrations',
        icon: Zap,
      },
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
      },
    ],
  },
];
