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
import { SidebarNavGroup } from '../components/dashboard/types';
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
        permission: 'user',
      },
      {
        title: 'Projects',
        href: '/dashboard/projects',
        icon: FileText,
        permission: 'project',
      },
      {
        title: 'Calendar',
        href: '/dashboard/calendar',
        icon: Calendar,
        permission: 'calendar',
      },
      {
        title: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquare,
        badge: 3,
        permission: 'messages',
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
        permission: 'notifications',
      },
      {
        title: 'Billing',
        href: '/dashboard/billing',
        icon: CreditCard,
        permission: 'billing',
      },
      {
        title: 'Integrations',
        href: '/dashboard/integrations',
        icon: Zap,
        permission: 'integrations',
      },
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        permission: 'settings',
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
          if (item.permission === permissionType) {
            const hasAccessPermission = permissions.includes('can-access');

            if (hasAccessPermission) {
              return true;
            }
          }
        }

        return false;
      }),
    }))
    .filter((group) => group.items.length > 0);
};

export const checkPermission = (role: string, permission: string): boolean => {
  if (role === 'admin') {
    return true;
  }

  const rolePermissions = role === 'admin' ? admin.statements : regular.statements;

  const permissionArray = rolePermissions[permission as keyof typeof rolePermissions];

  if (!permissionArray) {
    return false;
  }

  return permissionArray.includes('can-access');
};
