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
import { admin, regular } from '@/lib/permissions';

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

export const getSidebarNavigationWithPermissions = (role: string) => {
  const rolePermissions = role === 'admin' ? admin.statements : regular.statements;

  return defaultSidebarNavigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (role === 'admin') {
          return true;
        }

        for (const [permissionType, permissions] of Object.entries(rolePermissions)) {
          const hasCreatePermission = permissions.includes('create');
          const hasUpdatePermission = permissions.includes('update');
          const hasDeletePermission = permissions.includes('delete');

          if (hasCreatePermission && hasUpdatePermission && hasDeletePermission) {
            return true;
          }
        }

        return false;
      }),
    }))
    .filter((group) => group.items.length > 0);
};
