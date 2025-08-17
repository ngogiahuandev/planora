import { LucideIcon } from 'lucide-react';

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarNavigation: SidebarNavGroup[];
  breadcrumbItems?: BreadcrumbItem[];
  rightContent?: React.ReactNode;
}

export interface DashboardHeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
}

export interface DashboardSidebarProps {
  navigation: SidebarNavGroup[];
}
